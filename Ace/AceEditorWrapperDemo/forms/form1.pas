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
  tor.ace.wrapper;

type

  TMyForm = class(TQTXForm)
  private
    FLabel:   TQTXLabel;
    FPanel:   TQTXPanel;
    FAceEditor: TQTXAceWidget;
  protected
    procedure InitializeObject; override;
    procedure FinalizeObject; override;
    procedure StyleObject; override;
  public
    property  Panel: TQTXPanel read FPanel;
    property  Label: TQTXLabel read FLabel;
  end;

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

    var btnGetText := TQTXButton.Create(Panel, procedure (button: TQTXButton)
    begin
      button.InnerHtml := 'Get text';
      button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      button.Border.Left.Margin := 5;

      button.OnClick := procedure (Sender: TObject) begin
        ShowMessage(FAceEditor.getValue());
      end;
    end);

    var btnSelectAll := TQTXButton.Create(Panel, procedure (button: TQTXButton)
    begin
      button.InnerHtml := 'Select All';
      button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      button.Border.Left.Margin := 5;

      button.OnClick := procedure (Sender: TObject) begin
        FAceEditor.selectAll();
      end;
    end);

    var btnFindWord := TQTXButton.Create(Panel, procedure (button: TQTXButton)
    begin
      button.InnerHtml := 'Find "Create"';
      button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      button.Border.Left.Margin := 5;

      button.OnClick := procedure (Sender: TObject) begin
        FAceEditor.find('Create', null, true);
      end;
    end);

    var btnDuplicate := TQTXButton.Create(Panel, procedure (button: TQTXButton)
    begin
      button.InnerHtml := 'Duplicate Selection';
      button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      button.Border.Left.Margin := 5;

      button.OnClick := procedure (Sender: TObject) begin
        FAceEditor.duplicateSelection();
      end;
    end);

    var btnCancel := TQTXButton.Create(Panel, procedure (button: TQTXButton)
    begin
      button.InnerHtml := 'Undo';
      button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      button.Border.Left.Margin := 5;

      button.OnClick := procedure (Sender: TObject) begin
        FAceEditor.undo();
      end;
    end);

    var btnChangeToHtmlEditor := TQTXButton.Create(Panel, procedure (button: TQTXButton)
    begin
      button.InnerHtml := 'Change mode to HTML/CSS/JS';
      button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      button.Border.Left.Margin := 5;

      button.OnClick := procedure (Sender: TObject) begin
        FAceEditor.Session.setMode('ace/mode/html');
        FAceEditor.setValue(#'
<html>
<head>
	<title>%apptitle%</title>
  <link href="theme.css" rel="stylesheet">
  <script src="ace_src/ace.js" type="text/javascript" defer="true"></script>
  <script src="resizeobserver.polyfill.js" type="text/javascript" defer="true"></script>
	<script src="index.js" type="text/javascript" defer="true"></script>
  </style>
</head>

<body onload="main();">
  <script>
    //you can have Javascript code highlighting here
    var myfunc = function (msg: String)
    {
      var testInteger = 8 * 5;
      var testString = "One string";
      alert(msg + testString);
    }
  </script>
  <!-- Test of multi-caret here -->
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</body>

</html>
        ', null);
        FAceEditor.clearSelection();
      end;
    end);

    var btnChangeToPascal := TQTXButton.Create(Panel, procedure (button: TQTXButton)
    begin
      button.InnerHtml := 'Change mode to Pascal';
      button.DisplayMode := TQTXWidgetDisplayMode.cdInlineBlock;
      button.Border.Left.Margin := 5;

      button.OnClick := procedure (Sender: TObject) begin
        FAceEditor.session.setMode('ace/mode/pascal');
        FAceEditor.setValue(#'
constructor TAceOptionsRenderer.Create(opts: Variant = null);
begin
  inherited Create();

  var numberTest: Integer := 58 * 7;
  var stringTest: String := "This is a string";

  fOpts := TVariant.CreateObject;
  if opts <> null then begin
    //This is a small workarround
    asm
     @fOpts = Object.assign(@fOpts, @opts);
    end;
  end;
end;
        ', null);
        FAceEditor.clearSelection();
      end;
    end);


    FAceEditor := TQTXAceWidget.Create(Panel, procedure(edtWidget: TQTXAceWidget)
    begin
      edtWidget.Border.Top.Margin := 5;
      edtWidget.Height := 400;
      edtWidget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      edtWidget.Editor.setTheme('ace/theme/monokai');
      edtWidget.session.setMode('ace/mode/pascal');
      edtWidget.setValue(#"
constructor TAceOptionsRenderer.Create(opts: Variant = null);
begin
  inherited Create();

  var numberTest: Integer := 58 * 7;
  var stringTest: String := 'This is a string';

  fOpts := TVariant.CreateObject;
  if opts <> null then begin
    //This is a small workarround
    asm
     @fOpts = Object.assign(@fOpts, @opts);
    end;
  end;
end;
", null);
      edtWidget.clearSelection();
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
