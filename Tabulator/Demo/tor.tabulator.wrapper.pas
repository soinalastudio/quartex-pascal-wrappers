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

unit tor.tabulator.wrapper;

interface

uses
  qtx.sysutils,
  qtx.classes,
  qtx.delegates,
  qtx.dom.types,
  qtx.dom.widgets,
  qtx.promises;

const
  TabulatorWrapperVersion = '0.1';

type
  TTabulator = class;
  TTabulatorRowComponent = class;
  TTabulatorColumnComponent = class;
  TTabulatorCellComponent = class;
  TQTXTabulator = class;

  TTabulatorStdCB = procedure ();
  TTabulatorDataCB = procedure (data: Variant);
  TTabulatorCellContextMenuCB = procedure (e: Variant; cell: TTabulatorCellComponent);

  TTabulatorOptionsRenderer = class
  protected
    fOpts: Variant;
    function getProp(prop: String): Variant;
    procedure setProp(prop: String; value: Variant);
  public
    constructor Create(opts: Variant = null);
    function RenderOptions(): Variant; virtual;
  end;

  TTabulatorBuiltinEditorType = class
    class var INPUT = 'input';
    class var NUMBER = 'number';
    class var CHEXBOX = 'checkbox';
    class var STAR = 'star';
    class var SELECT = 'select';
    class var AUTOCOMPLETE = 'autocomplete';
  end;

  TTabulatorValidationMode = class
    class var HIGHLIGHT = 'highlight';
    class var BLOCKING = 'blocking';
    class var MANUAL = 'manual';
  end;

  TTabulatorBultinValidator = class
    class var REQUIRED = 'required';
    class var UNIQUE = 'unique';
    class var &INTEGER = 'integer';
    class var &FLOAT = 'float';
    class var &NUMERIC = 'numeric';
    class var &STRING = 'string';
  end;

  TTabulatorBultinCalculationFunction = class
    class var AVERAGE = 'avg';
    class var MAX = 'max';
    class var MIN = 'min';
    class var SUM = 'sum';
    class var CONCAT = 'concat';
  end;

  TTabulatorCalculationVisibility = class
    class var &TRUE = 'true';
    class var BOTH = 'both';
    class var TABLE = 'table';
    class var GROUP = 'group';
  end;

  TTabulatorColumnDefinition = class (TTabulatorOptionsRenderer)
  public
    //General
    property title: String read (getProp('title')) write (setProp('title', value)) default '';
    property field: String read (getProp('field')) write (setProp('field', value)) default '';
    property visible: Boolean read (getProp('visible')) write (setProp('visible', value)) default true;

    //Layout
    property hozAlign: String  read (getProp('hozAlign')) write (setProp('hozAlign', value)) default 'left'; //left - center - right
    property vertAlign: String  read (getProp('vertAlign')) write (setProp('vertAlign', value)) default 'top'; //top - middle - bottom
    property headerHozAlign : String  read (getProp('headerHozAlign')) write (setProp('headerHozAlign', value)) default 'left'; //left - center - right
    property width: Variant  read (getProp('width')) write (setProp('width', value));
    property minWidth: Variant read (getProp('minWidth')) write (setProp('minWidth', value));
    property maxWidth: Variant  read (getProp('maxWidth')) write (setProp('maxWidth', value));
    property widthGrow: Variant  read (getProp('widthGrow')) write (setProp('widthGrow', value));
    property widthShrink: Variant  read (getProp('widthShrink')) write (setProp('widthShrink', value));
    property resizable: Boolean read (getProp('resizable')) write (setProp('resizable', value)) default true;
    property frozen: Boolean  read (getProp('frozen')) write (setProp('frozen', value)) default false;
    property responsive: Boolean read (getProp('responsive')) write (setProp('responsive', value)) default false;
    property tooltip: Boolean  read (getProp('tooltip')) write (setProp('tooltip', value)) default false;
    property cssClass: String  read (getProp('cssClass')) write (setProp('cssClass', value));
    property rowHandle: Boolean  read (getProp('rowHandle')) write (setProp('rowHandle', value));
    property htmlOutput: Variant  read (getProp('htmlOutput')) write (setProp('htmlOutput', value));
    property print: Boolean  read (getProp('print')) write (setProp('print', value)) default true;
    property clipboard: Boolean  read (getProp('clipboard')) write (setProp('clipboard', value)) default true;

    //Callbacks
    property headerClick: variant read (getProp('headerClick')) write (setProp('headerClick', value));
    property headerContext: variant read (getProp('headerContext')) write (setProp('headerContext', value));
    property headerTap: variant read (getProp('headerTap')) write (setProp('headerTap', value));
    property headerDblTap: variant read (getProp('headerDblTap')) write (setProp('headerDblTap', value));
    property headerTapHold: variant read (getProp('headerTapHold')) write (setProp('headerTapHold', value));
    //Cell callbacks
    property cellClick: variant read (getProp('cellClick')) write (setProp('cellClick', value));
    property cellDblClick: variant read (getProp('cellDblClick')) write (setProp('cellDblClick', value));
    property cellContext: variant read (getProp('cellContext')) write (setProp('cellContext', value));
    property cellTap: variant read (getProp('cellTap')) write (setProp('cellTap', value));
    property cellDblTap: variant read (getProp('cellDblTap')) write (setProp('cellDblTap', value));
    property cellTapHold: variant read (getProp('cellTapHold')) write (setProp('cellTapHold', value));
    property cellMouseEnter: variant read (getProp('cellMouseEnter')) write (setProp('cellMouseEnter', value));
    property cellMouseLeave: variant read (getProp('cellMouseLeave')) write (setProp('cellMouseLeave', value));
    property cellMouseOver: variant read (getProp('cellMouseOver')) write (setProp('cellMouseOver', value));
    property cellMouseOut: variant read (getProp('cellMouseOut')) write (setProp('cellMouseOut', value));
    property cellMouseMove: variant read (getProp('cellMouseMove')) write (setProp('cellMouseMove', value));
    property cellEditing: variant read (getProp('cellEditing')) write (setProp('cellEditing', value));
    property cellEditCancelled: variant read (getProp('cellEditCancelled')) write (setProp('cellEditCancelled', value));
    property cellEdited: variant read (getProp('cellEdited')) write (setProp('cellEdited', value));
    //Html output callback
    property accessorHtmlOutput: variant read (getProp('accessorHtmlOutput')) write (setProp('accessorHtmlOutput', value));
    property accessorHtmlOutputParams: variant read (getProp('accessorHtmlOutputParams')) write (setProp('accessorHtmlOutputParams', value));
    property formatter: variant read (getProp('formatter')) write (setProp('formatter', value));
    property formatterHtmlOutput: variant read (getProp('formatterHtmlOutput')) write (setProp('formatterHtmlOutput', value));
    property rowFormatter: variant read (getProp('rowFormatter')) write (setProp('rowFormatter', value));
    property rowFormatterHtmlOutput: variant read (getProp('rowFormatterHtmlOutput')) write (setProp('rowFormatterHtmlOutput', value));
    property groupHeader: variant read (getProp('groupHeader')) write (setProp('groupHeader', value));
    property groupHeaderHtmlOutput: variant read (getProp('groupHeaderHtmlOutput')) write (setProp('groupHeaderHtmlOutput', value));
    //Mutator
    property mutator: variant read (getProp('mutator')) write (setProp('mutator', value));
    property mutatorParams: variant read (getProp('mutatorParams')) write (setProp('mutatorParams', value));
    property mutatorEdit: variant read (getProp('mutatorEdit')) write (setProp('mutatorEdit', value));
    property mutatorEditParams: variant read (getProp('mutatorEditParams')) write (setProp('mutatorEditParams', value));
    property mutatorData: variant read (getProp('mutatorData')) write (setProp('mutatorData', value));
    property mutatorDataParams: variant read (getProp('mutatorDataParams')) write (setProp('mutatorDataParams', value));
    property mutatorClipboard: variant read (getProp('mutatorClipboard')) write (setProp('mutatorClipboard', value));
    property mutatorClipboardParams: variant read (getProp('mutatorClipboardParams')) write (setProp('mutatorClipboardParams', value));
    //Accessor
    property accessor: variant read (getProp('accessor')) write (setProp('accessor', value));
    property accessorParams: variant read (getProp('accessorParams')) write (setProp('accessorParams', value));
    property accessorData : variant read (getProp('accessorData')) write (setProp('accessorData', value));
    property accessorDataParams: variant read (getProp('accessorDataParams')) write (setProp('accessorDataParams', value));
    property accessorDownload: variant read (getProp('accessorDownload')) write (setProp('accessorDownload', value));
    property accessorDownloadParams: variant read (getProp('accessorDownloadParams')) write (setProp('accessorDownloadParams', value));
    property accessorClipboard: variant read (getProp('accessorClipboard')) write (setProp('accessorClipboard', value));
    property accessorClipboardParams: variant read (getProp('accessorClipboardParams')) write (setProp('accessorClipboardParams', value));
    property accessorPrint: variant read (getProp('accessorPrint')) write (setProp('accessorPrint', value));
    property accessorPrintParams: variant read (getProp('accessorPrintParams')) write (setProp('accessorPrintParams', value));
    //Editor
    property editor: variant read (getProp('editor')) write (setProp('editor', value));
    property editorParams: variant read (getProp('editorParams')) write (setProp('editorParams', value));
    //Validation
    property validator: variant read (getProp('validator')) write (setProp('validator', value));
    property validationMode: variant read (getProp('validationMode')) write (setProp('validationMode', value));
    //Sorting
    property sorter: variant read (getProp('sorter')) write (setProp('sorter', value));
    property sorterParams: variant read (getProp('sorterParams')) write (setProp('sorterParams', value));
    //Filtering
    property headerFilter: variant read (getProp('headerFilter')) write (setProp('headerFilter', value));
    property headerFilterParams: variant read (getProp('headerFilterParams')) write (setProp('headerFilterParams', value));
    property headerFilterLiveFilter: variant read (getProp('headerFilterLiveFilter')) write (setProp('headerFilterLiveFilter', value));
    property headerFilterEmptyCheck: variant read (getProp('headerFilterEmptyCheck')) write (setProp('headerFilterEmptyCheck', value));
    //Calculation
    property topCalc: variant read (getProp('topCalc')) write (setProp('topCalc', value));
    property topCalcParams: variant read (getProp('topCalcParams')) write (setProp('topCalcParams', value));
    property bottomCalc: variant read (getProp('bottomCalc')) write (setProp('bottomCalc', value));
    property bottomCalcParams: variant read (getProp('bottomCalcParams')) write (setProp('bottomCalcParams', value));
    property topCalcFormatter: variant read (getProp('topCalcFormatter')) write (setProp('topCalcFormatter', value));
    property topCalcFormatterParams: variant read (getProp('topCalcFormatterParams')) write (setProp('topCalcFormatterParams', value));
    property bottomCalcFormatter: variant read (getProp('bottomCalcFormatter')) write (setProp('bottomCalcFormatter', value));
    property bottomCalcFormatterParams: variant read (getProp('bottomCalcFormatterParams')) write (setProp('bottomCalcFormatterParams', value));
    //Menu
    property headerMenu: variant read (getProp('headerMenu')) write (setProp('headerMenu', value));
    property headerContextMenu: variant read (getProp('headerContextMenu')) write (setProp('headerContextMenu', value));
    property contextMenu: variant read (getProp('contextMenu')) write (setProp('contextMenu', value));
    property clickMenu: variant read (getProp('clickMenu')) write (setProp('clickMenu', value));
    property columns: variant read (getProp('columns')) write (setProp('columns', value));
    //Clipboard;
    property titleClipboard: String read (getProp('titleClipboard')) write (setProp('titleClipboard', value));
    //Download;
    property download: boolean read (getProp('download')) write (setProp('download', value));
    property titleDownload: boolean read (getProp('titleDownload')) write (setProp('titleDownload', value));
    //Print
    property printHeader: Variant read (getProp('printHeader')) write (setProp('printHeader', value));
    property printFooter: Variant read (getProp('printFooter')) write (setProp('printFooter', value));

    class function RenderFromParams(sTitle: String = ''; sField: String = ''; opts: Variant = null): Variant;
    constructor Create(sTitle: String = ''; sField: String = ''; opts: Variant = null);
  end;

  TTabulatorMenuItemOptions = class (TTabulatorOptionsRenderer)
    property label: variant read (getProp('label')) write (setProp('label', value));
    property action: variant read (getProp('action')) write (setProp('action', value));
    property disabled: variant read (getProp('disabled')) write (setProp('disabled', value));
    property separator: boolean read (getProp('separator')) write (setProp('separator', value));
    property menu: variant read (getProp('menu')) write (setProp('menu', value));

    class function RenderFromParams(sLabel, sAction: Variant; sMenu: Variant = null; sSeparator: Variant = null; sDisabled : Variant = null): Variant;
  end;

  TTabulatorGroupPersistenceOptions = class (TTabulatorOptionsRenderer)
    property groupby: boolean read (getProp('groupby')) write (setProp('groupby', value));
    property groupStartOpen: boolean read (getProp('groupStartOpen')) write (setProp('groupStartOpen', value));
    property groupHeader: boolean read (getProp('groupHeader')) write (setProp('groupHeader', value));

    class function RenderFromParams(sGroupBy, sGroupStartOpen, sGroupHeader: Boolean): Variant;
  end;

  TTabulatorPagePersistenceOptions = class (TTabulatorOptionsRenderer)
    property size: boolean read (getProp('size')) write (setProp('size', value));
    property page: boolean read (getProp('page')) write (setProp('page', value));

    class function RenderFromParams(sSize, sPage: Boolean): Variant;
  end;

  TTabulatorPersistenceOptions = class (TTabulatorOptionsRenderer)
    property sort: boolean read (getProp('sort')) write (setProp('sort', value));
    property filter: boolean read (getProp('filter')) write (setProp('filter', value));
    property group: variant read (getProp('group')) write (setProp('group', value));
    property page: variant read (getProp('page')) write (setProp('page', value));
    property columns: variant read (getProp('columns')) write (setProp('columns', value));

    class function RenderFromParams(sSort, sFilter, sGroup, sPage, sColumns: Variant): Variant;
  end;

  TTabulatorOptions = class (TTabulatorOptionsRenderer)
  public
    //General table configuration
    property height: Variant read (getProp('height')) write (setProp('height', value)) default false;
    property minHeight: Variant read (getProp('minHeight')) write (setProp('minHeight', value));
    property maxHeight: Variant read (getProp('maxHeight')) write (setProp('maxHeight', value));
    property virtualDom: Boolean read (getProp('virtualDom')) write (setProp('virtualDom', value)) default true;
    property virtualDomBuffer: Integer read (getProp('virtualDomBuffer')) write (setProp('virtualDomBuffer', value)) default 0;
    property virtualDomHoz: Boolean read (getProp('virtualDomHoz')) write (setProp('virtualDomHoz', value));
    property placeholder: String read (getProp('placeholder')) write (setProp('placeholder', value));
    property footerElement: Variant read (getProp('footerElement')) write (setProp('footerElement', value));
    property tooltips: Variant read (getProp('tooltips')) write (setProp('tooltips', value));
    property tooltipGenerationMode: String read (getProp('tooltipGenerationMode')) write (setProp('tooltipGenerationMode', value)) default 'load';
    property history: Variant read (getProp('history')) write (setProp('history', value));
    property keybindings: Variant read (getProp('keybindings')) write (setProp('keybidings', value));
    property locale: Variant read (getProp('locale')) write (setProp('locale', value));
    property langs: Variant read (getProp('langs')) write (setProp('langs', value));
    property downloadConfig: Variant read (getProp('downloadConfig')) write (setProp('downloadConfig', value));
    property downloadRowRange: String read (getProp('downloadRowRange')) write (setProp('downloadRowRange', value)) default 'active';
    property htmlOutputConfig: Variant read (getProp('htmlOutputConfig')) write (setProp('htmlOutputConfig', value));
    property reactiveData: Boolean read (getProp('reactiveDate')) write (setProp('reactiveData', value));
    property tabEndNewRow: Variant read (getProp('tabEndNewRow')) write (setProp('tabEndNewRow', value));
    property validationMode: String read (getProp('validationMode')) write (setProp('validationMode', value)) default 'blocking';
    property textDirection: String read (getProp('textDirection')) write (setProp('textDirection', value)) default 'auto';
    property invalidOptionWarnings: Boolean read (getProp('invalidOptionWarnings')) write (setProp('invalidOptionWarnings', value)) default true;

    //Columns
    columns: array of Variant;
    property autoColumns: boolean read (getProp('autoColumns')) write (setProp('autoColumns', value)) default false;
    property autoColumnsDefinitions: Variant read (getProp('autoColumnsDefinitions')) write (setProp('autoColumnsDefinitions', value)) default false;
    property layout: string read (getProp('layout')) write (setProp('layout', value)) default "fitData";
    property layoutColumnsOnNewData: boolean read (getProp('layoutColumnsOnNewData')) write (setProp('layoutColumnsOnNewData', value)) default false;
    property responsiveLayout: boolean read (getProp('responsiveLayout')) write (setProp('responsiveLayout', value)) default false;
    property responsiveLayoutCollapseStartOpen: boolean read (getProp('responsiveLayoutCollapseStartOpen')) write (setProp('responsiveLayoutCollapseStartOpen', value)) default true;
    property responsiveLayoutCollapseUseFormatters: boolean read (getProp('responsiveLayoutCollapseUseFormatters')) write (setProp('responsiveLayoutCollapseUseFormatters', value)) default true;
    property responsiveLayoutCollapseFormatter: Variant read (getProp('responsiveLayoutCollapseFormatter')) write (setProp('responsiveLayoutCollapseFormatter', value)) ;
    property cellHozAlign: string read (getProp('cellHozAlign')) write (setProp('cellHozAlign', value)) default "left";
    property cellVertAlign: string read (getProp('cellVertAlign')) write (setProp('cellVertAlign', value)) default "top";
    property headerHozAlign: string read (getProp('headerHozAlign')) write (setProp('headerHozAlign', value)) default "left";
    property columnMinWidth: integer read (getProp('columnMinWidth')) write (setProp('columnMinWidth', value)) default 40;
    property columnMaxWidth: integer read (getProp('columnMaxWidth')) write (setProp('columnMaxWidth', value)) ;
    property resizableColumns: boolean read (getProp('resizableColumns')) write (setProp('resizableColumns', value)) default true;
    property movableColumns: boolean read (getProp('movableColumns')) write (setProp('movableColumns', value)) default false;
    property tooltipsHeader: Variant read (getProp('tooltipsHeader')) write (setProp('tooltipsHeader', value)) default false;
    property columnHeaderVertAlign: string read (getProp('columnHeaderVertAlign')) write (setProp('columnHeaderVertAlign', value)) default 'top';
    property headerFilterPlaceholder: string read (getProp('headerFilterPlaceholder')) write (setProp('headerFilterPlaceholder', value)) default "filter column...";
    property scrollToColumnPosition: string read (getProp('scrollToColumnPosition')) write (setProp('scrollToColumnPosition', value)) default "left";
    property scrollToColumnIfVisible: boolean read (getProp('scrollToColumnIfVisible')) write (setProp('scrollToColumnIfVisible', value)) default false;
    property columnCalcs: Variant read (getProp('columnCalcs')) write (setProp('columnCalcs', value)) default true;
    property nestedFieldSeparator: Variant read (getProp('nestedFieldSeparator')) write (setProp('nestedFieldSeparator', value)) default ".";
    property headerVisible: boolean read (getProp('headerVisible')) write (setProp('headerVisible', value)) default true;

    //Rows
    property rowFormatter: Variant read (getProp('rowFormatter')) write (setProp('rowFormatter', value)) default false;
    property rowFormatterPrint: Variant read (getProp('rowFormatterPrint')) write (setProp('rowFormatterPrint', value)) default null;
    property rowFormatterClipboard: Variant read (getProp('rowFormatterClipboard')) write (setProp('rowFormatterClipboard', value)) default null;
    property rowFormatterHtmlOutput: Variant read (getProp('rowFormatterHtmlOutput')) write (setProp('rowFormatterHtmlOutput', value)) default null;
    property addRowPos: string read (getProp('addRowPos')) write (setProp('addRowPos', value)) default "bottom";
    property selectable: Variant read (getProp('selectable')) write (setProp('selectable', value)) default "highlight";
    property selectableRollingSelection: boolean read (getProp('selectableRollingSelection')) write (setProp('selectableRollingSelection', value)) default true;
    property selectablePersistence: boolean read (getProp('selectablePersistence')) write (setProp('selectablePersistence', value)) default true;
    property selectableCheck: Variant read (getProp('selectableCheck')) write (setProp('selectableCheck', value));
    property movableRows: boolean read (getProp('movableRows')) write (setProp('movableRows', value)) default false;
    property movableRowsConnectedTables: Variant read (getProp('movableRowsConnectedTables')) write (setProp('movableRowsConnectedTables', value)) default false;
    property movableRowsSender: Variant read (getProp('movableRowsSender')) write (setProp('movableRowsSender', value)) default false;
    property movableRowsReceiver: Variant read (getProp('movableRowsReceiver')) write (setProp('movableRowsReceiver', value)) default "insert";
    property movableRowsConnectedElements: Variant read (getProp('movableRowsConnectedElements')) write (setProp('movableRowsConnectedElements', value)) default false;
    property movableRowsElementDrop: Variant read (getProp('movableRowsElementDrop')) write (setProp('movableRowsElementDrop', value)) default false;
    property resizableRows: boolean read (getProp('resizableRows')) write (setProp('resizableRows', value)) default false;
    property scrollToRowPosition: string read (getProp('scrollToRowPosition')) write (setProp('scrollToRowPosition', value)) default "top";
    property scrollToRowIfVisible: boolean read (getProp('scrollToRowIfVisible')) write (setProp('scrollToRowIfVisible', value)) default false;

    //Data
    property index: string read (getProp('index')) write (setProp('index', value)) default 'id';
    property dataImported: Variant read (getProp('dataImported')) write (setProp('dataImported', value));
    property ajaxURL: Variant read (getProp('ajaxURL')) write (setProp('ajaxURL', value)) default false;
    property ajaxParams: Variant read (getProp('ajaxParams')) write (setProp('ajaxParams', value)) default null;
    property ajaxConfig: Variant read (getProp('ajaxConfig')) write (setProp('ajaxConfig', value)) default "GET";
    property ajaxContentType: Variant read (getProp('ajaxContentType')) write (setProp('ajaxContentType', value)) default "form";
    property ajaxURLGenerator: Variant read (getProp('ajaxURLGenerator')) write (setProp('ajaxURLGenerator', value)) default false;
    property ajaxRequestFunc: Variant read (getProp('ajaxRequestFunc')) write (setProp('ajaxRequestFunc', value)) default false;
    property ajaxFiltering: boolean read (getProp('ajaxFiltering')) write (setProp('ajaxFiltering', value)) default false;
    property ajaxSorting: boolean read (getProp('ajaxSorting')) write (setProp('ajaxSorting', value)) default false;
    property ajaxProgressiveLoad: boolean read (getProp('ajaxProgressiveLoad')) write (setProp('ajaxProgressiveLoad', value)) default false;
    property ajaxProgressiveLoadDelay: integer read (getProp('ajaxProgressiveLoadDelay')) write (setProp('ajaxProgressiveLoadDelay', value)) default 0;
    property ajaxProgressiveLoadScrollMargin: integer read (getProp('ajaxProgressiveLoadScrollMargin')) write (setProp('ajaxProgressiveLoadScrollMargin', value)) default 0;
    property ajaxLoader: Variant read (getProp('ajaxLoader')) write (setProp('ajaxLoader', value)) default true;
    property ajaxLoaderLoading: string read (getProp('ajaxLoaderLoading')) write (setProp('ajaxLoaderLoading', value)) default "";
    property ajaxLoaderError: string read (getProp('ajaxLoaderError')) write (setProp('ajaxLoaderError', value)) default "";
    data: array of Variant;

    //Sorting
    property initialSort: Variant read (getProp('initialSort')) write (setProp('initialSort', value)) default [];
    property sortOrderReverse: boolean read (getProp('sortOrderReverse')) write (setProp('sortOrderReverse', value)) default false;
    property headerSort: boolean read (getProp('headerSort')) write (setProp('headerSort', value)) default true;
    property headerSortTristate: boolean read (getProp('headerSortTristate')) write (setProp('headerSortTristate', value)) default false;
    property headerSortElement: string read (getProp('headerSortElement')) write (setProp('headerSortElement', value)) default "<div class='tabulator-arrow'></div>";

    //Filtering
    property initialFilter: Variant read (getProp('initialFilter')) write (setProp('initialFilter', value)) default [];
    property initialHeaderFilter: Variant read (getProp('initialHeaderFilter')) write (setProp('initialHeaderFilter', value)) default [];
    property headerFilterLiveFilterDelay: integer read (getProp('headerFilterLiveFilterDelay')) write (setProp('headerFilterLiveFilterDelay', value)) default 300;

    //Grouping
    property groupBy: Variant read (getProp('groupBy')) write (setProp('groupBy', value)) default false;
    property groupValues: Variant read (getProp('groupValues')) write (setProp('groupValues', value)) default false;
    property groupHeader: Variant read (getProp('groupHeader')) write (setProp('groupHeader', value));
    property groupHeaderPrint: Variant read (getProp('groupHeaderPrint')) write (setProp('groupHeaderPrint', value)) default null;
    property groupHeaderClipboard: Variant read (getProp('groupHeaderClipboard')) write (setProp('groupHeaderClipboard', value)) default null;
    property groupHeaderDownload: Variant read (getProp('groupHeaderDownload')) write (setProp('groupHeaderDownload', value)) default null;
    property groupHeaderHtmlOutput: Variant read (getProp('groupHeaderHtmlOutput')) write (setProp('groupHeaderHtmlOutput', value)) default null;
    property groupStartOpen: Variant read (getProp('groupStartOpen')) write (setProp('groupStartOpen', value)) default true;
    property groupToggleElement: Variant read (getProp('groupToggleElement')) write (setProp('groupToggleElement', value)) default "arrow";
    property groupClosedShowCalcs: boolean read (getProp('groupClosedShowCalcs')) write (setProp('groupClosedShowCalcs', value)) default false;

    //Pagination
    property pagination: string read (getProp('pagination')) write (setProp('pagination', value)) default '';
    property paginationSize: integer read (getProp('paginationSize')) write (setProp('paginationSize', value)) default 10;
    property paginationSizeSelector: Variant read (getProp('paginationSizeSelector')) write (setProp('paginationSizeSelector', value)) default false;
    property paginationElement: Variant read (getProp('paginationElement')) write (setProp('paginationElement', value));
    property paginationDataReceived: Variant read (getProp('paginationDataReceived')) write (setProp('paginationDataReceived', value));
    property paginationDataSent: Variant read (getProp('paginationDataSent')) write (setProp('paginationDataSent', value));
    property paginationAddRow: string read (getProp('paginationAddRow')) write (setProp('paginationAddRow', value)) default "page";
    property paginationButtonCount: integer read (getProp('paginationButtonCount')) write (setProp('paginationButtonCount', value)) default 5;

    //Persistance
    property persistenceID: Variant read (getProp('persistenceID')) write (setProp('persistenceID', value)) default null;
    property persistenceMode: Variant read (getProp('persistenceMode')) write (setProp('persistenceMode', value)) default true;
    property persistentLayout: boolean read (getProp('persistentLayout')) write (setProp('persistentLayout', value)) default false;
    property persistentSort: boolean read (getProp('persistentSort')) write (setProp('persistentSort', value)) default false;
    property persistentFilter: boolean read (getProp('persistentFilter')) write (setProp('persistentFilter', value)) default false;

    //Clipboard
    property clipboard: Variant /*true | 'copy' | 'paste' | false (default) */ read (getProp('clipboard')) write (setProp('clipboard', value)) default false;
    property clipboardCopyRowRange: Variant read (getProp('clipboardCopyRowRange')) write (setProp('clipboardCopyRowRange', value)) default "active";
    property clipboardCopyFormatter: Variant read (getProp('clipboardCopyFormatter')) write (setProp('clipboardCopyFormatter', value)) default false;
    property clipboardPasteParser: Variant read (getProp('clipboardPasteParser')) write (setProp('clipboardPasteParser', value)) default false;
    property clipboardPasteAction: Variant /*insert | update | replace */ read (getProp('clipboardPasteAction')) write (setProp('clipboardPasteAction', value)) default false;

    //Data tree
    property dataTree: boolean read (getProp('dataTree')) write (setProp('dataTree', value)) default false;
    property dataTreeFilter: boolean read (getProp('dataTreeFilter')) write (setProp('dataTreeFilter', value)) default true;
    property dataTreeSort: boolean read (getProp('dataTreeSort')) write (setProp('dataTreeSort', value)) default true;
    property dataTreeElementColumn: Variant read (getProp('dataTreeElementColumn')) write (setProp('dataTreeElementColumn', value)) default false;
    property dataTreeBranchElement: boolean read (getProp('dataTreeBranchElement')) write (setProp('dataTreeBranchElement', value)) default true;
    property dataTreeChildIndent: integer read (getProp('dataTreeChildIndent')) write (setProp('dataTreeChildIndent', value)) default 9;
    property dataTreeChildField: string read (getProp('dataTreeChildField')) write (setProp('dataTreeChildField', value)) default "_children";
    property dataTreeCollapseElement: Variant read (getProp('dataTreeCollapseElement')) write (setProp('dataTreeCollapseElement', value)) default false;
    property dataTreeExpandElement: Variant read (getProp('dataTreeExpandElement')) write (setProp('dataTreeExpandElement', value)) default false;
    property dataTreeStartExpanded: Variant read (getProp('dataTreeStartExpanded')) write (setProp('dataTreeStartExpanded', value)) default false;
    property dataTreeSelectPropagate: boolean read (getProp('dataTreeSelectPropagate')) write (setProp('dataTreeSelectPropagate', value)) default false;
    property dataTreeChildColumnCalcs: boolean read (getProp('dataTreeChildColumnCalcs')) write (setProp('dataTreeChildColumnCalcs', value)) default false;

    //Printing
    property printAsHtml: boolean read (getProp('printAsHtml')) write (setProp('printAsHtml', value)) default false;
    property printStyled: boolean read (getProp('printStyled')) write (setProp('printStyled', value)) default false;
    property printRowRange: string read (getProp('printRowRange')) write (setProp('printRowRange', value)) default "visible";
    property printConfig: Variant read (getProp('printConfig')) write (setProp('printConfig', value));
    property printHeader: Variant read (getProp('printHeader')) write (setProp('printHeader', value)) default false;
    property printFooter: Variant read (getProp('printFooter')) write (setProp('printFooter', value)) default false;
    property printFormatter: Variant read (getProp('printFormatter')) write (setProp('printFormatter', value)) default false;

    //Menu
    property rowContextMenu: Variant read (getProp('rowContextMenu')) write (setProp('rowContextMenu', value)) default false;
    property rowClickMenu: Variant read (getProp('rowClickMenu')) write (setProp('rowClickMenu', value)) default false;
    property groupContextMenu: Variant read (getProp('groupContextMenu')) write (setProp('groupContextMenu', value)) default false;
    property groupClickMenu: Variant read (getProp('groupClickMenu')) write (setProp('groupClickMenu', value)) default false;

    //Table Callback
    property tableBuilding: variant read (getProp('tableBuilding')) write (setProp('tableBuilding', value));
    property tableBuilt: variant read (getProp('tableBuilding')) write (setProp('tableBuilding', value));
    //Column Callbacks
    property columnMoved: variant read (getProp('columnMoved')) write (setProp('columnMoved', value));
    property columnResized: variant read (getProp('columnResized')) write (setProp('columnResized', value));
    property columnVisibilityChanged: variant read (getProp('columnVisibilityChanged')) write (setProp('columnVisibilityChanged', value));
    property columnTitleChanged: variant read (getProp('columnTitleChanged')) write (setProp('columnTitleChanged', value));
    //Row Callbacks
    property rowClick: variant read (getProp('rowClick')) write (setProp('rowClick', value));
    property rowDblClick: variant read (getProp('rowDblClick')) write (setProp('rowDblClick', value));
    property rowContext: variant read (getProp('rowContext')) write (setProp('rowContext', value));
    property rowTap: variant read (getProp('rowTap')) write (setProp('rowTap', value));
    property rowDblTap: variant read (getProp('rowDblTap')) write (setProp('rowDblTap', value));
    property rowTapHold: variant read (getProp('rowTapHold')) write (setProp('rowTapHold', value));
    property rowMouseEnter: variant read (getProp('rowMouseEnter')) write (setProp('rowMouseEnter', value));
    property rowMouseLeave: variant read (getProp('rowMouseLeave')) write (setProp('rowMouseLeave', value));
    property rowMouseOver: variant read (getProp('rowMouseOver')) write (setProp('rowMouseOver', value));
    property rowMouseOut: variant read (getProp('rowMouseOut')) write (setProp('rowMouseOut', value));
    property rowMouseMove: variant read (getProp('rowMouseMove')) write (setProp('rowMouseMove', value));
    property rowAdded: variant read (getProp('rowAdded')) write (setProp('rowAdded', value));
    property rowUpdated: variant read (getProp('rowUpdated')) write (setProp('rowUpdated', value));
    property rowDeleted: variant read (getProp('rowDeleted')) write (setProp('rowDeleted', value));
    property rowMoved: variant read (getProp('rowMoved')) write (setProp('rowMoved', value));
    property rowResized: variant read (getProp('rowResized')) write (setProp('rowResized', value));
    //Cell Callbacks
    property cellClick: variant read (getProp('cellClick')) write (setProp('cellClick', value));
    property cellDblClick: variant read (getProp('cellDblClick')) write (setProp('cellDblClick', value));
    property cellContext: variant read (getProp('cellContext')) write (setProp('cellContext', value));
    property cellTap: variant read (getProp('cellTap')) write (setProp('cellTap', value));
    property cellDblTap: variant read (getProp('cellDblTap')) write (setProp('cellDblTap', value));
    property cellTapHold: variant read (getProp('cellTapHold')) write (setProp('cellTapHold', value));
    property cellMouseEnter: variant read (getProp('cellMouseEnter')) write (setProp('cellMouseEnter', value));
    property cellMouseLeave: variant read (getProp('cellMouseLeave')) write (setProp('cellMouseLeave', value));
    property cellMouseOver: variant read (getProp('cellMouseOver')) write (setProp('cellMouseOver', value));
    property cellMouseOut: variant read (getProp('cellMouseOut')) write (setProp('cellMouseOut', value));
    property cellMouseMove: variant read (getProp('cellMouseMove')) write (setProp('cellMouseMove', value));
    property cellEditing: variant read (getProp('cellEditing')) write (setProp('cellEditing', value));
    property cellEditCancelled: variant read (getProp('cellEditCancelled')) write (setProp('cellEditCancelled', value));
    property cellEdited: variant read (getProp('cellEdited')) write (setProp('cellEdited', value));
    //Data Callbacks
    property dataLoading: variant read (getProp('dataLoading')) write (setProp('dataLoading', value));
    property dataLoaded: variant read (getProp('dataLoaded')) write (setProp('dataLoaded', value));
    property dataChanged: variant read (getProp('dataChanged')) write (setProp('dataChanged', value));
    property htmlImporting: variant read (getProp('htmlImporting')) write (setProp('htmlImporting', value));
    property htmlImported: variant read (getProp('htmlImported')) write (setProp('htmlImported', value));
    //Ajax Callbacks
    property ajaxRequesting: variant read (getProp('ajaxRequesting')) write (setProp('ajaxRequesting', value));
    property ajaxResponse: variant read (getProp('ajaxResponse')) write (setProp('ajaxResponse', value));
    property ajaxError: variant read (getProp('ajaxError')) write (setProp('ajaxError', value));
    //Filter Callbacks:
    property dataFiltering: variant read (getProp('dataFiltering')) write (setProp('dataFiltering', value));
    property dataFiltered: variant read (getProp('dataFiltered')) write (setProp('dataFiltered', value));
    //Sorting Callbacks
    property dataSorting: variant read (getProp('dataSorting')) write (setProp('dataSorting', value));
    property dataSorted: variant read (getProp('dataSorted')) write (setProp('dataSorted', value));
    //Layout Callbacks
    property renderStarted: variant read (getProp('renderStarted')) write (setProp('renderStarted', value));
    property renderComplete: variant read (getProp('renderComplete')) write (setProp('renderComplete', value));
    //Pagination Callback
    property pageLoaded: variant read (getProp('pageLoaded')) write (setProp('pageLoaded', value));
    //Localisation Callback
    property localized: variant read (getProp('localized')) write (setProp('localized', value));
    //Grouping Callbacks
    property dataGrouping: variant read (getProp('dataGrouping')) write (setProp('dataGrouping', value));
    property dataGrouped: variant read (getProp('dataGrouped')) write (setProp('dataGrouped', value));
    property groupVisibilityChanged: variant read (getProp('groupVisibilityChanged')) write (setProp('groupVisibilityChanged', value));
    property groupClick: variant read (getProp('groupClick')) write (setProp('groupClick', value));
    property groupDblClick: variant read (getProp('groupDblClick')) write (setProp('groupDblClick', value));
    property groupContext: variant read (getProp('groupContext')) write (setProp('groupContext', value));
    property groupTap: variant read (getProp('groupTap')) write (setProp('groupTap', value));
    property groupDblTap: variant read (getProp('groupDblTap')) write (setProp('groupDblTap', value));
    property groupTapHold: variant read (getProp('groupTapHold')) write (setProp('groupTapHold', value));
    //Selection Callbacks
    property rowSelected: variant read (getProp('rowSelected')) write (setProp('rowSelected', value));
    property rowDeselected: variant read (getProp('rowDeselected')) write (setProp('rowDeselected', value));
    property rowSelectionChanged: variant read (getProp('rowSelectionChanged')) write (setProp('rowSelectionChanged', value));
    //Row Movement Callbacks
    property movableRowsSendingStart: variant read (getProp('movableRowsSendingStart')) write (setProp('movableRowsSendingStart', value));
    property movableRowsSent: variant read (getProp('movableRowsSent')) write (setProp('movableRowsSent', value));
    property movableRowsSentFailed: variant read (getProp('movableRowsSentFailed')) write (setProp('movableRowsSentFailed', value));
    property movableRowsSendingStop: variant read (getProp('movableRowsSendingStop')) write (setProp('movableRowsSendingStop', value));
    property movableRowsReceivingStart: variant read (getProp('movableRowsReceivingStart')) write (setProp('movableRowsReceivingStart', value));
    property movableRowsReceived: variant read (getProp('movableRowsReceived')) write (setProp('movableRowsReceived', value));
    property movableRowsReceivedFailed: variant read (getProp('movableRowsReceivedFailed')) write (setProp('movableRowsReceivedFailed', value));
    property movableRowsReceivingStop: variant read (getProp('movableRowsReceivingStop')) write (setProp('movableRowsReceivingStop', value));
    //Row Movement Callbacks
    property validationFailed: variant read (getProp('validationFailed')) write (setProp('validationFailed', value));
    //History Callbacks
    property historyUndo: variant read (getProp('historyUndo')) write (setProp('historyUndo', value));
    property historyRedo: variant read (getProp('historyRedo')) write (setProp('historyRedo', value));
    //Clipboard Callbacks
    property clipboardCopied: variant read (getProp('clipboardCopied')) write (setProp('clipboardCopied', value));
    property clipboardPasted: variant read (getProp('clipboardPasted')) write (setProp('clipboardPasted', value));
    property clipboardPasteError: variant read (getProp('clipboardPasteError')) write (setProp('clipboardPasteError', value));
    //DOwnload Callbacks
    property downloadDataFormatter: variant read (getProp('downloadDataFormatter')) write (setProp('downloadDataFormatter', value));
    property downloadReady: variant read (getProp('downloadReady')) write (setProp('downloadReady', value));
    property downloadComplete: variant read (getProp('downloadComplete')) write (setProp('downloadComplete', value));
    //Data tree Callback
    property dataTreeRowExpanded: variant read (getProp('dataTreeRowExpanded')) write (setProp('dataTreeRowExpanded', value));
    property dataTreeRowCollapsed: variant read (getProp('dataTreeRowCollapsed')) write (setProp('dataTreeRowCollapsed', value));
    //Scrolling Callback
    property scrollVertical: variant read (getProp('scrollVertical')) write (setProp('scrollVertical', value));
    property scrollHorizontal: variant read (getProp('scrollHorizontal')) write (setProp('scrollHorizontal', value));
    //Range selection
    property selectableRangeMode: string read (getProp('selectableRangeMode')) write (setProp('selectableRangeMode', value));
    //Persistence
    property persistence: Variant read (getProp('persistence')) write (setProp('persistence', value));
    property persistenceWriterFunc: String read (getProp('persistenceWriterFunc')) write (setProp('persistenceWriterFunc', value));
    property persistenceReaderFunc: String read (getProp('persistenceReaderFunc')) write (setProp('persistenceReaderFunc', value));
    //Clipboard
    property clipboardCopyConfig: Variant read (getProp('clipboardCopyConfig')) write (setProp('clipboardCopyConfig', value));
    property formatterClipboard: Variant read (getProp('formatterClipboard')) write (setProp('formatterClipboard', value));


    function RenderOptions(): Variant; override;
    constructor Create(opts: Variant = null);
  end;

  TTabulatorRowRangeLookup = class
    class var VISIBLE = 'visible';
    class var ACTIVE = 'active';
    class var SELECTED = 'selected';
    class var ALL = 'all';
  end;

  TTabulatorEditionNavigator = class external
    procedure prev();
    procedure next();
    procedure left();
    procedure right();
    procedure up();
    procedure down();
  end;

  TTabulatorCellComponent = class external
    function getValue(): Variant;
    function getOldValue(): Variant;
    function getInitialValue(): Variant;
    procedure restoreInitialValue();
    function getElement(): JElement;
    function getTable(): TTabulator;
    function getRow(): TTabulatorRowComponent;
    function getColumn(): TTabulatorColumnComponent;
    function getData(): Variant;
    function getField(): String;
    procedure setValue(value: Variant; applyColumnMutators: Boolean = true);
    procedure checkHeight();
    procedure edit(forceEdit: Boolean = false);
    procedure cancelEdit();
    function isEdited(): Boolean;
    procedure clearEdited();
    function nav(): TTabulatorEditionNavigator;
    function validate(): Boolean;
    function isValid(): Boolean;
    procedure clearValidation();
  end;

  TTabulatorGroupComponent = class external
    function getElement(): JElement;
    function getTable(): TTabulator;
    function getKey(): Variant;
    function getField(): String;
    function getRows(): array of TTabulatorRowComponent;
    function getSubGroups(): array of TTabulatorGroupComponent;
    function getParentGroup(): TTabulatorGroupComponent;
    function isVisible(): Boolean;
    procedure show();
    procedure hide();
    procedure toggle();
  end;

  TTabulatorRowComponent = class external
    function getData(): Variant;
    function getElement(): JElement;
    function getTable(): TTabulator;
    function getNextRow(): TTabulatorRowComponent;
    function getPrevRow(): TTabulatorRowComponent;
    function getCells(): array of TTabulatorCellComponent;
    function getCell(columnLockup: Variant): TTabulatorCellComponent;
    function getIndex(): Variant;
    function getPosition(fromFilteredOrSortedData: Boolean = false): Integer;
    function getGroup(): TTabulatorGroupComponent;
    function delete(): JPromise;
    function scrollTo(): JPromise;
    function pageTo(): JPromise;
    procedure move(rowComponentLockup: Variant; moveToAboveTarget: Boolean = true);
    function update(data: Variant): JPromise;
    procedure select();
    procedure deselect();
    procedure toggleSelect();
    function isSelected(): Boolean;
    procedure normalizeHeight();
    procedure reformat();
    procedure freeze();
    function isFrozen(): Boolean;
    procedure treeExpand();
    procedure treeToggle();
    function getTreeChildren(): Array of TTabulatorRowComponent;
    procedure validate();
  end;

  TTabulatorCalculatorComponent = class external
    function getData(): Variant;
    function getElement(): JElement;
    function getTable(): TTabulator;
    function getCells(): array of TTabulatorCellComponent;
    function getCell(column: Variant): TTabulatorCellComponent;
  end;

  TTabulatorColumnComponent = class external
    function getElement(): JElement;
    function getTable(): TTabulator;
    function getDefinition(): Variant;
    function updateDefinition(columnDefinition: Variant): JPromise;
    function getField(): String;
    function getCells(): Array of TTabulatorCellComponent;
    function getNextColumn(): TTabulatorColumnComponent;
    function getPrevColumn(): TTabulatorColumnComponent;
    function isVisible(): Boolean;
    procedure show();
    procedure hide();
    procedure toggle();
    function getWidth(): Integer;
    procedure setWidth(widthOrFitItsContent: Variant = true);
    procedure delete();
    function scrollTo(): JPromise;
    procedure move(columnComponentLockup: Variant; moveAfterTarget: Boolean = true);
    function getSubColumns(): array of TTabulatorColumnComponent;
    procedure headerFilterFocus();
    procedure setHeaderFilterValue(value: Variant);
    function getHeaderFilterValue(): Variant;
    function validate(): Boolean;
  end;

  TTabulatorFilterOperatorType = class
    class var EQUAL = '=';
    class var NOT_EQUAL = '!=';
    class var LIKE = 'like';
    class var KEYWORDS = 'keywords';
    class var STARTS_WITH = 'starts';
    class var ENDS_WITH = 'ends';
    class var LESS_THAN = '<';
    class var LESS_OR_EQUAL = '<=';
    class var GREATER_THAN = '>';
    class var GREATER_OR_EQUAL = '>=';
    class var IN_ARRAY = 'in';
    class var REGEX = 'regex';
  end;

  TTabulator = class external "Tabulator"
    //Data manipulation
    function replaceData(data: array of Variant): JPromise; overload;
    function replaceData(url: String; ajaxParams: Variant = null; ajaxConfig: Variant = 'POST'): JPromise; overload;
    function replaceData(): JPromise; overload;
    function updateData(data: array of Variant): JPromise;
    function setData(): JPromise; overload;
    function setData(data: array of variant): JPromise; overload;
    function setData(url: string; ajaxParams: Variant = null; ajaxConfig: Variant = 'POST'): JPromise; overload;
    function addData(data: array of variant; fromBeginning: Variant = null): JPromise;
    function updateOrAddData(data: array of variant): JPromise;
    procedure clearData();
    //Retrieving data
    function getData(rowRangeLookup: String = 'all'): array of Variant;
    function getDataCount(rowRangeLookup: String = 'all'): integer;
    function getRow(rowRangeLookup: Variant = 'all'): TTabulatorRowComponent;
    function getRows(rowRangeLookup: Variant = 'all'): array of TTabulatorRowComponent;
    //Search data
    function searchRows(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null): array of TTabulatorRowComponent;
    function searchData(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null): array of variant;
    //Row Position
    function getRowPosition(row: TTabulatorRowComponent; inFilteredOrSortedData: Boolean = false): integer;
    function getRowFromPosition(position: Integer; inFilteredOrSortedData: Boolean): TTabulatorRowComponent;
    //Retrieving data as html
    function getHtml(rowRangeLookup: Variant = 'active'; styledMatchTable: Boolean = false; configOverride: Variant = null): String;
    //Row Manipulation
    function addRow(data: variant = null; addToTop: Variant = null; rowComponentLookup: Variant = null): JPromise;
    function updateRow(rowComponentLookup: Variant; data: Variant): JPromise;
    function updateOrAddRow(rowComponentLookup: Variant; data: Variant): JPromise;
    function deleteRow(rowComponentLookup: Variant): JPromise; overload;
    function deleteRow(rowComponentLookup: array of Variant): JPromise; overload;
    //Colunm Manipulation
    procedure setColumns(columnDefitions: array of Variant);
    function updateColumnDefinition(columnComponentLookup: Variant; props: Variant): JPromise;
    function addColumn(columnDefinition: Variant; before: Boolean = false; columnComponentLookup: Variant = null): JPromise;
    function deleteColumn(columnComponentLookup: Variant): JPromise;
    function getColumnDefinitions(): array of Variant;
    function getColumn(columnComponentLookup: Variant): TTabulatorColumnComponent;
    procedure showColumn(columnComponentLookup: Variant);
    procedure hideColumn(columnComponentLookup: Variant);
    procedure toggleColumn(columnComponentLookup: Variant);
    //Sort
    procedure setSort(sortParams: array of variant);
    procedure clearSort();
    //Filter
    procedure setFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null); overload;
    procedure setFilter(opts: array of Variant); overload;
    procedure addFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null); overload;
    procedure refreshFilter();
    procedure removeFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null); overload;
    function getFilters(includeHeaderFilter: Boolean = false): array of Variant;
    function getHeaderFilters(): array of Variant;
    procedure clearFilter(clearHeaderFilter: Boolean = false);
    procedure setHeaderFilterValue(columnComponentLookup: Variant; value: String);
    function getHeaderFilter(columnComponentLookup: Variant): String;
    procedure setHeaderFilterFocus(columnComponentLookup: Variant);
    //Pagination
    function setPage(page: Variant /* Number | first | prev | next | last */): JPromise;
    function nextPage(): JPromise;
    function previousPage(): JPromise;
    function setPageToRow(rowComponentLookup: Variant): JPromise;
    procedure setPageSize(pageSize: Integer);
    function getPageSize(): Integer;
    function getPage(): Variant;
    function getPageMax(): Variant;
    //Calc
    procedure recalc();
    function getCalcResults(): array of Variant;
    //Navigation
    procedure navigatePrev();
    procedure navigateNext();
    procedure navigateLeft();
    procedure navigateRight();
    procedure navigateUp();
    procedure navigateDown();
    //Scrolling
    procedure scrollToColumn(columnComponentLookup: Variant; columnPosition: string = 'left'; scrollIfVisible: Boolean = true);
    procedure scrollToRow(rowComponentLookup: Variant; rowPosition: String = 'top' /*top|center|bottom|nearest*/; scrollIfVisible: Boolean = true);
    //Moving
    procedure moveRow(rowComponentLookup: Variant; target: Variant; moveAboveTarget: Boolean = true);
    procedure moveColumn(columnComponentLookup: Variant; target: Variant; moveAfterTarget: Boolean = true);
    //Selection
    procedure selectRow(rowComponentLookup: Variant); overload;
    procedure selectRow(rowComponentLookups: array of Variant); overload;
    procedure deselectRow(rowComponentLookup: Variant); overload;
    procedure deselectRow(rowComponentLookups: array of Variant); overload;
    function getSelectedData(): Array of Variant;
    function getSelectedRows(): Array of TTabulatorRowComponent;
    //Interaction history
    procedure undo();
    function getHistoryUndoSize(): Integer;
    procedure redo();
    procedure clearHistory();
    //Column layout
    procedure setColumnLayout(columnLayout: variant);
    function getColumnLayout(): Variant;
    //Clipboard
    procedure copyToClipboard(rowRangeLookup: Variant = 'all');
    //Download
    procedure download(downloadType: String = 'csv'; fileName: String = 'data.csv'; opts: Variant = null; rowRangeLookup: String = 'all');
    procedure downloadToTab(downloadType: String = 'pdf'; fileName: String = 'data.pdf'; opts: Variant = null; rowRangeLookup: String = 'all');
    //Print
    procedure print(rowRangeLookup: String = 'active'; styledLikeTable: Boolean = true; printOpts: Variant = null);

    class function findTable(elId: String): array of Variant; external "Tabulator.prototype.findTable";
    class procedure extendModule(moduleName, propertyName: String; elementsToAdd: Variant); external "Tabulator.prototype.extendModule";

    procedure destroy();

    constructor Create(elId: String; tableOptions: Variant); overload;
    constructor Create(elId: String; tableOptions: TTabulatorOptions = nil); overload;
  end;

  //Callbacks
  TQTXTabulatorConstructorCB = procedure (widget: TQTXTabulator);
  TQTXTabulatorColumnCB = procedure (column: TTabulatorColumnComponent);
  TQTXTabulatorRowCB = procedure (row: TTabulatorRowComponent);
  TQTXTabulatorCellCB = procedure (cell: TTabulatorCellComponent);
  TQTXTabulatorRowsCB = procedure (rows: array of TTabulatorRowComponent);
  TQTXTabulatorStdCB = procedure();
  TQTXTabulatorCellMouseEventCB = procedure (e: JMouseEvent; cell: TTabulatorCellComponent);
  TQTXTabulatorRowMouseEventCB = procedure (e: JMouseEvent; row: TTabulatorRowComponent);
  TQTXTabulatorGroupMouseEventCB = procedure (e: JMouseEvent; group: TTabulatorGroupComponent);
  TQTXTabulatorColumnMovedCB = procedure (column: TTabulatorColumnComponent; columns: array of TTabulatorColumnComponent);
  TQTXTabulatorColumnVisibilityChangedCB = procedure (column: TTabulatorColumnComponent; visible: Boolean);
  TQTXTabulatorDataCB = procedure (data: Variant);
  TQTXTabulatorAjaxRequestingCB = procedure (url: String; params: Variant);
  TQTXTabulatorAjaxResponseCB = procedure (url: String; params, response: Variant);
  TQTXTabulatorAjaxErrorCB = procedure (error: Variant);
  TQTXTabulatorDataFilteringCB = procedure (filters: Variant);
  TQTXTabulatorDataFilteredCB = procedure (filters: Variant; rows: array of TTabulatorRowComponent);
  TQTXTabulatorDataSortingCB = procedure (sorters: Variant);
  TQTXTabulatorDataSortedCB = procedure (sorters: Variant; rows: array of TTabulatorRowComponent);
  TQTXTabulatorPageLoadedCB = procedure (pageno: Integer);
  TQTXTabulatorLocalizedCB = procedure (locale: String; lang: Variant);
  TQTXTabulatorDataGroupedCB = procedure (groups: array of TTabulatorGroupComponent);
  TQTXTabulatorGroupVisibilityChangedCB = procedure (group: TTabulatorGroupComponent; visible: Boolean);
  TQTXTabulatorRowSelectionChangedCB = procedure (data: Variant; rows: array of TTabulatorRowComponent);
  TQTXTabulatorMovableRowsSendingStartCB = procedure (toTables: Variant);
  TQTXTabulatorMovableRowsSendingStopCB = TQTXTabulatorMovableRowsSendingStartCB;
  TQTXTabulatorMovableRowsSentCB = procedure (fromRow, toRow: TTabulatorRowComponent; toTable: TTabulator);
  TQTXTabulatorMovableRowsReceivedCB = procedure (fromRow, toRow: TTabulatorRowComponent; toTable: TTabulator);
  TQTXTabulatorMovableRowsReceivedFailedCB = procedure (fromRow, toRow: TTabulatorRowComponent; toTable: TTabulator);
  TQTXTabulatorMovableRowsSentFailedCB = TQTXTabulatorMovableRowsSentCB;
  TQTXTabulatorMovableRowsReceivingStartCB = procedure (fromRow: TTabulatorRowComponent; fromTable: TTabulator);
  TQTXTabulatorMovableRowsReceivingStopCB = procedure (fromTable: TTabulator);
  TQTXTabulatorValidationFailedCB = procedure (cell: TTabulatorCellComponent; value: Variant; validators: array of Variant);
  TQTXTabulatorHistoryCB = procedure (action: string; Component, Data: Variant);
  TQTXTabulatorClipboardStdCB = procedure (clipboard: String);
  TQTXTabulatorClipboardPasted = procedure (clipboard: String; rowData: Variant; rows: array of TTabulatorRowComponent);
  TQTXTabulatorDownloadReadyCB = procedure (fileContents, blob: Variant);
  TQTXTabulatorDataTreeCB = procedure (row: TTabulatorRowComponent; level: integer);
  TQTXTabulatorScrollVerticalCV = procedure (top: Integer);
  TQTXTabulatorScrollHorizontalCB = procedure (left: Integer);

  TTabulatorCreationEvents = class(TObject)
  public
    property onTableBuilding: TQTXTabulatorStdCB;
    property onTableBuilt: TQTXTabulatorStdCB;
    property onColumnMoved: TQTXTabulatorColumnMovedCB;
    property onColumnResized: TQTXTabulatorColumnCB;
    property onColumnVisibilityChanged: TQTXTabulatorColumnVisibilityChangedCB;
    property onColumnTitleChanged: TQTXTabulatorColumnCB;
    property onRowClick: TQTXTabulatorRowMouseEventCB;
    property onRowDblClick: TQTXTabulatorRowMouseEventCB;
    property onRowContext: TQTXTabulatorRowMouseEventCB;
    property onRowTap: TQTXTabulatorRowMouseEventCB;
    property onRowDblTap: TQTXTabulatorRowMouseEventCB;
    property onRowTapHold: TQTXTabulatorRowMouseEventCB;
    property onRowMouseEnter: TQTXTabulatorRowMouseEventCB;
    property onRowMouseLeave: TQTXTabulatorRowMouseEventCB;
    property onRowMouseOver: TQTXTabulatorRowMouseEventCB;
    property onRowMouseMove: TQTXTabulatorRowMouseEventCB;
    property onRowAdded: TQTXTabulatorRowCB;
    property onRowUpdated: TQTXTabulatorRowCB;
    property onRowDeleted: TQTXTabulatorRowCB;
    property onRowMoved: TQTXTabulatorRowCB;
    property onRowResized: TQTXTabulatorRowCB;
    property onRowSelected: TQTXTabulatorRowCB;
    property onRowDeselected: TQTXTabulatorRowCB;
    property onCellClick: TQTXTabulatorCellMouseEventCB;
    property onCellDblClick: TQTXTabulatorCellMouseEventCB;
    property onCellContext: TQTXTabulatorCellMouseEventCB;
    property onCellTap: TQTXTabulatorCellMouseEventCB;
    property onCellDblTap: TQTXTabulatorCellMouseEventCB;
    property onCellTapHold: TQTXTabulatorCellMouseEventCB;
    property onCellMouseEnter: TQTXTabulatorCellMouseEventCB;
    property onCellMouseLeave: TQTXTabulatorCellMouseEventCB;
    property onCellMouseOver: TQTXTabulatorCellMouseEventCB;
    property onCellMouseOut: TQTXTabulatorCellMouseEventCB;
    property onCellMouseMove: TQTXTabulatorCellMouseEventCB;
    property onCellEditing: TQTXTabulatorCellCB;
    property onCellEditCancelled: TQTXTabulatorCellCB;
    property onCellEdited: TQTXTabulatorCellCB;
    property onDataLoading: TQTXTabulatorDataCB;
    property onDataLoaded: TQTXTabulatorDataCB;
    property onDataChanged: TQTXTabulatorDataCB;
    property onDataImported: TQTXTabulatorStdCB;
    property onHtmlImporting: TQTXTabulatorStdCB;
    property onHtmlImported: TQTXTabulatorStdCB;
    property onAjaxRequesting: TQTXTabulatorAjaxRequestingCB;
    property onAjaxResponse: TQTXTabulatorAjaxResponseCB;
    property onAjaxError: TQTXTabulatorAjaxErrorCB;
    property onDataFiltering: TQTXTabulatorDataFilteringCB;
    property onDataFiltered: TQTXTabulatorDataFilteredCB;
    property onDataSorting: TQTXTabulatorDataSortingCB;
    property onDataSorted: TQTXTabulatorDataSortedCB;
    property onRenderStarted: TQTXTabulatorStdCB;
    property onRenderComplete: TQTXTabulatorStdCB;
    property onPageLoaded: TQTXTabulatorPageLoadedCB;
    property onLocalized: TQTXTabulatorLocalizedCB;
    property onDataGrouping: TQTXTabulatorStdCB;
    property onDataGrouped: TQTXTabulatorDataGroupedCB;
    property onGroupVisibilityChanged: TQTXTabulatorGroupVisibilityChangedCB;
    property onGroupClick: TQTXTabulatorGroupMouseEventCB;
    property onGroupDblClick: TQTXTabulatorGroupMouseEventCB;
    property onGroupContext: TQTXTabulatorGroupMouseEventCB;
    property onGroupTap: TQTXTabulatorGroupMouseEventCB;
    property onGroupDblTap: TQTXTabulatorGroupMouseEventCB;
    property onRowSelectionChanged: TQTXTabulatorRowSelectionChangedCB;
    property onMovableRowsSendingStart: TQTXTabulatorMovableRowsSendingStartCB;
    property onMovableRowsSent: TQTXTabulatorMovableRowsSentCB;
    property onMovableRowsSentFailed: TQTXTabulatorMovableRowsSentFailedCB;
    property onMovableRowsSendingStop: TQTXTabulatorMovableRowsSendingStopCB;
    property onMovableRowsReceivingStart: TQTXTabulatorMovableRowsReceivingStartCB;
    property onMovableRowsReceivingStop: TQTXTabulatorMovableRowsReceivingStopCB;
    property onMovableRowsReceived: TQTXTabulatorMovableRowsReceivedCB;
    property onMovableRowsReceivedFailed: TQTXTabulatorMovableRowsReceivedFailedCB;
    property onValidationFailed: TQTXTabulatorValidationFailedCB;
    property onHistoryUndo: TQTXTabulatorHistoryCB;
    property onHistoryRedo: TQTXTabulatorHistoryCB;
    property onClipboardCopied: TQTXTabulatorClipboardStdCB;
    property onClipboardPasted: TQTXTabulatorClipboardPasted;
    property onClipboardPasteError: TQTXTabulatorClipboardStdCB;
    property onDownloadDataFormatter: TQTXTabulatorDataCB;
    property onDownloadReady: TQTXTabulatorDownloadReadyCB;
    property onDownloadComplete: TQTXTabulatorStdCB;
    property onDataTreeRowExpanded: TQTXTabulatorDataTreeCB;
    property onDataTreeRowCollapsed: TQTXTabulatorDataTreeCB;
    property onScrollVertical: TQTXTabulatorScrollVerticalCV;
    property onScrollHorizontal: TQTXTabulatorScrollHorizontalCB;
  end;

  TQTXTabulator = class (TQTXWidget)
  private
    fDontUpdateTabulator: Boolean;
    function getColumnDefs(): TVariantArray;
    function propGetData(): TVariantArray;
    procedure propSetData(const value: TVariantArray);
    function propGetCellValue(ARow, ACol: Integer): Variant;
    procedure propSetCellValue(ARow, ACol: Integer; const value: Variant);
    function propGetCell(ARow, ACol: Integer): TTabulatorCellComponent;
    function propGetRow(ARow: Integer): TTabulatorRowComponent;
    function propGetColumn(ACol: Integer): TTabulatorColumnComponent;
    function propGetRowCount(): Integer;
    function propGetVisibleRowCount(): Integer;
    procedure BuildOptions();
    function getColumnDefinitionFrom(from: Variant; returnFalseIfNotValid: Boolean = true): Variant;
  protected
    fTabulator: TTabulator;
    fData: TVariantArray;
    fColumns: TVariantArray;
    fCreationOptions: TTabulatorOptions;
    fCreationEvents: TTabulatorCreationEvents;
    //fOptions: TTabulatorOptions;
  public
    property CreationOptions: TTabulatorOptions read fCreationOptions;
    property CreationEvents: TTabulatorCreationEvents read fCreationEvents;

    property Tabulator: TTabulator read fTabulator write fTabulator;
    property Data: TVariantArray read propGetData write propSetData;
    property ColumnDefs: TVariantArray read getColumnDefs;
    property CellValues[ARow, ACol: Integer]: Variant read propGetCellValue write propSetCellValue;
    property Cells[ARow, ACol: Integer]: TTabulatorCellComponent read propGetCell;
    property Rows[ARow: Integer]: TTabulatorRowComponent read propGetRow;
    property Columns[ACol: Integer]: TTabulatorColumnComponent read propGetColumn;
    property RowCount: Integer read propGetRowCount; // write propSetRowCount;
    property VisibleRowCount: Integer read propGetVisibleRowCount;

    property onColumnAdded: TQTXTabulatorColumnCB;
    property onColumnInserted: TQTXTabulatorColumnCB;
    property onColumnDefinitionUpdated: TQTXTabulatorColumnCB;
    property onColumnDeleted: TQTXTabulatorStdCB;
    property onReplaceData: TQTXTabulatorStdCB;
    property onSetData: TQTXTabulatorStdCB;
    property onUpdateOrAddData: TQTXTabulatorRowsCB;

    //Column manipulation
    procedure setColumns(columns: TVariantArray);
    procedure addColumn(columnDefinition: Variant; CB: TQTXTabulatorColumnCB = nil);
    procedure insertColumn(columnDefinition: Variant; insertBeforeTarget: Boolean = false; target: Variant = null; CB: TQTXTabulatorColumnCB = nil);
    procedure updateColumn(target, columnDefinition: Variant; CB: TQTXTabulatorColumnCB = nil);
    procedure deleteColumn(target: Variant; CB: TQTXTabulatorStdCB = nil);
    function  getColumn(target: Variant): TTabulatorColumnComponent;

    //Data manipulation
    function setData(fields: array of String; values: array of Variant; CB: TQTXTabulatorStdCB = nil): JPromise; overload;
    function setData(data: array of Variant; CB: TQTXTabulatorStdCB = nil): JPromise; overload;
    function setData(url: string; ajaxParams: Variant = null; ajaxConfig: Variant = 'POST'; CB: TQTXTabulatorStdCB = nil): JPromise; overload;
    function setData(CB: TQTXTabulatorStdCB = nil): JPromise; overload;
    function replaceData(fields: array of String; values: array of Variant; CB: TQTXTabulatorStdCB = nil): JPromise; overload;
    function replaceData(data: array of Variant; CB: TQTXTabulatorStdCB = nil): JPromise; overload;
    function replaceData(url: string; ajaxParams: Variant = null; ajaxConfig: Variant = 'POST'; CB: TQTXTabulatorStdCB = nil): JPromise; overload;
    function replaceData(CB: TQTXTabulatorStdCB = nil): JPromise; overload;
    function updateData(fields: array of String; values: array of Variant; CB: TQTXTabulatorRowsCB = nil): JPromise; overload;
    function updateData(data: array of Variant; CB: TQTXTabulatorRowsCB = nil): JPromise; overload;
    function addData(fields: array of String; values: array of Variant; addToTop: Variant = null; CB: TQTXTabulatorRowsCB = nil): JPromise; overload;
    function addData(data: array of Variant; addToTop: Variant = null; CB: TQTXTabulatorRowsCB = nil): JPromise; overload;
    function updateOrAddData(fields: array of String; values: array of Variant; CB: TQTXTabulatorRowsCB = nil): JPromise; overload;
    function updateOrAddData(data: array of Variant; CB: TQTXTabulatorRowsCB = nil): JPromise; overload;
    procedure clearData();

    //Retrieving data
    function getData(rowRangeLookup: String = 'all'): array of Variant;
    function getDataCount(rowRangeLookup: String = 'all'): integer;
    function getRow(rowRangeLookup: Variant = 'all'): TTabulatorRowComponent;
    function getRows(rowRangeLookup: Variant = 'all'): array of TTabulatorRowComponent;
    //Search data
    function searchRows(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null): array of TTabulatorRowComponent;
    function searchData(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null): array of variant;
    //Row Position
    function getRowPosition(row: TTabulatorRowComponent; inFilteredOrSortedData: Boolean = false): integer;
    function getRowFromPosition(position: Integer; inFilteredOrSortedData: Boolean): TTabulatorRowComponent;
    //Retrieving data as html
    function getHtml(rowRangeLookup: Variant = 'active'; styledMatchTable: Boolean = false; configOverride: Variant = null): String;
    procedure showColumn(columnComponentLookup: Variant);
    procedure hideColumn(columnComponentLookup: Variant);
    procedure toggleColumn(columnComponentLookup: Variant);
    //Sort
    procedure setSort(sortParams: array of variant);
    procedure clearSort();
    //Filter
    procedure setFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null); overload;
    procedure setFilter(opts: array of Variant); overload;
    procedure addFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null); overload;
    procedure refreshFilter();
    procedure removeFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null); overload;
    function getFilters(includeHeaderFilter: Boolean = false): array of Variant;
    function getHeaderFilters(): array of Variant;
    procedure clearFilter(clearHeaderFilter: Boolean = false);
    procedure setHeaderFilterValue(columnComponentLookup: Variant; value: String);
    function getHeaderFilter(columnComponentLookup: Variant): String;
    procedure setHeaderFilterFocus(columnComponentLookup: Variant);
    //Pagination
    function setPage(page: Variant /* Number | first | prev | next | last */; CB: TQTXTabulatorStdCB = nil): JPromise;
    function nextPage(CB: TQTXTabulatorStdCB = nil): JPromise;
    function previousPage(CB: TQTXTabulatorStdCB = nil): JPromise;
    function setPageToRow(rowComponentLookup: Variant; CB: TQTXTabulatorStdCB = nil): JPromise;
    procedure setPageSize(pageSize: Integer);
    function getPageSize(): Integer;
    function getPage(): Variant;
    function getPageMax(): Variant;
    //Calc
    procedure recalc();
    function getCalcResults(): array of Variant;
    //Navigation
    procedure navigatePrev();
    procedure navigateNext();
    procedure navigateLeft();
    procedure navigateRight();
    procedure navigateUp();
    procedure navigateDown();
    //Scrolling
    procedure scrollToColumn(columnComponentLookup: Variant; columnPosition: string = 'left'; scrollIfVisible: Boolean = true);
    procedure scrollToRow(rowComponentLookup: Variant; rowPosition: String = 'top' /*top|center|bottom|nearest*/; scrollIfVisible: Boolean = true);
    //Moving
    procedure moveRow(rowComponentLookup: Variant; target: Variant; moveAboveTarget: Boolean = true);
    procedure moveColumn(columnComponentLookup: Variant; target: Variant; moveAfterTarget: Boolean = true);
    //Selection
    procedure selectRow(rowComponentLookup: Variant); overload;
    procedure selectRow(rowComponentLookups: array of Variant); overload;
    procedure deselectRow(rowComponentLookup: Variant); overload;
    procedure deselectRow(rowComponentLookups: array of Variant); overload;
    function getSelectedData(): Array of Variant;
    function getSelectedRows(): Array of TTabulatorRowComponent;
    //Interaction history
    procedure undo();
    function getHistoryUndoSize(): Integer;
    procedure redo();
    procedure clearHistory();
    //Column layout
    procedure setColumnLayout(columnLayout: variant);
    function getColumnLayout(): Variant;
    //Clipboard
    procedure copyToClipboard(rowRangeLookup: Variant = 'all');
    //Download
    procedure download(downloadType: String = 'csv'; fileName: String = 'data.csv'; opts: Variant = null; rowRangeLookup: String = 'all');
    procedure downloadToTab(downloadType: String = 'pdf'; fileName: String = 'data.pdf'; opts: Variant = null; rowRangeLookup: String = 'all');
    //Print
    procedure print(rowRangeLookup: String = 'active'; styledLikeTable: Boolean = true; printOpts: Variant = null);

    class function mergeFieldsWithData(fields: array of String; data: array of variant): array of variant;

    procedure ReCreateTabulator(tableOptionsOverride: TTabulatorOptions = nil; CB: TQTXTabulatorConstructorCB = nil);
    constructor Create(Aowner: TQTXComponent; CB: TQTXTabulatorConstructorCB); override;
    destructor Destroy(); override;
  end;

  /*
  Convert an array to an object:

  myObj := newObj([
    'name1', 'value1',
    'name2', 'value2'
  });

  is the same as:

  myObj := class
    name1 = 'value1';
    name2 = 'value2';
  end;
*/
  function _obj(elts: Array of Variant): Variant;

