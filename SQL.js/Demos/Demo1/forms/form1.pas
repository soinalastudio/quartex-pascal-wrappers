unit form1;

interface

uses 
  qtx.time,
  qtx.sysutils,
  qtx.classes,
  qtx.dom.widgets,
  qtx.dom.types,
  qtx.dom.events,
  qtx.dom.graphics,
  qtx.dom.application,
  qtx.dom.forms,

  qtx.dom.control.common,
  qtx.dom.control.ContentBox,
  qtx.dom.control.label,
  qtx.dom.control.button,
  qtx.dom.control.panel,

  qtx.dom.stylesheet,

  tor.sqljs;

type

  TMyForm = class(TQTXForm)
  private
    FLabel:   TQTXLabel;
    FPanel:   TQTXPanel;
    FButton:  TQTXButton;
  protected
    procedure InitializeObject; override;
    procedure FinalizeObject; override;
    procedure StyleObject; override;
  public
    property  Panel: TQTXPanel read FPanel;
    property  Label: TQTXLabel read FLabel;
  end;

  TSuccessCB = procedure ( data: JUint8Array );

  procedure loadBinaryFile(path: string; successCB: TSuccessCB); external "loadBinaryFile";

implementation


//#############################################################################
// TMyForm
//#############################################################################

procedure TMyForm.StyleObject;
begin
  inherited;
  PositionMode := TQTXWidgetPositionMode.cpInitial;
  DisplayMode := TQTXWidgetDisplayMode.cdBlock;
  Border.Padding := 2;
  Background.Color := clSilver;
end;

procedure TMyForm.InitializeObject;
begin
  inherited;

  FPanel := TQTXPanel.Create(self, procedure (Panel: TQTXPanel)
  begin
    Panel.PositionMode := TQTXWidgetPositionMode.cpInitial;
    Panel.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
    Panel.Border.Padding := 2;
    Panel.Background.Color := clwhite;

    Panel.Font.Family := "Segoe UI";
    Panel.Font.Size.&Type := TQTXSizeType.stPt;
    Panel.Font.Size.Value := 11;

    FLabel := TQTXLabel.Create(Panel,
    procedure (Label: TQTXLabel)
    begin
      Label.PositionMode := TQTXWidgetPositionMode.cpInitial;
      label.Caption :="This is a label with vertical and horizontal alignment";
      Label.AlignH := chCenter;
      Label.AlignV := cvMiddle;
    end);
    FLabel.Border.Bottom.Margin := 2;

    FButton := TQTXButton.Create(Panel,
    procedure (Button: TQTXButton)
    begin
      Button.InnerHtml := "Load SQL.JS and run test scripts";
      Button.PositionMode := TQTXWidgetPositionMode.cpInitial;
      Button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      Button.OnClick := procedure (Sender: TObject)
      begin
        var config: TSqlJsConfig;
        config := new TSqlJsConfig;
        config.locateFile := function (filename: String): string
        begin
          result := '/' + filename;
        end;

        //Init SqlJs
        initSqlJs(config).then(function(SQL: Variant): variant
        begin
          Writeln('sql-wasm.wasm file loaded successfully!');

          var db = new TSqlJsDatabase(SQL);

          Writeln('>>>Creating table');
          db.run("CREATE TABLE test (col1, col2);");
          Writeln('>>>Inserting data');
          db.run("INSERT INTO test VALUES (?,?), (?,?), (?,?)", [1,111,2,222,3,333]);

          var stmt: TSqlJsStatement;
          Writeln('>>>Preparing query');
          stmt := db.Prepare("SELECT * FROM test WHERE col1 BETWEEN $start AND $end");
          Writeln("Normalized SQL: " + stmt.getNormalizedSQL);

          Writeln('Getting a row');
          var row : variant := stmt.getAsObject(class
            "$start" = 3;
            "$end" = 3;
          end);
          Writeln(row);

          Writeln('Getting row from Start to End:');
          stmt.reset();
          stmt.Bind(class
            "$start" = 1;
            "$end" = 3;
          end);
          while stmt.Step() do
          begin
            var row: variant := stmt.getAsObject();
            Writeln('Col1: ' + row.col1 + ' Col2: ' + row.col2);
          end;

          Writeln('>>> Using user function ');
          var func: variant;
          func := lambda(x: integer) => x + 1;
          db.CreateFunction("addOne", func);
          var res: array of TSqlJsQueryExecResult := db.Exec("SELECT addOne(2); SELECT addOne(6);");

          Writeln(res[1]);

          Writeln('>>>Using EACH');
          db.Each('SELECT col1, col2 FROM test',
          procedure (row: variant)
          begin
            Writeln('Col1: ' + row.col1 + ' Col2: ' + row.col2);
          end,
          procedure ()
          begin
            Writeln('Done!!!');
          end);

          db.Free();

          /*

          res := db.Exec(#'
            DROP TABLE IF EXISTS test;
            CREATE TABLE test (id INTEGER, age INTEGER, name TEXT);
            INSERT INTO test VALUES ($id1, :age1, @name1);
            INSERT INTO test VALUES ($id2, :age2, @name2);
            SELECT id FROM test;
            SELECT age, name FROM test WHERE id = $id1;
          ', class
              "$id1" = 1; ":age1" = 1; "@name1" = "Ling";
              "$id2" = 2; ":age2" = 18; "@name2" = "Paul";
          end);

          Writeln(res[1]);                 */

        end);
      end;
    end);


    FButton := TQTXButton.Create(Panel,
    procedure (Button: TQTXButton)
    begin
      Button.InnerHtml := "Load SQL.JS and Load sqlite file";
      Button.PositionMode := TQTXWidgetPositionMode.cpInitial;
      Button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      Button.OnClick := procedure (Sender: TObject)
      begin
        var config: TSqlJsConfig;
        config := new TSqlJsConfig;
        config.locateFile := function (filename: String): string
        begin
          result := '/' + filename;
        end;

        //Init SqlJs
        initSqlJs(config).then(function(SQL: Variant): variant
        begin
          Writeln('sql-wasm.wasm file loaded successfully!');

          loadBinaryFile('/sql.db', procedure(data: JUint8Array)
          begin
            Writeln('Sqlite file loaded!');
            var db = new TSqlJsDatabase(SQL, data);

            Writeln('>>>Showing employees list and salary:');

            db.Each('SELECT name, salary FROM employees',
            procedure (row: variant)
            begin
              Writeln('Name: ' + row.name + ' Salary: ' + row.salary);
            end,
            procedure ()
            begin
              Writeln('Done!!!');
            end);
          end);
        end);
      end;
    end);
  end);
end;

procedure TMyForm.FinalizeObject;
begin
  FLabel.free;
  FPanel.free;
  inherited;
end;


end.
