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

unit tor.ace.wrapper;

interface

uses
  qtx.sysutils,
  qtx.classes,
  qtx.delegates,
  qtx.dom.types,
  qtx.dom.widgets,
  qtx.promises;

const
  AceWrapperVersion = '0.1';

type
  TAceStdCB = procedure ();
  TAceOnPasteCB = procedure (text: String);
  TAceStdEventCB = procedure (e: Variant);
  TAceOnReloadTokenizerCB = procedure (e: Variant);

  TAceRange = class;
  TAceDocument = class;
  TAceSelection = class;
  TAceUndoManager = class;
  TAceAnchor = class;

  TAceOptionsRenderer = class
  protected
    fOpts: Variant;
    function getProp(prop: String): Variant;
    procedure setProp(prop: String; value: Variant);
  public
    constructor Create(opts: Variant = null);
    function RenderOptions(): Variant; virtual;
  end;

  TAceUndoManager = class external "AceUndoManager"
    procedure execute(options: Variant);
    function hasRedo(): Boolean;
    function hasUndo(): Boolean;
    procedure redo(dontSelect: Boolean);
    procedure reset();
    procedure undo(dontSelect: Boolean);

    constructor Create();
  end;

  TAceDocument = class external "AceDocument"
    procedure &on(event: String; CB: TAceStdEventCB);

    procedure applyDeltas (deltas: Variant);
    function createAnchor(row, column: Integer): TAceAnchor;
    function getAllLines(): array of String;
    function getLength: Integer;
    function getLine(row: Integer): String;
    function getLines(firstRow, lastRow: Integer): array of String;
    function getNewLineCharacter(): String;
    function getNewLineMode(): String;
    function getTextRange(range: TAceRange): String;
    function getValue(): String;
    function indexToPosition(index, startRow: Integer): Variant;
    function insert(position: Variant; text: String): Variant;
    function insertInLine(position: Variant; text: String): Variant;
    function insertLines(row: integer; lines: array of string): Variant;
    function insertNewLine(position: Variant): Variant;
    function isNewLine(text: String): Boolean;
    function positionToIndex(pos: Variant; startRow: Integer): Integer;
    procedure remove(range: TAceRange);
    procedure removeInLine(row, startColumn, endColumn: Integer);
    procedure removeLines(firstRow, lastRow: Integer);
    procedure removeNewLine(row: Integer);
    procedure replace(range: TAceRange; text: String);
    procedure revertDeltas(deltas: Variant);
    procedure setNewLineMode(newLineMode: String);
    procedure setValue(text: String);

    constructor Create(text: String); overload;
    constructor Create(text: array of String); overload;
  end;

  TAceEditSession = class external "AceEditSession"
    procedure &on(event: String; CB: Variant);
    procedure addDynamicMarker(marker: Variant; inFront: Boolean);
    procedure addGutterDecoration(row: Integer; className: String);
    procedure addMarker(range: TAceRange; clazz: String; &type: Variant; inFront: Boolean);
    procedure clearAnnotations();
    procedure clearBreakpoint(row: Integer);
    procedure clearBreakpoints();
    function documentToScreenColumn(docRow, docColumn: Integer): Variant;
    function documentToScreenPosition(docRow, docColumn: Integer): Variant;
    function documentToScreenRow(docRow, docColumn: Integer): Variant;
    procedure duplicateLines(firstRow, lastRow: Integer);
    function getAnnotations(): Variant;
    function getAWordRange(): TAceRange;
    function getBreakpoints(): Array of Integer;
    function getDocument(): TAceDocument;
    function getDocumentLastRowColumn(docRow, docColumn: Integer): Integer;
    function getDocumentLastRowColumnPosition(docRow, docColumn: Integer): Integer;
    function getLength(): Integer;
    function getLine(row: Integer): String;
    function getLines(): Array of String;
    function getMarkers(): Array of String;
    function getMode(): Variant;
    function getNewLineMode(): String;
    function getOverwrite(): Boolean;
    function getRowLength(row: Integer): Integer;
    function getRowSplitData(row: Integer): String;
    function getScreenLastRowColumn(screenRow: Integer): Integer;
    function getScreenLength(): Integer;
    function getScreenTabSize(screenColumn: Integer): Integer;
    function getScreenWidth(): Integer;
    function getScrollLeft(): Integer;
    function getScrollTop(): Integer;
    function getSelection(): TAceSelection;
    function getState(row: Integer): Variant;
    function getTabSize(): Integer;
    function getTabString(): String;
    function getTextRange(range: TAceRange): String;
    function getTokenAt(row, column: Integer): Variant;
    function getTokens(row: Integer): Array of Variant;
    function getUndoManager(): TAceUndoManager;
    function getUseSoftTabs(): Boolean;
    function getUseWorker(): Boolean;
    function getUseWrapMode(): Boolean;
    function getValue(): String;
    function getWordRange(row, column: Integer): TAceRange;
    function getWrapLimit(): Integer;
    function getWrapLimitRange(): Variant;
    procedure highlight();
    procedure highlightLines();
    procedure indentRows(startRow, endRow: Integer; identString: String);
    function insert(position: Variant; text: String): Variant;
    function isTabStop(): Boolean;
    function moveLinesDown(firstRow, lastRow: Integer): Integer;
    function moveLinesUp(firstRow, lastRow: Integer): Integer;
    function moveText(fromRange: TAceRange; toPosition: Variant): TAceRange;
    procedure onChange(CB: TAceStdCB);
    procedure onChangeFold(CB: TAceStdCB);
    procedure onReloadTokenizer(CB: TAceOnReloadTokenizerCB);
    procedure outdentRows(range: TAceRange);
    procedure redo();
    procedure redoChanges(deltas: Array of Variant; dontSelect: boolean);
    procedure remove(range: TAceRange);
    procedure removeGutterDecoration(row: Integer; className: String);
    procedure removeMarker(markerId: Integer);
    procedure replace(range: TAceRange; text: String);
    procedure reset();
    procedure resetCaches();
    function screenToDocumentColumn(screenRow, screenColumn: Integer): Integer;
    function screenToDocumentPosition(screenRow, screenColumn: Integer): Variant;
    function screenToDocumentRow(screenRow, screenColumn: Integer): Integer;
    procedure setAnnotations(annotations: array of Variant);
    procedure setBreakpoint(row: Integer; className: String);
    procedure setBreakpoints(rows: Array of Integer);
    procedure setDocument(doc: TAceDocument);
    procedure setMode(mode: Variant);
    procedure setNewLineMode(newLineMode: String);
    procedure setOverwrite(overwrite: Boolean);
    procedure setScrollLeft(scrollLeft: Integer);
    procedure setScrollTop(scrollTop: Integer);
    procedure setTabSize(tabSize: Integer);
    procedure setUndoManager(undoManager: TAceUndoManager);
    procedure setUndoSelect(enable: Boolean);
    procedure setUseSoftTabs(useSoftTabs: Boolean);
    procedure setUseWorker(useWorker: Boolean);
    procedure setUseWrapMode(useWrapMode: Boolean);
    procedure setValue(text: String);
    procedure setWrapLimitRange(min, max: integer);
    procedure toggleOverwrite();
    function toString(): String;
    procedure undo();
    procedure undoChanges(deltas: Array of Variant; dontSelect: Boolean);
    constructor Create(text: String; mode: Variant);
  end;

  TAceAnchor = class external "AceAnchor"
    procedure &on(event: String; CB: TAceStdEventCB);
    procedure detach();
    function getDocument(): TAceDocument;
    function getPosition(): Variant;
    procedure onChange(CB: TAceStdCB);
    procedure setPosition(row, column: Integer; noClip: Boolean);

    constructor Create(doc: TAceDocument; row, column: Integer);
  end;

  TAceSelection = class external "AceSelection"
    procedure addRange(range: TAceRange; blockChangeEvents: Boolean);
    procedure clearSelection();
    procedure detach();
    function fromOrientedRange(range: TAceRange): Variant;
    function getAllRanges(): Array of TAceRange;
    function getCursor(): Integer;
    function getLineRange(row: Integer): TAceRange;
    function getRange(): TAceRange;
    function getSelectionAnchor(): Variant;
    function getSelectionLead(): Variant;
    function getWordRange(row, column: Integer): TAceRange;
    function isBackwards(): Boolean;
    function isEmpty(): Boolean;
    function isMultiLine(): Boolean;
    procedure mergeOverlappingRanges();
    procedure moveCursorBy(rows, chars: Integer);
    procedure moveCursorDown();
    procedure moveCursorFileEnd();
    procedure moveCursorFileStart();
    procedure moveCursorLeft();
    procedure moveCursorLineEnd();
    procedure moveCursorLineStart();
    procedure moveCursorLongWordLeft();
    procedure moveCursorLongWordRight();
    procedure moveCursorRight();
    procedure moveCursorShortWordLeft();
    procedure moveCursorShortWordRight();
    procedure moveCursorTo(row, column: Integer; keepDesiredColumn: Boolean);
    procedure moveCursorToPosition(position: Variant);
    procedure moveCursorToScreen(row, column: Integer; keepDesiredColumn: Boolean);
    procedure moveCursorUp();
    procedure moveCursorWordLeft();
    procedure moveCursorWordRight();
    procedure rectangularRangeBlock(screenCursor: Variant; screenAnchor: TAceAnchor; includeEmptyLines: Boolean);
    procedure selectAll();
    procedure selectAWord();
    procedure selectDown();
    procedure selectFileEnd();
    procedure selectFileStart();
    procedure selectLeft();
    procedure selectLine();
    procedure selectLineEnd();
    procedure selectLineStart();
    procedure selectRight();
    procedure selectTo(row, column: integer);
    procedure selectToPosition(pos: Variant);
    procedure selectUp();
    procedure selectWord();
    procedure selectWordLeft();
    procedure selectWordRight();
    procedure setSelectionAnchor(row, column: integer);
    procedure setSelectionRange(range: TAceRange; reverse: Boolean);
    procedure shiftSelection(columns: Integer);
    procedure splitIntoLines();
    procedure substractPoint(pos: TAceRange);
    procedure toggleBlockSelection();
    procedure toOrientedRange();
    procedure toSingleRange();

    constructor Create(session: TAceEditSession);
  end;

  TAceVisualRenderer = class external "AceVisualRenderer"
    procedure _loadTheme();
    procedure adjustWrapLimit();
    procedure alignCursor();
    procedure animateScrolling();
    procedure destroy();
    function getAnimatedScroll(): Boolean;
    function getContainerElement(): JElement;
    function getDisplayIndentGuides(): Variant;
    function getFadeFoldWidgets(): Variant;
    function getFirstFullyVisibleRow(): Integer;
    function getFirstVisibleRow(): Integer;
    function getHighlightGutterLine(): Variant;
    function getHScrollBarAlwaysVisible(): Boolean;
    function getLastFullyVisibleRow(): Integer;
    function getLastVisibleRow(): Integer;
    function getMouseEventTarget(): JElement;
    function getPrintMarginColumn(): Boolean;
    function getScrollBottomRow(): Integer;
    function getScrollLeft(): Integer;
    function getScrollTop(): Integer;
    function getScrollTopRow(): Integer;
    function getShowGutter(): Boolean;
    function getShowInvisibles(): Boolean;
    function getShowPrintMargin(): Boolean;
    function getTextAreaContainer(): JElement;
    function getTheme(): String;
    procedure hideComposition();
    procedure hideCursor();
    function isScrollableBy(deltaX, deltaY: Integer): Boolean;
    procedure onResize(force: Boolean; gutterWidth, width, height: Integer);
    function pixelToScreenCoordinates(): Variant;
    function screenToTextCoordinates(): Variant;
    procedure scrollBy(deltaX, deltaY: Integer);
    procedure scrollCursorIntoView(cursor, offset: Variant);
    procedure scrollSelectionIntoView();
    procedure scrollToLine(line: Integer; center, animate: Boolean; CB: TAceStdCB);
    procedure scrollToRow(row: Integer);
    procedure scrollToX(scrollLeft: Integer);
    procedure scrollToY(scrollTop: Integer);
    procedure setAnimatedScroll(shouldAnimate: Boolean);
    procedure setAnnotations(annotations: array of Variant);
    procedure setCompositionText(text: String);
    //procedure setDisplayIndentGuides();
    //procedure setFadeFoldWidgets();
    //procedure setHighlightGutterLine();
    procedure setHScrollBarAlwaysVisible(alwaysVisible: Boolean);
    procedure setPadding(padding: Integer);
    procedure setPrintMarginColumn(showPrintMargin: Boolean);
    procedure setSession(session: TAceEditSession);
    procedure setShowGutter(show: Boolean);
    procedure setShowInvisibles(showInvisibles: Boolean);
    procedure setShowPrintMargin(showPrintMargin: Boolean);
    procedure setStyle(style: String);
    procedure setTheme(theme: String);
    procedure showCursor();
    function textToScreenCoordinates(row, column: Integer): Variant;
    procedure unsetStyle(style: String);
    procedure updateBackMarkers();
    procedure updateBreakpoints(rows: Variant);
    procedure updateCharacterSize();
    procedure updateCursor();
    procedure updateFontSize();
    procedure updateFrontMarkers();
    procedure updateFull(force: Boolean);
    procedure updateLines(firstRow, lastRow: Integer);
    procedure updateText();
    procedure visualizeBlur();
    procedure visualizeFocus();

    constructor Create(container: JElement; theme: string);
  end;

  TAceRange = class external "AceRange"
    function clipRows(firstRow, lastRow: Integer): TAceRange;
    function clone(): TAceRange;
    function collapseRows(): TAceRange;
    function compare(row, column: Integer): Integer;
    function compareEnd(row, column: Integer): Integer;
    function compareInside(row, column: Integer): Integer;
    function comparePoint(p: TAceRange): Integer;
    function compareRange(range: TAceRange): Integer;
    function compareStart(row, column: Integer): Integer;
    function contains(row, column: Integer): Boolean;
    function containsRange(range: TAceRange): Boolean;
    function extend(row, column: integer): TAceRange;
    function fromPoints(start, &end: TAceRange): TAceRange;
    function inside(row, column: Integer): Boolean;
    function insideEnd(row, column: integer): boolean;
    function insideStart(row, column: integer): boolean;
    function intersects(range: TAceRange): boolean;
    function isEmpty(): Boolean;
    function isEnd(row, column: Integer): Boolean;
    function isEqual(range: TAceRange): Boolean;
    function isMultiLine(): Boolean;
    function isStart(): Boolean;
    procedure setEnd(row, column: Integer);
    procedure setStart(row, column: Integer);
    function toScreenRange(session: TAceEditSession): TAceRange;
    function toString(): String;

    constructor Create(startRow, startColumn, endRow, endColumn: Integer);
  end;

  TAceEditor = class external "AceEditor"
    procedure &on(event: String; CB: Variant); external "on";
    function addSelectionMarker(orientedRange: TAceRange): TAceRange;
    procedure alignCursors();
    procedure blockOutdent();
    procedure blur();
    procedure centerSelection();
    procedure clearSelection();
    procedure copyLinesDown();
    procedure copyLinesUp();
    procedure destroy();
    procedure duplicateSelection();
    procedure execCommand(command: String);
    procedure exitMultiSelectMode();
    procedure find(needle: String; options: Variant; animate: Boolean);
    function findAll(needle: String; options: Variant; keeps: Boolean): Integer;
    procedure findNext(options: Variant; animate: Boolean);
    procedure findPrevious(options: Variant; animate: Boolean);
    procedure focus();
    procedure forEachSelection(cmd, args: String);
    function getAnimatedScroll(): Boolean;
    function getBehavioursEnabled(): Boolean;
    function getCopyText(): String;
    function getCursorPosition(): Variant;
    function getCursorPositionScreen(): Integer;
    function getDisplayIndentGuides(): Variant;
    function getDragDelay(): Integer;
    function getFadeFoldWidgets(): Variant;
    function getFirstVisibleRow(): Integer;
    function getHighlightActiveLine(): Boolean;
    function getHighlightGutterLine(): Boolean;
    function getHighlightSelectedWord(): Boolean;
    function getKeyboardHandler(): String;
    function getLastSearchOptions(): Variant;
    function getLastVisibleRow(): Integer;
    function getNumberAt(row, column: Integer): integer;
    function getOverwrite(): boolean;
    function getPrintMarginColumn(): integer;
    function getReadOnly(): boolean;
    function getScrollSpeed(): Integer;
    function getSelection(): TAceSelection;
    function getSelectionRange(): TAceRange;
    function getSelectionStyle(): String;
    function getSession(): TAceEditSession;
    function getShowFoldWidgets(): Boolean;
    function getShowInvisibles(): Boolean;
    function getShowPrintMargin(): Boolean;
    function getTheme(): String;
    function getValue(): String;
    function getWrapBehavioursEnabled(): Boolean;
    procedure gotoLine(lineNumber, column: Integer; animate: Boolean);
    procedure gotoPageDown();
    procedure gotoPageUp();
    procedure indent();
    procedure insert(text: string);
    function isFocused(): Boolean;
    function isRowFullyVisible(): Boolean;
    function isRowVisible(): Boolean;
    procedure jumpToMatching(select: Variant);
    procedure modifyNumber(amount: Integer);
    procedure moveCursorTo(row, column: Integer);
    procedure moveCursorToPosition(pos: Variant);
    function moveLinesDown(): Integer;
    function moveLinesUp(): Integer;
    procedure moveText();
    procedure navigateDown(times: integer);
    procedure navigateFileEnd();
    procedure navigateFileStart();
    procedure navigateLeft();
    procedure navigateLineEnd();
    procedure navigateLineStart();
    procedure navigateRight();
    procedure navigateTo(row, column: integer);
    procedure navigateUp(times: integer);
    procedure navigateWordLeft();
    procedure navigateWordRight();
    procedure onBlur(CB: TAceStdCB);
    procedure onChangeAnnotation(CB: TAceStdCB);
    procedure onChangeBackMarker(CB: TAceStdCB);
    procedure onChangeBreakpoint(CB: TAceStdCB);
    procedure onChangeFold(CB: TAceStdCB);
    procedure onChangeFrontMarker(CB: TAceStdCB);
    procedure onChangeMode(CB: TAceStdCB);
    procedure onChangeWrapLimit(CB: TAceStdCB);
    procedure onChangeWrapMode(CB: TAceStdCB);
    procedure onCommandKey(CB: TAceStdCB);
    procedure onCompositionEnd(CB: TAceStdCB);
    procedure onCompositionStart(CB: TAceStdCB);
    procedure onCompositionUpdate(CB: TAceStdCB);
    procedure onCopy(CB: TAceStdCB);
    procedure onCursorChange(CB: TAceStdCB);
    procedure onCut(CB: TAceStdCB);
    procedure onDocumentChange(CB: TAceStdCB);
    procedure onFocus(CB: TAceStdCB);
    procedure onPaste(CB: TAceOnPasteCB);
    procedure onScrollLeftChange(CB: TAceStdCB);
    procedure onScrollTopChange(CB: TAceStdCB);
    procedure onSelectionChange(CB: TAceStdCB);
    procedure onTextInput(CB: TAceStdCB);
    procedure onTokenizerUpdate(CB: TAceStdCB);
    procedure redo();
    procedure remove(dir: String);
    procedure removeLines();
    procedure removeSelectionMarker(range: TAceRange);
    procedure removeToLineEnd();
    procedure removeToLineStart();
    procedure removeWordLeft();
    procedure removeWordRight();
    procedure replace(replacement: String; options: Variant);
    procedure replaceAll(replacement: String; options: Variant);
    procedure resize(force: Boolean);
    procedure revealRange();
    procedure scrollPageDown();
    procedure scrollPageUp();
    procedure scrollToLine(line: Integer; center, animate: Boolean; CB: TAceStdCB);
    procedure scrollToRow(row: Integer);
    procedure selectAll();
    procedure selectMore(dir: Integer; skip: Boolean);
    procedure selectMoreLines(dir: Integer; skip: Boolean);
    procedure selectPageDown();
    procedure selectPageUp();
    procedure setAnimatedScroll();
    procedure setBehavioursEnabled(enabled: Boolean);
    procedure setDisplayIndentGuides(identGuides: Variant);
    procedure setDragDelay(dragDelay: Integer);
    procedure setFadeFoldWidgets(fadeFoldWidget: Variant);
    procedure setFontSize(size: Integer);
    procedure setHighlightActiveLine(shouldHighlight: Boolean);
    procedure setHighlightGutterLine(gutterLine: Integer);
    procedure setHighlightSelectedWord(shoudHighlight: Boolean);
    procedure setKeyboardHandler(keyboardHandler: string); //Vim, windows, etc
    procedure setOverwrite(overwrite: Boolean);
    procedure setPrintMarginColumn(showPrintMargin: Boolean);
    procedure setReadOnly(readOnly: Boolean);
    procedure setScrollSpeed(speed: Boolean);
    procedure setSelectionStyle(style: String);
    procedure setSession(session: TAceEditSession);
    procedure setShowFoldWidgets(show: Boolean);
    procedure setShowInvisibles(showInvisibles: Boolean);
    procedure setShowPrintMargin(showPrintMargin: Boolean);
    procedure setStyle(style: String);
    procedure setTheme(theme: String);
    function setValue(val: String; curPos: Variant): String;
    procedure setWrapBehavioursEnabled(enabled: Boolean);
    procedure sortLines();
    procedure splitLine();
    procedure toggleCommentLines();
    procedure toggleOverwrite();
    procedure toLowerCase();
    procedure toUpperCase();
    procedure transposeLetters();
    procedure transposeSelections(dir: Integer);
    procedure undo();
    procedure unsetStyle(style: Variant);
    procedure updateSelectionMarkers();

    session: TAceEditSession;

    constructor Create(renderer: TAceVisualRenderer; session: TAceEditSession);
  end;

  TQTXAceWidget = class;

  TQTXAceWidgetConstructorCB = procedure (widget: TQTXAceWidget);

  TQTXAceWidget = class(TQTXWidget)
  private
    fDivEditor: TQTXWidget;
    fAceEditor: TAceEditor;
  public
    property Editor: TAceEditor read fAceEditor;
    property Session: TAceEditSession read (fAceEditor.session);

    function addSelectionMarker(orientedRange: TAceRange): TAceRange;
    procedure alignCursors();
    procedure blockOutdent();
    procedure blur();
    procedure centerSelection();
    procedure clearSelection();
    procedure copyLinesDown();
    procedure copyLinesUp();
    procedure duplicateSelection();
    procedure execCommand(command: String);
    procedure exitMultiSelectMode();
    procedure find(needle: String; options: Variant; animate: Boolean);
    function findAll(needle: String; options: Variant; keeps: Boolean): Integer;
    procedure findNext(options: Variant; animate: Boolean);
    procedure findPrevious(options: Variant; animate: Boolean);
    procedure focus();
    procedure forEachSelection(cmd, args: String);
    function getAnimatedScroll(): Boolean;
    function getBehavioursEnabled(): Boolean;
    function getCopyText(): String;
    function getCursorPosition(): Variant;
    function getCursorPositionScreen(): Integer;
    function getDisplayIndentGuides(): Variant;
    function getDragDelay(): Integer;
    function getFadeFoldWidgets(): Variant;
    function getFirstVisibleRow(): Integer;
    function getHighlightActiveLine(): Boolean;
    function getHighlightGutterLine(): Boolean;
    function getHighlightSelectedWord(): Boolean;
    function getKeyboardHandler(): String;
    function getLastSearchOptions(): Variant;
    function getLastVisibleRow(): Integer;
    function getNumberAt(row, column: Integer): integer;
    function getOverwrite(): boolean;
    function getPrintMarginColumn(): integer;
    function getReadOnly(): boolean;
    function getScrollSpeed(): Integer;
    function getSelection(): TAceSelection;
    function getSelectionRange(): TAceRange;
    function getSelectionStyle(): String;
    function getSession(): TAceEditSession;
    function getShowFoldWidgets(): Boolean;
    function getShowInvisibles(): Boolean;
    function getShowPrintMargin(): Boolean;
    function getTheme(): String;
    function getValue(): String;
    function getWrapBehavioursEnabled(): Boolean;
    procedure gotoLine(lineNumber, column: Integer; animate: Boolean);
    procedure gotoPageDown();
    procedure gotoPageUp();
    procedure indent();
    procedure insert(text: string);
    function isFocused(): Boolean;
    function isRowFullyVisible(): Boolean;
    function isRowVisible(): Boolean;
    procedure jumpToMatching(select: Variant);
    procedure modifyNumber(amount: Integer);
    procedure moveCursorTo(row, column: Integer);
    procedure moveCursorToPosition(pos: Variant);
    function moveLinesDown(): Integer;
    function moveLinesUp(): Integer;
    procedure moveText();
    procedure navigateDown(times: integer);
    procedure navigateFileEnd();
    procedure navigateFileStart();
    procedure navigateLeft();
    procedure navigateLineEnd();
    procedure navigateLineStart();
    procedure navigateRight();
    procedure navigateTo(row, column: integer);
    procedure navigateUp(times: integer);
    procedure navigateWordLeft();
    procedure navigateWordRight();
    procedure onBlur(CB: TAceStdCB);
    procedure onChangeAnnotation(CB: TAceStdCB);
    procedure onChangeBackMarker(CB: TAceStdCB);
    procedure onChangeBreakpoint(CB: TAceStdCB);
    procedure onChangeFold(CB: TAceStdCB);
    procedure onChangeFrontMarker(CB: TAceStdCB);
    procedure onChangeMode(CB: TAceStdCB);
    procedure onChangeWrapLimit(CB: TAceStdCB);
    procedure onChangeWrapMode(CB: TAceStdCB);
    procedure onCommandKey(CB: TAceStdCB);
    procedure onCompositionEnd(CB: TAceStdCB);
    procedure onCompositionStart(CB: TAceStdCB);
    procedure onCompositionUpdate(CB: TAceStdCB);
    procedure onCopy(CB: TAceStdCB);
    procedure onCursorChange(CB: TAceStdCB);
    procedure onCut(CB: TAceStdCB);
    procedure onDocumentChange(CB: TAceStdCB);
    procedure onFocus(CB: TAceStdCB);
    procedure onPaste(CB: TAceOnPasteCB);
    procedure onScrollLeftChange(CB: TAceStdCB);
    procedure onScrollTopChange(CB: TAceStdCB);
    procedure onSelectionChange(CB: TAceStdCB);
    procedure onTextInput(CB: TAceStdCB);
    procedure onTokenizerUpdate(CB: TAceStdCB);
    procedure redo();
    procedure remove(dir: String);
    procedure removeLines();
    procedure removeSelectionMarker(range: TAceRange);
    procedure removeToLineEnd();
    procedure removeToLineStart();
    procedure removeWordLeft();
    procedure removeWordRight();
    procedure replace(replacement: String; options: Variant);
    procedure replaceAll(replacement: String; options: Variant);
    procedure resizeEditor(force: Boolean);
    procedure revealRange();
    procedure scrollPageDown();
    procedure scrollPageUp();
    procedure scrollToLine(line: Integer; center, animate: Boolean; CB: TAceStdCB);
    procedure scrollToRow(row: Integer);
    procedure selectAll();
    procedure selectMore(dir: Integer; skip: Boolean);
    procedure selectMoreLines(dir: Integer; skip: Boolean);
    procedure selectPageDown();
    procedure selectPageUp();
    procedure setAnimatedScroll();
    procedure setBehavioursEnabled(enabled: Boolean);
    procedure setDisplayIndentGuides(identGuides: Variant);
    procedure setDragDelay(dragDelay: Integer);
    procedure setFadeFoldWidgets(fadeFoldWidget: Variant);
    procedure setFontSize(size: Integer);
    procedure setHighlightActiveLine(shouldHighlight: Boolean);
    procedure setHighlightGutterLine(gutterLine: Integer);
    procedure setHighlightSelectedWord(shoudHighlight: Boolean);
    procedure setKeyboardHandler(keyboardHandler: string); //Vim, windows, etc
    procedure setOverwrite(overwrite: Boolean);
    procedure setPrintMarginColumn(showPrintMargin: Boolean);
    procedure setReadOnly(readOnly: Boolean);
    procedure setScrollSpeed(speed: Boolean);
    procedure setSelectionStyle(style: String);
    procedure setSession(session: TAceEditSession);
    procedure setShowFoldWidgets(show: Boolean);
    procedure setShowInvisibles(showInvisibles: Boolean);
    procedure setShowPrintMargin(showPrintMargin: Boolean);
    procedure setStyle(style: String);
    procedure setTheme(theme: String);
    function setValue(val: String; curPos: Variant): String;
    procedure setWrapBehavioursEnabled(enabled: Boolean);
    procedure sortLines();
    procedure splitLine();
    procedure toggleCommentLines();
    procedure toggleOverwrite();
    procedure toLowerCase();
    procedure toUpperCase();
    procedure transposeLetters();
    procedure transposeSelections(dir: Integer);
    procedure undo();
    procedure unsetStyle(style: Variant);
    procedure updateSelectionMarkers();

    constructor Create(AOwner: TQTXComponent; CB: TQTXAceWidgetConstructorCB); override;
    destructor Destroy(); override;
  end;

  function NewAceEditor(elt: String): TAceEditor; overload; external "ace.edit";
  function NewAceEditor(elt: JElement): TAceEditor; overload; external "ace.edit";

