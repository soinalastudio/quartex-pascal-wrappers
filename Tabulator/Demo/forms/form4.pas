unit form4;

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
  qtx.delegates,

  qtx.dom.control.common,
  qtx.dom.control.ContentBox,
  qtx.dom.control.label,
  qtx.dom.control.panel,
  qtx.dom.control.button,
  qtx.promises,

  qtx.dom.stylesheet,
  tor.tabulator.wrapper,
  tor.ace.wrapper;

type

  TMyForm4 = class(TQTXForm)
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

resourcestring

  DEMO4 = #"
    //Declaring our TQTXTabulator table  and other used variables
    var tab3: TQTXTabulator;
    var data2: Array of Variant;

    //It's easier? And you can do it dynamically too if you want
    var theFields: array of String := ['id', 'name', 'gender', 'age'];
    var theData: array of Variant :=
      [
        [1, 'David', 'male', 25],
        [2, 'Olivia', 'female', 52],
        [3, 'Peter', 'male', 36],
        [4, 'Clara', 'female', 16]
      ];
    data2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);

    tab3 := TQTXTabulator.Create(Panel, procedure (widget: TQTXTabulator)
    begin
      widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      widget.Style.width := '100%';
      widget.Height := 500;
      //To ensure having the correct prototype of an Event, pass it through CreationEvents property, the compiler will warn if the prototype is incorrect
      //If you know the prototype, you can use ''widget.CreationOptions.cellClick := ...''
      widget.CreationEvents.onCellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)
      begin
        ShowMessage('You clicked on a cell with a value: ' + cell.getValue());
      end;

      //Setting columns
      var ageColumn := new TTabulatorColumnDefinition;
      ageColumn.field := 'age'; //Required
      ageColumn.title := 'Age'; //Required
      ageColumn.hozAlign := 'center';

      //3 ways to do the thing
      widget.CreationOptions.columns := [
          //Method 1
          TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),
          TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),
          //Method 2
          (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),
          //Method 3
          ageColumn.RenderOptions()
        ];

      //Setting data
      widget.CreationOptions.data := data2;

      //Recreate the table (!!! important after using CreationOptions and CreationEvents properties)
      widget.ReCreateTabulator(nil, procedure (widget: TQTXTabulator)
      begin
        //Add here your code after table creation
      end);
    end);
