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
  qtx.dom.control.panel,
  qtx.dom.control.button,

  qtx.dom.stylesheet,

  tor.youtubeapi.wrapper;

type

  TMyForm = class(TQTXForm)
  private
    FLabel:   TQTXLabel;
    FPanel:   TQTXPanel;
    FPlayButton: TQTXButton;
    FPauseButton: TQTXButton;
    FGetUrlButton: TQTXButton;
    FYoutubePlayer: TQTXYoutubePlayerWidget;
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
      Label.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      label.Caption :="We will load here one popular youtube video ;) :";
      Label.AlignH := chCenter;
      Label.AlignV := cvMiddle;
    end);
    FLabel.Border.Bottom.Margin := 2;

    FYoutubePlayer := TQTXYoutubePlayerWidget.Create(Panel,
    procedure (widget: TQTXYoutubePlayerWidget)
    begin
      widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      widget.Width := 500;
      widget.Height := 380;

      widget.WhenPlayerReady(procedure (event: TYoutubePlayerEvent)
      begin
        event.target.loadVideoById('j0lEyk4IxgA', 0);
      end);

      widget.WhenPlayerStateChange(procedure (event: TYoutubePlayerEvent)
      begin
        case event.data of
          TYoutubePlayerState.PLAYING: begin
            FPauseButton.Enabled := True;
            FPlayButton.Enabled := False;
          end;
          TYoutubePlayerState.UNSTARTED, TYoutubePlayerState.BUFFERING: begin
            FPauseButton.Enabled := False;
            FPlayButton.Enabled := True;
          end;
          TYoutubePlayerState.PAUSED: begin
            FPauseButton.Enabled := False;
            FPlayButton.Enabled := True;
          end;
        end;
      end);
    end);

    FPlayButton := TQTXButton.Create(panel, procedure (Button: TQTXButton)
    begin
      Button.InnerHtml := 'Play';
      Button.OnClick := procedure(Sender: TObject)
      begin
        if FYoutubePlayer.isPlayerReady then
          FYoutubePlayer.Player.playVideo();
      end;
    end);

    FPauseButton := TQTXButton.Create(panel, procedure (Button: TQTXButton)
    begin
      Button.InnerHtml := 'Pause';
      Button.OnClick := procedure(Sender: TObject)
      begin
        FYoutubePlayer.Player.pauseVideo();
      end;
    end);

    FGetUrlButton := TQTXButton.Create(panel, procedure (Button: TQTXButton)
    begin
      Button.InnerHtml := 'Url Video';
      Button.OnClick := procedure(Sender: TObject)
      begin
        ShowMessage('Url video is: ' + FYoutubePlayer.Player.getVideoUrl);
      end;
    end);

    var NewLabel := TQTXLabel.Create(Panel,
    procedure (Label: TQTXLabel)
    begin
      Label.PositionMode := TQTXWidgetPositionMode.cpInitial;
      Label.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      label.Caption :="We will load another video below :";
      Label.AlignH := chCenter;
      Label.AlignV := cvMiddle;
    end);
    FLabel.Border.Bottom.Margin := 2;
    FLabel.Border.Top.Margin := 2;

    var SecondPlayer := TQTXYoutubePlayerWidget.Create(Panel,
    procedure (widget: TQTXYoutubePlayerWidget)
    begin
      widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      widget.Width := 500;
      widget.Height := 380;

      widget.WhenPlayerReady(procedure (event: TYoutubePlayerEvent)
      begin
        event.target.loadVideoById('1i8uN8r2g1o', 0);
      end);

      widget.WhenPlayerStateChange(procedure (event: TYoutubePlayerEvent)
      begin
        //Your code here
      end);
    end);

  end);
end;

procedure TMyForm.FinalizeObject;
begin
  FLabel.free;
  FPanel.free;
  FPlayButton.Free;
  FPauseButton.Free;
  FYoutubePlayer.Free;
  inherited;
end;


end.
