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

  tor.application.offcanvasmenu,
  tor.tabulator.wrapper,

  form1, home, form2, form3, form4, form5;

begin
  TQTXOffCanvasMenuApplication.Create(nil, procedure (Widget: TQTXComponent)
  begin
    Widget.Handle.style["font-family"] := "Segoe UI";
    //We create our forms in an Widget with Width and Height = 0: OffCanvasMenuApplication.PagesHolder
    var FForm := TMyForm.Create(OffCanvasMenuApplication.PagesHolder, nil);
    var FHomeForm := THomeForm.Create(OffCanvasMenuApplication.PagesHolder, nil);
    var FForm2 := TMyForm2.Create(OffCanvasMenuApplication.PagesHolder, nil);
    var FForm3 := TMyForm3.Create(OffCanvasMenuApplication.PagesHolder, nil);
    var FForm4 := TMyForm4.Create(OffCanvasMenuApplication.PagesHolder, nil);
    var FForm5 := TMyForm5.Create(OffCanvasMenuApplication.PagesHolder, nil);

    OffCanvasMenuApplication.Title := 'Tabulator wrapper demos';

    //Adding our menus to the Side bar
    OffCanvasMenuApplication.AddSideMenu('Home','','fa fa-home', FHomeForm, true);
    OffCanvasMenuApplication.AddSideMenu('Demo 1 (without TQTXTabulator)','','fa fa-star', FForm, false);
    OffCanvasMenuApplication.AddSideMenu('Demo 2 (Demo 1 improved)','','fa fa-star', FForm2, false);
    OffCanvasMenuApplication.AddSideMenu('Demo 3 (TQTXTabulator)','','fa fa-star', FForm3, false);
    OffCanvasMenuApplication.AddSideMenu('Demo 4 (Large dataset)','','fa fa-star', FForm4, false);
    OffCanvasMenuApplication.AddSideMenu('Demo 5 (Load from JSON)','','fa fa-star', FForm5, false);
    OffCanvasMenuApplication.AddSideMenu('Open Tabulator website','','fa fa-check-circle', nil, false, nil, 'http://tabulator.info/', '_blank');

  end);
  
end.
