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

  qtx.dom.stylesheet,
  tor.leaflet.wrapper;

type

  TMyForm = class(TQTXForm)
  private
    FLabel:   TQTXLabel;
    FPanel:   TQTXPanel;
    FMap:     TQTXLeafletMap;
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
      label.Caption :="This is the translation of the quick start guide found at: <a href='https://leafletjs.com/examples/quick-start/'>https://leafletjs.com/examples/quick-start/</a>";
      Label.AlignH := chCenter;
      Label.AlignV := cvMiddle;
    end);
    FLabel.Border.Bottom.Margin := 2;

    FMap := TQTXLeafletMap.Create(Panel, procedure(MapWidget: TQTXLeafletMap)
    begin
      MapWidget.Style.marginTop := '15px';
      MapWidget.Style.width := '500px';
      MapWidget.Style.height := '300px';

      MapWidget.setView([51.505, -0.09], 13).setZoom(13);

      var layer: TLTileLayer = new TLTileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', class
        attribution := 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
        maxZoom := 18;
        id := 'mapbox/streets-v11';
        tileSize := 512;
        zoomOffset := -1;
        accessToken := 'pk.eyJ1IjoicnRva3lvbGl2aWVyIiwiYSI6ImNra2Q5dndyazBvNjEyb256N2JsZjRxM2QifQ.LqmOHNfg15rrfDvuDZuIJw'
      end).addTo(MapWidget.Map);

      var marker: TLMarker := new TLMarker([51.5, -0.09]).addTo(MapWidget.Map);

      var circle: TLCircle := new TLCircle ([51.508, -0.11], class
          color := 'red';
          fillColor := '#f03';
          fillOpacity := 0.5;
          radius := 500
      end).addTo(MapWidget.Map);

      var polygon: TLPolygon := new TLPolygon([
          [51.509, -0.08],
          [51.503, -0.06],
          [51.51, -0.047]
      ]).addTo(MapWidget.Map);

      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      circle.bindPopup("I am a circle.");
      polygon.bindPopup("I am a polygon.");

      var popup: TLPopup := new TLPopup()
          .setLatLng([51.5, -0.09])
          .setContent("I am a standalone popup.")
          .openOn(MapWidget.Map);

      MapWidget.Map.on("click", procedure (evt: TLMouseEvent)
      begin
        new TLPopup()
          .setLatLng(evt.latlng)
          .setContent("You clicked the map at " + evt.latlng.toString())
          .openOn(MapWidget.Map);
      end);

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
