unit tor.utils;

interface

uses
  qtx.sysutils, qtx.classes;

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
function newObj(elts: Array of Variant): Variant;

implementation

function newObj(elts: Array of Variant): Variant;
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

end.