implementation

constructor TAceOptionsRenderer.Create(opts: Variant = null);
begin
  inherited Create();

  fOpts := TVariant.CreateObject;
  if opts <> null then begin
    asm
     @fOpts = Object.assign(@fOpts, @opts);
    end;
  end;
end;

function TAceOptionsRenderer.getProp(prop: String): Variant;
begin
  Result := fOpts[prop];
end;

procedure TAceOptionsRenderer.setProp(prop: String; value: Variant);
begin
  fOpts[prop] := value;
end;

function TAceOptionsRenderer.RenderOptions(): Variant;
begin
  Result := fOpts;
end;

constructor TQTXAceWidget.Create(AOwner: TQTXComponent; CB: TQTXAceWidgetConstructorCB);
begin
  inherited Create(AOwner, procedure (widget: TQTXWidget)
  begin
    widget.Width := 600;
    widget.Height := 300;

    fDivEditor := TQTXWidget.Create(widget, procedure (divEditor: TQTXWidget)
    begin
      divEditor.PositionMode := TQTXWidgetPositionMode.cpAbsolute;
      divEditor.CssClasses.ClassListSet('');
      divEditor.Handle.style['left'] := 0;
      divEditor.Handle.style['right'] := 0;
      divEditor.Handle.style['top'] := 0;
      divEditor.Handle.style['bottom'] := 0;
      divEditor.WhenReady(procedure (divEditor: TQTXWidget)
      begin
        TQTXDispatch.Execute(procedure ()
        begin
          fAceEditor := NewAceEditor(divEditor.Attributes.AttributeRead('id')+"");

          if Assigned(CB) then CB(Self);
        end, 50);
      end);
    end);
  end);