implementation

function _obj(elts: Array of Variant): Variant;
var
  c, i: integer;
begin
  c := elts.Count();
  if (c mod 2) = 0 then begin
    i:=0;
    Result := TVariant.CreateObject;
    while (i<c) do begin
      TVariant.PropertyWrite(Result, TVariant.AsString(elts[i]), elts[i+1]);
      inc(I,2);
    end;
 end else begin
   Result := null;
 end;
end;

//TTabulatorPersistenceOptions

class function TTabulatorPersistenceOptions.RenderFromParams(sSort, sFilter, sGroup, sPage, sColumns: Variant): Variant;
begin
  var opt: TTabulatorPersistenceOptions := new TTabulatorPersistenceOptions();
  opt.sort := TVariant.AsBool(sSort);
  opt.filter := TVariant.AsBool(sFilter);
  opt.group := sGroup;
  opt.page := sPage;
  opt.columns := sColumns;
  Result := opt.RenderOptions();
end;

//TTabulatorPagePersistenceOptions

class function TTabulatorPagePersistenceOptions.RenderFromParams(sSize, sPage: Boolean): Variant;
begin
  var opt: TTabulatorPagePersistenceOptions := new TTabulatorPagePersistenceOptions();
  opt.page := sPage;
  opt.size := sSize;
  Result := opt.RenderOptions();
