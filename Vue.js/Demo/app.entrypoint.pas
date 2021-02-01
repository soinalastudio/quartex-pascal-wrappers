unit app.entrypoint;

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

  tor.vuejs.wrapper,
                                   
  form1;

var
  vueapp: Variant;
                       
begin
  TQTXDOMApplicationFull.Create(nil, procedure (Widget: TQTXComponent)
  begin

     TVue.component('button-counter', class
      data = function(): Variant
      begin
       Result := class
          count = 0;
        end;
      end;

      template = '<button v-on:click="count++">You have clicked the button {{ count }} times.</button>'
    end);

    vueapp := new TVue(class
      el = '#app';
    end);

  end);
  
end.
