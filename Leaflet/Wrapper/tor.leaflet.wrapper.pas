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

unit tor.leaflet.wrapper;

interface

uses
  qtx.sysutils,
  qtx.classes,
  qtx.delegates,
  qtx.dom.types,
  qtx.dom.widgets;

type

  TLEvent = class;
  TLEvented = class;
  TLMap = class;
  TLTileLayer = class;
  TLLatLng = class;
  TLLatLngBounds = class;
  TLLayer = class;
  TLPoint = class;
  TLBounds = class;
  TLPopup = class;
  TLHandler = class;
  TLProjection = class;
  TLCRS = class;
  TLLayerGroup = class;
  TLTooltipOptions = class;
  TLTooltip = class;
  TLPath = class;
  TLPolyline = class;
  TLControl = class;

  TLPointArray = Array [0..1] of Float;

  TLEventEventHandler = procedure (evt: TLEvent);

  TLDivOverlay = class external
    offset: TLPoint; // = new TLPoint(0, 7);
    className: String = '';
    pane: String = 'popupPane';
  end;

  TLPopupOptions = class external (TLDivOverlay)
    maxWidth: Variant = 300;
    minWidth: Variant = 50;
    maxHeight: Variant = Null;
    autoPan: Boolean = true;
    autoPanPaddingTopLeft: TLPoint;
    autoPanPaddingBottomRight: TLPoint;
    autoPanPadding: TLPoint; //Point(5, 5)
    keepInView: Boolean = false;
    closeButton: Boolean = true;
    autoClose: Boolean = true;
    closeOnEscapeKey: Boolean = true;
    closeOnClick: Boolean;
    className: String = '';
  end;

  TLZoomOptions = class external
    animate: Boolean;
  end;

  TLPanOptions = class external (TLZoomOptions)
    duration: Float = 0.25;
    easeLinearity: Float = 0.25;
    noMoveStart: Boolean = false;
  end;

  TLZoomPanOptions = class external (TLPanOptions)
    //None
  end;

  TLFitBoundsOptions = class external (TLPanOptions)
    paddingTopLeft: TLPoint;
    paddingBottomRight: TLPoint;
    padding: TLPoint;
    maxZoom: Float = 0.0;
  end;

  TLLocateOptions = class external
    watch: Boolean = false;
    setView: Boolean = false;
    maxZoom: Integer = MaxInt();
    timeOut: Integer = 10000;
    maximumAge: Integer = 0;
    enableHighAccuracy: Boolean = false;
  end;

  TLEvent = class external
    &type: String;
    target: Variant;
    sourceTarget: Variant;
    propagatedFrom: Variant;
    layer: Variant;
  end;

  TLKeyboard  = class external (TLEvent)
    originalEvent: JEvent;
  end;

  TLMouseEvent = class external (TLEvent)
    latlng: TLLatLng;
    layerPoint: TLPoint;
    containerPoint: TLPoint;
    originalEvent: JEvent;
  end;

  TLLocationEvent = class external (TLEvent)
    latlng: TLLatLng;
    bounds: TLLatLngBounds;
    accuracy: Float;
    altitude: Float;
    altitudeAccuracy: Float;
    heading: Float;
    speed: Float;
    timestamp: Float;
  end;

  TLErrorEvent = class external (TLEvent)
    message: String;
    code: Integer;
  end;

  TLLayerEvent = class external (TLEvent)
    layer: TLLayer;
  end;

  TLTileEvent = class external (TLEvent)
    tile: JElement;
    coords: TLPoint;
  end;

  TLTileErrorEvent = class external (TLEvent)
    tile: JElement;
    coords: TLPoint;
    error: Integer;
  end;

  TLResizeEvent = class external (TLEvent)
    oldSize: TLPoint;
    newSize: TLPoint;
  end;

  TLGeoJSONEvent = class external (TLEvent)
    layer: TLLayer;
    properties: Variant;
    geometryType: String;
    id: String;
  end;

  TLPopupEvent = class external (TLEvent)
    popup: Variant;
  end;

  TLLatLng = class external "L.latLng"
  public
    constructor Create(latitude, longitude: Variant; altitude: Variant = 0); overload;
    constructor Create(coords: array[0..1] of Variant); overload;
    constructor Create(coords: array[0..2] of Variant); overload;
    constructor Create(coords: Variant); overload;
    function equals(otherLatLng: TLLatLng; maxMargin: Variant= Null): Boolean;
    function toString(): String;
    function distanceTo(otherLatLng: TLLatLng): Float;
    function wrap(): TLLatLng;
    function toBounds(sizeInMeters: Float): TLLatLngBounds;
  end;

  TLLatLngBounds = class external "L.latLngBounds"
  public
    constructor Create(corner1, corner2: TLLatLng); overload;
    constructor Create(latlngs: Variant); overload;
    function extend(latlng: TLLatLng): TLLatLngBounds; overload;
    function extend(otherBounds: TLLatLngBounds): TLLatLngBounds; overload;
    function pad(bufferRation: Float): TLLatLngBounds;
    function getCenter(): TLLatLng;
    function getSouthWest(): TLLatLng;
    function getNorthEast(): TLLatLng;
    function getNorthWest(): TLLatLng;
    function getSouthEast(): TLLatLng;
    function getWest(): Float;
    function getSouth(): Float;
    function getEast(): Float;
    function getNorth(): Float;
    function contains(otherBounds: TLLatLngBounds): Boolean; overload;
    function contains(latlng: TLLatLng): Boolean; overload;
    function intersects(otherBounds: TLLatLngBounds): Boolean;
    function overlaps(otherBounds: TLLatLngBounds): Boolean;
    function toBBoxString(): String;
    function equal(otherBounds: TLLatLngBounds; maxMargin: Variant = Null): Boolean;
    function isValid: Boolean;
  end;

  TLPoint = class external "L.point"
  public
    property x: Float;
    property y: Float;
    constructor Create(x, y: Float; round: Variant = Null); overload;
    constructor Create(coords: array [0..1] of Variant); overload;
    constructor Create(coords: Variant); overload;
    function clone(): TLPoint;
    function add(otherPoint: TLPoint): TLPoint;
    function substract(otherPoint: TLPoint): TLPoint;
    function divideBy(num: Float): TLPoint;
    function multiplyBy(num: FLoat): TLPoint;
    function scaleBy(scale: TLPoint): TLPoint;
    function unscaleBy(scale: TLPoint): TLPoint;
    function round(): TLPoint;
    function floor(): TLPoint;
    function ceil(): TLPoint;
    function trunc(): TLPoint;
    function distanceTo(otherPoint: TLPoint): Float;
    function equals(otherPoint: TLPoint): Boolean;
    function contains(otherPoint: TLPoint): Boolean;
    function toString(): String;
  end;

  TLBounds = class external "L.bounds"
  public
    property min: TLPoint;
    property max: TLPoint;
    constructor Create(corner1, corner2: TLPoint); overload;
    constructor Create(points: array of TLPoint); overload;
    function extend(point: TLPoint): TLBounds;
    function getCenter(round: Variant = Null): TLPoint;
    function getBottomLeft(): TLPoint;
    function getTopRight(): TLPoint;
    function getTopLeft(): TLPoint;
    function getBottomRight(): TLPoint;
    function getSize(): TLPoint;
    function contains(otherBounds: TLBounds): Boolean; overload;
    function contains(point: TLPoint): Boolean; overload;
    function intersects(otherBounds: TLBounds): Boolean;
    function overlaps(otherBounds: TLBounds): Boolean;
  end;

  TLEvented = class external "L.evented"
  public
    function on(evtType: String; evtHandler: variant; context: TObject = nil): TLEvented; overload;
    function on(evtMap: Variant): TLEvented; overload;
    function off(evtType: String; evtHandler: variant = null; context: TObject = nil): TLEvented; overload;
    function off(evtMap: Variant): TLEvented; overload;
    function off(): TLEvented; overload;
    function fire(evtType: String; data: TObject = nil; propagate: Boolean = false): TLEvented;
    function listens (evtType: String): boolean;
    function once(evtType: String; evtHandler: TLEventEventHandler; context: TObject = nil): TLEvented; overload;
    function once(evtMap: Variant): TLEvented; overload;
    function addEventParent(obj: TLEvented): TLEvented;
    function removeEventParent(obj: TLEvented): TLEvented;
    //TODO: Add aliases functions
  end;


  TLHandler = class external "L.Handler"
    function enable(): TLHandler;
    function disable(): TLHandler;
    function enabled(): Boolean;
    //procedure addHooks(); virtual; abstract;
    //procedure removeHooks(); virtual; abstract;
    function addTo(map: TLMap; name: String): TLHandler;
  end;

  TLProjection = class external "L.Projection"
    class var LonLat: TLProjection;
    class var Mercator: TLProjection;
    class var SphericalMercator: TLProjection;

    bounds: TLBounds;
    class function project(latlng: array[0..1] of Variant): TLPoint; overload;
    class function project(latlng: TLLatLng): TLPoint; overload;
    class function unproject(point: TLPoint): TLLatLng;
  end;

  TLCRS = class external "L.CRS"
    class var EPSG3395: TLCRS;
    class var EPSG3857: TLCRS;
    class var EPSG4326: TLCRS;
    class var Earth: TLCRS;
    class var Simple: TLCRS;
    class var Base: TLCRS;

    property code: String;
    property wrapLng: Array [0..1] of Float;
    property wrapLat: Array [0..1] of Float;
    property infinite: Boolean;

    class function latLngToPoint(latlng: TLLatLng; zoom: integer): TLPoint;
    class function pointToLatLng(point: TLPoint; zoom: integer): TLLatLng;
    class function project(latlng: TLLatLng): TLPoint;
    class function unproject(point: TLPoint): TLLatLng;
    class function scale(zoom: Integer): Integer;
    class function zoom(scale: Integer): Integer;
    class function getProjectedBounds(zoom: Integer): TLBounds;
    class function distance(latlng1, latlng2: TLLatLng): Integer;
    class function wrapLatLng(latlng: TLLatLng): TLLatLng;
    class function wrapLatLngBounds(bounds: TLLatLngBounds): TLLatLngBounds;
  end;

  TLLayerOptions = class external
    pane: String = 'overlayPane';
    attribution: Variant = null; //String
  end;

  TLLayer = class external "L.Layer" (TLEvented)
  public
    constructor Create(options: variant); overload;
    constructor Create(options: TLLayerOptions); overload;

    function addTo(map: TLMap): TLLayer;
    function remove(): TLLayer;
    function removeFrom(map: TLMap): TLLayer; overload;
    function removeFrom(group: TLLayerGroup): TLLayer; overload;
    function getPane(name: Variant = null): JElement;
    function getAttribution(): Variant;

    //Popup
    function bindPopup(content: variant; options: variant = null): TLLayer; overload;
    function bindPopup(content: variant; options: TLPopupOptions): TLLayer; overload;
    function unbindPopup(): TLLayer;
    function openPopup(latlng: variant = null): TLLayer; overload;
    function openPopup(latlng: TLLatLng): TLLayer; overload;
    function closePopup(): TLLayer;
    function togglePopup(): TLLayer;
    function isPopupOpen(): boolean;
    function setPopupContent(content: variant): TLLayer;
    function getPopup(): TLPopup;

    //Tooltips
    function bindTooltip(content: variant; options: variant = null): TLLayer; overload;
    function bindTooltip(content: variant; options: TLTooltipOptions): TLLayer; overload;
    function unbindTooltip(): TLLayer;
    function openTooltip(latlng: variant = null): TLLayer; overload;
    function openTooltip(latlng: TLLatLng): TLLayer; overload;
    function closeTooltip(): TLLayer;
    function toggleTooltip(): TLLayer;
    function isTooltipOpen(): boolean;
    function setTooltipContent(content: variant): TLLayer;
    function getTooltip(): TLTooltip;
  end;

  TLLayersArray = array of TLLayer;

  TLLayerGroup = class external "L.layerGroup"
    constructor Create(); overload;
    constructor Create(layers: TLLayersArray; options: variant = null); overload;
    constructor Create(layers: TLLayersArray; options: TLLayerOptions); overload;
  end;

  TLInteractiveLayerOptions = class external (TLLayerOptions)
    interactive: boolean = true;
    bubblingMouseEvents: boolean = true;
  end;

  TLInteractiveLayer = class external (TLLayer)
    constructor Create(options: variant = null); overload;
    constructor Create(options: TLInteractiveLayerOptions); overload;
  end;

  TLRendererOptions = class external
    padding: Float = 0.1;
    tolerance: Float = 0;
  end;

  TLRenderer = class external "L.Renderer" (TLLayer)
    constructor Create(options: Variant); overload;
    constructor Create(options: TLRendererOptions); overload;
  end;

  TLSVGRenderer = class external "L.svg" (TLRenderer)
    constructor Create(options: Variant); overload;
    constructor Create(options: TLRendererOptions); overload;

    class function createSVGElement(name: String): variant; external "create";
    class function pointsToPath(rings: array of TLPointArray; closed: boolean): String; overload;
    class function pointsToPath(rings: array of TLPoint; closed: boolean): String; overload;
  end;

  TLCanvasRenderer = class external "L.canvas" (TLRenderer)
    constructor Create(options: Variant); overload;
    constructor Create(options: TLRendererOptions); overload;
  end;

  TEachLayerProc = procedure (layer: TLLayer);

  TWhenReadyCB = procedure ();

  TLMap = class external "L.map" (TLEvented)
  public
    constructor Create(elId: String); overload;
    constructor Create(elId: String; options: Variant); overload;

    function getRenderer(layer: TLPath): TLRenderer;

    //Methods for Layers and Controls
    function addControl(control: TLControl): TLMap;
    function removeControl(control: TLControl): TLMap;
    function addLayer(layer: TLLayer): TLMap;
    function removeLayer(layer: TLLayer): TLMap;
    function hasLayer(layer: TLLayer): Boolean;
    function eachLayer(fn: TEachLayerProc; context: Variant = null): TLMap;
    function openPopup(popup: TLPopup): TLMap; overload;
    function openPopup(content: Variant; latlng: Variant; options: Variant = null): TLMap; overload;
    function closePopup(popup: TLPopup = nil): TLMap;
    function openTooltip(tooltip: TLTooltip): TLMap; overload;
    function openTooltip(content: Variant; latlng: Variant; option: Variant = null): TLTooltip; overload;
    function closeTooltip(tooltip: TLTooltip = nil): TLMap;

    //Methods for modifying map state
    function setView(center: Variant; zoom: Float; options: Variant = null): TLMap;
    function setZoom(zoom: Float; options: Variant = null): TLMap;
    function zoomIn(delta: Variant = null; zoomOptions: Variant = null): TLMap;
    function zoomOut(delta: Variant = null; zoomOptions: Variant = null): TLMap;
    function setZoomAround(latlng: Variant; zoom: Float; zoomOptions: Variant = null): TLMap; overload;
    function setZoomAround(offsetPoint: TLPoint; zoom: FLoat; zoomOptions: Variant = null): TLMap; overload;
    function fitBounds(bounds: Variant;  fitBoundsOptions: variant = null): TLMap;
    function fitWorld(fitBoundsOptions: variant = null): TLMap;
    function panTo(latlng: Variant; panOptions: Variant = null): TLMap;
    function panBy(offsetPoint: Variant; panOptions: Variant = null): TLMap;
    function flyTo(latlng: Variant; zoom: Variant = null; zoompanOptions: Variant = null): TLMap;
    function flyToBounds(bounds: Variant; fitBoundsOptions: Variant = null): TLMap;
    function setMaxBounds(bounds: Variant): TLMap;
    function setMinZoom(zoom: Float): TLMap;
    function setMaxZoom(zoom: Float): TLMap;
    function panInsideBounds(bounds: Variant; panOptions: Variant = null): TLMap;
    function panInside(latlng: Variant; panOptions: Variant = null): TLMap;
    function invalidateSize(animate: Boolean): TLMap; overload;
    function invalidateSize(zoomPanOptions: Variant): TLMap; overload;
    function stop(): TLMap;

    //Geolocation methods
    function locate(locateOptions: Variant): TLMap;
    function stopLocate(): TLMap;

    //Other methods
    function addHandler(name: String; handlerClass: Variant): TLMap;
    function remove(): TLMap;
    function createPane(name: String; container: Variant = null): TLMap;
    function getPane(pane: Variant): Variant;
    function getPanes(): Variant;
    function getContainer(): Variant;
    function whenReady(CB: TWhenReadyCB; context: Variant = null): TLMap;

    //Methods for Getting Map State
    function getCenter(): TLLatLng;
    function getZoom(): Float;
    function getBounds(): TLLatLngBounds;
    function minZoom(): FLoat;
    function maxZoom(): Float;
    function getBoundsZoom(bounds: TLLatLngBounds; inside: Variant = null; paddingPoint: Variant = null): Float;
    function getSize(): TLPoint;
    function getPixelBounds(): TLBounds;
    function getPixelOrigin(): TLPoint;
    function getPixelWorldBounds(zoom: Variant = null): TLBounds;

    //Conversion methods
    function getZoomScale(toZoom: Float; fromZoom: Float): Float;
    function getScaleZoom(scale: Float; fromZoom: Float): Float;
    function project(latlng: Variant; zoom: Float): TLPoint;
    function unproject(point: Variant; zoom: Float): TLLatLng;
    function layerPointToLatLng(point: Variant): TLLatLng;
    function latLngToLayerPoint(latlng: Variant): TLPoint;
    function wrapLatLng(latlng: Variant): TLLatLng;
    function wrapLatLngBounds(latLngBounds: Variant): TLLatLngBounds;
    function distance(latlng1, latlng2: Variant): Float;
    function containerPointToLayerPoint(point: Variant): TLPoint;
    function layerPointToContainerPoint(point: Variant): TLPoint;
    function containerPointToLatLng(point: Variant): TLLatLng;
    function latLngToContainerPoint(latlng: Variant): TLPoint;
    function mouseEventToContainerPoint(ev: TLMouseEvent): TLPoint;
    function mouseEventToLayerPoint(ev: TLMouseEvent): TLPoint;
    function mouseEventToLatLng(ev: TLMouseEvent): TLLatLng;
  end;

  TLPathOptions = class external
    stroke: Boolean = true;
    color: String = '#3388ff';
    weight: Integer = 3;
    opacity: Float = 0.1;
    lineCap: String = 'round';
    lineJoin: String = 'round';
    dashArray: String = '';
    dashOffset: String = '';
    fill: boolean;
    fillColor: String;
    fillOpacity: Float = 0.2;
    fillRule: String = 'evenodd';
    bubblingMouseEvents: Boolean = true;
    renderer: TLRenderer;
    className: string = '';
  end;

  TLPath = class external "L.path" (TLInteractiveLayer)
    constructor Create(options: variant = null); overload;
    constructor Create(options: TLPathOptions); overload;

    function redraw(): TLPath;
    function setStyle(options: Variant): TLPath; overload;
    function setStyle(options: TLPathOptions): TLPath; overload;
    function bringToFront(): TLPath;
    function bringToBack(): TLPath;
  end;

  TLPolylineOptions = class external
    smoothFactor: Float = 1.0;
    noClip: Boolean = false;
  end;

  TLPolyline = class external "L.polyline" (TLPath)
    constructor Create(latlngs: array of TLPointArray; options: variant = null); overload;
    constructor Create(latlngs: array of TLLatLng; options: variant = null); overload;
    constructor Create(latlngs: array of TLLatLng; options: TLPolylineOptions); overload;

    function toGeoJSON(precision: variant = null): TObject;
    function getLatLngs(): array of TLPointArray;
    function setLatLngs(latlngs: array of TLPointArray): TLPolyline;
    function isEmpty(): Boolean;
    function closestLayerPoint(point: TLPoint): TLPoint;
    function getCenter(): TLLatLng;
    function getBounds(): TLLatLngBounds;
    function addLatLng(latlng: TLLatLng): TLPolyline; overload;
    function addLatLng(latlng: TLLatLng; latlngs: array of TLLatLng): TLPolyline; overload;
  end;

  TLPolygon = class external "L.polygon" (TLPolyline)
    constructor Create(latlngs: array of TLPointArray; options: variant = null); overload;
    constructor Create(latlngs: array of TLLatLng; options: variant = null); overload;
    constructor Create(latlngs: array of TLLatLng; options: TLPolylineOptions); overload;

    function addTo(map: TLMap): TLPolygon;
  end;

  TLCircleMarkerOptions = class external
    radius: Float = 10;
  end;

  TLCircleMarker = class external "L.circleMarker" (TLPath)
    constructor Create(latlng: TLLatLng; options: variant = null); overload;
    constructor Create(latlng: TLLatLng; options: TLCircleMarkerOptions); overload;

    function toGeoJSON(precision: variant = null): TObject;
    function setLatLng(latlng: TLLatLng): TLCircleMarker;
    function getLatLng(): TLLatLng;
    function setRadius(radius: Float): TLCircleMarker;
    function getRadius(): Float;
  end;

  TLCircle = class external "L.circle" (TLCircleMarker)
    constructor Create(latlng: variant; options: variant = null); overload;
    constructor Create(latlng: TLLatLng; options: variant = null); overload;
    constructor Create(latlng: variant; options: TLCircleMarkerOptions); overload;
    constructor Create(latlng: TLLatLng; options: TLCircleMarkerOptions); overload;

    function setRadius(radius: Float): TLCircle;
    function getRadius(): Float;
    function getBounds(): TLLatLngBounds;

    function addTo(map: TLMap): TLCircle;
  end;

  TLTileLayer = class external "L.tileLayer" (TLLayer)
  public
   constructor Create(url: String; options: Variant);
   function addTo(map: TLMap): TLTileLayer;
  end;

  TLMarkerOptions = class external
    icon: Variant;
    keyboard: Boolean = true;
    title: String = '';
    alt: String = '';
    zIndexOffset: Integer = 0;
    opacity: Float = 1.0;
    riseOnHover: Boolean = false;
    riseOffset: Integer = 250;
    pane: String = 'markerPane';
    shadowPane: String = 'shadowPane';
    bubblingMouseEvents: Boolean = false;

    //Draggable marker options
    draggable: Boolean = false;
    autoPan: Boolean = false;
    autoPanPadding: TLPoint;
    autoPanSpeed: Integer = 50;

    //Interactive Layer
    interactive: Boolean = true;
  end;

  TLControlOptions = class external
    class const lcoTopLeft = 'topleft';
    class const lcoTopRight = 'topright';
    class const lcoBottomLeft = 'bottomleft';
    class const lcoBottomRight = 'bottomright';

    position: String = 'topright';
  end;

  TLControl = class external "L.Control"
    constructor Create(options: variant = null); overload;
    constructor Create(options: TLControlOptions); overload;

    function getPosition(): string;
    function setPosition(position: string): TLControl;
    function getContainer(): JElement;
    function addTo(map: TLMap): TLControl;
    function remove(): TLControl;
  end;

  TLControlZoomOptions = class external
    zoomInText: string = '+';
    zoomInTitle: string = 'Zoom in';
    zoomOutText: string = '&#x2212';
    zoomOutTitle: string = 'Zoom Out';
  end;

  TLControlZoom = class external "L.control.zoom" (TLControl)
    constructor Create(options: Variant); overload;
    constructor Create(options: TLControlZoomOptions); overload;
  end;

  TLControlAttributionOptions = class external
    prefix: String = 'Leaflet';
  end;

  TLControlAttribution = class external "L.control.attribution" (TLControl)
    constructor Create(options: Variant); overload;
    constructor Create(options: TLControlAttributionOptions); overload;

    function setPrefix(prefix: String): TLControlAttribution;
    function addAttribution(text: String): TLControlAttribution;
    function removeAttribution(text: String): TLControlAttribution;
  end;

  TLControlLayersOptions = class external
    collapsed: Boolean = true;
    autoZIndex: Boolean = true;
    hideSigleBase: Boolean = false;
    sortLayers: Boolean = false;
    sortFunction: Variant = null;
  end;

  TLControlLayers = class external "L.control.layers"(TLControl)
    constructor Create(baseLayers: variant = null; overlays: variant = null; options: variant = null); overload;
    constructor Create(baseLayers: variant; overlays: variant; options: TLControlLayersOptions); overload;

    function addBaseLayer(layer: TLLayer; name: String): TLControlLayers;
    function addOverlay(layer: TLLayer; name: String): TLControlLayers;
    function removeLayer(layer: TLLayer): TLControlLayers;
    function expand(): TLControlLayers;
    function collapse(): TLControlLayers;
  end;

  TLControlScaleOptions = class external
    maxWidth: Integer = 100;
    metric: Boolean = true;
    imperial: Boolean = true;
    updateWhenIdle: Boolean = true;
  end;

  TLControlScale = class external "L.control.scale" (TLControl)
    constructor Create(options: variant = null); overload;
    constructor Create(options: TLControlScaleOptions); overload;
  end;

  TLMarker = class external "L.marker" (TLLayer)
  public
   dragging: TLHandler;
   constructor Create(latlng: array[0..1] of Float);

   function getLatLng(): TLLatLng;
   function setLatLng(latlng: array[0..1] of Float): TLMarker; overload;
   function setLatLng(latlng: TLLatLng): TLMarker; overload;
   function setZIndexOffset(offset: Float): TLMarker;
   function getIcon(): Variant;
   function setIcon(icon: Variant): TLMarker;
   function setOpacity(opacity: Float): TLMarker;
   function toGeoJSON(precision: Float = 0.0): Variant;
   function addTo(map: TLMap): TLMarker;
  end;

  TLPopup = class external "L.popup" (TLLayer)
  public
    constructor Create(options: Variant = null; source: Variant = null); overload;
    constructor Create(options: TLPopupOptions); overload;
    constructor Create(options: TLPopupOptions; source: Variant); overload;
    constructor Create(options: TLPopupOptions; source: TLLayer); overload;
    function getLatLng(): TLLatLng;
    function setLatLng(latlng: array[0..1] of Variant): TLPopup; overload;
    function setLatLng(latlng: TLLatLng): TLPopup; overload;
    function getContent(): String;
    function setContent(htmlContent: String): TLPopup; overload;
    function setContent(htmlContent: JElement): TLPopup; overload;
    function setContent(htmlContent: Variant): TLPopup; overload;
    function getElement(): String;
    procedure update();
    function isOpen(): Boolean;
    function bringToFront(): TLPopup;
    function bringToBack(): TLPopup;
    function openOn(map: TLMap): TLPopup;
  end;

  TLTooltipOptions = class external (TLDivOverlay)
    pane: String = 'tooltipPane';
    offset: TLPoint;
    direction: String = 'auto';
    permanent: Boolean = false;
    sticky: Boolean = false;
    interactive: Boolean = false;
    opacity: Float = 0.9;
  end;

  TLTooltip = class external "L.tooltip" (TLLayer)
    constructor Create(options: Variant = null; source: TLLayer = nil); overload;
    constructor Create(options: TLTooltipOptions; source: TLLayer = nil); overload;
  end;

  TLGridLayerOptions = class external
    tileSize: Variant = 256;
    opacity: Float = 1.0;
    updateWhenIdle: Boolean;
    updateWhenZooming: Boolean = true;
    updateInterval: Integer = 200;
    zIndex: Integer = 1;
    bounds: TLLatLngBounds = nil;
    minZoom: Integer = 0;
    maxZoom: Variant = null;
    maxNativeZoom: Variant = null;
    minNativeZoom: Variant = null;
    noWrap: Boolean = false;
    pane: String = 'tilePane';
    className: String = '';
    keepBuffer: Integer = 2;
  end;

  TLGridLayer = class external "L.gridLayer" (TLLayer)
    constructor Create(options: variant = null); overload;
    constructor Create(options: TLGridLayerOptions); overload;

    function bringToFront(): TLGridLayer;
    function bringToBack(): TLGridLayer;
    function getContainer(): JElement;
    function setOpacity(opacity: Float): TLGridLayer;
    function setZIndex(zIndex: Integer): TLGridLayer;
    function isLoading(): Boolean;
    function redraw(): TLGridLayer;
    function getTileSize(): TLPoint;
  end;

  TLIconOptions = class external
    iconUrl: String = '';
    iconRetinaUrl: String = '';
    iconSize: TLPoint = nil;
    iconAnchor: TLPoint = nil;
    popupAnchor: Variant = [0, 0];
    tooltipAnchor: Variant = [0, 0];
    shadowUrl: String = '';
    shadowRetinaUrl: String = '';
    shadowSize: TLPoint = nil;
    shadowAnchor: TLPoint = nil;
    className: String = '';
  end;

  TLIcon = class external "L.icon"
    constructor Create(options: variant = null); overload;
    constructor Create(options: TLIconOptions); overload;

    function createIcon(oldIcon: JElement = nil): JElement;
    function createShadow(oldIcon: JElement = nil): JElement;
  end;

  TLDivIconOptions = class external (TLIconOptions)
    html: variant = '';
    bgPos: variant = [0, 0]; //TLPoint;
  end;

  TLDivIcon = class external "L.divIcon"
    constructor Create(option: variant); overload;
    constructor Create(options: TLDivIconOptions); overload;
  end;

  TLBrowser = class external
    webkit: Boolean;
    android: Boolean;
    android23: Boolean;
    androidStock: Boolean;
    opera: Boolean;
    chrome: Boolean;
    gecko: Boolean;
    safari: Boolean;
    opera12: Boolean;
    win: Boolean;
    ie3d: Boolean;
    webkit3d: Boolean;
    gecko3d: Boolean;
    any3d: Boolean;
    mobile: Boolean;
    mobileWebkit: Boolean;
    mobileWebkit3d: Boolean;
    msPointer: Boolean;
    pointer: Boolean;
    touch: Boolean;
    mobileOpera: Boolean;
    mobileGecko: Boolean;
    retina: Boolean;
    passiveEvents: Boolean;
    canvas: Boolean;
    svg: Boolean;
    vml: Boolean;
  end;

  //TQTXLeafletMapWidget
  TQTXLeafletMap = class;

  TQTXLeafletMapConstructor  = procedure (LeafletMap: TQTXLeafletMap);

  TQTXLeafletMap = class(TQTXWidget)
  private
    FMap: TLMap;
  protected
    procedure InitializeObject(); override;
    procedure FinalizeObject(); override;
  public
    property Map: TLMap read FMap write FMap;

    constructor Create(AOwner: TQTXComponent; CB: TQTXLeafletMapConstructor); override;
    destructor Destroy(); override;

    function getRenderer(layer: TLPath): TLRenderer;

    //Methods for Layers and Controls
    function addControl(control: TLControl): TLMap;
    function removeControl(control: TLControl): TLMap;
    function addLayer(layer: TLLayer): TLMap;
    function removeLayer(layer: TLLayer): TLMap;
    function hasLayer(layer: TLLayer): Boolean;
    function eachLayer(fn: TEachLayerProc; context: Variant = null): TLMap;
    function openPopup(popup: TLPopup): TLMap; overload;
    function openPopup(content: Variant; latlng: Variant; options: Variant = null): TLMap; overload;
    function closePopup(popup: TLPopup = nil): TLMap;
    function openTooltip(tooltip: TLTooltip): TLMap; overload;
    function openTooltip(content: Variant; latlng: Variant; option: Variant = null): TLTooltip; overload;
    function closeTooltip(tooltip: TLTooltip = nil): TLMap;

    //Methods for modifying map state
    function setView(center: Variant; zoom: Float; options: Variant = null): TLMap;
    function setZoom(zoom: Float; options: Variant = null): TLMap;
    function zoomIn(delta: Variant = null; zoomOptions: Variant = null): TLMap;
    function zoomOut(delta: Variant = null; zoomOptions: Variant = null): TLMap;
    function setZoomAround(latlng: Variant; zoom: Float; zoomOptions: Variant = null): TLMap; overload;
    function setZoomAround(offsetPoint: TLPoint; zoom: FLoat; zoomOptions: Variant = null): TLMap; overload;
    function fitBounds(bounds: Variant;  fitBoundsOptions: variant = null): TLMap;
    function fitWorld(fitBoundsOptions: variant = null): TLMap;
    function panTo(latlng: Variant; panOptions: Variant = null): TLMap;
    function panBy(offsetPoint: Variant; panOptions: Variant = null): TLMap;
    function flyTo(latlng: Variant; zoom: Variant = null; zoompanOptions: Variant = null): TLMap;
    function flyToBounds(bounds: Variant; fitBoundsOptions: Variant = null): TLMap;
    function setMaxBounds(bounds: Variant): TLMap;
    function setMinZoom(zoom: Float): TLMap;
    function setMaxZoom(zoom: Float): TLMap;
    function panInsideBounds(bounds: Variant; panOptions: Variant = null): TLMap;
    function panInside(latlng: Variant; panOptions: Variant = null): TLMap;
    function invalidateSize(animate: Boolean): TLMap; overload;
    function invalidateSize(zoomPanOptions: Variant): TLMap; overload;
    function stop(): TLMap;

    //Geolocation methods
    function locate(locateOptions: Variant): TLMap;
    function stopLocate(): TLMap;

    //Other methods
    function addHandler(name: String; handlerClass: Variant): TLMap;
    function remove(): TLMap;
    function createPane(name: String; container: Variant = null): TLMap;
    function getPane(pane: Variant): Variant;
    function getPanes(): Variant;
    function getContainer(): Variant;
    function whenReady(CB: TWhenReadyCB; context: Variant = null): TLMap;

    //Methods for Getting Map State
    function getCenter(): TLLatLng;
    function getZoom(): Float;
    function getBounds(): TLLatLngBounds;
    function minZoom(): FLoat;
    function maxZoom(): Float;
    function getBoundsZoom(bounds: TLLatLngBounds; inside: Variant = null; paddingPoint: Variant = null): Float;
    function getSize(): TLPoint;
    function getPixelBounds(): TLBounds;
    function getPixelOrigin(): TLPoint;
    function getPixelWorldBounds(zoom: Variant = null): TLBounds;

    //Conversion methods
    function getZoomScale(toZoom: Float; fromZoom: Float): Float;
    function getScaleZoom(scale: Float; fromZoom: Float): Float;
    function project(latlng: Variant; zoom: Float): TLPoint;
    function unproject(point: Variant; zoom: Float): TLLatLng;
    function layerPointToLatLng(point: Variant): TLLatLng;
    function latLngToLayerPoint(latlng: Variant): TLPoint;
    function wrapLatLng(latlng: Variant): TLLatLng;
    function wrapLatLngBounds(latLngBounds: Variant): TLLatLngBounds;
    function distance(latlng1, latlng2: Variant): Float;
    function containerPointToLayerPoint(point: Variant): TLPoint;
    function layerPointToContainerPoint(point: Variant): TLPoint;
    function containerPointToLatLng(point: Variant): TLLatLng;
    function latLngToContainerPoint(latlng: Variant): TLPoint;
    function mouseEventToContainerPoint(ev: TLMouseEvent): TLPoint;
    function mouseEventToLayerPoint(ev: TLMouseEvent): TLPoint;
    function mouseEventToLatLng(ev: TLMouseEvent): TLLatLng;
  end;

  var LBrowser external "L.Browser": TLBrowser;

