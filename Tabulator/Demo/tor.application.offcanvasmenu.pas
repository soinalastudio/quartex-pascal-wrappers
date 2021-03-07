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
unit tor.application.offcanvasmenu;

interface

uses
  qtx.sysutils,
  qtx.classes,
  qtx.dom.types,
  qtx.dom.widgets,
  qtx.dom.application,
  qtx.dom.control.label,
  qtx.dom.stylesheet,
  qtx.dom.control.common,
  qtx.dom.forms;

type
  TQTXDOMUnorderedList = class(TQTXWidget)
  protected
    function CreateElementInstance: TWidgetHandle; override;
  end;

  TQTXDomListItem = class(TQTXWidget)
  protected
    function CreateElementInstance: TWidgetHandle; override;
  end;

  TQTXDomAnchor = class(TQTXWidget)
  protected
    function CreateElementInstance: TWidgetHandle; override;
  end;

  TQTXOffCanvasMenuItem = class;
  TQTXOffCanvasMenuItemConstructor = procedure (widget: TQTXOffCanvasMenuItem);

  TQTXOffCanvasMenuItem = class (TQTXDomListItem)
  private
    FAnchorElt: TQTXDomAnchor;

    FActive: Boolean;
    FDefault: Boolean;
    FIcon: String;
    FCaption: String;
    FIconClass: String;
    FUrl: String;
    FUrlTarget: String;
    FOnClick: TNotifyEvent;
    FAttachedForm: TQTXForm;
    procedure setAttachedForm(value: TQTXForm);
    procedure setIcon(value: String);
    procedure setIconClass(value: String);
    procedure setCaption(value: String);
    procedure setActive(value: Boolean);
    procedure setDefault(value: Boolean);
    procedure updateAnchorText();
  public
    property AttachedForm: TQTXForm read FAttachedForm write setAttachedForm;
    property Icon: String read FIcon write setIcon;
    property Caption: String read FCaption write setCaption;
    property IconClass: String read FIconClass write setIconClass;
    property Url: String read FUrl write FUrl;
    property UrlTarget: String read FUrlTarget write FUrlTarget;
    property onClick: TNotifyEvent read FOnClick write FOnClick;
    property Active: Boolean read FActive write setActive;
    property Default: Boolean read FDefault write setDefault;

    property AnchorElement: TQTXDomAnchor read FAnchorElt;

    constructor Create(AOwner: TQTXComponent; CB: TQTXOffCanvasMenuItemConstructor); override;
  end;


  TQTXOffCanvasMenuApplication = class (TQTXDOMApplication)
  private
    FSideNav: TQTXWidget;
    FMain: TQTXWidget;
    FContent: TQTXWidget;
    FTopBar: TQTXWidget;
    FTitle: TQTXDomSpan;
    FBurger: TQTXWidget;
    FCloseNav: TQTXLabel;
    FSideHeader: TQTXWidget;
    FMenuContainer: TQTXDOMUnorderedList;
    FMenuItems: Array of TQTXOffCanvasMenuItem;
    FPagesHolder: TQTXWidget;

    FAppTitle: String;
    procedure setAppTitle(value: String);
  public
    property SideNav: TQTXWidget read FSideHeader;
    property MainWidget: TQTXWidget read FMain;
    property ContentWidget: TQTXWidget read FContent;
    property TopBar: TQTXWidget read FTopBar;
    property TitleWidget: TQTXDOMSpan read FTitle;
    property LeftBurger: TQTXWidget read FBurger;
    property CloseNavButton: TQTXLabel read FCloseNav;
    property SideHeader: TQTXWidget read FSideHeader;
    property MenuContainer: TQTXDOMUnorderedList read FMenuContainer;
    property MenuItems: Array of TQTXOffCanvasMenuItem read FMenuItems;
    property PagesHolder: TQTXWidget read FPagesHolder;

    property Title: String read (FAppTitle) write setAppTitle;

    function GetHandle: THandle; override;
    procedure openNav();
    procedure closeNav();

    procedure AddSideMenu(caption, icon, iconClass: String; attachedForm: TQTXForm; isDefault: Boolean = false; clickCB: TNotifyEvent = nil; Url: String = ''; UrlTarget: String = '_blank');overload;
    procedure AddSideMenu(menuItem: TQTXOffCanvasMenuItem); overload;

    constructor Create(AOwner: TQTXComponent; CB: TQTXComponentConstructor); override;
  end;

  function OffCanvasMenuApplication(): TQTXOffCanvasMenuApplication;