end;

destructor TQTXAceWidget.Destroy();
begin
  Editor.destroy();
  inherited Destroy();
end;

//Aliases functions and procedures from TAceEditor
function TQTXAceWidget.addSelectionMarker(orientedRange:TAceRange):TAceRange;
begin
  Result := fAceEditor.addSelectionMarker(orientedRange);
end;
procedure TQTXAceWidget.alignCursors();
begin
  fAceEditor.alignCursors();
end;
procedure TQTXAceWidget.blockOutdent();
begin
  fAceEditor.blockOutdent();
end;
procedure TQTXAceWidget.blur();
begin
  fAceEditor.blur();
end;
procedure TQTXAceWidget.centerSelection();
begin
  fAceEditor.centerSelection();
end;
procedure TQTXAceWidget.clearSelection();
begin
  fAceEditor.clearSelection();
end;
procedure TQTXAceWidget.copyLinesDown();
begin
  fAceEditor.copyLinesDown();
end;
procedure TQTXAceWidget.copyLinesUp();
begin
  fAceEditor.copyLinesUp();
end;
procedure TQTXAceWidget.duplicateSelection();
begin
  fAceEditor.duplicateSelection();
end;
procedure TQTXAceWidget.execCommand(command:String);
begin
  fAceEditor.execCommand(command);
