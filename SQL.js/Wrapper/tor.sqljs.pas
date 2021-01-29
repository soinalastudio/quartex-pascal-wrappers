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

unit tor.sqljs;

interface

uses
  qtx.sysutils, qtx.classes, qtx.promises;

type

  TLocateFileFunc = function (filename: string): String;

  TSqlJsConfig = class
    locateFile: TLocateFileFunc;
  end;

  TSqlJsDatabase = class;
  TSqlJsStatement = class;

  TSqlJsQueryExecResult = class
    columns: array of string;
    values: array of variant;
  end;

  TSqlJsQueryExecResultArray = array of TSqlJsQueryExecResult;
  TSqlJsEachRowCB = procedure(row: variant);
  TSqlJsEachDoneCB = procedure;

  TSqlJsDatabase = class
  private
    db: variant;
  public
    constructor Create(SQL: variant);  overload;
    constructor Create(SQL: variant; data: JUint8Array); overload;

    destructor Free;

    procedure Close();

    function CreateFunction(funcname: string; func: variant): TSqlJsDatabase;

    procedure Each(sql: string; CB: TSqlJsEachRowCB; DoneCB: TSqlJsEachDoneCB); overload;
    procedure Each(sql: string; param: variant; CB: TSqlJsEachRowCB; DoneCB: TSqlJsEachDoneCB); overload;
    procedure Each(sql: string; params: array of variant; CB: TSqlJsEachRowCB; DoneCB: TSqlJsEachDoneCB); overload;

    function Exec(query: string): TSqlJsQueryExecResultArray; overload;
    function Exec(query: string; param: variant): TSqlJsQueryExecResultArray; overload;
    function Exec(query: string; params: array of variant): TSqlJsQueryExecResultArray; overload;

    function Export(): JUint8Array;

    procedure handleError();

    function getRowModified(): integer;

    procedure Run(query: string); overload;
    procedure Run(query: string; param: variant); overload;
    procedure Run(query: string; params: array of variant);overload;

    function Prepare(query: string): TSqlJsStatement; overload;
    function Prepare(query: string; param: variant): TSqlJsStatement; overload;
    function Prepare(query: string; params: array of variant): TSqlJsStatement; overload;
  end;

  TSqlJsStatement = class
  private
    stmt: variant;
  public
    constructor Create(statement: variant);

    function Bind(values: variant): boolean; overload;
    function Bind(values: array of variant): boolean; overload;

    function FreeStatement(): boolean;
    function FreeMem(): boolean;

    function get(): TVariantArray; overload;
    function get(params: variant): TVariantArray; overload;
    function get(params: array of variant): TVariantArray; overload;

    function getColumnNames(): array of string;

    function getNormalizedSQL(): string;

    function getSQL(): string;

    function getAsObject(): TObject; overload;
    function getAsObject(params: variant): TObject; overload;
    function getAsObject(params: array of variant): TObject; overload;

    procedure reset();

    procedure Run(); overload;
    procedure Run(values: variant); overload;
    procedure Run(values: array of variant); overload;

    function Step(): boolean;

  end;

function initSqlJs(config: TSqlJsConfig): JPromise; external "initSqlJs";

implementation

constructor TSqlJsDatabase.Create(SQL: variant);
begin
  inherited Create;
  asm
    @db = new (@SQL).Database();
  end;
end;

constructor TSqlJsDatabase.Create(SQL: variant; data: JUint8Array);
begin
  inherited Create;
  asm
    @db = new (@SQL).Database(@data);
  end;
end;

procedure TSqlJsDatabase.Run(query: string);
begin
  asm
    (@db).run(@query);
  end;
end;

procedure TSqlJsDatabase.Run(query: string; param: variant);
begin
  asm
    (@db).run(@query, @param);
  end;
end;

procedure TSqlJsDatabase.Run(query: string; params: array of variant);
begin
  asm
    (@db).run(@query, @params);
  end;
end;

function TSqlJsDatabase.Prepare(query: string): TSqlJsStatement;
begin
  var stmt: variant;
  asm
    @stmt = (@db).prepare(@query);
  end;
  result := new TSqlJsStatement(stmt);
end;

function TSqlJsDatabase.Prepare(query: string; params: array of variant): TSqlJsStatement;
begin
  var stmt: variant;
  asm
    @stmt = (@db).prepare(@query, @params);
  end;
  result := new TSqlJsStatement(stmt);
end;

function TSqlJsDatabase.Prepare(query: string; param: variant): TSqlJsStatement;
begin
  var stmt: variant;
  asm
    @stmt = (@db).prepare(@query, @param);
  end;
  result := new TSqlJsStatement(stmt);