end;

//TTabulatorGroupPersistenceOptions

class function TTabulatorGroupPersistenceOptions.RenderFromParams(sGroupBy, sGroupStartOpen, sGroupHeader: Boolean): Variant;
begin
  var opt: TTabulatorGroupPersistenceOptions := new TTabulatorGroupPersistenceOptions();
  opt.groupby := sGroupBy;
  opt.groupHeader := sGroupHeader;
  opt.groupStartOpen := sGroupStartOpen;
  Result := opt.RenderOptions();
end;

//TTabulatorMenuItemOptions
class function TTabulatorMenuItemOptions.RenderFromParams(sLabel, sAction: Variant; sMenu: Variant = null; sSeparator: Variant = null; sDisabled : Variant = null): Variant;
begin
  var opt: TTabulatorMenuItemOptions := new TTabulatorMenuItemOptions();
  opt.action := sAction;
  opt.label := sLabel;
  opt.disabled := sDisabled;
  opt.separator := sSeparator;
  opt.menu := sMenu;
  Result := opt.RenderOptions;
end;


//TTabulatorOptionsRenderer

constructor TTabulatorOptionsRenderer.Create(opts: Variant = null);
begin
  inherited Create();

  fOpts := TVariant.CreateObject;
  if opts <> null then begin
    asm
     @fOpts = Object.assign(@fOpts, @opts);
    end;
  end;