end;
procedure TQTXAceWidget.exitMultiSelectMode();
begin
  fAceEditor.exitMultiSelectMode();
end;
procedure TQTXAceWidget.find(needle:String;options:Variant;animate:Boolean);
begin
  fAceEditor.find(needle, options, animate);
end;
function TQTXAceWidget.findAll(needle:String;options:Variant;keeps:Boolean):Integer;
begin
  Result := fAceEditor.findAll(needle, options, keeps);
end;
procedure TQTXAceWidget.findNext(options:Variant;animate:Boolean);
begin
  fAceEditor.findNext(options, animate);
end;
procedure TQTXAceWidget.findPrevious(options:Variant;animate:Boolean);
begin
  fAceEditor.findPrevious(options, animate);
end;
procedure TQTXAceWidget.focus();
begin
  fAceEditor.focus();
end;
procedure TQTXAceWidget.forEachSelection(cmd, args:String);
begin
  fAceEditor.forEachSelection(cmd, args);
end;
function TQTXAceWidget.getAnimatedScroll():Boolean;
begin
  Result := fAceEditor.getAnimatedScroll();
end;
function TQTXAceWidget.getBehavioursEnabled():Boolean;
begin
  Result := fAceEditor.getBehavioursEnabled();
end;
function TQTXAceWidget.getCopyText():String;
begin
  Result := fAceEditor.getCopyText();