implementation

//TQTXLeafletMap

constructor TQTXLeafletMap.Create(AOwner: TQTXComponent; CB: TQTXLeafletMapConstructor);
begin
  inherited Create(AOwner, procedure (Widget: TQTXWidget)
  begin
    Widget.WhenReady(procedure(Widget: TQTXWidget)
    var elId: String;
    begin
      TQTXDispatch.Execute(procedure()
      begin
        elId := Self.Attributes.AttributeRead('id');
        Widget.Style.width := '100%';
        Widget.Style.height := '200px';

        FMap := new TLMap(elId);

        if assigned(CB) then
          CB(self);
      end, 50);
    end);
  end);
end;

destructor TQTXLeafletMap.Destroy();
begin
  inherited;
end;

procedure TQTXLeafletMap.InitializeObject();
begin
  inherited;
end;

procedure TQTXLeafletMap.FinalizeObject();
begin

  inherited;
end;

function TQTXLeafletMap.getRenderer(layer: TLPath): TLRenderer;
begin
  Result := FMap.getRenderer(layer);
end;

//Methods for Layers and Controls
function TQTXLeafletMap.addControl(control: TLControl): TLMap;
begin
  Result := FMap.addControl(control);
end;

function TQTXLeafletMap.removeControl(control: TLControl): TLMap;
begin
  Result := FMap.removeControl(control);
