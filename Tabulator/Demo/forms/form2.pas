unit form2;

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

  TMyForm2 = class(TQTXForm)
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


//#############################################################################
// TMyForm
//#############################################################################

procedure TMyForm2.StyleObject;
begin
  inherited;
  PositionMode := TQTXWidgetPositionMode.cpInitial;
  DisplayMode := TQTXWidgetDisplayMode.cdBlock;
  Style.width := '100%';
  Border.Padding := 2;
  Background.Color := clSilver;
end;

procedure TMyForm2.InitializeObject;
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

  //OffCanvasMenuApplication.Title := 'Tabulator wrapper demo 2';

  var Panel2 := TQTXPanel.Create(self, procedure (Panel: TQTXPanel)
  begin
    Panel.PositionMode := TQTXWidgetPositionMode.cpInitial;
    Panel.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
    Panel.Border.Padding := 2;
    Panel.Background.Color := clwhite;

    Panel.Font.Family := "Segoe UI";
    Panel.Font.Size.&Type := TQTXSizeType.stPt;
    Panel.Font.Size.Value := 11;

    //panel.GetChildCollection

    FLabel := TQTXLabel.Create(Panel,
    procedure (Label: TQTXLabel)
    begin
      Label.PositionMode := TQTXWidgetPositionMode.cpInitial;
      label.Caption :="<b>Setting up the <u>same</u> Tabulator table with some useful classes/functions:</b><br/>More elegant way!";
      Label.Background.Color := clBisque;
      Label.AlignH := chLeft;
      Label.AlignV := cvMiddle;
    end);
    FLabel.Border.Bottom.Margin := 2;

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
    ageColumn.field := 'age';
    ageColumn.title := 'Age';
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
        widget.Style.width := '100%';
        widget.Height := 400;
        TQTXDispatch.Execute(procedure()
        begin
          //Creating our table
          elID2 := '#'+widget.Handle.id;
          tab2 := TTabulator.Create(elID2, tableOptions2.RenderOptions());
        end, 50);
      end);
    end);

    AddShowSourceCodeButton(Panel, DEMO2);

   end);

end;

procedure TMyForm2.FinalizeObject;
begin
  FLabel.free;
  FPanel.free;
  inherited;
end;

end.