implementation

function OffCanvasMenuApplication(): TQTXOffCanvasMenuApplication;
begin
  Result := (Application() as TQTXOffCanvasMenuApplication);
end;

function TQTXDOMUnorderedList.CreateElementInstance: TWidgetHandle;
begin
  asm
    @result = document.createElement("ul");
  end;
end;

function TQTXDomListItem.CreateElementInstance: TWidgetHandle;
begin
  asm
    @result = document.createElement("li");
  end;
end;

function TQTXDomAnchor.CreateElementInstance: TWidgetHandle;
begin
  asm
    @result = document.createElement("a");
  end;
end;

constructor TQTXOffCanvasMenuItem.Create(AOwner: TQTXComponent; CB: TQTXOffCanvasMenuItemConstructor);
begin
  inherited Create(AOwner, procedure (widget: TQTXWidget)
  begin
    Default := false;

    FAnchorElt := TQTXDomAnchor.Create(widget, procedure (FAnchorElt: TQTXWidget)
    begin
      FAnchorElt.InnerHtml := '<i class="icon"></i>';

      FAnchorElt.Handle.addEventListener('click', procedure (event: JMouseEvent)
      begin
        if Assigned(FAttachedForm) then begin
          OffCanvasMenuApplication().ContentWidget.InnerHtml := '';
          OffCanvasMenuApplication().ContentWidget.Handle.appendChild(FAttachedForm.Handle);
          for var menuItem in OffCanvasMenuApplication().MenuItems do begin
            if menuItem.Handle.id = Self.Handle.id then menuItem.Active := true else menuItem.Active := false;
          end;
        end else if Url<>'' then begin
          asm
            window.open(@FUrl, @FUrlTarget);
          end;
        end;
        OffCanvasMenuApplication().closeNav();

        if Assigned(onClick) then onClick(Self);
      end);

      TQTXDispatch.Execute(procedure()
      begin
        if Assigned(CB) then CB(Self);
      end, 10);
    end);


  end);
end;

procedure TQTXOffCanvasMenuItem.setAttachedForm(value: TQTXForm);
begin
  FAttachedForm := value;
end;

procedure TQTXOffCanvasMenuItem.setIconClass(value: String);
begin
  FIconClass := value;
  updateAnchorText();
end;

procedure TQTXOffCanvasMenuItem.setIcon(value: String);
begin
  FIcon := value;
  updateAnchorText();
end;

procedure TQTXOffCanvasMenuItem.setCaption(value: String);
begin
  FCaption := value;
  updateAnchorText();
end;

procedure TQTXOffCanvasMenuItem.setDefault(value: Boolean);
begin
  FDefault := value;
end;

procedure TQTXOffCanvasMenuItem.updateAnchorText();
begin
  FAnchorElt.InnerHtml := '<i class="icon ' + FIconClass + ' ' + FIcon+'"></i>  ' + FCaption;
end;

procedure TQTXOffCanvasMenuItem.setActive(value: Boolean);
begin
  FActive := value;
  if FActive then
    CssClasses.ClassAdd('active')
  else
    CssClasses.ClassRemove('active');
end;