end;

function TQTXLeafletMap.addLayer(layer: TLLayer): TLMap;
begin
  Result := FMap.addLayer(layer);
end;

function TQTXLeafletMap.removeLayer(layer: TLLayer): TLMap;
begin
  Result := Fmap.removeLayer(layer);
end;

function TQTXLeafletMap.hasLayer(layer: TLLayer): Boolean;
begin
  Result := FMap.hasLayer(layer);
end;

function TQTXLeafletMap.eachLayer(fn: TEachLayerProc; context: Variant = null): TLMap;
begin
  Result := FMap.eachLayer(fn, context);
end;

function TQTXLeafletMap.openPopup(popup: TLPopup): TLMap;
begin
  Result := FMap.openPopup(popup);
end;

function TQTXLeafletMap.openPopup(content: Variant; latlng: Variant; options: Variant = null): TLMap;
begin
  Result := FMap.openPopup(content, latlng, options);
end;

function TQTXLeafletMap.closePopup(popup: TLPopup = nil): TLMap;
begin
  Result := FMap.closePopup(popup);
end;

function TQTXLeafletMap.openTooltip(tooltip: TLTooltip): TLMap;
begin
  Result := FMap.openTooltip(tooltip);
end;

function TQTXLeafletMap.openTooltip(content: Variant; latlng: Variant; option: Variant = null): TLTooltip;
begin
  Result := FMap.openTooltip(content, latlng, option);
