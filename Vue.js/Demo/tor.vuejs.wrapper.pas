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

unit tor.vuejs.wrapper;

interface

uses
  qtx.sysutils, qtx.classes, qtx.promises, qtx.dom.types;

type

  TVue = class;

  TVueErrorHandlerFunc  = function (err, vm, info: Variant): Variant;
  TVueWarnHandlerFunc   = function (msg, vm, trace: Variant): Variant;
  TVueStdFunc           = function(): Variant;

  TVueGlobalConfig = class
    class var availableOptions = [
      'silent',
      'optionMergeStrategies',
      'devtools',
      'errorHandler',
      'warnHandler',
      'ignoredElements',
      'keyCodes',
      'performance',
      'productionTip'
    ];

    class function get(optName: String): Variant;
    class procedure set(optName: String; Value: Variant);
  end;

  TVueComponentOptions = class external
    template: String = '';
    data: Variant = null;
  end;

  TVueSubclass = class external "Vue.extend"
    Constructor Create(componentOptions: Variant); overload;
    Constructor Create(componentOptions: TVueComponentOptions); overload;
  end;

  TVueDirectiveDefinition = class external
    bind:             TVueStdFunc;
    inserted:         TVueStdFunc;
    update:           TVueStdFunc;
    componentUpdated: TVueStdFunc;
    unbind:           TVueStdFunc;
  end;

  TVueCreateElementFunc = function (name: Variant; attr: Variant = null; children: Variant = null): Variant;
  TVueUnWatchProc       = procedure();
  TVueWatchFunc         = function(newValue, oldValue: Variant): Variant;

  TVueDefinition = class external
    el:         Variant;
    data:       Variant;
    props:      Variant;
    propsData:  Variant;
    computed:   Variant;
    &method:    Variant;
    watch:      Variant;
  end;

  TVue = class external "Vue"
    constructor Create(vueDefinition: Variant = null);

    data: Variant; external "$data";
    props: Variant; external "$props";
    options: Variant; external "$options";
    parent: Variant; external "$parent";
    root: Variant; external "$root";
    children: Variant; external "$children";
    slots: Variant; external "$slots";
    scopedSlots: Variant; external "$scopedSlots";
    refs: Variant; external "$ref";
    isServer: Boolean; external "$isServer";
    attrs: array [String] of Variant; external "$attrs";
    listeners: Variant; external "$listeners";

    el: JElement; external "$el";
    vnode: Variant; external "$vnode";
    createElement: TVueCreateElementFunc; external "$createElement";

    function watch(expOrFn: Variant; watchFunc: Variant; options: Variant = null): TVueUnWatchProc; external "$watch";
    function set(target, propertyNameOrIndex, value: Variant): Variant; external "$set";
    function delete(target, propertyNameOrIndex: Variant): TVue; external "$delete";

    procedure on(event: Variant; callback: Variant); external "$on";
    procedure once(event: Variant; callback: Variant); external "$once";
    procedure off(event: Variant; callback: Variant); external "$off";
    procedure emit(event: Variant; const args: array of const); external "$emit";

    procedure mount(elementOrSelector: Variant = null; hydrating: Boolean = false); external "$mount";
    procedure forceUpdate(); external "$forceUpdate";
    class function nextTick(CB: TStdCallBack; context: Variant = null): Variant; overload;
    class function nextTick(context: Variant = null): JPromise; overload;
    procedure destroy(); external "$destroy";

    class function component(id: String; definition: Variant = null): TVue;
  end;

  TVueHTML = class

  end;

  function  VueNextTick(CB: TStdCallBack; context: Variant = null): Variant; external "Vue.nextTick";
  function  VueNextTickAsPromise(context: Variant = null): JPromise; external "Vue.nextTick";
  function  VueSet(target, propertyNameOrIndex, value: Variant): Variant; external "Vue.set";
  procedure VueDelete(target, propertyNameOrIndex: Variant); external "Vue.delete";
  function  VueDirective(id: String; directiveDefinition: Variant = null): Variant; external "Vue.directive";
  function  VueFilter(id: String; defintionFunc: Variant = null): Variant; external "Vue.filter";
  procedure VueUse(plugin: Variant); external "Vue.use";
  procedure VueMixin(mixin: Variant); external "Vue.mixin";
  function  VueCompile(template: String): Variant; external "Vue.compile";
  function  VueObservable(obj: Variant): Variant; external "Vue.observable";

var
    VueVersion: String;


const
    VueJSWrapperVersion = '0.1';

implementation

class procedure TVueGlobalConfig.set(optName: String; value: Variant);
begin
  if (optName in TVueGlobalConfig.availableOptions) then begin
    asm
       Vue.config[@optName] = @value;
    end;
  end;
end;

class function TVueGlobalConfig.get(optName: String): Variant;
begin
  if (optName in TVueGlobalConfig.availableOptions) then begin
    asm
       @Result = Vue.config[@optName];
    end;
  end else
    Result := null;
end;

initialization
   asm
      @VueVersion = Vue.version;
   end;

end.