constructor TQTXOffCanvasMenuApplication.Create(AOwner: TQTXComponent; CB: TQTXComponentConstructor);
begin
  inherited(AOwner, procedure (parentWidget: TQTXComponent)
  begin
    FPagesHolder := TQTXWidget.Create(parentWidget, procedure (FPagesHolder: TQTXWidget)
    begin
      FPagesHolder.Width := 0;
      FPagesHolder.Height := 0;

      FSideNav := TQTXWidget.Create(parentWidget, procedure (FSideNav: TQTXWidget)
      begin
        FSideNav.Style.height := '100%';
        FSideNav.Style.backgroundImage := 'url(img/cloth.png)';
        FSideNav.Style.marginLeft := '-300px';
        FSideNav.PositionMode := TQTXWidgetPositionMode.cpFixed;
        FSideNav.Style.zIndex := 1;
        FSideNav.Top := 0;
        FSideNav.Left := 0;
        FSideNav.Style.backgroundColor := '#111';
        FSideNav.Style.overflowX := 'hidden';
        FSideNav.Style.paddingTop := '60px';
        FSideNav.Style.transition := '0.5s';
        FSideNav.Style.width := '300px';

        FCloseNav := TQTXLabel.Create(FSideNav, procedure (FCloseNav: TQTXLabel)
        begin
          FCloseNav.PositionMode := TQTXWidgetPositionMode.cpAbsolute;
          FCloseNav.Style.float := 'left';
          FCloseNav.Top := 0;
          FCLoseNav.Left := 0;
          FCloseNav.Style.zIndex := 90;
          FCloseNav.Style.width := '1.6em';
          FCloseNav.Style.height := '1.6em';
          FCloseNav.Style.fontSize := '1.5em';
          FCloseNav.Style.lineHeight := '1.6em';
          FCloseNav.Style.color := 'gainsboro';
          FCloseNav.Style.textAlign := 'center';
          FCloseNav.Style.backgroundColor := '#272727';
          FCloseNav.Style.fontFamily := 'Entypo';
          FCLoseNav.InnerHtml := '&times;';
          FCloseNav.Style.cursor := 'pointer';
          FCLoseNav.Handle.addEventListener('click', procedure (event: JMouseEvent)
            begin
              closeNav();
            end);
        end);

        FSideHeader := TQTXWidget.Create(FSideNav, procedure (FSideHeader: TQTXWidget)
        begin
          FSideHeader.Style.width := '100%';
          FSideHeader.Style.float := 'left';
          FSideHeader.Style.background := 'rgba(0, 0, 0, 0.15)';
          FSideHeader.Style.boxShadow := 'inset 0 -0.2 0.5em rgba(0, 0, 0, 0.6)';
          FSideHeader.Style.borderBottom := '1px solid #2d2d2d';
          FSideHeader.Style.textAlign := 'center';
          FSideHeader.Style.position := 'absolute';
          FSideHeader.Style.left := 0;
          FSideHeader.Style.top := 0;
          FSideHeader.Style.overflow := 'hidden';
          FSideHeader.Style.padding := '2em';
          FSideHeader.Style.color := '#e05000';
          FSideHeader.InnerHtml := 'Quartex Pascal';
        end);

        FMenuContainer := TQTXDOMUnorderedList.Create(FSideNav, procedure (FMenuContainer: TQTXWidget)
        begin
          FMenuContainer.Style.overflow := 'auto';
          FMenuContainer.Style.width := '100%';
          FMenuContainer.Style.listStyle := 'none';
          FMenuContainer.Style.padding := '1.2em';
          FMenuContainer.CssClasses.ClassAdd('menucontainer');
          FMenuContainer.InnerHtml := #'';
        end);
      end);

      FMain := TQTXWidget.Create(parentWidget, procedure (FMain: TQTXWidget)
      begin
        FMain.Style.width := '100%';
        FMain.Style.height := '100%';
        FMain.Style.overflow := 'hidden';
        FMain.Style.transition := 'margin-left .5s';

        FTopBar := TQTXWidget.Create(FMain, procedure (FTopBar: TQTXWidget)
        begin
          FTopBar.PositionMode := TQTXWidgetPositionMode.cpSticky;
          FTopBar.Style.height := '4em';
          FTopBar.Style.zIndex := 1000;
          FTopBar.Style.color := '#ffc8a9';
          FTopBar.Style.fontWeight := '300';
          FTopBar.Style.lineHeight := '1.9em';
          FTopBar.Style.paddingTop := '1em';
          FTopBar.Style.textShadow := '0 -0.04em 0.04em rgb(0 0 0 / 25%), 0 0 3em #ffa370';
          FTopBar.Style.width := '100%';
          FTopBar.Style.textAlign := 'center';
          FTopBar.Style.overflow := 'hidden';
          FTopBar.Style.background := 'linear-gradient(#e05000, #be4400)';
          FTopBar.Style.boxShadow := 'inset 0 0.0625em 0.0625em rgb(255 255 255 / 25%), 0 0.0625em 0.125em rgb(0 0 0 / 25%)';

          FTitle := TQTXDOMSpan.Create(FTopBar, procedure (FTitle: TQTXWidget)
          begin
            FTitle.PositionMode := TQTXWidgetPositionMode.cpRelative;
            FTitle.DisplayMode := TQTXWidgetDisplayMode.cdInitial;
            FTitle.Style.fontSize := '1.8em';
            FTitle.Style.fontWeight := '300';
            FTitle.Style.lineHeight := '1.1em';
            FTitle.Style.verticalAlign := 'middle';
            FTitle.Style.margin := '0.5em 0';
            FTitle.style.fontFamily := "'Pacifico', sans-serif";
            FTitle.Style.textShadow := '0 -0.04em 0.04em rgb(0 0 0 / 25%), 0 0 3em #ffa370';
            FTitle.InnerHtml := 'Title Here';
          end);

          FBurger := TQTXWidget.Create(FTopBar, procedure (FBurger: TQTXWidget)
          begin
            FBurger.InnerHtml := '&#9776;';
            FBurger.PositionMode := TQTXWidgetPositionMode.cpAbsolute;
            FBurger.Top := 0;
            FBurger.Left := 0;
            FBurger.Style.width := '0.84em';
            FBurger.Style.height := '100%';
            FBurger.Style.lineHeight := '0.84em';
            FBurger.Style.fontSize := '5em';
            FBurger.Handle.style['vertical-align'] := 'middle';
            FBurger.Style.textAlign := 'center';
            FBurger.Style.fontFamily := 'Entypo';
            FBurger.Style.textShadow := '0 0.02em 0.02em rgb(0 0 0 / 25%)';
            FBurger.Style.color := '#fff6f1';
            FBurger.Style.backgroundColor :='#ffffff00';
            FBurger.Style.cursor := 'pointer';
            FBurger.Handle.addEventListener('click', procedure (event: JMouseEvent)
            begin
              if FBurger.TagData = 'pressed' then
                closeNav()
              else
                openNav();
            end);

          end);
        end);

        FContent := TQTXWidget.Create(FMain, procedure (FContent: TQTXWidget)
        begin
          FContent.CssClasses.ClassAdd('content');
          FContent.Style.padding := '5px';
          FContent.Style.overflow := 'auto';
          FContent.Style.width := '100%';
          FContent.PositionMode := TQTXWidgetPositionMode.cpRelative;
          FContent.Handle.style.bottom := '0px';

          TQTXDispatch.Execute(procedure()
          begin
            if Assigned(CB) then CB(FContent);
          end, 10);
        end);
      end);
    end);
  end);