end;

function TTabulatorOptionsRenderer.getProp(prop: String): Variant;
begin
  Result := fOpts[prop];
end;

procedure TTabulatorOptionsRenderer.setProp(prop: String; value: Variant);
begin
  fOpts[prop] := value;
end;

function TTabulatorOptionsRenderer.RenderOptions(): Variant;
begin
  Result := fOpts;
end;

constructor TTabulatorColumnDefinition.Create(sTitle: String = ''; sField: String = ''; opts: Variant = null);
begin
  inherited Create(opts);

  fOpts.title := sTitle;
  fOpts.field := sField;
end;

class function TTabulatorColumnDefinition.RenderFromParams(sTitle: String = ''; sField: String = ''; opts: Variant = null): Variant;
begin
  var colDef := new TTabulatorColumnDefinition(sTitle, sField, opts);
  Result := colDef.RenderOptions();
end;

//TTabulatorOptions

constructor TTabulatorOptions.Create(opts: Variant = null);
begin
  inherited Create(opts);
  columns := [];
  data := [];
end;

function TTabulatorOptions.RenderOptions(): Variant;
begin
  //?BUG??
  //fOpts.columns := Self.columns;
  //fOpts.data = Self.data
  //--> Workarround below
  asm
    (@fOpts).columns = (@Self.columns);
    (@fOpts).data = (@Self.data);
    @Result = @fOpts;
  end;