end;

function TQTXLeafletMap.closeTooltip(tooltip: TLTooltip = nil): TLMap;
begin
  Result := FMap.closeTooltip(tooltip);
end;

//Methods for modifying map state
function TQTXLeafletMap.setView(center: Variant; zoom: Float; options: Variant = null): TLMap;
begin
  Result := FMap.setView(center, zoom, options);
end;

function TQTXLeafletMap.setZoom(zoom: Float; options: Variant = null): TLMap;
begin
  Result := FMap.setZoom(zoom, options);
end;

function TQTXLeafletMap.zoomIn(delta: Variant = null; zoomOptions: Variant = null): TLMap;
begin
  Result := FMap.zoomIn(delta, zoomOptions);
end;

function TQTXLeafletMap.zoomOut(delta: Variant = null; zoomOptions: Variant = null): TLMap;
begin
  Result :=FMap.zoomOut(delta, zoomOptions);
end;

function TQTXLeafletMap.setZoomAround(latlng: Variant; zoom: Float; zoomOptions: Variant = null): TLMap;
begin
  Result := FMap.setZoomAround(latlng, zoom, zoomOptions);
end;

function TQTXLeafletMap.setZoomAround(offsetPoint: TLPoint; zoom: FLoat; zoomOptions: Variant = null): TLMap;
begin
  Result := FMap.setZoomAround(offsetPoint, zoom, zoomOptions);