end;

procedure TQTXOffCanvasMenuApplication.AddSideMenu(caption, icon, iconClass: String; attachedForm: TQTXForm; isdefault: Boolean = false; clickCB: TNotifyEvent = nil; Url: String = ''; UrlTarget: String = '_blank');
begin
  TQTXWidget.Create(FMenuContainer, procedure (ltemp: TQTXWidget)
  begin
    ltemp.Visible := True;
    TQTXOffCanvasMenuItem.Create(ltemp, procedure (menuItem: TQTXOffCanvasMenuItem)
    begin
      menuItem.Icon := icon;
      menuItem.IconClass := iconClass;
      menuItem.Caption := caption;
      menuItem.AttachedForm := attachedForm;
      menuItem.Url := url;
      menuItem.UrlTarget := UrlTarget;
      menuItem.onClick := clickCB;
      menuItem.Default := isDefault;

      AddSideMenu(menuItem);
    end);
  end);
end;

procedure TQTXOffCanvasMenuApplication.AddSideMenu(menuItem: TQTXOffCanvasMenuItem);
begin
  MenuItems.Add(menuItem);
  MenuContainer.Handle.appendChild(menuItem.Handle);

  if menuItem.Default and Assigned(menuItem.AttachedForm) then begin
    TQTXDispatch.Execute(procedure ()
    begin
      menuItem.AnchorElement.Handle.click();
    end, 10);
  end;
