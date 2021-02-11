uses
  qtx.sysutils,
  qtx.classes,
  qtx.time,

  qtx.dom.widgets,
  qtx.dom.types,
  qtx.dom.events,
  qtx.dom.graphics,
  qtx.dom.application, 
  qtx.dom.forms,
  
  qtx.dom.control.common,
  qtx.dom.control.contentbox,
  qtx.dom.control.label,
  qtx.dom.stylesheet,
                                   
  form1;   
                       
begin
  TQTXDOMApplicationFull.Create(nil, procedure (Widget: TQTXComponent)
  begin
    Widget.Handle.style["font-family"] := "Segoe UI"; 
    
    // This section can be removed
    var lHead := TQTXLabel.Create(Widget,
    procedure (Label: TQTXLabel)
    begin
      Label.PositionMode := TQTXWidgetPositionMode.cpInitial;
      Label.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      Label.AlignH := TQTXContentBoxHAlign.chLeft;
      Label.InnerHtml := '<b>Quartex Pascal Project</b>';
    end); 

    // create our form (see forms folder)
    var FForm := TMyForm.Create(Widget, nil);
  end);
  
end.