end;
function TQTXAceWidget.getCursorPosition():Variant;
begin
  Result := fAceEditor.getCursorPosition();
end;
function TQTXAceWidget.getCursorPositionScreen():Integer;
begin
  Result := fAceEditor.getCursorPositionScreen();
end;
function TQTXAceWidget.getDisplayIndentGuides():Variant;
begin
  Result := fAceEditor.getDisplayIndentGuides();
end;
function TQTXAceWidget.getDragDelay():Integer;
begin
  Result := fAceEditor.getDragDelay();
end;
function TQTXAceWidget.getFadeFoldWidgets():Variant;
begin
  Result := fAceEditor.getFadeFoldWidgets();
end;
function TQTXAceWidget.getFirstVisibleRow():Integer;
begin
  Result := fAceEditor.getFirstVisibleRow();
end;
function TQTXAceWidget.getHighlightActiveLine():Boolean;
begin
  Result := fAceEditor.getHighlightActiveLine();
end;
function TQTXAceWidget.getHighlightGutterLine():Boolean;
begin
  Result := fAceEditor.getHighlightGutterLine();
end;
function TQTXAceWidget.getHighlightSelectedWord():Boolean;
begin
  Result := fAceEditor.getHighlightSelectedWord();
end;
function TQTXAceWidget.getKeyboardHandler():String;
begin
  Result := fAceEditor.getKeyboardHandler();