end;

procedure TQTXOffCanvasMenuApplication.setAppTitle(value: String);
begin
  FAppTitle := value;

  if Assigned(FTitle) then
    FTitle.InnerHtml := FAppTitle;

  asm
    document.title = @FAppTitle;
  end;
end;

procedure TQTXOffCanvasMenuApplication.openNav();
begin
  //FSideNav.Style.width := '300px';
  FSideNav.Style.marginLeft := '0';
  FMain.Style.marginLeft := '300px';

  FBurger.TagData := 'pressed';
  FBurger.Style.borderRight := '1px solid #d94e00';
  FBurger.Style.boxShadow := 'inset -0.02em 0.02em 0.0625em rgb(0 0 0 / 15%)';
  FBurger.Style.background := '#b34000';
  /*asm
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  end;  */
end;

procedure TQTXOffCanvasMenuApplication.closeNav();
begin
  FSideNav.Style.marginLeft := '-300px';
  //FSideNav.Style.width := '0';
  FMain.Style.marginLeft := '0';

  FBurger.TagData := '';
  FBurger.Style.borderRight := 'none';
  FBurger.Style.boxShadow := 'none';
  FBurger.Style.backgroundColor :='#ffffff00';
end;

function TQTXOffCanvasMenuApplication.GetHandle(): TWidgetHandle;
begin
  asm
    @Result = document.body;
  end;
end;

initialization
  var lSheet := TQTXCSSRules.Global;
  lSheet.AddStyles(
    #'
/* add here css styles */

.content { height: calc(100% - 4em); }

@font-face {
  font-family: Entypo;
  src: url("../fonts/entypo.eot");
  src: url("../fonts/entypo.woff") format("woff"), url("../fonts/entypo.eot?#iefix") format("embedded-opentype"), url("../fonts/entypo.ttf") format("truetype"), url("../fonts/entypo.svg#Entypo") format("svg");
  font-weight: normal;
  font-style: normal; }

@font-face {
  font-family: Social;
  src: url("../fonts/entypo-social.eot");
  src: url("../fonts/entypo-social.woff") format("woff"), url("../fonts/entypo-social.eot?#iefix") format("embedded-opentype"), url("../fonts/entypo-social.ttf") format("truetype"), url("../fonts/entypo-social.svg#Entypo") format("svg");
  font-weight: normal;
  font-style: normal; }

@font-face {
  font-family: Pacifico;
  src: url("../fonts/Pacifico-webfont.eot");
  src: url("../fonts/Pacifico-webfont.woff") format("woff"), url("../fonts/Pacifico-webfont.eot?#iefix") format("embedded-opentype"), url("../fonts/Pacifico-webfont.ttf") format("truetype"), url("../fonts/Pacifico-webfont.svg#Entypo") format("svg");
  font-weight: normal;
  font-style: normal; }

.menucontainer a{
  width: 100%;
  padding: 0.6em;
  text-decoration: none;
  color: gainsboro;
  font-weight: 300;
  text-shadow: 0 0.0625em 0.0625em rgb(0 0 0 / 40%);
}

.menucontainer a:hover{
  color: #fff;
  background: #323232;
}

.menucontainer li{
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
}

.menucontainer li.active{
  color: #fff;
  background: #323232;
}

.menucontainer li .icon {
  float: left;
  margin: 0;
  position: inline-block;
  font-style: normal;
  padding-top: 0.2em;
  padding-right: 0.8em;
  width: 0.8em;
}

    '
  );

end.