end;

function TQTXLeafletMap.fitBounds(bounds: Variant;  fitBoundsOptions: variant = null): TLMap;
begin
  Result := FMap.fitBounds(bounds, fitBoundsOptions);
end;

function TQTXLeafletMap.fitWorld(fitBoundsOptions: variant = null): TLMap;
begin
  Result := FMap.fitWorld(fitBoundsOptions);
end;

function TQTXLeafletMap.panTo(latlng: Variant; panOptions: Variant = null): TLMap;
begin
  Result := FMap.panTo(latlng, panOptions);
end;

function TQTXLeafletMap.panBy(offsetPoint: Variant; panOptions: Variant = null): TLMap;
begin
  Result := FMap.panBy(offsetPoint, panOptions);
end;

function TQTXLeafletMap.flyTo(latlng: Variant; zoom: Variant = null; zoompanOptions: Variant = null): TLMap;
begin
  Result := FMap.flyTo(latlng, zoom, zoompanOptions);
end;

function TQTXLeafletMap.flyToBounds(bounds: Variant; fitBoundsOptions: Variant = null): TLMap;
begin
  Result := FMap.flyToBounds(bounds, fitBoundsOptions);
end;

function TQTXLeafletMap.setMaxBounds(bounds: Variant): TLMap;
begin
  Result := FMap.setMaxBounds(bounds);