end;
function TQTXAceWidget.getLastSearchOptions():Variant;
begin
  Result := fAceEditor.getLastSearchOptions();
end;
function TQTXAceWidget.getLastVisibleRow():Integer;
begin
  Result := fAceEditor.getLastVisibleRow();
end;
function TQTXAceWidget.getNumberAt(row, column:Integer):integer;
begin
  Result := fAceEditor.getNumberAt(row, column);
end;
function TQTXAceWidget.getOverwrite():boolean;
begin
  Result := fAceEditor.getOverwrite();
end;
function TQTXAceWidget.getPrintMarginColumn():integer;
begin
  Result := fAceEditor.getPrintMarginColumn();
end;
function TQTXAceWidget.getReadOnly():boolean;
begin
  Result := fAceEditor.getReadOnly();
end;
function TQTXAceWidget.getScrollSpeed():Integer;
begin
  Result := fAceEditor.getScrollSpeed();
end;
function TQTXAceWidget.getSelection():TAceSelection;
begin
  Result := fAceEditor.getSelection();
end;
function TQTXAceWidget.getSelectionRange():TAceRange;
begin
  Result := fAceEditor.getSelectionRange();
end;
function TQTXAceWidget.getSelectionStyle():String;
begin
  Result := fAceEditor.getSelectionStyle();
end;
function TQTXAceWidget.getSession():TAceEditSession;
begin
  Result := fAceEditor.getSession();
end;
function TQTXAceWidget.getShowFoldWidgets():Boolean;
begin
  Result := fAceEditor.getShowFoldWidgets();
end;
function TQTXAceWidget.getShowInvisibles():Boolean;
begin
  Result := fAceEditor.getShowInvisibles();
end;
function TQTXAceWidget.getShowPrintMargin():Boolean;
begin
  Result := fAceEditor.getShowPrintMargin();
end;
function TQTXAceWidget.getTheme():String;
begin
  Result := fAceEditor.getTheme();
end;
function TQTXAceWidget.getValue():String;
begin
  Result := fAceEditor.getValue();
end;
function TQTXAceWidget.getWrapBehavioursEnabled():Boolean;
begin
  Result := fAceEditor.getWrapBehavioursEnabled();
end;
procedure TQTXAceWidget.gotoLine(lineNumber, column:Integer;animate:Boolean);
begin
  fAceEditor.gotoLine(lineNumber, column, animate);
end;
procedure TQTXAceWidget.gotoPageDown();
begin
  fAceEditor.gotoPageDown();
end;
procedure TQTXAceWidget.gotoPageUp();
begin
  fAceEditor.gotoPageUp();
end;
procedure TQTXAceWidget.indent();
begin
  fAceEditor.indent();
end;
procedure TQTXAceWidget.insert(text:string);
begin
  fAceEditor.insert(text);
end;
function TQTXAceWidget.isFocused():Boolean;
begin
  Result := fAceEditor.isFocused();
end;
function TQTXAceWidget.isRowFullyVisible():Boolean;
begin
  Result := fAceEditor.isRowFullyVisible();
end;
function TQTXAceWidget.isRowVisible():Boolean;
begin
  Result := fAceEditor.isRowVisible();
end;
procedure TQTXAceWidget.jumpToMatching(select:Variant);
begin
  fAceEditor.jumpToMatching(select);
end;
procedure TQTXAceWidget.modifyNumber(amount:Integer);
begin
  fAceEditor.modifyNumber(amount);
end;
procedure TQTXAceWidget.moveCursorTo(row, column:Integer);
begin
  fAceEditor.moveCursorTo(row, column);
