var $R = [
	"var Panel3 := TQTXPanel.Create(self, procedure (Panel: TQTXPanel)\r\n  begin\r\n    \/\/Declaring our TQTXTabulator table  and other used variables\r\n    var tab3: TQTXTabulator;\r\n    var data2: Array of Variant;\r\n\r\n    var btnLoadFromJson := TQTXButton.Create(Panel, procedure (Button: TQTXButton)\r\n    begin\r\n      Button.PositionMode := TQTXWidgetPositionMode.cpInitial;\r\n      Button.DisplayMode := TQTXWidgetDisplayMode.cdBlock;\r\n      Button.InnerText := 'Load data from Json';\r\n      Button.Border.Margin := 5;\r\n    end);\r\n\r\n    \/\/It's easier? And you can do it dynamically too if you want\r\n    var theFields: array of String := ['id', 'name', 'gender', 'age'];\r\n    var theData: array of Variant :=\r\n      [\r\n        [1, 'David', 'male', 25],\r\n        [2, 'Olivia', 'female', 52],\r\n        [3, 'Peter', 'male', 36],\r\n        [4, 'Clara', 'female', 16]\r\n      ];\r\n    data2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);\r\n\r\n    tab3 := TQTXTabulator.Create(Panel, procedure (widget: TQTXTabulator)\r\n    begin\r\n      widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;\r\n      widget.Style.width := '100%';\r\n      widget.Height := 400;\r\n\r\n      \/\/Setting columns\r\n      var ageColumn := new TTabulatorColumnDefinition;\r\n      ageColumn.field := 'age'; \/\/Required\r\n      ageColumn.title := 'Age'; \/\/Required\r\n      ageColumn.hozAlign := 'center';\r\n\r\n\r\n      \/\/3 ways to do the thing\r\n      widget.CreationOptions.columns := [\r\n          \/\/Method 1\r\n          TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),\r\n          TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n          \/\/Method 2\r\n          (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),\r\n          \/\/Method 3\r\n          ageColumn.RenderOptions()\r\n        ];\r\n\r\n      \/\/Setting data\r\n      widget.CreationOptions.data := data2;\r\n\r\n      \/\/To ensure having the correct prototype of an Event, pass it through CreationEvents property, the compiler will warn if the prototype is incorrect\r\n      \/\/If you know the prototype, you can use 'widget.CreationOptions.cellClick := ...'\r\n      widget.CreationEvents.onCellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)\r\n      begin\r\n        ShowMessage('You clicked on a cell with a value: ' + cell.getValue());\r\n      end;\r\n\r\n      \/\/Recreate the table (!!! important after using CreationOptions and CreationEvents properties)\r\n      widget.ReCreateTabulator(nil, procedure (widget: TQTXTabulator)\r\n      begin\r\n        \/\/Add here your code after table creation\r\n      end);\r\n\r\n      btnLoadFromJson.OnClick := procedure (Sender: TObject)\r\n      begin\r\n         widget.ReCreateTabulator(nil, procedure(table: TQTXTabulator)\r\n         begin\r\n           table.setColumns([\r\n             TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n             TTabulatorColumnDefinition.RenderFromParams('Capital', 'capital'),\r\n             TTabulatorColumnDefinition.RenderFromParams('Region', 'region'),\r\n             TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n             TTabulatorColumnDefinition.RenderFromParams('Population', 'population',\r\n              class\r\n                cellClick = procedure()\r\n                begin\r\n                  ShowMessage('You clicked one cell in the Population column');\r\n                end;\r\n              end)\r\n           ]);\r\n\r\n           \/\/File saved from: https:\/\/restcountries.eu\/rest\/v2\/all\r\n           table.setData('\/contries.json', null, 'GET');\r\n         end);\r\n      end;\r\n    end);\r\n   end);\r\n",
	" table.setColumns([\r\n   TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n   TTabulatorColumnDefinition.RenderFromParams('Capital', 'capital'),\r\n   TTabulatorColumnDefinition.RenderFromParams('Region', 'region'),\r\n   TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n   TTabulatorColumnDefinition.RenderFromParams('Population', 'population',\r\n    class\r\n      cellClick = procedure()\r\n      begin\r\n        ShowMessage('You clicked one cell in the Population column');\r\n      end;\r\n    end)\r\n]);\r\n\r\n\/\/File saved from: https:\/\/restcountries.eu\/rest\/v2\/all\r\ntable.setData('\/contries.json', null, 'GET');\r\n",
	"\/\/Declaring our TQTXTabulator table  and other used variables\r\nvar tab3: TQTXTabulator;\r\nvar data2: Array of Variant;\r\n\r\n\/\/It's easier? And you can do it dynamically too if you want\r\nvar theFields: array of String := ['id', 'name', 'gender', 'age'];\r\nvar theData: array of Variant :=\r\n  [\r\n    [1, 'David', 'male', 25],\r\n    [2, 'Olivia', 'female', 52],\r\n    [3, 'Peter', 'male', 36],\r\n    [4, 'Clara', 'female', 16]\r\n  ];\r\ndata2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);\r\n\r\ntab3 := TQTXTabulator.Create(Panel, procedure (widget: TQTXTabulator)\r\nbegin\r\n  widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;\r\n  widget.Style.width := '100%';\r\n  widget.Height := 500;\r\n  \/\/To ensure having the correct prototype of an Event, pass it through CreationEvents property, the compiler will warn if the prototype is incorrect\r\n  \/\/If you know the prototype, you can use ''widget.CreationOptions.cellClick := ...''\r\n  widget.CreationEvents.onCellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)\r\n  begin\r\n    ShowMessage('You clicked on a cell with a value: ' + cell.getValue());\r\n  end;\r\n\r\n  \/\/Setting columns\r\n  var ageColumn := new TTabulatorColumnDefinition;\r\n  ageColumn.field := 'age'; \/\/Required\r\n  ageColumn.title := 'Age'; \/\/Required\r\n  ageColumn.hozAlign := 'center';\r\n\r\n  \/\/3 ways to do the thing\r\n  widget.CreationOptions.columns := [\r\n      \/\/Method 1\r\n      TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),\r\n      TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n      \/\/Method 2\r\n      (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),\r\n      \/\/Method 3\r\n      ageColumn.RenderOptions()\r\n    ];\r\n\r\n  \/\/Setting data\r\n  widget.CreationOptions.data := data2;\r\n\r\n  \/\/Recreate the table (!!! important after using CreationOptions and CreationEvents properties)\r\n  widget.ReCreateTabulator(nil, procedure (widget: TQTXTabulator)\r\n  begin\r\n    \/\/Add here your code after table creation\r\n  end);\r\nend);\r\n",
	"var myLongData: TVariantArray := [];\r\nvar names := ['Wilson', 'Peter', 'Smith', 'Veronica', 'Maria', 'Isabella', 'Andrea'];\r\nvar genders := ['male', 'male', 'male', 'female', 'female', 'female', 'female'];\r\n\r\nfunction CreateMyLongList (): JPromise;\r\nbegin\r\n  Result := new JPromise(procedure (Resolve, Reject: JPromiseResolver)\r\n  begin\r\n    var mydata: TVariantArray = [];\r\n    for var i:=1 to 100000 do begin\r\n      var elt: Variant := TVariant.CreateObject;\r\n      elt.id := i;\r\n      var rnd := RandomInt(7);\r\n      var rnd2: Integer := (RandomInt(2000)+1);\r\n      elt.name := names[rnd] + ' '+ rnd2.ToString();\r\n      elt.gender := genders[rnd];\r\n      elt.age := RandomInt(100)+1;\r\n      mydata.Add(elt);\r\n    end;\r\n    var resolvedData: Variant;\r\n    asm @resolvedData = @mydata; end;\r\n    Resolve(resolvedData);\r\n  end);\r\nend;\r\n\r\nasync procedure SetMyLargeData();\r\nbegin\r\n  var dt1: TDateTime := Now();\r\n  var data: Variant := await CreateMyLongList();\r\n  var dt2: TDateTime := Now();\r\n  var secs1: Float := TDateUtils.SecondsBetween(dt1, dt2);\r\n  var arr: TVariantArray;\r\n  asm @arr = @data; end;\r\n  widget.setData(arr);\r\n  var dt3: TDateTime := Now();\r\n  var secs2: Float := TDateUtils.SecondsBetween(dt2, dt3);\r\n  ShowMessage('List creation: ' + secs1.ToString()+' secs.'#13'Setting data to the table: ' + secs2.ToString()+' secs ==> IS IT FAST AS YOU LIKE??');\r\nend;\r\n\r\nSetMyLargeData();\r\n",
	"\/\/Declaring our TQTXTabulator table  and other used variables\r\nvar tab3: TQTXTabulator;\r\nvar data2: Array of Variant;\r\n\r\n\/\/It's easier? And you can do it dynamically too if you want\r\nvar theFields: array of String := ['id', 'name', 'gender', 'age'];\r\nvar theData: array of Variant :=\r\n  [\r\n    [1, 'David', 'male', 25],\r\n    [2, 'Olivia', 'female', 52],\r\n    [3, 'Peter', 'male', 36],\r\n    [4, 'Clara', 'female', 16]\r\n  ];\r\ndata2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);\r\n\r\ntab3 := TQTXTabulator.Create(Panel, procedure (widget: TQTXTabulator)\r\nbegin\r\n  widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;\r\n  widget.Style.width := '100%';\r\n  widget.Height := 500;\r\n  \/\/To ensure having the correct prototype of an Event, pass it through CreationEvents property, the compiler will warn if the prototype is incorrect\r\n  \/\/If you know the prototype, you can use ''widget.CreationOptions.cellClick := ...''\r\n  widget.CreationEvents.onCellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)\r\n  begin\r\n    ShowMessage('You clicked on a cell with a value: ' + cell.getValue());\r\n  end;\r\n\r\n  \/\/Setting columns\r\n  var ageColumn := new TTabulatorColumnDefinition;\r\n  ageColumn.field := 'age'; \/\/Required\r\n  ageColumn.title := 'Age'; \/\/Required\r\n  ageColumn.hozAlign := 'center';\r\n\r\n  \/\/3 ways to do the thing\r\n  widget.CreationOptions.columns := [\r\n      \/\/Method 1\r\n      TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),\r\n      TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n      \/\/Method 2\r\n      (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),\r\n      \/\/Method 3\r\n      ageColumn.RenderOptions()\r\n    ];\r\n\r\n  \/\/Setting data\r\n  widget.CreationOptions.data := data2;\r\n\r\n  \/\/Recreate the table (!!! important after using CreationOptions and CreationEvents properties)\r\n  widget.ReCreateTabulator(nil, procedure (widget: TQTXTabulator)\r\n  begin\r\n    \/\/Add here your code after table creation\r\n  end);\r\nend);\r\n",
	"tab3.CreationOptions.movableColumns := true;\r\ntab3.CreationOptions.movableRows := true;\r\ntab3.ReCreateTabulator(nil, nil);\r\n",
	"\/\/Declaring our Tabulator table  and other used variables\r\nvar tab2: TTabulator;\r\nvar tableOptions2: TTabulatorOptions;\r\nvar elID2: String;\r\nvar data2: Array of Variant;\r\n\r\n\/\/It's easier? And you can do it dynamically too if you want\r\nvar theFields: array of String := ['id', 'name', 'gender', 'age'];\r\nvar theData: array of Variant :=\r\n  [\r\n    [1, 'David', 'male', 25],\r\n    [2, 'Olivia', 'female', 52],\r\n    [3, 'Peter', 'male', 36],\r\n    [4, 'Clara', 'female', 16]\r\n  ];\r\ndata2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);\r\n\r\n\/\/Options that will be use as argument for the TTabulator constructor argument\r\ntableOptions2 := new TTabulatorOptions();\r\ntableOptions2.data := data2;\r\n\r\nvar ageColumn := new TTabulatorColumnDefinition;\r\nageColumn.field := 'age'; \/\/Required\r\nageColumn.title := 'Age'; \/\/Required\r\nageColumn.hozAlign := 'center';\r\n\r\n\/\/3 ways to do the thing\r\ntableOptions2.columns := [\r\n    \/\/Method 1\r\n    TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),\r\n    TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n    \/\/Method 2\r\n    (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),\r\n    \/\/Method 3\r\n    ageColumn.RenderOptions()\r\n  ];\r\n\r\ntableOptions2.cellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)\r\nbegin\r\n  ShowMessage('You clicked on a cell with a value: ' + cell.getValue());\r\nend;\r\n\r\n\/\/Creating a widget and the Tabulator table\r\nvar widgetTable := TQTXWidget.Create(Panel, procedure (widget: TQTXWidget)\r\nbegin\r\n  widget.WhenReady(procedure (widget: TQTXWidget)\r\n  begin\r\n    widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;\r\n    widget.Width := 600;\r\n    widget.Height := 200;\r\n    TQTXDispatch.Execute(procedure()\r\n    begin\r\n      \/\/Creating our table\r\n      elID2 := '#'+widget.Handle.id;\r\n      tab2 := TTabulator.Create(elID2, tableOptions2.RenderOptions());\r\n    end, 50);\r\n  end);\r\nend);\r\n",
	"\/\/Declaring our Tabulator table\r\nvar tab1: TTabulator;\r\n\r\n\/\/Setup data (it's preferable to have an index column, by default: 'id')\r\nvar data1 := [\r\n  class\r\n    id = 1;\r\n    name = 'David';\r\n    gender = 'male';\r\n    age = 25;\r\n  end,\r\n  class\r\n    id = 2;\r\n    name = 'Olivia';\r\n    gender = 'female';\r\n    age = 52;\r\n  end,\r\n  class\r\n    id = 3;\r\n    name = 'Peter';\r\n    gender = 'male';\r\n    age = 36;\r\n  end,\r\n  class\r\n    id = 4;\r\n    name = 'Clara';\r\n    gender = 'female';\r\n    age = 16;\r\n  end\r\n];\r\n\/\/Options that will be use as argument for the TTabulator constructor argument\r\nvar tableOptions1 := class\r\n  data = data1;\r\n  columns = [\r\n    class title = 'ID'; field = 'id'; resizable = false; hozAlign = 'center'; end, \/\/Center aligned\r\n    class title = 'Name'; field = 'name'; end,\r\n    class title = 'Gender'; field = 'gender'; end,\r\n    class title = 'Age'; field = 'age'; hozAlign = 'center'; end \/\/Center aligned\r\n  ];\r\n  cellClick = procedure (e: JMouseEvent; cell: TTabulatorCellComponent)\r\n  begin\r\n    ShowMessage('You clicked on a cell with a value: ' + cell.getValue());\r\n  end;\r\nend;\r\n\/\/Creating a widget that will hold our Tabulator table\r\nvar widgetTable := TQTXWidget.Create(Panel, procedure (widget: TQTXWidget)\r\nbegin\r\n  widget.WhenReady(procedure (widget: TQTXWidget)\r\n  begin\r\n    widget.Width := 400;\r\n    widget.Height := 200;\r\n    \/\/TODO: Not use TQTXDispatch here, how to know if the widget is really ready?\r\n    \/\/Without a delay of TQTXDispatch, element ID is available but still not usable even in WhenReady!!!\r\n    TQTXDispatch.Execute(procedure()\r\n    begin\r\n      \/\/Creating our table\r\n      tab1 := TTabulator.Create('#'+widget.Handle.id, tableOptions1);\r\n    end, 50);\r\n  end);\r\nend);\r\n",
	"\/\/Declaring our Tabulator table  and other used variables\r\nvar tab2: TTabulator;\r\nvar tableOptions2: TTabulatorOptions;\r\nvar elID2: String;\r\nvar data2: Array of Variant;\r\n\r\n\/\/It's easier? And you can do it dynamically too if you want\r\nvar theFields: array of String := ['id', 'name', 'gender', 'age'];\r\nvar theData: array of Variant :=\r\n  [\r\n    [1, 'David', 'male', 25],\r\n    [2, 'Olivia', 'female', 52],\r\n    [3, 'Peter', 'male', 36],\r\n    [4, 'Clara', 'female', 16]\r\n  ];\r\ndata2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);\r\n\r\n\/\/Options that will be use as argument for the TTabulator constructor argument\r\ntableOptions2 := new TTabulatorOptions();\r\ntableOptions2.data := data2;\r\n\r\nvar ageColumn := new TTabulatorColumnDefinition;\r\nageColumn.field := 'age'; \/\/Required\r\nageColumn.title := 'Age'; \/\/Required\r\nageColumn.hozAlign := 'center';\r\n\r\n\/\/3 ways to do the thing\r\ntableOptions2.columns := [\r\n    \/\/Method 1\r\n    TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),\r\n    TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n    \/\/Method 2\r\n    (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),\r\n    \/\/Method 3\r\n    ageColumn.RenderOptions()\r\n  ];\r\n\r\ntableOptions2.cellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)\r\nbegin\r\n  ShowMessage('You clicked on a cell with a value: ' + cell.getValue());\r\nend;\r\n\r\n\/\/Creating a widget and the Tabulator table\r\nvar widgetTable := TQTXWidget.Create(Panel, procedure (widget: TQTXWidget)\r\nbegin\r\n  widget.WhenReady(procedure (widget: TQTXWidget)\r\n  begin\r\n    widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;\r\n    widget.Width := 600;\r\n    widget.Height := 200;\r\n    TQTXDispatch.Execute(procedure()\r\n    begin\r\n      \/\/Creating our table\r\n      elID2 := '#'+widget.Handle.id;\r\n      tab2 := TTabulator.Create(elID2, tableOptions2.RenderOptions());\r\n    end, 50);\r\n  end);\r\nend);\r\n",
	"\/\/Declaring our TQTXTabulator table  and other used variables\r\nvar tab3: TQTXTabulator;\r\nvar data2: Array of Variant;\r\n\r\n\/\/It's easier? And you can do it dynamically too if you want\r\nvar theFields: array of String := ['id', 'name', 'gender', 'age'];\r\nvar theData: array of Variant :=\r\n  [\r\n    [1, 'David', 'male', 25],\r\n    [2, 'Olivia', 'female', 52],\r\n    [3, 'Peter', 'male', 36],\r\n    [4, 'Clara', 'female', 16]\r\n  ];\r\ndata2 := TQTXTabulator.mergeFieldsWithData(theFields, theData);\r\n\r\ntab3 := TQTXTabulator.Create(Panel, procedure (widget: TQTXTabulator)\r\nbegin\r\n  widget.DisplayMode := TQTXWidgetDisplayMode.cdBlock;\r\n  widget.Style.width := '100%';\r\n  widget.Height := 500;\r\n  \/\/To ensure having the correct prototype of an Event, pass it through CreationEvents property, the compiler will warn if the prototype is incorrect\r\n  \/\/If you know the prototype, you can use ''widget.CreationOptions.cellClick := ...''\r\n  widget.CreationEvents.onCellClick := procedure (e: JMouseEvent; cell: TTabulatorCellComponent)\r\n  begin\r\n    ShowMessage('You clicked on a cell with a value: ' + cell.getValue());\r\n  end;\r\n\r\n  \/\/Setting columns\r\n  var ageColumn := new TTabulatorColumnDefinition;\r\n  ageColumn.field := 'age'; \/\/Required\r\n  ageColumn.title := 'Age'; \/\/Required\r\n  ageColumn.hozAlign := 'center';\r\n\r\n  \/\/3 ways to do the thing\r\n  widget.CreationOptions.columns := [\r\n      \/\/Method 1\r\n      TTabulatorColumnDefinition.RenderFromParams('Id', 'id', class hozAlign = 'center'; resizable = false; end),\r\n      TTabulatorColumnDefinition.RenderFromParams('Name', 'name'),\r\n      \/\/Method 2\r\n      (new TTabulatorColumnDefinition('Gender', 'gender')).RenderOptions(),\r\n      \/\/Method 3\r\n      ageColumn.RenderOptions()\r\n    ];\r\n\r\n  \/\/Setting data\r\n  widget.CreationOptions.data := data2;\r\n\r\n  \/\/Recreate the table (!!! important after using CreationOptions and CreationEvents properties)\r\n  widget.ReCreateTabulator(nil, procedure (widget: TQTXTabulator)\r\n  begin\r\n    \/\/Add here your code after table creation\r\n  end);\r\nend);\r\n",
	"tab3.CreationOptions.movableColumns := true;\r\ntab3.CreationOptions.movableRows := true;\r\ntab3.ReCreateTabulator(nil, nil);\r\n",
	"Register failed, form (%s) already registered",
	"Register failed, form reference is invalid",
	"Unregister failed, form reference is invalid",
	"Unregister failed, form (%s) not in collection",
	"Method %s in class %s threw exception [%s]",
	"Invalid dictionary key",
	"Invalid array of dictionary keys",
	"Seek failed, stream is empty error",
	"Read operation failed, %s bytes exceeds storage medium error",
	"Read operation failed, invalid signature error [%s]",
	"Bookmarks not supported by medium error",
	"No bookmarks to roll back error",
	"Invalid length, %s bytes exceeds storage boundaries error",
	"Write failed, invalid datasize [%d] error",
	"'Invalid handle [%s], reference was rejected error",
	"Invalid bit index, expected 0..31",
	"Failed to convert bytes[] to intrinsic type, unknown identifier [%s] error",
	"Invalid datatype, failed to identify number [int32] type error",
	"Invalid datatype, byte conversion failed error"];
var Random = Math.random;
function Trim$_String_(s) { return s.replace(/^\s\s*/, "").replace(/\s\s*$/, "") }
var TObject={
	$ClassName: "TObject",
	$Parent: null,
	ClassName: function (s) { return s.$ClassName },
	ClassType: function (s) { return s },
	ClassParent: function (s) { return s.$Parent },
	$Init: function (s) {},
	Create: function (s) { return s },
	Destroy: function (s) { for (var prop in s) if (s.hasOwnProperty(prop)) delete s[prop] },
	Destroy$: function(s) { return s.ClassType.Destroy(s) },
	Free: function (s) { if (s!==null) s.ClassType.Destroy(s) }
}
function SetLength(s,n) { if (s.v.length>n) s.v=s.v.substring(0,n);else while (s.v.length<n) s.v+=" "; }
function RightStr(s,n) { return s.substr(s.length-n) }
function RandomInt(i) { return Math.floor(Random()*i) }
function Now() {
	var d=new Date();
	return (d.getTime()-d.getTimezoneOffset()*6e4)/864e5+25569
}
function IntToHex2(v) { var r=v.toString(16); return (r.length==1)?"0"+r:r }
/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

var sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = String(parseInt(arg, 10)); if (match[7]) { arg = str_repeat('0', match[7]-arg.length)+arg } break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
                    case 'g': arg = parseFloat(arg); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw('[sprintf] huh?');
							}
						}
					}
					else {
						throw('[sprintf] huh?');
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();
function Format(f,a) { a.unshift(f); return sprintf.apply(null,a) }
var Exception={
	$ClassName: "Exception",
	$Parent: TObject,
	$Init: function (s) { s.FMessage="" },
	Create: function (s,Msg) { s.FMessage=Msg; return s }
}
function Delete(s,i,n) { var v=s.v; if ((i<=0)||(i>v.length)||(n<=0)) return; s.v=v.substr(0,i-1)+v.substr(i+n-1); }
function DecodeTime(dt,h,m,s,z,u) {
	var o=DateTimeToDate(dt);
	if ((u||$TZ)==1) {
	h.v=o.getUTCHours();
	m.v=o.getUTCMinutes();
	s.v=o.getUTCSeconds();
	z.v=o.getUTCMilliseconds();
	} else {
	h.v=o.getHours();
	m.v=o.getMinutes();
	s.v=o.getSeconds();
	z.v=o.getMilliseconds();
	}
}
function DateTimeToDate(v,d) {
	if(v||!d) return new Date(Math.round((v-25569)*864e5));
	var o=new Date();
	o.setTime(o.getTime()-o.getTimezoneOffset()*6e4);
	return o
}
function $W(e) { return e.ClassType?e:Exception.Create($New(Exception),(typeof e == "string") ? e : e.constructor.name+", "+e.message) }
function $VarToInt(v,z) {
	var r = parseInt(v || 0, 10);
	if (isNaN(r)) throw Exception.Create($New(Exception),"Not a valid integer: "+v+z);
	return r
}
function $VarToBool(v) { return !!(typeof v == "string" ? {"1":1,"t":1,"y":1,"true":1}[v.toLowerCase()] : v) }
// inspired from 
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/charCodeAt
function $uniCharAt(str, idx) {
    var c = str.charCodeAt(idx);
    if (0xD800 <= c && c <= 0xDBFF) { // High surrogate
        return str.substr(idx, 2);
    }
    if (0xDC00 <= c && c <= 0xDFFF) { // Low surrogate
        return null;
    }
    return str.charAt(idx);
}var $TZ = 1, $fmt = { 
	ShortDayNames : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
	LongDayNames : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
	ShortMonthNames : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
	LongMonthNames : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
	ShortDateFormat : "yyyy-mm-dd",
	ShortTimeFormat : "hh:nn",
	LongTimeFormat : "hh:nn:ss",
	TimeAMString : "AM",
	TimePMString : "PM"
}
function $SetIn(s,v,m,n) { v-=m; return (v<0 && v>=n)?false:(s[v>>5]&(1<<(v&31)))!=0 }
function $Remove(a,i,f) {
	var j = a.indexOf(i,f);
	if (j>=0) a.splice(j,1);
}
Array.prototype.pusha = function (e) { this.push.apply(this, e); return this }
function $NewDyn(c,z) {
	if (c==null) throw Exception.Create($New(Exception),"ClassType is nil"+z);
	var i={ClassType:c};
	c.$Init(i);
	return i
}
function $New(c) { var i={ClassType:c}; c.$Init(i); return i }
function $Is(o,c) {
	if (o===null) return false;
	return $Inh(o.ClassType,c);
}
;
function $Inh(s,c) {
	if (s===null) return false;
	while ((s)&&(s!==c)) s=s.$Parent;
	return (s)?true:false;
}
;
function $Extend(base, sub, props) {
	function F() {};
	F.prototype = base.prototype;
	sub.prototype = new F();
	sub.prototype.constructor = sub;
	for (var n in props) {
		if (props.hasOwnProperty(n)) {
			sub.prototype[n]=props[n];
		}
	}
}
function $Event2(i,f) {
	var li=i,lf=f;
	return function(a,b) {
		return lf.call(li,li,a,b)
	}
}
function $Event1(i,f) {
	var li=i,lf=f;
	return function(a) {
		return lf.call(li,li,a)
	}
}
function $Event0(i,f) {
	var li=i,lf=f;
	return function() {
		return lf.call(li,li)
	}
}
function $Div(a,b) { var r=a/b; return (r>=0)?Math.floor(r):Math.ceil(r) }
function $AsIntf(o,i) {
	if (o===null) return null;
	var r = o.ClassType.$Intf[i].map(function (e) {
		return function () {
			var arg=Array.prototype.slice.call(arguments);
			arg.splice(0,0,o);
			return e.apply(o, arg);
		}
	});
	r.O = o;
	return r;
}
;
function $As(o,c) {
	if ((o===null)||$Is(o,c)) return o;
	throw Exception.Create($New(Exception),"Cannot cast instance of type \""+o.ClassType.$ClassName+"\" to class \""+c.$ClassName+"\"");
}
function $ArraySwap(a,i1,i2) { var t=a[i1]; a[i1]=a[i2]; a[i2]=t; return a }
function $ArraySetLenC(a,n,d) {
	var o=a.length;
	if (o==n) return;
	if (o>n) a.length=n; else for (;o<n;o++) a.push(d());
}
function WriteLn(value$2) {
   console.log(value$2);
};
/// function TVariantHelper.DataType() : TVariantExportType
///  [line: 3193, column: 25, file: qtx.sysutils]
function TVariantHelper$DataType(Self$1) {
   var Result = 1;
   var LType = "";
   if (TVariantHelper$Valid(Self$1)) {
      LType = typeof(Self$1);
      {var $temp1 = (LType).toLocaleLowerCase();
         if ($temp1=="object") {
            if ((!Self$1.length)) {
               Result = 8;
            } else {
               Result = 9;
            }
         }
          else if ($temp1=="function") {
            Result = 7;
         }
          else if ($temp1=="symbol") {
            Result = 6;
         }
          else if ($temp1=="boolean") {
            Result = 2;
         }
          else if ($temp1=="string") {
            Result = 5;
         }
          else if ($temp1=="number") {
            if (Math.round(Number(Self$1)) != Self$1) {
               Result = 4;
            } else {
               Result = 3;
            }
         }
          else if ($temp1=="array") {
            Result = 9;
         }
          else {
            Result = 1;
         }
      }
   } else if (Self$1 == null) {
      Result = 10;
   } else {
      Result = 1;
   }
   return Result
}
/// function TVariantHelper.Valid() : Boolean
///  [line: 3139, column: 25, file: qtx.sysutils]
function TVariantHelper$Valid(Self$2) {
   var Result = false;
   Result = !( (Self$2 == undefined) || (Self$2 == null) );
   return Result
}
/// TVariantExportType enumeration
///  [line: 94, column: 3, file: qtx.sysutils]
var TVariantExportType = { 1:"vdUnknown", 2:"vdBoolean", 3:"vdinteger", 4:"vdfloat", 5:"vdstring", 6:"vdSymbol", 7:"vdFunction", 8:"vdObject", 9:"vdArray", 10:"vdVariant" };
/// TVariant = class (TObject)
///  [line: 568, column: 3, file: qtx.sysutils]
var TVariant = {
   $ClassName:"TVariant",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TVariant.AsBool(aValue: Variant) : Boolean
   ///  [line: 1537, column: 25, file: qtx.sysutils]
   ,AsBool:function(aValue) {
      var Result = false;
      if (aValue) {
         Result = $VarToBool(aValue);
      }
      return Result
   }
   /// function TVariant.AsFloat(aValue: Variant) : Float
   ///  [line: 1521, column: 25, file: qtx.sysutils]
   ,AsFloat:function(aValue) {
      var Result = 0;
      if (aValue) {
         Result = Number(aValue);
      }
      return Result
   }
   /// function TVariant.AsInteger(aValue: Variant) : int32
   ///  [line: 1509, column: 25, file: qtx.sysutils]
   ,AsInteger:function(aValue) {
      var Result = 0;
      if (aValue) {
         Result = $VarToInt(aValue,"");
      }
      return Result
   }
   /// function TVariant.AsObject(aValue: Variant) : TObject
   ///  [line: 1527, column: 25, file: qtx.sysutils]
   ,AsObject:function(aValue) {
      var Result = null;
      if (aValue) {
         Result = aValue;
      }
      return Result
   }
   /// function TVariant.AsString(aValue: Variant) : String
   ///  [line: 1515, column: 25, file: qtx.sysutils]
   ,AsString:function(aValue) {
      var Result = "";
      if (aValue) {
         Result = String(aValue);
      }
      return Result
   }
   /// function TVariant.ClassInstance(instance: Variant) : Boolean
   ///  [line: 1543, column: 25, file: qtx.sysutils]
   ,ClassInstance:function(instance) {
      var Result = false;
      Result = true;
      if (typeof(instance) == "object") {
         if (instance.hasOwnProperty("ClassType")) {
            if (instance.ClassType.hasOwnProperty("$ClassName")) {
               if (typeof(instance.ClassType["$ClassName"]) == "string") {
                  Result = (String(instance.ClassType["$ClassName"])).length > 0;
               }
            }
         }
      }
      return Result
   }
   /// function TVariant.CreateObject() : Variant
   ///  [line: 1560, column: 25, file: qtx.sysutils]
   ,CreateObject:function() {
      var Result = undefined;
      Result = new Object();
      return Result
   }
   /// function TVariant.ExamineType(Value: Variant) : TVariantExportType
   ///  [line: 1575, column: 25, file: qtx.sysutils]
   ,ExamineType:function(Value$2) {
      var Result = 1;
      if (Value$2) {
         {var $temp2 = (typeof(Value$2)).toLocaleLowerCase();
            if ($temp2=="object") {
               Result = (Value$2.hasOwnProperty("length"))?9:8;
            }
             else if ($temp2=="function") {
               Result = 7;
            }
             else if ($temp2=="symbol") {
               Result = 6;
            }
             else if ($temp2=="boolean") {
               Result = 2;
            }
             else if ($temp2=="string") {
               Result = 5;
            }
             else if ($temp2=="number") {
               Result = (!(~(Value$2 % 1)))?4:3;
            }
             else if ($temp2=="array") {
               Result = 9;
            }
             else {
               Result = 1;
            }
         }
      } else {
         Result = 1;
      }
      return Result
   }
   /// function TVariant.IsString(aValue: Variant) : Boolean
   ///  [line: 1607, column: 25, file: qtx.sysutils]
   ,IsString:function(aValue) {
      return typeof(aValue) == __TYPE_MAP.String$1;
   }
   /// function TVariant.PropertyExists(Data: Variant; Field: String) : Boolean
   ///  [line: 1675, column: 25, file: qtx.sysutils]
   ,PropertyExists$1:function(Data$1, Field) {
      var Result = false;
      if (Data$1) {
         Result = $VarToBool(Data$1.hasOwnProperty(Field));
      }
      return Result
   }
   /// function TVariant.PropertyWrite(Data: Variant; Field: String; Value: Variant) : Variant
   ///  [line: 1688, column: 25, file: qtx.sysutils]
   ,PropertyWrite$1:function(Data$1, Field, Value$2) {
      var Result = undefined;
      Result = Data$1;
    Result[Field] = Value$2;
      return Result
   }
   /// function TVariant.ToObject(Value: Variant) : TObject
   ///  [line: 1712, column: 25, file: qtx.sysutils]
   ,ToObject:function(Value$2) {
      var Result = null;
      Result = Value$2;
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TValuePrefixType enumeration
var TValuePrefixType = [ "vpNone", "vpHexPascal", "vpHexC", "vpBinPascal", "vpBinC", "vpString" ];
/// TString = class (TObject)
///  [line: 624, column: 3, file: qtx.sysutils]
var TString = {
   $ClassName:"TString",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TString.BinaryStrToInt(BinStr: String) : int32
   ///  [line: 1009, column: 24, file: qtx.sysutils]
   ,BinaryStrToInt:function(BinStr) {
      var Result = {v:0};
      try {
         if (!(TString.ExamineBinary(BinStr,Result))) {
            throw EException.CreateFmt($New(EConvertBinaryStringInvalid),"Failed to convert binary string (%s)",[BinStr]);
         }
      } finally {return Result.v}
   }
   /// function TString.CharCodeFor(const Character: char) : int32
   ///  [line: 3038, column: 24, file: qtx.sysutils]
   ,CharCodeFor:function(Character) {
      var Result = 0;
      Result = (Character).charCodeAt(0);
      return Result
   }
   /// function TString.DecodeUTF8(const BytesToDecode: TUInt8Array) : String
   ///  [line: 3097, column: 24, file: qtx.sysutils]
   ,DecodeUTF8:function(BytesToDecode) {
      var Result = {v:""};
      try {
         var LCodec = null;
         LCodec = TDataTypeConverter.Create$13$($New(TQTXCodecUTF8));
         try {
            Result.v = TQTXCodecUTF8.Decode(LCodec,BytesToDecode);
         } finally {
            TObject.Free(LCodec);
         }
      } finally {return Result.v}
   }
   /// function TString.EncodeUTF8(TextToEncode: String) : TUInt8Array
   ///  [line: 3087, column: 24, file: qtx.sysutils]
   ,EncodeUTF8:function(TextToEncode) {
      var Result = {v:[]};
      try {
         var LCodec = null;
         LCodec = TDataTypeConverter.Create$13$($New(TQTXCodecUTF8));
         try {
            Result.v = TQTXCodecUTF8.Encode(LCodec,TextToEncode);
         } finally {
            TObject.Free(LCodec);
         }
      } finally {return Result.v}
   }
   /// function TString.ExamineBinary(Text: String; var value: longword) : Boolean
   ///  [line: 1160, column: 24, file: qtx.sysutils]
   ,ExamineBinary:function(Text$2, value$2) {
      var Result = false;
      var BitIndex = 0,
         x$5 = 0;
      value$2.v = TDataTypeConverter.InitUint32(0);
      if (Text$2.charAt(0)=="%") {
         Text$2 = (Text$2).substring(1);
      } else if (Text$2.substr(0,2)=="0b") {
         Text$2 = (Text$2).substring(2);
      }
      if (!(TString.ValidBinChars(Text$2))) {
         Result = false;
         return Result;
      }
      BitIndex = 0;
      for(x$5=Text$2.length;x$5>=1;x$5--) {
         if (Text$2.charAt(x$5-1) == "1") {
            TInt32.SetBit(BitIndex,true,value$2);
         }
         ++BitIndex;
         if (BitIndex > 31) {
            break;
         }
      }
      Result = true;
      return Result
   }
   /// function TString.Examineint32(Text: String; var Value: int32) : Boolean
   ///  [line: 1282, column: 24, file: qtx.sysutils]
   ,Examineint32:function(Text$2, Value$2) {
      var Result = false;
      var TextLen = 0,
         Prefix = {v:0};
      Text$2 = Trim$_String_(Text$2);
      TextLen = Text$2.length;
      if (TextLen > 0) {
         Prefix.v = 0;
         if (TString.ExamineTypePrefix(Text$2,Prefix)) {
            switch (Prefix.v) {
               case 1 :
                  --TextLen;
                  Text$2 = RightStr(Text$2,TextLen);
                  Result = TString.ValidHexChars(Text$2);
                  if (Result) {
                     Value$2.v = parseInt("0x" + Text$2,16);
                  }
                  break;
               case 2 :
                  (TextLen-= 2);
                  Text$2 = RightStr(Text$2,TextLen);
                  Result = TString.ValidHexChars(Text$2);
                  if (Result) {
                     Value$2.v = parseInt("0x" + Text$2,16);
                  }
                  break;
               case 3 :
                  --TextLen;
                  Text$2 = RightStr(Text$2,TextLen);
                  Result = TString.ValidBinChars(Text$2);
                  if (Result) {
                     Value$2.v = TString.BinaryStrToInt(Text$2);
                  }
                  break;
               case 4 :
                  (TextLen-= 2);
                  Text$2 = RightStr(Text$2,TextLen);
                  Result = TString.ValidBinChars(Text$2);
                  if (Result) {
                     Value$2.v = TString.BinaryStrToInt(Text$2);
                  }
                  break;
               case 5 :
                  return Result;
                  break;
               default :
                  Result = TString.ValidDecChars(Text$2);
                  if (Result) {
                     Value$2.v = parseInt(Text$2,10);
                  }
            }
         } else {
            Result = TString.ValidDecChars(Text$2);
            if (Result) {
               Value$2.v = parseInt(Text$2,10);
            }
         }
      }
      return Result
   }
   /// function TString.ExamineTypePrefix(const Text: String; var Prefix: TValuePrefixType) : Boolean
   ///  [line: 1021, column: 24, file: qtx.sysutils]
   ,ExamineTypePrefix:function(Text$2, Prefix) {
      var Result = false;
      Prefix.v = 0;
      if (Text$2.length > 0) {
         if (Text$2.charAt(0)=="$") {
            Prefix.v = 1;
         } else if (Text$2.substr(0,2)=="0x") {
            Prefix.v = 2;
         } else if (Text$2.charAt(0)=="%") {
            Prefix.v = 3;
         } else if (Text$2.substr(0,2)=="0b") {
            Prefix.v = 4;
         } else if (Text$2.charAt(0)=="\"") {
            Prefix.v = 5;
         }
         Result = (Prefix.v!=0);
      }
      return Result
   }
   /// function TString.FromCharCode(const CharCode: uint8) : char
   ///  [line: 3061, column: 24, file: qtx.sysutils]
   ,FromCharCode:function(CharCode) {
      var Result = "";
      Result = String.fromCharCode(CharCode);
      return Result
   }
   /// function TString.ValidBinChars(const Text: String) : Boolean
   ///  [line: 1272, column: 24, file: qtx.sysutils]
   ,ValidBinChars:function(Text$2) {
      var Result = false;
      var character = "";
      for (var $temp3=0;$temp3<Text$2.length;$temp3++) {
         character=$uniCharAt(Text$2,$temp3);
         if (!character) continue;
         Result = ((character=="0")||(character=="1"));
         if (!(Result)) {
            break;
         }
      }
      return Result
   }
   /// function TString.ValidDecChars(const Text: String) : Boolean
   ///  [line: 1262, column: 24, file: qtx.sysutils]
   ,ValidDecChars:function(Text$2) {
      var Result = false;
      var character = "";
      for (var $temp4=0;$temp4<Text$2.length;$temp4++) {
         character=$uniCharAt(Text$2,$temp4);
         if (!character) continue;
         Result = character>="0" && character<="9";
         if (!(Result)) {
            break;
         }
      }
      return Result
   }
   /// function TString.ValidHexChars(const Text: String) : Boolean
   ///  [line: 1252, column: 24, file: qtx.sysutils]
   ,ValidHexChars:function(Text$2) {
      var Result = false;
      var character = "";
      for (var $temp5=0;$temp5<Text$2.length;$temp5++) {
         character=$uniCharAt(Text$2,$temp5);
         if (!character) continue;
         Result = ((character>="0" && character<="9")||(character>="a" && character<="f")||(character>="A" && character<="F"));
         if (!(Result)) {
            break;
         }
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
function TryStrToInt(Data$1, Value$2) {
   return TString.Examineint32(Data$1,Value$2);
};
/// TQTXIdentifiers = class (TObject)
///  [line: 739, column: 3, file: qtx.sysutils]
var TQTXIdentifiers = {
   $ClassName:"TQTXIdentifiers",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TQTXIdentifiers.MakeUniqueComponentId() : String
   ///  [line: 942, column: 32, file: qtx.sysutils]
   ,MakeUniqueComponentId:function(Self) {
      var Result = "";
      ++Counter;
      Result = "Component" + Counter.toString();
      return Result
   }
   /// function TQTXIdentifiers.MakeUniqueFormName() : String
   ///  [line: 948, column: 32, file: qtx.sysutils]
   ,MakeUniqueFormName:function(Self) {
      var Result = "";
      ++Counter;
      Result = "Form" + Counter.toString();
      return Result
   }
   /// function TQTXIdentifiers.MakeUniqueWidgetId() : String
   ///  [line: 960, column: 32, file: qtx.sysutils]
   ,MakeUniqueWidgetId$1:function(Self) {
      var Result = "";
      ++Counter;
      Result = "Widget" + Counter.toString();
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TJSVMEndianType enumeration
///  [line: 88, column: 3, file: qtx.sysutils]
var TJSVMEndianType = [ "stDefault", "stLittleEndian", "stBigEndian" ];
/// TJSVMDataType enumeration
///  [line: 73, column: 3, file: qtx.sysutils]
var TJSVMDataType = [ "dtUnknown", "dtBoolean", "dtByte", "dtChar", "dtWord", "dtLong", "dtInt16", "dtInt32", "dtFloat32", "dtFloat64", "dtString" ];
/// TInt32 = class (TObject)
///  [line: 532, column: 3, file: qtx.sysutils]
var TInt32 = {
   $ClassName:"TInt32",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TInt32.Diff(Primary: int32; Secondary: int32) : int32
   ///  [line: 1954, column: 23, file: qtx.sysutils]
   ,Diff:function(Primary, Secondary) {
      var Result = 0;
      if (Primary != Secondary) {
         if (Primary > Secondary) {
            Result = Primary - Secondary;
         } else {
            Result = Secondary - Primary;
         }
         if (Result < 0) {
            Result = (Result - 1)^(-1);
         }
      } else {
         Result = 0;
      }
      return Result
   }
   /// function TInt32.EnsureRange(Value: int32; Lowest: int32; Highest: int32) : int32
   ///  [line: 1908, column: 23, file: qtx.sysutils]
   ,EnsureRange:function(Value$2, Lowest, Highest) {
      return (Value$2 < Lowest)?Lowest:(Value$2 > Highest)?Highest:Value$2;
   }
   /// function TInt32.IsNaN(Value: int32) : Boolean
   ///  [line: 1794, column: 23, file: qtx.sysutils]
   ,IsNaN$1:function(Value$2) {
      var Result = false;
      Result = Number.isNaN(Value$2);
      return Result
   }
   /// procedure TInt32.SetBit(index: int32; Value: Boolean; var buffer: int32)
   ///  [line: 1801, column: 24, file: qtx.sysutils]
   ,SetBit:function(index$1, Value$2, buffer$1) {
      if (index$1 >= 0 && index$1 <= 31) {
         if (Value$2) {
            buffer$1.v = buffer$1.v|(1<<index$1);
         } else {
            buffer$1.v = buffer$1.v&(~(1<<index$1));
         }
      } else {
         throw Exception.Create($New(EException),$R[26]);
      }
   }
   /// function TInt32.SubtractSmallest(First: int32; Second: int32) : int32
   ///  [line: 1880, column: 23, file: qtx.sysutils]
   ,SubtractSmallest:function(First, Second) {
      var Result = 0;
      if (First < Second) {
         Result = Second - First;
      } else {
         Result = First - Second;
      }
      return Result
   }
   /// function TInt32.ToPxStr(Value: int32) : String
   ///  [line: 1846, column: 23, file: qtx.sysutils]
   ,ToPxStr:function(Value$2) {
      return Value$2.toString() + "px";
   }
   /// function TInt32.WrapRange(Value: int32; LowRange: int32; HighRange: int32) : int32
   ///  [line: 1922, column: 23, file: qtx.sysutils]
   ,WrapRange:function(Value$2, LowRange, HighRange) {
      var Result = 0;
      if (Value$2 > HighRange) {
         Result = LowRange + TInt32.Diff(HighRange,Value$2 - 1);
         if (Result > HighRange) {
            Result = TInt32.WrapRange(Result,LowRange,HighRange);
         }
      } else if (Value$2 < LowRange) {
         Result = HighRange - TInt32.Diff(LowRange,Value$2 + 1);
         if (Result < LowRange) {
            Result = TInt32.WrapRange(Result,LowRange,HighRange);
         }
      } else {
         Result = Value$2;
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TEnumState enumeration
///  [line: 160, column: 3, file: qtx.sysutils]
var TEnumState = [ "esBreak", "esContinue" ];
/// TDateUtils = class (TObject)
///  [line: 688, column: 3, file: qtx.sysutils]
var TDateUtils = {
   $ClassName:"TDateUtils",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TDateUtils.MillisecondsBetween(const aThen: TDateTime; const aNow: TDateTime) : int32
   ///  [line: 2909, column: 28, file: qtx.sysutils]
   ,MillisecondsBetween:function(Self, aThen, aNow) {
      var Result = 0;
      var lSrc = 0,
         lDst = 0;
      lSrc = TDateUtils.TimeToMilliSeconds(Self,aNow);
      lDst = TDateUtils.TimeToMilliSeconds(Self,aThen);
      Result = Math.max(lSrc,lDst) - Math.min(lSrc,lDst);
      return Result
   }
   /// function TDateUtils.SecondsBetween(const aThen: TDateTime; const aNow: TDateTime) : int32
   ///  [line: 2904, column: 28, file: qtx.sysutils]
   ,SecondsBetween:function(Self, aThen, aNow) {
      return Math.round(TDateUtils.MillisecondsBetween(Self,aThen,aNow) / 1000);
   }
   /// function TDateUtils.TimeToMilliSeconds(const Value: TDateTime) : int32
   ///  [line: 2940, column: 28, file: qtx.sysutils]
   ,TimeToMilliSeconds:function(Self, Value$2) {
      var Result = 0;
      var mHour = { v : 0 },
         mMinute = { v : 0 },
         mSecond = { v : 0 },
         mMsec = { v : 0 };
      DecodeTime(Number(Value$2),mHour,mMinute,mSecond,mMsec,0);
      Result = mHour.v * 3600000 + mMinute.v * 60000 + mSecond.v * 1000 + mMsec.v;
      return Result
   }
   /// function TDateUtils.ToJsDate(const Value: TDateTime) : JDate
   ///  [line: 2996, column: 28, file: qtx.sysutils]
   ,ToJsDate:function(Self, Value$2) {
      var Result = null;
      Result = new Date();
      Result.setTime(Math.round((Value$2 - 25569) * 86400000));
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TDataTypeConverter = class (TObject)
///  [line: 432, column: 3, file: qtx.sysutils]
var TDataTypeConverter = {
   $ClassName:"TDataTypeConverter",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnEndianChanged = null;
      $.FBuffer = $.FView = null;
      $.FEndian = 0;
      $.FTyped = null;
   }
   /// function TDataTypeConverter.BooleanToBytes(const Value: Boolean) : TUInt8Array
   ///  [line: 2476, column: 35, file: qtx.sysutils]
   ,BooleanToBytes:function(Value$2) {
      var Result = [];
      Result.push((Value$2)?1:0);
      return Result
   }
   /// function TDataTypeConverter.BytesToBoolean(const Data: TUInt8Array) : Boolean
   ///  [line: 2673, column: 29, file: qtx.sysutils]
   ,BytesToBoolean:function(Self, Data$1) {
      return Data$1[0] > 0;
   }
   /// function TDataTypeConverter.BytesToFloat32(const Data: TUInt8Array) : Float
   ///  [line: 2630, column: 29, file: qtx.sysutils]
   ,BytesToFloat32:function(Self, Data$1) {
      var Result = 0;
      Self.FView.setUint8(0,Data$1[0]);
      Self.FView.setUint8(1,Data$1[1]);
      Self.FView.setUint8(2,Data$1[2]);
      Self.FView.setUint8(3,Data$1[3]);
      switch (Self.FEndian) {
         case 0 :
            Result = Self.FView.getFloat32(0);
            break;
         case 1 :
            Result = Self.FView.getFloat32(0,true);
            break;
         case 2 :
            Result = Self.FView.getFloat32(0,false);
            break;
      }
      return Result
   }
   /// function TDataTypeConverter.BytesToFloat64(const Data: TUInt8Array) : Float
   ///  [line: 2431, column: 29, file: qtx.sysutils]
   ,BytesToFloat64:function(Self, Data$1) {
      var Result = 0;
      Self.FView.setUint8(0,Data$1[0]);
      Self.FView.setUint8(1,Data$1[1]);
      Self.FView.setUint8(2,Data$1[2]);
      Self.FView.setUint8(3,Data$1[3]);
      Self.FView.setUint8(4,Data$1[4]);
      Self.FView.setUint8(5,Data$1[5]);
      Self.FView.setUint8(6,Data$1[6]);
      Self.FView.setUint8(7,Data$1[7]);
      switch (Self.FEndian) {
         case 0 :
            Result = Self.FView.getFloat64(0);
            break;
         case 1 :
            Result = Self.FView.getFloat64(0,true);
            break;
         case 2 :
            Result = Self.FView.getFloat64(0,false);
            break;
      }
      return Result
   }
   /// function TDataTypeConverter.BytesToInt16(const Data: TUInt8Array) : smallint
   ///  [line: 2449, column: 29, file: qtx.sysutils]
   ,BytesToInt16:function(Self, Data$1) {
      var Result = 0;
      Self.FView.setUint8(0,Data$1[0]);
      Self.FView.setUint8(1,Data$1[1]);
      switch (Self.FEndian) {
         case 0 :
            Result = Self.FView.getInt16(0);
            break;
         case 1 :
            Result = Self.FView.getInt16(0,true);
            break;
         case 2 :
            Result = Self.FView.getInt16(0,false);
            break;
      }
      return Result
   }
   /// function TDataTypeConverter.BytesToInt32(const Data: TUInt8Array) : int32
   ///  [line: 2380, column: 29, file: qtx.sysutils]
   ,BytesToInt32:function(Self, Data$1) {
      var Result = 0;
      Self.FView.setUint8(0,Data$1[0]);
      Self.FView.setUint8(1,Data$1[1]);
      Self.FView.setUint8(2,Data$1[2]);
      Self.FView.setUint8(3,Data$1[3]);
      switch (Self.FEndian) {
         case 0 :
            Result = Self.FView.getInt32(0);
            break;
         case 1 :
            Result = Self.FView.getInt32(0,true);
            break;
         case 2 :
            Result = Self.FView.getInt32(0,false);
            break;
      }
      return Result
   }
   /// function TDataTypeConverter.BytesToString(const Data: TUInt8Array) : String
   ///  [line: 2365, column: 29, file: qtx.sysutils]
   ,BytesToString:function(Self, Data$1) {
      var Result = "";
      var LTemp = null,
         Codec__ = null;
      if (Data$1.length > 0) {
         LTemp = new Uint8Array(Data$1.length);
         (LTemp).set(Data$1, 0);
         Codec__ = new TextDecoder("utf8");
         Result = Codec__.decode(LTemp);
         Codec__ = null;
      }
      return Result
   }
   /// function TDataTypeConverter.BytesToTypedArray(const Values: TUInt8Array) : TMemoryHandle
   ///  [line: 2461, column: 29, file: qtx.sysutils]
   ,BytesToTypedArray:function(Self, Values$6) {
      var Result = undefined;
      var LLen = 0;
      LLen = Values$6.length;
      Result = new Uint8Array(LLen);
      (Result).set(Values$6, 0);
      return Result
   }
   /// function TDataTypeConverter.BytesToUInt16(const Data: TUInt8Array) : word
   ///  [line: 2505, column: 29, file: qtx.sysutils]
   ,BytesToUInt16:function(Self, Data$1) {
      var Result = 0;
      Self.FView.setUint8(0,Data$1[0]);
      Self.FView.setUint8(1,Data$1[1]);
      switch (Self.FEndian) {
         case 0 :
            Result = Self.FView.getUint16(0);
            break;
         case 1 :
            Result = Self.FView.getUint16(0,true);
            break;
         case 2 :
            Result = Self.FView.getUint16(0,false);
            break;
      }
      return Result
   }
   /// function TDataTypeConverter.BytesToUInt32(const Data: TUInt8Array) : longword
   ///  [line: 2285, column: 29, file: qtx.sysutils]
   ,BytesToUInt32:function(Self, Data$1) {
      var Result = 0;
      Self.FView.setUint8(0,Data$1[0]);
      Self.FView.setUint8(1,Data$1[1]);
      Self.FView.setUint8(2,Data$1[2]);
      Self.FView.setUint8(3,Data$1[3]);
      switch (Self.FEndian) {
         case 0 :
            Result = Self.FView.getUint32(0);
            break;
         case 1 :
            Result = Self.FView.getUint32(0,true);
            break;
         case 2 :
            Result = Self.FView.getUint32(0,false);
            break;
      }
      return Result
   }
   /// function TDataTypeConverter.BytesToVariant(Data: TUInt8Array) : Variant
   ///  [line: 2529, column: 29, file: qtx.sysutils]
   ,BytesToVariant:function(Self, Data$1) {
      var Result = undefined;
      var LType$1 = 0;
      LType$1 = Data$1[0];
      Data$1.shift();
      switch (LType$1) {
         case 17 :
            Result = TDataTypeConverter.BytesToBoolean(Self,Data$1);
            break;
         case 18 :
            Result = Data$1[0];
            break;
         case 24 :
            Result = TDataTypeConverter.BytesToUInt16(Self,Data$1);
            break;
         case 25 :
            Result = TDataTypeConverter.BytesToUInt32(Self,Data$1);
            break;
         case 19 :
            Result = TDataTypeConverter.BytesToInt16(Self,Data$1);
            break;
         case 20 :
            Result = TDataTypeConverter.BytesToInt32(Self,Data$1);
            break;
         case 21 :
            Result = TDataTypeConverter.BytesToFloat32(Self,Data$1);
            break;
         case 22 :
            Result = TDataTypeConverter.BytesToFloat64(Self,Data$1);
            break;
         case 23 :
            Result = TString.DecodeUTF8(Data$1);
            break;
         default :
            throw EException.CreateFmt($New(EConvertError),$R[27],[IntToHex2(LType$1)]);
      }
      return Result
   }
   /// function TDataTypeConverter.ByteToChar(const Value: byte) : char
   ///  [line: 2691, column: 35, file: qtx.sysutils]
   ,ByteToChar:function(Value$2) {
      var Result = "";
      Result = String.fromCharCode(Value$2);
      return Result
   }
   /// function TDataTypeConverter.CharToByte(const Value: char) : word
   ///  [line: 2487, column: 35, file: qtx.sysutils]
   ,CharToByte:function(Value$2) {
      var Result = 0;
      Result = (Value$2).charCodeAt(0);
      return Result
   }
   /// constructor TDataTypeConverter.Create()
   ///  [line: 2042, column: 32, file: qtx.sysutils]
   ,Create$13:function(Self) {
      TObject.Create(Self);
      Self.FBuffer = new ArrayBuffer(16);
    Self.FView   = new DataView(Self.FBuffer);
      Self.FTyped = new Uint8Array(Self.FBuffer,0,15);
      return Self
   }
   /// destructor TDataTypeConverter.Destroy()
   ///  [line: 2052, column: 31, file: qtx.sysutils]
   ,Destroy:function(Self) {
      Self.FTyped = null;
      Self.FView = null;
      Self.FBuffer = null;
      TObject.Destroy(Self);
   }
   /// function TDataTypeConverter.Float32ToBytes(const Value: float32) : TUInt8Array
   ///  [line: 2517, column: 29, file: qtx.sysutils]
   ,Float32ToBytes:function(Self, Value$2) {
      var Result = [];
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setFloat32(0,Value$2);
            break;
         case 1 :
            Self.FView.setFloat32(0,Value$2,true);
            break;
         case 2 :
            Self.FView.setFloat32(0,Value$2,false);
            break;
      }
      Result = Array.prototype.slice.call( Self.FTyped, 0, 4 );
      return Result
   }
   /// function TDataTypeConverter.Float64ToBytes(const Value: float64) : TUInt8Array
   ///  [line: 2310, column: 29, file: qtx.sysutils]
   ,Float64ToBytes:function(Self, Value$2) {
      var Result = [];
      var LTypeSize = 0;
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setFloat64(0,Number(Value$2));
            break;
         case 1 :
            Self.FView.setFloat64(0,Number(Value$2),true);
            break;
         case 2 :
            Self.FView.setFloat64(0,Number(Value$2),false);
            break;
      }
      LTypeSize = __SIZES[9];
      --LTypeSize;
      Result = Array.prototype.slice.call( Self.FTyped, 0, LTypeSize );
      return Result
   }
   /// function TDataTypeConverter.InitInt08(const Value: int8) : int8
   ///  [line: 2153, column: 35, file: qtx.sysutils]
   ,InitInt08:function(Value$2) {
      var Result = 0;
      var temp = null;
      temp = new Int8Array(1);
      temp[0]=((Value$2 < -128)?-128:(Value$2 > 127)?127:Value$2);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.InitInt16(const Value: int16) : int16
   ///  [line: 2146, column: 35, file: qtx.sysutils]
   ,InitInt16:function(Value$2) {
      var Result = 0;
      var temp = null;
      temp = new Int16Array(1);
      temp[0]=((Value$2 < -32768)?-32768:(Value$2 > 32767)?32767:Value$2);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.InitInt32(const Value: int32) : int32
   ///  [line: 2139, column: 35, file: qtx.sysutils]
   ,InitInt32:function(Value$2) {
      var Result = 0;
      var temp = null;
      temp = new Int32Array(1);
      temp[0]=((Value$2 < -2147483648)?-2147483648:(Value$2 > 2147483647)?2147483647:Value$2);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.InitUint08(const Value: uint8) : uint8
   ///  [line: 2174, column: 35, file: qtx.sysutils]
   ,InitUint08:function(Value$2) {
      var Result = 0;
      var LTemp = null;
      LTemp = new Uint8Array(1);
      LTemp[0]=((Value$2 < 0)?0:(Value$2 > 255)?255:Value$2);
      Result = LTemp[0];
      return Result
   }
   /// function TDataTypeConverter.InitUint16(const Value: uint16) : uint16
   ///  [line: 2167, column: 35, file: qtx.sysutils]
   ,InitUint16:function(Value$2) {
      var Result = 0;
      var temp = null;
      temp = new Uint16Array(1);
      temp[0]=((Value$2 < 0)?0:(Value$2 > 65536)?65536:Value$2);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.InitUint32(const Value: uint32) : uint32
   ///  [line: 2160, column: 35, file: qtx.sysutils]
   ,InitUint32:function(Value$2) {
      var Result = 0;
      var temp = null;
      temp = new Uint32Array(1);
      temp[0]=((Value$2 < 0)?0:(Value$2 > 4294967295)?4294967295:Value$2);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.Int16ToBytes(const Value: int16) : TUInt8Array
   ///  [line: 2644, column: 29, file: qtx.sysutils]
   ,Int16ToBytes:function(Self, Value$2) {
      var Result = [];
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setInt16(0,Value$2);
            break;
         case 1 :
            Self.FView.setInt16(0,Value$2,true);
            break;
         case 2 :
            Self.FView.setInt16(0,Value$2,false);
            break;
      }
      Result = Array.prototype.slice.call( Self.FTyped, 0, 2 );
      return Result
   }
   /// function TDataTypeConverter.Int32ToBytes(const Value: int32) : TUInt8Array
   ///  [line: 2255, column: 29, file: qtx.sysutils]
   ,Int32ToBytes:function(Self, Value$2) {
      var Result = [];
      var LTypeSize = 0;
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setInt32(0,Value$2);
            break;
         case 1 :
            Self.FView.setInt32(0,Value$2,true);
            break;
         case 2 :
            Self.FView.setInt32(0,Value$2,false);
            break;
      }
      LTypeSize = __SIZES[7];
      Result = Array.prototype.slice.call( Self.FTyped, 0, LTypeSize );
      return Result
   }
   /// procedure TDataTypeConverter.SetEndian(const NewEndian: TJSVMEndianType)
   ///  [line: 2060, column: 30, file: qtx.sysutils]
   ,SetEndian:function(Self, NewEndian) {
      if (NewEndian != Self.FEndian) {
         Self.FEndian = NewEndian;
         if (Self.OnEndianChanged) {
            Self.OnEndianChanged(Self);
         }
      }
   }
   /// function TDataTypeConverter.SizeOfType(const Kind: TJSVMDataType) : int32
   ///  [line: 2096, column: 35, file: qtx.sysutils]
   ,SizeOfType:function(Kind) {
      return __SIZES[Kind];
   }
   /// function TDataTypeConverter.StringToBytes(const Value: String) : TUInt8Array
   ///  [line: 2325, column: 29, file: qtx.sysutils]
   ,StringToBytes:function(Self, Value$2) {
      var Result = [];
      var Codec__ = null,
         rw = null;
      if (Value$2.length > 0) {
         Codec__ = new TextEncoder("utf8");
         rw = Codec__.encode(Value$2);
         Codec__ = null;
         Result = Array.prototype.slice.call(rw, 0, (rw).byteLength);
         rw = null;
      } else {
         Result = [];
      }
      return Result
   }
   /// function TDataTypeConverter.SystemEndian() : TJSVMEndianType
   ///  [line: 2071, column: 35, file: qtx.sysutils]
   ,SystemEndian:function() {
      var Result = 0;
      var LLittle = 0,
         LBig = 0;
      LLittle = 1;
      LBig = 2;
      try {
         var LBuffer = new ArrayBuffer(2);
      var L8Array = new Uint8Array(LBuffer);
      var L16array = new Uint16Array(LBuffer);
      L8Array[0] = 0xAA;
      L8Array[1] = 0xBB;
      if(L16array[0] === 0xBBAA) {
        Result = LLittle;
      } else {
        if (L16array[0] === 0xAABB) Result = LBig;
      }
      } catch ($e) {
         /* null */
      }
      return Result
   }
   /// function TDataTypeConverter.TypedArrayToBytes(const Value: TMemoryHandle) : TUInt8Array
   ///  [line: 2299, column: 35, file: qtx.sysutils]
   ,TypedArrayToBytes:function(Value$2) {
      var Result = [];
      if (Value$2) {
         Result = Array.prototype.slice.call(Value$2);
      } else {
         throw Exception.Create($New(EConvertError),"Failed to convert, handle is nil or unassigned error");
      }
      return Result
   }
   /// function TDataTypeConverter.UInt16ToBytes(const Value: uint16) : TUInt8Array
   ///  [line: 2656, column: 29, file: qtx.sysutils]
   ,UInt16ToBytes:function(Self, Value$2) {
      var Result = [];
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setUint16(0,Value$2);
            break;
         case 1 :
            Self.FView.setUint16(0,Value$2,true);
            break;
         case 2 :
            Self.FView.setUint16(0,Value$2,false);
            break;
      }
      Result = Array.prototype.slice.call( Self.FTyped, 0, 2 );
      return Result
   }
   /// function TDataTypeConverter.UInt32ToBytes(const Value: uint32) : TUInt8Array
   ///  [line: 2270, column: 29, file: qtx.sysutils]
   ,UInt32ToBytes:function(Self, Value$2) {
      var Result = [];
      var LTypeSize = 0;
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setUint32(0,Value$2);
            break;
         case 1 :
            Self.FView.setUint32(0,Value$2,true);
            break;
         case 2 :
            Self.FView.setUint32(0,Value$2,false);
            break;
      }
      LTypeSize = __SIZES[5];
      Result = Array.prototype.slice.call( Self.FTyped, 0, LTypeSize );
      return Result
   }
   /// function TDataTypeConverter.VariantToBytes(const Value: Variant) : TUInt8Array
   ///  [line: 2551, column: 29, file: qtx.sysutils]
   ,VariantToBytes:function(Self, Value$2) {
      var Result = [];
      var LType$1 = 0;
      function GetUnSignedIntType() {
         var Result = 0;
         if (Value$2 <= 255) {
            return 18;
         }
         if (Value$2 <= 65536) {
            return 24;
         }
         if (Value$2 <= 2147483647) {
            Result = 25;
         }
         return Result
      };
      function GetSignedIntType() {
         var Result = 0;
         if (Value$2 > -32768) {
            return 19;
         }
         if (Value$2 > -2147483648) {
            Result = 20;
         }
         return Result
      };
      function IsFloat32(x$5) {
         var Result = false;
         Result = isFinite(x$5) && x$5 == Math.fround(x$5);
         return Result
      };
      switch (TVariant.ExamineType(Value$2)) {
         case 2 :
            Result = [17];
            Result.pusha(TDataTypeConverter.BooleanToBytes($VarToBool(Value$2)));
            break;
         case 3 :
            if (Value$2 < 0) {
               LType$1 = GetSignedIntType();
            } else {
               LType$1 = GetUnSignedIntType();
            }
            if (LType$1) {
               Result = [LType$1];
               switch (LType$1) {
                  case 18 :
                     Result.push(TDataTypeConverter.InitInt08($VarToInt(Value$2,"")));
                     break;
                  case 24 :
                     Result.pusha(TDataTypeConverter.UInt16ToBytes(Self,TDataTypeConverter.InitUint16($VarToInt(Value$2,""))));
                     break;
                  case 25 :
                     Result.pusha(TDataTypeConverter.UInt32ToBytes(Self,TDataTypeConverter.InitUint32($VarToInt(Value$2,""))));
                     break;
                  case 19 :
                     Result.pusha(TDataTypeConverter.Int16ToBytes(Self,TDataTypeConverter.InitInt16($VarToInt(Value$2,""))));
                     break;
                  case 20 :
                     Result.pusha(TDataTypeConverter.Int32ToBytes(Self,TDataTypeConverter.InitInt32($VarToInt(Value$2,""))));
                     break;
               }
            } else {
               throw Exception.Create($New(EConvertError),$R[28]);
            }
            break;
         case 4 :
            if (IsFloat32(Value$2)) {
               Result = [21];
               Result.pusha(TDataTypeConverter.Float32ToBytes(Self,Number(Value$2)));
            } else {
               Result = [22];
               Result.pusha(TDataTypeConverter.Float64ToBytes(Self,Number(Value$2)));
            }
            break;
         case 5 :
            Result = [23];
            Result.pusha(TString.EncodeUTF8(String(Value$2)));
            break;
         default :
            throw Exception.Create($New(EConvertError),$R[29]);
      }
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$13$:function($){return $.ClassType.Create$13($)}
};
function NodeJs() {
   var Result = false;
   Result = (typeof process !== 'undefined') && (process.release.name.search(/node|io.js/) !== -1);
   return Result
};
/// JTimeStamp = record
///  [line: 683, column: 3, file: qtx.sysutils]
function Copy$JTimeStamp(s,d) {
   return d;
}
function Clone$JTimeStamp($) {
   return {

   }
}
/// JFileItemType enumeration
///  [line: 765, column: 3, file: qtx.sysutils]
var JFileItemType = [ "wtFile", "wtFolder" ];
/// JFileItem = class (JObject)
///  [line: 770, column: 3, file: qtx.sysutils]
function JFileItem() {
}
$Extend(Object,JFileItem,
   {
      "diFileName" : "",
      "diFileType" : 0,
      "diFileSize" : 0,
      "diFileMode" : "",
      "diCreated" : undefined,
      "diModified" : undefined
   });

/// EException = class (Exception)
///  [line: 398, column: 3, file: qtx.sysutils]
var EException = {
   $ClassName:"EException",$Parent:Exception
   ,$Init:function ($) {
      Exception.$Init($);
   }
   /// constructor EException.CreateFmt(Message: String; const Values: array of const)
   ///  [line: 2702, column: 24, file: qtx.sysutils]
   ,CreateFmt:function(Self, Message$1, Values$6) {
      Exception.Create(Self,Format(Message$1,Values$6.slice(0)));
      return Self
   }
   ,Destroy:Exception.Destroy
};
/// EQTXException = class (EException)
///  [line: 404, column: 3, file: qtx.sysutils]
var EQTXException = {
   $ClassName:"EQTXException",$Parent:EException
   ,$Init:function ($) {
      EException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EConvertError = class (EQTXException)
///  [line: 406, column: 3, file: qtx.sysutils]
var EConvertError = {
   $ClassName:"EConvertError",$Parent:EQTXException
   ,$Init:function ($) {
      EQTXException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EConvertBinaryStringInvalid = class (EConvertError)
var EConvertBinaryStringInvalid = {
   $ClassName:"EConvertBinaryStringInvalid",$Parent:EConvertError
   ,$Init:function ($) {
      EConvertError.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TTypeLookup = record
///  [line: 844, column: 3, file: qtx.sysutils]
function Copy$TTypeLookup(s,d) {
   d.Boolean=s.Boolean;
   d.Number$1=s.Number$1;
   d.String$1=s.String$1;
   d.Object$2=s.Object$2;
   d.Undefined=s.Undefined;
   d.Function$1=s.Function$1;
   return d;
}
function Clone$TTypeLookup($) {
   return {
      Boolean:$.Boolean,
      Number$1:$.Number$1,
      String$1:$.String$1,
      Object$2:$.Object$2,
      Undefined:$.Undefined,
      Function$1:$.Function$1
   }
}
/// TQTXErrorObject = class (TObject)
///  [line: 184, column: 3, file: qtx.classes]
var TQTXErrorObject = {
   $ClassName:"TQTXErrorObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FOptions = [0];
   }
   /// constructor TQTXErrorObject.Create()
   ///  [line: 1182, column: 29, file: qtx.classes]
   ,Create$8:function(Self) {
      TObject.Create(Self);
      Self.FOptions = [1];
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TQTXOwnedObject = class (TQTXErrorObject)
///  [line: 311, column: 3, file: qtx.classes]
var TQTXOwnedObject = {
   $ClassName:"TQTXOwnedObject",$Parent:TQTXErrorObject
   ,$Init:function ($) {
      TQTXErrorObject.$Init($);
      $.FOwner = null;
   }
   /// function TQTXOwnedObject.GetOwner() : TObject
   ///  [line: 461, column: 26, file: qtx.classes]
   ,GetOwner:function(Self) {
      return Self.FOwner;
   }
   /// procedure TQTXOwnedObject.SetOwner(NewOwner: TObject)
   ///  [line: 471, column: 27, file: qtx.classes]
   ,SetOwner:function(Self, NewOwner) {
      if (NewOwner !== Self.FOwner) {
         if (TQTXOwnedObject.AcceptOwner(Self,NewOwner)) {
            Self.FOwner = NewOwner;
         } else {
            throw EException.CreateFmt($New(EQTXOwnedObject),"Owner was rejected in %s.%s error",[TObject.ClassName(Self.ClassType), "TQTXOwnedObject.SetOwner"]);
         }
      }
   }
   /// function TQTXOwnedObject.AcceptOwner(CandidateObject: TObject) : Boolean
   ///  [line: 466, column: 26, file: qtx.classes]
   ,AcceptOwner:function(Self, CandidateObject) {
      return true;
   }
   /// constructor TQTXOwnedObject.Create(AOwner: TObject)
   ///  [line: 455, column: 29, file: qtx.classes]
   ,Create$9:function(Self, AOwner) {
      TQTXErrorObject.Create$8(Self);
      TQTXOwnedObject.SetOwner(Self,AOwner);
      return Self
   }
   ,Destroy:TObject.Destroy
   ,Create$9$:function($){return $.ClassType.Create$9.apply($.ClassType, arguments)}
};
TQTXOwnedObject.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXComponent = class (TQTXOwnedObject)
///  [line: 359, column: 3, file: qtx.classes]
var TQTXComponent = {
   $ClassName:"TQTXComponent",$Parent:TQTXOwnedObject
   ,$Init:function ($) {
      TQTXOwnedObject.$Init($);
      $.FHandle = undefined;
      $.FName = "";
   }
   /// constructor TQTXComponent.Create(AOwner: TQTXComponent; CB: TQTXComponentConstructor)
   ///  [line: 408, column: 27, file: qtx.classes]
   ,Create$10:function(Self, AOwner, CB) {
      TQTXOwnedObject.Create$9(Self,AOwner);
      TQTXComponent.SetName(Self,TQTXComponent.GetInstanceName$(Self));
      if (CB) {
         CB(Self);
      }
      return Self
   }
   /// function TQTXComponent.GetHandle() : THandle
   ///  [line: 426, column: 24, file: qtx.classes]
   ,GetHandle:function(Self) {
      return Self.FHandle;
   }
   /// function TQTXComponent.GetInstanceName() : String
   ///  [line: 446, column: 24, file: qtx.classes]
   ,GetInstanceName:function(Self) {
      return TQTXIdentifiers.MakeUniqueComponentId(TQTXIdentifiers);
   }
   /// function TQTXComponent.GetName() : String
   ///  [line: 436, column: 24, file: qtx.classes]
   ,GetName:function(Self) {
      return Self.FName;
   }
   /// function TQTXComponent.GetOwner() : TQTXComponent
   ///  [line: 421, column: 24, file: qtx.classes]
   ,GetOwner$1:function(Self) {
      return $As(TQTXOwnedObject.GetOwner(Self),TQTXComponent);
   }
   /// procedure TQTXComponent.SetHandle(Value: THandle)
   ///  [line: 431, column: 25, file: qtx.classes]
   ,SetHandle:function(Self, Value$2) {
      Self.FHandle = Value$2;
   }
   /// procedure TQTXComponent.SetName(Value: String)
   ///  [line: 441, column: 25, file: qtx.classes]
   ,SetName:function(Self, Value$2) {
      Self.FName = Value$2;
   }
   /// procedure TQTXComponent.SetOwner(NewOwner: TQTXComponent)
   ///  [line: 416, column: 25, file: qtx.classes]
   ,SetOwner$1:function(Self, NewOwner) {
      TQTXOwnedObject.SetOwner(Self,NewOwner);
   }
   ,Destroy:TObject.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10$:function($){return $.ClassType.Create$10.apply($.ClassType, arguments)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetInstanceName$:function($){return $.ClassType.GetInstanceName($)}
   ,SetOwner$1$:function($){return $.ClassType.SetOwner$1.apply($.ClassType, arguments)}
};
TQTXComponent.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// EQTXOwnedObject = class (EQTXException)
var EQTXOwnedObject = {
   $ClassName:"EQTXOwnedObject",$Parent:EQTXException
   ,$Init:function ($) {
      EQTXException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TManagedMemory = class (TDataTypeConverter)
///  [line: 50, column: 3, file: qtx.memory]
var TManagedMemory = {
   $ClassName:"TManagedMemory",$Parent:TDataTypeConverter
   ,$Init:function ($) {
      TDataTypeConverter.$Init($);
      $.OnMemoryReleased = null;
      $.OnMemoryAllocated = null;
      $.FArray = null;
      $.FBuffer$1 = $.FView$1 = null;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 66, column: 34, file: qtx.memory]
   ,a$929:function(Self) {
      var Result = 0;
      Result = (Self.FBuffer$1 !== null)?Self.FBuffer$1.byteLength:0;
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 65, column: 38, file: qtx.memory]
   ,a$928:function(Self) {
      var Result = false;
      Result = Self.FBuffer$1 === null;
      return Result
   }
   /// procedure TManagedMemory.AfterAllocate()
   ///  [line: 393, column: 26, file: qtx.memory]
   ,AfterAllocate:function(Self) {
      if (Self.OnMemoryAllocated) {
         Self.OnMemoryAllocated(Self);
      }
   }
   /// procedure TManagedMemory.AfterRelease()
   ///  [line: 399, column: 26, file: qtx.memory]
   ,AfterRelease:function(Self) {
      if (Self.OnMemoryReleased) {
         Self.OnMemoryReleased(Self);
      }
   }
   /// procedure TManagedMemory.Allocate(BytesToAllocate: int64)
   ///  [line: 405, column: 26, file: qtx.memory]
   ,Allocate:function(Self, BytesToAllocate) {
      BytesToAllocate = { v : BytesToAllocate };
      if (Self.FBuffer$1 !== null) {
         TManagedMemory.Release(Self);
      }
      if (BytesToAllocate.v > 0) {
         TManagedMemory.BeforeAllocate(Self,BytesToAllocate);
         try {
            Self.FBuffer$1 = new ArrayBuffer(BytesToAllocate.v);
            Self.FView$1 = new DataView(Self.FBuffer$1);
            Self.FArray = new Uint8Array(Self.FBuffer$1);
         } catch ($e) {
            var e$1 = $W($e);
            Self.FBuffer$1 = null;
            Self.FView$1 = null;
            Self.FArray = null;
            throw $e;
         }
         TManagedMemory.AfterAllocate(Self);
      } else {
         throw Exception.Create($New(EManagedMemory),"Invalid size to allocate, value must be positive");
      }
   }
   /// procedure TManagedMemory.Append(Data: TUInt8Array)
   ///  [line: 230, column: 26, file: qtx.memory]
   ,Append:function(Self, Data$1) {
      var lOffset = 0;
      if (Data$1.length > 0) {
         lOffset = (Self.FBuffer$1 !== null)?TManagedMemory.a$929(Self):0;
         TManagedMemory.Grow(Self,Data$1.length);
         TManagedMemory.WriteBuffer(Self,lOffset,Data$1);
      }
   }
   /// procedure TManagedMemory.Assign(Memory: IManagedData)
   ///  [line: 211, column: 26, file: qtx.memory]
   ,Assign$1:function(Self, Memory$1) {
      var LSize = 0;
      if (Memory$1===null) {
         TManagedMemory.Release(Self);
         return;
      }
      LSize = Memory$1[2]();
      if (LSize < 1) {
         TManagedMemory.Release(Self);
         return;
      }
      TManagedMemory.Allocate(Self,LSize);
      Self.FArray.set(Memory$1[0](),0);
   }
   /// procedure TManagedMemory.BeforeAllocate(var NewSize: int32)
   ///  [line: 389, column: 26, file: qtx.memory]
   ,BeforeAllocate:function(Self, NewSize) {
      /* null */
   }
   /// procedure TManagedMemory.BeforeRelease()
   ///  [line: 385, column: 26, file: qtx.memory]
   ,BeforeRelease:function(Self) {
      /* null */
   }
   /// destructor TManagedMemory.Destroy()
   ///  [line: 168, column: 27, file: qtx.memory]
   ,Destroy:function(Self) {
      if (Self.FBuffer$1 !== null) {
         TManagedMemory.Release(Self);
      }
      TDataTypeConverter.Destroy(Self);
   }
   /// procedure TManagedMemory.FromBytes(Bytes: TUInt8Array)
   ///  [line: 329, column: 26, file: qtx.memory]
   ,FromBytes:function(Self, Bytes) {
      var LLen = 0;
      if (Self.FBuffer$1 !== null) {
         TManagedMemory.Release(Self);
      }
      LLen = Bytes.length;
      if (LLen > 0) {
         TManagedMemory.Allocate(Self,LLen);
         (Self.FArray).set(Bytes, 0);
      }
   }
   /// function TManagedMemory.GetPosition() : int64
   ///  [line: 175, column: 25, file: qtx.memory]
   ,GetPosition:function(Self) {
      return 0;
   }
   /// function TManagedMemory.GetSize() : int64
   ///  [line: 180, column: 25, file: qtx.memory]
   ,GetSize:function(Self) {
      return (Self.FBuffer$1 !== null)?Self.FBuffer$1.byteLength:0;
   }
   /// procedure TManagedMemory.Grow(BytesToGrow: int32)
   ///  [line: 312, column: 26, file: qtx.memory]
   ,Grow:function(Self, BytesToGrow) {
      var LOldData = [];
      if (BytesToGrow > 0) {
         if (Self.FBuffer$1 !== null) {
            LOldData = TManagedMemory.ToBytes(Self);
         }
         TManagedMemory.Allocate(Self,TManagedMemory.a$929(Self) + BytesToGrow);
         if (LOldData.length > 0) {
            TManagedMemory.WriteBuffer(Self,0,LOldData);
         }
      } else {
         throw Exception.Create($New(EManagedMemory),"Invalid growth value, expected 1 or above error");
      }
   }
   /// function TManagedMemory.ReadBuffer(Offset: int64; ReadLen: int64) : TUInt8Array
   ///  [line: 354, column: 25, file: qtx.memory]
   ,ReadBuffer:function(Self, Offset$2, ReadLen) {
      var Result = [];
      var LTemp = null;
      if (Self.FBuffer$1 === null) {
         throw Exception.Create($New(EManagedMemory),"Read failed, buffer is empty error");
      }
      if (ReadLen < 1) {
         return null;
      }
      if (Offset$2 < 0 || Offset$2 >= TManagedMemory.a$929(Self)) {
         throw Exception.Create($New(EManagedMemory),"Invalid offset, expected 0.."+(TManagedMemory.a$929(Self) - 1).toString()+" not "+Offset$2.toString()+" error");
      }
      LTemp = Self.FArray.subarray(Offset$2,Offset$2 + ReadLen);
      Result = Array.prototype.slice.call(LTemp);
      return Result
   }
   /// procedure TManagedMemory.Release()
   ///  [line: 432, column: 26, file: qtx.memory]
   ,Release:function(Self) {
      if (Self.FBuffer$1 !== null) {
         try {
            try {
               TManagedMemory.BeforeRelease(Self);
            } finally {
               Self.FArray = null;
               Self.FView$1 = null;
               Self.FBuffer$1 = null;
            }
         } finally {
            TManagedMemory.AfterRelease(Self);
         }
      }
   }
   /// procedure TManagedMemory.ScaleTo(NewSize: int64)
   ///  [line: 297, column: 26, file: qtx.memory]
   ,ScaleTo:function(Self, NewSize) {
      if (NewSize > 0) {
         if (NewSize != TManagedMemory.a$929(Self)) {
            if (NewSize > TManagedMemory.a$929(Self)) {
               TManagedMemory.Grow(Self,NewSize - TManagedMemory.a$929(Self));
            } else {
               TManagedMemory.Shrink(Self,TManagedMemory.a$929(Self) - NewSize);
            }
         }
      } else {
         TManagedMemory.Release(Self);
      }
   }
   /// procedure TManagedMemory.Shrink(BytesToShrink: int32)
   ///  [line: 185, column: 26, file: qtx.memory]
   ,Shrink:function(Self, BytesToShrink) {
      var LNewSize = 0,
         LCache = [];
      if (BytesToShrink > 0) {
         LNewSize = TManagedMemory.a$929(Self) - BytesToShrink;
         if (LNewSize <= 0) {
            TManagedMemory.Release(Self);
            return;
         }
         LCache = TManagedMemory.ReadBuffer(Self,0,LNewSize);
         TManagedMemory.Allocate(Self,LNewSize);
         TManagedMemory.WriteBuffer(Self,0,LCache);
      } else {
         throw Exception.Create($New(EManagedMemory),"Invalid shrink value, expected 1 or above error");
      }
   }
   /// function TManagedMemory.ToBytes() : TUInt8Array
   ///  [line: 344, column: 25, file: qtx.memory]
   ,ToBytes:function(Self) {
      var Result = [];
      if (Self.FBuffer$1 !== null) {
         Result = Array.prototype.slice.call(Self.FArray);
      }
      return Result
   }
   /// procedure TManagedMemory.WriteBuffer(Offset: int64; Data: TUInt8Array)
   ///  [line: 371, column: 26, file: qtx.memory]
   ,WriteBuffer:function(Self, Offset$2, Data$1) {
      if (Self.FBuffer$1 === null) {
         throw Exception.Create($New(EManagedMemory),"Write failed, buffer is empty error");
      }
      if (Data$1.length < 1) {
         return;
      }
      if (Offset$2 < 0 || Offset$2 >= TManagedMemory.a$929(Self)) {
         throw Exception.Create($New(EManagedMemory),"Invalid offset, expected 0.."+(TManagedMemory.a$929(Self) - 1).toString()+" not "+Offset$2.toString()+" error");
      }
      Self.FArray.set(Data$1,Offset$2);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$13:TDataTypeConverter.Create$13
};
TManagedMemory.$Intf={
   IManagedData:[TManagedMemory.ToBytes,TManagedMemory.FromBytes,TManagedMemory.GetSize,TManagedMemory.GetPosition,TManagedMemory.ReadBuffer,TManagedMemory.WriteBuffer,TManagedMemory.Grow,TManagedMemory.Shrink,TManagedMemory.Assign$1,TManagedMemory.Append]
}
/// EManagedMemory = class (Exception)
///  [line: 30, column: 3, file: qtx.memory]
var EManagedMemory = {
   $ClassName:"EManagedMemory",$Parent:Exception
   ,$Init:function ($) {
      Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TQTXRepeatResult enumeration
var TQTXRepeatResult = { 241:"rrContinue", 242:"rrStop", 243:"rrDispose" };
/// TQTXCustomRepeater = class (TObject)
///  [line: 49, column: 3, file: qtx.time]
var TQTXCustomRepeater = {
   $ClassName:"TQTXCustomRepeater",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FActive = false;
      $.FDelay = 0;
      $.FHandle$3 = undefined;
   }
   /// procedure TQTXCustomRepeater.AllocTimer()
   ///  [line: 287, column: 30, file: qtx.time]
   ,AllocTimer:function(Self) {
      if (Self.FHandle$3) {
         TQTXCustomRepeater.FreeTimer(Self);
      }
      Self.FHandle$3 = TQTXDispatch.SetInterval(TQTXDispatch,$Event0(Self,TQTXCustomRepeater.CBExecute$),Self.FDelay);
   }
   /// destructor TQTXCustomRepeater.Destroy()
   ///  [line: 251, column: 31, file: qtx.time]
   ,Destroy:function(Self) {
      if (Self.FActive) {
         TQTXCustomRepeater.SetActive(Self,false);
      }
      TObject.Destroy(Self);
   }
   /// procedure TQTXCustomRepeater.FreeTimer()
   ///  [line: 296, column: 30, file: qtx.time]
   ,FreeTimer:function(Self) {
      if (Self.FHandle$3) {
         TQTXDispatch.ClearInterval(TQTXDispatch,Self.FHandle$3);
         Self.FHandle$3 = undefined;
      }
   }
   /// procedure TQTXCustomRepeater.SetActive(Value: Boolean)
   ///  [line: 258, column: 30, file: qtx.time]
   ,SetActive:function(Self, Value$2) {
      if (Value$2 != Self.FActive) {
         try {
            if (Self.FActive) {
               TQTXCustomRepeater.FreeTimer(Self);
            } else {
               TQTXCustomRepeater.AllocTimer(Self);
            }
         } finally {
            Self.FActive = Value$2;
         }
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,CBExecute$:function($){return $.ClassType.CBExecute($)}
};
/// TQTXDispatch = class (TObject)
///  [line: 80, column: 3, file: qtx.time]
var TQTXDispatch = {
   $ClassName:"TQTXDispatch",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TQTXDispatch.AssignedAndReady(Controls: TQTXWidgetCollection) : Boolean
   ///  [line: 1477, column: 29, file: qtx.dom.types]
   ,AssignedAndReady:function(Self, Controls$1) {
      var Result = false;
      var lScore = 0,
         a$1328 = 0,
         el = null;
      lScore = 0;
      var $temp6;
      for(a$1328=0,$temp6=Controls$1.length;a$1328<$temp6;a$1328++) {
         el = Controls$1[a$1328];
         if (el) {
            if (TVariant.ClassInstance(el)) {
               if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(el))) {
                  try {
                     if (TQTXWidget.QueryReadyState(el)) {
                        ++lScore;
                     } else {
                        break;
                     }
                  } catch ($e) {
                     var e$1 = $W($e);
                     WriteLn("Non class instance, removed");
                     $Remove(Controls$1,el,0);
                     break;
                  }
               } else {
                  break;
               }
            } else {
               break;
            }
         } else {
            break;
         }
      }
      Result = lScore == Controls$1.length;
      return Result
   }
   /// function TQTXDispatch.AssignedAndReadyInDOM(controls: TQTXWidgetCollection) : Boolean
   ///  [line: 1515, column: 29, file: qtx.dom.types]
   ,AssignedAndReadyInDOM:function(Self, controls) {
      var Result = false;
      var lScore = 0,
         a$1329 = 0,
         el = null;
      lScore = 0;
      var $temp7;
      for(a$1329=0,$temp7=controls.length;a$1329<$temp7;a$1329++) {
         el = controls[a$1329];
         if (el) {
            if (TVariant.ClassInstance(el)) {
               if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(el))) {
                  if (TQTXBrowser.GetElementReady(TQTXBrowser,TQTXComponent.GetHandle$(el),true)) {
                     if (TQTXWidget.QueryReadyState(el)) {
                        ++lScore;
                     }
                  }
               } else {
                  break;
               }
            } else {
               break;
            }
         }
      }
      Result = lScore == controls.length;
      return Result
   }
   /// procedure TQTXDispatch.CancelAnimationFrame(Handle: THandle)
   ,CancelAnimationFrame:function(Self, Handle$5) {
      __CancelAnimFrame(Handle$5);
   }
   /// procedure TQTXDispatch.CancelExecute(Handle: TQTXDispatchHandle)
   ,CancelExecute:function(Self, Handle$5) {
      clearTimeout(Handle$5);
   }
   /// procedure TQTXDispatch.ClearInterval(Handle: TQTXDispatchHandle)
   ///  [line: 150, column: 30, file: qtx.time]
   ,ClearInterval:function(Self, Handle$5) {
      clearInterval(Handle$5);
   }
   /// procedure TQTXDispatch.ClearTimeOut(Handle: TQTXDispatchHandle)
   ,ClearTimeOut:function(Self, Handle$5) {
      clearTimeout(Handle$5);
   }
   /// function TQTXDispatch.DocumentReady() : Boolean
   ///  [line: 1593, column: 29, file: qtx.dom.types]
   ,DocumentReady:function(Self) {
      var Result = false;
      var lState = "";
      lState = document.readyState;
      Result = (lState).toLocaleLowerCase() == "complete";
      return Result
   }
   /// procedure TQTXDispatch.DocumentReadyExecute(CB: TStdCallBack; Interval: int32)
   ///  [line: 1602, column: 30, file: qtx.dom.types]
   ,DocumentReadyExecute$1:function(Self, CB, Interval) {
      if (!CB) {
         return;
      }
      if (Interval < 1) {
         Interval = 1;
      }
      if (TQTXDispatch.DocumentReady(Self)) {
         CB();
         return;
      }
      TQTXDispatch.Execute(Self,function () {
         if (TQTXDispatch.DocumentReady(Self)) {
            CB();
            return;
         } else {
            TQTXDispatch.DocumentReadyExecute(Self,CB);
         }
      },Interval);
   }
   /// procedure TQTXDispatch.DocumentReadyExecute(CB: TStdCallBack)
   ///  [line: 1624, column: 30, file: qtx.dom.types]
   ,DocumentReadyExecute:function(Self, CB) {
      TQTXDispatch.DocumentReadyExecute$1(Self,CB,48);
   }
   /// function TQTXDispatch.Execute(CB: TStdCallBack; Delay: int32) : TQTXDispatchHandle
   ///  [line: 180, column: 29, file: qtx.time]
   ,Execute:function(Self, CB, Delay$1) {
      var Result = undefined;
      Result = setTimeout(CB,Delay$1);
      return Result
   }
   /// function TQTXDispatch.JsNow() : JDate
   ,JsNow:function(Self) {
      var Result = null;
      Result = new Date();
      return Result
   }
   /// procedure TQTXDispatch.RepeatExecute(CB: TStdCallBack; Count: int32; Delay: int32)
   ///  [line: 187, column: 30, file: qtx.time]
   ,RepeatExecute:function(Self, CB, Count$2, Delay$1) {
      if (CB) {
         if (Count$2 > 0) {
            CB();
            if (Count$2 > 1) {
               TQTXDispatch.Execute(Self,function () {
                  TQTXDispatch.RepeatExecute(Self,CB,Count$2 - 1,Delay$1);
               },Delay$1);
            }
         } else {
            CB();
            TQTXDispatch.Execute(Self,function () {
               TQTXDispatch.RepeatExecute(Self,CB,-1,Delay$1);
            },Delay$1);
         }
      }
   }
   /// function TQTXDispatch.RequestAnimationFrame(CB: TStdCallBack) : THandle
   ///  [line: 1583, column: 29, file: qtx.dom.types]
   ,RequestAnimationFrame:function(Self, CB) {
      return __ReqAnimFrame(CB);
   }
   /// function TQTXDispatch.SetInterval(CB: TStdCallBack; Delay: int32) : TQTXDispatchHandle
   ///  [line: 143, column: 29, file: qtx.time]
   ,SetInterval:function(Self, CB, Delay$1) {
      var Result = undefined;
      Result = setInterval(CB, Delay$1);
      return Result
   }
   /// function TQTXDispatch.SetTimeOut(CB: TStdCallBack; Delay: int32) : TQTXDispatchHandle
   ,SetTimeOut:function(Self, CB, Delay$1) {
      var Result = undefined;
      Result = setTimeout(CB,Delay$1);
      return Result
   }
   /// function TQTXDispatch.Ticks() : Integer
   ,Ticks:function(Self) {
      var Result = 0;
      Result = new Date().getTime() * 1000 + 621355968000000000;
      return Result
   }
   /// function TQTXDispatch.TicksBetween(Past: TDateTime; Future: TDateTime) : Integer
   ,TicksBetween:function(Self, Past, Future) {
      var Result = 0;
      Result = TInt32.SubtractSmallest(TQTXDispatch.TicksOf(Self,Past),TQTXDispatch.TicksOf(Self,Future));
      return Result
   }
   /// function TQTXDispatch.TicksOf(Present: TDateTime) : Integer
   ,TicksOf:function(Self, Present) {
      var Result = 0;
      var temp = null;
      temp = TDateUtils.ToJsDate(TDateUtils,Present);
      Result = temp.getTime() * 1000 + 621355968000000000;
      return Result
   }
   /// procedure TQTXDispatch.WaitFor(Controls: TQTXWidgetCollection; CB: TStdCallBack)
   ///  [line: 1541, column: 30, file: qtx.dom.types]
   ,WaitFor:function(Self, Controls$1, CB) {
      if (!CB) {
         return;
      }
      if (Controls$1.length < 1) {
         CB();
         return;
      }
      TQTXDispatch.Execute(Self,function () {
         if (TQTXDispatch.AssignedAndReady(Self,Controls$1)) {
            CB();
            return;
         } else {
            TQTXDispatch.WaitFor(Self,Controls$1,CB);
         }
      },20);
   }
   /// procedure TQTXDispatch.WaitForInDOM(Controls: TQTXWidgetCollection; CB: TStdCallBack)
   ///  [line: 1562, column: 30, file: qtx.dom.types]
   ,WaitForInDOM:function(Self, Controls$1, CB) {
      if (!CB) {
         return;
      }
      if (Controls$1.length < 1) {
         CB();
         return;
      }
      TQTXDispatch.Execute(Self,function () {
         if (TQTXDispatch.AssignedAndReadyInDOM(Self,Controls$1)) {
            CB();
            return;
         } else {
            TQTXDispatch.WaitForInDOM(Self,Controls$1,CB);
         }
      },20);
   }
   ,Destroy:TObject.Destroy
};
/// TQTXWidgetState enumeration
///  [line: 85, column: 3, file: qtx.dom.widgets]
var TQTXWidgetState = [ "wsCreating", "wsReady", "wsDestroying" ];
/// TQTXWidgetRegistry = class (TObject)
///  [line: 978, column: 3, file: qtx.dom.widgets]
var TQTXWidgetRegistry = {
   $ClassName:"TQTXWidgetRegistry",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TQTXWidgetRegistry.GetInstanceFor(Value: TWidgetHandle) : TQTXWidget
   ///  [line: 2854, column: 35, file: qtx.dom.widgets]
   ,GetInstanceFor:function(Self, Value$2) {
      var Result = null;
      if (Value$2) {
         if (_ElementLUT.hasOwnProperty(Value$2.id)) {
            Result = $As(TVariant.AsObject(_ElementLUT[Value$2.id]),TQTXWidget);
         } else {
            Result = null;
         }
      }
      return Result
   }
   /// function TQTXWidgetRegistry.GetNewElementId() : String
   ///  [line: 2875, column: 35, file: qtx.dom.widgets]
   ,GetNewElementId:function(Self) {
      var Result = "";
      ++_ElementId;
      Result = "Widget" + _ElementId.toString();
      return Result
   }
   /// procedure TQTXWidgetRegistry.RegisterElement(Value: TWidgetHandle; Obj: TQTXWidget)
   ///  [line: 2813, column: 36, file: qtx.dom.widgets]
   ,RegisterElement:function(Self, Value$2, Obj) {
      if ((!_ElementLUT)) {
         _ElementLUT = TVariant.CreateObject();
      }
      _ElementLUT[Value$2.id] = Obj;
   }
   /// procedure TQTXWidgetRegistry.UnRegisterElement(Value: TWidgetHandle)
   ///  [line: 2865, column: 36, file: qtx.dom.widgets]
   ,UnRegisterElement:function(Self, Value$2) {
      if ((!_ElementLUT)) {
         _ElementLUT = TVariant.CreateObject();
      }
      delete _ElementLUT[(Value$2).id];
   }
   ,Destroy:TObject.Destroy
};
/// TQTXWidgetPositionMode enumeration
///  [line: 102, column: 3, file: qtx.dom.widgets]
var TQTXWidgetPositionMode = [ "cpInitial", "cpStatic", "cpRelative", "cpFixed", "cpAbsolute", "cpSticky" ];
/// TQTXWidgetOwnership enumeration
///  [line: 148, column: 3, file: qtx.dom.widgets]
var TQTXWidgetOwnership = [ "wmOwner", "wmManaged" ];
/// TQTXCustomFont = class (TQTXOwnedObject)
///  [line: 542, column: 3, file: qtx.dom.graphics]
var TQTXCustomFont = {
   $ClassName:"TQTXCustomFont",$Parent:TQTXOwnedObject
   ,$Init:function ($) {
      TQTXOwnedObject.$Init($);
      $.OnChange = null;
      $.FSize = null;
   }
   /// function TQTXCustomFont.GetColor() : TColor
   ///  [line: 683, column: 25, file: qtx.dom.graphics]
   ,GetColor:function(Self) {
      var Result = 0;
      var lHandle,
         lValue;
      Result = 536870911;
      lHandle = TQTXCustomFont.GetOwnerHandle$(Self);
      if (lHandle) {
         lValue = lHandle.style["color"];
         if (TVariant.IsString(lValue)) {
            Result = StrToColor(String(lValue));
         }
      }
      return Result
   }
   /// function TQTXCustomFont.GetFamily() : String
   ///  [line: 665, column: 26, file: qtx.dom.graphics]
   ,GetFamily:function(Self) {
      var Result = "";
      var lHandle;
      lHandle = TQTXCustomFont.GetOwnerHandle$(Self);
      if (lHandle) {
         Result = TVariant.AsString(lHandle.style["font-family"]);
      }
      return Result
   }
   /// procedure TQTXCustomFont.SetColor(Value: TColor)
   ///  [line: 695, column: 26, file: qtx.dom.graphics]
   ,SetColor:function(Self, Value$2) {
      var lHandle;
      lHandle = TQTXCustomFont.GetOwnerHandle$(Self);
      if (lHandle) {
         lHandle.style["color"] = ColorToStr(Value$2);
         if (Self.OnChange) {
            Self.OnChange(Self);
         }
      }
   }
   /// procedure TQTXCustomFont.SetFamily(Value: String)
   ///  [line: 672, column: 26, file: qtx.dom.graphics]
   ,SetFamily:function(Self, Value$2) {
      var lHandle;
      lHandle = TQTXCustomFont.GetOwnerHandle$(Self);
      if (lHandle) {
         lHandle.style["font-family"] = Trim$_String_(Value$2);
         if (Self.OnChange) {
            Self.OnChange(Self);
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,GetOwnerHandle$:function($){return $.ClassType.GetOwnerHandle($)}
};
TQTXCustomFont.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXWidgetFont = class (TQTXCustomFont)
///  [line: 306, column: 3, file: qtx.dom.widgets]
var TQTXWidgetFont = {
   $ClassName:"TQTXWidgetFont",$Parent:TQTXCustomFont
   ,$Init:function ($) {
      TQTXCustomFont.$Init($);
   }
   /// function TQTXWidgetFont.GetOwner() : TQTXWidget
   ///  [line: 1175, column: 25, file: qtx.dom.widgets]
   ,GetOwner$2:function(Self) {
      return $As(TQTXOwnedObject.GetOwner(Self),TQTXWidget);
   }
   /// function TQTXWidgetFont.GetOwnerHandle() : THandle
   ///  [line: 1180, column: 25, file: qtx.dom.widgets]
   ,GetOwnerHandle:function(Self) {
      return TQTXComponent.GetHandle$(TQTXWidgetFont.GetOwner$2(Self));
   }
   /// constructor TQTXWidgetFont.Create(AOwner: TQTXWidget)
   ///  [line: 1163, column: 28, file: qtx.dom.widgets]
   ,Create$9:function(Self, AOwner) {
      TQTXOwnedObject.Create$9(Self,AOwner);
      Self.FSize = TQTXSize.Create$87($New(TQTXSize),TQTXCustomFont.GetOwnerHandle$(Self),"font-size",3);
      Self.FSize.OnChange = function (Sender) {
         if (Self.OnChange) {
            Self.OnChange(Self);
         }
      };
      return Self
   }
   ,Destroy:TObject.Destroy
   ,Create$9$:function($){return $.ClassType.Create$9.apply($.ClassType, arguments)}
   ,GetOwnerHandle$:function($){return $.ClassType.GetOwnerHandle($)}
};
TQTXWidgetFont.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXWidgetFloat enumeration
///  [line: 158, column: 3, file: qtx.dom.widgets]
var TQTXWidgetFloat = [ "wfNone", "wfLeft", "wfRight" ];
/// TQTXWidgetDisplayMode enumeration
///  [line: 120, column: 3, file: qtx.dom.widgets]
var TQTXWidgetDisplayMode = [ "cdNone", "cdInitial", "cdInherit", "cdInlineBlock", "cdBlock", "cdFlex", "cdTable", "cdTableCaption", "cdTableCell", "cdTableRow", "cdTableColumn", "cdRunIn", "cdListItem", "cdGrid", "cdInlineGrid" ];
/// TQTXDOMComponent = class (TQTXComponent)
///  [line: 111, column: 3, file: qtx.dom.types]
var TQTXDOMComponent = {
   $ClassName:"TQTXDOMComponent",$Parent:TQTXComponent
   ,$Init:function ($) {
      TQTXComponent.$Init($);
   }
   /// procedure TQTXDOMComponent.AttributeCreate(Id: String)
   ///  [line: 1759, column: 28, file: qtx.dom.types]
   ,AttributeCreate:function(Self, Id) {
      var attr = undefined;
      if (TQTXComponent.GetHandle$(Self)) {
         if ((!TQTXComponent.GetHandle$(Self).hasAttribute(Id))) {
            attr = document.createAttribute(Id);
            TQTXComponent.GetHandle$(Self).setAttributeNode(attr);
         }
      }
   }
   /// function TQTXDOMComponent.AttributeExists(Id: String) : Boolean
   ///  [line: 1739, column: 27, file: qtx.dom.types]
   ,AttributeExists:function(Self, Id) {
      var Result = false;
      if (TQTXComponent.GetHandle$(Self)) {
         Result = $VarToBool(TQTXComponent.GetHandle$(Self).hasAttribute(Id));
      } else {
         throw Exception.Create($New(EQTXAttributesHandle),"Invalid widget handle error");
      }
      return Result
   }
   /// function TQTXDOMComponent.AttributeRead(Id: String) : Variant
   ///  [line: 1747, column: 27, file: qtx.dom.types]
   ,AttributeRead:function(Self, Id) {
      var Result = undefined;
      if (TQTXComponent.GetHandle$(Self)) {
         if (TQTXComponent.GetHandle$(Self).hasAttribute(Id)) {
            Result = TQTXComponent.GetHandle$(Self).getAttribute(Id);
         } else {
            throw EException.CreateFmt($New(EQTXAttributesRead),"Attribute [%s] does not exist",[Id]);
         }
      } else {
         throw Exception.Create($New(EQTXAttributesHandle),"Failed to read attribute, invalid widget handle");
      }
      return Result
   }
   /// procedure TQTXDOMComponent.AttributeRemove(Id: String)
   ///  [line: 1782, column: 28, file: qtx.dom.types]
   ,AttributeRemove:function(Self, Id) {
      if (TQTXComponent.GetHandle$(Self)) {
         if (TQTXComponent.GetHandle$(Self).hasAttribute(Id)) {
            TQTXComponent.GetHandle$(Self).removeAttribute(Id);
         } else {
            throw EException.CreateFmt($New(EQTXAttributesRemove),"Attribute [%s] does not exist",[Id]);
         }
      } else {
         throw Exception.Create($New(EQTXAttributesHandle),"Failed to remove attribute, invalid widget handle");
      }
   }
   /// function TQTXDOMComponent.AttributesExist(Values: array of String) : Boolean
   ///  [line: 1724, column: 27, file: qtx.dom.types]
   ,AttributesExist:function(Self, Values$6) {
      var Result = false;
      var lScore = 0,
         a$1330 = 0,
         el = "";
      if (TQTXComponent.GetHandle$(Self)) {
         lScore = Values$6.length;
         var $temp8;
         for(a$1330=0,$temp8=Values$6.length;a$1330<$temp8;a$1330++) {
            el = Values$6[a$1330];
            if (TQTXComponent.GetHandle$(Self).hasAttribute(el)) {
               --lScore;
            }
         }
         Result = (lScore==0);
      } else {
         throw Exception.Create($New(EQTXAttributesHandle),"Invalid widget handle error");
      }
      return Result
   }
   /// procedure TQTXDOMComponent.AttributeWrite(Id: String; Value: Variant)
   ///  [line: 1774, column: 28, file: qtx.dom.types]
   ,AttributeWrite:function(Self, Id, Value$2) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).setAttribute(Id,Value$2);
      } else {
         throw Exception.Create($New(EQTXAttributesHandle),"Failed to write attribute, invalid widget handle");
      }
   }
   /// function TQTXDOMComponent.GetEnabled() : Boolean
   ///  [line: 1635, column: 27, file: qtx.dom.types]
   ,GetEnabled:function(Self) {
      return !(TQTXDOMComponent.AttributeExists(Self,"disabled"));
   }
   /// function TQTXDOMComponent.PropertiesExist(Values: array of String) : Boolean
   ///  [line: 1665, column: 27, file: qtx.dom.types]
   ,PropertiesExist:function(Self, Values$6) {
      var Result = false;
      var lScore = 0,
         a$1331 = 0,
         el = "";
      if (TQTXComponent.GetHandle$(Self)) {
         lScore = Values$6.length;
         var $temp9;
         for(a$1331=0,$temp9=Values$6.length;a$1331<$temp9;a$1331++) {
            el = Values$6[a$1331];
            if (TQTXComponent.GetHandle$(Self).hasOwnProperty(el)) {
               --lScore;
            }
         }
         Result = (lScore==0);
      } else {
         throw Exception.Create($New(EQTXPropertiesHandle),"Invalid widget handle error");
      }
      return Result
   }
   /// function TQTXDOMComponent.PropertyExists(Id: String) : Boolean
   ///  [line: 1680, column: 27, file: qtx.dom.types]
   ,PropertyExists:function(Self, Id) {
      var Result = false;
      if (TQTXComponent.GetHandle$(Self)) {
         Result = $VarToBool(TQTXComponent.GetHandle$(Self).hasOwnProperty(Id));
      } else {
         throw Exception.Create($New(EQTXPropertiesHandle),"Invalid widget handle error");
      }
      return Result
   }
   /// function TQTXDOMComponent.PropertyRead(Id: String) : Variant
   ///  [line: 1688, column: 27, file: qtx.dom.types]
   ,PropertyRead:function(Self, Id) {
      var Result = undefined;
      if (TQTXComponent.GetHandle$(Self)) {
         if (TQTXComponent.GetHandle$(Self).hasOwnProperty(Id)) {
            Result = TQTXComponent.GetHandle$(Self)[Id];
         } else {
            throw EException.CreateFmt($New(EQTXPropertiesRead),"Property [%s] not found",[Id]);
         }
      } else {
         throw Exception.Create($New(EQTXPropertiesHandle),"Invalid widget handle error");
      }
      return Result
   }
   /// procedure TQTXDOMComponent.PropertyRemove(Id: String)
   ///  [line: 1708, column: 28, file: qtx.dom.types]
   ,PropertyRemove:function(Self, Id) {
      var lHandle;
      if (TQTXComponent.GetHandle$(Self)) {
         if (TQTXComponent.GetHandle$(Self).hasOwnProperty(Id)) {
            lHandle = TQTXComponent.GetHandle$(Self);
            delete lHandle[Id];
         } else {
            throw EException.CreateFmt($New(EQTXPropertiesRemove),"Property [%s] not found",[Id]);
         }
      } else {
         throw Exception.Create($New(EQTXPropertiesHandle),"Invalid widget handle error");
      }
   }
   /// function TQTXDOMComponent.PropertyType(Id: String) : TVariantExportType
   ///  [line: 1651, column: 27, file: qtx.dom.types]
   ,PropertyType:function(Self, Id) {
      var Result = 1;
      var lValue;
      if (TQTXComponent.GetHandle$(Self)) {
         if (TQTXComponent.GetHandle$(Self).hasOwnProperty(Id)) {
            lValue = TQTXComponent.GetHandle$(Self)[Id];
            if (TVariantHelper$Valid(lValue)) {
               Result = TVariantHelper$DataType(lValue);
            }
         }
      } else {
         throw Exception.Create($New(EQTXPropertiesHandle),"Invalid widget handle error");
      }
      return Result
   }
   /// procedure TQTXDOMComponent.PropertyWrite(Id: String; Value: Variant)
   ///  [line: 1700, column: 28, file: qtx.dom.types]
   ,PropertyWrite:function(Self, Id, Value$2) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self)[Id] = Value$2;
      } else {
         throw Exception.Create($New(EQTXPropertiesHandle),"Invalid widget handle error");
      }
   }
   /// procedure TQTXDOMComponent.SetEnabled(Value: Boolean)
   ///  [line: 1640, column: 28, file: qtx.dom.types]
   ,SetEnabled:function(Self, Value$2) {
      if (Value$2 != TQTXDOMComponent.GetEnabled$(Self)) {
         if (Value$2) {
            TQTXDOMComponent.AttributeRemove(Self,"disabled");
         } else {
            TQTXDOMComponent.AttributeWrite(Self,"disabled","true");
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXComponent.GetInstanceName
   ,SetOwner$1:TQTXComponent.SetOwner$1
   ,GetEnabled$:function($){return $.ClassType.GetEnabled($)}
   ,SetEnabled$:function($){return $.ClassType.SetEnabled.apply($.ClassType, arguments)}
};
TQTXDOMComponent.$Intf={
   IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXWidget = class (TQTXDOMComponent)
///  [line: 143, column: 3, file: qtx.dom.types]
var TQTXWidget = {
   $ClassName:"TQTXWidget",$Parent:TQTXDOMComponent
   ,$Init:function ($) {
      TQTXDOMComponent.$Init($);
      $.OnMoved = null;
      $.OnUpdateEnds = null;
      $.OnUpdateBegins = null;
      $.OnResize = null;
      $.TagData = undefined;
      $.Fbackg = $.FBorders = $.FFont = $.FMoveObserver = $.FResizeObserver = null;
      $.FBehavior = [0];
      $.FChildren = [];
      $.FDelegates = [];
      $.FDisplay = 3;
      $.FEnabled = true;
      $.FHeight = -1;
      $.FLeft = -1;
      $.FOwnership = 0;
      $.FPosChanged = 0;
      $.FPosition = 2;
      $.FReadyStack = [];
      $.FSizeChanged = 0;
      $.FState = 0;
      $.FTop = -1;
      $.FUpdating = 0;
      $.FVisible = false;
      $.FWidth = -1;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 865, column: 55, file: qtx.dom.widgets]
   ,a$899:function(Self) {
      var Result = null;
      Result = $AsIntf(Self,"IQTXWidgetCssClasses");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 864, column: 55, file: qtx.dom.widgets]
   ,a$898:function(Self) {
      var Result = null;
      Result = $AsIntf(Self,"IQTXWidgetAttributes");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 862, column: 65, file: qtx.dom.widgets]
   ,a$896:function(Self, Value$2) {
      TQTXComponent.GetHandle$(Self).innerText = Value$2;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 862, column: 40, file: qtx.dom.widgets]
   ,a$895:function(Self) {
      var Result = "";
      Result = String(TQTXComponent.GetHandle$(Self).innerText);
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 861, column: 65, file: qtx.dom.widgets]
   ,a$894:function(Self, Value$2) {
      TQTXComponent.GetHandle$(Self).innerHTML = Value$2;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 861, column: 40, file: qtx.dom.widgets]
   ,a$893:function(Self) {
      var Result = "";
      Result = String(TQTXComponent.GetHandle$(Self).innerHTML);
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 860, column: 40, file: qtx.dom.widgets]
   ,a$892:function(Self) {
      var Result = null;
      Result = TQTXComponent.GetHandle$(Self).style;
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 834, column: 43, file: qtx.dom.widgets]
   ,a$890:function(Self) {
      var Result = null;
      Result = TQTXComponent.GetOwner$1(Self);
      return Result
   }
   /// function TQTXWidget.AddMouseClickDelegate(Handler: TQTXMouseDelegateHandler) : TQTXDOMMouseClickDelegate
   ///  [line: 116, column: 21, file: qtx.dom.events.mouse]
   ,AddMouseClickDelegate:function(Self, Handler) {
      var Result = null;
      Result = TQTXDOMDelegate.Create$93($New(TQTXDOMMouseClickDelegate),Self);
      TQTXDOMMouseDelegate.Bind$2(Result,Handler);
      return Result
   }
   /// procedure TQTXWidget.ApplyPropertyCache()
   ///  [line: 2114, column: 22, file: qtx.dom.widgets]
   ,ApplyPropertyCache:function(Self) {
      if (Self.FLeft != -1) {
         TQTXWidget.a$892(Self).left = TInt32.ToPxStr(Self.FLeft);
      }
      if (Self.FTop != -1) {
         TQTXWidget.a$892(Self).top = TInt32.ToPxStr(Self.FTop);
      }
      if (Self.FWidth > -1) {
         TQTXWidget.a$892(Self).width = TInt32.ToPxStr(Self.FWidth);
      }
      if (Self.FHeight > -1) {
         TQTXWidget.a$892(Self).height = TInt32.ToPxStr(Self.FHeight);
      }
      TQTXDOMComponent.SetEnabled$(Self,Self.FEnabled);
      TQTXWidget.SetVisible(Self,Self.FVisible);
   }
   /// procedure TQTXWidget.BeginUpdate()
   ///  [line: 2691, column: 22, file: qtx.dom.widgets]
   ,BeginUpdate:function(Self) {
      ++Self.FUpdating;
      if (Self.FUpdating == 1) {
         if (Self.OnUpdateBegins) {
            Self.OnUpdateBegins(Self);
         }
      }
   }
   /// procedure TQTXWidget.ChildAttach(Child: TQTXWidget; Element: THandle)
   ///  [line: 1538, column: 22, file: qtx.dom.widgets]
   ,ChildAttach:function(Self, Child, Element) {
      Self.FChildren.push(Child);
      if (Element) {
         TQTXComponent.GetHandle$(Self).appendChild(Element);
      }
   }
   /// procedure TQTXWidget.ChildDetach(Child: TQTXWidget)
   ///  [line: 1545, column: 22, file: qtx.dom.widgets]
   ,ChildDetach:function(Self, Child) {
      if (TQTXComponent.GetHandle$(Child)) {
         TQTXComponent.GetHandle$(Self).removeChild(TQTXComponent.GetHandle$(Child));
      }
      $Remove(Self.FChildren,Child,0);
   }
   /// procedure TQTXWidget.ClassAdd(CssClassName: String)
   ///  [line: 2785, column: 22, file: qtx.dom.widgets]
   ,ClassAdd:function(Self, CssClassName) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).classList.add(CssClassName);
      }
   }
   /// procedure TQTXWidget.ClassAddEx(CssClassNames: TStrArray)
   ///  [line: 2767, column: 22, file: qtx.dom.widgets]
   ,ClassAddEx:function(Self, CssClassNames) {
      var a$1332 = 0,
         el = "";
      if (TQTXComponent.GetHandle$(Self)) {
         var $temp10;
         for(a$1332=0,$temp10=CssClassNames.length;a$1332<$temp10;a$1332++) {
            el = CssClassNames[a$1332];
            TQTXComponent.GetHandle$(Self).classList.add(el);
         }
      }
   }
   /// function TQTXWidget.ClassExists(CssClassName: String) : Boolean
   ///  [line: 2797, column: 21, file: qtx.dom.widgets]
   ,ClassExists:function(Self, CssClassName) {
      var Result = false;
      if (TQTXComponent.GetHandle$(Self)) {
         Result = $VarToBool(TQTXComponent.GetHandle$(Self).classList.contains(CssClassName));
      }
      return Result
   }
   /// function TQTXWidget.ClassListGet() : String
   ///  [line: 2757, column: 21, file: qtx.dom.widgets]
   ,ClassListGet:function(Self) {
      return String(TQTXDOMComponent.AttributeRead(Self,"class"));
   }
   /// procedure TQTXWidget.ClassListSet(Value: String)
   ///  [line: 2762, column: 22, file: qtx.dom.widgets]
   ,ClassListSet:function(Self, Value$2) {
      TQTXDOMComponent.AttributeWrite(Self,"class",Value$2);
   }
   /// procedure TQTXWidget.ClassRemove(CssClassName: String)
   ///  [line: 2791, column: 22, file: qtx.dom.widgets]
   ,ClassRemove:function(Self, CssClassName) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).classList.remove(CssClassName);
      }
   }
   /// procedure TQTXWidget.ClassRemoveEx(CssClassNames: TStrArray)
   ///  [line: 2776, column: 22, file: qtx.dom.widgets]
   ,ClassRemoveEx:function(Self, CssClassNames) {
      var a$1333 = 0,
         el = "";
      if (TQTXComponent.GetHandle$(Self)) {
         var $temp11;
         for(a$1333=0,$temp11=CssClassNames.length;a$1333<$temp11;a$1333++) {
            el = CssClassNames[a$1333];
            TQTXComponent.GetHandle$(Self).remove.add(el);
         }
      }
   }
   /// procedure TQTXWidget.ClassToggle(CssClassName: String)
   ///  [line: 2803, column: 22, file: qtx.dom.widgets]
   ,ClassToggle:function(Self, CssClassName) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).classList.toggle(CssClassName);
      }
   }
   /// constructor TQTXWidget.Create(AOwner: TQTXComponent; CB: TQTXWidgetConstructor)
   ///  [line: 1333, column: 24, file: qtx.dom.widgets]
   ,Create$11:function(Self, AOwner, CB) {
      TQTXComponent.Create$10(Self,AOwner,function (Component) {
         var lCreateOptions = [0],
            lFragment,
            lHandle;
         Self.FState = 0;
         Self.FOwnership = 0;
         Self.FVisible = true;
         Self.FBehavior = [3];
         lCreateOptions = TQTXWidget.GetCreateOptions(Self);
         lFragment = TQTXBrowser.CreateDocumentFragment(TQTXBrowser);
         lHandle = TQTXWidget.CreateElementInstance$(Self);
         lHandle.id = TQTXWidgetRegistry.GetNewElementId(TQTXWidgetRegistry);
         lFragment.appendChild(lHandle);
         TQTXComponent.SetHandle(Self,lHandle);
         TQTXWidgetRegistry.RegisterElement(TQTXWidgetRegistry,lHandle,Self);
         Self.FFont = TQTXOwnedObject.Create$9$($New(TQTXWidgetFont),Self);
         Self.FResizeObserver = TQTXOwnedObject.Create$9$($New(TQTXResizeObserver),Self);
         Self.FMoveObserver = TQTXOwnedObject.Create$9$($New(TQTXMoveObserver),Self);
         if ($SetIn(lCreateOptions,0,0,3)) {
            TQTXWidget.StyleObject$(Self);
         }
         if ($SetIn(lCreateOptions,1,0,3)) {
            TQTXWidget.InitializeObject$(Self);
         }
         if (CB) {
            CB(Self);
         }
         if ($Is(TQTXWidget.a$890(Self),TQTXWidget)) {
            TQTXWidget.ChildAttach($As(TQTXWidget.a$890(Self),TQTXWidget),Self,lFragment);
         } else {
            TQTXComponent.GetHandle$(TQTXWidget.a$890(Self)).appendChild(lFragment);
         }
         lFragment = null;
         Self.FState = 1;
         TQTXWidget.ApplyPropertyCache(Self);
         TQTXWidget.ObjectReady$(Self);
      });
      return Self
   }
   /// constructor TQTXWidget.CreateByRef(DomElement: TWidgetHandle; cOptions: TQTXWidgetCreateOptions; CB: TQTXWidgetConstructor)
   ///  [line: 1252, column: 24, file: qtx.dom.widgets]
   ,CreateByRef:function(Self, DomElement, cOptions, CB) {
      var lOwnerWidget = null;
      if ((!DomElement)) {
         throw Exception.Create($New(EQTXWidgetHandleNull),"Failed to create widget, element handle was null");
      }
      if (!(TQTXBrowser.ElementHandle(TQTXBrowser,DomElement))) {
         throw Exception.Create($New(EQTXWidgetHandleInvalid),"Failed to create widget, handle is not an element");
      }
      lOwnerWidget = null;
      if ($SetIn(cOptions,2,0,3)) {
         if (TQTXBrowser.ElementHandle(TQTXBrowser,DomElement.parentElement)) {
            lOwnerWidget = TQTXWidgetRegistry.GetInstanceFor(TQTXWidgetRegistry,DomElement.parentElement);
         }
      }
      TQTXComponent.Create$10(Self,lOwnerWidget,function (Component) {
         Self.FState = 0;
         Self.FBehavior = [3];
         Self.FOwnership = 1;
         TQTXComponent.SetHandle(Self,DomElement);
         Self.FFont = TQTXOwnedObject.Create$9$($New(TQTXWidgetFont),Self);
         Self.FFont.OnChange = function (Sender) {
            if (TQTXWidget.ClassExists(Self,"ParentFont")) {
               TQTXWidget.ClassRemove(Self,"ParentFont");
            }
         };
         Self.FResizeObserver = TQTXOwnedObject.Create$9$($New(TQTXResizeObserver),Self);
         Self.FMoveObserver = TQTXOwnedObject.Create$9$($New(TQTXMoveObserver),Self);
         if (TVariant.AsString(DomElement.id) == "") {
            DomElement.id = TQTXWidgetRegistry.GetNewElementId(TQTXWidgetRegistry);
         }
         TQTXWidgetRegistry.RegisterElement(TQTXWidgetRegistry,DomElement,Self);
         if ($SetIn(cOptions,2,0,3)) {
            if (TQTXWidget.a$890(Self) !== null) {
               if ($Is(TQTXWidget.a$890(Self),TQTXWidget)) {
                  TQTXWidget.ChildAttach($As(TQTXWidget.a$890(Self),TQTXWidget),Self,DomElement);
               }
            }
         }
         if ($SetIn(cOptions,0,0,3)) {
            TQTXWidget.StyleObject$(Self);
         }
         if ($SetIn(cOptions,1,0,3)) {
            TQTXWidget.InitializeObject$(Self);
         }
         if (CB) {
            CB(Self);
         }
         Self.FState = 1;
         TQTXWidget.ObjectReady$(Self);
      });
      return Self
   }
   /// constructor TQTXWidget.CreateByVal(DomID: String; cOptions: TQTXWidgetCreateOptions; CB: TQTXWidgetConstructor)
   ///  [line: 1242, column: 24, file: qtx.dom.widgets]
   ,CreateByVal:function(Self, DomID, cOptions, CB) {
      var lDocument,
         lElement;
      lDocument = document;
      lElement = lDocument.getElementById(DomID);
      TQTXWidget.CreateByRef(Self,lElement,cOptions.slice(0),CB);
      return Self
   }
   /// function TQTXWidget.CreateElementInstance() : TWidgetHandle
   ///  [line: 1985, column: 21, file: qtx.dom.widgets]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("div");
      return Result
   }
   /// destructor TQTXWidget.Destroy()
   ///  [line: 1390, column: 23, file: qtx.dom.widgets]
   ,Destroy:function(Self) {
      Self.FState = 2;
      TObject.Free(Self.FResizeObserver);
      Self.FResizeObserver = null;
      TObject.Free(Self.FMoveObserver);
      Self.FMoveObserver = null;
      if (Self.FFont !== null) {
         TObject.Free(Self.FFont);
         Self.FFont = null;
      }
      if (TQTXWidget.a$890(Self) !== null) {
         if ($Is(TQTXWidget.a$890(Self),TQTXWidget)) {
            TQTXWidget.ChildDetach($As(TQTXWidget.a$890(Self),TQTXWidget),Self);
         } else {
            TQTXComponent.GetHandle$(Self).parentElement.removeChild(TQTXComponent.GetHandle$(Self));
         }
      }
      if (!Self.FOwnership) {
         TQTXWidget.FinalizeObject$(Self);
         TQTXWidgetRegistry.UnRegisterElement(TQTXWidgetRegistry,TQTXComponent.GetHandle$(Self));
         TQTXComponent.SetHandle(Self,undefined);
      } else {
         TQTXWidgetRegistry.UnRegisterElement(TQTXWidgetRegistry,TQTXComponent.GetHandle$(Self));
         TQTXComponent.SetHandle(Self,undefined);
      }
      Self.FBorders = {};
      Self.FBorders = null;
      TObject.Destroy(Self);
   }
   /// procedure TQTXWidget.EndUpdate()
   ///  [line: 2701, column: 22, file: qtx.dom.widgets]
   ,EndUpdate:function(Self) {
      if (Self.FUpdating > 0) {
         --Self.FUpdating;
         if (!Self.FUpdating) {
            if (Self.FPosChanged > 0) {
               if (Self.OnMoved) {
                  Self.OnMoved(Self);
               }
               Self.FPosChanged = 0;
            }
            if (Self.FSizeChanged > 0) {
               TQTXWidget.Invalidate(Self);
               Self.FSizeChanged = 0;
            }
            if (Self.OnUpdateEnds) {
               Self.OnUpdateEnds(Self);
            }
         }
      }
   }
   /// procedure TQTXWidget.FinalizeObject()
   ///  [line: 2110, column: 22, file: qtx.dom.widgets]
   ,FinalizeObject:function(Self) {
      /* null */
   }
   /// procedure TQTXWidget.ForEach(CB: TQTXWidgetEnumCB)
   ///  [line: 1567, column: 22, file: qtx.dom.widgets]
   ,ForEach:function(Self, CB) {
      var a$1334 = 0,
         el = null;
      if (CB) {
         var a$1335 = [];
         a$1335 = Self.FChildren;
         var $temp12;
         for(a$1334=0,$temp12=a$1335.length;a$1334<$temp12;a$1334++) {
            el = a$1335[a$1334];
            if (!CB(el)) {
               break;
            }
         }
      }
   }
   /// function TQTXWidget.GetBackground() : TQTXWidgetBackground
   ///  [line: 1553, column: 21, file: qtx.dom.widgets]
   ,GetBackground:function(Self) {
      var Result = null;
      if (Self.Fbackg === null) {
         Self.Fbackg = TQTXWidgetBackground.Create$91($New(TQTXWidgetBackground),Self);
      }
      Result = Self.Fbackg;
      return Result
   }
   /// function TQTXWidget.GetBorder() : TQTXWidgetBorder
   ///  [line: 1560, column: 21, file: qtx.dom.widgets]
   ,GetBorder:function(Self) {
      var Result = null;
      if (Self.FBorders === null) {
         Self.FBorders = TQTXWidgetBorder.Create$46($New(TQTXWidgetBorder),Self);
      }
      Result = Self.FBorders;
      return Result
   }
   /// function TQTXWidget.GetBoundsPos() : TPoint
   ///  [line: 1782, column: 21, file: qtx.dom.widgets]
   ,GetBoundsPos:function(Self) {
      var Result = {X$1:0,Y$1:0};
      var lParent = null,
         lChildpos,
         lParentpos;
      if (TQTXWidget.a$890(Self) !== null) {
         lParent = TQTXWidget.a$890(Self);
         lChildpos = TQTXComponent.GetHandle$(Self).getBoundingClientRect();
         lParentpos = TQTXComponent.GetHandle$(lParent).getBoundingClientRect();
         Result.X$1 = $VarToInt((lChildpos.left - lParentpos.left),"");
         Result.Y$1 = $VarToInt((lChildpos.top - lParentpos.top),"");
         (Result.X$1-= TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(lParent),"padding-left"));
         (Result.Y$1-= TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(lParent),"padding-top"));
         (Result.X$1+= $VarToInt(TQTXComponent.GetHandle$(lParent).scrollLeft,""));
         (Result.Y$1+= $VarToInt(TQTXComponent.GetHandle$(lParent).scrollTop,""));
      } else {
         return Copy$TPoint({X$1:0,Y$1:0},Result);
      }
      return Result
   }
   /// function TQTXWidget.GetBoundsRect() : TRect
   ///  [line: 1808, column: 21, file: qtx.dom.widgets]
   ,GetBoundsRect:function(Self) {
      var Result = {Bottom$1:0,Left$2:0,Right$1:0,Top$2:0};
      var lParent = null,
         lChildpos,
         lParentpos,
         dx = 0,
         dy = 0;
      switch (Self.FState) {
         case 0 :
            Result.Left$2 = Self.FLeft;
            Result.Top$2 = Self.FTop;
            Result.Right$1 = Self.FLeft + Self.FWidth;
            Result.Bottom$1 = Self.FTop + Self.FHeight;
            break;
         default :
            if (TQTXWidget.a$890(Self) === null) {
               return Result = CreateSized(TQTXWidget.GetLeft(Self),TQTXWidget.GetTop(Self),TQTXWidget.GetWidth(Self),TQTXWidget.GetHeight(Self));
            }
            lParent = TQTXWidget.a$890(Self);
            lChildpos = TQTXComponent.GetHandle$(Self).getBoundingClientRect();
            lParentpos = TQTXComponent.GetHandle$(lParent).getBoundingClientRect();
            dx = $VarToInt((lChildpos.left - lParentpos.left),"");
            dy = $VarToInt((lChildpos.top - lParentpos.top),"");
            (dx-= TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(lParent),"padding-left"));
            (dy-= TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(lParent),"padding-top"));
            (dx+= $VarToInt(TQTXComponent.GetHandle$(lParent).scrollLeft,""));
            (dy+= $VarToInt(TQTXComponent.GetHandle$(lParent).scrollTop,""));
            Result.Left$2 = dx;
            Result.Top$2 = dy;
            Result.Right$1 = dx + TQTXWidget.GetWidth(Self);
            Result.Bottom$1 = dy + TQTXWidget.GetHeight(Self);
      }
      return Result
   }
   /// function TQTXWidget.GetChildCount() : int32
   ///  [line: 1468, column: 21, file: qtx.dom.widgets]
   ,GetChildCount:function(Self) {
      return Self.FChildren.length;
   }
   /// function TQTXWidget.GetChildItem(Index: int32) : TQTXDOMComponent
   ///  [line: 1463, column: 21, file: qtx.dom.widgets]
   ,GetChildItem:function(Self, Index) {
      return Self.FChildren[Index];
   }
   /// function TQTXWidget.GetClientRect() : TRect
   ///  [line: 1858, column: 21, file: qtx.dom.widgets]
   ,GetClientRect:function(Self) {
      var Result = {Bottom$1:0,Left$2:0,Right$1:0,Top$2:0};
      if (!Self.FState) {
         Result.Right$1 = Self.FWidth;
         Result.Bottom$1 = Self.FHeight;
      } else {
         Result.Right$1 = TQTXWidget.GetWidth(Self);
         Result.Bottom$1 = TQTXWidget.GetHeight(Self);
      }
      return Result
   }
   /// function TQTXWidget.GetCreateOptions() : TQTXWidgetCreateOptions
   ///  [line: 2096, column: 21, file: qtx.dom.widgets]
   ,GetCreateOptions:function(Self) {
      var Result = [0];
      Result = [7];
      return Result
   }
   /// function TQTXWidget.GetEnabled() : Boolean
   ///  [line: 2132, column: 21, file: qtx.dom.widgets]
   ,GetEnabled:function(Self) {
      var Result = false;
      if (Self.FState == 1) {
         Result = TQTXDOMComponent.GetEnabled(Self);
      } else {
         Result = Self.FEnabled;
      }
      return Result
   }
   /// function TQTXWidget.GetHeight() : int32
   ///  [line: 2391, column: 22, file: qtx.dom.widgets]
   ,GetHeight:function(Self) {
      var Result = 0;
      var lValue = 0;
      if (!Self.FState) {
         Result = Self.FHeight;
      } else {
         lValue = TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(Self),"height");
         Result = (TInt32.IsNaN$1(lValue))?0:lValue;
      }
      return Result
   }
   /// function TQTXWidget.GetInitialCSSClassName() : String
   ///  [line: 2101, column: 21, file: qtx.dom.widgets]
   ,GetInitialCSSClassName:function(Self) {
      return TObject.ClassName(Self.ClassType);
   }
   /// function TQTXWidget.GetInstanceName() : String
   ///  [line: 2091, column: 21, file: qtx.dom.widgets]
   ,GetInstanceName:function(Self) {
      return TQTXIdentifiers.MakeUniqueWidgetId$1(TQTXIdentifiers);
   }
   /// function TQTXWidget.GetLeft() : int32
   ///  [line: 2291, column: 21, file: qtx.dom.widgets]
   ,GetLeft:function(Self) {
      var Result = 0;
      var lValue = 0;
      if (!Self.FState) {
         Result = Self.FLeft;
      } else {
         lValue = TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(Self),"left");
         if (TInt32.IsNaN$1(lValue)) {
            Result = TQTXWidget.GetBoundsPos(Self).X$1;
         } else {
            Result = lValue;
         }
      }
      return Result
   }
   /// function TQTXWidget.GetScreenRect(IncludeBody: Boolean) : TRect
   ///  [line: 2590, column: 21, file: qtx.dom.widgets]
   ,GetScreenRect:function(Self, IncludeBody) {
      var Result = {Bottom$1:0,Left$2:0,Right$1:0,Top$2:0};
      var dx = 0,
         dy = 0,
         Element = null,
         lBounds = {Bottom$1:0,Left$2:0,Right$1:0,Top$2:0},
         lBody;
      if (!Self.FState) {
         return Copy$TRect({Bottom$1:0,Left$2:0,Right$1:0,Top$2:0},Result);
      }
      Element = Self;
      while (Element !== null) {
         lBounds = TQTXWidget.GetBoundsRect(Element);
         (dx+= TQTXWidget.GetLeft(Element));
         (dy+= TQTXWidget.GetTop(Element));
         if (TQTXWidget.a$890(Element) === null) {
            break;
         }
         if ($Is(TQTXWidget.a$890(Element),TQTXWidget)) {
            Element = $As(TQTXWidget.a$890(Element),TQTXWidget);
         } else {
            break;
         }
         (dx-= TQTXWidget.GetScrollLeft(Element));
         (dx+= TQTXWidgetBorderEdge.GetWidth$1(TQTXWidgetBorder.a$945(TQTXWidget.GetBorder(Element))));
         (dx+= TQTXWidgetBorderEdge.GetPadding(TQTXWidgetBorder.a$945(TQTXWidget.GetBorder(Element))));
         (dx+= TQTXWidgetBorderEdge.GetMargin(TQTXWidgetBorder.a$945(TQTXWidget.GetBorder(Element))));
         (dy-= TQTXWidget.GetScrollTop(Element));
         (dy+= TQTXWidgetBorderEdge.GetWidth$1(TQTXWidgetBorder.a$946(TQTXWidget.GetBorder(Element))));
         (dy+= TQTXWidgetBorderEdge.GetPadding(TQTXWidgetBorder.a$946(TQTXWidget.GetBorder(Element))));
         (dy+= TQTXWidgetBorderEdge.GetMargin(TQTXWidgetBorder.a$946(TQTXWidget.GetBorder(Element))));
      }
      if (IncludeBody) {
         lBody = document.body;
         (dx+= TQTXBrowser.ReadComputedInt(TQTXBrowser,lBody,"padding-left"));
         (dx+= TQTXBrowser.ReadComputedInt(TQTXBrowser,lBody,"margin-left"));
         (dy+= TQTXBrowser.ReadComputedInt(TQTXBrowser,lBody,"padding-top"));
         (dy+= TQTXBrowser.ReadComputedInt(TQTXBrowser,lBody,"margin-top"));
      }
      Result = CreateSized(dx,dy,TQTXWidget.GetWidth(Self),TQTXWidget.GetHeight(Self));
      return Result
   }
   /// function TQTXWidget.GetScrollLeft() : int32
   ///  [line: 2218, column: 21, file: qtx.dom.widgets]
   ,GetScrollLeft:function(Self) {
      var Result = 0;
      if (TQTXComponent.GetHandle$(Self)) {
         Result = $VarToInt(TQTXComponent.GetHandle$(Self).scrollLeft,"");
      }
      return Result
   }
   /// function TQTXWidget.GetScrollTop() : int32
   ///  [line: 2230, column: 21, file: qtx.dom.widgets]
   ,GetScrollTop:function(Self) {
      var Result = 0;
      if (TQTXComponent.GetHandle$(Self)) {
         Result = $VarToInt(TQTXComponent.GetHandle$(Self).scrollTop,"");
      }
      return Result
   }
   /// function TQTXWidget.GetTop() : int32
   ///  [line: 2325, column: 21, file: qtx.dom.widgets]
   ,GetTop:function(Self) {
      var Result = 0;
      var lValue = 0;
      if (!Self.FState) {
         Result = Self.FTop;
      } else {
         lValue = TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(Self),"top");
         if (TInt32.IsNaN$1(lValue)) {
            Result = TQTXWidget.GetBoundsPos(Self).Y$1;
         } else {
            Result = lValue;
         }
      }
      return Result
   }
   /// function TQTXWidget.GetVisible() : Boolean
   ///  [line: 2153, column: 21, file: qtx.dom.widgets]
   ,GetVisible:function(Self) {
      var Result = false;
      switch (Self.FState) {
         case 0 :
            Result = Self.FVisible;
            break;
         case 2 :
         case 1 :
            Result = (String(TQTXWidget.a$892(Self).visibility)).toLocaleLowerCase() == "visible";
            break;
      }
      return Result
   }
   /// function TQTXWidget.GetWidth() : int32
   ///  [line: 2359, column: 21, file: qtx.dom.widgets]
   ,GetWidth:function(Self) {
      var Result = 0;
      var lValue = 0;
      if (!Self.FState) {
         Result = Self.FWidth;
      } else {
         lValue = TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(Self),"width");
         Result = (TInt32.IsNaN$1(lValue))?0:lValue;
      }
      return Result
   }
   /// procedure TQTXWidget.InitializeObject()
   ///  [line: 2106, column: 22, file: qtx.dom.widgets]
   ,InitializeObject:function(Self) {
      /* null */
   }
   /// procedure TQTXWidget.Invalidate()
   ///  [line: 2729, column: 22, file: qtx.dom.widgets]
   ,Invalidate:function(Self) {
      if (TVariant.ClassInstance(Self)) {
         if (Self.FState == 1) {
            if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(Self))) {
               TQTXDispatch.RequestAnimationFrame(TQTXDispatch,function () {
                  TQTXWidget.Resize$(Self,Application().FOrientation);
                  if (Self.OnResize) {
                     Self.OnResize(Self);
                  }
               });
            }
         }
      }
   }
   /// procedure TQTXWidget.Moved()
   ///  [line: 2749, column: 22, file: qtx.dom.widgets]
   ,Moved:function(Self) {
      /* null */
   }
   /// procedure TQTXWidget.ObjectReady()
   ///  [line: 1992, column: 22, file: qtx.dom.widgets]
   ,ObjectReady:function(Self) {
      var a$1336 = 0,
         el = null,
         a$1337 = [];
      a$1337 = Self.FReadyStack;
      var $temp13;
      for(a$1336=0,$temp13=a$1337.length;a$1336<$temp13;a$1336++) {
         el = a$1337[a$1336];
         el(Self);
      }
      Self.FReadyStack.length=0;
   }
   /// function TQTXWidget.QueryReadyState() : Boolean
   ///  [line: 2424, column: 21, file: qtx.dom.widgets]
   ,QueryReadyState:function(Self) {
      var Result = false;
      var lScore = 0,
         lCount = 0,
         x$5 = 0,
         lChild = null;
      if (TVariant.ClassInstance(Self)) {
         if (Self.FState != 1) {
            return false;
         }
         lScore = 0;
         lCount = TQTXWidget.GetChildCount(Self);
         var $temp14;
         for(x$5=0,$temp14=lCount;x$5<$temp14;x$5++) {
            lChild = TQTXWidget.GetChildItem(Self,x$5);
            if (lChild !== null) {
               if ($Is(lChild,TQTXWidget)) {
                  if ($As(lChild,TQTXWidget).FState == 1) {
                     if (TQTXWidget.QueryReadyState($As(lChild,TQTXWidget))) {
                        ++lScore;
                     } else {
                        break;
                     }
                  } else {
                     break;
                  }
               } else {
                  ++lScore;
               }
            } else {
               ++lScore;
            }
         }
         Result = lScore == lCount;
      } else {
         Result = false;
      }
      return Result
   }
   /// procedure TQTXWidget.RegisterDelegate(Delegate: TQTXDOMDelegate)
   ///  [line: 78, column: 22, file: qtx.dom.events]
   ,RegisterDelegate:function(Self, Delegate$2) {
      if (Delegate$2 !== null) {
         if (Self.FDelegates.indexOf(Delegate$2) < 0) {
            Self.FDelegates.push(Delegate$2);
         }
      } else {
         throw Exception.Create($New(EQTXDelegateFailedRegister),"Failed to register delegate, instance was nil error");
      }
   }
   /// procedure TQTXWidget.Resize(Orientation: TQTXOrientation)
   ///  [line: 2753, column: 22, file: qtx.dom.widgets]
   ,Resize:function(Self, Orientation$1) {
      /* null */
   }
   /// procedure TQTXWidget.SetDisplayMode(Value: TQTXWidgetDisplayMode)
   ///  [line: 2199, column: 22, file: qtx.dom.widgets]
   ,SetDisplayMode:function(Self, Value$2) {
      Self.FDisplay = Value$2;
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXWidget.a$892(Self).display = __DisplayStyles[Value$2];
      }
   }
   /// procedure TQTXWidget.SetEnabled(Value: Boolean)
   ///  [line: 2140, column: 22, file: qtx.dom.widgets]
   ,SetEnabled:function(Self, Value$2) {
      if (Self.FState == 1) {
         TQTXDOMComponent.SetEnabled(Self,Value$2);
         if (TQTXDOMComponent.GetEnabled$(Self)) {
            TQTXWidget.a$899(Self)[2]("TQTXDisabled");
         } else {
            TQTXWidget.a$899(Self)[0]("TQTXDisabled");
         }
      } else {
         Self.FEnabled = Value$2;
      }
   }
   /// procedure TQTXWidget.SetHeight(Value: int32)
   ///  [line: 2402, column: 22, file: qtx.dom.widgets]
   ,SetHeight:function(Self, Value$2) {
      if ($SetIn(Self.FBehavior,1,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FHeight = Value$2;
         } else if ($SetIn(Self.FBehavior,0,0,2)) {
            TQTXWidget.a$892(Self).height = TInt32.ToPxStr(Value$2);
         }
         if ($SetIn(Self.FBehavior,0,0,2)) {
            ++Self.FSizeChanged;
         }
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.SetLeft(Value: int32)
   ///  [line: 2305, column: 22, file: qtx.dom.widgets]
   ,SetLeft:function(Self, Value$2) {
      if ($SetIn(Self.FBehavior,0,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FLeft = Value$2;
         } else {
            TQTXWidget.a$892(Self).left = TInt32.ToPxStr(Value$2);
         }
         ++Self.FPosChanged;
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.SetOwner(NewOwner: TQTXComponent)
   ///  [line: 1439, column: 22, file: qtx.dom.widgets]
   ,SetOwner$1:function(Self, NewOwner) {
      if (TQTXWidget.a$890(Self) !== null) {
         if ($Is(TQTXWidget.a$890(Self),TQTXWidget)) {
            TQTXWidget.ChildDetach($As(TQTXWidget.a$890(Self),TQTXWidget),Self);
         } else {
            TQTXComponent.GetHandle$(Self).parentElement.removeChild(TQTXComponent.GetHandle$(Self));
         }
      }
      if (NewOwner !== null) {
         if ($Is(NewOwner,TQTXWidget)) {
            TQTXWidget.ChildAttach($As(NewOwner,TQTXWidget),Self,TQTXComponent.GetHandle$(Self));
         } else {
            TQTXComponent.GetHandle$(NewOwner).appendChild(TQTXComponent.GetHandle$(Self));
         }
      }
      TQTXComponent.SetOwner$1(Self,NewOwner);
   }
   /// procedure TQTXWidget.SetPositionMode(Value: TQTXWidgetPositionMode)
   ///  [line: 2192, column: 22, file: qtx.dom.widgets]
   ,SetPositionMode:function(Self, Value$2) {
      Self.FPosition = Value$2;
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXWidget.a$892(Self).position = __PositionModes[Self.FPosition];
      }
   }
   /// procedure TQTXWidget.SetScrollLeft(Value: int32)
   ///  [line: 2224, column: 22, file: qtx.dom.widgets]
   ,SetScrollLeft:function(Self, Value$2) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).scrollLeft = Value$2;
      }
   }
   /// procedure TQTXWidget.SetScrollTop(Value: int32)
   ///  [line: 2236, column: 22, file: qtx.dom.widgets]
   ,SetScrollTop:function(Self, Value$2) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).scrollTop = Value$2;
      }
   }
   /// procedure TQTXWidget.SetSize(aWidth: int32; aHeight: int32)
   ///  [line: 1931, column: 22, file: qtx.dom.widgets]
   ,SetSize:function(Self, aWidth, aHeight) {
      if ($SetIn(Self.FBehavior,1,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FWidth = aWidth;
         } else {
            TQTXWidget.a$892(Self).width = aWidth.toString() + "px";
         }
         if (!Self.FState) {
            Self.FHeight = aHeight;
         } else {
            TQTXWidget.a$892(Self).height = aHeight.toString() + "px";
         }
         ++Self.FSizeChanged;
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.SetTop(Value: int32)
   ///  [line: 2339, column: 22, file: qtx.dom.widgets]
   ,SetTop:function(Self, Value$2) {
      if ($SetIn(Self.FBehavior,0,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FTop = Value$2;
         } else {
            TQTXWidget.a$892(Self).top = TInt32.ToPxStr(Value$2);
         }
         ++Self.FPosChanged;
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.SetVisible(Value: Boolean)
   ///  [line: 2165, column: 22, file: qtx.dom.widgets]
   ,SetVisible:function(Self, Value$2) {
      if (TVariant.ClassInstance(Self)) {
         switch (Self.FState) {
            case 0 :
               Self.FVisible = Value$2;
               break;
            case 2 :
            case 1 :
               if (Value$2) {
                  TQTXWidget.a$892(Self).display = __DisplayStyles[Self.FDisplay];
                  TQTXWidget.a$892(Self).visibility = "visible";
               } else {
                  TQTXComponent.GetHandle$(Self).style["display"] = "none";
                  TQTXComponent.GetHandle$(Self).style["visibility"] = "hidden";
               }
               break;
         }
      }
   }
   /// procedure TQTXWidget.SetWidth(Value: int32)
   ///  [line: 2370, column: 22, file: qtx.dom.widgets]
   ,SetWidth:function(Self, Value$2) {
      if ($SetIn(Self.FBehavior,1,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FWidth = Value$2;
         } else {
            TQTXWidget.a$892(Self).width = TInt32.ToPxStr(Value$2);
         }
         if ($SetIn(Self.FBehavior,0,0,2)) {
            ++Self.FSizeChanged;
         }
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.StyleObject()
   ///  [line: 2001, column: 22, file: qtx.dom.widgets]
   ,StyleObject:function(Self) {
      var lInitialName = "";
      lInitialName = TQTXWidget.GetInitialCSSClassName$(Self);
      if (lInitialName.length > 0) {
         TQTXComponent.GetHandle$(Self).setAttribute("class",lInitialName);
      }
      TQTXWidget.a$892(Self).position = __PositionModes[Self.FPosition];
      TQTXWidget.a$892(Self).display = __DisplayStyles[Self.FDisplay];
      TQTXWidget.a$892(Self).overflow = "hidden";
      TQTXWidget.a$892(Self).boxSizing = "border-box";
      TQTXWidget.ClassAdd(Self,"ParentFont");
   }
   /// procedure TQTXWidget.UnRegisterDelegate(Delegate: TQTXDOMDelegate)
   ///  [line: 88, column: 22, file: qtx.dom.events]
   ,UnRegisterDelegate:function(Self, Delegate$2) {
      var lIndex = 0;
      if (Delegate$2 !== null) {
         lIndex = Self.FDelegates.indexOf(Delegate$2);
         if (lIndex >= 0) {
            Self.FDelegates.splice(lIndex,1)
            ;
         } else {
            throw Exception.Create($New(EQTXDelegateFailedRegister),"Failed to unregister delegate, not in collection error");
         }
      } else {
         throw Exception.Create($New(EQTXDelegateFailedRegister),"Failed to unregister delegate, instance was nil error");
      }
   }
   /// procedure TQTXWidget.WhenReady(CB: TQTXWidgetConstructor)
   ///  [line: 1750, column: 22, file: qtx.dom.widgets]
   ,WhenReady:function(Self, CB) {
      if ((1<<Self.FState&6)!=0) {
         CB(Self);
      } else {
         Self.FReadyStack.push(CB);
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName$:function($){return $.ClassType.GetInstanceName($)}
   ,SetOwner$1$:function($){return $.ClassType.SetOwner$1.apply($.ClassType, arguments)}
   ,GetEnabled$:function($){return $.ClassType.GetEnabled($)}
   ,SetEnabled$:function($){return $.ClassType.SetEnabled.apply($.ClassType, arguments)}
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName$:function($){return $.ClassType.GetInitialCSSClassName($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize.apply($.ClassType, arguments)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetSize$:function($){return $.ClassType.SetSize.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TQTXWidget.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXWidgetContainer = class (TQTXWidget)
///  [line: 958, column: 3, file: qtx.dom.widgets]
var TQTXWidgetContainer = {
   $ClassName:"TQTXWidgetContainer",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
      $.FView$2 = null;
   }
   /// function TQTXWidgetContainer.GetChildrenSortedByYPos() : TQTXWidgetCollection
   ///  [line: 1092, column: 30, file: qtx.dom.widgets]
   ,GetChildrenSortedByYPos:function(Self) {
      var Result = [];
      var lCount = 0,
         x$5 = 0,
         lObj = null,
         mAltered = false,
         x$6 = 0,
         mLast = null,
         mCurrent = null;
      lCount = TQTXWidget.GetChildCount(Self);
      if (lCount > 0) {
         var $temp15;
         for(x$5=0,$temp15=lCount;x$5<$temp15;x$5++) {
            lObj = TQTXWidget.GetChildItem(Self,x$5);
            if ($Is(lObj,TQTXWidget)) {
               Result.push($As(lObj,TQTXWidget));
            }
         }
         if (Result.length > 1) {
            mAltered = false;
            do {
               mAltered = false;
               var $temp16;
               for(x$6=1,$temp16=lCount;x$6<$temp16;x$6++) {
                  mLast = Result[x$6 - 1];
                  mCurrent = Result[x$6];
                  if (TQTXWidget.GetTop(mCurrent) < TQTXWidget.GetTop(mLast)) {
                     $ArraySwap(Result,(x$6 - 1),x$6);
                     mAltered = true;
                  }
               }
            } while (!(!(mAltered)));
         }
      }
      return Result
   }
   /// procedure TQTXWidgetContainer.ObjectReady()
   ///  [line: 112, column: 31, file: qtx.dom.view]
   ,ObjectReady:function(Self) {
      var lTemp = null;
      TQTXWidget.ObjectReady(Self);
      if (Self.FView$2 !== null) {
         lTemp = Self.FView$2;
         Self.FView$2 = null;
         TQTXWidgetContainer.SetView(Self,lTemp);
      }
   }
   /// procedure TQTXWidgetContainer.SetView(Value: TQTXView)
   ///  [line: 144, column: 31, file: qtx.dom.view]
   ,SetView:function(Self, Value$2) {
      var lAccess = null,
         lAccess$1 = null;
      switch (Self.FState) {
         case 0 :
            Self.FView$2 = Value$2;
            break;
         case 1 :
            TQTXWidget.BeginUpdate(Self);
            try {
               if (Self.FView$2 !== null) {
                  lAccess = $AsIntf(Self.FView$2,"IQTXView");
                  lAccess[1](Self);
                  Self.FView$2 = null;
               }
               Self.FView$2 = Value$2;
               if (Self.FView$2 !== null) {
                  lAccess$1 = $AsIntf(Self.FView$2,"IQTXView");
                  lAccess$1[0](Self);
               }
            } finally {
               TQTXWidget.EndUpdate(Self);
            }
            break;
      }
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXWidgetContainer.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXWidgetBorderType enumeration
///  [line: 236, column: 3, file: qtx.dom.widgets]
var TQTXWidgetBorderType = [ "wbLeft", "wbTop", "wbRight", "wbBottom" ];
/// TQTXWidgetBorderStyle enumeration
///  [line: 224, column: 3, file: qtx.dom.widgets]
var TQTXWidgetBorderStyle = [ "bsNone", "bsInitial", "bsInherited", "bsSolid", "bsDotted", "bsDouble", "bsGroove", "bsInset", "bsOutset" ];
/// TQTXWidgetBorderEdge = class (TQTXOwnedObject)
///  [line: 245, column: 3, file: qtx.dom.widgets]
var TQTXWidgetBorderEdge = {
   $ClassName:"TQTXWidgetBorderEdge",$Parent:TQTXOwnedObject
   ,$Init:function ($) {
      TQTXOwnedObject.$Init($);
      $.FEdge = 0;
      $.FHandle$2 = undefined;
   }
   /// constructor TQTXWidgetBorderEdge.Create(AOwner: TQTXWidgetBorder; Edge: TQTXWidgetBorderType)
   ///  [line: 2885, column: 34, file: qtx.dom.widgets]
   ,Create$45:function(Self, AOwner, Edge$1) {
      TQTXOwnedObject.Create$9(Self,AOwner);
      Self.FEdge = Edge$1;
      Self.FHandle$2 = TQTXComponent.GetHandle$(TQTXWidgetBorder.GetOwner$4(AOwner));
      return Self
   }
   /// function TQTXWidgetBorderEdge.GetMargin() : int32
   ///  [line: 2961, column: 31, file: qtx.dom.widgets]
   ,GetMargin:function(Self) {
      return TQTXBrowser.ReadComputedInt(TQTXBrowser,Self.FHandle$2,__margin_names[Self.FEdge]);
   }
   /// function TQTXWidgetBorderEdge.GetPadding() : int32
   ///  [line: 2933, column: 31, file: qtx.dom.widgets]
   ,GetPadding:function(Self) {
      return TQTXBrowser.ReadComputedInt(TQTXBrowser,Self.FHandle$2,__padding_names[Self.FEdge]);
   }
   /// function TQTXWidgetBorderEdge.GetSize() : int32
   ///  [line: 2892, column: 31, file: qtx.dom.widgets]
   ,GetSize$3:function(Self) {
      return TQTXWidgetBorderEdge.GetWidth$1(Self) + TQTXWidgetBorderEdge.GetPadding(Self) + TQTXWidgetBorderEdge.GetMargin(Self);
   }
   /// function TQTXWidgetBorderEdge.GetWidth() : int32
   ///  [line: 2923, column: 31, file: qtx.dom.widgets]
   ,GetWidth$1:function(Self) {
      return TQTXBrowser.ReadComputedInt(TQTXBrowser,Self.FHandle$2,__width_names[Self.FEdge]);
   }
   /// procedure TQTXWidgetBorderEdge.SetMargin(Value: int32)
   ///  [line: 2966, column: 32, file: qtx.dom.widgets]
   ,SetMargin:function(Self, Value$2) {
      Self.FHandle$2.style[__margin_names[Self.FEdge]] = Value$2.toString() + "px";
   }
   /// procedure TQTXWidgetBorderEdge.SetPadding(Value: int32)
   ///  [line: 2938, column: 32, file: qtx.dom.widgets]
   ,SetPadding:function(Self, Value$2) {
      Self.FHandle$2.style[__padding_names[Self.FEdge]] = Value$2.toString() + "px";
   }
   /// procedure TQTXWidgetBorderEdge.SetWidth(Value: int32)
   ///  [line: 2928, column: 32, file: qtx.dom.widgets]
   ,SetWidth$1:function(Self, Value$2) {
      Self.FHandle$2.style[__width_names[Self.FEdge]] = Value$2.toString() + "px";
   }
   ,Destroy:TObject.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
};
TQTXWidgetBorderEdge.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXWidgetBorder = class (TQTXOwnedObject)
///  [line: 277, column: 3, file: qtx.dom.widgets]
var TQTXWidgetBorder = {
   $ClassName:"TQTXWidgetBorder",$Parent:TQTXOwnedObject
   ,$Init:function ($) {
      TQTXOwnedObject.$Init($);
      $.FEdges = [null,null,null,null];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 294, column: 51, file: qtx.dom.widgets]
   ,a$948:function(Self) {
      var Result = null;
      Result = Self.FEdges[3];
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 292, column: 48, file: qtx.dom.widgets]
   ,a$946:function(Self) {
      var Result = null;
      Result = Self.FEdges[1];
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 291, column: 49, file: qtx.dom.widgets]
   ,a$945:function(Self) {
      var Result = null;
      Result = Self.FEdges[0];
      return Result
   }
   /// function TQTXWidgetBorder.AdjustRect(Value: TRect) : TRect
   ///  [line: 2989, column: 27, file: qtx.dom.widgets]
   ,AdjustRect:function(Self, Value$2) {
      var Result = {Bottom$1:0,Left$2:0,Right$1:0,Top$2:0};
      var lEdge = null;
      Copy$TRect(Value$2,Result);
      lEdge = Self.FEdges[0];
      Result.Right$1 -= TQTXWidgetBorderEdge.GetSize$3(lEdge);
      lEdge = Self.FEdges[1];
      Result.Bottom$1 -= TQTXWidgetBorderEdge.GetSize$3(lEdge);
      return Result
   }
   /// constructor TQTXWidgetBorder.Create(AOwner: TQTXWidget)
   ///  [line: 2975, column: 30, file: qtx.dom.widgets]
   ,Create$46:function(Self, AOwner) {
      TQTXOwnedObject.Create$9(Self,AOwner);
      Self.FEdges[0] = TQTXWidgetBorderEdge.Create$45($New(TQTXWidgetBorderEdge),Self,0);
      Self.FEdges[1] = TQTXWidgetBorderEdge.Create$45($New(TQTXWidgetBorderEdge),Self,1);
      Self.FEdges[2] = TQTXWidgetBorderEdge.Create$45($New(TQTXWidgetBorderEdge),Self,2);
      Self.FEdges[3] = TQTXWidgetBorderEdge.Create$45($New(TQTXWidgetBorderEdge),Self,3);
      return Self
   }
   /// function TQTXWidgetBorder.GetOwner() : TQTXWidget
   ///  [line: 2984, column: 27, file: qtx.dom.widgets]
   ,GetOwner$4:function(Self) {
      return $As(TQTXOwnedObject.GetOwner(Self),TQTXWidget);
   }
   /// procedure TQTXWidgetBorder.SetMargin(Value: int32)
   ///  [line: 3043, column: 28, file: qtx.dom.widgets]
   ,SetMargin$1:function(Self, Value$2) {
      TQTXWidgetBorderEdge.SetMargin(Self.FEdges[0],Value$2);
      TQTXWidgetBorderEdge.SetMargin(Self.FEdges[1],Value$2);
      TQTXWidgetBorderEdge.SetMargin(Self.FEdges[2],Value$2);
      TQTXWidgetBorderEdge.SetMargin(Self.FEdges[3],Value$2);
   }
   /// procedure TQTXWidgetBorder.SetPadding(Value: int32)
   ///  [line: 3035, column: 28, file: qtx.dom.widgets]
   ,SetPadding$1:function(Self, Value$2) {
      TQTXWidgetBorderEdge.SetPadding(Self.FEdges[0],Value$2);
      TQTXWidgetBorderEdge.SetPadding(Self.FEdges[1],Value$2);
      TQTXWidgetBorderEdge.SetPadding(Self.FEdges[2],Value$2);
      TQTXWidgetBorderEdge.SetPadding(Self.FEdges[3],Value$2);
   }
   ,Destroy:TObject.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
};
TQTXWidgetBorder.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXTouchAction enumeration
///  [line: 164, column: 3, file: qtx.dom.widgets]
var TQTXTouchAction = [ "taInherit", "taInitial", "taUnSet", "taNone", "taAuto", "taPanX", "taPanLeft", "taPanRight", "taPanY", "taPanUp", "taPanDown", "taPinchZoom", "taManipulation" ];
/// TQTXProxyWidget = class (TQTXComponent)
///  [line: 199, column: 3, file: qtx.dom.widgets]
var TQTXProxyWidget = {
   $ClassName:"TQTXProxyWidget",$Parent:TQTXComponent
   ,$Init:function ($) {
      TQTXComponent.$Init($);
   }
   /// constructor TQTXProxyWidget.Create(AOwner: TWidgetHandle)
   ///  [line: 1189, column: 29, file: qtx.dom.widgets]
   ,Create$47:function(Self, AOwner) {
      TQTXComponent.Create$10(Self,null,function (Component) {
         TQTXComponent.SetHandle(Self,AOwner);
      });
      return Self
   }
   ,Destroy:TObject.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXComponent.GetInstanceName
   ,SetOwner$1:TQTXComponent.SetOwner$1
};
TQTXProxyWidget.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXProxyBodyWidget = class (TQTXProxyWidget)
///  [line: 211, column: 3, file: qtx.dom.widgets]
var TQTXProxyBodyWidget = {
   $ClassName:"TQTXProxyBodyWidget",$Parent:TQTXProxyWidget
   ,$Init:function ($) {
      TQTXProxyWidget.$Init($);
   }
   /// constructor TQTXProxyBodyWidget.Create()
   ///  [line: 1233, column: 33, file: qtx.dom.widgets]
   ,Create$49:function(Self) {
      TQTXProxyWidget.Create$47(Self,document.body);
      return Self
   }
   ,Destroy:TObject.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXComponent.GetInstanceName
   ,SetOwner$1:TQTXComponent.SetOwner$1
};
TQTXProxyBodyWidget.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// EQTXWidget = class (EQTXException)
///  [line: 40, column: 3, file: qtx.dom.widgets]
var EQTXWidget = {
   $ClassName:"EQTXWidget",$Parent:EQTXException
   ,$Init:function ($) {
      EQTXException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXWidgetHandleNull = class (EQTXWidget)
///  [line: 41, column: 3, file: qtx.dom.widgets]
var EQTXWidgetHandleNull = {
   $ClassName:"EQTXWidgetHandleNull",$Parent:EQTXWidget
   ,$Init:function ($) {
      EQTXWidget.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXWidgetHandleInvalid = class (EQTXWidget)
///  [line: 42, column: 3, file: qtx.dom.widgets]
var EQTXWidgetHandleInvalid = {
   $ClassName:"EQTXWidgetHandleInvalid",$Parent:EQTXWidget
   ,$Init:function ($) {
      EQTXWidget.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXProperties = class (EQTXException)
///  [line: 51, column: 3, file: qtx.dom.widgets]
var EQTXProperties = {
   $ClassName:"EQTXProperties",$Parent:EQTXException
   ,$Init:function ($) {
      EQTXException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXPropertiesRemove = class (EQTXProperties)
///  [line: 54, column: 3, file: qtx.dom.widgets]
var EQTXPropertiesRemove = {
   $ClassName:"EQTXPropertiesRemove",$Parent:EQTXProperties
   ,$Init:function ($) {
      EQTXProperties.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXPropertiesRead = class (EQTXProperties)
///  [line: 52, column: 3, file: qtx.dom.widgets]
var EQTXPropertiesRead = {
   $ClassName:"EQTXPropertiesRead",$Parent:EQTXProperties
   ,$Init:function ($) {
      EQTXProperties.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXPropertiesHandle = class (EQTXProperties)
///  [line: 53, column: 3, file: qtx.dom.widgets]
var EQTXPropertiesHandle = {
   $ClassName:"EQTXPropertiesHandle",$Parent:EQTXProperties
   ,$Init:function ($) {
      EQTXProperties.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXAttributes = class (EQTXException)
///  [line: 45, column: 3, file: qtx.dom.widgets]
var EQTXAttributes = {
   $ClassName:"EQTXAttributes",$Parent:EQTXException
   ,$Init:function ($) {
      EQTXException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXAttributesRemove = class (EQTXAttributes)
///  [line: 48, column: 3, file: qtx.dom.widgets]
var EQTXAttributesRemove = {
   $ClassName:"EQTXAttributesRemove",$Parent:EQTXAttributes
   ,$Init:function ($) {
      EQTXAttributes.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXAttributesRead = class (EQTXAttributes)
///  [line: 46, column: 3, file: qtx.dom.widgets]
var EQTXAttributesRead = {
   $ClassName:"EQTXAttributesRead",$Parent:EQTXAttributes
   ,$Init:function ($) {
      EQTXAttributes.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXAttributesHandle = class (EQTXAttributes)
///  [line: 47, column: 3, file: qtx.dom.widgets]
var EQTXAttributesHandle = {
   $ClassName:"EQTXAttributesHandle",$Parent:EQTXAttributes
   ,$Init:function ($) {
      EQTXAttributes.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TQTXEventMode enumeration
///  [line: 46, column: 3, file: qtx.delegates]
var TQTXEventMode = [ "dmCapture", "dmBubble" ];
/// TQTXDelegate = class (TQTXOwnedObject)
///  [line: 213, column: 3, file: qtx.delegates]
var TQTXDelegate = {
   $ClassName:"TQTXDelegate",$Parent:TQTXOwnedObject
   ,$Init:function ($) {
      TQTXOwnedObject.$Init($);
      $.OnExecute = null;
      $.EventMode = 0;
      $.FBound = false;
      $.FEventid = "";
   }
   /// procedure TQTXDelegate.Bind(EventId: String; Handler: TQTXDelegateHandler)
   ///  [line: 275, column: 24, file: qtx.delegates]
   ,Bind$1:function(Self, EventId$1, Handler) {
      TQTXDelegate.Bind(Self,EventId$1);
      Self.OnExecute = Handler;
   }
   /// procedure TQTXDelegate.Bind(EventId: String)
   ///  [line: 281, column: 24, file: qtx.delegates]
   ,Bind:function(Self, EventId$1) {
      if (Self.FBound) {
         TQTXDelegate.Release$1(Self);
      }
      EventId$1 = Trim$_String_(EventId$1);
      if (EventId$1.length < 1) {
         throw Exception.Create($New(EQTXDelegateFailedBind),"Failed to bind delegate, invalid identifier");
      }
      TQTXDelegate.SetEventId(Self,EventId$1);
      try {
         TQTXDelegate.DoBind$(Self);
      } catch ($e) {
         var e$1 = $W($e);
         TQTXDelegate.SetEventId(Self,"");
         TQTXDelegate.SetBound(Self,false);
         throw Exception.Create($New(EQTXDelegateFailedBind),e$1.FMessage);
      }
   }
   /// constructor TQTXDelegate.Create(AOwner: TObject)
   ///  [line: 246, column: 26, file: qtx.delegates]
   ,Create$9:function(Self, AOwner) {
      TQTXOwnedObject.Create$9(Self,AOwner);
      Self.EventMode = 1;
      return Self
   }
   /// destructor TQTXDelegate.Destroy()
   ///  [line: 252, column: 25, file: qtx.delegates]
   ,Destroy:function(Self) {
      if (Self.FBound) {
         TQTXDelegate.Release$1(Self);
      }
      TObject.Destroy(Self);
   }
   /// procedure TQTXDelegate.DoExecute(Event: JEvent)
   ///  [line: 269, column: 24, file: qtx.delegates]
   ,DoExecute:function(Self, Event$1) {
      if (Self.OnExecute) {
         Self.OnExecute(Self,Event$1);
      }
   }
   /// procedure TQTXDelegate.Release()
   ///  [line: 304, column: 24, file: qtx.delegates]
   ,Release$1:function(Self) {
      if (Self.FBound) {
         try {
            try {
               TQTXDelegate.DoRelease$(Self);
            } catch ($e) {
               var e$1 = $W($e);
               throw Exception.Create($New(EQTXDelegateFailedRelease),e$1.FMessage);
            }
         } finally {
            TQTXDelegate.SetEventId(Self,"");
            TQTXDelegate.SetBound(Self,false);
         }
      }
   }
   /// procedure TQTXDelegate.SetBound(Value: Boolean)
   ///  [line: 264, column: 24, file: qtx.delegates]
   ,SetBound:function(Self, Value$2) {
      Self.FBound = Value$2;
   }
   /// procedure TQTXDelegate.SetEventId(Value: String)
   ///  [line: 259, column: 24, file: qtx.delegates]
   ,SetEventId:function(Self, Value$2) {
      Self.FEventid = Trim$_String_(Value$2);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9$:function($){return $.ClassType.Create$9.apply($.ClassType, arguments)}
   ,DoBind$:function($){return $.ClassType.DoBind($)}
   ,DoExecute$:function($){return $.ClassType.DoExecute.apply($.ClassType, arguments)}
   ,DoRelease$:function($){return $.ClassType.DoRelease($)}
};
TQTXDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// EQTXDelegate = class (EException)
///  [line: 30, column: 3, file: qtx.delegates]
var EQTXDelegate = {
   $ClassName:"EQTXDelegate",$Parent:EException
   ,$Init:function ($) {
      EException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXDelegateFailedRelease = class (EQTXDelegate)
///  [line: 32, column: 3, file: qtx.delegates]
var EQTXDelegateFailedRelease = {
   $ClassName:"EQTXDelegateFailedRelease",$Parent:EQTXDelegate
   ,$Init:function ($) {
      EQTXDelegate.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXDelegateFailedRegister = class (EQTXDelegate)
///  [line: 33, column: 3, file: qtx.delegates]
var EQTXDelegateFailedRegister = {
   $ClassName:"EQTXDelegateFailedRegister",$Parent:EQTXDelegate
   ,$Init:function ($) {
      EQTXDelegate.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXDelegateFailedBind = class (EQTXDelegate)
///  [line: 31, column: 3, file: qtx.delegates]
var EQTXDelegateFailedBind = {
   $ClassName:"EQTXDelegateFailedBind",$Parent:EQTXDelegate
   ,$Init:function ($) {
      EQTXDelegate.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TWebSocketReadyState enumeration
///  [line: 1284, column: 3, file: qtx.dom.types]
var TWebSocketReadyState = [ "rsConnecting", "rsOpen", "rsClosing", "rsClosed" ];
/// TQTXPlatform enumeration
///  [line: 1395, column: 3, file: qtx.dom.types]
var TQTXPlatform = [ "pmUnknown", "pmAmiga", "pmWindows", "pmLinux", "pmUnix", "pmMac", "pmiOS", "pmChromeOS", "pmAndroid", "pmEmbedded" ];
/// TQTXBrowserObjects = class (TObject)
///  [line: 1408, column: 3, file: qtx.dom.types]
var TQTXBrowserObjects = {
   $ClassName:"TQTXBrowserObjects",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// TQTXBrowserModel enumeration
///  [line: 1386, column: 3, file: qtx.dom.types]
var TQTXBrowserModel = [ "bmUnknown", "bmChrome", "bmSafari", "bmFirefox", "bmOpera", "bmIE" ];
/// TQTXBrowser = class (TObject)
///  [line: 1426, column: 3, file: qtx.dom.types]
var TQTXBrowser = {
   $ClassName:"TQTXBrowser",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TQTXBrowser.BodyContains(Element: TWidgetHandle) : Boolean
   ///  [line: 2034, column: 28, file: qtx.dom.types]
   ,BodyContains:function(Self, Element) {
      var Result = false;
      Result = document.body.contains(Element);
      return Result
   }
   /// function TQTXBrowser.CreateDocumentFragment() : THandle
   ///  [line: 1817, column: 28, file: qtx.dom.types]
   ,CreateDocumentFragment:function(Self) {
      var Result = undefined;
      Result = document.createDocumentFragment();
      return Result
   }
   /// function TQTXBrowser.CreateElement(Name: String) : THandle
   ///  [line: 1824, column: 28, file: qtx.dom.types]
   ,CreateElement:function(Self, Name$7) {
      var Result = undefined;
      Result = document.createElement(Name$7);
      return Result
   }
   /// function TQTXBrowser.ElementHandle(Element: TWidgetHandle) : Boolean
   ///  [line: 1907, column: 28, file: qtx.dom.types]
   ,ElementHandle:function(Self, Element) {
      var Result = false;
      Result =  !( (Element == undefined) || (Element == null) );
      if (Result) {
         Result = $VarToBool(Element);
         if (Result) {
            Result = Element instanceof HTMLElement;
         }
      }
      return Result
   }
   /// function TQTXBrowser.GetElementReady(Element: TWidgetHandle; CheckOwnership: Boolean) : Boolean
   ///  [line: 1952, column: 28, file: qtx.dom.types]
   ,GetElementReady:function(Self, Element, CheckOwnership) {
      var Result = false;
      if (TQTXBrowser.ElementHandle(Self,Element)) {
         if (typeof(Element) == "object") {
            if (Element.nodeType == 1) {
               if (Element.style) {
                  if (typeof(Element.style) == "object") {
                     if (CheckOwnership) {
                        if (Element.ownerDocument) {
                           if (typeof(Element.ownerDocument) == "object") {
                              Result = TQTXBrowser.BodyContains(Self,Element);
                           }
                        }
                     } else {
                        Result = true;
                     }
                  }
               }
            }
         }
      }
      return Result
   }
   /// function TQTXBrowser.GetFocusedElement() : THandle
   ///  [line: 1982, column: 28, file: qtx.dom.types]
   ,GetFocusedElement$1:function(Self) {
      return document.activeElement();
   }
   /// function TQTXBrowser.ObjectHandle(Handle: THandle) : Boolean
   ///  [line: 1898, column: 28, file: qtx.dom.types]
   ,ObjectHandle:function(Self, Handle$5) {
      var Result = false;
      Result =  !( (Handle$5 == undefined) || (Handle$5 == null) );
      if (Result) {
         Result = $VarToBool(Handle$5);
      }
      return Result
   }
   /// function TQTXBrowser.ObjectIsElement(Element: THandle) : Boolean
   ///  [line: 1987, column: 28, file: qtx.dom.types]
   ,ObjectIsElement:function(Self, Element) {
      var Result = false;
      if (TQTXBrowser.ObjectHandle(Self,Element)) {
         Result = Element instanceof HTMLElement;
      }
      return Result
   }
   /// function TQTXBrowser.ReadComputedInt(Handle: TWidgetHandle; PropertyId: String) : int32
   ///  [line: 1870, column: 28, file: qtx.dom.types]
   ,ReadComputedInt:function(Self, Handle$5, PropertyId) {
      var Result = 0;
      var LData = null;
    var LObj = document.defaultView.getComputedStyle(Handle$5);

    if (LObj) {
      LData = LObj.getPropertyValue(PropertyId);
    } else {
      LData = (Handle$5).style[PropertyId];
    }

    if (LData) {
      if (typeof(LData) === "number") {
        Result = LData;
      } else {
        if (typeof(LData) === "string") {
          if (LData != "") {
            LData = parseInt(LData.trim());
            if (typeof(LData) === "number")
              Result = LData;
          }
        }
      }
    }
      return Result
   }
   /// function TQTXBrowser.ReadComputedStr(Handle: TWidgetHandle; PropertyId: String) : String
   ///  [line: 1847, column: 28, file: qtx.dom.types]
   ,ReadComputedStr:function(Self, Handle$5, PropertyId) {
      var Result = "";
      var data = null;
    var temp = document.defaultView.getComputedStyle(Handle$5);

    if (temp) {
      data = (temp).getPropertyValue(PropertyId);
    } else {
      data = (Handle$5).style[PropertyId];
    }

    if (data) {
      if (typeof(data) === "number") {
        Result = String(data);
      } else {
        if (typeof(data) === "string")
          Result = data;
      }
    }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// JPipeToOptions = class (JObject)
///  [line: 1050, column: 3, file: qtx.dom.types]
function JPipeToOptions() {
}
$Extend(Object,JPipeToOptions,
   {
      "preventClose" : false,
      "preventAbort" : false,
      "preventCancel" : false,
      "signal" : undefined
   });

/// JPipeThroughOptions = class (JObject)
///  [line: 1042, column: 3, file: qtx.dom.types]
function JPipeThroughOptions() {
}
$Extend(Object,JPipeThroughOptions,
   {
      "preventClose" : false,
      "preventAbort" : false,
      "preventCancel" : false,
      "signal" : undefined
   });

/// JNodeType enumeration
///  [line: 1424, column: 3, file: qtx.dom.types]
var JNodeType = { 1:"ntElement", 2:"ntAttribute", 3:"ntText" };
/// JFullScreenOptions = class (JObject)
///  [line: 139, column: 3, file: qtx.dom.types]
function JFullScreenOptions() {
}
$Extend(Object,JFullScreenOptions,
   {
      "navigationUI" : ""
   });

/// TRect = record
///  [line: 455, column: 3, file: qtx.dom.graphics]
function Copy$TRect(s,d) {
   d.Bottom$1=s.Bottom$1;
   d.Left$2=s.Left$2;
   d.Right$1=s.Right$1;
   d.Top$2=s.Top$2;
   return d;
}
function Clone$TRect($) {
   return {
      Bottom$1:$.Bottom$1,
      Left$2:$.Left$2,
      Right$1:$.Right$1,
      Top$2:$.Top$2
   }
}
/// function TRect.CreateSized(Dx: int32; Dy: int32; Wd: int32; Hd: int32) : TRect
///  [line: 909, column: 22, file: qtx.dom.graphics]
function CreateSized(Dx, Dy, Wd, Hd) {
   var Result = {Bottom$1:0,Left$2:0,Right$1:0,Top$2:0};
   Result.Left$2 = Dx;
   Result.Top$2 = Dy;
   Result.Right$1 = Dx + Wd;
   Result.Bottom$1 = Dy + Hd;
   return Result
}
/// function TRect.Height(var Self: TRect) : int32
///  [line: 990, column: 16, file: qtx.dom.graphics]
function TRect$Height$1(Self$3) {
   return Self$3.Bottom$1 - Self$3.Top$2;
}
/// function TRect.Width(var Self: TRect) : int32
///  [line: 985, column: 16, file: qtx.dom.graphics]
function TRect$Width$3(Self$4) {
   return Self$4.Right$1 - Self$4.Left$2;
}
/// TQTXSizeType enumeration
///  [line: 512, column: 3, file: qtx.dom.graphics]
var TQTXSizeType = [ "stPixel", "stPercent", "stEm", "stPt" ];
/// TQTXSize = class (TObject)
///  [line: 521, column: 3, file: qtx.dom.graphics]
var TQTXSize = {
   $ClassName:"TQTXSize",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnChange = null;
      $.FName$1 = "";
      $.FOwner$1 = undefined;
      $.FReference = undefined;
      $.FType = 0;
   }
   /// constructor TQTXSize.Create(AOwner: THandle; Name: String; Kind: TQTXSizeType)
   ///  [line: 710, column: 22, file: qtx.dom.graphics]
   ,Create$87:function(Self, AOwner, Name$7, Kind) {
      Self.FOwner$1 = AOwner;
      Self.FName$1 = Name$7;
      Self.FType = Kind;
      Self.FReference = AOwner;
      return Self
   }
   /// function TQTXSize.GetValue() : int32
   ///  [line: 727, column: 19, file: qtx.dom.graphics]
   ,GetValue:function(Self) {
      var Result = {v:0};
      try {
         var lData,
            lText = "";
         lData = Self.FReference.style[Self.FName$1];
         switch (TVariantHelper$DataType(lData)) {
            case 5 :
               lText = String(lData);
               if ((lText).toLocaleLowerCase() == "inherit") {
                  return 0;
               }
               if (lText.charAt(lText.length-1)=="%") {
                  Self.FType = 1;
                  if (TryStrToInt(lText.substr(0,lText.length - 1),Result)) {
                     return Result.v;
                  } else {
                     throw Exception.Create($New(EQTXSize),"Unsupported size format: " + TVariant.AsString(lData));
                  }
               }
               if (lText.substr(-2,2)=="px") {
                  Self.FType = 0;
                  if (TryStrToInt(lText.substr(0,lText.length - 2),Result)) {
                     return Result.v;
                  } else {
                     throw Exception.Create($New(EQTXSize),"Unsupported size format: " + TVariant.AsString(lData));
                  }
               }
               if (lText.substr(-2,2)=="em") {
                  Self.FType = 2;
                  if (TryStrToInt(lText.substr(0,lText.length - 2),Result)) {
                     return Result.v;
                  } else {
                     throw Exception.Create($New(EQTXSize),"Unsupported size format: " + TVariant.AsString(lData));
                  }
               }
               if (lText.substr(-2,2)=="pt") {
                  Self.FType = 3;
                  if (TryStrToInt(lText.substr(0,lText.length - 2),Result)) {
                     return Result.v;
                  } else {
                     throw Exception.Create($New(EQTXSize),"Unsupported size format: " + TVariant.AsString(lData));
                  }
               }
               if (!(TryStrToInt(lText,Result))) {
                  throw Exception.Create($New(EQTXSize),"Unsupported size format: " + TVariant.AsString(lData));
               }
               break;
            case 3 :
               return $VarToInt(lData,"");
               break;
            default :
               throw Exception.Create($New(EQTXSize),"Unsupported size format: " + TVariant.AsString(lData));
         }
      } finally {return Result.v}
   }
   /// procedure TQTXSize.SetType(Value: TQTXSizeType)
   ///  [line: 799, column: 20, file: qtx.dom.graphics]
   ,SetType:function(Self, Value$2) {
      var lData = 0;
      if (Value$2 != Self.FType) {
         if (Self.FReference.style[Self.FName$1]) {
            lData = TQTXSize.GetValue(Self);
            Self.FType = Value$2;
            TQTXSize.SetValue(Self,lData);
         } else {
            Self.FType = Value$2;
         }
      }
   }
   /// procedure TQTXSize.SetValue(Value: int32)
   ///  [line: 787, column: 20, file: qtx.dom.graphics]
   ,SetValue:function(Self, Value$2) {
      switch (Self.FType) {
         case 0 :
            Self.FReference.style[Self.FName$1] = TVariant.AsString(Value$2) + "px";
            break;
         case 1 :
            Self.FReference.style[Self.FName$1] = TVariant.AsString(Value$2) + "%";
            break;
         case 2 :
            Self.FReference.style[Self.FName$1] = TVariant.AsString(Value$2) + "em";
            break;
         case 3 :
            Self.FReference.style[Self.FName$1] = TVariant.AsString(Value$2) + "pt";
            break;
      }
      if (Self.OnChange) {
         Self.OnChange(Self);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TQTXOrientation enumeration
///  [line: 428, column: 3, file: qtx.dom.graphics]
var TQTXOrientation = [ "foLandscape", "foPortrait" ];
/// TPoint = record
///  [line: 430, column: 3, file: qtx.dom.graphics]
function Copy$TPoint(s,d) {
   d.X$1=s.X$1;
   d.Y$1=s.Y$1;
   return d;
}
function Clone$TPoint($) {
   return {
      X$1:$.X$1,
      Y$1:$.Y$1
   }
}
/// TExposure enumeration
///  [line: 427, column: 3, file: qtx.dom.graphics]
var TExposure = [ "esVisible", "esPartly", "esNone" ];
function StrToColor(Value$2) {
   Value$2 = { v : Value$2 };
   var Result = 0;
   var lTokens = [],
      values$2 = [],
      x$5 = 0,
      el = {v:""},
      lTemp = { v : 0 };
   Value$2.v = (Trim$_String_(Value$2.v)).toLocaleLowerCase();
   if (Value$2.v.length < 1) {
      return 536870911;
   }
   if (Value$2.v == "transparent") {
      return 536870911;
   }
   if (Value$2.v.charAt(0) == "#") {
      if (Value$2.v.length == 7) {
         return $VarToInt((Hex28[Value$2.v.substr(1,2)] * 65536 + Hex28[Value$2.v.substr(3,2)] * 256 + Hex28[Value$2.v.substr(5,2)]),"");
      } else {
         Delete(Value$2,1,1);
         return parseInt("0x" + Value$2.v,16);
      }
   }
   if (Value$2.v.charAt(0) == "$") {
      Delete(Value$2,1,1);
      return parseInt("0x" + Value$2.v,16);
   }
   if (Value$2.v.substr(0,2)=="0x") {
      return parseInt(Value$2.v,16);
   }
   if (!(Value$2.v.substr(0,4)=="rgb(")) {
      return 536870911;
   }
   if (!(Value$2.v.charAt(Value$2.v.length-1)==")")) {
      return 536870911;
   }
   Delete(Value$2,1,4);
   Delete(Value$2,Value$2.v.length,1);
   Value$2.v = Trim$_String_(Value$2.v);
   lTokens = Value$2.v.split(",");
   if (lTokens.length != 3) {
      return 536870911;
   }
   values$2 = [0, 0, 0];
   for(x$5=0;x$5<=2;x$5++) {
      el.v = lTokens[x$5];
      if (el.v.length < 1) {
         return 536870911;
      }
      if ((el.v.indexOf(".")+1) > 0) {
         return 536870911;
      }
      if (el.v.charAt(0) == "$") {
         Delete(el,1,1);
         if (el.v.length == 1) {
            el.v = "0" + el.v;
         } else {
            SetLength(el,2);
         }
         values$2[x$5]=$VarToInt(Hex28[el.v],"");
         continue;
      }
      if (el.v.substr(0,2)=="0x") {
         Delete(el,1,2);
         if (el.v.length == 1) {
            el.v = "0" + el.v;
         } else {
            SetLength(el,2);
         }
         values$2[x$5]=$VarToInt(Hex28[el.v],"");
         continue;
      }
      if (TryStrToInt(el.v,lTemp)) {
         values$2[x$5]=lTemp.v;
      } else {
         return 536870911;
      }
   }
   Result = ((values$2[0]*65536) + (values$2[1]*256) + values$2[2]);
   return Result
};
/// EQTXSize = class (EQTXException)
///  [line: 519, column: 3, file: qtx.dom.graphics]
var EQTXSize = {
   $ClassName:"EQTXSize",$Parent:EQTXException
   ,$Init:function ($) {
      EQTXException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function ColorToStr(Value$2) {
   var Result = "";
   var R$1 = 0,
      G$1 = 0,
      B$1 = 0;
   if (Value$2 == 536870911) {
      return "transparent";
   }
   R$1 = (Value$2>>>16)&255;
   G$1 = (Value$2>>>8)&255;
   B$1 = Value$2&255;
   R$1 = (R$1 < 0)?0:(R$1 > 255)?255:R$1;
   G$1 = (G$1 < 0)?0:(G$1 > 255)?255:G$1;
   B$1 = (B$1 < 0)?0:(B$1 > 255)?255:B$1;
   Result = "#"+B2Hex[R$1]+B2Hex[G$1]+B2Hex[B$1];
   return Result
};
/// TQTXWidgetBackground = class (TQTXOwnedObject)
///  [line: 31, column: 3, file: qtx.dom.background]
var TQTXWidgetBackground = {
   $ClassName:"TQTXWidgetBackground",$Parent:TQTXOwnedObject
   ,$Init:function ($) {
      TQTXOwnedObject.$Init($);
      $.FHandle$5 = undefined;
      $.FOwner$2 = null;
   }
   /// constructor TQTXWidgetBackground.Create(Owner: TQTXWidget)
   ///  [line: 51, column: 34, file: qtx.dom.background]
   ,Create$91:function(Self, Owner$10) {
      TQTXOwnedObject.Create$9(Self,Owner$10);
      Self.FOwner$2 = Owner$10;
      Self.FHandle$5 = TQTXComponent.GetHandle$(Self.FOwner$2);
      return Self
   }
   /// function TQTXWidgetBackground.GetColor() : TColor
   ///  [line: 63, column: 31, file: qtx.dom.background]
   ,GetColor$2:function(Self) {
      var Result = 0;
      var lValue;
      if (Self.FHandle$5.style["background-color"]) {
         lValue = Self.FHandle$5.style["background-color"];
         if (TVariant.IsString(lValue)) {
            Result = StrToColor(String(lValue));
         } else {
            Result = 536870911;
         }
      } else {
         Result = 536870911;
      }
      return Result
   }
   /// procedure TQTXWidgetBackground.SetColor(Value: TColor)
   ///  [line: 76, column: 32, file: qtx.dom.background]
   ,SetColor$3:function(Self, Value$2) {
      Self.FHandle$5.style["background-color"] = ColorToStr(Value$2);
   }
   ,Destroy:TObject.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
};
TQTXWidgetBackground.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXCSSRules = class (TObject)
///  [line: 32, column: 3, file: qtx.dom.stylesheet]
var TQTXCSSRules = {
   $ClassName:"TQTXCSSRules",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$4 = undefined;
      $.FRules = undefined;
      $.FSheet = undefined;
   }
   /// procedure TQTXCSSRules.AddStyles(SheetText: String)
   ///  [line: 131, column: 24, file: qtx.dom.stylesheet]
   ,AddStyles:function(Self, SheetText) {
      Self.FHandle$4.innerHTML = Self.FHandle$4.innerHTML+"\r"+SheetText;
   }
   /// constructor TQTXCSSRules.Create()
   ///  [line: 80, column: 26, file: qtx.dom.stylesheet]
   ,Create$80:function(Self) {
      TObject.Create(Self);
      Self.FHandle$4 = document.createElement("style");
    (Self.FHandle$4).type = "text/css";
    document.head.appendChild(Self.FHandle$4);
    Self.FSheet = (Self.FHandle$4).styleSheet || (Self.FHandle$4).sheet;
    Self.FRules = (Self.FSheet).cssRules || (Self.FSheet).rules;
      return Self
   }
   /// destructor TQTXCSSRules.Destroy()
   ///  [line: 92, column: 25, file: qtx.dom.stylesheet]
   ,Destroy:function(Self) {
      if (Self.FHandle$4) {
         document.head.removeChild(Self.FHandle$4);
         Self.FHandle$4 = undefined;
         Self.FSheet = undefined;
         Self.FRules = undefined;
      }
      TObject.Destroy(Self);
   }
   /// function TQTXCSSRules.GetGlobalStyleSheet() : TQTXCSSRules
   ///  [line: 69, column: 29, file: qtx.dom.stylesheet]
   ,GetGlobalStyleSheet:function(Self) {
      var Result = null;
      if (_GlobalStyleSheet === null) {
         _GlobalStyleSheet = TQTXCSSRules.Create$80($New(TQTXCSSRules));
      }
      Result = _GlobalStyleSheet;
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TQTXCustomObserver = class (TQTXOwnedObject)
///  [line: 53, column: 3, file: qtx.dom.observers]
var TQTXCustomObserver = {
   $ClassName:"TQTXCustomObserver",$Parent:TQTXOwnedObject
   ,$Init:function ($) {
      TQTXOwnedObject.$Init($);
   }
   /// constructor TQTXCustomObserver.Create(AOwner: TQTXWidget)
   ///  [line: 244, column: 32, file: qtx.dom.observers]
   ,Create$9:function(Self, AOwner) {
      TQTXOwnedObject.Create$9(Self,AOwner);
      return Self
   }
   /// function TQTXCustomObserver.GetOwner() : TQTXWidget
   ///  [line: 249, column: 29, file: qtx.dom.observers]
   ,GetOwner$5:function(Self) {
      return $As(TQTXOwnedObject.GetOwner(Self),TQTXWidget);
   }
   ,Destroy:TObject.Destroy
   ,Create$9$:function($){return $.ClassType.Create$9.apply($.ClassType, arguments)}
   ,GetActive$:function($){return $.ClassType.GetActive($)}
   ,Observe$:function($){return $.ClassType.Observe($)}
   ,UnObserve$:function($){return $.ClassType.UnObserve($)}
};
TQTXCustomObserver.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXResizeObserver = class (TQTXCustomObserver)
///  [line: 68, column: 3, file: qtx.dom.observers]
var TQTXResizeObserver = {
   $ClassName:"TQTXResizeObserver",$Parent:TQTXCustomObserver
   ,$Init:function ($) {
      TQTXCustomObserver.$Init($);
      $.FActive$1 = false;
      $.FObserver = null;
   }
   /// constructor TQTXResizeObserver.Create(AOwner: TQTXWidget)
   ///  [line: 167, column: 32, file: qtx.dom.observers]
   ,Create$9:function(Self, AOwner) {
      TQTXCustomObserver.Create$9(Self,AOwner);
      Self.FObserver = new ResizeObserver($Event1(Self,TQTXResizeObserver.HandleResize));
      return Self
   }
   /// destructor TQTXResizeObserver.Destroy()
   ///  [line: 173, column: 31, file: qtx.dom.observers]
   ,Destroy:function(Self) {
      Self.FObserver.disconnect();
      Self.FObserver = null;
      TObject.Destroy(Self);
   }
   /// function TQTXResizeObserver.GetActive() : Boolean
   ///  [line: 207, column: 29, file: qtx.dom.observers]
   ,GetActive:function(Self) {
      return Self.FActive$1;
   }
   /// procedure TQTXResizeObserver.HandleResize(entries: JResizeObserverEntries)
   ///  [line: 180, column: 30, file: qtx.dom.observers]
   ,HandleResize:function(Self, entries$1) {
      if (TVariant.ClassInstance(Self)) {
         if (TQTXCustomObserver.GetOwner$5(Self).FState == 2) {
            if (Self.FActive$1) {
               try {
                  Self.FActive$1 = false;
                  Self.FObserver.disconnect();
               } catch ($e) {
                  /* null */
               }
            }
            return;
         }
         if (TQTXCustomObserver.GetOwner$5(Self).FState == 1) {
            TQTXWidget.Invalidate(TQTXCustomObserver.GetOwner$5(Self));
         }
      }
   }
   /// procedure TQTXResizeObserver.Observe()
   ///  [line: 212, column: 30, file: qtx.dom.observers]
   ,Observe:function(Self) {
      if (!(TQTXCustomObserver.GetActive$(Self))) {
         Self.FActive$1 = true;
         try {
            Self.FObserver.observe(TQTXComponent.GetHandle$(TQTXCustomObserver.GetOwner$5(Self)));
         } catch ($e) {
            var e$1 = $W($e);
            Self.FActive$1 = false;
            throw $e;
         }
      }
   }
   /// procedure TQTXResizeObserver.UnObserve()
   ///  [line: 231, column: 30, file: qtx.dom.observers]
   ,UnObserve:function(Self) {
      if (TQTXCustomObserver.GetActive$(Self)) {
         Self.FActive$1 = false;
         Self.FObserver.unobserve(TQTXComponent.GetHandle$(TQTXCustomObserver.GetOwner$5(Self)));
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9$:function($){return $.ClassType.Create$9.apply($.ClassType, arguments)}
   ,GetActive$:function($){return $.ClassType.GetActive($)}
   ,Observe$:function($){return $.ClassType.Observe($)}
   ,UnObserve$:function($){return $.ClassType.UnObserve($)}
};
TQTXResizeObserver.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXMoveObserver = class (TQTXCustomObserver)
///  [line: 83, column: 3, file: qtx.dom.observers]
var TQTXMoveObserver = {
   $ClassName:"TQTXMoveObserver",$Parent:TQTXCustomObserver
   ,$Init:function ($) {
      TQTXCustomObserver.$Init($);
      $.FActive$2 = false;
   }
   /// constructor TQTXMoveObserver.Create(AOwner: TQTXWidget)
   ///  [line: 108, column: 30, file: qtx.dom.observers]
   ,Create$9:function(Self, AOwner) {
      TQTXCustomObserver.Create$9(Self,AOwner);
      return Self
   }
   /// destructor TQTXMoveObserver.Destroy()
   ///  [line: 113, column: 29, file: qtx.dom.observers]
   ,Destroy:function(Self) {
      if (Self.FActive$2) {
         TQTXCustomObserver.UnObserve$(Self);
      }
      TObject.Destroy(Self);
   }
   /// function TQTXMoveObserver.GetActive() : Boolean
   ///  [line: 140, column: 27, file: qtx.dom.observers]
   ,GetActive:function(Self) {
      return Self.FActive$2;
   }
   /// procedure TQTXMoveObserver.HandleMove()
   ///  [line: 120, column: 28, file: qtx.dom.observers]
   ,HandleMove:function(Self) {
      if (TQTXCustomObserver.GetOwner$5(Self).FState == 2) {
         if (Self.FActive$2) {
            try {
               Self.FActive$2 = false;
            } catch ($e) {
               /* null */
            }
         }
         return;
      }
      if (TQTXCustomObserver.GetOwner$5(Self).FState == 1) {
         $AsIntf(TQTXCustomObserver.GetOwner$5(Self),"IQTXWidgetAccess")[0]();
      }
   }
   /// procedure TQTXMoveObserver.Observe()
   ///  [line: 145, column: 28, file: qtx.dom.observers]
   ,Observe:function(Self) {
      if (!(TQTXCustomObserver.GetActive$(Self))) {
         TQTXComponent.GetHandle$(TQTXCustomObserver.GetOwner$5(Self)).addEventListener("move",$Event0(Self,TQTXMoveObserver.HandleMove),true);
         Self.FActive$2 = true;
      }
   }
   /// procedure TQTXMoveObserver.UnObserve()
   ///  [line: 154, column: 28, file: qtx.dom.observers]
   ,UnObserve:function(Self) {
      if (TQTXCustomObserver.GetActive$(Self)) {
         TQTXComponent.GetHandle$(TQTXCustomObserver.GetOwner$5(Self)).removeEventListener("move",$Event0(Self,TQTXMoveObserver.HandleMove),true);
         Self.FActive$2 = false;
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9$:function($){return $.ClassType.Create$9.apply($.ClassType, arguments)}
   ,GetActive$:function($){return $.ClassType.GetActive($)}
   ,Observe$:function($){return $.ClassType.Observe($)}
   ,UnObserve$:function($){return $.ClassType.UnObserve($)}
};
TQTXMoveObserver.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// JBoxSize = record
///  [line: 30, column: 3, file: qtx.dom.observers]
function Copy$JBoxSize(s,d) {
   return d;
}
function Clone$JBoxSize($) {
   return {

   }
}
/// TQTXDOMDelegate = class (TQTXDelegate)
///  [line: 34, column: 3, file: qtx.dom.events]
var TQTXDOMDelegate = {
   $ClassName:"TQTXDOMDelegate",$Parent:TQTXDelegate
   ,$Init:function ($) {
      TQTXDelegate.$Init($);
   }
   /// procedure TQTXDOMDelegate.DoBind()
   ///  [line: 149, column: 27, file: qtx.dom.events]
   ,DoBind:function(Self) {
      var lAccess = null;
      if (TQTXDOMDelegate.a$1316(Self)) {
         if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(TQTXDOMDelegate.a$1316(Self)))) {
            lAccess = TQTXComponent.GetHandle$(TQTXDOMDelegate.a$1316(Self));
            lAccess.addEventListener(Self.FEventid,$Event1(Self,TQTXDelegate.DoExecute$),(Self.EventMode==0));
         } else {
            throw Exception.Create($New(EQTXDelegateFailedBind),"Binding failed, invalid widget handle");
         }
      } else {
         throw Exception.Create($New(EQTXDelegateFailedBind),"Binding failed, invalid widget");
      }
   }
   /// procedure TQTXDOMDelegate.DoRelease()
   ///  [line: 165, column: 27, file: qtx.dom.events]
   ,DoRelease:function(Self) {
      var lAccess = null;
      if (TQTXDOMDelegate.a$1316(Self)) {
         if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(TQTXDOMDelegate.a$1316(Self)))) {
            lAccess = TQTXComponent.GetHandle$(TQTXDOMDelegate.a$1316(Self));
            lAccess.removeEventListener(Self.FEventid,$Event1(Self,TQTXDelegate.DoExecute$),(Self.EventMode==0));
         } else {
            throw Exception.Create($New(EQTXDelegateFailedRelease),"Failed to release delegate, invalid control handle error");
         }
      } else {
         throw Exception.Create($New(EQTXDelegateFailedRelease),"Failed to release delegate, control was NIL error");
      }
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 40, column: 43, file: qtx.dom.events]
   ,a$1316:function(Self) {
      var Result = null;
      Result = $As(TQTXOwnedObject.GetOwner(Self),TQTXComponent);
      return Result
   }
   /// constructor TQTXDOMDelegate.Create(Parent: TQTXComponent)
   ///  [line: 131, column: 29, file: qtx.dom.events]
   ,Create$93:function(Self, Parent) {
      var lAccess = null;
      TQTXDelegate.Create$9(Self,Parent);
      lAccess = $AsIntf(Parent,"IQTXDOMDelegateHost");
      if (!(lAccess===null)) {
         lAccess[0](Self);
      }
      return Self
   }
   /// destructor TQTXDOMDelegate.Destroy()
   ///  [line: 140, column: 28, file: qtx.dom.events]
   ,Destroy:function(Self) {
      var lAccess = null;
      lAccess = $AsIntf(TQTXDOMDelegate.a$1316(Self),"IQTXDOMDelegateHost");
      if (!(lAccess===null)) {
         lAccess[1](Self);
      }
      TQTXDelegate.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind$:function($){return $.ClassType.DoBind($)}
   ,DoExecute:TQTXDelegate.DoExecute
   ,DoRelease$:function($){return $.ClassType.DoRelease($)}
};
TQTXDOMDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXViewPort = class (TQTXWidgetContainer)
///  [line: 61, column: 3, file: qtx.dom.application]
var TQTXViewPort = {
   $ClassName:"TQTXViewPort",$Parent:TQTXWidgetContainer
   ,$Init:function ($) {
      TQTXWidgetContainer.$Init($);
   }
   /// procedure TQTXViewPort.ObjectReady()
   ///  [line: 193, column: 24, file: qtx.dom.application]
   ,ObjectReady:function(Self) {
      TQTXWidgetContainer.ObjectReady(Self);
      TQTXCustomObserver.Observe$(Self.FResizeObserver);
   }
   /// constructor TQTXViewPort.Create(AOwner: TQTXComponent; CB: TQTXViewPortConstructor)
   ///  [line: 178, column: 26, file: qtx.dom.application]
   ,Create$94:function(Self, AOwner, CB) {
      TQTXWidget.Create$11(Self,AOwner,function (Widget) {
         if (CB) {
            CB(Self);
         }
      });
      return Self
   }
   /// destructor TQTXViewPort.Destroy()
   ///  [line: 187, column: 25, file: qtx.dom.application]
   ,Destroy:function(Self) {
      TQTXCustomObserver.UnObserve$(Self.FResizeObserver);
      TQTXWidget.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXViewPort.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXApplication = class (TQTXComponent)
///  [line: 31, column: 3, file: qtx.application]
var TQTXApplication = {
   $ClassName:"TQTXApplication",$Parent:TQTXComponent
   ,$Init:function ($) {
      TQTXComponent.$Init($);
      $.FDestroying = $.FRunning = $.FTerminated = false;
   }
   /// constructor TQTXApplication.Create(AOwner: TQTXComponent; CB: TQTXComponentConstructor)
   ///  [line: 65, column: 29, file: qtx.application]
   ,Create$10:function(Self, AOwner, CB) {
      TQTXComponent.Create$10(Self,AOwner,function (Component) {
         TQTXApplication.InitializeObject$1$(Self);
         if (CB) {
            CB(Self);
         }
      });
      return Self
   }
   /// destructor TQTXApplication.Destroy()
   ///  [line: 75, column: 28, file: qtx.application]
   ,Destroy:function(Self) {
      Self.FDestroying = true;
      TQTXApplication.FinalizeObject$1$(Self);
      TQTXApplication.RegisterAppInstance(TQTXApplication,null);
      TObject.Destroy(Self);
   }
   /// procedure TQTXApplication.FinalizeObject()
   ///  [line: 98, column: 27, file: qtx.application]
   ,FinalizeObject$1:function(Self) {
      if (!(TQTXApplication.GetTerminated(Self))) {
         TQTXApplication.Terminate(Self);
      }
   }
   /// function TQTXApplication.GetApplicationInstance() : TQTXApplication
   ///  [line: 83, column: 33, file: qtx.application]
   ,GetApplicationInstance:function(Self) {
      return AppInstance;
   }
   /// function TQTXApplication.GetTerminated() : Boolean
   ///  [line: 126, column: 26, file: qtx.application]
   ,GetTerminated:function(Self) {
      return Self.FTerminated;
   }
   /// procedure TQTXApplication.InitializeObject()
   ///  [line: 93, column: 27, file: qtx.application]
   ,InitializeObject$1:function(Self) {
      TQTXApplication.RegisterAppInstance(TQTXApplication,Self);
   }
   /// procedure TQTXApplication.RegisterAppInstance(Value: TQTXApplication)
   ///  [line: 88, column: 33, file: qtx.application]
   ,RegisterAppInstance:function(Self, Value$2) {
      AppInstance = Value$2;
   }
   /// procedure TQTXApplication.SetTerminated(Value: Boolean)
   ///  [line: 131, column: 27, file: qtx.application]
   ,SetTerminated:function(Self, Value$2) {
      Self.FTerminated = Value$2;
   }
   /// procedure TQTXApplication.Terminate()
   ///  [line: 113, column: 27, file: qtx.application]
   ,Terminate:function(Self) {
      if (Self.FRunning) {
         if (!(TQTXApplication.GetTerminated(Self))) {
            TQTXApplication.SetTerminated(Self,true);
            if (!(Self.FDestroying)) {
               TObject.Free(Self);
            }
         }
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10$:function($){return $.ClassType.Create$10.apply($.ClassType, arguments)}
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXComponent.GetInstanceName
   ,SetOwner$1:TQTXComponent.SetOwner$1
   ,DoExecute$1$:function($){return $.ClassType.DoExecute$1($)}
   ,FinalizeObject$1$:function($){return $.ClassType.FinalizeObject$1($)}
   ,InitializeObject$1$:function($){return $.ClassType.InitializeObject$1($)}
};
TQTXApplication.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMApplication = class (TQTXApplication)
///  [line: 82, column: 3, file: qtx.dom.application]
var TQTXDOMApplication = {
   $ClassName:"TQTXDOMApplication",$Parent:TQTXApplication
   ,$Init:function ($) {
      TQTXApplication.$Init($);
      $.FCurrent = null;
      $.FDelegates$1 = [];
      $.FForms = [];
      $.FOrientation = 0;
   }
   /// constructor TQTXDOMApplication.Create(AOwner: TQTXComponent; CB: TQTXComponentConstructor)
   ///  [line: 327, column: 32, file: qtx.dom.application]
   ,Create$10:function(Self, AOwner, CB) {
      TQTXApplication.Create$10(Self,AOwner,function (Component) {
         window.addEventListener("orientationchange",$Event0(Self,TQTXDOMApplication.HandleOrientationChanged));
         if (CB) {
            CB(Self);
         }
      });
      return Self
   }
   /// destructor TQTXDOMApplication.Destroy()
   ///  [line: 338, column: 31, file: qtx.dom.application]
   ,Destroy:function(Self) {
      TQTXApplication.Destroy(Self);
   }
   /// procedure TQTXDOMApplication.DoExecute()
   ///  [line: 507, column: 30, file: qtx.dom.application]
   ,DoExecute$1:function(Self) {
      /* null */
   }
   /// function TQTXDOMApplication.GetCurrentForm() : TQTXForm
   ///  [line: 494, column: 29, file: qtx.dom.application]
   ,GetCurrentForm:function(Self) {
      return Self.FCurrent;
   }
   /// function TQTXDOMApplication.GetHandle() : THandle
   ///  [line: 391, column: 29, file: qtx.dom.application]
   ,GetHandle:function(Self) {
      return undefined;
   }
   /// procedure TQTXDOMApplication.HandleOrientationChanged()
   ///  [line: 444, column: 30, file: qtx.dom.application]
   ,HandleOrientationChanged:function(Self) {
      var wd = 0,
         hd = 0;
      wd = TQTXBrowser.ReadComputedInt(TQTXBrowser,document.body,"width");
      hd = TQTXBrowser.ReadComputedInt(TQTXBrowser,document.body,"height");
      if (wd > hd) {
         Self.FOrientation = 0;
      } else {
         Self.FOrientation = 1;
      }
      if (Self.FCurrent !== null) {
         TQTXWidget.Invalidate(Self.FCurrent);
      }
   }
   /// procedure TQTXDOMApplication.RegisterDelegate(Delegate: TQTXDOMDelegate)
   ///  [line: 421, column: 30, file: qtx.dom.application]
   ,RegisterDelegate$1:function(Self, Delegate$2) {
      if (Delegate$2 !== null) {
         if (Self.FDelegates$1.indexOf(Delegate$2) < 0) {
            Self.FDelegates$1.push(Delegate$2);
         }
      } else {
         throw Exception.Create($New(EQTXDelegateFailedRegister),"Failed to register delegate, instance was nil error");
      }
   }
   /// procedure TQTXDOMApplication.RegisterForm(Value: TQTXForm)
   ///  [line: 457, column: 30, file: qtx.dom.application]
   ,RegisterForm:function(Self, Value$2) {
      if (Value$2 !== null) {
         if (Self.FForms.indexOf(Value$2) >= 0) {
            throw EException.CreateFmt($New(EQTXDOMApplicationFormAlreadyRegistered),$R[11],[TQTXComponent.GetName(Value$2)]);
         }
         Self.FForms.push(Value$2);
      } else {
         throw Exception.Create($New(EQTXDOMApplicationFormInvalid),$R[12]);
      }
   }
   /// procedure TQTXDOMApplication.SetCurrentForm(Value: TQTXForm)
   ///  [line: 499, column: 30, file: qtx.dom.application]
   ,SetCurrentForm:function(Self, Value$2) {
      if (Value$2 !== Self.FCurrent) {
         Self.FCurrent = Value$2;
      }
   }
   /// procedure TQTXDOMApplication.ShowForm(Value: TQTXForm)
   ///  [line: 417, column: 30, file: qtx.dom.application]
   ,ShowForm:function(Self, Value$2) {
      /* null */
   }
   /// procedure TQTXDOMApplication.UnRegisterDelegate(Delegate: TQTXDOMDelegate)
   ///  [line: 431, column: 30, file: qtx.dom.application]
   ,UnRegisterDelegate$1:function(Self, Delegate$2) {
      var lIndex = 0;
      if (Delegate$2 !== null) {
         lIndex = Self.FDelegates$1.indexOf(Delegate$2);
         if (lIndex >= 0) {
            Self.FDelegates$1.splice(lIndex,1)
            ;
         } else {
            throw Exception.Create($New(EQTXDelegateFailedRegister),"Failed to unregister delegate, not in collection error");
         }
      } else {
         throw Exception.Create($New(EQTXDelegateFailedRegister),"Failed to unregister delegate, instance was nil error");
      }
   }
   /// procedure TQTXDOMApplication.UnRegisterForm(Value: TQTXForm)
   ///  [line: 469, column: 30, file: qtx.dom.application]
   ,UnRegisterForm:function(Self, Value$2) {
      var lIndex = 0;
      if (Value$2 !== null) {
         lIndex = Self.FForms.indexOf(Value$2);
         if (lIndex < 0) {
            throw EException.CreateFmt($New(EQTXDOMApplicationFormUnRegisterUnknown),$R[14],[TQTXComponent.GetName(Value$2)]);
         }
         Self.FForms.splice(lIndex,1)
         ;
         if (Self.FCurrent === Value$2) {
            if (Self.FForms.length > 0) {
               if (lIndex > 0) {
                  --lIndex;
               }
               TQTXDOMApplication.SetCurrentForm(Self,Value$2);
            }
         }
      } else {
         throw Exception.Create($New(EQTXDOMApplicationFormUnRegisterInvalid),$R[13]);
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10$:function($){return $.ClassType.Create$10.apply($.ClassType, arguments)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetInstanceName:TQTXComponent.GetInstanceName
   ,SetOwner$1:TQTXComponent.SetOwner$1
   ,DoExecute$1$:function($){return $.ClassType.DoExecute$1($)}
   ,FinalizeObject$1:TQTXApplication.FinalizeObject$1
   ,InitializeObject$1:TQTXApplication.InitializeObject$1
   ,RegisterForm$:function($){return $.ClassType.RegisterForm.apply($.ClassType, arguments)}
   ,ShowForm$:function($){return $.ClassType.ShowForm.apply($.ClassType, arguments)}
};
TQTXDOMApplication.$Intf={
   IQTXDOMDelegateHost:[TQTXDOMApplication.RegisterDelegate$1,TQTXDOMApplication.UnRegisterDelegate$1]
   ,IQTXDOMApplicationFormControl:[TQTXDOMApplication.RegisterForm,TQTXDOMApplication.UnRegisterForm,TQTXDOMApplication.ShowForm,TQTXDOMApplication.SetCurrentForm,TQTXDOMApplication.GetCurrentForm]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDisplay = class (TQTXWidgetContainer)
///  [line: 69, column: 3, file: qtx.dom.application]
var TQTXDisplay = {
   $ClassName:"TQTXDisplay",$Parent:TQTXWidgetContainer
   ,$Init:function ($) {
      TQTXWidgetContainer.$Init($);
      $.FViewPort = null;
   }
   /// constructor TQTXDisplay.Create(AOwner: TQTXComponent; CB: TQTXDisplayConstructor)
   ///  [line: 203, column: 25, file: qtx.dom.application]
   ,Create$97:function(Self, AOwner, CB) {
      TQTXWidget.Create$11(Self,AOwner,function (Widget) {
         Self.FViewPort = TQTXViewPort.Create$94($New(TQTXViewPort),Self,function (ViewPort) {
            TQTXWidget.SetPositionMode(ViewPort,4);
            TQTXWidget.SetDisplayMode(ViewPort,3);
            TQTXWidget.a$892(ViewPort).width = "100%";
            TQTXWidget.a$892(ViewPort).overflow = "hidden";
            if (CB) {
               CB(Self);
            }
         });
      });
      return Self
   }
   /// destructor TQTXDisplay.Destroy()
   ///  [line: 220, column: 24, file: qtx.dom.application]
   ,Destroy:function(Self) {
      TObject.Free(Self.FViewPort);
      TQTXWidget.Destroy(Self);
   }
   /// procedure TQTXDisplay.ObjectReady()
   ///  [line: 226, column: 23, file: qtx.dom.application]
   ,ObjectReady:function(Self) {
      TQTXWidgetContainer.ObjectReady(Self);
      TQTXCustomObserver.Observe$(Self.FResizeObserver);
   }
   /// procedure TQTXDisplay.Resize(Orientation: TQTXOrientation)
   ///  [line: 238, column: 23, file: qtx.dom.application]
   ,Resize:function(Self, Orientation$1) {
      var lBounds = {Bottom$1:0,Left$2:0,Right$1:0,Top$2:0},
         lHeight = 0,
         lChildren = [],
         x$5 = 0,
         lObj = null,
         lYpos = 0,
         x$6 = 0,
         lObj$1 = null;
      TQTXWidget.Resize(Self,Orientation$1);
      if (Self.FState == 1) {
         lBounds = TQTXWidgetBorder.AdjustRect(TQTXWidget.GetBorder(Self),TQTXWidget.GetClientRect(Self));
         lHeight = TRect$Height$1(lBounds);
         lChildren = TQTXWidgetContainer.GetChildrenSortedByYPos(Self);
         var $temp17;
         for(x$5=0,$temp17=lChildren.length;x$5<$temp17;x$5++) {
            lObj = lChildren[x$5];
            if ($Is(lObj,TQTXWidget)) {
               if (lObj !== Self.FViewPort) {
                  (lHeight-= TQTXWidget.GetHeight(lObj));
               }
            }
         }
         TQTXWidget.SetHeight$(Self.FViewPort,lHeight);
         lYpos = lBounds.Top$2;
         var $temp18;
         for(x$6=0,$temp18=lChildren.length;x$6<$temp18;x$6++) {
            lObj$1 = lChildren[x$6];
            if ($Is(lObj$1,TQTXWidget)) {
               TQTXWidget.SetTop(lObj$1,lYpos);
               (lYpos+= TQTXWidget.GetHeight(lObj$1));
            }
         }
      }
   }
   /// procedure TQTXDisplay.StyleObject()
   ///  [line: 232, column: 23, file: qtx.dom.application]
   ,StyleObject:function(Self) {
      TQTXWidget.StyleObject(Self);
      TQTXWidget.a$892(Self).overflow = "hidden";
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize.apply($.ClassType, arguments)}
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TQTXDisplay.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXDisplay.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// EQTXApplication = class (EQTXException)
///  [line: 29, column: 3, file: qtx.application]
var EQTXApplication = {
   $ClassName:"EQTXApplication",$Parent:EQTXException
   ,$Init:function ($) {
      EQTXException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXDOMApplication = class (EQTXApplication)
///  [line: 38, column: 3, file: qtx.dom.application]
var EQTXDOMApplication = {
   $ClassName:"EQTXDOMApplication",$Parent:EQTXApplication
   ,$Init:function ($) {
      EQTXApplication.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXDOMApplicationFormUnRegisterUnknown = class (EQTXDOMApplication)
///  [line: 43, column: 3, file: qtx.dom.application]
var EQTXDOMApplicationFormUnRegisterUnknown = {
   $ClassName:"EQTXDOMApplicationFormUnRegisterUnknown",$Parent:EQTXDOMApplication
   ,$Init:function ($) {
      EQTXDOMApplication.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXDOMApplicationFormUnRegisterInvalid = class (EQTXDOMApplication)
var EQTXDOMApplicationFormUnRegisterInvalid = {
   $ClassName:"EQTXDOMApplicationFormUnRegisterInvalid",$Parent:EQTXDOMApplication
   ,$Init:function ($) {
      EQTXDOMApplication.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXDOMApplicationFormInvalid = class (EQTXDOMApplication)
///  [line: 39, column: 3, file: qtx.dom.application]
var EQTXDOMApplicationFormInvalid = {
   $ClassName:"EQTXDOMApplicationFormInvalid",$Parent:EQTXDOMApplication
   ,$Init:function ($) {
      EQTXDOMApplication.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EQTXDOMApplicationFormAlreadyRegistered = class (EQTXDOMApplication)
///  [line: 40, column: 3, file: qtx.dom.application]
var EQTXDOMApplicationFormAlreadyRegistered = {
   $ClassName:"EQTXDOMApplicationFormAlreadyRegistered",$Parent:EQTXDOMApplication
   ,$Init:function ($) {
      EQTXDOMApplication.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function Application() {
   return $As(TQTXApplication.GetApplicationInstance(TQTXApplication),TQTXDOMApplication);
};
/// TQTXDOMMouseDelegate = class (TQTXDOMDelegate)
///  [line: 41, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseDelegate = {
   $ClassName:"TQTXDOMMouseDelegate",$Parent:TQTXDOMDelegate
   ,$Init:function ($) {
      TQTXDOMDelegate.$Init($);
      $.OnExecute = null;
   }
   /// procedure TQTXDOMMouseDelegate.DoExecute(Event: JEvent)
   ///  [line: 162, column: 32, file: qtx.dom.events.mouse]
   ,DoExecute:function(Self, Event$1) {
      if (Self.OnExecute) {
         Self.OnExecute(Self,Event$1);
      }
   }
   /// procedure TQTXDOMMouseDelegate.Bind(Handler: TQTXMouseDelegateHandler)
   ///  [line: 173, column: 32, file: qtx.dom.events.mouse]
   ,Bind$2:function(Self, Handler) {
      var lTemp = null;
      lTemp = Handler;
      TQTXDelegate.Bind$1(Self,TQTXDOMMouseDelegate.GetEventName$(Self),lTemp);
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute$:function($){return $.ClassType.DoExecute.apply($.ClassType, arguments)}
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMMouseWheelDelegate = class (TQTXDOMMouseDelegate)
///  [line: 52, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseWheelDelegate = {
   $ClassName:"TQTXDOMMouseWheelDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
   }
   /// function TQTXDOMMouseWheelDelegate.GetEventName() : String
   ///  [line: 186, column: 36, file: qtx.dom.events.mouse]
   ,GetEventName:function(Self) {
      return "wheel";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMMouseDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseWheelDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMMouseUpDelegate = class (TQTXDOMMouseDelegate)
///  [line: 87, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseUpDelegate = {
   $ClassName:"TQTXDOMMouseUpDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
   }
   /// function TQTXDOMMouseUpDelegate.GetEventName() : String
   ///  [line: 231, column: 33, file: qtx.dom.events.mouse]
   ,GetEventName:function(Self) {
      return "mouseup";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMMouseDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseUpDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMMouseMoveDelegate = class (TQTXDOMMouseDelegate)
///  [line: 82, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseMoveDelegate = {
   $ClassName:"TQTXDOMMouseMoveDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
   }
   /// function TQTXDOMMouseMoveDelegate.GetEventName() : String
   ///  [line: 240, column: 35, file: qtx.dom.events.mouse]
   ,GetEventName:function(Self) {
      return "mousemove";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMMouseDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseMoveDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMMouseLeaveDelegate = class (TQTXDOMMouseDelegate)
///  [line: 72, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseLeaveDelegate = {
   $ClassName:"TQTXDOMMouseLeaveDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
   }
   /// function TQTXDOMMouseLeaveDelegate.GetEventName() : String
   ///  [line: 222, column: 36, file: qtx.dom.events.mouse]
   ,GetEventName:function(Self) {
      return "mouseleave";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMMouseDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseLeaveDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMMouseEnterDelegate = class (TQTXDOMMouseDelegate)
///  [line: 67, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseEnterDelegate = {
   $ClassName:"TQTXDOMMouseEnterDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
   }
   /// function TQTXDOMMouseEnterDelegate.GetEventName() : String
   ///  [line: 213, column: 36, file: qtx.dom.events.mouse]
   ,GetEventName:function(Self) {
      return "mouseenter";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMMouseDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseEnterDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMMouseDownDelegate = class (TQTXDOMMouseDelegate)
///  [line: 77, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseDownDelegate = {
   $ClassName:"TQTXDOMMouseDownDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
   }
   /// function TQTXDOMMouseDownDelegate.GetEventName() : String
   ///  [line: 249, column: 35, file: qtx.dom.events.mouse]
   ,GetEventName:function(Self) {
      return "mousedown";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMMouseDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseDownDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMMouseDblClickDelegate = class (TQTXDOMMouseDelegate)
///  [line: 62, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseDblClickDelegate = {
   $ClassName:"TQTXDOMMouseDblClickDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
   }
   /// function TQTXDOMMouseDblClickDelegate.GetEventName() : String
   ///  [line: 204, column: 39, file: qtx.dom.events.mouse]
   ,GetEventName:function(Self) {
      return "dblclick";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMMouseDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseDblClickDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMMouseClickDelegate = class (TQTXDOMMouseDelegate)
///  [line: 57, column: 3, file: qtx.dom.events.mouse]
var TQTXDOMMouseClickDelegate = {
   $ClassName:"TQTXDOMMouseClickDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
   }
   /// function TQTXDOMMouseClickDelegate.GetEventName() : String
   ///  [line: 195, column: 36, file: qtx.dom.events.mouse]
   ,GetEventName:function(Self) {
      return "click";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMMouseDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMMouseClickDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPointerDelegate = class (TQTXDOMMouseDelegate)
///  [line: 49, column: 3, file: qtx.dom.events.pointer]
var TQTXDOMPointerDelegate = {
   $ClassName:"TQTXDOMPointerDelegate",$Parent:TQTXDOMMouseDelegate
   ,$Init:function ($) {
      TQTXDOMMouseDelegate.$Init($);
      $.OnExecute = null;
   }
   /// procedure TQTXDOMPointerDelegate.DoExecute(Event: JEvent)
   ///  [line: 242, column: 34, file: qtx.dom.events.pointer]
   ,DoExecute:function(Self, Event$1) {
      if (Self.OnExecute) {
         Self.OnExecute(Self,Event$1);
      }
   }
   /// procedure TQTXDOMPointerDelegate.Bind(Handler: TQTXPointerDelegateHandler)
   ///  [line: 253, column: 34, file: qtx.dom.events.pointer]
   ,Bind$4:function(Self, Handler) {
      var lTemp = null;
      lTemp = Handler;
      TQTXDelegate.Bind$1(Self,TQTXDOMMouseDelegate.GetEventName$(Self),lTemp);
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute$:function($){return $.ClassType.DoExecute.apply($.ClassType, arguments)}
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName:TQTXDOMMouseDelegate.GetEventName
};
TQTXDOMPointerDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPointerUpDelegate = class (TQTXDOMPointerDelegate)
///  [line: 84, column: 3, file: qtx.dom.events.pointer]
var TQTXDOMPointerUpDelegate = {
   $ClassName:"TQTXDOMPointerUpDelegate",$Parent:TQTXDOMPointerDelegate
   ,$Init:function ($) {
      TQTXDOMPointerDelegate.$Init($);
   }
   /// function TQTXDOMPointerUpDelegate.GetEventName() : String
   ///  [line: 197, column: 35, file: qtx.dom.events.pointer]
   ,GetEventName:function(Self) {
      return "pointerup";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMPointerDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMPointerUpDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPointerMoveDelegate = class (TQTXDOMPointerDelegate)
///  [line: 79, column: 3, file: qtx.dom.events.pointer]
var TQTXDOMPointerMoveDelegate = {
   $ClassName:"TQTXDOMPointerMoveDelegate",$Parent:TQTXDOMPointerDelegate
   ,$Init:function ($) {
      TQTXDOMPointerDelegate.$Init($);
   }
   /// function TQTXDOMPointerMoveDelegate.GetEventName() : String
   ///  [line: 206, column: 37, file: qtx.dom.events.pointer]
   ,GetEventName:function(Self) {
      return "pointermove";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMPointerDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMPointerMoveDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPointerLostCaptureDelegate = class (TQTXDOMPointerDelegate)
///  [line: 94, column: 3, file: qtx.dom.events.pointer]
var TQTXDOMPointerLostCaptureDelegate = {
   $ClassName:"TQTXDOMPointerLostCaptureDelegate",$Parent:TQTXDOMPointerDelegate
   ,$Init:function ($) {
      TQTXDOMPointerDelegate.$Init($);
   }
   /// function TQTXDOMPointerLostCaptureDelegate.GetEventName() : String
   ///  [line: 179, column: 44, file: qtx.dom.events.pointer]
   ,GetEventName:function(Self) {
      return "lostpointercapture";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMPointerDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMPointerLostCaptureDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPointerLeaveDelegate = class (TQTXDOMPointerDelegate)
///  [line: 69, column: 3, file: qtx.dom.events.pointer]
var TQTXDOMPointerLeaveDelegate = {
   $ClassName:"TQTXDOMPointerLeaveDelegate",$Parent:TQTXDOMPointerDelegate
   ,$Init:function ($) {
      TQTXDOMPointerDelegate.$Init($);
   }
   /// function TQTXDOMPointerLeaveDelegate.GetEventName() : String
   ///  [line: 224, column: 38, file: qtx.dom.events.pointer]
   ,GetEventName:function(Self) {
      return "pointerleave";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMPointerDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMPointerLeaveDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPointerGotCaptureDelegate = class (TQTXDOMPointerDelegate)
///  [line: 89, column: 3, file: qtx.dom.events.pointer]
var TQTXDOMPointerGotCaptureDelegate = {
   $ClassName:"TQTXDOMPointerGotCaptureDelegate",$Parent:TQTXDOMPointerDelegate
   ,$Init:function ($) {
      TQTXDOMPointerDelegate.$Init($);
   }
   /// function TQTXDOMPointerGotCaptureDelegate.GetEventName() : String
   ///  [line: 170, column: 43, file: qtx.dom.events.pointer]
   ,GetEventName:function(Self) {
      return "gotpointercapture";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMPointerDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMPointerGotCaptureDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPointerEnterDelegate = class (TQTXDOMPointerDelegate)
///  [line: 64, column: 3, file: qtx.dom.events.pointer]
var TQTXDOMPointerEnterDelegate = {
   $ClassName:"TQTXDOMPointerEnterDelegate",$Parent:TQTXDOMPointerDelegate
   ,$Init:function ($) {
      TQTXDOMPointerDelegate.$Init($);
   }
   /// function TQTXDOMPointerEnterDelegate.GetEventName() : String
   ///  [line: 233, column: 38, file: qtx.dom.events.pointer]
   ,GetEventName:function(Self) {
      return "pointerenter";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMPointerDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMPointerEnterDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPointerDownDelegate = class (TQTXDOMPointerDelegate)
///  [line: 74, column: 3, file: qtx.dom.events.pointer]
var TQTXDOMPointerDownDelegate = {
   $ClassName:"TQTXDOMPointerDownDelegate",$Parent:TQTXDOMPointerDelegate
   ,$Init:function ($) {
      TQTXDOMPointerDelegate.$Init($);
   }
   /// function TQTXDOMPointerDownDelegate.GetEventName() : String
   ///  [line: 215, column: 37, file: qtx.dom.events.pointer]
   ,GetEventName:function(Self) {
      return "pointerdown";
   }
   ,Destroy:TQTXDOMDelegate.Destroy
   ,Create$9:TQTXDelegate.Create$9
   ,DoBind:TQTXDOMDelegate.DoBind
   ,DoExecute:TQTXDOMPointerDelegate.DoExecute
   ,DoRelease:TQTXDOMDelegate.DoRelease
   ,GetEventName$:function($){return $.ClassType.GetEventName($)}
};
TQTXDOMPointerDownDelegate.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXForm = class (TQTXWidgetContainer)
///  [line: 28, column: 3, file: qtx.dom.forms]
var TQTXForm = {
   $ClassName:"TQTXForm",$Parent:TQTXWidgetContainer
   ,$Init:function ($) {
      TQTXWidgetContainer.$Init($);
   }
   /// constructor TQTXForm.Create(AOwner: TQTXComponent; CB: TQTXFormConstructorCB)
   ///  [line: 122, column: 22, file: qtx.dom.forms]
   ,Create$98:function(Self, AOwner, CB) {
      TQTXWidget.Create$11(Self,AOwner,function (Widget) {
         if (CB) {
            CB(Self);
         }
      });
      return Self
   }
   /// procedure TQTXForm.FinalizeObject()
   ///  [line: 137, column: 20, file: qtx.dom.forms]
   ,FinalizeObject:function(Self) {
      $AsIntf(Application(),"IQTXDOMApplicationFormControl")[1](Self);
      TQTXWidget.FinalizeObject(Self);
   }
   /// procedure TQTXForm.FormHidden()
   ///  [line: 167, column: 20, file: qtx.dom.forms]
   ,FormHidden:function(Self) {
      /* null */
   }
   /// procedure TQTXForm.FormOrientation(Orientation: TQTXOrientation)
   ///  [line: 171, column: 20, file: qtx.dom.forms]
   ,FormOrientation:function(Self, Orientation$1) {
      /* null */
   }
   /// procedure TQTXForm.FormPresented()
   ///  [line: 163, column: 20, file: qtx.dom.forms]
   ,FormPresented:function(Self) {
      /* null */
   }
   /// function TQTXForm.GetInitialCSSClassName() : String
   ///  [line: 143, column: 19, file: qtx.dom.forms]
   ,GetInitialCSSClassName:function(Self) {
      return "TQTXForm";
   }
   /// function TQTXForm.GetInstanceName() : String
   ///  [line: 148, column: 19, file: qtx.dom.forms]
   ,GetInstanceName:function(Self) {
      return TQTXIdentifiers.MakeUniqueFormName(TQTXIdentifiers);
   }
   /// procedure TQTXForm.InitializeObject()
   ///  [line: 131, column: 20, file: qtx.dom.forms]
   ,InitializeObject:function(Self) {
      TQTXWidget.InitializeObject(Self);
      $AsIntf(Application(),"IQTXDOMApplicationFormControl")[0](Self);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName$:function($){return $.ClassType.GetInstanceName($)}
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName$:function($){return $.ClassType.GetInitialCSSClassName($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady:TQTXWidgetContainer.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXForm.$Intf={
   IQTXFormControl:[TQTXForm.FormPresented,TQTXForm.FormHidden,TQTXForm.FormOrientation]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXView = class (TObject)
///  [line: 51, column: 3, file: qtx.dom.view]
var TQTXView = {
   $ClassName:"TQTXView",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TQTXView.ConstructLayout(Host: TQTXWidgetContainer)
   ///  [line: 251, column: 20, file: qtx.dom.view]
   ,ConstructLayout:function(Self, Host) {
      /* null */
   }
   /// procedure TQTXView.DestroyLayout(Host: TQTXWidgetContainer)
   ///  [line: 256, column: 20, file: qtx.dom.view]
   ,DestroyLayout:function(Self, Host) {
      /* null */
   }
   /// procedure TQTXView.UpdateLayout(Host: TQTXWidgetContainer; Orientation: TQTXOrientation)
   ///  [line: 261, column: 20, file: qtx.dom.view]
   ,UpdateLayout:function(Self, Host, Orientation$1) {
      /* null */
   }
   ,Destroy:TObject.Destroy
   ,ConstructLayout$:function($){return $.ClassType.ConstructLayout.apply($.ClassType, arguments)}
   ,DestroyLayout$:function($){return $.ClassType.DestroyLayout.apply($.ClassType, arguments)}
   ,UpdateLayout$:function($){return $.ClassType.UpdateLayout.apply($.ClassType, arguments)}
};
TQTXView.$Intf={
   IQTXView:[TQTXView.ConstructLayout,TQTXView.DestroyLayout,TQTXView.UpdateLayout]
}
/// TQTXViewType enumeration
///  [line: 35, column: 3, file: qtx.dom.view]
var TQTXViewType = [ "vtNone", "vtAbsolute", "vtBlocking" ];
/// TQTXDOMVideo = class (TQTXWidget)
///  [line: 64, column: 3, file: qtx.dom.control.common]
var TQTXDOMVideo = {
   $ClassName:"TQTXDOMVideo",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMVideo.CreateElementInstance() : TWidgetHandle
   ///  [line: 474, column: 23, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("video");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMVideo.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMSpan = class (TQTXWidget)
///  [line: 147, column: 3, file: qtx.dom.control.common]
var TQTXDOMSpan = {
   $ClassName:"TQTXDOMSpan",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMSpan.CreateElementInstance() : TWidgetHandle
   ///  [line: 590, column: 22, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("span");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMSpan.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMRange = class (TQTXWidget)
///  [line: 189, column: 3, file: qtx.dom.control.common]
var TQTXDOMRange = {
   $ClassName:"TQTXDOMRange",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMRange.CreateElementInstance() : TWidgetHandle
   ///  [line: 498, column: 23, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("input");
      Result["type"] = "range";
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMRange.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMPre = class (TQTXWidget)
///  [line: 179, column: 3, file: qtx.dom.control.common]
var TQTXDOMPre = {
   $ClassName:"TQTXDOMPre",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMPre.CreateElementInstance() : TWidgetHandle
   ///  [line: 521, column: 21, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("pre");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMPre.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMParagraph = class (TQTXWidget)
///  [line: 174, column: 3, file: qtx.dom.control.common]
var TQTXDOMParagraph = {
   $ClassName:"TQTXDOMParagraph",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMParagraph.CreateElementInstance() : TWidgetHandle
   ///  [line: 532, column: 27, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("p");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMParagraph.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMLabel = class (TQTXWidget)
///  [line: 142, column: 3, file: qtx.dom.control.common]
var TQTXDOMLabel = {
   $ClassName:"TQTXDOMLabel",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMLabel.CreateElementInstance() : TWidgetHandle
   ///  [line: 601, column: 23, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("label");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMLabel.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMEdit = class (TQTXWidget)
///  [line: 194, column: 3, file: qtx.dom.control.common]
var TQTXDOMEdit = {
   $ClassName:"TQTXDOMEdit",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMEdit.CreateElementInstance() : TWidgetHandle
   ///  [line: 485, column: 22, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("input");
      Result["type"] = "text";
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMEdit.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMDiv = class (TQTXWidget)
///  [line: 37, column: 3, file: qtx.dom.control.common]
var TQTXDOMDiv = {
   $ClassName:"TQTXDOMDiv",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMDiv.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMCheckBox = class (TQTXWidget)
///  [line: 152, column: 3, file: qtx.dom.control.common]
var TQTXDOMCheckBox = {
   $ClassName:"TQTXDOMCheckBox",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMCheckBox.CreateElementInstance() : TWidgetHandle
   ///  [line: 578, column: 26, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("input");
      Result["type"] = "checkbox";
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMCheckBox.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMCanvas = class (TQTXWidget)
///  [line: 157, column: 3, file: qtx.dom.control.common]
var TQTXDOMCanvas = {
   $ClassName:"TQTXDOMCanvas",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMCanvas.CreateElementInstance() : TWidgetHandle
   ///  [line: 543, column: 24, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("canvas");
      return Result
   }
   /// procedure TQTXDOMCanvas.SetHeight(Value: int32)
   ///  [line: 561, column: 25, file: qtx.dom.control.common]
   ,SetHeight:function(Self, Value$2) {
      TQTXWidget.SetHeight(Self,Value$2);
      TQTXComponent.GetHandle$(Self).height = TQTXWidget.GetHeight(Self);
   }
   /// procedure TQTXDOMCanvas.SetSize(aWidth: int32; aHeight: int32)
   ///  [line: 567, column: 25, file: qtx.dom.control.common]
   ,SetSize:function(Self, aWidth, aHeight) {
      TQTXWidget.SetSize(Self,aWidth,aHeight);
      TQTXComponent.GetHandle$(Self).width = TQTXWidget.GetWidth(Self);
      TQTXComponent.GetHandle$(Self).height = TQTXWidget.GetHeight(Self);
   }
   /// procedure TQTXDOMCanvas.SetWidth(Value: int32)
   ///  [line: 555, column: 25, file: qtx.dom.control.common]
   ,SetWidth:function(Self, Value$2) {
      TQTXWidget.SetWidth(Self,Value$2);
      TQTXComponent.GetHandle$(Self).width = TQTXWidget.GetWidth(Self);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetSize$:function($){return $.ClassType.SetSize.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMCanvas.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMButton = class (TQTXWidget)
///  [line: 184, column: 3, file: qtx.dom.control.common]
var TQTXDOMButton = {
   $ClassName:"TQTXDOMButton",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMButton.CreateElementInstance() : TWidgetHandle
   ///  [line: 510, column: 24, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("button");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMButton.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMArticle = class (TQTXWidget)
///  [line: 137, column: 3, file: qtx.dom.control.common]
var TQTXDOMArticle = {
   $ClassName:"TQTXDOMArticle",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMArticle.CreateElementInstance() : TWidgetHandle
   ///  [line: 612, column: 25, file: qtx.dom.control.common]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("article");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMArticle.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXContentBoxVAlign enumeration
///  [line: 33, column: 3, file: qtx.dom.control.contentbox]
var TQTXContentBoxVAlign = [ "cvTop", "cvMiddle", "cvBottom" ];
/// TQTXContentBoxHAlign enumeration
///  [line: 32, column: 3, file: qtx.dom.control.contentbox]
var TQTXContentBoxHAlign = [ "chLeft", "chCenter", "chRight" ];
/// TQTXContentBox = class (TQTXWidget)
///  [line: 35, column: 3, file: qtx.dom.control.contentbox]
var TQTXContentBox = {
   $ClassName:"TQTXContentBox",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
      $.FHAlign = 1;
      $.FVAlign = 1;
   }
   /// function TQTXContentBox.GetInitialCSSClassName() : String
   ///  [line: 58, column: 25, file: qtx.dom.control.contentbox]
   ,GetInitialCSSClassName:function(Self) {
      return "TQTXContentBox";
   }
   /// procedure TQTXContentBox.SetHAlign(Value: TQTXContentBoxHAlign)
   ///  [line: 75, column: 26, file: qtx.dom.control.contentbox]
   ,SetHAlign:function(Self, Value$2) {
      if (Value$2 != Self.FHAlign) {
         Self.FHAlign = Value$2;
         switch (Value$2) {
            case 0 :
               TQTXComponent.GetHandle$(Self).style["align-items"] = "flex-start";
               break;
            case 1 :
               TQTXComponent.GetHandle$(Self).style["align-items"] = "center";
               break;
            case 2 :
               TQTXComponent.GetHandle$(Self).style["align-items"] = "flex-end";
               break;
         }
      }
   }
   /// procedure TQTXContentBox.SetVAlign(Value: TQTXContentBoxVAlign)
   ///  [line: 88, column: 26, file: qtx.dom.control.contentbox]
   ,SetVAlign:function(Self, Value$2) {
      if (Value$2 != Self.FVAlign) {
         Self.FVAlign = Value$2;
         switch (Value$2) {
            case 0 :
               TQTXComponent.GetHandle$(Self).style["align-content"] = "flex-start";
               break;
            case 1 :
               TQTXComponent.GetHandle$(Self).style["align-content"] = "center";
               break;
            case 2 :
               TQTXComponent.GetHandle$(Self).style["align-content"] = "flex-end";
               break;
         }
      }
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName$:function($){return $.ClassType.GetInitialCSSClassName($)}
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXContentBox.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXLabelContent = class (TQTXWidget)
///  [line: 37, column: 3, file: qtx.dom.control.label]
var TQTXLabelContent = {
   $ClassName:"TQTXLabelContent",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 39, column: 36, file: qtx.dom.control.label]
   ,a$1323:function(Self) {
      var Result = "";
      Result = TQTXWidget.a$893(Self);
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 39, column: 56, file: qtx.dom.control.label]
   ,a$1322:function(Self, Value$2) {
      TQTXWidget.a$894(Self,Value$2);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXLabelContent.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXLabel = class (TQTXContentBox)
///  [line: 44, column: 3, file: qtx.dom.control.label]
var TQTXLabel = {
   $ClassName:"TQTXLabel",$Parent:TQTXContentBox
   ,$Init:function ($) {
      TQTXContentBox.$Init($);
      $.FContent$1 = null;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 53, column: 38, file: qtx.dom.control.label]
   ,a$1325:function(Self) {
      var Result = "";
      Result = TQTXLabelContent.a$1323(Self.FContent$1);
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 53, column: 65, file: qtx.dom.control.label]
   ,a$1324:function(Self, Value$2) {
      TQTXLabelContent.a$1322(Self.FContent$1,Value$2);
   }
   /// constructor TQTXLabel.Create(AOwner: TQTXComponent; CB: TQTXLabelConstructor)
   ///  [line: 62, column: 23, file: qtx.dom.control.label]
   ,Create$101:function(Self, AOwner, CB) {
      TQTXWidget.Create$11(Self,AOwner,function (Widget) {
         Self.FContent$1 = TQTXWidget.Create$11$($New(TQTXLabelContent),Self,null);
         TQTXWidget.SetPositionMode(Self.FContent$1,0);
         if (CB) {
            CB(Self);
         }
      });
      return Self
   }
   /// procedure TQTXLabel.FinalizeObject()
   ///  [line: 75, column: 21, file: qtx.dom.control.label]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FContent$1);
      TQTXWidget.FinalizeObject(Self);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXContentBox.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXLabel.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
function SetupLabelStyles() {
   var lSheet = null;
   lSheet = TQTXCSSRules.GetGlobalStyleSheet(TQTXCSSRules);
   TQTXCSSRules.AddStyles(lSheet,".TQTXLabelContent {\r\n  white-space: nowrap !important;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  margin: 0px;\r\n  padding: 0px;\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n}\r\n");
};
/// TQTXDomListItem = class (TQTXWidget)
///  [line: 45, column: 3, file: tor.application.offcanvasmenu]
var TQTXDomListItem = {
   $ClassName:"TQTXDomListItem",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDomListItem.CreateElementInstance() : TWidgetHandle
   ///  [line: 151, column: 26, file: tor.application.offcanvasmenu]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("li");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDomListItem.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXOffCanvasMenuItem = class (TQTXDomListItem)
///  [line: 58, column: 3, file: tor.application.offcanvasmenu]
var TQTXOffCanvasMenuItem = {
   $ClassName:"TQTXOffCanvasMenuItem",$Parent:TQTXDomListItem
   ,$Init:function ($) {
      TQTXDomListItem.$Init($);
      $.FActive$3 = $.FDefault = false;
      $.FAnchorElt = $.FAttachedForm = $.FOnClick = null;
      $.FCaption$1 = $.FIcon = $.FIconClass = $.FUrl = $.FUrlTarget = "";
   }
   /// constructor TQTXOffCanvasMenuItem.Create(AOwner: TQTXComponent; CB: TQTXOffCanvasMenuItemConstructor)
   ///  [line: 165, column: 35, file: tor.application.offcanvasmenu]
   ,Create$11:function(Self, AOwner, CB) {
      TQTXWidget.Create$11(Self,AOwner,function (widget) {
         TQTXOffCanvasMenuItem.setDefault(Self,false);
         Self.FAnchorElt = TQTXWidget.Create$11$($New(TQTXDomAnchor),widget,function (FAnchorElt$1) {
            TQTXWidget.a$894(FAnchorElt$1,"<i class=\"icon\"><\/i>");
            TQTXComponent.GetHandle$(FAnchorElt$1).addEventListener("click",function (event) {
               var a$1338 = 0,
                  menuItem = null;
               if (Self.FAttachedForm) {
                  var a$1339 = [];
                  TQTXWidget.a$894(OffCanvasMenuApplication().FContent,"");
                  TQTXComponent.GetHandle$(OffCanvasMenuApplication().FContent).appendChild(TQTXComponent.GetHandle$(Self.FAttachedForm));
                  a$1339 = OffCanvasMenuApplication().FMenuItems;
                  var $temp19;
                  for(a$1338=0,$temp19=a$1339.length;a$1338<$temp19;a$1338++) {
                     menuItem = a$1339[a$1338];
                     if (TQTXComponent.GetHandle$(menuItem).id == TQTXComponent.GetHandle$(Self).id) {
                        TQTXOffCanvasMenuItem.setActive(menuItem,true);
                     } else {
                        TQTXOffCanvasMenuItem.setActive(menuItem,false);
                     }
                  }
               } else if (Self.FUrl != "") {
                  window.open(Self.FUrl, Self.FUrlTarget);
               }
               TQTXOffCanvasMenuApplication.closeNav(OffCanvasMenuApplication());
               if (Self.FOnClick) {
                  Self.FOnClick(Self);
               }
            });
            TQTXDispatch.Execute(TQTXDispatch,function () {
               if (CB) {
                  CB(Self);
               }
            },10);
         });
      });
      return Self
   }
   /// procedure TQTXOffCanvasMenuItem.setActive(value: Boolean)
   ///  [line: 236, column: 33, file: tor.application.offcanvasmenu]
   ,setActive:function(Self, value$2) {
      Self.FActive$3 = value$2;
      if (Self.FActive$3) {
         TQTXWidget.a$899(Self)[0]("active");
      } else {
         TQTXWidget.a$899(Self)[2]("active");
      }
   }
   /// procedure TQTXOffCanvasMenuItem.setAttachedForm(value: TQTXForm)
   ///  [line: 203, column: 33, file: tor.application.offcanvasmenu]
   ,setAttachedForm:function(Self, value$2) {
      Self.FAttachedForm = value$2;
   }
   /// procedure TQTXOffCanvasMenuItem.setCaption(value: String)
   ///  [line: 220, column: 33, file: tor.application.offcanvasmenu]
   ,setCaption:function(Self, value$2) {
      Self.FCaption$1 = value$2;
      TQTXOffCanvasMenuItem.updateAnchorText(Self);
   }
   /// procedure TQTXOffCanvasMenuItem.setDefault(value: Boolean)
   ///  [line: 226, column: 33, file: tor.application.offcanvasmenu]
   ,setDefault:function(Self, value$2) {
      Self.FDefault = value$2;
   }
   /// procedure TQTXOffCanvasMenuItem.setIcon(value: String)
   ///  [line: 214, column: 33, file: tor.application.offcanvasmenu]
   ,setIcon:function(Self, value$2) {
      Self.FIcon = value$2;
      TQTXOffCanvasMenuItem.updateAnchorText(Self);
   }
   /// procedure TQTXOffCanvasMenuItem.setIconClass(value: String)
   ///  [line: 208, column: 33, file: tor.application.offcanvasmenu]
   ,setIconClass:function(Self, value$2) {
      Self.FIconClass = value$2;
      TQTXOffCanvasMenuItem.updateAnchorText(Self);
   }
   /// procedure TQTXOffCanvasMenuItem.updateAnchorText()
   ///  [line: 231, column: 33, file: tor.application.offcanvasmenu]
   ,updateAnchorText:function(Self) {
      TQTXWidget.a$894(Self.FAnchorElt,"<i class=\"icon "+Self.FIconClass+" "+Self.FIcon+"\"><\/i>  "+Self.FCaption$1);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
   ,CreateElementInstance:TQTXDomListItem.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXOffCanvasMenuItem.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXOffCanvasMenuApplication = class (TQTXDOMApplication)
///  [line: 95, column: 3, file: tor.application.offcanvasmenu]
var TQTXOffCanvasMenuApplication = {
   $ClassName:"TQTXOffCanvasMenuApplication",$Parent:TQTXDOMApplication
   ,$Init:function ($) {
      TQTXDOMApplication.$Init($);
      $.FAppTitle = "";
      $.FBurger = $.FCloseNav = $.FContent = $.FMain = $.FMenuContainer = $.FPagesHolder = $.FSideHeader = $.FSideNav = $.FTitle = $.FTopBar = null;
      $.FMenuItems = [];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 124, column: 33, file: tor.application.offcanvasmenu]
   ,a$1321:function(Self) {
      var Result = "";
      Result = Self.FAppTitle;
      return Result
   }
   /// procedure TQTXOffCanvasMenuApplication.AddSideMenu(menuItem: TQTXOffCanvasMenuItem)
   ///  [line: 425, column: 40, file: tor.application.offcanvasmenu]
   ,AddSideMenu$1:function(Self, menuItem) {
      Self.FMenuItems.push(menuItem);
      TQTXComponent.GetHandle$(Self.FMenuContainer).appendChild(TQTXComponent.GetHandle$(menuItem));
      if (menuItem.FDefault && (menuItem.FAttachedForm!==null)) {
         TQTXDispatch.Execute(TQTXDispatch,function () {
            TQTXComponent.GetHandle$(menuItem.FAnchorElt).click();
         },10);
      }
   }
   /// procedure TQTXOffCanvasMenuApplication.AddSideMenu(caption: String; icon: String; iconClass: String; attachedForm: TQTXForm; isDefault: Boolean = False; clickCB: TNotifyEvent = nil; Url: String = ''; UrlTarget: String = '_blank')
   ///  [line: 404, column: 40, file: tor.application.offcanvasmenu]
   ,AddSideMenu:function(Self, caption, icon, iconClass, attachedForm, isDefault, clickCB, Url$1, UrlTarget$1) {
      TQTXWidget.Create$11$($New(TQTXWidget),Self.FMenuContainer,function (ltemp) {
         TQTXWidget.SetVisible(ltemp,true);
         TQTXWidget.Create$11$($New(TQTXOffCanvasMenuItem),ltemp,function (menuItem) {
            TQTXOffCanvasMenuItem.setIcon(menuItem,icon);
            TQTXOffCanvasMenuItem.setIconClass(menuItem,iconClass);
            TQTXOffCanvasMenuItem.setCaption(menuItem,caption);
            TQTXOffCanvasMenuItem.setAttachedForm(menuItem,attachedForm);
            menuItem.FUrl = Url$1;
            menuItem.FUrlTarget = UrlTarget$1;
            menuItem.FOnClick = clickCB;
            TQTXOffCanvasMenuItem.setDefault(menuItem,isDefault);
            TQTXOffCanvasMenuApplication.AddSideMenu$1(Self,menuItem);
         });
      });
   }
   /// procedure TQTXOffCanvasMenuApplication.closeNav()
   ///  [line: 465, column: 40, file: tor.application.offcanvasmenu]
   ,closeNav:function(Self) {
      TQTXWidget.a$892(Self.FSideNav).marginLeft = "-300px";
      TQTXWidget.a$892(Self.FMain).marginLeft = "0";
      Self.FBurger.TagData = "";
      TQTXWidget.a$892(Self.FBurger).borderRight = "none";
      TQTXWidget.a$892(Self.FBurger).boxShadow = "none";
      TQTXWidget.a$892(Self.FBurger).backgroundColor = "#ffffff00";
   }
   /// constructor TQTXOffCanvasMenuApplication.Create(AOwner: TQTXComponent; CB: TQTXComponentConstructor)
   ///  [line: 245, column: 42, file: tor.application.offcanvasmenu]
   ,Create$10:function(Self, AOwner, CB) {
      TQTXDOMApplication.Create$10(Self,AOwner,function (parentWidget) {
         Self.FPagesHolder = TQTXWidget.Create$11$($New(TQTXWidget),parentWidget,function (FPagesHolder$1) {
            TQTXWidget.SetWidth$(FPagesHolder$1,0);
            TQTXWidget.SetHeight$(FPagesHolder$1,0);
            Self.FSideNav = TQTXWidget.Create$11$($New(TQTXWidget),parentWidget,function (FSideNav$1) {
               TQTXWidget.a$892(FSideNav$1).height = "100%";
               TQTXWidget.a$892(FSideNav$1).backgroundImage = "url(img\/cloth.png)";
               TQTXWidget.a$892(FSideNav$1).marginLeft = "-300px";
               TQTXWidget.SetPositionMode(FSideNav$1,3);
               TQTXWidget.a$892(FSideNav$1).zIndex = 1;
               TQTXWidget.SetTop(FSideNav$1,0);
               TQTXWidget.SetLeft(FSideNav$1,0);
               TQTXWidget.a$892(FSideNav$1).backgroundColor = "#111";
               TQTXWidget.a$892(FSideNav$1).overflowX = "hidden";
               TQTXWidget.a$892(FSideNav$1).paddingTop = "60px";
               TQTXWidget.a$892(FSideNav$1).transition = "0.5s";
               TQTXWidget.a$892(FSideNav$1).width = "300px";
               Self.FCloseNav = TQTXLabel.Create$101($New(TQTXLabel),FSideNav$1,function (FCloseNav$1) {
                  TQTXWidget.SetPositionMode(FCloseNav$1,4);
                  TQTXWidget.a$892(FCloseNav$1).float = "left";
                  TQTXWidget.SetTop(FCloseNav$1,0);
                  TQTXWidget.SetLeft(FCloseNav$1,0);
                  TQTXWidget.a$892(FCloseNav$1).zIndex = 90;
                  TQTXWidget.a$892(FCloseNav$1).width = "1.6em";
                  TQTXWidget.a$892(FCloseNav$1).height = "1.6em";
                  TQTXWidget.a$892(FCloseNav$1).fontSize = "1.5em";
                  TQTXWidget.a$892(FCloseNav$1).lineHeight = "1.6em";
                  TQTXWidget.a$892(FCloseNav$1).color = "gainsboro";
                  TQTXWidget.a$892(FCloseNav$1).textAlign = "center";
                  TQTXWidget.a$892(FCloseNav$1).backgroundColor = "#272727";
                  TQTXWidget.a$892(FCloseNav$1).fontFamily = "Entypo";
                  TQTXWidget.a$894(FCloseNav$1,"&times;");
                  TQTXWidget.a$892(FCloseNav$1).cursor = "pointer";
                  TQTXComponent.GetHandle$(FCloseNav$1).addEventListener("click",function (event) {
                     TQTXOffCanvasMenuApplication.closeNav(Self);
                  });
               });
               Self.FSideHeader = TQTXWidget.Create$11$($New(TQTXWidget),FSideNav$1,function (FSideHeader$1) {
                  TQTXWidget.a$892(FSideHeader$1).width = "100%";
                  TQTXWidget.a$892(FSideHeader$1).float = "left";
                  TQTXWidget.a$892(FSideHeader$1).background = "rgba(0, 0, 0, 0.15)";
                  TQTXWidget.a$892(FSideHeader$1).boxShadow = "inset 0 -0.2 0.5em rgba(0, 0, 0, 0.6)";
                  TQTXWidget.a$892(FSideHeader$1).borderBottom = "1px solid #2d2d2d";
                  TQTXWidget.a$892(FSideHeader$1).textAlign = "center";
                  TQTXWidget.a$892(FSideHeader$1).position = "absolute";
                  TQTXWidget.a$892(FSideHeader$1).left = 0;
                  TQTXWidget.a$892(FSideHeader$1).top = 0;
                  TQTXWidget.a$892(FSideHeader$1).overflow = "hidden";
                  TQTXWidget.a$892(FSideHeader$1).padding = "2em";
                  TQTXWidget.a$892(FSideHeader$1).color = "#e05000";
                  TQTXWidget.a$894(FSideHeader$1,"Quartex Pascal");
               });
               Self.FMenuContainer = TQTXWidget.Create$11$($New(TQTXDOMUnorderedList),FSideNav$1,function (FMenuContainer$1) {
                  TQTXWidget.a$892(FMenuContainer$1).overflow = "auto";
                  TQTXWidget.a$892(FMenuContainer$1).width = "100%";
                  TQTXWidget.a$892(FMenuContainer$1).listStyle = "none";
                  TQTXWidget.a$892(FMenuContainer$1).padding = "1.2em";
                  TQTXWidget.a$899(FMenuContainer$1)[0]("menucontainer");
                  TQTXWidget.a$894(FMenuContainer$1,"");
               });
            });
            Self.FMain = TQTXWidget.Create$11$($New(TQTXWidget),parentWidget,function (FMain$1) {
               TQTXWidget.a$892(FMain$1).width = "100%";
               TQTXWidget.a$892(FMain$1).height = "100%";
               TQTXWidget.a$892(FMain$1).overflow = "hidden";
               TQTXWidget.a$892(FMain$1).transition = "margin-left .5s";
               Self.FTopBar = TQTXWidget.Create$11$($New(TQTXWidget),FMain$1,function (FTopBar$1) {
                  TQTXWidget.SetPositionMode(FTopBar$1,5);
                  TQTXWidget.a$892(FTopBar$1).height = "4em";
                  TQTXWidget.a$892(FTopBar$1).zIndex = 1000;
                  TQTXWidget.a$892(FTopBar$1).color = "#ffc8a9";
                  TQTXWidget.a$892(FTopBar$1).fontWeight = "300";
                  TQTXWidget.a$892(FTopBar$1).lineHeight = "1.9em";
                  TQTXWidget.a$892(FTopBar$1).paddingTop = "1em";
                  TQTXWidget.a$892(FTopBar$1).textShadow = "0 -0.04em 0.04em rgb(0 0 0 \/ 25%), 0 0 3em #ffa370";
                  TQTXWidget.a$892(FTopBar$1).width = "100%";
                  TQTXWidget.a$892(FTopBar$1).textAlign = "center";
                  TQTXWidget.a$892(FTopBar$1).overflow = "hidden";
                  TQTXWidget.a$892(FTopBar$1).background = "linear-gradient(#e05000, #be4400)";
                  TQTXWidget.a$892(FTopBar$1).boxShadow = "inset 0 0.0625em 0.0625em rgb(255 255 255 \/ 25%), 0 0.0625em 0.125em rgb(0 0 0 \/ 25%)";
                  Self.FTitle = TQTXWidget.Create$11$($New(TQTXDOMSpan),FTopBar$1,function (FTitle$1) {
                     TQTXWidget.SetPositionMode(FTitle$1,2);
                     TQTXWidget.SetDisplayMode(FTitle$1,1);
                     TQTXWidget.a$892(FTitle$1).fontSize = "1.8em";
                     TQTXWidget.a$892(FTitle$1).fontWeight = "300";
                     TQTXWidget.a$892(FTitle$1).lineHeight = "1.1em";
                     TQTXWidget.a$892(FTitle$1).verticalAlign = "middle";
                     TQTXWidget.a$892(FTitle$1).margin = "0.5em 0";
                     TQTXWidget.a$892(FTitle$1).fontFamily = "'Pacifico', sans-serif";
                     TQTXWidget.a$892(FTitle$1).textShadow = "0 -0.04em 0.04em rgb(0 0 0 \/ 25%), 0 0 3em #ffa370";
                     TQTXWidget.a$894(FTitle$1,"Title Here");
                  });
                  Self.FBurger = TQTXWidget.Create$11$($New(TQTXWidget),FTopBar$1,function (FBurger$1) {
                     TQTXWidget.a$894(FBurger$1,"&#9776;");
                     TQTXWidget.SetPositionMode(FBurger$1,4);
                     TQTXWidget.SetTop(FBurger$1,0);
                     TQTXWidget.SetLeft(FBurger$1,0);
                     TQTXWidget.a$892(FBurger$1).width = "0.84em";
                     TQTXWidget.a$892(FBurger$1).height = "100%";
                     TQTXWidget.a$892(FBurger$1).lineHeight = "0.84em";
                     TQTXWidget.a$892(FBurger$1).fontSize = "5em";
                     TQTXComponent.GetHandle$(FBurger$1).style["vertical-align"] = "middle";
                     TQTXWidget.a$892(FBurger$1).textAlign = "center";
                     TQTXWidget.a$892(FBurger$1).fontFamily = "Entypo";
                     TQTXWidget.a$892(FBurger$1).textShadow = "0 0.02em 0.02em rgb(0 0 0 \/ 25%)";
                     TQTXWidget.a$892(FBurger$1).color = "#fff6f1";
                     TQTXWidget.a$892(FBurger$1).backgroundColor = "#ffffff00";
                     TQTXWidget.a$892(FBurger$1).cursor = "pointer";
                     TQTXComponent.GetHandle$(FBurger$1).addEventListener("click",function (event) {
                        if (FBurger$1.TagData == "pressed") {
                           TQTXOffCanvasMenuApplication.closeNav(Self);
                        } else {
                           TQTXOffCanvasMenuApplication.openNav(Self);
                        }
                     });
                  });
               });
               Self.FContent = TQTXWidget.Create$11$($New(TQTXWidget),FMain$1,function (FContent$2) {
                  TQTXWidget.a$899(FContent$2)[0]("content");
                  TQTXWidget.a$892(FContent$2).padding = "5px";
                  TQTXWidget.a$892(FContent$2).overflow = "auto";
                  TQTXWidget.a$892(FContent$2).width = "100%";
                  TQTXWidget.SetPositionMode(FContent$2,2);
                  TQTXComponent.GetHandle$(FContent$2).style.bottom = "0px";
                  TQTXDispatch.Execute(TQTXDispatch,function () {
                     if (CB) {
                        CB(FContent$2);
                     }
                  },10);
               });
            });
         });
      });
      return Self
   }
   /// function TQTXOffCanvasMenuApplication.GetHandle() : THandle
   ///  [line: 477, column: 39, file: tor.application.offcanvasmenu]
   ,GetHandle:function(Self) {
      var Result = undefined;
      Result = document.body;
      return Result
   }
   /// procedure TQTXOffCanvasMenuApplication.openNav()
   ///  [line: 450, column: 40, file: tor.application.offcanvasmenu]
   ,openNav:function(Self) {
      TQTXWidget.a$892(Self.FSideNav).marginLeft = "0";
      TQTXWidget.a$892(Self.FMain).marginLeft = "300px";
      Self.FBurger.TagData = "pressed";
      TQTXWidget.a$892(Self.FBurger).borderRight = "1px solid #d94e00";
      TQTXWidget.a$892(Self.FBurger).boxShadow = "inset -0.02em 0.02em 0.0625em rgb(0 0 0 \/ 15%)";
      TQTXWidget.a$892(Self.FBurger).background = "#b34000";
   }
   /// procedure TQTXOffCanvasMenuApplication.setAppTitle(value: String)
   ///  [line: 438, column: 40, file: tor.application.offcanvasmenu]
   ,setAppTitle:function(Self, value$2) {
      Self.FAppTitle = value$2;
      if (Self.FTitle) {
         TQTXWidget.a$894(Self.FTitle,Self.FAppTitle);
      }
      document.title = Self.FAppTitle;
   }
   ,Destroy:TQTXDOMApplication.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10$:function($){return $.ClassType.Create$10.apply($.ClassType, arguments)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetInstanceName:TQTXComponent.GetInstanceName
   ,SetOwner$1:TQTXComponent.SetOwner$1
   ,DoExecute$1:TQTXDOMApplication.DoExecute$1
   ,FinalizeObject$1:TQTXApplication.FinalizeObject$1
   ,InitializeObject$1:TQTXApplication.InitializeObject$1
   ,RegisterForm:TQTXDOMApplication.RegisterForm
   ,ShowForm:TQTXDOMApplication.ShowForm
};
TQTXOffCanvasMenuApplication.$Intf={
   IQTXDOMDelegateHost:[TQTXDOMApplication.RegisterDelegate$1,TQTXDOMApplication.UnRegisterDelegate$1]
   ,IQTXDOMApplicationFormControl:[TQTXDOMApplication.RegisterForm,TQTXDOMApplication.UnRegisterForm,TQTXDOMApplication.ShowForm,TQTXDOMApplication.SetCurrentForm,TQTXDOMApplication.GetCurrentForm]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDOMUnorderedList = class (TQTXWidget)
///  [line: 40, column: 3, file: tor.application.offcanvasmenu]
var TQTXDOMUnorderedList = {
   $ClassName:"TQTXDOMUnorderedList",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDOMUnorderedList.CreateElementInstance() : TWidgetHandle
   ///  [line: 144, column: 31, file: tor.application.offcanvasmenu]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("ul");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMUnorderedList.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXDomAnchor = class (TQTXWidget)
///  [line: 50, column: 3, file: tor.application.offcanvasmenu]
var TQTXDomAnchor = {
   $ClassName:"TQTXDomAnchor",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
   }
   /// function TQTXDomAnchor.CreateElementInstance() : TWidgetHandle
   ///  [line: 158, column: 24, file: tor.application.offcanvasmenu]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("a");
      return Result
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDomAnchor.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
function OffCanvasMenuApplication() {
   return $As(Application(),TQTXOffCanvasMenuApplication);
};
/// TTabulatorOptionsRenderer = class (TObject)
///  [line: 51, column: 3, file: tor.tabulator.wrapper]
var TTabulatorOptionsRenderer = {
   $ClassName:"TTabulatorOptionsRenderer",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.fOpts = undefined;
   }
   /// function TTabulatorOptionsRenderer.getProp(prop: String) : Variant
   ///  [line: 1167, column: 36, file: tor.tabulator.wrapper]
   ,getProp:function(Self, prop) {
      return Self.fOpts[prop];
   }
   /// procedure TTabulatorOptionsRenderer.setProp(prop: String; value: Variant)
   ///  [line: 1172, column: 37, file: tor.tabulator.wrapper]
   ,setProp:function(Self, prop, value$2) {
      Self.fOpts[prop] = value$2;
   }
   /// constructor TTabulatorOptionsRenderer.Create(opts: Variant = Null)
   ///  [line: 1155, column: 39, file: tor.tabulator.wrapper]
   ,Create$3:function(Self, opts) {
      TObject.Create(Self);
      Self.fOpts = TVariant.CreateObject();
      if (opts != null) {
         Self.fOpts = Object.assign(Self.fOpts, opts);
      }
      return Self
   }
   /// function TTabulatorOptionsRenderer.RenderOptions() : Variant
   ///  [line: 1177, column: 36, file: tor.tabulator.wrapper]
   ,RenderOptions:function(Self) {
      return Self.fOpts;
   }
   ,Destroy:TObject.Destroy
   ,RenderOptions$:function($){return $.ClassType.RenderOptions($)}
};
/// TTabulatorOptions = class (TTabulatorOptionsRenderer)
///  [line: 253, column: 3, file: tor.tabulator.wrapper]
var TTabulatorOptions = {
   $ClassName:"TTabulatorOptions",$Parent:TTabulatorOptionsRenderer
   ,$Init:function ($) {
      TTabulatorOptionsRenderer.$Init($);
      $.columns$1 = [];
      $.data = [];
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 525, column: 81, file: tor.tabulator.wrapper]
   ,a$578:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"scrollHorizontal",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 525, column: 45, file: tor.tabulator.wrapper]
   ,a$577:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"scrollHorizontal");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 524, column: 77, file: tor.tabulator.wrapper]
   ,a$576:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"scrollVertical",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 524, column: 43, file: tor.tabulator.wrapper]
   ,a$575:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"scrollVertical");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 522, column: 89, file: tor.tabulator.wrapper]
   ,a$574:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataTreeRowCollapsed",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 522, column: 49, file: tor.tabulator.wrapper]
   ,a$573:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataTreeRowCollapsed");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 521, column: 87, file: tor.tabulator.wrapper]
   ,a$572:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataTreeRowExpanded",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 521, column: 48, file: tor.tabulator.wrapper]
   ,a$571:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataTreeRowExpanded");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 519, column: 81, file: tor.tabulator.wrapper]
   ,a$570:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"downloadComplete",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 519, column: 45, file: tor.tabulator.wrapper]
   ,a$569:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"downloadComplete");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 518, column: 75, file: tor.tabulator.wrapper]
   ,a$568:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"downloadReady",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 518, column: 42, file: tor.tabulator.wrapper]
   ,a$567:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"downloadReady");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 517, column: 91, file: tor.tabulator.wrapper]
   ,a$566:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"downloadDataFormatter",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 517, column: 50, file: tor.tabulator.wrapper]
   ,a$565:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"downloadDataFormatter");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 515, column: 87, file: tor.tabulator.wrapper]
   ,a$564:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"clipboardPasteError",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 515, column: 48, file: tor.tabulator.wrapper]
   ,a$563:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"clipboardPasteError");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 514, column: 79, file: tor.tabulator.wrapper]
   ,a$562:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"clipboardPasted",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 514, column: 44, file: tor.tabulator.wrapper]
   ,a$561:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"clipboardPasted");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 513, column: 79, file: tor.tabulator.wrapper]
   ,a$560:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"clipboardCopied",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 513, column: 44, file: tor.tabulator.wrapper]
   ,a$559:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"clipboardCopied");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 511, column: 71, file: tor.tabulator.wrapper]
   ,a$558:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"historyRedo",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 511, column: 40, file: tor.tabulator.wrapper]
   ,a$557:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"historyRedo");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 510, column: 71, file: tor.tabulator.wrapper]
   ,a$556:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"historyUndo",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 510, column: 40, file: tor.tabulator.wrapper]
   ,a$555:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"historyUndo");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 508, column: 81, file: tor.tabulator.wrapper]
   ,a$554:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"validationFailed",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 508, column: 45, file: tor.tabulator.wrapper]
   ,a$553:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"validationFailed");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 506, column: 97, file: tor.tabulator.wrapper]
   ,a$552:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRowsReceivingStop",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 506, column: 53, file: tor.tabulator.wrapper]
   ,a$551:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"movableRowsReceivingStop");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 505, column: 99, file: tor.tabulator.wrapper]
   ,a$550:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRowsReceivedFailed",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 505, column: 54, file: tor.tabulator.wrapper]
   ,a$549:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"movableRowsReceivedFailed");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 504, column: 87, file: tor.tabulator.wrapper]
   ,a$548:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRowsReceived",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 504, column: 48, file: tor.tabulator.wrapper]
   ,a$547:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"movableRowsReceived");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 503, column: 99, file: tor.tabulator.wrapper]
   ,a$546:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRowsReceivingStart",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 503, column: 54, file: tor.tabulator.wrapper]
   ,a$545:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"movableRowsReceivingStart");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 502, column: 93, file: tor.tabulator.wrapper]
   ,a$544:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRowsSendingStop",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 502, column: 51, file: tor.tabulator.wrapper]
   ,a$543:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"movableRowsSendingStop");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 501, column: 91, file: tor.tabulator.wrapper]
   ,a$542:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRowsSentFailed",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 501, column: 50, file: tor.tabulator.wrapper]
   ,a$541:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"movableRowsSentFailed");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 500, column: 79, file: tor.tabulator.wrapper]
   ,a$540:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRowsSent",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 500, column: 44, file: tor.tabulator.wrapper]
   ,a$539:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"movableRowsSent");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 499, column: 95, file: tor.tabulator.wrapper]
   ,a$538:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRowsSendingStart",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 499, column: 52, file: tor.tabulator.wrapper]
   ,a$537:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"movableRowsSendingStart");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 497, column: 87, file: tor.tabulator.wrapper]
   ,a$536:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowSelectionChanged",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 497, column: 48, file: tor.tabulator.wrapper]
   ,a$535:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowSelectionChanged");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 496, column: 75, file: tor.tabulator.wrapper]
   ,a$534:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowDeselected",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 496, column: 42, file: tor.tabulator.wrapper]
   ,a$533:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowDeselected");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 495, column: 71, file: tor.tabulator.wrapper]
   ,a$532:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowSelected",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 495, column: 40, file: tor.tabulator.wrapper]
   ,a$531:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowSelected");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 492, column: 71, file: tor.tabulator.wrapper]
   ,a$528:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"groupDblTap",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 492, column: 40, file: tor.tabulator.wrapper]
   ,a$527:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"groupDblTap");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 491, column: 65, file: tor.tabulator.wrapper]
   ,a$526:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"groupTap",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 491, column: 37, file: tor.tabulator.wrapper]
   ,a$525:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"groupTap");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 490, column: 73, file: tor.tabulator.wrapper]
   ,a$524:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"groupContext",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 490, column: 41, file: tor.tabulator.wrapper]
   ,a$523:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"groupContext");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 489, column: 75, file: tor.tabulator.wrapper]
   ,a$522:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"groupDblClick",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 489, column: 42, file: tor.tabulator.wrapper]
   ,a$521:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"groupDblClick");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 488, column: 69, file: tor.tabulator.wrapper]
   ,a$520:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"groupClick",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 488, column: 39, file: tor.tabulator.wrapper]
   ,a$519:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"groupClick");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 487, column: 93, file: tor.tabulator.wrapper]
   ,a$518:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"groupVisibilityChanged",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 487, column: 51, file: tor.tabulator.wrapper]
   ,a$517:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"groupVisibilityChanged");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 486, column: 71, file: tor.tabulator.wrapper]
   ,a$516:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataGrouped",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 486, column: 40, file: tor.tabulator.wrapper]
   ,a$515:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataGrouped");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 485, column: 73, file: tor.tabulator.wrapper]
   ,a$514:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataGrouping",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 485, column: 41, file: tor.tabulator.wrapper]
   ,a$513:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataGrouping");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 483, column: 67, file: tor.tabulator.wrapper]
   ,a$512:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"localized",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 483, column: 38, file: tor.tabulator.wrapper]
   ,a$511:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"localized");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 481, column: 69, file: tor.tabulator.wrapper]
   ,a$510:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"pageLoaded",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 481, column: 39, file: tor.tabulator.wrapper]
   ,a$509:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"pageLoaded");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 479, column: 77, file: tor.tabulator.wrapper]
   ,a$508:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"renderComplete",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 479, column: 43, file: tor.tabulator.wrapper]
   ,a$507:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"renderComplete");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 478, column: 75, file: tor.tabulator.wrapper]
   ,a$506:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"renderStarted",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 478, column: 42, file: tor.tabulator.wrapper]
   ,a$505:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"renderStarted");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 476, column: 69, file: tor.tabulator.wrapper]
   ,a$504:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataSorted",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 476, column: 39, file: tor.tabulator.wrapper]
   ,a$503:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataSorted");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 475, column: 71, file: tor.tabulator.wrapper]
   ,a$502:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataSorting",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 475, column: 40, file: tor.tabulator.wrapper]
   ,a$501:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataSorting");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 473, column: 73, file: tor.tabulator.wrapper]
   ,a$500:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataFiltered",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 473, column: 41, file: tor.tabulator.wrapper]
   ,a$499:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataFiltered");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 472, column: 75, file: tor.tabulator.wrapper]
   ,a$498:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataFiltering",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 472, column: 42, file: tor.tabulator.wrapper]
   ,a$497:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataFiltering");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 470, column: 67, file: tor.tabulator.wrapper]
   ,a$496:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"ajaxError",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 470, column: 38, file: tor.tabulator.wrapper]
   ,a$495:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"ajaxError");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 469, column: 73, file: tor.tabulator.wrapper]
   ,a$494:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"ajaxResponse",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 469, column: 41, file: tor.tabulator.wrapper]
   ,a$493:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"ajaxResponse");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 468, column: 77, file: tor.tabulator.wrapper]
   ,a$492:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"ajaxRequesting",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 468, column: 43, file: tor.tabulator.wrapper]
   ,a$491:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"ajaxRequesting");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 466, column: 73, file: tor.tabulator.wrapper]
   ,a$490:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"htmlImported",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 466, column: 41, file: tor.tabulator.wrapper]
   ,a$489:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"htmlImported");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 465, column: 75, file: tor.tabulator.wrapper]
   ,a$488:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"htmlImporting",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 465, column: 42, file: tor.tabulator.wrapper]
   ,a$487:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"htmlImporting");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 464, column: 71, file: tor.tabulator.wrapper]
   ,a$486:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataChanged",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 464, column: 40, file: tor.tabulator.wrapper]
   ,a$485:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataChanged");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 463, column: 69, file: tor.tabulator.wrapper]
   ,a$484:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataLoaded",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 463, column: 39, file: tor.tabulator.wrapper]
   ,a$483:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataLoaded");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 462, column: 71, file: tor.tabulator.wrapper]
   ,a$482:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataLoading",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 462, column: 40, file: tor.tabulator.wrapper]
   ,a$481:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataLoading");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 460, column: 69, file: tor.tabulator.wrapper]
   ,a$480:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellEdited",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 460, column: 39, file: tor.tabulator.wrapper]
   ,a$479:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellEdited");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 459, column: 83, file: tor.tabulator.wrapper]
   ,a$478:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellEditCancelled",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 459, column: 46, file: tor.tabulator.wrapper]
   ,a$477:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellEditCancelled");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 458, column: 71, file: tor.tabulator.wrapper]
   ,a$476:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellEditing",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 458, column: 40, file: tor.tabulator.wrapper]
   ,a$475:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellEditing");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 457, column: 75, file: tor.tabulator.wrapper]
   ,a$474:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellMouseMove",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 457, column: 42, file: tor.tabulator.wrapper]
   ,a$473:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellMouseMove");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 456, column: 73, file: tor.tabulator.wrapper]
   ,a$472:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellMouseOut",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 456, column: 41, file: tor.tabulator.wrapper]
   ,a$471:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellMouseOut");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 455, column: 75, file: tor.tabulator.wrapper]
   ,a$470:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellMouseOver",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 455, column: 42, file: tor.tabulator.wrapper]
   ,a$469:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellMouseOver");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 454, column: 77, file: tor.tabulator.wrapper]
   ,a$468:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellMouseLeave",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 454, column: 43, file: tor.tabulator.wrapper]
   ,a$467:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellMouseLeave");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 453, column: 77, file: tor.tabulator.wrapper]
   ,a$466:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellMouseEnter",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 453, column: 43, file: tor.tabulator.wrapper]
   ,a$465:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellMouseEnter");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 452, column: 71, file: tor.tabulator.wrapper]
   ,a$464:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellTapHold",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 452, column: 40, file: tor.tabulator.wrapper]
   ,a$463:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellTapHold");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 451, column: 69, file: tor.tabulator.wrapper]
   ,a$462:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellDblTap",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 451, column: 39, file: tor.tabulator.wrapper]
   ,a$461:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellDblTap");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 450, column: 63, file: tor.tabulator.wrapper]
   ,a$460:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellTap",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 450, column: 36, file: tor.tabulator.wrapper]
   ,a$459:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellTap");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 449, column: 71, file: tor.tabulator.wrapper]
   ,a$458:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellContext",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 449, column: 40, file: tor.tabulator.wrapper]
   ,a$457:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellContext");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 448, column: 73, file: tor.tabulator.wrapper]
   ,a$456:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellDblClick",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 448, column: 41, file: tor.tabulator.wrapper]
   ,a$455:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellDblClick");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 447, column: 67, file: tor.tabulator.wrapper]
   ,a$454:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"cellClick",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 447, column: 38, file: tor.tabulator.wrapper]
   ,a$453:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"cellClick");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 445, column: 69, file: tor.tabulator.wrapper]
   ,a$452:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowResized",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 445, column: 39, file: tor.tabulator.wrapper]
   ,a$451:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowResized");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 444, column: 65, file: tor.tabulator.wrapper]
   ,a$450:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowMoved",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 444, column: 37, file: tor.tabulator.wrapper]
   ,a$449:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowMoved");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 443, column: 69, file: tor.tabulator.wrapper]
   ,a$448:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowDeleted",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 443, column: 39, file: tor.tabulator.wrapper]
   ,a$447:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowDeleted");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 442, column: 69, file: tor.tabulator.wrapper]
   ,a$446:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowUpdated",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 442, column: 39, file: tor.tabulator.wrapper]
   ,a$445:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowUpdated");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 441, column: 65, file: tor.tabulator.wrapper]
   ,a$444:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowAdded",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 441, column: 37, file: tor.tabulator.wrapper]
   ,a$443:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowAdded");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 440, column: 73, file: tor.tabulator.wrapper]
   ,a$442:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowMouseMove",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 440, column: 41, file: tor.tabulator.wrapper]
   ,a$441:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowMouseMove");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 438, column: 73, file: tor.tabulator.wrapper]
   ,a$438:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowMouseOver",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 438, column: 41, file: tor.tabulator.wrapper]
   ,a$437:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowMouseOver");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 437, column: 75, file: tor.tabulator.wrapper]
   ,a$436:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowMouseLeave",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 437, column: 42, file: tor.tabulator.wrapper]
   ,a$435:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowMouseLeave");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 436, column: 75, file: tor.tabulator.wrapper]
   ,a$434:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowMouseEnter",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 436, column: 42, file: tor.tabulator.wrapper]
   ,a$433:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowMouseEnter");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 435, column: 69, file: tor.tabulator.wrapper]
   ,a$432:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowTapHold",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 435, column: 39, file: tor.tabulator.wrapper]
   ,a$431:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowTapHold");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 434, column: 67, file: tor.tabulator.wrapper]
   ,a$430:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowDblTap",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 434, column: 38, file: tor.tabulator.wrapper]
   ,a$429:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowDblTap");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 433, column: 61, file: tor.tabulator.wrapper]
   ,a$428:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowTap",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 433, column: 35, file: tor.tabulator.wrapper]
   ,a$427:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowTap");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 432, column: 69, file: tor.tabulator.wrapper]
   ,a$426:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowContext",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 432, column: 39, file: tor.tabulator.wrapper]
   ,a$425:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowContext");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 431, column: 71, file: tor.tabulator.wrapper]
   ,a$424:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowDblClick",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 431, column: 40, file: tor.tabulator.wrapper]
   ,a$423:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowDblClick");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 430, column: 65, file: tor.tabulator.wrapper]
   ,a$422:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"rowClick",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 430, column: 37, file: tor.tabulator.wrapper]
   ,a$421:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"rowClick");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 428, column: 85, file: tor.tabulator.wrapper]
   ,a$420:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"columnTitleChanged",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 428, column: 47, file: tor.tabulator.wrapper]
   ,a$419:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"columnTitleChanged");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 427, column: 95, file: tor.tabulator.wrapper]
   ,a$418:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"columnVisibilityChanged",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 427, column: 52, file: tor.tabulator.wrapper]
   ,a$417:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"columnVisibilityChanged");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 426, column: 75, file: tor.tabulator.wrapper]
   ,a$416:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"columnResized",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 426, column: 42, file: tor.tabulator.wrapper]
   ,a$415:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"columnResized");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 425, column: 71, file: tor.tabulator.wrapper]
   ,a$414:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"columnMoved",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 425, column: 40, file: tor.tabulator.wrapper]
   ,a$413:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"columnMoved");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 423, column: 72, file: tor.tabulator.wrapper]
   ,a$412:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"tableBuilding",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 423, column: 39, file: tor.tabulator.wrapper]
   ,a$411:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"tableBuilding");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 422, column: 75, file: tor.tabulator.wrapper]
   ,a$410:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"tableBuilding",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 422, column: 42, file: tor.tabulator.wrapper]
   ,a$409:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"tableBuilding");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 370, column: 77, file: tor.tabulator.wrapper]
   ,a$294:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"paginationSize",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 370, column: 43, file: tor.tabulator.wrapper]
   ,a$293:function(Self) {
      var Result = 0;
      Result = $VarToInt(TTabulatorOptionsRenderer.getProp(Self,"paginationSize"),"");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 369, column: 68, file: tor.tabulator.wrapper]
   ,a$291:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"pagination",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 369, column: 38, file: tor.tabulator.wrapper]
   ,a$290:function(Self) {
      var Result = "";
      Result = String(TTabulatorOptionsRenderer.getProp(Self,"pagination"));
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 327, column: 73, file: tor.tabulator.wrapper]
   ,a$194:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"dataImported",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 327, column: 41, file: tor.tabulator.wrapper]
   ,a$193:function(Self) {
      var Result = undefined;
      Result = TTabulatorOptionsRenderer.getProp(Self,"dataImported");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 315, column: 71, file: tor.tabulator.wrapper]
   ,a$164:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableRows",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 315, column: 40, file: tor.tabulator.wrapper]
   ,a$163:function(Self) {
      var Result = false;
      Result = $VarToBool(TTabulatorOptionsRenderer.getProp(Self,"movableRows"));
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 295, column: 77, file: tor.tabulator.wrapper]
   ,a$111:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"movableColumns",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 295, column: 43, file: tor.tabulator.wrapper]
   ,a$110:function(Self) {
      var Result = false;
      Result = $VarToBool(TTabulatorOptionsRenderer.getProp(Self,"movableColumns"));
      return Result
   }
   /// constructor TTabulatorOptions.Create(opts: Variant = Null)
   ///  [line: 1198, column: 31, file: tor.tabulator.wrapper]
   ,Create$4:function(Self, opts) {
      TTabulatorOptionsRenderer.Create$3(Self,opts);
      Self.columns$1 = [];
      Self.data = [];
      return Self
   }
   /// function TTabulatorOptions.RenderOptions() : Variant
   ///  [line: 1205, column: 28, file: tor.tabulator.wrapper]
   ,RenderOptions:function(Self) {
      var Result = undefined;
      (Self.fOpts).columns = (Self.columns$1);
    (Self.fOpts).data = (Self.data);
    Result = Self.fOpts;
      return Result
   }
   ,Destroy:TObject.Destroy
   ,RenderOptions$:function($){return $.ClassType.RenderOptions($)}
};
/// TTabulatorCreationEvents = class (TObject)
///  [line: 827, column: 3, file: tor.tabulator.wrapper]
var TTabulatorCreationEvents = {
   $ClassName:"TTabulatorCreationEvents",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.onScrollHorizontal = null;
      $.onScrollVertical = null;
      $.onDataTreeRowCollapsed = null;
      $.onDataTreeRowExpanded = null;
      $.onDownloadComplete = null;
      $.onDownloadReady = null;
      $.onDownloadDataFormatter = null;
      $.onClipboardPasteError = null;
      $.onClipboardPasted = null;
      $.onClipboardCopied = null;
      $.onHistoryRedo = null;
      $.onHistoryUndo = null;
      $.onValidationFailed = null;
      $.onMovableRowsReceivedFailed = null;
      $.onMovableRowsReceived = null;
      $.onMovableRowsReceivingStop = null;
      $.onMovableRowsReceivingStart = null;
      $.onMovableRowsSendingStop = null;
      $.onMovableRowsSentFailed = null;
      $.onMovableRowsSent = null;
      $.onMovableRowsSendingStart = null;
      $.onRowSelectionChanged = null;
      $.onGroupDblTap = null;
      $.onGroupTap = null;
      $.onGroupContext = null;
      $.onGroupDblClick = null;
      $.onGroupClick = null;
      $.onGroupVisibilityChanged = null;
      $.onDataGrouped = null;
      $.onDataGrouping = null;
      $.onLocalized = null;
      $.onPageLoaded = null;
      $.onRenderComplete = null;
      $.onRenderStarted = null;
      $.onDataSorted = null;
      $.onDataSorting = null;
      $.onDataFiltered = null;
      $.onDataFiltering = null;
      $.onAjaxError = null;
      $.onAjaxResponse = null;
      $.onAjaxRequesting = null;
      $.onHtmlImported = null;
      $.onHtmlImporting = null;
      $.onDataImported = null;
      $.onDataChanged = null;
      $.onDataLoaded = null;
      $.onDataLoading = null;
      $.onCellEdited = null;
      $.onCellEditCancelled = null;
      $.onCellEditing = null;
      $.onCellMouseMove = null;
      $.onCellMouseOut = null;
      $.onCellMouseOver = null;
      $.onCellMouseLeave = null;
      $.onCellMouseEnter = null;
      $.onCellTapHold = null;
      $.onCellDblTap = null;
      $.onCellTap = null;
      $.onCellContext = null;
      $.onCellDblClick = null;
      $.onCellClick = null;
      $.onRowDeselected = null;
      $.onRowSelected = null;
      $.onRowResized = null;
      $.onRowMoved = null;
      $.onRowDeleted = null;
      $.onRowUpdated = null;
      $.onRowAdded = null;
      $.onRowMouseMove = null;
      $.onRowMouseOver = null;
      $.onRowMouseLeave = null;
      $.onRowMouseEnter = null;
      $.onRowTapHold = null;
      $.onRowDblTap = null;
      $.onRowTap = null;
      $.onRowContext = null;
      $.onRowDblClick = null;
      $.onRowClick = null;
      $.onColumnTitleChanged = null;
      $.onColumnVisibilityChanged = null;
      $.onTableBuilt = null;
      $.onColumnMoved = null;
      $.onColumnResized = null;
      $.onTableBuilding = null;
   }
   ,Destroy:TObject.Destroy
};
/// TTabulatorColumnDefinition = class (TTabulatorOptionsRenderer)
///  [line: 100, column: 3, file: tor.tabulator.wrapper]
var TTabulatorColumnDefinition = {
   $ClassName:"TTabulatorColumnDefinition",$Parent:TTabulatorOptionsRenderer
   ,$Init:function ($) {
      TTabulatorOptionsRenderer.$Init($);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 108, column: 65, file: tor.tabulator.wrapper]
   ,a$701:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"hozAlign",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 108, column: 37, file: tor.tabulator.wrapper]
   ,a$700:function(Self) {
      var Result = "";
      Result = String(TTabulatorOptionsRenderer.getProp(Self,"hozAlign"));
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 104, column: 33, file: tor.tabulator.wrapper]
   ,a$694:function(Self) {
      var Result = "";
      Result = String(TTabulatorOptionsRenderer.getProp(Self,"field"));
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 104, column: 58, file: tor.tabulator.wrapper]
   ,a$693:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"field",Value$2);
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 103, column: 33, file: tor.tabulator.wrapper]
   ,a$692:function(Self) {
      var Result = "";
      Result = String(TTabulatorOptionsRenderer.getProp(Self,"title"));
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 103, column: 58, file: tor.tabulator.wrapper]
   ,a$691:function(Self, Value$2) {
      TTabulatorOptionsRenderer.setProp(Self,"title",Value$2);
   }
   /// constructor TTabulatorColumnDefinition.Create(sTitle: String = ''; sField: String = ''; opts: Variant = Null)
   ///  [line: 1182, column: 40, file: tor.tabulator.wrapper]
   ,Create$5:function(Self, sTitle, sField, opts) {
      TTabulatorOptionsRenderer.Create$3(Self,opts);
      Self.fOpts.title = sTitle;
      Self.fOpts.field = sField;
      return Self
   }
   /// function TTabulatorColumnDefinition.RenderFromParams(sTitle: String = ''; sField: String = ''; opts: Variant = Null) : Variant
   ///  [line: 1190, column: 43, file: tor.tabulator.wrapper]
   ,RenderFromParams$4:function(Self, sTitle, sField, opts) {
      var Result = undefined;
      var colDef = null;
      colDef = TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),sTitle,sField,opts);
      Result = TTabulatorOptionsRenderer.RenderOptions$(colDef);
      return Result
   }
   ,Destroy:TObject.Destroy
   ,RenderOptions:TTabulatorOptionsRenderer.RenderOptions
};
/// TQTXTabulator = class (TQTXWidget)
///  [line: 915, column: 3, file: tor.tabulator.wrapper]
var TQTXTabulator = {
   $ClassName:"TQTXTabulator",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
      $.onSetData = null;
      $.fColumns = [];
      $.fCreationEvents = $.fCreationOptions = $.fTabulator = null;
      $.fData = [];
      $.fDontUpdateTabulator = false;
   }
   /// procedure TQTXTabulator.BuildOptions()
   ///  [line: 1314, column: 25, file: tor.tabulator.wrapper]
   ,BuildOptions:function(Self) {
      if (Self.fCreationEvents.onTableBuilding) {
         TTabulatorOptions.a$410(Self.fCreationOptions,Self.fCreationEvents.onTableBuilding);
      }
      if (Self.fCreationEvents.onTableBuilt) {
         TTabulatorOptions.a$412(Self.fCreationOptions,Self.fCreationEvents.onTableBuilt);
      }
      if (Self.fCreationEvents.onColumnMoved) {
         TTabulatorOptions.a$414(Self.fCreationOptions,Self.fCreationEvents.onColumnMoved);
      }
      if (Self.fCreationEvents.onColumnResized) {
         TTabulatorOptions.a$416(Self.fCreationOptions,Self.fCreationEvents.onColumnResized);
      }
      if (Self.fCreationEvents.onColumnVisibilityChanged) {
         TTabulatorOptions.a$418(Self.fCreationOptions,Self.fCreationEvents.onColumnVisibilityChanged);
      }
      if (Self.fCreationEvents.onColumnTitleChanged) {
         TTabulatorOptions.a$420(Self.fCreationOptions,Self.fCreationEvents.onColumnTitleChanged);
      }
      if (Self.fCreationEvents.onRowClick) {
         TTabulatorOptions.a$422(Self.fCreationOptions,Self.fCreationEvents.onRowClick);
      }
      if (Self.fCreationEvents.onRowDblClick) {
         TTabulatorOptions.a$424(Self.fCreationOptions,Self.fCreationEvents.onRowDblClick);
      }
      if (Self.fCreationEvents.onRowContext) {
         TTabulatorOptions.a$426(Self.fCreationOptions,Self.fCreationEvents.onRowContext);
      }
      if (Self.fCreationEvents.onRowTap) {
         TTabulatorOptions.a$428(Self.fCreationOptions,Self.fCreationEvents.onRowTap);
      }
      if (Self.fCreationEvents.onRowDblTap) {
         TTabulatorOptions.a$430(Self.fCreationOptions,Self.fCreationEvents.onRowDblTap);
      }
      if (Self.fCreationEvents.onRowTapHold) {
         TTabulatorOptions.a$432(Self.fCreationOptions,Self.fCreationEvents.onRowTapHold);
      }
      if (Self.fCreationEvents.onRowMouseEnter) {
         TTabulatorOptions.a$434(Self.fCreationOptions,Self.fCreationEvents.onRowMouseEnter);
      }
      if (Self.fCreationEvents.onRowMouseLeave) {
         TTabulatorOptions.a$436(Self.fCreationOptions,Self.fCreationEvents.onRowMouseLeave);
      }
      if (Self.fCreationEvents.onRowMouseOver) {
         TTabulatorOptions.a$438(Self.fCreationOptions,Self.fCreationEvents.onRowMouseOver);
      }
      if (Self.fCreationEvents.onRowMouseMove) {
         TTabulatorOptions.a$442(Self.fCreationOptions,Self.fCreationEvents.onRowMouseMove);
      }
      if (Self.fCreationEvents.onRowAdded) {
         TTabulatorOptions.a$444(Self.fCreationOptions,Self.fCreationEvents.onRowAdded);
      }
      if (Self.fCreationEvents.onRowUpdated) {
         TTabulatorOptions.a$446(Self.fCreationOptions,Self.fCreationEvents.onRowUpdated);
      }
      if (Self.fCreationEvents.onRowDeleted) {
         TTabulatorOptions.a$448(Self.fCreationOptions,Self.fCreationEvents.onRowDeleted);
      }
      if (Self.fCreationEvents.onRowMoved) {
         TTabulatorOptions.a$450(Self.fCreationOptions,Self.fCreationEvents.onRowMoved);
      }
      if (Self.fCreationEvents.onRowResized) {
         TTabulatorOptions.a$452(Self.fCreationOptions,Self.fCreationEvents.onRowResized);
      }
      if (Self.fCreationEvents.onRowSelected) {
         TTabulatorOptions.a$532(Self.fCreationOptions,Self.fCreationEvents.onRowSelected);
      }
      if (Self.fCreationEvents.onRowDeselected) {
         TTabulatorOptions.a$534(Self.fCreationOptions,Self.fCreationEvents.onRowDeselected);
      }
      if (Self.fCreationEvents.onCellClick) {
         TTabulatorOptions.a$454(Self.fCreationOptions,Self.fCreationEvents.onCellClick);
      }
      if (Self.fCreationEvents.onCellDblClick) {
         TTabulatorOptions.a$456(Self.fCreationOptions,Self.fCreationEvents.onCellDblClick);
      }
      if (Self.fCreationEvents.onCellContext) {
         TTabulatorOptions.a$458(Self.fCreationOptions,Self.fCreationEvents.onCellContext);
      }
      if (Self.fCreationEvents.onCellTap) {
         TTabulatorOptions.a$460(Self.fCreationOptions,Self.fCreationEvents.onCellTap);
      }
      if (Self.fCreationEvents.onCellDblTap) {
         TTabulatorOptions.a$462(Self.fCreationOptions,Self.fCreationEvents.onCellDblTap);
      }
      if (Self.fCreationEvents.onCellTapHold) {
         TTabulatorOptions.a$464(Self.fCreationOptions,Self.fCreationEvents.onCellTapHold);
      }
      if (Self.fCreationEvents.onCellMouseEnter) {
         TTabulatorOptions.a$466(Self.fCreationOptions,Self.fCreationEvents.onCellMouseEnter);
      }
      if (Self.fCreationEvents.onCellMouseLeave) {
         TTabulatorOptions.a$468(Self.fCreationOptions,Self.fCreationEvents.onCellMouseLeave);
      }
      if (Self.fCreationEvents.onCellMouseOver) {
         TTabulatorOptions.a$470(Self.fCreationOptions,Self.fCreationEvents.onCellMouseOver);
      }
      if (Self.fCreationEvents.onCellMouseOut) {
         TTabulatorOptions.a$472(Self.fCreationOptions,Self.fCreationEvents.onCellMouseOut);
      }
      if (Self.fCreationEvents.onCellMouseMove) {
         TTabulatorOptions.a$474(Self.fCreationOptions,Self.fCreationEvents.onCellMouseMove);
      }
      if (Self.fCreationEvents.onCellEditing) {
         TTabulatorOptions.a$476(Self.fCreationOptions,Self.fCreationEvents.onCellEditing);
      }
      if (Self.fCreationEvents.onCellEditCancelled) {
         TTabulatorOptions.a$478(Self.fCreationOptions,Self.fCreationEvents.onCellEditCancelled);
      }
      if (Self.fCreationEvents.onCellEdited) {
         TTabulatorOptions.a$480(Self.fCreationOptions,Self.fCreationEvents.onCellEdited);
      }
      if (Self.fCreationEvents.onDataLoading) {
         TTabulatorOptions.a$482(Self.fCreationOptions,Self.fCreationEvents.onDataLoading);
      }
      if (Self.fCreationEvents.onDataLoaded) {
         TTabulatorOptions.a$484(Self.fCreationOptions,Self.fCreationEvents.onDataLoaded);
      }
      if (Self.fCreationEvents.onDataChanged) {
         TTabulatorOptions.a$486(Self.fCreationOptions,Self.fCreationEvents.onDataChanged);
      }
      if (Self.fCreationEvents.onDataImported) {
         TTabulatorOptions.a$194(Self.fCreationOptions,Self.fCreationEvents.onDataImported);
      }
      if (Self.fCreationEvents.onHtmlImporting) {
         TTabulatorOptions.a$488(Self.fCreationOptions,Self.fCreationEvents.onHtmlImporting);
      }
      if (Self.fCreationEvents.onHtmlImported) {
         TTabulatorOptions.a$490(Self.fCreationOptions,Self.fCreationEvents.onHtmlImported);
      }
      if (Self.fCreationEvents.onAjaxRequesting) {
         TTabulatorOptions.a$492(Self.fCreationOptions,Self.fCreationEvents.onAjaxRequesting);
      }
      if (Self.fCreationEvents.onAjaxResponse) {
         TTabulatorOptions.a$494(Self.fCreationOptions,Self.fCreationEvents.onAjaxResponse);
      }
      if (Self.fCreationEvents.onAjaxError) {
         TTabulatorOptions.a$496(Self.fCreationOptions,Self.fCreationEvents.onAjaxError);
      }
      if (Self.fCreationEvents.onDataFiltering) {
         TTabulatorOptions.a$498(Self.fCreationOptions,Self.fCreationEvents.onDataFiltering);
      }
      if (Self.fCreationEvents.onDataFiltered) {
         TTabulatorOptions.a$500(Self.fCreationOptions,Self.fCreationEvents.onDataFiltered);
      }
      if (Self.fCreationEvents.onDataSorting) {
         TTabulatorOptions.a$502(Self.fCreationOptions,Self.fCreationEvents.onDataSorting);
      }
      if (Self.fCreationEvents.onDataSorted) {
         TTabulatorOptions.a$504(Self.fCreationOptions,Self.fCreationEvents.onDataSorted);
      }
      if (Self.fCreationEvents.onRenderStarted) {
         TTabulatorOptions.a$506(Self.fCreationOptions,Self.fCreationEvents.onRenderStarted);
      }
      if (Self.fCreationEvents.onRenderComplete) {
         TTabulatorOptions.a$508(Self.fCreationOptions,Self.fCreationEvents.onRenderComplete);
      }
      if (Self.fCreationEvents.onPageLoaded) {
         TTabulatorOptions.a$510(Self.fCreationOptions,Self.fCreationEvents.onPageLoaded);
      }
      if (Self.fCreationEvents.onLocalized) {
         TTabulatorOptions.a$512(Self.fCreationOptions,Self.fCreationEvents.onLocalized);
      }
      if (Self.fCreationEvents.onDataGrouping) {
         TTabulatorOptions.a$514(Self.fCreationOptions,Self.fCreationEvents.onDataGrouping);
      }
      if (Self.fCreationEvents.onDataGrouped) {
         TTabulatorOptions.a$516(Self.fCreationOptions,Self.fCreationEvents.onDataGrouped);
      }
      if (Self.fCreationEvents.onGroupVisibilityChanged) {
         TTabulatorOptions.a$518(Self.fCreationOptions,Self.fCreationEvents.onGroupVisibilityChanged);
      }
      if (Self.fCreationEvents.onGroupClick) {
         TTabulatorOptions.a$520(Self.fCreationOptions,Self.fCreationEvents.onGroupClick);
      }
      if (Self.fCreationEvents.onGroupDblClick) {
         TTabulatorOptions.a$522(Self.fCreationOptions,Self.fCreationEvents.onGroupDblClick);
      }
      if (Self.fCreationEvents.onGroupContext) {
         TTabulatorOptions.a$524(Self.fCreationOptions,Self.fCreationEvents.onGroupContext);
      }
      if (Self.fCreationEvents.onGroupTap) {
         TTabulatorOptions.a$526(Self.fCreationOptions,Self.fCreationEvents.onGroupTap);
      }
      if (Self.fCreationEvents.onGroupDblTap) {
         TTabulatorOptions.a$528(Self.fCreationOptions,Self.fCreationEvents.onGroupDblTap);
      }
      if (Self.fCreationEvents.onRowSelectionChanged) {
         TTabulatorOptions.a$536(Self.fCreationOptions,Self.fCreationEvents.onRowSelectionChanged);
      }
      if (Self.fCreationEvents.onMovableRowsSendingStart) {
         TTabulatorOptions.a$538(Self.fCreationOptions,Self.fCreationEvents.onMovableRowsSendingStart);
      }
      if (Self.fCreationEvents.onMovableRowsSent) {
         TTabulatorOptions.a$540(Self.fCreationOptions,Self.fCreationEvents.onMovableRowsSent);
      }
      if (Self.fCreationEvents.onMovableRowsSentFailed) {
         TTabulatorOptions.a$542(Self.fCreationOptions,Self.fCreationEvents.onMovableRowsSentFailed);
      }
      if (Self.fCreationEvents.onMovableRowsSendingStop) {
         TTabulatorOptions.a$544(Self.fCreationOptions,Self.fCreationEvents.onMovableRowsSendingStop);
      }
      if (Self.fCreationEvents.onMovableRowsReceivingStart) {
         TTabulatorOptions.a$546(Self.fCreationOptions,Self.fCreationEvents.onMovableRowsReceivingStart);
      }
      if (Self.fCreationEvents.onMovableRowsReceivingStop) {
         TTabulatorOptions.a$552(Self.fCreationOptions,Self.fCreationEvents.onMovableRowsReceivingStop);
      }
      if (Self.fCreationEvents.onMovableRowsReceived) {
         TTabulatorOptions.a$548(Self.fCreationOptions,Self.fCreationEvents.onMovableRowsReceived);
      }
      if (Self.fCreationEvents.onMovableRowsReceivedFailed) {
         TTabulatorOptions.a$550(Self.fCreationOptions,Self.fCreationEvents.onMovableRowsReceivedFailed);
      }
      if (Self.fCreationEvents.onValidationFailed) {
         TTabulatorOptions.a$554(Self.fCreationOptions,Self.fCreationEvents.onValidationFailed);
      }
      if (Self.fCreationEvents.onHistoryUndo) {
         TTabulatorOptions.a$556(Self.fCreationOptions,Self.fCreationEvents.onHistoryUndo);
      }
      if (Self.fCreationEvents.onHistoryRedo) {
         TTabulatorOptions.a$558(Self.fCreationOptions,Self.fCreationEvents.onHistoryRedo);
      }
      if (Self.fCreationEvents.onClipboardCopied) {
         TTabulatorOptions.a$560(Self.fCreationOptions,Self.fCreationEvents.onClipboardCopied);
      }
      if (Self.fCreationEvents.onClipboardPasted) {
         TTabulatorOptions.a$562(Self.fCreationOptions,Self.fCreationEvents.onClipboardPasted);
      }
      if (Self.fCreationEvents.onClipboardPasteError) {
         TTabulatorOptions.a$564(Self.fCreationOptions,Self.fCreationEvents.onClipboardPasteError);
      }
      if (Self.fCreationEvents.onDownloadDataFormatter) {
         TTabulatorOptions.a$566(Self.fCreationOptions,Self.fCreationEvents.onDownloadDataFormatter);
      }
      if (Self.fCreationEvents.onDownloadReady) {
         TTabulatorOptions.a$568(Self.fCreationOptions,Self.fCreationEvents.onDownloadReady);
      }
      if (Self.fCreationEvents.onDownloadComplete) {
         TTabulatorOptions.a$570(Self.fCreationOptions,Self.fCreationEvents.onDownloadComplete);
      }
      if (Self.fCreationEvents.onDataTreeRowExpanded) {
         TTabulatorOptions.a$572(Self.fCreationOptions,Self.fCreationEvents.onDataTreeRowExpanded);
      }
      if (Self.fCreationEvents.onDataTreeRowCollapsed) {
         TTabulatorOptions.a$574(Self.fCreationOptions,Self.fCreationEvents.onDataTreeRowCollapsed);
      }
      if (Self.fCreationEvents.onScrollVertical) {
         TTabulatorOptions.a$576(Self.fCreationOptions,Self.fCreationEvents.onScrollVertical);
      }
      if (Self.fCreationEvents.onScrollHorizontal) {
         TTabulatorOptions.a$578(Self.fCreationOptions,Self.fCreationEvents.onScrollHorizontal);
      }
   }
   /// constructor TQTXTabulator.Create(Aowner: TQTXComponent; CB: TQTXTabulatorConstructorCB)
   ///  [line: 1219, column: 27, file: tor.tabulator.wrapper]
   ,Create$11:function(Self, Aowner, CB) {
      TQTXWidget.Create$11(Self,Aowner,function (tab) {
         Self.fCreationOptions = TTabulatorOptions.Create$4($New(TTabulatorOptions),null);
         Self.fCreationEvents = TObject.Create($New(TTabulatorCreationEvents));
         TQTXWidget.WhenReady(tab,function (widget) {
            TQTXDispatch.Execute(TQTXDispatch,function () {
               TQTXTabulator.BuildOptions(Self);
               Self.fTabulator = new Tabulator("#" + TQTXWidget.a$898(Self)[2]("id"),TTabulatorOptionsRenderer.RenderOptions$(Self.fCreationOptions));
               if (CB) {
                  CB(Self);
               }
            },50);
         });
      });
      return Self
   }
   /// destructor TQTXTabulator.Destroy()
   ///  [line: 1253, column: 26, file: tor.tabulator.wrapper]
   ,Destroy:function(Self) {
      TObject.Free(Self.fCreationEvents);
      TObject.Free(Self.fCreationOptions);
      Self.fTabulator.destroy();
      TQTXWidget.Destroy(Self);
   }
   /// function TQTXTabulator.getColumnDefinitionFrom(from: Variant; returnFalseIfNotValid: Boolean = True) : Variant
   ///  [line: 1419, column: 24, file: tor.tabulator.wrapper]
   ,getColumnDefinitionFrom:function(Self, from, returnFalseIfNotValid) {
      var Result = undefined;
      var colDefObj = null;
      colDefObj = TVariant.ToObject(from);
      if ((colDefObj!==null) && $Is(colDefObj,TTabulatorColumnDefinition)) {
         Result = TTabulatorOptionsRenderer.RenderOptions$($As(colDefObj,TTabulatorColumnDefinition));
      } else {
         Result = from;
      }
      if (returnFalseIfNotValid && ((!(TVariant.PropertyExists$1(Result,"title"))) || (!(TVariant.PropertyExists$1(Result,"field"))))) {
         Result = false;
      }
      return Result
   }
   /// function TQTXTabulator.mergeFieldsWithData(fields: array of String; data: array of Variant) : 
   ///  [line: 1490, column: 30, file: tor.tabulator.wrapper]
   ,mergeFieldsWithData:function(Self, fields, data$5) {
      var Result = [];
      var tmp = [],
         a$1340 = 0,
         value$2,
         arr = [],
         a$1341 = 0,
         value$3,
         arr$1 = [],
         elt,
         i$1 = 0;
      Result = [];
      var $temp20;
      for(a$1340=0,$temp20=data$5.length;a$1340<$temp20;a$1340++) {
         value$2 = data$5[a$1340];
         arr = value$2;
         if (arr.length != fields.length) {
            throw Exception.Create($New(EQTXException),"Fields and each element of Values should be the same size.");
         }
      }
      tmp = [];
      var $temp21;
      for(a$1341=0,$temp21=data$5.length;a$1341<$temp21;a$1341++) {
         value$3 = data$5[a$1341];
         arr$1 = value$3;
         elt = TVariant.CreateObject();
         var $temp22;
         for(i$1=0,$temp22=fields.length;i$1<$temp22;i$1++) {
            elt[fields[i$1]] = arr$1[i$1];
         }
         tmp.push(elt);
      }
      Result = tmp;
      return Result
   }
   /// procedure TQTXTabulator.ReCreateTabulator(tableOptionsOverride: TTabulatorOptions = nil; CB: TQTXTabulatorConstructorCB = nil)
   ///  [line: 1239, column: 25, file: tor.tabulator.wrapper]
   ,ReCreateTabulator:function(Self, tableOptionsOverride, CB) {
      Self.fTabulator = null;
      TQTXDispatch.Execute(TQTXDispatch,function () {
         if (tableOptionsOverride) {
            Self.fCreationOptions = tableOptionsOverride;
         } else {
            TQTXTabulator.BuildOptions(Self);
         }
         Self.fTabulator = new Tabulator("#" + TQTXWidget.a$898(Self)[2]("id"),TTabulatorOptionsRenderer.RenderOptions$(Self.fCreationOptions));
         if (CB) {
            CB(Self);
         }
      },50);
   }
   /// procedure TQTXTabulator.setColumns(columns: TVariantArray)
   ///  [line: 1408, column: 25, file: tor.tabulator.wrapper]
   ,setColumns$1:function(Self, columns$4) {
      var cols = [],
         a$1342 = 0,
         column;
      cols = [];
      var $temp23;
      for(a$1342=0,$temp23=columns$4.length;a$1342<$temp23;a$1342++) {
         column = columns$4[a$1342];
         cols.push(TQTXTabulator.getColumnDefinitionFrom(Self,column,false));
      }
      Self.fColumns = cols;
      if ((Self.fTabulator!==null) && (!(Self.fDontUpdateTabulator))) {
         Self.fTabulator.setColumns(Self.fColumns);
      }
   }
   /// function TQTXTabulator.setData(url: String; ajaxParams: Variant = Null; ajaxConfig: Variant = POST; CB: TQTXTabulatorStdCB = nil) : JPromise
   ///  [line: 1541, column: 24, file: tor.tabulator.wrapper]
   ,setData$5:function(Self, url$1, ajaxParams$1, ajaxConfig$1, CB) {
      var Result = null;
      Result = Self.fTabulator.setData(url$1,null,"POST").then(function (value$2) {
         var Result = undefined;
         Self.fData = Self.fTabulator.getData("all");
         if (CB) {
            CB();
         }
         if (Self.onSetData) {
            Self.onSetData();
         }
         return Result
      });
      return Result
   }
   /// function TQTXTabulator.setData(data: array of Variant; CB: TQTXTabulatorStdCB = nil) : JPromise
   ///  [line: 1529, column: 24, file: tor.tabulator.wrapper]
   ,setData$4:function(Self, data$5, CB) {
      var Result = null;
      Self.fData = data$5;
      Self.fTabulator.clearData();
      Result = Self.fTabulator.setData(Self.fData).then(function (value$2) {
         var Result = undefined;
         if (CB) {
            CB();
         }
         if (Self.onSetData) {
            Self.onSetData();
         }
         return Result
      });
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXTabulator.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TMyForm = class (TQTXForm)
///  [line: 30, column: 3, file: form1]
var TMyForm = {
   $ClassName:"TMyForm",$Parent:TQTXForm
   ,$Init:function ($) {
      TQTXForm.$Init($);
      $.FLabel$5 = $.FPanel$5 = null;
   }
   /// procedure TMyForm.FinalizeObject()
   ///  [line: 463, column: 19, file: form1]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FLabel$5);
      TObject.Free(Self.FPanel$5);
      TQTXForm.FinalizeObject(Self);
   }
   /// procedure TMyForm.InitializeObject()
   ///  [line: 247, column: 19, file: form1]
   ,InitializeObject:function(Self) {
      function AddShowSourceCodeButton(Parent, Src, buttonColor, sourceFor, aceHeight) {
         var btn = null,
            ace = null;
         btn = TQTXButton.Create$114($New(TQTXButton),Parent,function (Button$1) {
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Button$1),buttonColor);
            TQTXCustomFont.SetColor(Button$1.FFont,16777215);
            TQTXWidget.a$892(Button$1).textShadow = "none";
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$946(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
            Button$1.TagData = 0;
            Button$1.OnClick = function (Sender) {
               if (Button$1.TagData == 0) {
                  TQTXWidget.SetVisible(ace,true);
                  TQTXAceWidget.gotoLine(ace,1,1,true);
                  Button$1.TagData = 1;
                  TQTXWidget.a$894(Button$1,"Hide source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               } else {
                  TQTXWidget.SetVisible(ace,false);
                  Button$1.TagData = 0;
                  TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               }
            };
         });
         ace = TQTXWidget.Create$11$($New(TQTXAceWidget),Parent,function (AceWidget) {
            TQTXWidget.SetPositionMode(ace,2);
            TQTXWidget.SetDisplayMode(ace,4);
            TQTXWidget.SetVisible(ace,false);
            TQTXWidget.a$892(ace).width = "100%";
            TQTXWidget.SetHeight$(ace,aceHeight);
            TQTXAceWidget.setTheme(ace,"ace\/theme\/monokai");
            TQTXAceWidget.a$1326(ace).setMode("ace\/mode\/pascal");
            TQTXAceWidget.setValue$1(ace,Src,null);
            TQTXAceWidget.clearSelection(ace);
            TQTXAceWidget.setReadOnly(ace,true);
            TQTXAceWidget.gotoLine(ace,1,1,true);
         });
      };
      TQTXForm.InitializeObject(Self);
      Self.FPanel$5 = TQTXPanel.Create$102($New(TQTXPanel),Self,function (Panel$6) {
         var tab1 = null,
            elID1 = "",
            tableOptions1 = undefined,
            data1 = undefined,
            isDataReactive = false,
            widgetTable = null;
         /// anonymous TClassSymbol
         /// anonymous TClassSymbol
         /// anonymous TClassSymbol
         /// anonymous TClassSymbol
         /// anonymous TClassSymbol
         /// anonymous TClassSymbol
         /// anonymous TClassSymbol
         /// anonymous TClassSymbol
         /// anonymous TClassSymbol
         TQTXWidget.SetPositionMode(Panel$6,0);
         TQTXWidget.SetDisplayMode(Panel$6,4);
         TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Panel$6),2);
         TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Panel$6),16777215);
         TQTXCustomFont.SetFamily(Panel$6.FFont,"Segoe UI");
         TQTXSize.SetType(Panel$6.FFont.FSize,3);
         TQTXSize.SetValue(Panel$6.FFont.FSize,11);
         Self.FLabel$5 = TQTXLabel.Create$101($New(TQTXLabel),Panel$6,function (Label$6) {
            TQTXWidget.SetPositionMode(Label$6,0);
            TQTXLabel.a$1324(Label$6,"<b>Setting up a Tabulator table without TQTXTabulator (like in JS):<\/b><br\/>Advantage here is that you can configure columns and table options before your create your Tabulator table.");
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Label$6),16770244);
            TQTXContentBox.SetHAlign(Label$6,0);
            TQTXContentBox.SetVAlign(Label$6,1);
         });
         TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Self.FLabel$5)),2);
         TQTXButton.Create$114($New(TQTXButton),Panel$6,function (Button$1) {
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.a$896(Button$1,"Make rows movable");
            TQTXWidgetBorder.SetMargin$1(TQTXWidget.GetBorder(Button$1),5);
            Button$1.OnClick = function (Sender) {
               isDataReactive = false;
               tableOptions1.movableRows = true;
               tab1.destroy();
               tab1 = new Tabulator(elID1,tableOptions1);
            };
         });
         TQTXButton.Create$114($New(TQTXButton),Panel$6,function (Button$1) {
            TQTXWidget.SetPositionMode(Button$1,2);
            TQTXWidget.SetDisplayMode(Button$1,3);
            TQTXWidget.a$896(Button$1,"Make data \"Reactive\"");
            TQTXWidgetBorder.SetMargin$1(TQTXWidget.GetBorder(Button$1),5);
            Button$1.OnClick = function (Sender) {
               alert("On reactive data, you just manipulate the data and the table is automatically updated!");
               tableOptions1.reactiveData = true;
               isDataReactive = true;
               tableOptions1.data = data1;
               tab1.destroy();
               tab1 = new Tabulator(elID1,tableOptions1);
            };
         });
         TQTXButton.Create$114($New(TQTXButton),Panel$6,function (Button$1) {
            TQTXWidget.SetPositionMode(Button$1,2);
            TQTXWidget.a$896(Button$1,"Add row on \"Reactive\" data");
            TQTXWidgetBorder.SetMargin$1(TQTXWidget.GetBorder(Button$1),5);
            Button$1.OnClick = function (Sender) {
               /// anonymous TClassSymbol
               if (isDataReactive) {
                  data1.push({
                     "age" : 30
                     ,"gender" : "male"
                     ,"name" : "Eric"
                     ,"id" : 6
                  });
               } else {
                  alert("Click on the button \"Make data Reactive\" before!");
               }
            };
         });
         TQTXButton.Create$114($New(TQTXButton),Panel$6,function (Button$1) {
            TQTXWidget.SetPositionMode(Button$1,2);
            TQTXWidget.a$896(Button$1,"Modify NAME on Line Number 1 on a \"Reactive\" data");
            TQTXWidgetBorder.SetMargin$1(TQTXWidget.GetBorder(Button$1),5);
            Button$1.OnClick = function (Sender) {
               if (isDataReactive) {
                  data1[0].name = "Claude (changed!)";
               } else {
                  alert("Click on the button \"Make data Reactive\" before!");
               }
            };
         });
         data1 = [{
            "age" : 25
            ,"gender" : "male"
            ,"name" : "David"
            ,"id" : 1
         }, {
            "age" : 52
            ,"gender" : "female"
            ,"name" : "Olivia"
            ,"id" : 2
         }, {
            "age" : 36
            ,"gender" : "male"
            ,"name" : "Peter"
            ,"id" : 3
         }, {
            "age" : 16
            ,"gender" : "female"
            ,"name" : "Clara"
            ,"id" : 4
         }];
         tableOptions1 = {
            "cellClick" : function (e$1, cell) {
               alert("You clicked on a cell with a value: " + cell.getValue());
            }
            ,"columns" : [{
               "hozAlign" : "center"
               ,"resizable" : false
               ,"field" : "id"
               ,"title" : "ID"
            }, {
               "field" : "name"
               ,"title" : "Name"
            }, {
               "field" : "gender"
               ,"title" : "Gender"
            }, {
               "hozAlign" : "center"
               ,"field" : "age"
               ,"title" : "Age"
            }]
            ,"data" : data1
         };
         widgetTable = TQTXWidget.Create$11$($New(TQTXWidget),Panel$6,function (widget) {
            TQTXWidget.WhenReady(widget,function (widget$1) {
               TQTXWidget.SetDisplayMode(widget$1,4);
               TQTXWidget.a$892(widget$1).width = "100%";
               TQTXWidget.SetHeight$(widget$1,400);
               TQTXDispatch.Execute(TQTXDispatch,function () {
                  elID1 = "#" + TQTXComponent.GetHandle$(widget$1).id;
                  tab1 = new Tabulator(elID1,tableOptions1);
               },50);
            });
         });
         AddShowSourceCodeButton(Panel$6,$R[7],255,"",400);
      });
   }
   /// procedure TMyForm.StyleObject()
   ///  [line: 237, column: 19, file: form1]
   ,StyleObject:function(Self) {
      TQTXWidget.StyleObject(Self);
      TQTXWidget.SetPositionMode(Self,0);
      TQTXWidget.SetDisplayMode(Self,4);
      TQTXWidget.a$892(Self).width = "100%";
      TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Self),2);
      TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Self),12632256);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXForm.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXForm.GetInitialCSSClassName
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady:TQTXWidgetContainer.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TMyForm.$Intf={
   IQTXFormControl:[TQTXForm.FormPresented,TQTXForm.FormHidden,TQTXForm.FormOrientation]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXPanel = class (TQTXWidget)
///  [line: 41, column: 3, file: qtx.dom.control.panel]
var TQTXPanel = {
   $ClassName:"TQTXPanel",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
      $.FOptions$1 = [0];
   }
   /// procedure TQTXPanel.SetOptions(Value: TQTXPanelOptions)
   ///  [line: 72, column: 21, file: qtx.dom.control.panel]
   ,SetOptions:function(Self, Value$2) {
      Self.FOptions$1 = Value$2.slice(0);
      if (Self.FState == 1) {
         if ($SetIn(Self.FOptions$1,0,0,2)) {
            if (!(TQTXCustomObserver.GetActive$(Self.FResizeObserver))) {
               TQTXCustomObserver.Observe$(Self.FResizeObserver);
            }
         } else if (TQTXCustomObserver.GetActive$(Self.FResizeObserver)) {
            TQTXCustomObserver.UnObserve$(Self.FResizeObserver);
         }
         if ($SetIn(Self.FOptions$1,1,0,2)) {
            if (!(TQTXCustomObserver.GetActive$(Self.FMoveObserver))) {
               TQTXCustomObserver.Observe$(Self.FMoveObserver);
            }
         } else if (TQTXCustomObserver.GetActive$(Self.FMoveObserver)) {
            TQTXCustomObserver.UnObserve$(Self.FMoveObserver);
         }
      }
   }
   /// procedure TQTXPanel.Resize(Orientation: TQTXOrientation)
   ///  [line: 103, column: 21, file: qtx.dom.control.panel]
   ,Resize:function(Self, Orientation$1) {
      TQTXWidget.Resize(Self,Orientation$1);
      if ($SetIn(Self.FOptions$1,0,0,2)) {
         TQTXWidget.ForEach(Self,function (Item$1) {
            var Result = 0;
            TQTXWidget.Invalidate(Item$1);
            Result = 1;
            return Result
         });
      }
   }
   /// constructor TQTXPanel.Create(AOwner: TQTXDOMComponent; CB: TQTXPanelConstructor)
   ///  [line: 60, column: 23, file: qtx.dom.control.panel]
   ,Create$102:function(Self, AOwner, CB) {
      TQTXWidget.Create$11(Self,AOwner,function (Widget) {
         Self.FOptions$1 = [0];
         if (CB) {
            CB(Self);
         }
         TQTXPanel.SetOptions(Self,Self.FOptions$1.slice(0));
      });
      return Self
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize.apply($.ClassType, arguments)}
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXPanel.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXPanel.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXButtonType enumeration
///  [line: 39, column: 3, file: qtx.dom.control.button]
var TQTXButtonType = [ "btButton", "btReset", "btSubmit" ];
/// TQTXButton = class (TQTXWidget)
///  [line: 48, column: 3, file: qtx.dom.control.button]
var TQTXButton = {
   $ClassName:"TQTXButton",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
      $.OnClick = null;
      $.FClickDelegate = null;
   }
   /// constructor TQTXButton.Create(AOwner: TQTXComponent; CB: TQTXButtonConstructor)
   ///  [line: 86, column: 24, file: qtx.dom.control.button]
   ,Create$114:function(Self, AOwner, CB) {
      TQTXWidget.Create$11(Self,AOwner,function (Widget) {
         Self.FClickDelegate = TQTXWidget.AddMouseClickDelegate(Self,$Event2(Self,TQTXButton.HandleClickedEvent));
         if (CB) {
            CB(Self);
         }
      });
      return Self
   }
   /// function TQTXButton.CreateElementInstance() : TWidgetHandle
   ///  [line: 102, column: 21, file: qtx.dom.control.button]
   ,CreateElementInstance:function(Self) {
      var Result = undefined;
      Result = document.createElement("button");
      Result["type"] = "button";
      return Result
   }
   /// procedure TQTXButton.FinalizeObject()
   ///  [line: 96, column: 22, file: qtx.dom.control.button]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FClickDelegate);
      TQTXWidget.FinalizeObject(Self);
   }
   /// procedure TQTXButton.HandleClickedEvent(Sender: TQTXDOMMouseDelegate; Event: JMouseEvent)
   ///  [line: 110, column: 22, file: qtx.dom.control.button]
   ,HandleClickedEvent:function(Self, Sender, Event$1) {
      if (Self.OnClick) {
         Self.OnClick(Self);
      }
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXButton.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXAceWidget = class (TQTXWidget)
///  [line: 544, column: 3, file: tor.ace.wrapper]
var TQTXAceWidget = {
   $ClassName:"TQTXAceWidget",$Parent:TQTXWidget
   ,$Init:function ($) {
      TQTXWidget.$Init($);
      $.fAceEditor = $.fDivEditor = null;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 550, column: 44, file: tor.ace.wrapper]
   ,a$1326:function(Self) {
      var Result = null;
      Result = Self.fAceEditor.session;
      return Result
   }
   /// procedure TQTXAceWidget.clearSelection()
   ///  [line: 796, column: 25, file: tor.ace.wrapper]
   ,clearSelection:function(Self) {
      Self.fAceEditor.clearSelection();
   }
   /// constructor TQTXAceWidget.Create(AOwner: TQTXComponent; CB: TQTXAceWidgetConstructorCB)
   ///  [line: 741, column: 27, file: tor.ace.wrapper]
   ,Create$11:function(Self, AOwner, CB) {
      TQTXWidget.Create$11(Self,AOwner,function (widget) {
         TQTXWidget.SetWidth$(widget,600);
         TQTXWidget.SetHeight$(widget,300);
         Self.fDivEditor = TQTXWidget.Create$11$($New(TQTXWidget),widget,function (divEditor) {
            TQTXWidget.SetPositionMode(divEditor,4);
            TQTXWidget.a$899(divEditor)[7]("");
            TQTXComponent.GetHandle$(divEditor).style["left"] = 0;
            TQTXComponent.GetHandle$(divEditor).style["right"] = 0;
            TQTXComponent.GetHandle$(divEditor).style["top"] = 0;
            TQTXComponent.GetHandle$(divEditor).style["bottom"] = 0;
            TQTXWidget.WhenReady(divEditor,function (divEditor$1) {
               TQTXDispatch.Execute(TQTXDispatch,function () {
                  Self.fAceEditor = ace.edit(TQTXWidget.a$898(divEditor$1)[2]("id") + "");
                  if (CB) {
                     CB(Self);
                  }
               },50);
            });
         });
      });
      return Self
   }
   /// destructor TQTXAceWidget.Destroy()
   ///  [line: 769, column: 26, file: tor.ace.wrapper]
   ,Destroy:function(Self) {
      Self.fAceEditor.destroy();
      TQTXWidget.Destroy(Self);
   }
   /// procedure TQTXAceWidget.gotoLine(lineNumber: Integer; column: Integer; animate: Boolean)
   ///  [line: 964, column: 25, file: tor.ace.wrapper]
   ,gotoLine:function(Self, lineNumber$1, column, animate) {
      Self.fAceEditor.gotoLine(lineNumber$1,column,animate);
   }
   /// procedure TQTXAceWidget.setReadOnly(readOnly: Boolean)
   ///  [line: 1296, column: 25, file: tor.ace.wrapper]
   ,setReadOnly:function(Self, readOnly) {
      Self.fAceEditor.setReadOnly(readOnly);
   }
   /// procedure TQTXAceWidget.setTheme(theme: String)
   ///  [line: 1328, column: 25, file: tor.ace.wrapper]
   ,setTheme:function(Self, theme) {
      Self.fAceEditor.setTheme(theme);
   }
   /// function TQTXAceWidget.setValue(val: String; curPos: Variant) : String
   ///  [line: 1332, column: 24, file: tor.ace.wrapper]
   ,setValue$1:function(Self, val, curPos) {
      return Self.fAceEditor.setValue(val,curPos);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11$:function($){return $.ClassType.Create$11.apply($.ClassType, arguments)}
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXAceWidget.$Intf={
   IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// THomeForm = class (TQTXForm)
///  [line: 19, column: 3, file: home]
var THomeForm = {
   $ClassName:"THomeForm",$Parent:TQTXForm
   ,$Init:function ($) {
      TQTXForm.$Init($);
      $.FLabel = $.FPanel = null;
   }
   /// procedure THomeForm.FinalizeObject()
   ///  [line: 78, column: 21, file: home]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FLabel);
      TObject.Free(Self.FPanel);
      TQTXForm.FinalizeObject(Self);
   }
   /// procedure THomeForm.InitializeObject()
   ///  [line: 47, column: 21, file: home]
   ,InitializeObject:function(Self) {
      TQTXForm.InitializeObject(Self);
      TQTXOffCanvasMenuApplication.setAppTitle(OffCanvasMenuApplication(),"Tabulator wrapper demos");
      Self.FPanel = TQTXPanel.Create$102($New(TQTXPanel),Self,function (Panel$6) {
         TQTXWidget.SetPositionMode(Panel$6,0);
         TQTXWidget.SetDisplayMode(Panel$6,4);
         TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Panel$6),16777215);
         TQTXWidget.a$892(Panel$6).border = "none";
         TQTXCustomFont.SetFamily(Panel$6.FFont,"Segoe UI");
         TQTXSize.SetType(Panel$6.FFont.FSize,3);
         TQTXSize.SetValue(Panel$6.FFont.FSize,11);
         Self.FLabel = TQTXLabel.Create$101($New(TQTXLabel),Panel$6,function (Label$6) {
            TQTXWidget.SetPositionMode(Label$6,0);
            TQTXLabel.a$1324(Label$6,"<b>Welcome to this web application demonstrating the new wrapper of Tabulator.js for QTX");
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Label$6),16777215);
            TQTXContentBox.SetHAlign(Label$6,1);
            TQTXContentBox.SetVAlign(Label$6,1);
         });
         TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Self.FLabel)),2);
      });
   }
   /// procedure THomeForm.StyleObject()
   ///  [line: 37, column: 21, file: home]
   ,StyleObject:function(Self) {
      TQTXWidget.StyleObject(Self);
      TQTXWidget.SetPositionMode(Self,0);
      TQTXWidget.SetDisplayMode(Self,4);
      TQTXWidget.a$892(Self).width = "100%";
      TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Self),2);
      TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Self),12632256);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXForm.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXForm.GetInitialCSSClassName
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady:TQTXWidgetContainer.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
THomeForm.$Intf={
   IQTXFormControl:[TQTXForm.FormPresented,TQTXForm.FormHidden,TQTXForm.FormOrientation]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TMyForm2 = class (TQTXForm)
///  [line: 30, column: 3, file: form2]
var TMyForm2 = {
   $ClassName:"TMyForm2",$Parent:TQTXForm
   ,$Init:function ($) {
      TQTXForm.$Init($);
      $.FLabel$4 = $.FPanel$4 = null;
   }
   /// procedure TMyForm2.FinalizeObject()
   ///  [line: 271, column: 20, file: form2]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FLabel$4);
      TObject.Free(Self.FPanel$4);
      TQTXForm.FinalizeObject(Self);
   }
   /// procedure TMyForm2.InitializeObject()
   ///  [line: 125, column: 20, file: form2]
   ,InitializeObject:function(Self) {
      var Panel2 = null;
      function AddShowSourceCodeButton$1(Parent, Src, buttonColor, sourceFor, aceHeight) {
         var btn = null,
            ace = null;
         btn = TQTXButton.Create$114($New(TQTXButton),Parent,function (Button$1) {
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Button$1),buttonColor);
            TQTXCustomFont.SetColor(Button$1.FFont,16777215);
            TQTXWidget.a$892(Button$1).textShadow = "none";
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$946(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
            Button$1.TagData = 0;
            Button$1.OnClick = function (Sender) {
               if (Button$1.TagData == 0) {
                  TQTXWidget.SetVisible(ace,true);
                  TQTXAceWidget.gotoLine(ace,1,1,true);
                  Button$1.TagData = 1;
                  TQTXWidget.a$894(Button$1,"Hide source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               } else {
                  TQTXWidget.SetVisible(ace,false);
                  Button$1.TagData = 0;
                  TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               }
            };
         });
         ace = TQTXWidget.Create$11$($New(TQTXAceWidget),Parent,function (AceWidget) {
            TQTXWidget.SetPositionMode(ace,2);
            TQTXWidget.SetDisplayMode(ace,4);
            TQTXWidget.SetVisible(ace,false);
            TQTXWidget.a$892(ace).width = "100%";
            TQTXWidget.SetHeight$(ace,aceHeight);
            TQTXAceWidget.setTheme(ace,"ace\/theme\/monokai");
            TQTXAceWidget.a$1326(ace).setMode("ace\/mode\/pascal");
            TQTXAceWidget.setValue$1(ace,Src,null);
            TQTXAceWidget.clearSelection(ace);
            TQTXAceWidget.setReadOnly(ace,true);
            TQTXAceWidget.gotoLine(ace,1,1,true);
         });
      };
      TQTXForm.InitializeObject(Self);
      Panel2 = TQTXPanel.Create$102($New(TQTXPanel),Self,function (Panel$6) {
         var tab2 = null,
            tableOptions2 = null,
            elID2 = "",
            data2 = [],
            theFields = [],
            theData = [],
            ageColumn = null,
            widgetTable = null;
         /// anonymous TClassSymbol
         TQTXWidget.SetPositionMode(Panel$6,0);
         TQTXWidget.SetDisplayMode(Panel$6,4);
         TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Panel$6),2);
         TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Panel$6),16777215);
         TQTXCustomFont.SetFamily(Panel$6.FFont,"Segoe UI");
         TQTXSize.SetType(Panel$6.FFont.FSize,3);
         TQTXSize.SetValue(Panel$6.FFont.FSize,11);
         Self.FLabel$4 = TQTXLabel.Create$101($New(TQTXLabel),Panel$6,function (Label$6) {
            TQTXWidget.SetPositionMode(Label$6,0);
            TQTXLabel.a$1324(Label$6,"<b>Setting up the <u>same<\/u> Tabulator table with some useful classes\/functions:<\/b><br\/>More elegant way!");
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Label$6),16770244);
            TQTXContentBox.SetHAlign(Label$6,0);
            TQTXContentBox.SetVAlign(Label$6,1);
         });
         TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Self.FLabel$4)),2);
         theFields = ["id", "name", "gender", "age"];
         theData = [[1, "David", "male", 25], [2, "Olivia", "female", 52], [3, "Peter", "male", 36], [4, "Clara", "female", 16]];
         data2 = TQTXTabulator.mergeFieldsWithData(TQTXTabulator,theFields,theData);
         tableOptions2 = TTabulatorOptions.Create$4($New(TTabulatorOptions),null);
         tableOptions2.data = data2;
         ageColumn = TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),"","",null);
         TTabulatorColumnDefinition.a$693(ageColumn,"age");
         TTabulatorColumnDefinition.a$691(ageColumn,"Age");
         TTabulatorColumnDefinition.a$701(ageColumn,"center");
         tableOptions2.columns$1 = [TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Id","id",{
            "resizable" : false
            ,"hozAlign" : "center"
         }), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Name","name",null), TTabulatorOptionsRenderer.RenderOptions$(TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),"Gender","gender",null)), TTabulatorOptionsRenderer.RenderOptions$(ageColumn)];
         TTabulatorOptions.a$454(tableOptions2,function (e$1, cell) {
            alert("You clicked on a cell with a value: " + cell.getValue());
         });
         widgetTable = TQTXWidget.Create$11$($New(TQTXWidget),Panel$6,function (widget) {
            TQTXWidget.WhenReady(widget,function (widget$1) {
               TQTXWidget.SetDisplayMode(widget$1,4);
               TQTXWidget.a$892(widget$1).width = "100%";
               TQTXWidget.SetHeight$(widget$1,400);
               TQTXDispatch.Execute(TQTXDispatch,function () {
                  elID2 = "#" + TQTXComponent.GetHandle$(widget$1).id;
                  tab2 = new Tabulator(elID2,TTabulatorOptionsRenderer.RenderOptions$(tableOptions2));
               },50);
            });
         });
         AddShowSourceCodeButton$1(Panel$6,$R[6],255,"",400);
      });
   }
   /// procedure TMyForm2.StyleObject()
   ///  [line: 115, column: 20, file: form2]
   ,StyleObject:function(Self) {
      TQTXWidget.StyleObject(Self);
      TQTXWidget.SetPositionMode(Self,0);
      TQTXWidget.SetDisplayMode(Self,4);
      TQTXWidget.a$892(Self).width = "100%";
      TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Self),2);
      TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Self),12632256);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXForm.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXForm.GetInitialCSSClassName
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady:TQTXWidgetContainer.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TMyForm2.$Intf={
   IQTXFormControl:[TQTXForm.FormPresented,TQTXForm.FormHidden,TQTXForm.FormOrientation]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TMyForm3 = class (TQTXForm)
///  [line: 30, column: 3, file: form3]
var TMyForm3 = {
   $ClassName:"TMyForm3",$Parent:TQTXForm
   ,$Init:function ($) {
      TQTXForm.$Init($);
      $.FLabel$3 = $.FPanel$3 = null;
   }
   /// procedure TMyForm3.FinalizeObject()
   ///  [line: 280, column: 20, file: form3]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FLabel$3);
      TObject.Free(Self.FPanel$3);
      TQTXForm.FinalizeObject(Self);
   }
   /// procedure TMyForm3.InitializeObject()
   ///  [line: 125, column: 20, file: form3]
   ,InitializeObject:function(Self) {
      var Panel3 = null;
      function AddShowSourceCodeButton$2(Parent, Src, buttonColor, sourceFor, aceHeight) {
         var btn = null,
            ace = null;
         btn = TQTXButton.Create$114($New(TQTXButton),Parent,function (Button$1) {
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Button$1),buttonColor);
            TQTXCustomFont.SetColor(Button$1.FFont,16777215);
            TQTXWidget.a$892(Button$1).textShadow = "none";
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$946(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
            Button$1.TagData = 0;
            Button$1.OnClick = function (Sender) {
               if (Button$1.TagData == 0) {
                  TQTXWidget.SetVisible(ace,true);
                  TQTXAceWidget.gotoLine(ace,1,1,true);
                  Button$1.TagData = 1;
                  TQTXWidget.a$894(Button$1,"Hide source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               } else {
                  TQTXWidget.SetVisible(ace,false);
                  Button$1.TagData = 0;
                  TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               }
            };
         });
         ace = TQTXWidget.Create$11$($New(TQTXAceWidget),Parent,function (AceWidget) {
            TQTXWidget.SetPositionMode(ace,2);
            TQTXWidget.SetDisplayMode(ace,4);
            TQTXWidget.SetVisible(ace,false);
            TQTXWidget.a$892(ace).width = "100%";
            TQTXWidget.SetHeight$(ace,aceHeight);
            TQTXAceWidget.setTheme(ace,"ace\/theme\/monokai");
            TQTXAceWidget.a$1326(ace).setMode("ace\/mode\/pascal");
            TQTXAceWidget.setValue$1(ace,Src,null);
            TQTXAceWidget.clearSelection(ace);
            TQTXAceWidget.setReadOnly(ace,true);
            TQTXAceWidget.gotoLine(ace,1,1,true);
         });
      };
      TQTXForm.InitializeObject(Self);
      Panel3 = TQTXPanel.Create$102($New(TQTXPanel),Self,function (Panel$6) {
         var tab3 = null,
            data2 = [],
            theFields = [],
            theData = [];
         TQTXWidget.SetPositionMode(Panel$6,0);
         TQTXWidget.SetDisplayMode(Panel$6,4);
         TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Panel$6),2);
         TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Panel$6),16777215);
         TQTXCustomFont.SetFamily(Panel$6.FFont,"Segoe UI");
         TQTXSize.SetType(Panel$6.FFont.FSize,3);
         TQTXSize.SetValue(Panel$6.FFont.FSize,11);
         Self.FLabel$3 = TQTXLabel.Create$101($New(TQTXLabel),Panel$6,function (Label$6) {
            TQTXWidget.SetPositionMode(Label$6,0);
            TQTXLabel.a$1324(Label$6,"<b>Using <span style='background-color: yellow;'>TQTXTabulator<\/span><\/b><br\/>The best way ???");
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Label$6),16770244);
            TQTXContentBox.SetHAlign(Label$6,0);
            TQTXContentBox.SetVAlign(Label$6,1);
         });
         TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Self.FLabel$3)),2);
         TQTXButton.Create$114($New(TQTXButton),Panel$6,function (Button$1) {
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.a$896(Button$1,"Make rows and columns movable");
            TQTXWidgetBorder.SetMargin$1(TQTXWidget.GetBorder(Button$1),5);
            Button$1.OnClick = function (Sender) {
               TTabulatorOptions.a$111(tab3.fCreationOptions,true);
               TTabulatorOptions.a$164(tab3.fCreationOptions,true);
               TQTXTabulator.ReCreateTabulator(tab3,null,null);
            };
         });
         theFields = ["id", "name", "gender", "age"];
         theData = [[1, "David", "male", 25], [2, "Olivia", "female", 52], [3, "Peter", "male", 36], [4, "Clara", "female", 16]];
         data2 = TQTXTabulator.mergeFieldsWithData(TQTXTabulator,theFields,theData);
         tab3 = TQTXWidget.Create$11$($New(TQTXTabulator),Panel$6,function (widget) {
            var ageColumn = null;
            /// anonymous TClassSymbol
            TQTXWidget.SetDisplayMode(widget,4);
            TQTXWidget.a$892(widget).width = "100%";
            TQTXWidget.SetHeight$(widget,400);
            widget.fCreationEvents.onCellClick = function (e$1, cell) {
               alert("You clicked on a cell with a value: " + cell.getValue());
            };
            ageColumn = TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),"","",null);
            TTabulatorColumnDefinition.a$693(ageColumn,"age");
            TTabulatorColumnDefinition.a$691(ageColumn,"Age");
            TTabulatorColumnDefinition.a$701(ageColumn,"center");
            widget.fCreationOptions.columns$1 = [TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Id","id",{
               "resizable" : false
               ,"hozAlign" : "center"
            }), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Name","name",null), TTabulatorOptionsRenderer.RenderOptions$(TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),"Gender","gender",null)), TTabulatorOptionsRenderer.RenderOptions$(ageColumn)];
            widget.fCreationOptions.data = data2;
            TQTXTabulator.ReCreateTabulator(widget,null,function (widget$1) {
               /* null */
            });
         });
         AddShowSourceCodeButton$2(Panel$6,$R[4],255,"",400);
         AddShowSourceCodeButton$2(Panel$6,$R[5],32768,"Make Rows & Columns movable",100);
      });
   }
   /// procedure TMyForm3.StyleObject()
   ///  [line: 115, column: 20, file: form3]
   ,StyleObject:function(Self) {
      TQTXWidget.StyleObject(Self);
      TQTXWidget.SetPositionMode(Self,0);
      TQTXWidget.SetDisplayMode(Self,4);
      TQTXWidget.a$892(Self).width = "100%";
      TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Self),2);
      TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Self),12632256);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXForm.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXForm.GetInitialCSSClassName
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady:TQTXWidgetContainer.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TMyForm3.$Intf={
   IQTXFormControl:[TQTXForm.FormPresented,TQTXForm.FormHidden,TQTXForm.FormOrientation]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TMyForm4 = class (TQTXForm)
///  [line: 30, column: 3, file: form4]
var TMyForm4 = {
   $ClassName:"TMyForm4",$Parent:TQTXForm
   ,$Init:function ($) {
      TQTXForm.$Init($);
      $.FLabel$2 = $.FPanel$2 = null;
   }
   /// procedure TMyForm4.FinalizeObject()
   ///  [line: 382, column: 20, file: form4]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FLabel$2);
      TObject.Free(Self.FPanel$2);
      TQTXForm.FinalizeObject(Self);
   }
   /// procedure TMyForm4.InitializeObject()
   ///  [line: 162, column: 20, file: form4]
   ,InitializeObject:function(Self) {
      var Panel3 = null;
      function AddShowSourceCodeButton$3(Parent, Src, buttonColor, sourceFor, aceHeight) {
         var btn = null,
            ace = null;
         btn = TQTXButton.Create$114($New(TQTXButton),Parent,function (Button$1) {
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Button$1),buttonColor);
            TQTXCustomFont.SetColor(Button$1.FFont,16777215);
            TQTXWidget.a$892(Button$1).textShadow = "none";
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$946(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
            Button$1.TagData = 0;
            Button$1.OnClick = function (Sender) {
               if (Button$1.TagData == 0) {
                  TQTXWidget.SetVisible(ace,true);
                  TQTXAceWidget.gotoLine(ace,1,1,true);
                  Button$1.TagData = 1;
                  TQTXWidget.a$894(Button$1,"Hide source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               } else {
                  TQTXWidget.SetVisible(ace,false);
                  Button$1.TagData = 0;
                  TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               }
            };
         });
         ace = TQTXWidget.Create$11$($New(TQTXAceWidget),Parent,function (AceWidget) {
            TQTXWidget.SetPositionMode(ace,2);
            TQTXWidget.SetDisplayMode(ace,4);
            TQTXWidget.SetVisible(ace,false);
            TQTXWidget.a$892(ace).width = "100%";
            TQTXWidget.SetHeight$(ace,aceHeight);
            TQTXAceWidget.setTheme(ace,"ace\/theme\/monokai");
            TQTXAceWidget.a$1326(ace).setMode("ace\/mode\/pascal");
            TQTXAceWidget.setValue$1(ace,Src,null);
            TQTXAceWidget.clearSelection(ace);
            TQTXAceWidget.setReadOnly(ace,true);
            TQTXAceWidget.gotoLine(ace,1,1,true);
         });
      };
      TQTXForm.InitializeObject(Self);
      Panel3 = TQTXPanel.Create$102($New(TQTXPanel),Self,function (Panel$6) {
         var tab3 = null,
            data2 = [],
            btnAddBigData = null,
            theFields = [],
            theData = [];
         TQTXWidget.SetPositionMode(Panel$6,0);
         TQTXWidget.SetDisplayMode(Panel$6,4);
         TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Panel$6),2);
         TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Panel$6),16777215);
         TQTXCustomFont.SetFamily(Panel$6.FFont,"Segoe UI");
         TQTXSize.SetType(Panel$6.FFont.FSize,3);
         TQTXSize.SetValue(Panel$6.FFont.FSize,11);
         Self.FLabel$2 = TQTXLabel.Create$101($New(TQTXLabel),Panel$6,function (Label$6) {
            TQTXWidget.SetPositionMode(Label$6,0);
            TQTXLabel.a$1324(Label$6,"<b>Using <span style='background-color: yellow;'>TQTXTabulator<\/span><\/b><br\/>The best way ???");
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Label$6),16770244);
            TQTXContentBox.SetHAlign(Label$6,0);
            TQTXContentBox.SetVAlign(Label$6,1);
         });
         TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Self.FLabel$2)),2);
         btnAddBigData = TQTXButton.Create$114($New(TQTXButton),Panel$6,function (Button$1) {
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.a$896(Button$1,"Set 100K lines in the table");
            TQTXWidgetBorder.SetMargin$1(TQTXWidget.GetBorder(Button$1),5);
         });
         theFields = ["id", "name", "gender", "age"];
         theData = [[1, "David", "male", 25], [2, "Olivia", "female", 52], [3, "Peter", "male", 36], [4, "Clara", "female", 16]];
         data2 = TQTXTabulator.mergeFieldsWithData(TQTXTabulator,theFields,theData);
         tab3 = TQTXWidget.Create$11$($New(TQTXTabulator),Panel$6,function (widget) {
            var ageColumn = null;
            /// anonymous TClassSymbol
            TQTXWidget.SetDisplayMode(widget,4);
            TQTXWidget.a$892(widget).width = "100%";
            TQTXWidget.SetHeight$(widget,400);
            ageColumn = TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),"","",null);
            TTabulatorColumnDefinition.a$693(ageColumn,"age");
            TTabulatorColumnDefinition.a$691(ageColumn,"Age");
            TTabulatorColumnDefinition.a$701(ageColumn,"center");
            widget.fCreationOptions.columns$1 = [TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Id","id",{
               "resizable" : false
               ,"hozAlign" : "center"
            }), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Name","name",null), TTabulatorOptionsRenderer.RenderOptions$(TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),"Gender","gender",null)), TTabulatorOptionsRenderer.RenderOptions$(ageColumn)];
            widget.fCreationOptions.data = data2;
            widget.fCreationEvents.onCellClick = function (e$1, cell) {
               alert("You clicked on a cell with a value: " + cell.getValue());
            };
            TQTXTabulator.ReCreateTabulator(widget,null,function (widget$1) {
               /* null */
            });
            btnAddBigData.OnClick = function (Sender) {
               var myLongData = [],
                  names = ["","","","","","",""],
                  genders = ["","","","","","",""];
               async function SetMyLargeData() {
                  var dt1,
                     data$5,
                     dt2,
                     secs1 = 0,
                     arr = [],
                     dt3,
                     secs2 = 0;
                  dt1 = Now();
                  data$5 = (await CreateMyLongList());
                  dt2 = Now();
                  secs1 = TDateUtils.SecondsBetween(TDateUtils,dt1,dt2);
                  arr = data$5;
                  TQTXTabulator.setData$4(widget,arr,null);
                  dt3 = Now();
                  secs2 = TDateUtils.SecondsBetween(TDateUtils,dt2,dt3);
                  alert("List creation: "+secs1.toString()+" secs.\rSetting data to the table: "+secs2.toString()+" secs ==> IS IT FAST AS YOU LIKE??");
               };
               function CreateMyLongList() {
                  var Result = null;
                  Result = new Promise(function (Resolve, Reject) {
                     var mydata = [],
                        i$1 = 0,
                        elt,
                        rnd = 0,
                        rnd2 = 0,
                        resolvedData = undefined;
                     mydata = [];
                     for(i$1=1;i$1<=100000;i$1++) {
                        elt = TVariant.CreateObject();
                        elt.id = i$1;
                        rnd = RandomInt(7);
                        rnd2 = RandomInt(2000) + 1;
                        elt.name = names[rnd]+" "+rnd2.toString();
                        elt.gender = genders[rnd];
                        elt.age = RandomInt(100) + 1;
                        mydata.push(elt);
                     }
                     resolvedData = mydata;
                     Resolve(resolvedData);
                  });
                  return Result
               };
               myLongData = [];
               names = ["Wilson", "Peter", "Smith", "Veronica", "Maria", "Isabella", "Andrea"];
               genders = ["male", "male", "male", "female", "female", "female", "female"];
               SetMyLargeData();
            };
         });
         AddShowSourceCodeButton$3(Panel$6,$R[2],255,"",400);
         AddShowSourceCodeButton$3(Panel$6,$R[3],32768,"Set 100K lines",400);
      });
   }
   /// procedure TMyForm4.StyleObject()
   ///  [line: 152, column: 20, file: form4]
   ,StyleObject:function(Self) {
      TQTXWidget.StyleObject(Self);
      TQTXWidget.SetPositionMode(Self,0);
      TQTXWidget.SetDisplayMode(Self,4);
      TQTXWidget.a$892(Self).width = "100%";
      TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Self),2);
      TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Self),12632256);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXForm.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXForm.GetInitialCSSClassName
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady:TQTXWidgetContainer.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TMyForm4.$Intf={
   IQTXFormControl:[TQTXForm.FormPresented,TQTXForm.FormHidden,TQTXForm.FormOrientation]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TMyForm5 = class (TQTXForm)
///  [line: 30, column: 3, file: form5]
var TMyForm5 = {
   $ClassName:"TMyForm5",$Parent:TQTXForm
   ,$Init:function ($) {
      TQTXForm.$Init($);
      $.FLabel$1 = $.FPanel$1 = null;
   }
   /// procedure TMyForm5.FinalizeObject()
   ///  [line: 380, column: 20, file: form5]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FLabel$1);
      TObject.Free(Self.FPanel$1);
      TQTXForm.FinalizeObject(Self);
   }
   /// procedure TMyForm5.InitializeObject()
   ///  [line: 175, column: 20, file: form5]
   ,InitializeObject:function(Self) {
      var Panel3 = null;
      function AddShowSourceCodeButton$4(Parent, Src, buttonColor, sourceFor, aceHeight) {
         var btn = null,
            ace = null;
         btn = TQTXButton.Create$114($New(TQTXButton),Parent,function (Button$1) {
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Button$1),buttonColor);
            TQTXCustomFont.SetColor(Button$1.FFont,16777215);
            TQTXWidget.a$892(Button$1).textShadow = "none";
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$946(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Button$1)),5);
            TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
            Button$1.TagData = 0;
            Button$1.OnClick = function (Sender) {
               if (Button$1.TagData == 0) {
                  TQTXWidget.SetVisible(ace,true);
                  TQTXAceWidget.gotoLine(ace,1,1,true);
                  Button$1.TagData = 1;
                  TQTXWidget.a$894(Button$1,"Hide source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               } else {
                  TQTXWidget.SetVisible(ace,false);
                  Button$1.TagData = 0;
                  TQTXWidget.a$894(Button$1,"Show source code" + ((sourceFor != "")?" for \""+sourceFor+"\"":""));
               }
            };
         });
         ace = TQTXWidget.Create$11$($New(TQTXAceWidget),Parent,function (AceWidget) {
            TQTXWidget.SetPositionMode(ace,2);
            TQTXWidget.SetDisplayMode(ace,4);
            TQTXWidget.SetVisible(ace,false);
            TQTXWidget.a$892(ace).width = "100%";
            TQTXWidget.SetHeight$(ace,aceHeight);
            TQTXAceWidget.setTheme(ace,"ace\/theme\/monokai");
            TQTXAceWidget.a$1326(ace).setMode("ace\/mode\/pascal");
            TQTXAceWidget.setValue$1(ace,Src,null);
            TQTXAceWidget.clearSelection(ace);
            TQTXAceWidget.setReadOnly(ace,true);
            TQTXAceWidget.gotoLine(ace,1,1,true);
         });
      };
      TQTXForm.InitializeObject(Self);
      Panel3 = TQTXPanel.Create$102($New(TQTXPanel),Self,function (Panel$6) {
         var tab3 = null,
            data2 = [],
            btnLoadFromJson = null,
            btnLoadFromJsonWithPagination = null,
            theFields = [],
            theData = [];
         TQTXWidget.SetPositionMode(Panel$6,0);
         TQTXWidget.SetDisplayMode(Panel$6,4);
         TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Panel$6),2);
         TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Panel$6),16777215);
         TQTXCustomFont.SetFamily(Panel$6.FFont,"Segoe UI");
         TQTXSize.SetType(Panel$6.FFont.FSize,3);
         TQTXSize.SetValue(Panel$6.FFont.FSize,11);
         Self.FLabel$1 = TQTXLabel.Create$101($New(TQTXLabel),Panel$6,function (Label$6) {
            TQTXWidget.SetPositionMode(Label$6,0);
            TQTXLabel.a$1324(Label$6,"<b>Using <span style='background-color: yellow;'>TQTXTabulator<\/span><\/b><br\/>The best way ???");
            TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Label$6),16770244);
            TQTXContentBox.SetHAlign(Label$6,0);
            TQTXContentBox.SetVAlign(Label$6,1);
         });
         TQTXWidgetBorderEdge.SetMargin(TQTXWidgetBorder.a$948(TQTXWidget.GetBorder(Self.FLabel$1)),2);
         btnLoadFromJson = TQTXButton.Create$114($New(TQTXButton),Panel$6,function (Button$1) {
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.a$896(Button$1,"Load data from Json");
            TQTXWidgetBorder.SetMargin$1(TQTXWidget.GetBorder(Button$1),5);
         });
         btnLoadFromJsonWithPagination = TQTXButton.Create$114($New(TQTXButton),Panel$6,function (Button$1) {
            TQTXWidget.SetPositionMode(Button$1,0);
            TQTXWidget.SetDisplayMode(Button$1,4);
            TQTXWidget.a$896(Button$1,"Load data from Json (With Pagination)");
            TQTXWidgetBorder.SetMargin$1(TQTXWidget.GetBorder(Button$1),5);
         });
         theFields = ["id", "name", "gender", "age"];
         theData = [[1, "David", "male", 25], [2, "Olivia", "female", 52], [3, "Peter", "male", 36], [4, "Clara", "female", 16]];
         data2 = TQTXTabulator.mergeFieldsWithData(TQTXTabulator,theFields,theData);
         tab3 = TQTXWidget.Create$11$($New(TQTXTabulator),Panel$6,function (widget) {
            var ageColumn = null;
            /// anonymous TClassSymbol
            TQTXWidget.SetDisplayMode(widget,4);
            TQTXWidget.a$892(widget).width = "100%";
            TQTXWidget.SetHeight$(widget,400);
            ageColumn = TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),"","",null);
            TTabulatorColumnDefinition.a$693(ageColumn,"age");
            TTabulatorColumnDefinition.a$691(ageColumn,"Age");
            TTabulatorColumnDefinition.a$701(ageColumn,"center");
            widget.fCreationOptions.columns$1 = [TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Id","id",{
               "resizable" : false
               ,"hozAlign" : "center"
            }), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Name","name",null), TTabulatorOptionsRenderer.RenderOptions$(TTabulatorColumnDefinition.Create$5($New(TTabulatorColumnDefinition),"Gender","gender",null)), TTabulatorOptionsRenderer.RenderOptions$(ageColumn)];
            widget.fCreationOptions.data = data2;
            widget.fCreationEvents.onCellClick = function (e$1, cell) {
               alert("You clicked on a cell with a value: " + cell.getValue());
            };
            TQTXTabulator.ReCreateTabulator(widget,null,function (widget$1) {
               /* null */
            });
            btnLoadFromJson.OnClick = function (Sender) {
               TQTXTabulator.ReCreateTabulator(widget,null,function (table$1) {
                  /// anonymous TClassSymbol
                  TQTXTabulator.setColumns$1(table$1,[TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Name","name",null), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Capital","capital",null), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Region","region",null), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Name","name",null), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Population","population",{
                     "cellClick" : function () {
                        alert("You clicked one cell in the Population column");
                     }
                  })]);
                  TQTXTabulator.setData$5(table$1,"\/contries.json",null,"GET",null);
               });
            };
            btnLoadFromJsonWithPagination.OnClick = function (Sender) {
               /// anonymous TClassSymbol
               widget.fCreationOptions.columns$1 = [TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Name","name",null), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Capital","capital",null), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Region","region",null), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Name","name",null), TTabulatorColumnDefinition.RenderFromParams$4(TTabulatorColumnDefinition,"Population","population",{
                  "cellClick" : function () {
                     alert("You clicked one cell in the Population column");
                  }
               })];
               TTabulatorOptions.a$294(widget.fCreationOptions,20);
               TTabulatorOptions.a$291(widget.fCreationOptions,"local");
               TQTXTabulator.ReCreateTabulator(widget,null,function (table$1) {
                  TQTXTabulator.setData$5(table$1,"\/contries.json",null,"GET",null);
               });
            };
         });
         AddShowSourceCodeButton$4(Panel$6,$R[0],255,"",400);
         AddShowSourceCodeButton$4(Panel$6,$R[1],32768,"Load data from JSON",400);
      });
   }
   /// procedure TMyForm5.StyleObject()
   ///  [line: 165, column: 20, file: form5]
   ,StyleObject:function(Self) {
      TQTXWidget.StyleObject(Self);
      TQTXWidget.SetPositionMode(Self,0);
      TQTXWidget.SetDisplayMode(Self,4);
      TQTXWidget.a$892(Self).width = "100%";
      TQTXWidgetBorder.SetPadding$1(TQTXWidget.GetBorder(Self),2);
      TQTXWidgetBackground.SetColor$3(TQTXWidget.GetBackground(Self),12632256);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$9:TQTXOwnedObject.Create$9
   ,Create$10:TQTXComponent.Create$10
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXForm.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,Create$11:TQTXWidget.Create$11
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXForm.GetInitialCSSClassName
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady:TQTXWidgetContainer.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize:TQTXWidget.SetSize
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TMyForm5.$Intf={
   IQTXFormControl:[TQTXForm.FormPresented,TQTXForm.FormHidden,TQTXForm.FormOrientation]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead,TQTXDOMComponent.PropertyWrite,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXBase64Core = class (TObject)
///  [line: 43, column: 3, file: qtx.codec.base64]
var TQTXBase64Core = {
   $ClassName:"TQTXBase64Core",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TQTXBase64Core.Base64ToBytes(const b64: String) : TUInt8Array
   ///  [line: 150, column: 31, file: qtx.codec.base64]
   ,Base64ToBytes$1:function(b64) {
      var Result = [];
      var ASeg = 0,
         BSeg = 0,
         CSeg = 0,
         DSeg = 0,
         LTextLen = 0,
         LPlaceholderCount = 0,
         BufferSize = 0,
         xpos = 0,
         idx = 0,
         temp = 0,
         temp$1 = 0,
         temp$2 = 0;
      LTextLen = b64.length;
      if (LTextLen > 0) {
         LPlaceholderCount = 0;
         if (LTextLen % 4 < 1) {
            LPlaceholderCount = (b64.charAt((LTextLen - 1)-1) == "=")?2:(b64.charAt(LTextLen-1) == "=")?1:0;
         }
         BufferSize = ($Div(LTextLen * 3,4)) - LPlaceholderCount;
         $ArraySetLenC(Result,BufferSize,function (){return 0});
         if (LPlaceholderCount > 0) {
            (LTextLen-= 4);
         }
         xpos = 1;
         idx = 0;
         while (xpos < LTextLen) {
            ASeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos-1))]<<18;
            BSeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos))]<<12;
            CSeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos+1))]<<6;
            DSeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos+2))];
            temp = ((ASeg|BSeg)|CSeg)|DSeg;
            Result[idx]=(temp>>>16)&255;
            ++idx;
            Result[idx]=(temp>>>8)&255;
            ++idx;
            Result[idx]=temp&255;
            ++idx;
            (xpos+= 4);
         }
         switch (LPlaceholderCount) {
            case 1 :
               ASeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos-1))]<<2;
               BSeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos))]>>>4;
               temp$1 = ASeg|BSeg;
               Result[idx]=temp$1&255;
               break;
            case 2 :
               ASeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos-1))]<<10;
               BSeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos))]<<4;
               CSeg = __B64_RevLookup[TDataTypeConverter.CharToByte(b64.charAt(xpos+1))]>>>2;
               temp$2 = (ASeg|BSeg)|CSeg;
               Result[idx]=(temp$2>>>8)&255;
               ++idx;
               Result[idx]=temp$2&255;
               break;
         }
      }
      return Result
   }
   /// function TQTXBase64Core.Base64ToString(const b64: String) : String
   ///  [line: 87, column: 31, file: qtx.codec.base64]
   ,Base64ToString:function(b64) {
      var Result = "";
      if (NodeJs()) {
         Result = Buffer.from(b64, "base64").toString("binary");
      } else {
         Result = atob(b64);
      }
      return Result
   }
   /// function TQTXBase64Core.BytesToBase64(const Data: TUInt8Array) : String
   ///  [line: 200, column: 31, file: qtx.codec.base64]
   ,BytesToBase64$1:function(Data$1) {
      var Result = "";
      var LLen = 0,
         LExtra = 0,
         LStrideLen = 0,
         LMaxChunkLength = 0,
         i$1 = 0,
         Ahead = 0,
         SegSize = 0,
         output = "",
         LTemp = 0,
         LTemp$1 = 0;
      LLen = Data$1.length;
      if (LLen > 0) {
         LExtra = Data$1.length % 3;
         LStrideLen = LLen - LExtra;
         LMaxChunkLength = 16383;
         i$1 = 0;
         while (i$1 < LStrideLen) {
            Ahead = i$1 + LMaxChunkLength;
            SegSize = (Ahead > LStrideLen)?LStrideLen:Ahead;
            Result += TQTXBase64Core.EncodeChunk(Data$1,i$1,SegSize);
            (i$1+= LMaxChunkLength);
         }
         if (LExtra > 0) {
            --LLen;
         }
         output = "";
         switch (LExtra) {
            case 1 :
               LTemp = Data$1[LLen];
               output += __B64_Lookup[LTemp>>>2];
               output += __B64_Lookup[(LTemp<<4)&63];
               output += "==";
               break;
            case 2 :
               LTemp$1 = (Data$1[LLen - 1]<<8) + Data$1[LLen];
               output += __B64_Lookup[LTemp$1>>>10];
               output += __B64_Lookup[(LTemp$1>>>4)&63];
               output += __B64_Lookup[(LTemp$1<<2)&63];
               output += "=";
               break;
         }
         Result += output;
      }
      return Result
   }
   /// function TQTXBase64Core.EncodeChunk(const Data: TUInt8Array; startpos: Integer; endpos: Integer) : String
   ///  [line: 113, column: 31, file: qtx.codec.base64]
   ,EncodeChunk:function(Data$1, startpos, endpos) {
      var Result = "";
      var temp = 0;
      while (startpos < endpos) {
         temp = (Data$1[startpos]<<16) + (Data$1[startpos + 1]<<8) + Data$1[startpos + 2];
         Result += __B64_Lookup[(temp>>>18)&63]+__B64_Lookup[(temp>>>12)&63]+__B64_Lookup[(temp>>>6)&63]+__B64_Lookup[temp&63];
         (startpos+= 3);
      }
      return Result
   }
   /// function TQTXBase64Core.StringToBase64(const Text: String) : String
   ///  [line: 69, column: 31, file: qtx.codec.base64]
   ,StringToBase64:function(Text$2) {
      var Result = "";
      if (NodeJs()) {
         Result = Buffer.from(Text$2, "binary").toString("base64");
      } else {
         Result = btoa(Text$2);
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TQTXCodec = class (TDataTypeConverter)
///  [line: 139, column: 3, file: qtx.codec]
var TQTXCodec = {
   $ClassName:"TQTXCodec",$Parent:TDataTypeConverter
   ,$Init:function ($) {
      TDataTypeConverter.$Init($);
      $.FBindings = [];
      $.FCodecInfo = null;
   }
   /// constructor TQTXCodec.Create()
   ///  [line: 292, column: 23, file: qtx.codec]
   ,Create$13:function(Self) {
      TDataTypeConverter.Create$13(Self);
      Self.FCodecInfo = TQTXCodec.MakeCodecInfo$(Self);
      if (Self.FCodecInfo === null) {
         throw Exception.Create($New(ECodecError),"Internal codec error, failed to obtain registration info error");
      }
      return Self
   }
   /// destructor TQTXCodec.Destroy()
   ///  [line: 300, column: 22, file: qtx.codec]
   ,Destroy:function(Self) {
      TObject.Free(Self.FCodecInfo);
      TDataTypeConverter.Destroy(Self);
   }
   /// function TQTXCodec.MakeCodecInfo() : TQTXCodecInfo
   ///  [line: 306, column: 20, file: qtx.codec]
   ,MakeCodecInfo:function(Self) {
      return null;
   }
   /// procedure TQTXCodec.RegisterBinding(const Binding: TQTXCodecBinding)
   ///  [line: 311, column: 21, file: qtx.codec]
   ,RegisterBinding:function(Self, Binding) {
      if (Self.FBindings.indexOf(Binding) < 0) {
         Self.FBindings.push(Binding);
      } else {
         throw Exception.Create($New(ECodecError),"Binding already connected to codec error");
      }
   }
   /// procedure TQTXCodec.UnRegisterBinding(const Binding: TQTXCodecBinding)
   ///  [line: 319, column: 21, file: qtx.codec]
   ,UnRegisterBinding:function(Self, Binding) {
      var LIndex = 0;
      LIndex = Self.FBindings.indexOf(Binding);
      if (LIndex >= 0) {
         Self.FBindings.splice(LIndex,1)
         ;
      } else {
         throw Exception.Create($New(ECodecError),"Binding not connected to this codec error");
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$13$:function($){return $.ClassType.Create$13($)}
   ,DecodeData$:function($){return $.ClassType.DecodeData.apply($.ClassType, arguments)}
   ,EncodeData$:function($){return $.ClassType.EncodeData.apply($.ClassType, arguments)}
   ,MakeCodecInfo$:function($){return $.ClassType.MakeCodecInfo($)}
};
TQTXCodec.$Intf={
   IQTXCodecProcess:[TQTXCodec.EncodeData,TQTXCodec.DecodeData]
   ,IQTXCodecBinding:[TQTXCodec.RegisterBinding,TQTXCodec.UnRegisterBinding]
}
/// TBase64Codec = class (TQTXCodec)
///  [line: 31, column: 3, file: qtx.codec.base64]
var TBase64Codec = {
   $ClassName:"TBase64Codec",$Parent:TQTXCodec
   ,$Init:function ($) {
      TQTXCodec.$Init($);
   }
   /// procedure TBase64Codec.EncodeData(const Source: IManagedData; const Target: IManagedData)
   ///  [line: 275, column: 24, file: qtx.codec.base64]
   ,EncodeData:function(Self, Source, Target) {
      /* null */
   }
   /// procedure TBase64Codec.DecodeData(const Source: IManagedData; const Target: IManagedData)
   ///  [line: 279, column: 24, file: qtx.codec.base64]
   ,DecodeData:function(Self, Source, Target) {
      /* null */
   }
   /// function TBase64Codec.MakeCodecInfo() : TQTXCodecInfo
   ///  [line: 246, column: 23, file: qtx.codec.base64]
   ,MakeCodecInfo:function(Self) {
      var Result = null;
      var LVersion = {viMajor:0,viMinor:0,viRevision:0},
         LAccess = null;
      Result = TObject.Create($New(TQTXCodecInfo));
      LVersion = Create$35(0,1,0);
      LVersion.viMajor = 0;
      LVersion.viMinor = 1;
      LVersion.viRevision = 0;
      LAccess = $AsIntf(Result,"ICodecInfo");
      LAccess[0]("Base64Codec");
      LAccess[1]("text\/base64");
      LAccess[2](LVersion);
      LAccess[3]([6]);
      LAccess[5](1);
      LAccess[6](0);
      return Result
   }
   ,Destroy:TQTXCodec.Destroy
   ,Create$13:TQTXCodec.Create$13
   ,DecodeData$:function($){return $.ClassType.DecodeData.apply($.ClassType, arguments)}
   ,EncodeData$:function($){return $.ClassType.EncodeData.apply($.ClassType, arguments)}
   ,MakeCodecInfo$:function($){return $.ClassType.MakeCodecInfo($)}
};
TBase64Codec.$Intf={
   IQTXCodecProcess:[TBase64Codec.EncodeData,TBase64Codec.DecodeData]
   ,IQTXCodecBinding:[TQTXCodec.RegisterBinding,TQTXCodec.UnRegisterBinding]
}
function InitializeBase64() {
   var i$1 = 0;
   var $temp24;
   for(i$1=1,$temp24=CNT_B64_CHARSET.length;i$1<=$temp24;i$1++) {
      __B64_Lookup[i$1 - 1] = CNT_B64_CHARSET.charAt(i$1-1);
      __B64_RevLookup[TDataTypeConverter.CharToByte(CNT_B64_CHARSET.charAt(i$1-1))] = i$1 - 1;
   }
   __B64_RevLookup[TDataTypeConverter.CharToByte("-")] = 62;
   __B64_RevLookup[TDataTypeConverter.CharToByte("_")] = 63;
};
/// TQTXCodecVersionInfo = record
///  [line: 41, column: 3, file: qtx.codec]
function Copy$TQTXCodecVersionInfo(s,d) {
   d.viMajor=s.viMajor;
   d.viMinor=s.viMinor;
   d.viRevision=s.viRevision;
   return d;
}
function Clone$TQTXCodecVersionInfo($) {
   return {
      viMajor:$.viMajor,
      viMinor:$.viMinor,
      viRevision:$.viRevision
   }
}
/// function TQTXCodecVersionInfo.Create(const Major: Integer; const Minor: Integer; const Revision: Integer) : TQTXCodecVersionInfo
///  [line: 436, column: 37, file: qtx.codec]
function Create$35(Major, Minor, Revision) {
   var Result = {viMajor:0,viMinor:0,viRevision:0};
   Result.viMajor = Major;
   Result.viMinor = Minor;
   Result.viRevision = Revision;
   return Result
}
/// TQTXCodecManager = class (TObject)
///  [line: 162, column: 3, file: qtx.codec]
var TQTXCodecManager = {
   $ClassName:"TQTXCodecManager",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCodecs = [];
   }
   /// function TQTXCodecManager.CodecByClass(const ClsType: TCodecClass) : TQTXCodec
   ///  [line: 251, column: 27, file: qtx.codec]
   ,CodecByClass:function(Self, ClsType) {
      var Result = null;
      var a$1343 = 0,
         LItem = null,
         a$1344 = [];
      Result = null;
      a$1344 = Self.FCodecs;
      var $temp25;
      for(a$1343=0,$temp25=a$1344.length;a$1343<$temp25;a$1343++) {
         LItem = a$1344[a$1343];
         if (TObject.ClassType(LItem.ClassType) == ClsType) {
            Result = LItem;
            break;
         }
      }
      return Result
   }
   /// destructor TQTXCodecManager.Destroy()
   ///  [line: 194, column: 29, file: qtx.codec]
   ,Destroy:function(Self) {
      if (Self.FCodecs.length > 0) {
         TQTXCodecManager.Reset$1(Self);
      }
      TObject.Destroy(Self);
   }
   /// procedure TQTXCodecManager.RegisterCodec(const CodecClass: TCodecClass)
   ///  [line: 264, column: 28, file: qtx.codec]
   ,RegisterCodec:function(Self, CodecClass) {
      var LItem = null;
      LItem = TQTXCodecManager.CodecByClass(Self,CodecClass);
      if (LItem === null) {
         LItem = TDataTypeConverter.Create$13$($NewDyn(CodecClass,""));
         Self.FCodecs.push(LItem);
      } else {
         throw Exception.Create($New(ECodecManager),"Codec already registered error");
      }
   }
   /// procedure TQTXCodecManager.Reset()
   ///  [line: 201, column: 28, file: qtx.codec]
   ,Reset$1:function(Self) {
      var a$1345 = 0,
         codec = null;
      try {
         var a$1346 = [];
         a$1346 = Self.FCodecs;
         var $temp26;
         for(a$1345=0,$temp26=a$1346.length;a$1345<$temp26;a$1345++) {
            codec = a$1346[a$1345];
            try {
               TObject.Free(codec);
            } catch ($e) {
               /* null */
            }
         }
      } finally {
         Self.FCodecs.length=0;
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TQTXCodecInfo = class (TObject)
///  [line: 76, column: 3, file: qtx.codec]
var TQTXCodecInfo = {
   $ClassName:"TQTXCodecInfo",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.ciAbout = $.ciMime = $.ciName = "";
      $.ciDataFlow = [0];
      $.ciInput = 0;
      $.ciOutput = 0;
      $.ciVersion = {viMajor:0,viMinor:0,viRevision:0};
   }
   /// procedure TQTXCodecInfo.SetDataFlow(const coFlow: TCodecDataFlow)
   ///  [line: 495, column: 25, file: qtx.codec]
   ,SetDataFlow:function(Self, coFlow) {
      Self.ciDataFlow = coFlow.slice(0);
   }
   /// procedure TQTXCodecInfo.SetDescription(const coInfo: String)
   ///  [line: 490, column: 25, file: qtx.codec]
   ,SetDescription:function(Self, coInfo) {
      Self.ciAbout = coInfo;
   }
   /// procedure TQTXCodecInfo.SetInput(const InputType: TCodecDataFormat)
   ///  [line: 480, column: 25, file: qtx.codec]
   ,SetInput:function(Self, InputType) {
      Self.ciInput = InputType;
   }
   /// procedure TQTXCodecInfo.SetMime(const coMime: String)
   ///  [line: 468, column: 25, file: qtx.codec]
   ,SetMime:function(Self, coMime) {
      Self.ciMime = coMime;
   }
   /// procedure TQTXCodecInfo.SetName(const coName: String)
   ///  [line: 463, column: 25, file: qtx.codec]
   ,SetName$1:function(Self, coName) {
      Self.ciName = coName;
   }
   /// procedure TQTXCodecInfo.SetOutput(const OutputType: TCodecDataFormat)
   ///  [line: 485, column: 25, file: qtx.codec]
   ,SetOutput:function(Self, OutputType) {
      Self.ciOutput = OutputType;
   }
   /// procedure TQTXCodecInfo.SetVersion(const coVersion: TQTXCodecVersionInfo)
   ///  [line: 473, column: 25, file: qtx.codec]
   ,SetVersion:function(Self, coVersion) {
      Self.ciVersion.viMajor = coVersion.viMajor;
      Self.ciVersion.viMinor = coVersion.viMinor;
      Self.ciVersion.viRevision = coVersion.viRevision;
   }
   ,Destroy:TObject.Destroy
};
TQTXCodecInfo.$Intf={
   ICodecInfo:[TQTXCodecInfo.SetName$1,TQTXCodecInfo.SetMime,TQTXCodecInfo.SetVersion,TQTXCodecInfo.SetDataFlow,TQTXCodecInfo.SetDescription,TQTXCodecInfo.SetInput,TQTXCodecInfo.SetOutput]
}
/// TQTXCodecBinding = class (TObject)
///  [line: 107, column: 3, file: qtx.codec]
var TQTXCodecBinding = {
   $ClassName:"TQTXCodecBinding",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCodec = null;
   }
   /// constructor TQTXCodecBinding.Create(const EndPoint: TQTXCodec)
   ///  [line: 333, column: 30, file: qtx.codec]
   ,Create$36:function(Self, EndPoint) {
      var LAccess = null;
      TObject.Create(Self);
      if (EndPoint !== null) {
         Self.FCodec = EndPoint;
         LAccess = $AsIntf(Self.FCodec,"IQTXCodecBinding");
         LAccess[0](Self);
      } else {
         throw Exception.Create($New(ECodecBinding),"Binding failed, invalid endpoint error");
      }
      return Self
   }
   /// destructor TQTXCodecBinding.Destroy()
   ///  [line: 346, column: 29, file: qtx.codec]
   ,Destroy:function(Self) {
      var LAccess = null;
      LAccess = $AsIntf(Self.FCodec,"IQTXCodecBinding");
      LAccess[1](Self);
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TCodecDataFormat enumeration
///  [line: 57, column: 3, file: qtx.codec]
var TCodecDataFormat = [ "cdBinary", "cdText" ];
/// function TCodecDataFlowHelper.Ordinal() : Integer
///  [line: 420, column: 31, file: qtx.codec]
function TCodecDataFlowHelper$Ordinal(Self$5) {
   var Result = 0;
   Result = 0;
   if ($SetIn(Self$5,1,0,3)) {
      ++Result;
   }
   if ($SetIn(Self$5,2,0,3)) {
      (Result+= 2);
   }
   return Result
}
/// TCodecDataDirection enumeration
///  [line: 51, column: 3, file: qtx.codec]
var TCodecDataDirection = { 1:"cdRead", 2:"cdWrite" };
/// ECodecError = class (EException)
///  [line: 31, column: 3, file: qtx.codec]
var ECodecError = {
   $ClassName:"ECodecError",$Parent:EException
   ,$Init:function ($) {
      EException.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// ECodecManager = class (ECodecError)
///  [line: 33, column: 3, file: qtx.codec]
var ECodecManager = {
   $ClassName:"ECodecManager",$Parent:ECodecError
   ,$Init:function ($) {
      ECodecError.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// ECodecBinding = class (ECodecError)
///  [line: 32, column: 3, file: qtx.codec]
var ECodecBinding = {
   $ClassName:"ECodecBinding",$Parent:ECodecError
   ,$Init:function ($) {
      ECodecError.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function CodecManager() {
   var Result = null;
   if (__Manager === null) {
      __Manager = TObject.Create($New(TQTXCodecManager));
   }
   Result = __Manager;
   return Result
};
/// TQTXCodecUTF8 = class (TQTXCodec)
///  [line: 50, column: 3, file: qtx.codec.utf8]
var TQTXCodecUTF8 = {
   $ClassName:"TQTXCodecUTF8",$Parent:TQTXCodec
   ,$Init:function ($) {
      TQTXCodec.$Init($);
      $.EncodeBOM = false;
   }
   /// function TQTXCodecUTF8.CanUseClampedArray() : Boolean
   ///  [line: 157, column: 30, file: qtx.codec.utf8]
   ,CanUseClampedArray:function() {
      var Result = {v:false};
      try {
         var LTemp = undefined;
         try {
            LTemp = new Uint8ClampedArray(10);
         } catch ($e) {
            var e$1 = $W($e);
            return Result.v;
         }
         if (LTemp) {
            Result.v = true;
         }
      } finally {return Result.v}
   }
   /// function TQTXCodecUTF8.CanUseNativeConverter() : Boolean
   ///  [line: 170, column: 30, file: qtx.codec.utf8]
   ,CanUseNativeConverter:function() {
      var Result = {v:false};
      try {
         var LTemp = null;
         try {
            LTemp = new TextEncoder("utf8");
         } catch ($e) {
            var e$1 = $W($e);
            return false;
         }
         Result.v = LTemp !== null;
      } finally {return Result.v}
   }
   /// function TQTXCodecUTF8.Decode(const BytesToDecode: TUInt8Array) : String
   ///  [line: 259, column: 24, file: qtx.codec.utf8]
   ,Decode:function(Self, BytesToDecode) {
      var Result = "";
      var LDecoder = null,
         LTyped,
         i$1 = 0,
         bytelen = 0,
         c$2 = 0,
         c2 = 0,
         c2$1 = 0,
         c3 = 0,
         c4 = 0,
         u = 0,
         c2$2 = 0,
         c3$1 = 0;
      if (BytesToDecode.length < 1) {
         return "";
      }
      if (TQTXCodecUTF8.CanUseNativeConverter()) {
         LDecoder = new TextDecoder("utf8");
         LTyped = TDataTypeConverter.BytesToTypedArray(Self,BytesToDecode);
         Result = LDecoder.decode(LTyped);
         LTyped = null;
         LDecoder = null;
      } else {
         i$1 = 0;
         bytelen = BytesToDecode.length;
         if (bytelen > 2) {
            if (TQTXByteOrderMarkUTF8.CheckUTF8(TQTXByteOrderMarkUTF8,BytesToDecode)) {
               (i$1+= 3);
            }
         }
         while (i$1 < bytelen) {
            c$2 = BytesToDecode[i$1];
            ++i$1;
            if (c$2 < 128) {
               Result += TString.FromCharCode(c$2);
            } else if (c$2 > 191 && c$2 < 224) {
               c2 = BytesToDecode[i$1];
               ++i$1;
               Result += TString.FromCharCode(((c$2&31)<<6)|(c2&63));
            } else if (c$2 > 239 && c$2 < 365) {
               c2$1 = BytesToDecode[i$1];
               ++i$1;
               c3 = BytesToDecode[i$1];
               ++i$1;
               c4 = BytesToDecode[i$1];
               ++i$1;
               u = (((((c$2&7)<<18)|((c2$1&63)<<12))|((c3&63)<<6))|(c4&63)) - 65536;
               Result += TString.FromCharCode(55296 + (u>>>10));
               Result += TString.FromCharCode(56320 + (u&1023));
            } else {
               c2$2 = BytesToDecode[i$1];
               ++i$1;
               c3$1 = BytesToDecode[i$1];
               ++i$1;
               Result += TString.FromCharCode(((c$2&15)<<12)|(((c2$2&63)<<6)|(c3$1&63)));
            }
         }
      }
      return Result
   }
   /// procedure TQTXCodecUTF8.DecodeData(const Source: IManagedData; const Target: IManagedData)
   ///  [line: 337, column: 25, file: qtx.codec.utf8]
   ,DecodeData:function(Self, Source, Target) {
      /* null */
   }
   /// function TQTXCodecUTF8.Encode(TextToEncode: String) : TUInt8Array
   ///  [line: 182, column: 24, file: qtx.codec.utf8]
   ,Encode:function(Self, TextToEncode) {
      var Result = [];
      var LEncoder = null,
         LTyped = null,
         LClip = null,
         LTemp = null,
         n = 0;
      if (TextToEncode.length < 1) {
         return null;
      }
      if (TQTXCodecUTF8.CanUseNativeConverter()) {
         LEncoder = new TextEncoder("utf8");
         LTyped = LEncoder.encode(TextToEncode);
         Result = TDataTypeConverter.TypedArrayToBytes(LTyped);
         LEncoder = null;
         LTyped = null;
      } else {
         if (TQTXCodecUTF8.CanUseClampedArray()) {
            LClip = new Uint8ClampedArray(1);
            LTemp = new Uint8ClampedArray(1);
         } else {
            LClip = new Uint8Array(1);
            LTemp = new Uint8Array(1);
         }
         if (Self.EncodeBOM) {
            switch (TDataTypeConverter.SystemEndian()) {
               case 1 :
                  Result.push([239, 187, 191]);
                  break;
               case 2 :
                  Result.push([187, 239, 191]);
                  break;
            }
         }
         var $temp27;
         for(n=1,$temp27=TextToEncode.length;n<=$temp27;n++) {
            LClip[0]=TString.CharCodeFor(TextToEncode.charAt(n-1));
            if (LClip[0] < 128) {
               Result.push(LClip[0]);
            } else if (LClip[0] > 127 && LClip[0] < 2048) {
               LTemp[0]=((LClip[0]>>>6)|192);
               Result.push(LTemp[0]);
               LTemp[0]=((LClip[0]&63)|128);
               Result.push(LTemp[0]);
            } else {
               LTemp[0]=((LClip[0]>>>12)|224);
               Result.push(LTemp[0]);
               LTemp[0]=(((LClip[0]>>>6)&63)|128);
               Result.push(LTemp[0]);
               Result.push((LClip[0]&63)|128);
               Result.push(LTemp[0]);
            }
         }
      }
      return Result
   }
   /// procedure TQTXCodecUTF8.EncodeData(const Source: IManagedData; const Target: IManagedData)
   ///  [line: 333, column: 25, file: qtx.codec.utf8]
   ,EncodeData:function(Self, Source, Target) {
      /* null */
   }
   /// function TQTXCodecUTF8.MakeCodecInfo() : TQTXCodecInfo
   ///  [line: 141, column: 24, file: qtx.codec.utf8]
   ,MakeCodecInfo:function(Self) {
      var Result = null;
      var LVersion = {viMajor:0,viMinor:0,viRevision:0},
         LAccess = null;
      Result = TObject.Create($New(TQTXCodecInfo));
      LVersion = Create$35(0,2,0);
      LAccess = $AsIntf(Result,"ICodecInfo");
      LAccess[0]("UTF8Codec");
      LAccess[1]("text\/utf8");
      LAccess[2](LVersion);
      LAccess[3]([6]);
      LAccess[5](1);
      LAccess[6](0);
      return Result
   }
   ,Destroy:TQTXCodec.Destroy
   ,Create$13:TQTXCodec.Create$13
   ,DecodeData$:function($){return $.ClassType.DecodeData.apply($.ClassType, arguments)}
   ,EncodeData$:function($){return $.ClassType.EncodeData.apply($.ClassType, arguments)}
   ,MakeCodecInfo$:function($){return $.ClassType.MakeCodecInfo($)}
};
TQTXCodecUTF8.$Intf={
   IQTXCodecProcess:[TQTXCodecUTF8.EncodeData,TQTXCodecUTF8.DecodeData]
   ,IQTXCodecBinding:[TQTXCodec.RegisterBinding,TQTXCodec.UnRegisterBinding]
}
/// TQTXByteOrderMarkUTF8 = class (TObject)
///  [line: 38, column: 3, file: qtx.codec.utf8]
var TQTXByteOrderMarkUTF8 = {
   $ClassName:"TQTXByteOrderMarkUTF8",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TQTXByteOrderMarkUTF8.CheckUTF8(const Bytes: TUInt8Array) : Boolean
   ///  [line: 88, column: 38, file: qtx.codec.utf8]
   ,CheckUTF8:function(Self, Bytes) {
      var Result = false;
      if (Bytes.length >= 3) {
         switch (TDataTypeConverter.SystemEndian()) {
            case 1 :
               Result = Bytes[0] == 254 && Bytes[1] == 255;
               break;
            case 2 :
               Result = Bytes[0] == 255 && Bytes[1] == 254;
               break;
         }
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TQTXBomTypeUTF enumeration
///  [line: 31, column: 3, file: qtx.codec.utf8]
var TQTXBomTypeUTF = [ "bomNone", "bomUTF8", "bomUTF16", "bomUTF32" ];
var CRC_Table_Ready = false,
   CRC_Table = (function(){var a=[],i=0;while(i++<513)a.push(0);return a})(),
   Counter = 0,
   __Resolved = false,
   __SupportCTA = false,
   _NameId = 0,
   a$1241 = null,
   _GlobalStyleSheet = null,
   _ElementId = 0,
   _ElementLUT = undefined,
   AppInstance = null,
   INPUT = "input",
   NUMBER = "number",
   CHEXBOX = "checkbox",
   STAR = "star",
   SELECT = "select",
   AUTOCOMPLETE = "autocomplete",
   HIGHLIGHT = "highlight",
   BLOCKING = "blocking",
   MANUAL = "manual",
   REQUIRED = "required",
   UNIQUE = "unique",
   INTEGER = "integer",
   FLOAT = "float",
   NUMERIC = "numeric",
   STRING = "string",
   AVERAGE = "avg",
   MAX = "max",
   MIN = "min",
   SUM = "sum",
   CONCAT = "concat",
   TRUE = "true",
   BOTH = "both",
   TABLE = "table",
   GROUP = "group",
   VISIBLE = "visible",
   ACTIVE = "active",
   SELECTED = "selected",
   ALL = "all",
   EQUAL = "=",
   NOT_EQUAL = "!=",
   LIKE = "like",
   KEYWORDS = "keywords",
   STARTS_WITH = "starts",
   ENDS_WITH = "ends",
   LESS_THAN = "<",
   LESS_OR_EQUAL = "<=",
   GREATER_THAN = ">",
   GREATER_OR_EQUAL = ">=",
   IN_ARRAY = "in",
   REGEX = "regex",
   lSheet$1 = null,
   lSheet$2 = null,
   __DisplayStyles = ["","","","","","","","","","","","","","",""],
   __PositionModes = ["","","","","",""],
   __Border_StyleNames = ["","","","","","","","",""],
   __margin_names = ["","","",""],
   __padding_names = ["","","",""],
   __width_names = ["","","",""],
   __border_names = ["","","",""],
   __border_color_names = ["","","",""],
   lSheet$3 = null;
var __DisplayStyles = ["none", "initial", "inherit", "inline-block", "block", "flex", "table", "table-caption", "table-cell", "table-row", "table-column", "run-in", "list-item", "grid", "inline-grid"];
var __PositionModes = ["initial", "static", "relative", "fixed", "absolute", "sticky"];
var __Border_StyleNames = ["none", "initial", "inherited", "solid", "dotted", "double", "groove", "inset", "outset"];
var __margin_names = ["margin-left", "margin-top", "margin-right", "margin-bottom"];
var __padding_names = ["padding-left", "padding-top", "padding-right", "padding-bottom"];
var __width_names = ["border-left-width", "border-top-width", "border-right-width", "border-bottom-width"];
var __border_names = ["border-left-style", "border-top-style", "border-right-style", "border-bottom-style"];
var __border_color_names = ["border-left-color", "border-top-color", "border-right-color", "border-bottom-color"];
var B2Hex = (function(){var a=[],i=0;while(i++<256)a.push("");return a})(),
   Hex28 = undefined,
   Str28 = undefined,
   x$5 = 0,
   __ReqAnimFrame = null,
   __CancelAnimFrame = null,
   DaysInMonthTable = [[0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0]],
   __TYPE_MAP = {Boolean:undefined,Number$1:undefined,String$1:undefined,Object$2:undefined,Undefined:undefined,Function$1:undefined},
   __SIZES = [0,0,0,0,0,0,0,0,0,0,0],
   _NAMES = ["","","","","","","","","","",""];
var DaysInMonthTable = [[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]];
var __SIZES = [0, 1, 1, 2, 2, 4, 2, 4, 4, 8, 8];
var _NAMES = ["Unknown", "Boolean", "Byte", "Char", "Word", "Longword", "Smallint", "int32", "Single", "Double", "String"];
var __B64_Lookup = (function(){var a=[],i=0;while(i++<257)a.push("");return a})(),
   __B64_RevLookup = (function(){var a=[],i=0;while(i++<257)a.push(0);return a})(),
   CNT_B64_CHARSET = "";
var CNT_B64_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/";
var __Manager = null;
var lSheet$3 = TQTXCSSRules.GetGlobalStyleSheet(TQTXCSSRules);
TQTXCSSRules.AddStyles(lSheet$3,".ParentFont {\r\n  font-family:  inherit;\r\n  font-size:    inherit;\r\n  color:        inherit;\r\n}\r\n\r\n.ParentBackground {\r\n  background: inherit;\r\n  background-color: inherit;\r\n  background-image: inherit;\r\n  background-position: inherit;\r\n  background-repeat: inherit;\r\n}\r\n\r\n.TQTXBorderNone {\r\n  -webkit-border-style: none;\r\n\t   -moz-border-style: none;\r\n\t    -ms-border-style: none;\r\n\t     -o-border-style: none;\r\n\t        border-style: none;\r\n}\r\n\r\ndiv, input, span {\r\n   cursor:  default;\r\n\r\n   border: 0px;\r\n   margin: 0px;\r\n   padding: 0px;\r\n\r\n  -webkit-box-sizing: border-box !important;\r\n\t   -moz-box-sizing: border-box !important;\r\n\t    -ms-box-sizing: border-box !important;\r\n\t     -o-box-sizing: border-box !important;\r\n\t        box-sizing: border-box !important;\r\n\r\n\t-webkit-tap-highlight-color: transparent;\r\n\t   -moz-tap-highlight-color: transparent;\r\n\t    -ms-tap-highlight-color: transparent;\r\n\t     -o-tap-highlight-color: transparent;\r\n\t        tap-highlight-color: transparent;\r\n\r\n\t-webkit-font-smoothing: always;\r\n\t   -moz-font-smoothing: always;\r\n\t    -ms-font-smoothing: always;\r\n\t        font-smoothing: always;\r\n\r\n  -webkit-text-size-adjust: auto;\r\n     -moz-text-size-adjust: auto;\r\n      -ms-text-size-adjust: auto;\r\n       -o-text-size-adjust: auto;\r\n\r\n  -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n       -moz-user-select: none;\r\n        -ms-user-select: none;\r\n            user-select: none;\r\n}\r\n\r\n.TQTXDisabled {\r\n  opacity:        0.5 !Important;\r\n  cursor:         not-allowed !Important;\r\n  touch-action:   none !Important;\r\n  outline:        none !Important;\r\n  pointer-events: none !Important;\r\n  \/*\r\n  background:     url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl\/xfgAAAABJRU5ErkJggg==) repeat !Important;\r\n  *\/\r\n}\r\n\r\n.TQTXDisabled: > * {\r\n  opacity:        0.5 !Important;\r\n  cursor:         not-allowed !Important;\r\n  touch-action:   none !Important;\r\n  outline:        none !Important;\r\n  pointer-events: none !Important;\r\n}\r\n\r\n");
var Hex28 = TVariant.CreateObject();
var Str28 = TVariant.CreateObject();
for(x$5=0;x$5<=255;x$5++) {
   B2Hex[x$5] = (IntToHex2(x$5)).toLocaleLowerCase();
   Hex28[(IntToHex2(x$5)).toLocaleLowerCase()] = x$5;
   Str28[x$5.toString()] = x$5;
}
;
__TYPE_MAP.Boolean = typeof(true);
__TYPE_MAP.Number$1 = typeof(0);
__TYPE_MAP.String$1 = typeof("");
__TYPE_MAP.Object$2 = typeof(TVariant.CreateObject());
__TYPE_MAP.Undefined = typeof(undefined);
__TYPE_MAP.Function$1 = typeof(function () {
   /* null */
});
if (!Uint8Array.prototype.fill) {
      Uint8Array.prototype.fill = Array.prototype.fill;
    }
;
__ReqAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                return window.setTimeout(callback, 1000 / 60);
              };
    })();
;
__CancelAnimFrame = (function(){
      return  window.cancelAnimationFrame       ||
              window.webkitCancelAnimationFrame ||
              window.mozCancelAnimationFrame    ||
              window.msCancelAnimationFrame     ||
              function( handle ){
                window.clearTimeout(handle);
              };
    })();
;
InitializeBase64();
TQTXCodecManager.RegisterCodec(CodecManager(),TBase64Codec);
TQTXCodecManager.RegisterCodec(CodecManager(),TQTXCodecUTF8);
var lSheet$2 = TQTXCSSRules.GetGlobalStyleSheet(TQTXCSSRules);
TQTXCSSRules.AddStyles(lSheet$2,".TQTXContentBox {\r\n  display: flex !important;\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  text-align: center;\r\n  min-height: 8px;\r\n}\r\n");
SetupLabelStyles();
var AceVisualRenderer = ace.require('ace/virtual_renderer').VisualRenderer;
    var AceEditor = ace.require('ace/editor').Editor;
    var AceRange = ace.require('ace/range').Range;
    var AceSelection = ace.require('ace/selection').Selection;
    var AceUndoManager = ace.require('ace/undomanager').UndoManager;
    var AceDocument = ace.require('ace/document').Document;
    var AceAnchor = ace.require('ace/anchor').Anchor;
;
var lSheet$1 = TQTXCSSRules.GetGlobalStyleSheet(TQTXCSSRules);
TQTXCSSRules.AddStyles(lSheet$1,"\/* add here css styles *\/\r\n\r\n.content { height: calc(100% - 4em); }\r\n\r\n@font-face {\r\n  font-family: Entypo;\r\n  src: url(\"..\/fonts\/entypo.eot\");\r\n  src: url(\"..\/fonts\/entypo.woff\") format(\"woff\"), url(\"..\/fonts\/entypo.eot?#iefix\") format(\"embedded-opentype\"), url(\"..\/fonts\/entypo.ttf\") format(\"truetype\"), url(\"..\/fonts\/entypo.svg#Entypo\") format(\"svg\");\r\n  font-weight: normal;\r\n  font-style: normal; }\r\n\r\n@font-face {\r\n  font-family: Social;\r\n  src: url(\"..\/fonts\/entypo-social.eot\");\r\n  src: url(\"..\/fonts\/entypo-social.woff\") format(\"woff\"), url(\"..\/fonts\/entypo-social.eot?#iefix\") format(\"embedded-opentype\"), url(\"..\/fonts\/entypo-social.ttf\") format(\"truetype\"), url(\"..\/fonts\/entypo-social.svg#Entypo\") format(\"svg\");\r\n  font-weight: normal;\r\n  font-style: normal; }\r\n\r\n@font-face {\r\n  font-family: Pacifico;\r\n  src: url(\"..\/fonts\/Pacifico-webfont.eot\");\r\n  src: url(\"..\/fonts\/Pacifico-webfont.woff\") format(\"woff\"), url(\"..\/fonts\/Pacifico-webfont.eot?#iefix\") format(\"embedded-opentype\"), url(\"..\/fonts\/Pacifico-webfont.ttf\") format(\"truetype\"), url(\"..\/fonts\/Pacifico-webfont.svg#Entypo\") format(\"svg\");\r\n  font-weight: normal;\r\n  font-style: normal; }\r\n\r\n.menucontainer a{\r\n  width: 100%;\r\n  padding: 0.6em;\r\n  text-decoration: none;\r\n  color: gainsboro;\r\n  font-weight: 300;\r\n  text-shadow: 0 0.0625em 0.0625em rgb(0 0 0 \/ 40%);\r\n}\r\n\r\n.menucontainer a:hover{\r\n  color: #fff;\r\n  background: #323232;\r\n}\r\n\r\n.menucontainer li{\r\n  width: 100%;\r\n  border-bottom: 1px solid rgba(255, 255, 255, 0.08);\r\n  cursor: pointer;\r\n}\r\n\r\n.menucontainer li.active{\r\n  color: #fff;\r\n  background: #323232;\r\n}\r\n\r\n.menucontainer li .icon {\r\n  float: left;\r\n  margin: 0;\r\n  position: inline-block;\r\n  font-style: normal;\r\n  padding-top: 0.2em;\r\n  padding-right: 0.8em;\r\n  width: 0.8em;\r\n}\r\n\r\n    ");
var main = function() {
   TQTXComponent.Create$10$($New(TQTXOffCanvasMenuApplication),null,function (Widget) {
      var FForm = null,
         FHomeForm = null,
         FForm2 = null,
         FForm3 = null,
         FForm4 = null,
         FForm5 = null;
      TQTXComponent.GetHandle$(Widget).style["font-family"] = "Segoe UI";
      FForm = TQTXForm.Create$98($New(TMyForm),OffCanvasMenuApplication().FPagesHolder,null);
      FHomeForm = TQTXForm.Create$98($New(THomeForm),OffCanvasMenuApplication().FPagesHolder,null);
      FForm2 = TQTXForm.Create$98($New(TMyForm2),OffCanvasMenuApplication().FPagesHolder,null);
      FForm3 = TQTXForm.Create$98($New(TMyForm3),OffCanvasMenuApplication().FPagesHolder,null);
      FForm4 = TQTXForm.Create$98($New(TMyForm4),OffCanvasMenuApplication().FPagesHolder,null);
      FForm5 = TQTXForm.Create$98($New(TMyForm5),OffCanvasMenuApplication().FPagesHolder,null);
      TQTXOffCanvasMenuApplication.setAppTitle(OffCanvasMenuApplication(),"Tabulator wrapper demos");
      TQTXOffCanvasMenuApplication.AddSideMenu(OffCanvasMenuApplication(),"Home","","fa fa-home",FHomeForm,true,null,"","_blank");
      TQTXOffCanvasMenuApplication.AddSideMenu(OffCanvasMenuApplication(),"Demo 1 (without TQTXTabulator)","","fa fa-star",FForm,false,null,"","_blank");
      TQTXOffCanvasMenuApplication.AddSideMenu(OffCanvasMenuApplication(),"Demo 2 (Demo 1 improved)","","fa fa-star",FForm2,false,null,"","_blank");
      TQTXOffCanvasMenuApplication.AddSideMenu(OffCanvasMenuApplication(),"Demo 3 (TQTXTabulator)","","fa fa-star",FForm3,false,null,"","_blank");
      TQTXOffCanvasMenuApplication.AddSideMenu(OffCanvasMenuApplication(),"Demo 4 (Large dataset)","","fa fa-star",FForm4,false,null,"","_blank");
      TQTXOffCanvasMenuApplication.AddSideMenu(OffCanvasMenuApplication(),"Demo 5 (Load from JSON)","","fa fa-star",FForm5,false,null,"","_blank");
      TQTXOffCanvasMenuApplication.AddSideMenu(OffCanvasMenuApplication(),"Open Tabulator website","","fa fa-check-circle",null,false,null,"http:\/\/tabulator.info\/","_blank");
   });
}