end;

procedure TSqlJsDatabase.Close();
begin
  asm
    (@db).close();
  end;
end;

function TSqlJsDatabase.CreateFunction(funcname: string; func: variant): TSqlJsDatabase;
begin
  asm
    (@db).create_function(@funcname, @func);
  end;
  result := self;
end;

procedure TSqlJsDatabase.Each(sql: string; CB: TSqlJsEachRowCB; DoneCB: TSqlJsEachDoneCB);
begin
  asm
    (@db).each(@sql, @cb, @donecb);
  end;
end;

procedure TSqlJsDatabase.Each(sql: string; param: variant; CB: TSqlJsEachRowCB; DoneCB: TSqlJsEachDoneCB);
begin
  asm
    (@db).each(@sql, @param, @cb, @donecb);
  end;
end;

procedure TSqlJsDatabase.Each(sql: string; params: array of variant; CB: TSqlJsEachRowCB; DoneCB: TSqlJsEachDoneCB);
begin
  asm
    (@db).each(@sql, @params, @cb, @donecb);
  end;
end;

function TSqlJsDatabase.Exec(query: string; param: variant): TSqlJsQueryExecResultArray;
begin
  asm
    @result = (@db).exec(@query, @param);
  end;
end;

function TSqlJsDatabase.Exec(query: string): TSqlJsQueryExecResultArray;
begin
  asm
    @result = (@db).exec(@query);
  end;
end;

function TSqlJsDatabase.Exec(query: string; params: array of variant): TSqlJsQueryExecResultArray;
begin
  asm
    @result = (@db).exec(@query, @params);
  end;
end;

function TSqlJsDatabase.getRowModified(): integer;
begin
  asm
    @result = (@db).getRowModified();
  end;
end;

function TSqlJsDatabase.Export(): JUint8Array;
begin
  asm
    @result = (@db).export();
  end;
end;

procedure TSqlJsDatabase.handleError();
begin
  asm
    (@db).handleError();
  end;
end;

destructor TSqlJsDatabase.Free();
begin
  Close();
end;

//TSqlJsStatement

constructor TSqlJsStatement.Create(statement: variant);
begin
  inherited Create;

  stmt := statement;
end;

function TSqlJsStatement.getAsObject(): TObject;
begin
  asm
    @result = (@stmt).getAsObject();
  end;
end;

function TSqlJsStatement.getAsObject(params: variant): TObject;
begin
  asm
    @result = (@stmt).getAsObject(@params);
  end;
end;

function TSqlJsStatement.getAsObject(params: array of variant): TObject;
begin
  asm
    @result = (@stmt).getAsObject(@params);
  end;
end;

function TSqlJsStatement.Bind(values: variant): boolean;
begin
  asm
    @result = (@stmt).bind(@values);
  end;
end;

function TSqlJsStatement.Bind(values: array of variant): boolean;
begin
  asm
    @result = (@stmt).bind(@values);
  end;
end;

function TSqlJsStatement.FreeStatement(): boolean;
begin
  asm
    @result = (@stmt).free();
  end;
end;

function TSqlJsStatement.FreeMem(): boolean;
begin
  asm
    @result = (@stmt).freemem();
  end;
end;

function TSqlJsStatement.get(): TVariantArray;
begin
  asm
    @result =(@stmt).get();
  end;
end;

function TSqlJsStatement.get(params: variant): TVariantArray;
begin
  asm
    @result =(@stmt).get(@params);
  end;
end;

function TSqlJsStatement.get(params: array of variant): TVariantArray;
begin
  asm
    @result =(@stmt).get(@params);
  end;
end;

function TSqlJsStatement.getColumnNames(): array of string;
begin
  asm
    @result =(@stmt).getColumnNames();
  end;
end;

function TSqlJsStatement.getNormalizedSQL(): string;
begin
  asm
    @result =(@stmt).getNormalizedSQL();
  end;
end;

function TSqlJsStatement.getSQL(): string;
begin
  asm
    @result =(@stmt).getSQL();
  end;
end;

procedure TSqlJsStatement.reset();
begin
  asm
    (@stmt).reset();
  end;
end;

procedure TSqlJsStatement.Run();
begin
  asm
    (@stmt).run();
  end;
end;

procedure TSqlJsStatement.Run(values: variant);
begin
  asm
    (@stmt).run(@values);
  end;
end;

procedure TSqlJsStatement.Run(values: array of variant);
begin
  asm
    (@stmt).run(@values);
  end;
end;

function TSqlJsStatement.Step(): boolean;
begin
  asm
    @result =(@stmt).step();
  end;
end;


end.