end;
procedure TQTXAceWidget.moveCursorToPosition(pos:Variant);
begin
  fAceEditor.moveCursorToPosition(pos);
end;
function TQTXAceWidget.moveLinesDown():Integer;
begin
  Result := fAceEditor.moveLinesDown();
end;
function TQTXAceWidget.moveLinesUp():Integer;
begin
  Result := fAceEditor.moveLinesUp();
end;
procedure TQTXAceWidget.moveText();
begin
  fAceEditor.moveText();
end;
procedure TQTXAceWidget.navigateDown(times:integer);
begin
  fAceEditor.navigateDown(times);
end;
procedure TQTXAceWidget.navigateFileEnd();
begin
  fAceEditor.navigateFileEnd();
end;
procedure TQTXAceWidget.navigateFileStart();
begin
  fAceEditor.navigateFileStart();
end;
procedure TQTXAceWidget.navigateLeft();
begin
  fAceEditor.navigateLeft();
end;
procedure TQTXAceWidget.navigateLineEnd();
begin
  fAceEditor.navigateLineEnd();
end;
procedure TQTXAceWidget.navigateLineStart();
begin
  fAceEditor.navigateLineStart();
end;
procedure TQTXAceWidget.navigateRight();
begin
  fAceEditor.navigateRight();
end;
procedure TQTXAceWidget.navigateTo(row, column:integer);
begin
  fAceEditor.navigateTo(row, column);
end;
procedure TQTXAceWidget.navigateUp(times:integer);
begin
  fAceEditor.navigateUp(times);
end;
procedure TQTXAceWidget.navigateWordLeft();
begin
  fAceEditor.navigateWordLeft();
end;
procedure TQTXAceWidget.navigateWordRight();
begin
  fAceEditor.navigateWordRight();
end;
procedure TQTXAceWidget.onBlur(CB:TAceStdCB);
begin
  fAceEditor.onBlur(CB);
end;
procedure TQTXAceWidget.onChangeAnnotation(CB:TAceStdCB);
begin
  fAceEditor.onChangeAnnotation(CB);
end;
procedure TQTXAceWidget.onChangeBackMarker(CB:TAceStdCB);
begin
  fAceEditor.onChangeBackMarker(CB);
end;
procedure TQTXAceWidget.onChangeBreakpoint(CB:TAceStdCB);
begin
  fAceEditor.onChangeBreakpoint(CB);
end;
procedure TQTXAceWidget.onChangeFold(CB:TAceStdCB);
begin
  fAceEditor.onChangeFold(CB);
end;
procedure TQTXAceWidget.onChangeFrontMarker(CB:TAceStdCB);
begin
  fAceEditor.onChangeFrontMarker(CB);
end;
procedure TQTXAceWidget.onChangeMode(CB:TAceStdCB);
begin
  fAceEditor.onChangeMode(CB);
end;
procedure TQTXAceWidget.onChangeWrapLimit(CB:TAceStdCB);
begin
  fAceEditor.onChangeWrapLimit(CB);
end;
procedure TQTXAceWidget.onChangeWrapMode(CB:TAceStdCB);
begin
  fAceEditor.onChangeWrapMode(CB);
end;
procedure TQTXAceWidget.onCommandKey(CB:TAceStdCB);
begin
  fAceEditor.onCommandKey(CB);
end;
procedure TQTXAceWidget.onCompositionEnd(CB:TAceStdCB);
begin
  fAceEditor.onCompositionEnd(CB);
end;
procedure TQTXAceWidget.onCompositionStart(CB:TAceStdCB);
begin
  fAceEditor.onCompositionStart(CB);
end;
procedure TQTXAceWidget.onCompositionUpdate(CB:TAceStdCB);
begin
  fAceEditor.onCompositionUpdate(CB);
end;
procedure TQTXAceWidget.onCopy(CB:TAceStdCB);
begin
  fAceEditor.onCopy(CB);
end;
procedure TQTXAceWidget.onCursorChange(CB:TAceStdCB);
begin
  fAceEditor.onCursorChange(CB);
end;
procedure TQTXAceWidget.onCut(CB:TAceStdCB);
begin
  fAceEditor.onCut(CB);
end;
procedure TQTXAceWidget.onDocumentChange(CB:TAceStdCB);
begin
  fAceEditor.onDocumentChange(CB);
end;
procedure TQTXAceWidget.onFocus(CB:TAceStdCB);
begin
  fAceEditor.onFocus(CB);
end;
procedure TQTXAceWidget.onPaste(CB:TAceOnPasteCB);
begin
  fAceEditor.onPaste(CB);
end;
procedure TQTXAceWidget.onScrollLeftChange(CB:TAceStdCB);
begin
  fAceEditor.onScrollLeftChange(CB);
end;
procedure TQTXAceWidget.onScrollTopChange(CB:TAceStdCB);
begin
  fAceEditor.onScrollTopChange(CB);
end;
procedure TQTXAceWidget.onSelectionChange(CB:TAceStdCB);
begin
  fAceEditor.onSelectionChange(CB);
end;
procedure TQTXAceWidget.onTextInput(CB:TAceStdCB);
begin
  fAceEditor.onTextInput(CB);
end;
procedure TQTXAceWidget.onTokenizerUpdate(CB:TAceStdCB);
begin
  fAceEditor.onTokenizerUpdate(CB);
end;
procedure TQTXAceWidget.redo();
begin
  fAceEditor.redo();
end;
procedure TQTXAceWidget.remove(dir:String);
begin
  fAceEditor.remove(dir);
end;
procedure TQTXAceWidget.removeLines();
begin
  fAceEditor.removeLines();
end;
procedure TQTXAceWidget.removeSelectionMarker(range:TAceRange);
begin
  fAceEditor.removeSelectionMarker(range);
end;
procedure TQTXAceWidget.removeToLineEnd();
begin
  fAceEditor.removeToLineEnd();
end;
procedure TQTXAceWidget.removeToLineStart();
begin
  fAceEditor.removeToLineStart();
end;
procedure TQTXAceWidget.removeWordLeft();
begin
  fAceEditor.removeWordLeft();
end;
procedure TQTXAceWidget.removeWordRight();
begin
  fAceEditor.removeWordRight();
end;
procedure TQTXAceWidget.replace(replacement:String;options:Variant);
begin
  fAceEditor.replace(replacement, options);
end;
procedure TQTXAceWidget.replaceAll(replacement:String;options:Variant);
begin
  fAceEditor.replaceAll(replacement, options);
end;
procedure TQTXAceWidget.resizeEditor(force:Boolean);
begin
  fAceEditor.resize(force);
