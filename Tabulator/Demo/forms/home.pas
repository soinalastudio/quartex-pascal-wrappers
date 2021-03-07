unit home;

interface

uses
  qtx.sysutils,
  qtx.classes,

  qtx.dom.types,
  qtx.dom.events,
  qtx.dom.graphics,
  qtx.dom.widgets,
  qtx.dom.application,
  qtx.dom.forms,qtx.dom.control.label,
  qtx.dom.control.panel,
  qtx.dom.control.ContentBox;

type
  THomeForm = class(TQTXForm)
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

procedure THomeForm.StyleObject;
begin
  inherited;
  PositionMode := TQTXWidgetPositionMode.cpInitial;
  DisplayMode := TQTXWidgetDisplayMode.cdBlock;
  Style.width := '100%';
  Border.Padding := 2;
  Background.Color := clSilver;
end;

procedure THomeForm.InitializeObject;
begin
  inherited;

  OffCanvasMenuApplication.Title := 'Tabulator wrapper demos';

  FPanel := TQTXPanel.Create(self, procedure (Panel: TQTXPanel)
  begin
    Panel.PositionMode := TQTXWidgetPositionMode.cpInitial;
    Panel.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
    //Panel.Border.Padding := 2;
    Panel.Background.Color := clwhite;
    Panel.Style.border := 'none';

    Panel.Font.Family := "Segoe UI";
    Panel.Font.Size.&Type := TQTXSizeType.stPt;
    Panel.Font.Size.Value := 11;

    FLabel := TQTXLabel.Create(Panel,
    procedure (Label: TQTXLabel)
    begin
      Label.PositionMode := TQTXWidgetPositionMode.cpInitial;
      label.Caption :="<b>Welcome to this web application demonstrating the new wrapper of Tabulator.js for QTX";
      Label.Background.Color := clWhite;
      Label.AlignH := chCenter;
      Label.AlignV := cvMiddle;
    end);
    FLabel.Border.Bottom.Margin := 2;
  end);
end;

procedure THomeForm.FinalizeObject;
begin
  FLabel.free;
  FPanel.free;
  inherited;
end;

end.