end;

//TQTXTabulator
constructor TQTXTabulator.Create(Aowner: TQTXComponent; CB: TQTXTabulatorConstructorCB);
begin
  inherited Create(Aowner, procedure (tab: TQTXWidget)
  begin
    fCreationOptions := new TTabulatorOptions();
    fCreationEvents := new TTabulatorCreationEvents();

    tab.WhenReady(procedure(widget: TQTXWidget)
    begin
      TQTXDispatch.Execute(procedure()
      begin
        BuildOptions();
        fTabulator := new TTabulator('#' + Self.Attributes.AttributeRead('id'), CreationOptions.RenderOptions());

        if Assigned(CB) then CB(Self);
      end, 50);
    end);
  end);
end;

procedure TQTXTabulator.ReCreateTabulator(tableOptionsOverride: TTabulatorOptions = nil; CB: TQTXTabulatorConstructorCB = nil);
begin
  //fTabulator.destroy();
  fTabulator := nil;

  TQTXDispatch.Execute(procedure()
  begin
    if Assigned(tableOptionsOverride) then fCreationOptions := tableOptionsOverride else BuildOptions();
    fTabulator := new TTabulator('#' + Self.Attributes.AttributeRead('id'), CreationOptions.RenderOptions());

    if Assigned(CB) then CB(Self);
  end, 50);