end;

function TQTXLeafletMap.setMinZoom(zoom: Float): TLMap;
begin
  Result := FMap.setMinZoom(zoom);
end;

function TQTXLeafletMap.setMaxZoom(zoom: Float): TLMap;
begin
  Result := FMap.setMaxZoom(zoom);
end;

function TQTXLeafletMap.panInsideBounds(bounds: Variant; panOptions: Variant = null): TLMap;
begin
  Result := FMap.panInsideBounds(bounds, panOptions);
end;

function TQTXLeafletMap.panInside(latlng: Variant; panOptions: Variant = null): TLMap;
begin
  Result := FMap.panInside(latlng, panOptions);
end;

function TQTXLeafletMap.invalidateSize(animate: Boolean): TLMap;
begin
  Result := FMap.invalidateSize(animate);
end;

function TQTXLeafletMap.invalidateSize(zoomPanOptions: Variant): TLMap;
begin
  Result := FMap.invalidateSize(zoomPanOptions);
end;

function TQTXLeafletMap.stop(): TLMap;
begin
  Result := FMap.stop();
end;

//Geolocation methods
function TQTXLeafletMap.locate(locateOptions: Variant): TLMap;
begin
  Result := FMap.locate(locateOptions);
end;

function TQTXLeafletMap.stopLocate(): TLMap;
begin
  Result := FMap.stopLocate();