";
  DEMO4_SET_LARGEDATA = #"
   var myLongData: TVariantArray := [];
   var names := ['Wilson', 'Peter', 'Smith', 'Veronica', 'Maria', 'Isabella', 'Andrea'];
   var genders := ['male', 'male', 'male', 'female', 'female', 'female', 'female'];

   function CreateMyLongList (): JPromise;
   begin
     Result := new JPromise(procedure (Resolve, Reject: JPromiseResolver)
     begin
       var mydata: TVariantArray = [];
       for var i:=1 to 100000 do begin
         var elt: Variant := TVariant.CreateObject;
         elt.id := i;
         var rnd := RandomInt(7);
         var rnd2: Integer := (RandomInt(2000)+1);
         elt.name := names[rnd] + ' '+ rnd2.ToString();
         elt.gender := genders[rnd];
         elt.age := RandomInt(100)+1;
         mydata.Add(elt);
       end;
       var resolvedData: Variant;
       asm @resolvedData = @mydata; end;
       Resolve(resolvedData);
     end);
   end;

   async procedure SetMyLargeData();
   begin
     var dt1: TDateTime := Now();
     var data: Variant := await CreateMyLongList();
     var dt2: TDateTime := Now();
     var secs1: Float := TDateUtils.SecondsBetween(dt1, dt2);
     var arr: TVariantArray;
     asm @arr = @data; end;
     widget.setData(arr);
     var dt3: TDateTime := Now();
     var secs2: Float := TDateUtils.SecondsBetween(dt2, dt3);
     ShowMessage('List creation: ' + secs1.ToString()+' secs.'#13'Setting data to the table: ' + secs2.ToString()+' secs ==> IS IT FAST AS YOU LIKE??');
   end;

   SetMyLargeData();
";

//#############################################################################
// TMyForm
//#############################################################################

procedure TMyForm4.StyleObject;
begin
  inherited;
  PositionMode := TQTXWidgetPositionMode.cpInitial;
  DisplayMode := TQTXWidgetDisplayMode.cdBlock;
  Style.width := '100%';
  Border.Padding := 2;
  Background.Color := clSilver;
end;

procedure TMyForm4.InitializeObject;
  procedure AddShowSourceCodeButton(Parent: TQTXWidget; Src: String; buttonColor: TColor = clBlue; sourceFor: String = ''; aceHeight: Integer = 400);
  begin
    var btn: TQTXButton;
    var ace: TQTXAceWidget;

    btn := TQTXButton.Create(Parent, procedure(Button: TQTXButton)
    begin
      Button.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      Button.PositionMode :=  TQTXWidgetPositionMode.cpInitial;
      Button.Background.Color := buttonColor;
      Button.Font.Color := clWhite;
      Button.Style.textShadow := 'none';
      Button.Border.Top.Margin := 5;
      Button.Border.Bottom.Margin := 5;
      Button.InnerHtml := 'Show source code' + (if sourceFor<>'' then ' for "'+sourceFor+'"');
      Button.TagData := 0;

      Button.OnClick := procedure (Sender: TObject)
      begin
        if Button.TagData = 0 then begin
          ace.Visible := True;
          ace.gotoLine(1, 1, true);
          Button.TagData := 1;
          Button.InnerHtml := 'Hide source code' + (if sourceFor<>'' then ' for "'+sourceFor+'"');
        end else begin
          ace.Visible := False;
          Button.TagData := 0;
          Button.InnerHtml := 'Show source code' + (if sourceFor<>'' then ' for "'+sourceFor+'"');
        end;
      end;
    end);

    ace := TQTXAceWidget.Create(Parent, procedure (AceWidget: TQTXAceWidget)
    begin
      ace.PositionMode :=  TQTXWidgetPositionMode.cpRelative;
      ace.DisplayMode := TQTXWidgetDisplayMode.cdBlock;

      ace.Visible := false;
      ace.Style.width := '100%';
      ace.Height := aceHeight;

      ace.setTheme('ace/theme/monokai');
      ace.Session.setMode('ace/mode/pascal');

      ace.setValue(Src, nil);
      ace.clearSelection();
      ace.setReadOnly(true);
     ace.gotoLine(1, 1, true);
    end);

  end;
begin
  inherited;

  var Panel3 := TQTXPanel.Create(self, procedure (Panel: TQTXPanel)
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
      label.Caption :="<b>Using <span style='background-color: yellow;'>TQTXTabulator</span></b><br/>The best way ???";
      Label.Background.Color := clBisque;
      Label.AlignH := chLeft;
      Label.AlignV := cvMiddle;
    end);
    FLabel.Border.Bottom.Margin := 2;

    //Declaring our TQTXTabulator table  and other used variables
    var tab3: TQTXTabulator;
    var data2: Array of Variant;

    var btnAddBigData := TQTXButton.Create(Panel, procedure (Button: TQTXButton)
    begin
      Button.PositionMode := TQTXWidgetPositionMode.cpInitial;
      Button.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      Button.InnerText := 'Set 100K lines in the table';
      Button.Border.Margin := 5;
    end);

    //It's easier? And you can do it dynamically too if you want
    var theFields: array of String := ['id', 'name', 'gender', 'age'];
    var theData: array of Variant :=
      [
        [1, 'David', 'male', 25],
        [2, 'Olivia', 'female', 52],
        [3, 'Peter', 'male', 36],
        [4, 'Clara', 'female', 16]
      ];
    data2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);

    tab3 := TQTXTabulator.Create(Panel, procedure (widget: TQTXTabulator)
    begin
      widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;
      widget.Style.width := '100%';
      widget.Height := 400;

      //Setting columns
      var ageColumn := new TTabulatorColumnDefinition;
      ageColumn.field := 'age'; //Required
      ageColumn.title := 'Age'; //Required
      ageColumn.hozAlign := 'center';


      //3 ways to do the thing
      widget.CreationOptions.columns := [
          //Method 1
          TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),
          TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),
          //Method 2
          (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),
          //Method 3
          ageColumn.RenderOptions()
        ];

      //Setting data
      widget.CreationOptions.data := data2;

      //To ensure having the correct prototype of an Event, pass it through CreationEvents property, the compiler will warn if the prototype is incorrect
      //If you know the prototype, you can use "widget.CreationOptions.cellClick := ..."
      widget.CreationEvents.onCellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)
      begin
        ShowMessage('You clicked on a cell with a value: ' + cell.getValue());
      end;

      //Recreate the table (!!! important after using CreationOptions and CreationEvents properties)
      widget.ReCreateTabulator(nil, procedure (widget: TQTXTabulator)
      begin
        //Add here your code after table creation
      end);

      btnAddBigData.OnClick := procedure (Sender: TObject)
      begin
         var myLongData: TVariantArray := [];
         var names := ['Wilson', 'Peter', 'Smith', 'Veronica', 'Maria', 'Isabella', 'Andrea'];
         var genders := ['male', 'male', 'male', 'female', 'female', 'female', 'female'];

         function CreateMyLongList (): JPromise;
         begin
           Result := new JPromise(procedure (Resolve, Reject: JPromiseResolver)
           begin
             var mydata: TVariantArray = [];
             for var i:=1 to 100000 do begin
               var elt: Variant := TVariant.CreateObject;
               elt.id := i;
               var rnd := RandomInt(7);
               var rnd2: Integer := (RandomInt(2000)+1);
               elt.name := names[rnd] + ' '+ rnd2.ToString();
               elt.gender := genders[rnd];
               elt.age := RandomInt(100)+1;
               mydata.Add(elt);
             end;
             var resolvedData: Variant;
             asm @resolvedData = @mydata; end;
             Resolve(resolvedData);
           end);
         end;

         async procedure SetMyLargeData();
         begin
           var dt1: TDateTime := Now();
           var data: Variant := await CreateMyLongList();
           var dt2: TDateTime := Now();
           var secs1: Float := TDateUtils.SecondsBetween(dt1, dt2);
           var arr: TVariantArray;
           asm @arr = @data; end;
           widget.setData(arr);
           var dt3: TDateTime := Now();
           var secs2: Float := TDateUtils.SecondsBetween(dt2, dt3);
           ShowMessage('List creation: ' + secs1.ToString()+' secs.'#13'Setting data to the table: ' + secs2.ToString()+' secs ==> IS IT FAST AS YOU LIKE??');
         end;

         SetMyLargeData();
      end;
    end);

    AddShowSourceCodeButton(Panel, DEMO4);
    AddShowSourceCodeButton(Panel, DEMO4_SET_LARGEDATA, clGreen, 'Set 100K lines', 400);

   end);

    /*
     widget.onCellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)
     begin
       ShowMessage('Cell click on the value: ' + cell.getValue());
       e.stopPropagation();
     end;

     widget.ReCreate(nil, procedure(table: TQTXTabulator)
     begin
       table.setColumns([
         TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),
         TTabulatorColumnDefinition.RenderFromParams('Capital', 'capital'),
         TTabulatorColumnDefinition.RenderFromParams('Region', 'region'),
         TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),
         TTabulatorColumnDefinition.RenderFromParams('Population', 'population',
          class
            cellClick = procedure()
            begin
              ShowMessage('You clicked one cell in the Population column');
            end;
          end)
       ]);

       //File saved from: https://restcountries.eu/rest/v2/all
       table.setData("/contries.json", null, 'GET');
     end);*/
    //end);

end;

procedure TMyForm4.FinalizeObject;
begin
  FLabel.free;
  FPanel.free;
  inherited;
end;

end.