end;

destructor TQTXTabulator.Destroy();
begin
  CreationEvents.Free();
  CreationOptions.Free();
  fTabulator.destroy();

  inherited Destroy();
end;

function TQTXTabulator.propGetData(): TVariantArray;
begin
  fData :=  getData('all');
  Result := fData;
end;

procedure TQTXTabulator.propSetData(const value: TVariantArray);
begin
  fData := value;
  setData(value);
end;

function TQTXTabulator.propGetCellValue(ARow, ACol: Integer): Variant;
begin
  var row: TTabulatorRowComponent := getRowFromPosition(ARow, false);
  var cell: TTabulatorCellComponent := row.getCells()[ACol];
  Result := cell.getValue();
end;

procedure TQTXTabulator.propSetCellValue(ARow, ACol: Integer; const value: Variant);
begin
  var row := getRowFromPosition(ARow, false);
  row.getCells()[ACol].setValue(value, true);
end;

function TQTXTabulator.propGetCell(ARow, ACol: Integer): TTabulatorCellComponent;
begin
  var row: TTabulatorRowComponent := getRowFromPosition(ARow, false);
  Result := row.getCells()[ACol];
end;

function TQTXTabulator.propGetRow(ARow: Integer): TTabulatorRowComponent;
begin
  Result := getRowFromPosition(ARow, false);
end;

function TQTXTabulator.propGetColumn(ACol: Integer): TTabulatorColumnComponent;
begin
  var colDefs := getColumnDefs();
  Result := getColumn(colDefs[ACol].field);
end;

function TQTXTabulator.propGetRowCount(): Integer;
begin
  Result := getRows('all').Count();
end;

function TQTXTabulator.propGetVisibleRowCount(): Integer;
begin
  Result := getRows('visible').Count();
end;