end;
procedure TQTXAceWidget.revealRange();
begin
  fAceEditor.revealRange();
end;
procedure TQTXAceWidget.scrollPageDown();
begin
  fAceEditor.scrollPageDown();
end;
procedure TQTXAceWidget.scrollPageUp();
begin
  fAceEditor.scrollPageUp();
end;
procedure TQTXAceWidget.scrollToLine(line:Integer;center, animate:Boolean;CB:TAceStdCB);
begin
  fAceEditor.scrollToLine(line, center, animate, CB);
end;
procedure TQTXAceWidget.scrollToRow(row:Integer);
begin
  fAceEditor.scrollToRow(row);
end;
procedure TQTXAceWidget.selectAll();
begin
  fAceEditor.selectAll();
end;
procedure TQTXAceWidget.selectMore(dir:Integer;skip:Boolean);
begin
  fAceEditor.selectMore(dir, skip);
end;
procedure TQTXAceWidget.selectMoreLines(dir:Integer;skip:Boolean);
begin
  fAceEditor.selectMoreLines(dir, skip);
end;
procedure TQTXAceWidget.selectPageDown();
begin
  fAceEditor.selectPageDown();
end;
procedure TQTXAceWidget.selectPageUp();
begin
  fAceEditor.selectPageUp();
end;
procedure TQTXAceWidget.setAnimatedScroll();
begin
  fAceEditor.setAnimatedScroll();
end;
procedure TQTXAceWidget.setBehavioursEnabled(enabled:Boolean);
begin
  fAceEditor.setBehavioursEnabled(enabled);
end;
procedure TQTXAceWidget.setDisplayIndentGuides(identGuides:Variant);
begin
  fAceEditor.setDisplayIndentGuides(identGuides);
end;
procedure TQTXAceWidget.setDragDelay(dragDelay:Integer);
begin
  fAceEditor.setDragDelay(dragDelay);
end;
procedure TQTXAceWidget.setFadeFoldWidgets(fadeFoldWidget:Variant);
begin
  fAceEditor.setFadeFoldWidgets(fadeFoldWidget);
end;
procedure TQTXAceWidget.setFontSize(size:Integer);
begin
  fAceEditor.setFontSize(size);
end;
procedure TQTXAceWidget.setHighlightActiveLine(shouldHighlight:Boolean);
begin
  fAceEditor.setHighlightActiveLine(shouldHighlight);
end;
procedure TQTXAceWidget.setHighlightGutterLine(gutterLine:Integer);
begin
  fAceEditor.setHighlightGutterLine(gutterLine);
end;
procedure TQTXAceWidget.setHighlightSelectedWord(shoudHighlight:Boolean);
begin
  fAceEditor.setHighlightSelectedWord(shoudHighlight);
end;
procedure TQTXAceWidget.setKeyboardHandler(keyboardHandler:string);//Vim, windows, etc
begin
  fAceEditor.setKeyboardHandler(keyboardHandler);
end;
procedure TQTXAceWidget.setOverwrite(overwrite:Boolean);
begin
  fAceEditor.setOverwrite(overwrite);
end;
procedure TQTXAceWidget.setPrintMarginColumn(showPrintMargin:Boolean);
begin
  fAceEditor.setPrintMarginColumn(showPrintMargin);
end;
procedure TQTXAceWidget.setReadOnly(readOnly:Boolean);
begin
  fAceEditor.setReadOnly(readOnly);
end;
procedure TQTXAceWidget.setScrollSpeed(speed:Boolean);
begin
  fAceEditor.setScrollSpeed(speed);
end;
procedure TQTXAceWidget.setSelectionStyle(style:String);
begin
  fAceEditor.setSelectionStyle(style);
end;
procedure TQTXAceWidget.setSession(session:TAceEditSession);
begin
  fAceEditor.setSession(session);
end;
procedure TQTXAceWidget.setShowFoldWidgets(show:Boolean);
begin
  fAceEditor.setShowFoldWidgets(show);
end;
procedure TQTXAceWidget.setShowInvisibles(showInvisibles:Boolean);
begin
  fAceEditor.setShowInvisibles(showInvisibles);
end;
procedure TQTXAceWidget.setShowPrintMargin(showPrintMargin:Boolean);
begin
  fAceEditor.setShowPrintMargin(showPrintMargin);
end;
procedure TQTXAceWidget.setStyle(style:String);
begin
  fAceEditor.setStyle(style);
end;
procedure TQTXAceWidget.setTheme(theme:String);
begin
  fAceEditor.setTheme(theme);
end;
function TQTXAceWidget.setValue(val:String;curPos:Variant):String;
begin
  Result := fAceEditor.setValue(val, curPos);
end;
procedure TQTXAceWidget.setWrapBehavioursEnabled(enabled:Boolean);
begin
  fAceEditor.setWrapBehavioursEnabled(enabled);
end;
procedure TQTXAceWidget.sortLines();
begin
  fAceEditor.sortLines();
end;
procedure TQTXAceWidget.splitLine();
begin
  fAceEditor.splitLine();
end;
procedure TQTXAceWidget.toggleCommentLines();
begin
  fAceEditor.toggleCommentLines();
end;
procedure TQTXAceWidget.toggleOverwrite();
begin
  fAceEditor.toggleOverwrite();
end;
procedure TQTXAceWidget.toLowerCase();
begin
  fAceEditor.toLowerCase();
end;
procedure TQTXAceWidget.toUpperCase();
begin
  fAceEditor.toUpperCase();
end;
procedure TQTXAceWidget.transposeLetters();
begin
  fAceEditor.transposeLetters();
end;
procedure TQTXAceWidget.transposeSelections(dir:Integer);
begin
  fAceEditor.transposeSelections(dir);
end;
procedure TQTXAceWidget.undo();
begin
  fAceEditor.undo();
end;
procedure TQTXAceWidget.unsetStyle(style:Variant);
begin
  fAceEditor.unsetStyle(style);
end;
procedure TQTXAceWidget.updateSelectionMarkers();
begin
  fAceEditor.updateSelectionMarkers();
end;


initialization
  asm
    var AceVisualRenderer = ace.require('ace/virtual_renderer').VisualRenderer;
    var AceEditor = ace.require('ace/editor').Editor;
    var AceRange = ace.require('ace/range').Range;
    var AceSelection = ace.require('ace/selection').Selection;
    var AceUndoManager = ace.require('ace/undomanager').UndoManager;
    var AceDocument = ace.require('ace/document').Document;
    var AceAnchor = ace.require('ace/anchor').Anchor;
  end;
end.
