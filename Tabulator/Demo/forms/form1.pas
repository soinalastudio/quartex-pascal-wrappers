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
  qtx.delegates,

  qtx.dom.control.common,
  qtx.dom.control.ContentBox,
  qtx.dom.control.label,
  qtx.dom.control.panel,
  qtx.dom.control.button,
  qtx.promises,

  qtx.dom.stylesheet,
  tor.tabulator.wrapper,
  tor.ace.wrapper;

type

  TMyForm = class(TQTXForm)
  private
    FLabel:   TQTXLabel;
    FPanel:   TQTXPanel;
  protected
    procedure InitializeObject; override;
    procedure FinalizeObject; override;
    procedure StyleObject; override;
  public
    property  Panel: TQTXPanel read FPanel;
    property  Label: TQTXLabel read FLabel;
  end;

implementation

uses
  tor.application.offcanvasmenu;

resourcestring
  DEMO1 = #"
    //Declaring our Tabulator table
    var tab1: TTabulator;

    //Setup data (it's preferable to have an index column, by default: 'id')
    var data1 := [
      class
        id = 1;
        name = 'David';
        gender = 'male';
        age = 25;
      end,
      class
        id = 2;
        name = 'Olivia';
        gender = 'female';
        age = 52;
      end,
      class
        id = 3;
        name = 'Peter';
        gender = 'male';
        age = 36;
      end,
      class
        id = 4;
        name = 'Clara';
        gender = 'female';
        age = 16;
      end
    ];
    //Options that will be use as argument for the TTabulator constructor argument
    var tableOptions1 := class
      data = data1;
      columns = [
        class title = 'ID'; field = 'id'; resizable = false; hozAlign = 'center'; end, //Center aligned
        class title = 'Name'; field = 'name'; end,
        class title = 'Gender'; field = 'gender'; end,
        class title = 'Age'; field = 'age'; hozAlign = 'center'; end //Center aligned
      ];
      cellClick = procedure (e: JMouseEvent; cell: TTabulatorCellComponent)
      begin
        ShowMessage('You clicked on a cell with a value: ' + cell.getValue());
      end;
    end;
    //Creating a widget that will hold our Tabulator table
    var widgetTable := TQTXWidget.Create(Panel, procedure (widget: TQTXWidget)
    begin
      widget.WhenReady(procedure (widget: TQTXWidget)
      begin
        widget.Width := 400;
        widget.Height := 200;
        //TODO: Not use TQTXDispatch here, how to know if the widget is really ready?
        //Without a delay of TQTXDispatch, element ID is available but still not usable even in WhenReady!!!
        TQTXDispatch.Execute(procedure()
        begin
          //Creating our table
          tab1 := TTabulator.Create('#'+widget.Handle.id, tableOptions1);
        end, 50);
      end);
    end);
";
  DEMO2 = #"
    //Declaring our Tabulator table  and other used variables
    var tab2: TTabulator;
    var tableOptions2: TTabulatorOptions;
    var elID2: String;
    var data2: Array of Variant;

    //It's easier? And you can do it dynamically too if you want
    var theFields: array of String := ['id', 'name', 'gender', 'age'];
    var theData: array of Variant :=
      [
        [1, 'David', 'male', 25],
        [2, 'Olivia', 'female', 52],
        [3, 'Peter', 'male', 36],
        [4, 'Clara', 'female', 16]
      ];
    data2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);

    //Options that will be use as argument for the TTabulator constructor argument
    tableOptions2 := new TTabulatorOptions();
    tableOptions2.data := data2;

    var ageColumn := new TTabulatorColumnDefinition;
    ageColumn.field := 'age'; //Required
    ageColumn.title := 'Age'; //Required
    ageColumn.hozAlign := 'center';

    //3 ways to do the thing
    tableOptions2.columns := [
        //Method 1
        TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),
        TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),
        //Method 2
        (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),
        //Method 3
        ageColumn.RenderOptions()
      ];

    tableOptions2.cellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)
    begin
      ShowMessage('You clicked on a cell with a value: ' + cell.getValue());
    end;

    //Creating a widget and the Tabulator table
    var widgetTable := TQTXWidget.Create(Panel, procedure (widget: TQTXWidget)
    begin
      widget.WhenReady(procedure (widget: TQTXWidget)
      begin
        widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
        widget.Width := 600;
        widget.Height := 200;
        TQTXDispatch.Execute(procedure()
        begin
          //Creating our table
          elID2 := '#'+widget.Handle.id;
          tab2 := TTabulator.Create(elID2, tableOptions2.RenderOptions());
        end, 50);
      end);
    end);