procedure TQTXTabulator.BuildOptions();
begin
  If Assigned(CreationEvents.onTableBuilding) then CreationOptions.tableBuilding := CreationEvents.onTableBuilding;
  If Assigned(CreationEvents.onTableBuilt) then CreationOptions.tableBuilt := CreationEvents.onTableBuilt;
  If Assigned(CreationEvents.onColumnMoved) then CreationOptions.columnMoved := CreationEvents.onColumnMoved;
  If Assigned(CreationEvents.onColumnResized) then CreationOptions.columnResized := CreationEvents.onColumnResized;
  If Assigned(CreationEvents.onColumnVisibilityChanged) then CreationOptions.columnVisibilityChanged := CreationEvents.onColumnVisibilityChanged;
  If Assigned(CreationEvents.onColumnTitleChanged) then CreationOptions.columnTitleChanged := CreationEvents.onColumnTitleChanged;
  If Assigned(CreationEvents.onRowClick) then CreationOptions.rowClick := CreationEvents.onRowClick;
  If Assigned(CreationEvents.onRowDblClick) then CreationOptions.rowDblClick := CreationEvents.onRowDblClick;
  If Assigned(CreationEvents.onRowContext) then CreationOptions.rowContext := CreationEvents.onRowContext;
  If Assigned(CreationEvents.onRowTap) then CreationOptions.rowTap := CreationEvents.onRowTap;
  If Assigned(CreationEvents.onRowDblTap) then CreationOptions.rowDblTap := CreationEvents.onRowDblTap;
  If Assigned(CreationEvents.onRowTapHold) then CreationOptions.rowTapHold := CreationEvents.onRowTapHold;
  If Assigned(CreationEvents.onRowMouseEnter) then CreationOptions.rowMouseEnter := CreationEvents.onRowMouseEnter;
  If Assigned(CreationEvents.onRowMouseLeave) then CreationOptions.rowMouseLeave := CreationEvents.onRowMouseLeave;
  If Assigned(CreationEvents.onRowMouseOver) then CreationOptions.rowMouseOver := CreationEvents.onRowMouseOver;
  If Assigned(CreationEvents.onRowMouseMove) then CreationOptions.rowMouseMove := CreationEvents.onRowMouseMove;
  If Assigned(CreationEvents.onRowAdded) then CreationOptions.rowAdded := CreationEvents.onRowAdded;
  If Assigned(CreationEvents.onRowUpdated) then CreationOptions.rowUpdated := CreationEvents.onRowUpdated;
  If Assigned(CreationEvents.onRowDeleted) then CreationOptions.rowDeleted := CreationEvents.onRowDeleted;
  If Assigned(CreationEvents.onRowMoved) then CreationOptions.rowMoved := CreationEvents.onRowMoved;
  If Assigned(CreationEvents.onRowResized) then CreationOptions.rowResized := CreationEvents.onRowResized;
  If Assigned(CreationEvents.onRowSelected) then CreationOptions.rowSelected := CreationEvents.onRowSelected;
  If Assigned(CreationEvents.onRowDeselected) then CreationOptions.rowDeselected := CreationEvents.onRowDeselected;
  If Assigned(CreationEvents.onCellClick) then CreationOptions.cellClick := CreationEvents.onCellClick;
  If Assigned(CreationEvents.onCellDblClick) then CreationOptions.cellDblClick := CreationEvents.onCellDblClick;
  If Assigned(CreationEvents.onCellContext) then CreationOptions.cellContext := CreationEvents.onCellContext;
  If Assigned(CreationEvents.onCellTap) then CreationOptions.cellTap := CreationEvents.onCellTap;
  If Assigned(CreationEvents.onCellDblTap) then CreationOptions.cellDblTap := CreationEvents.onCellDblTap;
  If Assigned(CreationEvents.onCellTapHold) then CreationOptions.cellTapHold := CreationEvents.onCellTapHold;
  If Assigned(CreationEvents.onCellMouseEnter) then CreationOptions.cellMouseEnter := CreationEvents.onCellMouseEnter;
  If Assigned(CreationEvents.onCellMouseLeave) then CreationOptions.cellMouseLeave := CreationEvents.onCellMouseLeave;
  If Assigned(CreationEvents.onCellMouseOver) then CreationOptions.cellMouseOver := CreationEvents.onCellMouseOver;
  If Assigned(CreationEvents.onCellMouseOut) then CreationOptions.cellMouseOut := CreationEvents.onCellMouseOut;
  If Assigned(CreationEvents.onCellMouseMove) then CreationOptions.cellMouseMove := CreationEvents.onCellMouseMove;
  If Assigned(CreationEvents.onCellEditing) then CreationOptions.cellEditing := CreationEvents.onCellEditing;
  If Assigned(CreationEvents.onCellEditCancelled) then CreationOptions.cellEditCancelled := CreationEvents.onCellEditCancelled;
  If Assigned(CreationEvents.onCellEdited) then CreationOptions.cellEdited := CreationEvents.onCellEdited;
  If Assigned(CreationEvents.onDataLoading) then CreationOptions.dataLoading := CreationEvents.onDataLoading;
  If Assigned(CreationEvents.onDataLoaded) then CreationOptions.dataLoaded := CreationEvents.onDataLoaded;
  If Assigned(CreationEvents.onDataChanged) then CreationOptions.dataChanged := CreationEvents.onDataChanged;
  If Assigned(CreationEvents.onDataImported) then CreationOptions.dataImported := CreationEvents.onDataImported;
  If Assigned(CreationEvents.onHtmlImporting) then CreationOptions.htmlImporting := CreationEvents.onHtmlImporting;
  If Assigned(CreationEvents.onHtmlImported) then CreationOptions.htmlImported := CreationEvents.onHtmlImported;
  If Assigned(CreationEvents.onAjaxRequesting) then CreationOptions.ajaxRequesting := CreationEvents.onAjaxRequesting;
  If Assigned(CreationEvents.onAjaxResponse) then CreationOptions.ajaxResponse := CreationEvents.onAjaxResponse;
  If Assigned(CreationEvents.onAjaxError) then CreationOptions.ajaxError := CreationEvents.onAjaxError;
  If Assigned(CreationEvents.onDataFiltering) then CreationOptions.dataFiltering := CreationEvents.onDataFiltering;
  If Assigned(CreationEvents.onDataFiltered) then CreationOptions.dataFiltered := CreationEvents.onDataFiltered;
  If Assigned(CreationEvents.onDataSorting) then CreationOptions.dataSorting := CreationEvents.onDataSorting;
  If Assigned(CreationEvents.onDataSorted) then CreationOptions.dataSorted := CreationEvents.onDataSorted;
  If Assigned(CreationEvents.onRenderStarted) then CreationOptions.renderStarted := CreationEvents.onRenderStarted;
  If Assigned(CreationEvents.onRenderComplete) then CreationOptions.renderComplete := CreationEvents.onRenderComplete;
  If Assigned(CreationEvents.onPageLoaded) then CreationOptions.pageLoaded := CreationEvents.onPageLoaded;
  If Assigned(CreationEvents.onLocalized) then CreationOptions.localized := CreationEvents.onLocalized;
  If Assigned(CreationEvents.onDataGrouping) then CreationOptions.dataGrouping := CreationEvents.onDataGrouping;
  If Assigned(CreationEvents.onDataGrouped) then CreationOptions.dataGrouped := CreationEvents.onDataGrouped;
  If Assigned(CreationEvents.onGroupVisibilityChanged) then CreationOptions.groupVisibilityChanged := CreationEvents.onGroupVisibilityChanged;
  If Assigned(CreationEvents.onGroupClick) then CreationOptions.groupClick := CreationEvents.onGroupClick;
  If Assigned(CreationEvents.onGroupDblClick) then CreationOptions.groupDblClick := CreationEvents.onGroupDblClick;
  If Assigned(CreationEvents.onGroupContext) then CreationOptions.groupContext := CreationEvents.onGroupContext;
  If Assigned(CreationEvents.onGroupTap) then CreationOptions.groupTap := CreationEvents.onGroupTap;
  If Assigned(CreationEvents.onGroupDblTap) then CreationOptions.groupDblTap := CreationEvents.onGroupDblTap;
  If Assigned(CreationEvents.onRowSelectionChanged) then CreationOptions.rowSelectionChanged := CreationEvents.onRowSelectionChanged;
  If Assigned(CreationEvents.onMovableRowsSendingStart) then CreationOptions.movableRowsSendingStart := CreationEvents.onMovableRowsSendingStart;
  If Assigned(CreationEvents.onMovableRowsSent) then CreationOptions.movableRowsSent := CreationEvents.onMovableRowsSent;
  If Assigned(CreationEvents.onMovableRowsSentFailed) then CreationOptions.movableRowsSentFailed := CreationEvents.onMovableRowsSentFailed;
  If Assigned(CreationEvents.onMovableRowsSendingStop) then CreationOptions.movableRowsSendingStop := CreationEvents.onMovableRowsSendingStop;
  If Assigned(CreationEvents.onMovableRowsReceivingStart) then CreationOptions.movableRowsReceivingStart := CreationEvents.onMovableRowsReceivingStart;
  If Assigned(CreationEvents.onMovableRowsReceivingStop) then CreationOptions.movableRowsReceivingStop := CreationEvents.onMovableRowsReceivingStop;
  If Assigned(CreationEvents.onMovableRowsReceived) then CreationOptions.movableRowsReceived := CreationEvents.onMovableRowsReceived;
  If Assigned(CreationEvents.onMovableRowsReceivedFailed) then CreationOptions.movableRowsReceivedFailed := CreationEvents.onMovableRowsReceivedFailed;
  If Assigned(CreationEvents.onValidationFailed) then CreationOptions.validationFailed := CreationEvents.onValidationFailed;
  If Assigned(CreationEvents.onHistoryUndo) then CreationOptions.historyUndo := CreationEvents.onHistoryUndo;
  If Assigned(CreationEvents.onHistoryRedo) then CreationOptions.historyRedo := CreationEvents.onHistoryRedo;
  If Assigned(CreationEvents.onClipboardCopied) then CreationOptions.clipboardCopied := CreationEvents.onClipboardCopied;
  If Assigned(CreationEvents.onClipboardPasted) then CreationOptions.clipboardPasted := CreationEvents.onClipboardPasted;
  If Assigned(CreationEvents.onClipboardPasteError) then CreationOptions.clipboardPasteError := CreationEvents.onClipboardPasteError;
  If Assigned(CreationEvents.onDownloadDataFormatter) then CreationOptions.downloadDataFormatter := CreationEvents.onDownloadDataFormatter;
  If Assigned(CreationEvents.onDownloadReady) then CreationOptions.downloadReady := CreationEvents.onDownloadReady;
  If Assigned(CreationEvents.onDownloadComplete) then CreationOptions.downloadComplete := CreationEvents.onDownloadComplete;
  If Assigned(CreationEvents.onDataTreeRowExpanded) then CreationOptions.dataTreeRowExpanded := CreationEvents.onDataTreeRowExpanded;
  If Assigned(CreationEvents.onDataTreeRowCollapsed) then CreationOptions.dataTreeRowCollapsed := CreationEvents.onDataTreeRowCollapsed;
  If Assigned(CreationEvents.onScrollVertical) then CreationOptions.scrollVertical := CreationEvents.onScrollVertical;
  If Assigned(CreationEvents.onScrollHorizontal) then CreationOptions.scrollHorizontal := CreationEvents.onScrollHorizontal;

end;

function TQTXTabulator.getColumnDefs(): TVariantArray;
begin
  Result := fTabulator.getColumnDefinitions();
end;

procedure TQTXTabulator.setColumns(columns: TVariantArray);
begin
  var cols: TVariantArray := [];
  for var column in columns do begin
    cols.Add(getColumnDefinitionFrom(column, false));
  end;
  fColumns := cols;
  if Assigned(fTabulator) and (not fDontUpdateTabulator) then
    fTabulator.setColumns(fColumns);
end;

function TQTXTabulator.getColumnDefinitionFrom(from: Variant; returnFalseIfNotValid: Boolean = true): Variant;
var
  colDefObj: TObject;
begin
  colDefObj := TVariant.ToObject(from);
  if Assigned(colDefObj) and (colDefObj is TTabulatorColumnDefinition) then begin
    Result := (colDefObj as TTabulatorColumnDefinition).RenderOptions;
  end else
    Result := from;
  if returnFalseIfNotValid and ((not TVariant.PropertyExists(Result, 'title')) or (not TVariant.PropertyExists(Result, 'field'))) then
    Result := false;
end;

procedure TQTXTabulator.addColumn(columnDefinition: Variant; CB: TQTXTabulatorColumnCB = nil);
begin
  columnDefinition := getColumnDefinitionFrom(columnDefinition);
  if columnDefinition = False then
    raise EQTXException.Create("Properties: 'title' and 'field' are required in the column definition");
  fColumns.Add(columnDefinition);
  fTabulator.addColumn(columnDefinition).then(function (value: Variant): Variant
  begin
    var obj: TTabulatorColumnComponent;
    asm @obj = @value; end;
    if Assigned(CB) then CB(obj);
    if Assigned(onColumnAdded) then onColumnAdded(obj);
  end);
end;

procedure TQTXTabulator.insertColumn(columnDefinition: Variant; insertBeforeTarget: Boolean = false; target: Variant = null; CB: TQTXTabulatorColumnCB = nil);
begin
  columnDefinition := getColumnDefinitionFrom(columnDefinition);
  if columnDefinition = False then
    raise  EQTXException.Create("Properties: 'title' and 'field' are required in the column definition");
  fColumns.Add(columnDefinition);
  fTabulator.addColumn(columnDefinition, insertBeforeTarget, target).then(function (value: Variant): Variant
  begin
    var obj: TTabulatorColumnComponent;
    asm @obj = @value; end;
    if Assigned(CB) then CB(obj);
    if Assigned(onColumnInserted) then onColumnInserted(obj);
  end);
end;

procedure TQTXTabulator.updateColumn(target, columnDefinition: Variant; CB: TQTXTabulatorColumnCB = nil);
begin
  columnDefinition := getColumnDefinitionFrom(columnDefinition, false);

  fTabulator.updateColumnDefinition(target, columnDefinition).then(function (value: Variant): Variant
  begin
    var obj: TTabulatorColumnComponent;
    asm @obj = @value; end;
    if Assigned(CB) then CB(obj);
    if Assigned(onColumnDefinitionUpdated) then onColumnDefinitionUpdated(obj);

  end);
end;

procedure TQTXTabulator.deleteColumn(target: Variant; CB: TQTXTabulatorStdCB = nil);
begin
  fTabulator.deleteColumn(target).then(function (value: Variant): Variant
  begin
    if Assigned(CB) then CB();
    if Assigned(onColumnDeleted) then onColumnDeleted();
  end);
end;

function TQTXTabulator.getColumn(target: Variant): TTabulatorColumnComponent;
begin
  Result := fTabulator.getColumn(target);
end;

class function TQTXTabulator.mergeFieldsWithData(fields: array of String; data: array of variant): array of variant;
var
  tmp: TVariantArray;
begin
  //Checking lengths
  Result := [];
  for var value in data do begin
    var arr: array of Variant;
    asm @arr = @value; end;
    if arr.Count() <> fields.Count() then
      raise EQTXException.Create('Fields and each element of Values should be the same size.');
  end;

  //Merging
  tmp := [];
  for var value in data do begin
    var arr: array of Variant;
    asm @arr = @value; end;
    var elt: Variant := TVariant.CreateObject();
    for var i:=0 to fields.Count()-1 do begin
      elt[fields[i]] := arr[i];
    end;
    tmp.Add(elt);
  end;

  Result := tmp;
end;

function TQTXTabulator.setData(fields: array of String; values: array of Variant; CB: TQTXTabulatorStdCB = nil): JPromise;
var
  tmp: TVariantArray;
begin
  tmp := mergeFieldsWithData(fields, values);
  Result := setData(tmp, procedure()
  begin
    if Assigned(CB) then CB();
  end);
end;