end;

//Other methods
function TQTXLeafletMap.addHandler(name: String; handlerClass: Variant): TLMap;
begin
  Result := FMap.addHandler(name, handlerClass);
end;

function TQTXLeafletMap.remove(): TLMap;
begin
  Result := FMap.remove();
end;

function TQTXLeafletMap.createPane(name: String; container: Variant = null): TLMap;
begin
  Result := FMap.createPane(name, container);
end;

function TQTXLeafletMap.getPane(pane: Variant): Variant;
begin
  Result := FMap.getPane(pane);
end;

function TQTXLeafletMap.getPanes(): Variant;
begin
  Result := FMap.getPanes();
end;

function TQTXLeafletMap.getContainer(): Variant;
begin
  Result := FMap.getContainer();
end;

function TQTXLeafletMap.whenReady(CB: TWhenReadyCB; context: Variant = null): TLMap;
begin
  Result := FMap.whenReady(CB, context);
end;

//Methods for Getting Map State
function TQTXLeafletMap.getCenter(): TLLatLng;
begin
  Result := FMap.getCenter();
end;

function TQTXLeafletMap.getZoom(): Float;
begin
  Result := FMap.getZoom();
end;

function TQTXLeafletMap.getBounds(): TLLatLngBounds;
begin
  Result := FMap.getBounds();
