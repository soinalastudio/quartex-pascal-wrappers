/*
MIT License

Copyright (c) 2021, Toky Olivier RAZANAKOTONARIVO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

unit tor.youtubeapi.wrapper;

interface

uses
  qtx.sysutils, qtx.classes, qtx.dom.types, qtx.dom.widgets;

type
  TYoutubePlayer = class;
  TQTXYoutubePlayerWidget = class;

  TYoutubePlayerEvent = class external
    data: Variant;
    target: TYoutubePlayer;
  end;

  TYoutubePlayerEventCB = procedure (event: TYoutubePlayerEvent);

  TYoutubePlayerEvents = class external
    onReady : TYoutubePlayerEventCB = nil;
    onStateChange: TYoutubePlayerEventCB = nil;
    onPlaybackQualityChange: TYoutubePlayerEventCB = nil;
    onPlaybackRateChange: TYoutubePlayerEventCB = nil;
    onError: TYoutubePlayerEventCB = nil;
    onApiChange: TYoutubePlayerEventCB = nil;
  end;

  TYoutubePlayerOptions = class external
    height: String = '390';
    width: String = '640';
    videoId: String = '';
    events: TYoutubePlayerEvents = nil;
  end;

  TYoutubePlayerState = class external
    class var UNSTARTED external "YT.PlayerState.UNSTARTED": Integer;
    class var ENDED external "YT.PlayerState.ENDED": Integer;
    class var PLAYING external "YT.PlayerState.PLAYING": Integer;
    class var PAUSED external "YT.PlayerState.PAUSED": Integer;
    class var BUFFERING external "YT.PlayerState.BUFFERING": Integer;
    class var CUED external "YT.PlayerState.CUED": Integer;
  end;

  TSphericalProperties = class external
    yaw: Integer;
    pitch: Integer;
    roll: Integer;
    fov: Integer;
  end;

  TYoutubePlayer = class external "YT.Player"
    constructor Create(elID: String; youtubePlayerOptions: Variant = null);

    procedure loadVideoById(videoID: String; startSeconds: Integer); overload;
    procedure laodVideoById(options: Variant); overload;

    procedure cueVideoByUrl(mediaContentUrl: String; startSeconds:Integer); overload;
    procedure cueVideoByUrl(options: Variant); overload;

    procedure loadVideoByUrl(mediaContentUrl: String; startSeconds:Integer); overload;
    procedure loadVideoByUrl(options: Variant); overload;

    procedure cuePlaylist(playlist: String; index: Integer; startSeconds: Integer); overload;
    procedure cuePlaylist(playlist: Array of String; index: Integer; startSeconds: Integer); overload;
    procedure cuePlaylist(options: Variant); overload;

    procedure loadPlaylist(playlist: String; index: Integer; startSeconds: Integer); overload;
    procedure loadPlaylist(playlist: Array of String; index: Integer; startSeconds: Integer); overload;
    procedure loadPlaylist(options: Variant); overload;

    //Playback controls and player settings
    procedure playVideo();
    procedure pauseVideo();
    procedure seekTo(seconds: Integer; allowSeekAhead: Boolean);

    //Controlling playback of 360° videos
    function getSphericalProperties(): TSphericalProperties;
    procedure setSphericalProperties(properties: TSphericalProperties);

    //Playing a video in a playlist
    procedure nextVideo();
    procedure previousVideo();
    procedure playVideoAt();

    //Changing the player volume
    procedure mute();
    procedure unMute();
    function isMuted(): Boolean;
    procedure setVolume(volume: Integer);
    function getVolume(): Integer;

    //Setting the player size
    function setSize(width, height: Integer): Variant;

    //Setting the playback rate
    function getPlaybackRate(): Integer;
    procedure setPlaybackRate(suggestedRate: Integer);
    function getAvailablePlaybackRates(): Array of Integer;

    //Setting playback behavior for playlists
    procedure setLoop(loopPlaylists:Boolean);
    procedure setShuffle(shufflePlaylist:Boolean);

    //Playback status;
    function getVideoLoadedFraction(): Float;
    function getPlayerState(): Integer;
    function getCurrentTime(): Integer;
    function getVideoStartBytes(): Integer; deprecated "Deprecated as of October 31, 2012";
    function getVideoBytesLoaded(): Integer; deprecated "Deprecated as of July 18, 2012";
    function getVideoBytesTotal(): Integer; deprecated "Deprecated as of July 18, 2012";

    //Retrieving video information
    function getDuration(): Integer;
    function getVideoUrl(): String;
    function getVideoEmbedCode(): String;

    //Retrieving playlist information
    function getPlaylist(): Array Of String;
    function getPlaylistIndex(): Integer;

    //Adding or removing an event listener
    procedure addEventListener(event, listener: String);
    procedure removeEventListener(event, listener: String);

    //Accessing and modifying DOM nodes
    function getIframe(): JElement;
    procedure destroy();

    //Options
    function getOptions(): Array of String;
    function getOption(module, option: String): Variant;
    procedure setOption(module, option: String; value: Variant);
  end;

  TQTXYoutubePlayerConstructor = procedure (widget: TQTXYoutubePlayerWidget);
  TQTXYoutubeIframeAPIReadyCB = procedure (widget: TQTXYoutubePlayerWidget);

  TQTXYoutubePlayerWidget = class(TQTXWidget)
  private
    FOnYoutubeAPIReadyCB: TQTXYoutubeIframeAPIReadyCB = nil;
    FOnPlayerReadyCB: TYoutubePlayerEventCB = nil;
    FOnStateChanged: TYoutubePlayerEventCB = nil;
    FOnError: TYoutubePlayerEventCB = nil;
    FOnPlaybackQualityChange: TYoutubePlayerEventCB = nil;
    FOnPlaybackRateChange: TYoutubePlayerEventCB = nil;
    FOnApiChange: TYoutubePlayerEventCB = nil;
    FPlayerReady: Boolean;
    FOnYoutubeAPIReadyCalled: Boolean;
    procedure WaitYoutubeIframeAPIReady();
  public
    Player: TYoutubePlayer;

    property onPlayerReady: TYoutubePlayerEventCB read FOnPlayerReadyCB write FOnPlayerReadyCB;
    property onStateChange: TYoutubePlayerEventCB read FOnStateChanged write FOnStateChanged;
    property onError: TYoutubePlayerEventCB read FOnError write FOnError;
    property onPlaybackQualityChange: TYoutubePlayerEventCB read FOnPlaybackQualityChange write FOnPlaybackQualityChange;
    property onPlaybackRateChange: TYoutubePlayerEventCB read FOnPlaybackRateChange write FOnPlaybackRateChange;
    property onApiChange: TYoutubePlayerEventCB read FOnApiChange write FOnApiChange;

    property isPlayerReady: Boolean read FPlayerReady write FPlayerReady;

    procedure WhenYoutubeIframeAPIReady(CB: TQTXYoutubeIframeAPIReadyCB);
    procedure WhenPlayerReady(CB: TYoutubePlayerEventCB);
    procedure WhenPlayerStateChange(CB: TYoutubePlayerEventCB);
    procedure WhenPlayerError(CB: TYoutubePlayerEventCB);
    procedure WhenPlayerPlaybackQualityChange(CB: TYoutubePlayerEventCB);
    procedure WhenPlayerPlaybackRateChange(CB: TYoutubePlayerEventCB);
    procedure WhenPlayerApiChange(CB: TYoutubePlayerEventCB);
    constructor Create(AOwner: TQTXComponent; CB: TQTXYoutubePlayerConstructor; onPlayerReady: TYoutubePlayerEventCB = nil); reintroduce;
    destructor Destroy(); override;
  end;

var
  isYouTubeIframeAPIReady: Boolean;

implementation

//TQTXYoutubePlayerWidget
constructor TQTXYoutubePlayerWidget.Create(AOwner: TQTXComponent; CB: TQTXYoutubePlayerConstructor; onPlayerReady: TYoutubePlayerEventCB = nil);
begin
  inherited Create(AOwner, procedure (Widget: TQTXWidget)
  begin
    Widget.WhenReady(procedure(Widget: TQTXWidget)
    begin

      FPlayerReady := False;
      FOnYoutubeAPIReadyCalled := False;
      FOnPlayerReadyCB := onPlayerReady;

      WaitYoutubeIframeAPIReady();

      if assigned(CB) then
        CB(self);
    end);
  end);
end;

procedure TQTXYoutubePlayerWidget.WaitYoutubeIframeAPIReady();
begin
  if isYouTubeIframeAPIReady then begin
    if FOnYoutubeAPIReadyCalled = false then begin
      FOnYoutubeAPIReadyCalled := true;

      //TODO: not using TQTXDispatch here
      TQTXDispatch.Execute(procedure()
      begin
         Player := new TYoutubePlayer(Self.Attributes.AttributeRead('id'), class
           'events' = class
             'onReady' = procedure(event: TYoutubePlayerEvent)
             begin
               if Assigned(FOnPlayerReadyCB) then begin
                 FPlayerReady := True;
                 FOnPlayerReadyCB(event);
               end;
             end;
             'onStateChange' = procedure(event: TYoutubePlayerEvent)
             begin
               if Assigned(FOnStateChanged) then
                 FOnStateChanged(event);
             end;
             'onPlaybackQualityChange' = procedure(event: TYoutubePlayerEvent)
             begin
               if Assigned(FOnPlaybackQualityChange) then
                 FOnPlaybackQualityChange(event);
             end;
             'onPlaybackRateChange' = procedure(event: TYoutubePlayerEvent)
             begin
               if Assigned(FOnPlaybackRateChange) then
                 FOnPlaybackRateChange(event);
             end;
             'onError' = procedure(event: TYoutubePlayerEvent)
             begin
               if Assigned(FOnError) then
                 FOnError(event);
             end;
             'onApiChange' = procedure(event: TYoutubePlayerEvent)
             begin
               if Assigned(FOnApiChange) then
                 FOnApiChange(event);
             end;
           end;
         end);

      end, 50);

    end;
  end else begin
    TQTXDispatch.Execute(procedure()
    begin
       WaitYoutubeIframeAPIReady();
    end, 50);
  end;
end;

procedure TQTXYoutubePlayerWidget.WhenYoutubeIframeAPIReady(CB: TQTXYoutubeIframeAPIReadyCB);
begin
  FOnYoutubeAPIReadyCB := CB;
  if Assigned(CB) then
    WaitYoutubeIframeAPIReady();
end;

procedure TQTXYoutubePlayerWidget.WhenPlayerReady(CB: TYoutubePlayerEventCB);
begin
  FOnPlayerReadyCB := CB;
end;

procedure TQTXYoutubePlayerWidget.WhenPlayerStateChange(CB: TYoutubePlayerEventCB);
begin
  FOnStateChanged := CB;
end;

procedure TQTXYoutubePlayerWidget.WhenPlayerError(CB: TYoutubePlayerEventCB);
begin
  FOnError := CB;
end;

procedure TQTXYoutubePlayerWidget.WhenPlayerPlaybackQualityChange(CB: TYoutubePlayerEventCB);
begin
  FOnPlaybackQualityChange := CB;
end;

procedure TQTXYoutubePlayerWidget.WhenPlayerPlaybackRateChange(CB: TYoutubePlayerEventCB);
begin
  FOnPlaybackRateChange:= CB;
end;

procedure TQTXYoutubePlayerWidget.WhenPlayerApiChange(CB: TYoutubePlayerEventCB);
begin
  FOnApiChange := CB;
end;

destructor TQTXYoutubePlayerWidget.Destroy();
begin
  if Assigned(Player) then
    Player.destroy();

  inherited;
end;

initialization
  isYouTubeIframeAPIReady := false;
  asm
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    function onYouTubeIframeAPIReady() {
      @isYouTubeIframeAPIReady = true;
    }
  end;

end.