function TQTXTabulator.setData(data: array of Variant; CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  fData := data;
  fTabulator.clearData();

  Result := fTabulator.setData(fData).then(function (value: Variant): Variant
  begin
    if Assigned(CB) then CB();
    if Assigned(onSetData) then onSetData();
  end);
end;

function TQTXTabulator.setData(url: string; ajaxParams: Variant = null; ajaxConfig: Variant = 'POST'; CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  Result := fTabulator.setData(url).then(function (value: Variant): Variant
  begin
    fData := fTabulator.getData('all');
    if Assigned(CB) then CB();
    if Assigned(onSetData) then onSetData();
  end);
end;

function TQTXTabulator.setData(CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  Result := fTabulator.setData().then(function (value: Variant): Variant
  begin
    fData := fTabulator.getData('all');
    if Assigned(CB) then CB();
    if Assigned(onSetData) then onSetData();
  end);
end;

function TQTXTabulator.replaceData(fields: array of String; values: array of Variant; CB: TQTXTabulatorStdCB = nil): JPromise;
var
  tmp: TVariantArray;
begin
  tmp := mergeFieldsWithData(fields, values);
  Result := replaceData(tmp, procedure()
  begin
    if Assigned(CB) then CB();
  end);
end;

function TQTXTabulator.replaceData(data: array of Variant; CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  fData := data;
  fTabulator.clearData();

  Result := fTabulator.replaceData(fData).then(function (value: Variant): Variant
  begin
    if Assigned(CB) then CB();
    if Assigned(onReplaceData) then onReplaceData();
  end);
end;

function TQTXTabulator.replaceData(url: string; ajaxParams: Variant = null; ajaxConfig: Variant = 'POST'; CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  Result := fTabulator.replaceData(url).then(function (value: Variant): Variant
  begin
    fData := fTabulator.getData('all');
    if Assigned(CB) then CB();
    if Assigned(onReplaceData) then onReplaceData();
  end);
end;

function TQTXTabulator.replaceData(CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  Result := fTabulator.replaceData().then(function (value: Variant): Variant
  begin
    fData := fTabulator.getData('all');
    if Assigned(CB) then CB();
    if Assigned(onReplaceData) then onReplaceData();
  end);
end;

function TQTXTabulator.updateData(fields: array of String; values: array of Variant; CB: TQTXTabulatorRowsCB = nil): JPromise;
var
  tmp: TVariantArray;
begin
  tmp := mergeFieldsWithData(fields, values);
  Result := updateData(tmp, procedure (rows: array of TTabulatorRowComponent)
  begin
    if Assigned(CB) then CB(rows);
  end);
end;

function TQTXTabulator.updateData(data: array of Variant; CB: TQTXTabulatorRowsCB = nil): JPromise;
begin
  Result := fTabulator.updateData(data).then(function (value: Variant): Variant
  begin
    var arrs: array of TTabulatorRowComponent;
    asm @arrs = @value; end;
    if Assigned(CB) then CB(arrs);
    if Assigned(onUpdateOrAddData) then onUpdateOrAddData(arrs);
  end);
end;

function TQTXTabulator.addData(fields: array of String; values: array of Variant; addToTop: Variant = null; CB: TQTXTabulatorRowsCB = nil): JPromise;
var
  tmp: TVariantArray;
begin
  tmp := mergeFieldsWithData(fields, values);
  Result := addData(tmp, addToTop);
end;

function TQTXTabulator.addData(data: array of Variant; addToTop: Variant = null; CB: TQTXTabulatorRowsCB = nil): JPromise;
begin
  Result := fTabulator.addData(data, addToTop).then(function (value: Variant): Variant
  begin
    var arrs: array of TTabulatorRowComponent;
    asm @arrs = @value; end;
    if Assigned(CB) then CB(arrs);
    if Assigned(onUpdateOrAddData) then onUpdateOrAddData(arrs);
  end);
end;

function TQTXTabulator.updateOrAddData(fields: array of String; values: array of Variant; CB: TQTXTabulatorRowsCB = nil): JPromise;
var
  tmp: TVariantArray;
begin
  tmp := mergeFieldsWithData(fields, values);
  Result := updateOrAddData(tmp, procedure (rows: array of TTabulatorRowComponent)
  begin
     if Assigned(CB) then CB(rows);
  end);
end;

function TQTXTabulator.updateOrAddData(data: array of Variant; CB: TQTXTabulatorRowsCB = nil): JPromise;
begin
  Result := fTabulator.addData(data).then(function (value: Variant): Variant
  begin
    var arrs: array of TTabulatorRowComponent;
    asm @arrs = @value; end;
    if Assigned(CB) then CB(arrs);
    if Assigned(onUpdateOrAddData) then onUpdateOrAddData(arrs);
  end);
end;

procedure TQTXTabulator.clearData();
begin
  fTabulator.clearData();
  fData.Clear();
end;

//Retrieving data
function TQTXTabulator.getData(rowRangeLookup: String = 'all'): array of Variant;
begin
  Result := fTabulator.getData(rowRangeLookup);
end;

function TQTXTabulator.getDataCount(rowRangeLookup: String = 'all'): integer;
begin
  Result := fTabulator.getDataCount(rowRangeLookup);
end;

function TQTXTabulator.getRow(rowRangeLookup: Variant = 'all'): TTabulatorRowComponent;
begin
  Result := fTabulator.getRow(rowRangeLookup);
end;

function TQTXTabulator.getRows(rowRangeLookup: Variant = 'all'): array of TTabulatorRowComponent;
begin
  Result := fTabulator.getRows(rowRangeLookup);
end;

//Search data
function TQTXTabulator.searchRows(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null): array of TTabulatorRowComponent;
begin
  Result := fTabulator.searchRows(field, operatorType, valueToSearch, optionalParams);
end;

function TQTXTabulator.searchData(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null): array of variant;
begin
  Result := fTabulator.searchData(field, operatorType, valueToSearch, optionalParams);
end;

//Row Position
function TQTXTabulator.getRowPosition(row: TTabulatorRowComponent; inFilteredOrSortedData: Boolean = false): integer;
begin
  Result := fTabulator.getRowPosition(row, inFilteredOrSortedData);
end;

function TQTXTabulator.getRowFromPosition(position: Integer; inFilteredOrSortedData: Boolean): TTabulatorRowComponent;
begin
  Result := fTabulator.getRowFromPosition(position, inFilteredOrSortedData);
end;

//Retrieving data as html
function TQTXTabulator.getHtml(rowRangeLookup: Variant = 'active'; styledMatchTable: Boolean = false; configOverride: Variant = null): String;
begin
  Result := fTabulator.getHtml(rowRangeLookup, styledMatchTable, configOverride);
end;

procedure TQTXTabulator.showColumn(columnComponentLookup: Variant);
begin
  fTabulator.getRows(columnComponentLookup);
end;

procedure TQTXTabulator.hideColumn(columnComponentLookup: Variant);
begin
  fTabulator.hideColumn(columnComponentLookup);
end;

procedure TQTXTabulator.toggleColumn(columnComponentLookup: Variant);
begin
  fTabulator.toggleColumn(columnComponentLookup);
end;

//Sort
procedure TQTXTabulator.setSort(sortParams: array of variant);
begin
  fTabulator.setSort(sortParams);
end;

procedure TQTXTabulator.clearSort();
begin
  fTabulator.clearSort();
end;

//Filter
procedure TQTXTabulator.setFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null);
begin
  fTabulator.setFilter(field, operatorType, valueToSearch, optionalParams);
end;

procedure TQTXTabulator.setFilter(opts: array of Variant);
begin
  fTabulator.setFilter(opts);
end;

procedure TQTXTabulator.addFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null);
begin
  fTabulator.addFilter(field, operatorType, valueToSearch, optionalParams);
end;

procedure TQTXTabulator.refreshFilter();
begin
  fTabulator.refreshFilter();
end;

procedure TQTXTabulator.removeFilter(field, operatorType: String; valueToSearch: Variant; optionalParams: Variant = null);
begin
  fTabulator.removeFilter(field, operatorType, valueToSearch, optionalParams);
end;

function TQTXTabulator.getFilters(includeHeaderFilter: Boolean = false): array of Variant;
begin
  Result := fTabulator.getFilters(includeHeaderFilter);
end;

function TQTXTabulator.getHeaderFilters(): array of Variant;
begin
  Result := fTabulator.getHeaderFilters();
end;

procedure TQTXTabulator.clearFilter(clearHeaderFilter: Boolean = false);
begin
  fTabulator.clearFilter(clearHeaderFilter);
end;

procedure TQTXTabulator.setHeaderFilterValue(columnComponentLookup: Variant; value: String);
begin
  fTabulator.setHeaderFilterValue(columnComponentLookup, value);
end;

function TQTXTabulator.getHeaderFilter(columnComponentLookup: Variant): String;
begin
  Result := fTabulator.getHeaderFilter(columnComponentLookup);
end;

procedure TQTXTabulator.setHeaderFilterFocus(columnComponentLookup: Variant);
begin
  fTabulator.setHeaderFilterFocus(columnComponentLookup);
end;

//Pagination
function TQTXTabulator.setPage(page: Variant /* Number | first | prev | next | last */; CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  Result := fTabulator.setPage(page).then(function(value: Variant): Variant
  begin
    if Assigned(CB) then CB();
  end);
end;

function TQTXTabulator.nextPage(CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  Result := fTabulator.nextPage().then(function(value: Variant): Variant
  begin
    if Assigned(CB) then CB();
  end);
end;

function TQTXTabulator.previousPage(CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  Result := fTabulator.previousPage().then(function(value: Variant): Variant
  begin
    if Assigned(CB) then CB();
  end);
end;

function TQTXTabulator.setPageToRow(rowComponentLookup: Variant; CB: TQTXTabulatorStdCB = nil): JPromise;
begin
  Result := fTabulator.setPageToRow(rowComponentLookup).then(function(value: Variant): Variant
  begin
    if Assigned(CB) then CB();
  end);
end;

procedure TQTXTabulator.setPageSize(pageSize: Integer);
begin
  fTabulator.setPageSize(pageSize);
end;

function TQTXTabulator.getPageSize(): Integer;
begin
  Result := fTabulator.getPageSize();
end;

function TQTXTabulator.getPage(): Variant;
begin
  Result := fTabulator.getPage();
end;

function TQTXTabulator.getPageMax(): Variant;
begin
  Result := fTabulator.getPageMax();
end;

//Calc
procedure TQTXTabulator.recalc();
begin
  fTabulator.recalc();
end;

function TQTXTabulator.getCalcResults(): array of Variant;
begin
  Result := fTabulator.getCalcResults();
end;

//Navigation
procedure TQTXTabulator.navigatePrev();
begin
  fTabulator.navigatePrev();
end;

procedure TQTXTabulator.navigateNext();
begin
  fTabulator.navigateNext();
end;

procedure TQTXTabulator.navigateLeft();
begin
  fTabulator.navigateLeft();
end;

procedure TQTXTabulator.navigateRight();
begin
  fTabulator.navigateRight();
end;

procedure TQTXTabulator.navigateUp();
begin
  fTabulator.navigateUp();
end;

procedure TQTXTabulator.navigateDown();
begin
  fTabulator.navigateDown();
end;

//Scrolling
procedure TQTXTabulator.scrollToColumn(columnComponentLookup: Variant; columnPosition: string = 'left'; scrollIfVisible: Boolean = true);
begin
  fTabulator.scrollToColumn(columnComponentLookup, columnPosition, scrollIfVisible);
end;

procedure TQTXTabulator.scrollToRow(rowComponentLookup: Variant; rowPosition: String = 'top' /*top|center|bottom|nearest*/; scrollIfVisible: Boolean = true);
begin
  fTabulator.scrollToRow(rowComponentLookup, rowPosition, scrollIfVisible);
end;

//Moving
procedure TQTXTabulator.moveRow(rowComponentLookup: Variant; target: Variant; moveAboveTarget: Boolean = true);
begin
  fTabulator.moveRow(rowComponentLookup, target, moveAboveTarget);
end;

procedure TQTXTabulator.moveColumn(columnComponentLookup: Variant; target: Variant; moveAfterTarget: Boolean = true);
begin
  fTabulator.moveColumn(columnComponentLookup, target, moveAfterTarget);
end;

//Selection
procedure TQTXTabulator.selectRow(rowComponentLookup: Variant);
begin
  fTabulator.selectRow(rowComponentLookup);
end;

procedure TQTXTabulator.selectRow(rowComponentLookups: array of Variant);
begin
  fTabulator.selectRow(rowComponentLookups);
end;

procedure TQTXTabulator.deselectRow(rowComponentLookup: Variant);
begin
  fTabulator.deselectRow(rowComponentLookup);
end;

procedure TQTXTabulator.deselectRow(rowComponentLookups: array of Variant);
begin
  fTabulator.deselectRow(rowComponentLookups);
end;

function TQTXTabulator.getSelectedData(): Array of Variant;
begin
  Result := fTabulator.getSelectedData();
end;

function TQTXTabulator.getSelectedRows(): Array of TTabulatorRowComponent;
begin
  Result := fTabulator.getSelectedRows();
end;

//Interaction history
procedure TQTXTabulator.undo();
begin
  fTabulator.undo();
end;

function TQTXTabulator.getHistoryUndoSize(): Integer;
begin
  Result := fTabulator.getHistoryUndoSize();
end;

procedure TQTXTabulator.redo();
begin
  fTabulator.redo();
end;

procedure TQTXTabulator.clearHistory();
begin
  fTabulator.clearHistory();
end;

//Column layout
procedure TQTXTabulator.setColumnLayout(columnLayout: variant);
begin
  fTabulator.setColumnLayout(columnLayout);
end;

function TQTXTabulator.getColumnLayout(): Variant;
begin
  Result := fTabulator.getColumnLayout();
end;

//Clipboard
procedure TQTXTabulator.copyToClipboard(rowRangeLookup: Variant = 'all');
begin
  fTabulator.copyToClipboard(rowRangeLookup);
end;

//Download
procedure TQTXTabulator.download(downloadType: String = 'csv'; fileName: String = 'data.csv'; opts: Variant = null; rowRangeLookup: String = 'all');
begin
  fTabulator.download(downloadType, fileName, opts, rowRangeLookup);
end;

procedure TQTXTabulator.downloadToTab(downloadType: String = 'pdf'; fileName: String = 'data.pdf'; opts: Variant = null; rowRangeLookup: String = 'all');
begin
  fTabulator.downloadToTab(downloadType, fileName, opts, rowRangeLookup);
end;

//Print
procedure TQTXTabulator.print(rowRangeLookup: String = 'active'; styledLikeTable: Boolean = true; printOpts: Variant = null);
begin
  fTabulator.print(rowRangeLookup, styledLikeTable, printOpts);
end;


initialization

end.