end;

function TQTXLeafletMap.minZoom(): FLoat;
begin
  Result := FMap.minZoom();
end;

function TQTXLeafletMap.maxZoom(): Float;
begin
  Result := FMap.maxZoom();
end;

function TQTXLeafletMap.getBoundsZoom(bounds: TLLatLngBounds; inside: Variant = null; paddingPoint: Variant = null): Float;
begin
  Result := FMap.getBoundsZoom(bounds, inside, paddingPoint);
end;

function TQTXLeafletMap.getSize(): TLPoint;
begin
  Result := FMap.getSize();
end;

function TQTXLeafletMap.getPixelBounds(): TLBounds;
begin
  Result := FMap.getPixelBounds();
end;

function TQTXLeafletMap.getPixelOrigin(): TLPoint;
begin
  Result := FMap.getPixelOrigin();
end;

function TQTXLeafletMap.getPixelWorldBounds(zoom: Variant = null): TLBounds;
begin
  Result := FMap.getPixelWorldBounds(zoom);
end;

//Conversion methods
function TQTXLeafletMap.getZoomScale(toZoom: Float; fromZoom: Float): Float;
begin
  Result := FMap.getZoomScale(toZoom, fromZoom);
end;

function TQTXLeafletMap.getScaleZoom(scale: Float; fromZoom: Float): Float;
begin
  Result := FMap.getScaleZoom(scale, fromZoom);
end;

function TQTXLeafletMap.project(latlng: Variant; zoom: Float): TLPoint;
begin
  Result := FMap.project(latlng, zoom);
end;

function TQTXLeafletMap.unproject(point: Variant; zoom: Float): TLLatLng;
begin
  Result := FMap.unproject(point, zoom);
end;

function TQTXLeafletMap.layerPointToLatLng(point: Variant): TLLatLng;
begin
  Result := FMap.layerPointToLatLng(point);
end;

function TQTXLeafletMap.latLngToLayerPoint(latlng: Variant): TLPoint;
begin
  Result := FMap.latLngToLayerPoint(latlng);
end;

function TQTXLeafletMap.wrapLatLng(latlng: Variant): TLLatLng;
begin
  Result := FMap.wrapLatLng(latlng);
end;

function TQTXLeafletMap.wrapLatLngBounds(latLngBounds: Variant): TLLatLngBounds;
begin
  Result := FMap.wrapLatLngBounds(latLngBounds);
end;

function TQTXLeafletMap.distance(latlng1, latlng2: Variant): Float;
begin
  Result := FMap.distance(latlng1, latlng2);
end;

function TQTXLeafletMap.containerPointToLayerPoint(point: Variant): TLPoint;
begin
  Result := FMap.containerPointToLayerPoint(point);
end;

function TQTXLeafletMap.layerPointToContainerPoint(point: Variant): TLPoint;
begin
  Result := FMap.layerPointToContainerPoint(point);
end;

function TQTXLeafletMap.containerPointToLatLng(point: Variant): TLLatLng;
begin
  Result := FMap.containerPointToLatLng(point);
end;

function TQTXLeafletMap.latLngToContainerPoint(latlng: Variant): TLPoint;
begin
  Result := FMap.latLngToContainerPoint(latlng);
end;

function TQTXLeafletMap.mouseEventToContainerPoint(ev: TLMouseEvent): TLPoint;
begin
  Result := FMap.mouseEventToContainerPoint(ev);
end;

function TQTXLeafletMap.mouseEventToLayerPoint(ev: TLMouseEvent): TLPoint;
begin
  Result := FMap.mouseEventToLayerPoint(ev);
end;

function TQTXLeafletMap.mouseEventToLatLng(ev: TLMouseEvent): TLLatLng;
begin
  Result := FMap.mouseEventToLatLng(ev);
end;

initialization

end.