";

  DEMO3 = #"
    //Declaring our TQTXTabulator table  and other used variables
    var tab3: TQTXTabulator;
    var data2: Array of Variant;

    //It's easier? And you can do it dynamically too if you want
    var theFields: array of String := ['id', 'name', 'gender', 'age'];
    var theData: array of Variant :=
      [
        [1, 'David', 'male', 25],
        [2, 'Olivia', 'female', 52],
        [3, 'Peter', 'male', 36],
        [4, 'Clara', 'female', 16]
      ];
    data2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);

    tab3 := TQTXTabulator.Create(Panel, procedure (widget: TQTXTabulator)
    begin
      widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      widget.Style.width := '100%';
      widget.Height := 500;
      //To ensure having the correct prototype of an Event, pass it through CreationEvents property, the compiler will warn if the prototype is incorrect
      //If you know the prototype, you can use ''widget.CreationOptions.cellClick := ...''
      widget.CreationEvents.onCellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)
      begin
        ShowMessage('You clicked on a cell with a value: ' + cell.getValue());
      end;

      //Setting columns
      var ageColumn := new TTabulatorColumnDefinition;
      ageColumn.field := 'age'; //Required
      ageColumn.title := 'Age'; //Required
      ageColumn.hozAlign := 'center';

      //3 ways to do the thing
      widget.CreationOptions.columns := [
          //Method 1
          TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),
          TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),
          //Method 2
          (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),
          //Method 3
          ageColumn.RenderOptions()
        ];

      //Setting data
      widget.CreationOptions.data := data2;

      //Recreate the table (!!! important after using CreationOptions and CreationEvents properties)
      widget.ReCreateTabulator(nil, procedure (widget: TQTXTabulator)
      begin
        //Add here your code after table creation
      end);
    end);
";
  DEMO3_MOVABLES = #"
  tab3.CreationOptions.movableColumns := true;
  tab3.CreationOptions.movableRows := true;
  tab3.ReCreateTabulator(nil, nil);
";

//#############################################################################
// TMyForm
//#############################################################################

procedure TMyForm.StyleObject;
begin
  inherited;
  PositionMode := TQTXWidgetPositionMode.cpInitial;
  DisplayMode := TQTXWidgetDisplayMode.cdBlock;
  Style.width := '100%';
  Border.Padding := 2;
  Background.Color := clSilver;
end;

procedure TMyForm.InitializeObject;
  procedure AddShowSourceCodeButton(Parent: TQTXWidget; Src: String; buttonColor: TColor = clBlue; sourceFor: String = ''; aceHeight: Integer = 400);
  begin
    var btn: TQTXButton;
    var ace: TQTXAceWidget;

    btn := TQTXButton.Create(Parent, procedure(Button: TQTXButton)
    begin
      Button.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      Button.PositionMode :=  TQTXWidgetPositionMode.cpInitial;
      Button.Background.Color := buttonColor;
      Button.Font.Color := clWhite;
      Button.Style.textShadow := 'none';
      Button.Border.Top.Margin := 5;
      Button.Border.Bottom.Margin := 5;
      Button.InnerHtml := 'Show source code' + (if sourceFor<>'' then ' for "'+sourceFor+'"');
      Button.TagData := 0;

      Button.OnClick := procedure (Sender: TObject)
      begin
        if Button.TagData = 0 then begin
          ace.Visible := True;
          ace.gotoLine(1, 1, true);
          Button.TagData := 1;
          Button.InnerHtml := 'Hide source code' + (if sourceFor<>'' then ' for "'+sourceFor+'"');
        end else begin
          ace.Visible := False;
          Button.TagData := 0;
          Button.InnerHtml := 'Show source code' + (if sourceFor<>'' then ' for "'+sourceFor+'"');
        end;
      end;
    end);

    ace := TQTXAceWidget.Create(Parent, procedure (AceWidget: TQTXAceWidget)
    begin
      ace.PositionMode :=  TQTXWidgetPositionMode.cpRelative;
      ace.DisplayMode := TQTXWidgetDisplayMode.cdBlock;

      ace.Visible := false;
      ace.Style.width := '100%';
      ace.Height := aceHeight;

      ace.setTheme('ace/theme/monokai');
      ace.Session.setMode('ace/mode/pascal');

      ace.setValue(Src, nil);
      ace.clearSelection();
      ace.setReadOnly(true);
     ace.gotoLine(1, 1, true);
    end);

  end;
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
      label.Caption :="<b>Setting up a Tabulator table without TQTXTabulator (like in JS):</b><br/>Advantage here is that you can configure columns and table options before your create your Tabulator table.";
      Label.Background.Color := clBisque;
      Label.AlignH := chLeft;
      Label.AlignV := cvMiddle;
    end);
    FLabel.Border.Bottom.Margin := 2;

    //Declaring our Tabulator table
    var tab1: TTabulator;
    var elID1: String;
    var tableOptions1: Variant;
    var data1: Variant;
    var isDataReactive: Boolean;

    TQTXButton.Create(Panel, procedure (Button: TQTXButton)
    begin
      Button.PositionMode := TQTXWidgetPositionMode.cpInitial;
      Button.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      Button.InnerText := 'Make rows movable';
      Button.Border.Margin := 5;
      Button.OnClick := procedure (Sender: TObject)
      begin
        isDataReactive := false;
        tableOptions1.movableRows := true;
        //We cannot change table options dynamically, we should recreate the table
        tab1.destroy();
        tab1 := TTabulator.Create(elID1, tableOptions1);
      end;
    end);

    TQTXButton.Create(Panel, procedure (Button: TQTXButton)
    begin
      Button.PositionMode := TQTXWidgetPositionMode.cpRelative;
      Button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      Button.InnerText := 'Make data "Reactive"';
      Button.Border.Margin := 5;
      Button.OnClick := procedure (Sender: TObject)
      begin
        ShowMessage("On reactive data, you just manipulate the data and the table is automatically updated!");
        tableOptions1.reactiveData := true;
        isDataReactive := true;
        tableOptions1.data := data1;
        //We cannot change table options dynamically, we should recreate the table
        tab1.destroy();
        tab1 := TTabulator.Create(elID1, tableOptions1);
      end;
    end);

    TQTXButton.Create(Panel, procedure (Button: TQTXButton)
    begin
      Button.PositionMode := TQTXWidgetPositionMode.cpRelative;
      Button.InnerText := 'Add row on "Reactive" data';
      Button.Border.Margin := 5;
      Button.OnClick := procedure (Sender: TObject)
      begin
        if isDataReactive then
          data1.push(class
            id = 6;
            name = 'Eric';
            gender = 'male';
            age = 30;
          end)
         else
          ShowMessage('Click on the button "Make data Reactive" before!');
      end;
    end);

    TQTXButton.Create(Panel, procedure (Button: TQTXButton)
    begin
      Button.PositionMode := TQTXWidgetPositionMode.cpRelative;
      Button.InnerText := 'Modify NAME on Line Number 1 on a "Reactive" data';
      Button.Border.Margin := 5;
      Button.OnClick := procedure (Sender: TObject)
      begin
        if isDataReactive then
          data1[0].name := 'Claude (changed!)'
         else
          ShowMessage('Click on the button "Make data Reactive" before!');
      end;
    end);

    //Setup data (it's preferable to have an index column, by default: 'id')
    data1 := [
      class
        id = 1;
        name = 'David';
        gender = 'male';
        age = 25;
      end,
      class
        id = 2;
        name = 'Olivia';
        gender = 'female';
        age = 52;
      end,
      class
        id = 3;
        name = 'Peter';
        gender = 'male';
        age = 36;
      end,
      class
        id = 4;
        name = 'Clara';
        gender = 'female';
        age = 16;
      end
    ];
    //Options that will be use as argument for the TTabulator constructor argument
    tableOptions1 := class
      data = data1;
      columns = [
        class title = 'ID'; field = 'id'; resizable = false; hozAlign = 'center'; end, //Center aligned
        class title = 'Name'; field = 'name'; end,
        class title = 'Gender'; field = 'gender'; end,
        class title = 'Age'; field = 'age'; hozAlign = 'center'; end //Center aligned
      ];
      cellClick = procedure (e: JMouseEvent; cell: TTabulatorCellComponent)
      begin
        ShowMessage('You clicked on a cell with a value: ' + cell.getValue());
      end;
    end;

    //Creating a widget that will hold our Tabulator table
    var widgetTable := TQTXWidget.Create(Panel, procedure (widget: TQTXWidget)
    begin
      widget.WhenReady(procedure (widget: TQTXWidget)
      begin
        widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
        widget.Style.width := '100%';
        widget.Height := 400;
        //TODO: Not use TQTXDispatch here, how to know if the widget is really ready?
        //Without a dealy of TQTXDispatch, element ID is available but still not usable even in WhenReady!!!
        TQTXDispatch.Execute(procedure()
        begin
          //Creating our table
          elID1 := '#'+widget.Handle.id;
          tab1 := TTabulator.Create(elID1, tableOptions1);
        end, 50);
      end);
    end);

    AddShowSourceCodeButton(Panel, DEMO1);
  end);
end;

procedure TMyForm.FinalizeObject;
begin
  FLabel.free;
  FPanel.free;
  inherited;
end;

end.
