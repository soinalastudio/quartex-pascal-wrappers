var $R = [
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
function SetLength(s,n) { if (s._.length>n) s._=s._.substring(0,n);else while (s._.length<n) s._+=" "; }
function RightStr(s,n) { return s.substr(s.length-n) }
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
	$Init: function (s) { FMessage="" },
	Create: function (s,Msg) { s.FMessage=Msg; return s }
}
function Delete(s,i,n) { var v=s._; if ((i<=0)||(i>v.length)||(n<=0)) return; s._=v.substr(0,i-1)+v.substr(i+n-1); }
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
}function $SetIn(s,v,m,n) { v-=m; return (v<0 && v>=n)?false:(s[v>>5]&(1<<(v&31)))!=0 }
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
   ,ExamineType:function(Value$1) {
      var Result = 1;
      if (Value$1) {
         {var $temp2 = (typeof(Value$1)).toLocaleLowerCase();
            if ($temp2=="object") {
               Result = (Value$1.hasOwnProperty("length"))?9:8;
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
               Result = (!(~(Value$1 % 1)))?4:3;
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
   ,Destroy:TObject.Destroy
};
/// TValuePrefixType enumeration
///  [line: 615, column: 3, file: qtx.sysutils]
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
      var Result = {_:0};
      try {
         if (!(TString.ExamineBinary(BinStr,Result))) {
            throw EException.CreateFmt($New(EConvertBinaryStringInvalid),"Failed to convert binary string (%s)",[BinStr]);
         }
      } finally {return Result._}
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
      var Result = {_:""};
      try {
         var LCodec = null;
         LCodec = TDataTypeConverter.Create$6$($New(TQTXCodecUTF8));
         try {
            Result._ = TQTXCodecUTF8.Decode(LCodec,BytesToDecode);
         } finally {
            TObject.Free(LCodec);
         }
      } finally {return Result._}
   }
   /// function TString.EncodeUTF8(TextToEncode: String) : TUInt8Array
   ///  [line: 3087, column: 24, file: qtx.sysutils]
   ,EncodeUTF8:function(TextToEncode) {
      var Result = {_:[]};
      try {
         var LCodec = null;
         LCodec = TDataTypeConverter.Create$6$($New(TQTXCodecUTF8));
         try {
            Result._ = TQTXCodecUTF8.Encode(LCodec,TextToEncode);
         } finally {
            TObject.Free(LCodec);
         }
      } finally {return Result._}
   }
   /// function TString.ExamineBinary(Text: String; var value: longword) : Boolean
   ///  [line: 1160, column: 24, file: qtx.sysutils]
   ,ExamineBinary:function(Text$2, value$2) {
      var Result = false;
      var BitIndex = 0,
         x$5 = 0;
      value$2._ = TDataTypeConverter.InitUint32(0);
      if ((Text$2.charAt(0)=="%")) {
         Text$2 = (Text$2).substring(1);
      } else if ((Text$2.substr(0,2)=="0b")) {
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
   ,Examineint32:function(Text$2, Value$1) {
      var Result = false;
      var TextLen = 0,
         Prefix = {_:0};
      Text$2 = Trim$_String_(Text$2);
      TextLen = Text$2.length;
      if (TextLen > 0) {
         Prefix._ = 0;
         if (TString.ExamineTypePrefix(Text$2,Prefix)) {
            switch (Prefix._) {
               case 1 :
                  --TextLen;
                  Text$2 = RightStr(Text$2,TextLen);
                  Result = TString.ValidHexChars(Text$2);
                  if (Result) {
                     Value$1._ = parseInt("0x" + Text$2,16);
                  }
                  break;
               case 2 :
                  (TextLen-= 2);
                  Text$2 = RightStr(Text$2,TextLen);
                  Result = TString.ValidHexChars(Text$2);
                  if (Result) {
                     Value$1._ = parseInt("0x" + Text$2,16);
                  }
                  break;
               case 3 :
                  --TextLen;
                  Text$2 = RightStr(Text$2,TextLen);
                  Result = TString.ValidBinChars(Text$2);
                  if (Result) {
                     Value$1._ = TString.BinaryStrToInt(Text$2);
                  }
                  break;
               case 4 :
                  (TextLen-= 2);
                  Text$2 = RightStr(Text$2,TextLen);
                  Result = TString.ValidBinChars(Text$2);
                  if (Result) {
                     Value$1._ = TString.BinaryStrToInt(Text$2);
                  }
                  break;
               case 5 :
                  return Result;
                  break;
               default :
                  Result = TString.ValidDecChars(Text$2);
                  if (Result) {
                     Value$1._ = parseInt(Text$2,10);
                  }
            }
         } else {
            Result = TString.ValidDecChars(Text$2);
            if (Result) {
               Value$1._ = parseInt(Text$2,10);
            }
         }
      }
      return Result
   }
   /// function TString.ExamineTypePrefix(const Text: String; var Prefix: TValuePrefixType) : Boolean
   ///  [line: 1021, column: 24, file: qtx.sysutils]
   ,ExamineTypePrefix:function(Text$2, Prefix) {
      var Result = false;
      Prefix._ = 0;
      if (Text$2.length > 0) {
         if ((Text$2.charAt(0)=="$")) {
            Prefix._ = 1;
         } else if ((Text$2.substr(0,2)=="0x")) {
            Prefix._ = 2;
         } else if ((Text$2.charAt(0)=="%")) {
            Prefix._ = 3;
         } else if ((Text$2.substr(0,2)=="0b")) {
            Prefix._ = 4;
         } else if ((Text$2.charAt(0)=="\"")) {
            Prefix._ = 5;
         }
         Result = (Prefix._!=0);
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
function TryStrToInt(Data, Value$1) {
   return TString.Examineint32(Data,Value$1);
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
            Result = Primary-Secondary;
         } else {
            Result = Secondary-Primary;
         }
         if (Result < 0) {
            Result = (Result-1)^(-1);
         }
      } else {
         Result = 0;
      }
      return Result
   }
   /// function TInt32.EnsureRange(Value: int32; Lowest: int32; Highest: int32) : int32
   ///  [line: 1908, column: 23, file: qtx.sysutils]
   ,EnsureRange:function(Value$1, Lowest, Highest) {
      return (Value$1 < Lowest)?Lowest:(Value$1 > Highest)?Highest:Value$1;
   }
   /// function TInt32.IsNaN(Value: int32) : Boolean
   ///  [line: 1794, column: 23, file: qtx.sysutils]
   ,IsNaN$1:function(Value$1) {
      var Result = false;
      Result = Number.isNaN(Value$1);
      return Result
   }
   /// procedure TInt32.SetBit(index: int32; Value: Boolean; var buffer: int32)
   ///  [line: 1801, column: 24, file: qtx.sysutils]
   ,SetBit:function(index, Value$1, buffer$1) {
      if (index >= 0 && index <= 31) {
         if (Value$1) {
            buffer$1._ = buffer$1._|(1<<index);
         } else {
            buffer$1._ = buffer$1._&(~(1<<index));
         }
      } else {
         throw Exception.Create($New(EException),$R[15]);
      }
   }
   /// function TInt32.SubtractSmallest(First: int32; Second: int32) : int32
   ///  [line: 1880, column: 23, file: qtx.sysutils]
   ,SubtractSmallest:function(First, Second) {
      var Result = 0;
      if (First < Second) {
         Result = Second-First;
      } else {
         Result = First-Second;
      }
      return Result
   }
   /// function TInt32.ToPxStr(Value: int32) : String
   ///  [line: 1846, column: 23, file: qtx.sysutils]
   ,ToPxStr:function(Value$1) {
      return Value$1.toString() + "px";
   }
   /// function TInt32.WrapRange(Value: int32; LowRange: int32; HighRange: int32) : int32
   ///  [line: 1922, column: 23, file: qtx.sysutils]
   ,WrapRange:function(Value$1, LowRange, HighRange) {
      var Result = 0;
      if (Value$1 > HighRange) {
         Result = LowRange+TInt32.Diff(HighRange,Value$1-1);
         if (Result > HighRange) {
            Result = TInt32.WrapRange(Result,LowRange,HighRange);
         }
      } else if (Value$1 < LowRange) {
         Result = HighRange-TInt32.Diff(LowRange,Value$1+1);
         if (Result < LowRange) {
            Result = TInt32.WrapRange(Result,LowRange,HighRange);
         }
      } else {
         Result = Value$1;
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
   /// function TDateUtils.ToJsDate(const Value: TDateTime) : JDate
   ///  [line: 2996, column: 28, file: qtx.sysutils]
   ,ToJsDate:function(Self, Value$1) {
      var Result = null;
      Result = new Date();
      Result.setTime(Math.round((Value$1-25569) * 86400000));
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
   ,BooleanToBytes:function(Value$1) {
      var Result = [];
      Result.push((Value$1)?1:0);
      return Result
   }
   /// function TDataTypeConverter.BytesToBoolean(const Data: TUInt8Array) : Boolean
   ///  [line: 2673, column: 29, file: qtx.sysutils]
   ,BytesToBoolean:function(Self, Data) {
      return Data[0] > 0;
   }
   /// function TDataTypeConverter.BytesToFloat32(const Data: TUInt8Array) : Float
   ///  [line: 2630, column: 29, file: qtx.sysutils]
   ,BytesToFloat32:function(Self, Data) {
      var Result = 0;
      Self.FView.setUint8(0,Data[0]);
      Self.FView.setUint8(1,Data[1]);
      Self.FView.setUint8(2,Data[2]);
      Self.FView.setUint8(3,Data[3]);
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
   ,BytesToFloat64:function(Self, Data) {
      var Result = 0;
      Self.FView.setUint8(0,Data[0]);
      Self.FView.setUint8(1,Data[1]);
      Self.FView.setUint8(2,Data[2]);
      Self.FView.setUint8(3,Data[3]);
      Self.FView.setUint8(4,Data[4]);
      Self.FView.setUint8(5,Data[5]);
      Self.FView.setUint8(6,Data[6]);
      Self.FView.setUint8(7,Data[7]);
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
   ,BytesToInt16:function(Self, Data) {
      var Result = 0;
      Self.FView.setUint8(0,Data[0]);
      Self.FView.setUint8(1,Data[1]);
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
   ,BytesToInt32:function(Self, Data) {
      var Result = 0;
      Self.FView.setUint8(0,Data[0]);
      Self.FView.setUint8(1,Data[1]);
      Self.FView.setUint8(2,Data[2]);
      Self.FView.setUint8(3,Data[3]);
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
   ,BytesToString:function(Self, Data) {
      var Result = "";
      var LTemp = null,
         Codec__ = null;
      if (Data.length > 0) {
         LTemp = new Uint8Array(Data.length);
         (LTemp).set(Data, 0);
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
   ,BytesToUInt16:function(Self, Data) {
      var Result = 0;
      Self.FView.setUint8(0,Data[0]);
      Self.FView.setUint8(1,Data[1]);
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
   ,BytesToUInt32:function(Self, Data) {
      var Result = 0;
      Self.FView.setUint8(0,Data[0]);
      Self.FView.setUint8(1,Data[1]);
      Self.FView.setUint8(2,Data[2]);
      Self.FView.setUint8(3,Data[3]);
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
   ,BytesToVariant:function(Self, Data) {
      var Result = undefined;
      var LType$1 = 0;
      LType$1 = Data[0];
      Data.shift();
      switch (LType$1) {
         case 17 :
            Result = TDataTypeConverter.BytesToBoolean(Self,Data);
            break;
         case 18 :
            Result = Data[0];
            break;
         case 24 :
            Result = TDataTypeConverter.BytesToUInt16(Self,Data);
            break;
         case 25 :
            Result = TDataTypeConverter.BytesToUInt32(Self,Data);
            break;
         case 19 :
            Result = TDataTypeConverter.BytesToInt16(Self,Data);
            break;
         case 20 :
            Result = TDataTypeConverter.BytesToInt32(Self,Data);
            break;
         case 21 :
            Result = TDataTypeConverter.BytesToFloat32(Self,Data);
            break;
         case 22 :
            Result = TDataTypeConverter.BytesToFloat64(Self,Data);
            break;
         case 23 :
            Result = TString.DecodeUTF8(Data);
            break;
         default :
            throw EException.CreateFmt($New(EConvertError),$R[16],[IntToHex2(LType$1)]);
      }
      return Result
   }
   /// function TDataTypeConverter.ByteToChar(const Value: byte) : char
   ///  [line: 2691, column: 35, file: qtx.sysutils]
   ,ByteToChar:function(Value$1) {
      var Result = "";
      Result = String.fromCharCode(Value$1);
      return Result
   }
   /// function TDataTypeConverter.CharToByte(const Value: char) : word
   ///  [line: 2487, column: 35, file: qtx.sysutils]
   ,CharToByte:function(Value$1) {
      var Result = 0;
      Result = (Value$1).charCodeAt(0);
      return Result
   }
   /// constructor TDataTypeConverter.Create()
   ///  [line: 2042, column: 32, file: qtx.sysutils]
   ,Create$6:function(Self) {
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
   ,Float32ToBytes:function(Self, Value$1) {
      var Result = [];
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setFloat32(0,Value$1);
            break;
         case 1 :
            Self.FView.setFloat32(0,Value$1,true);
            break;
         case 2 :
            Self.FView.setFloat32(0,Value$1,false);
            break;
      }
      Result = Array.prototype.slice.call( Self.FTyped, 0, 4 );
      return Result
   }
   /// function TDataTypeConverter.Float64ToBytes(const Value: float64) : TUInt8Array
   ///  [line: 2310, column: 29, file: qtx.sysutils]
   ,Float64ToBytes:function(Self, Value$1) {
      var Result = [];
      var LTypeSize = 0;
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setFloat64(0,Number(Value$1));
            break;
         case 1 :
            Self.FView.setFloat64(0,Number(Value$1),true);
            break;
         case 2 :
            Self.FView.setFloat64(0,Number(Value$1),false);
            break;
      }
      LTypeSize = __SIZES[9];
      --LTypeSize;
      Result = Array.prototype.slice.call( Self.FTyped, 0, LTypeSize );
      return Result
   }
   /// function TDataTypeConverter.InitInt08(const Value: int8) : int8
   ///  [line: 2153, column: 35, file: qtx.sysutils]
   ,InitInt08:function(Value$1) {
      var Result = 0;
      var temp = null;
      temp = new Int8Array(1);
      temp[0]=((Value$1 < -128)?-128:(Value$1 > 127)?127:Value$1);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.InitInt16(const Value: int16) : int16
   ///  [line: 2146, column: 35, file: qtx.sysutils]
   ,InitInt16:function(Value$1) {
      var Result = 0;
      var temp = null;
      temp = new Int16Array(1);
      temp[0]=((Value$1 < -32768)?-32768:(Value$1 > 32767)?32767:Value$1);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.InitInt32(const Value: int32) : int32
   ///  [line: 2139, column: 35, file: qtx.sysutils]
   ,InitInt32:function(Value$1) {
      var Result = 0;
      var temp = null;
      temp = new Int32Array(1);
      temp[0]=((Value$1 < -2147483648)?-2147483648:(Value$1 > 2147483647)?2147483647:Value$1);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.InitUint08(const Value: uint8) : uint8
   ///  [line: 2174, column: 35, file: qtx.sysutils]
   ,InitUint08:function(Value$1) {
      var Result = 0;
      var LTemp = null;
      LTemp = new Uint8Array(1);
      LTemp[0]=((Value$1 < 0)?0:(Value$1 > 255)?255:Value$1);
      Result = LTemp[0];
      return Result
   }
   /// function TDataTypeConverter.InitUint16(const Value: uint16) : uint16
   ///  [line: 2167, column: 35, file: qtx.sysutils]
   ,InitUint16:function(Value$1) {
      var Result = 0;
      var temp = null;
      temp = new Uint16Array(1);
      temp[0]=((Value$1 < 0)?0:(Value$1 > 65536)?65536:Value$1);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.InitUint32(const Value: uint32) : uint32
   ///  [line: 2160, column: 35, file: qtx.sysutils]
   ,InitUint32:function(Value$1) {
      var Result = 0;
      var temp = null;
      temp = new Uint32Array(1);
      temp[0]=((Value$1 < 0)?0:(Value$1 > 4294967295)?4294967295:Value$1);
      Result = temp[0];
      return Result
   }
   /// function TDataTypeConverter.Int16ToBytes(const Value: int16) : TUInt8Array
   ///  [line: 2644, column: 29, file: qtx.sysutils]
   ,Int16ToBytes:function(Self, Value$1) {
      var Result = [];
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setInt16(0,Value$1);
            break;
         case 1 :
            Self.FView.setInt16(0,Value$1,true);
            break;
         case 2 :
            Self.FView.setInt16(0,Value$1,false);
            break;
      }
      Result = Array.prototype.slice.call( Self.FTyped, 0, 2 );
      return Result
   }
   /// function TDataTypeConverter.Int32ToBytes(const Value: int32) : TUInt8Array
   ///  [line: 2255, column: 29, file: qtx.sysutils]
   ,Int32ToBytes:function(Self, Value$1) {
      var Result = [];
      var LTypeSize = 0;
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setInt32(0,Value$1);
            break;
         case 1 :
            Self.FView.setInt32(0,Value$1,true);
            break;
         case 2 :
            Self.FView.setInt32(0,Value$1,false);
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
   ,StringToBytes:function(Self, Value$1) {
      var Result = [];
      var Codec__ = null,
         rw = null;
      if (Value$1.length > 0) {
         Codec__ = new TextEncoder("utf8");
         rw = Codec__.encode(Value$1);
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
   ,TypedArrayToBytes:function(Value$1) {
      var Result = [];
      if (Value$1) {
         Result = Array.prototype.slice.call(Value$1);
      } else {
         throw Exception.Create($New(EConvertError),"Failed to convert, handle is nil or unassigned error");
      }
      return Result
   }
   /// function TDataTypeConverter.UInt16ToBytes(const Value: uint16) : TUInt8Array
   ///  [line: 2656, column: 29, file: qtx.sysutils]
   ,UInt16ToBytes:function(Self, Value$1) {
      var Result = [];
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setUint16(0,Value$1);
            break;
         case 1 :
            Self.FView.setUint16(0,Value$1,true);
            break;
         case 2 :
            Self.FView.setUint16(0,Value$1,false);
            break;
      }
      Result = Array.prototype.slice.call( Self.FTyped, 0, 2 );
      return Result
   }
   /// function TDataTypeConverter.UInt32ToBytes(const Value: uint32) : TUInt8Array
   ///  [line: 2270, column: 29, file: qtx.sysutils]
   ,UInt32ToBytes:function(Self, Value$1) {
      var Result = [];
      var LTypeSize = 0;
      switch (Self.FEndian) {
         case 0 :
            Self.FView.setUint32(0,Value$1);
            break;
         case 1 :
            Self.FView.setUint32(0,Value$1,true);
            break;
         case 2 :
            Self.FView.setUint32(0,Value$1,false);
            break;
      }
      LTypeSize = __SIZES[5];
      Result = Array.prototype.slice.call( Self.FTyped, 0, LTypeSize );
      return Result
   }
   /// function TDataTypeConverter.VariantToBytes(const Value: Variant) : TUInt8Array
   ///  [line: 2551, column: 29, file: qtx.sysutils]
   ,VariantToBytes:function(Self, Value$1) {
      var Result = [];
      var LType$1 = 0;
      function GetUnSignedIntType() {
         var Result = 0;
         if (Value$1 <= 255) {
            return 18;
         }
         if (Value$1 <= 65536) {
            return 24;
         }
         if (Value$1 <= 2147483647) {
            Result = 25;
         }
         return Result
      };
      function GetSignedIntType() {
         var Result = 0;
         if (Value$1 > -32768) {
            return 19;
         }
         if (Value$1 > -2147483648) {
            Result = 20;
         }
         return Result
      };
      function IsFloat32(x$5) {
         var Result = false;
         Result = isFinite(x$5) && x$5 == Math.fround(x$5);
         return Result
      };
      switch (TVariant.ExamineType(Value$1)) {
         case 2 :
            Result = [17];
            Result.pusha(TDataTypeConverter.BooleanToBytes($VarToBool(Value$1)));
            break;
         case 3 :
            if (Value$1 < 0) {
               LType$1 = GetSignedIntType();
            } else {
               LType$1 = GetUnSignedIntType();
            }
            if (LType$1) {
               Result = [LType$1];
               switch (LType$1) {
                  case 18 :
                     Result.push(TDataTypeConverter.InitInt08($VarToInt(Value$1,"")));
                     break;
                  case 24 :
                     Result.pusha(TDataTypeConverter.UInt16ToBytes(Self,TDataTypeConverter.InitUint16($VarToInt(Value$1,""))));
                     break;
                  case 25 :
                     Result.pusha(TDataTypeConverter.UInt32ToBytes(Self,TDataTypeConverter.InitUint32($VarToInt(Value$1,""))));
                     break;
                  case 19 :
                     Result.pusha(TDataTypeConverter.Int16ToBytes(Self,TDataTypeConverter.InitInt16($VarToInt(Value$1,""))));
                     break;
                  case 20 :
                     Result.pusha(TDataTypeConverter.Int32ToBytes(Self,TDataTypeConverter.InitInt32($VarToInt(Value$1,""))));
                     break;
               }
            } else {
               throw Exception.Create($New(EConvertError),$R[17]);
            }
            break;
         case 4 :
            if (IsFloat32(Value$1)) {
               Result = [21];
               Result.pusha(TDataTypeConverter.Float32ToBytes(Self,Number(Value$1)));
            } else {
               Result = [22];
               Result.pusha(TDataTypeConverter.Float64ToBytes(Self,Number(Value$1)));
            }
            break;
         case 5 :
            Result = [23];
            Result.pusha(TString.EncodeUTF8(String(Value$1)));
            break;
         default :
            throw Exception.Create($New(EConvertError),$R[18]);
      }
      return Result
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$6$:function($){return $.ClassType.Create$6($)}
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
///  [line: 409, column: 3, file: qtx.sysutils]
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
   ,Create$34:function(Self) {
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
   ,Create$35:function(Self, AOwner) {
      TQTXErrorObject.Create$34(Self);
      TQTXOwnedObject.SetOwner(Self,AOwner);
      return Self
   }
   ,Destroy:TObject.Destroy
   ,Create$35$:function($){return $.ClassType.Create$35.apply($.ClassType, arguments)}
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
      $.FHandle$1 = undefined;
      $.FName = "";
   }
   /// constructor TQTXComponent.Create(AOwner: TQTXComponent; CB: TQTXComponentConstructor)
   ///  [line: 408, column: 27, file: qtx.classes]
   ,Create$37:function(Self, AOwner, CB) {
      TQTXOwnedObject.Create$35(Self,AOwner);
      TQTXComponent.SetName$1(Self,TQTXComponent.GetInstanceName$(Self));
      if (CB) {
         CB(Self);
      }
      return Self
   }
   /// function TQTXComponent.GetHandle() : THandle
   ///  [line: 426, column: 24, file: qtx.classes]
   ,GetHandle:function(Self) {
      return Self.FHandle$1;
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
   ,SetHandle:function(Self, Value$1) {
      Self.FHandle$1 = Value$1;
   }
   /// procedure TQTXComponent.SetName(Value: String)
   ///  [line: 441, column: 25, file: qtx.classes]
   ,SetName$1:function(Self, Value$1) {
      Self.FName = Value$1;
   }
   /// procedure TQTXComponent.SetOwner(NewOwner: TQTXComponent)
   ///  [line: 416, column: 25, file: qtx.classes]
   ,SetOwner$1:function(Self, NewOwner) {
      TQTXOwnedObject.SetOwner(Self,NewOwner);
   }
   ,Destroy:TObject.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37$:function($){return $.ClassType.Create$37.apply($.ClassType, arguments)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetInstanceName$:function($){return $.ClassType.GetInstanceName($)}
   ,SetOwner$1$:function($){return $.ClassType.SetOwner$1.apply($.ClassType, arguments)}
};
TQTXComponent.$Intf={
   IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// EQTXOwnedObject = class (EQTXException)
///  [line: 34, column: 3, file: qtx.classes]
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
   ,a$15:function(Self) {
      var Result = 0;
      Result = (Self.FBuffer$1 !== null)?Self.FBuffer$1.byteLength:0;
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 65, column: 38, file: qtx.memory]
   ,a$14:function(Self) {
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
      BytesToAllocate = { _ : BytesToAllocate };
      if (Self.FBuffer$1 !== null) {
         TManagedMemory.Release(Self);
      }
      if (BytesToAllocate._ > 0) {
         TManagedMemory.BeforeAllocate(Self,BytesToAllocate);
         try {
            Self.FBuffer$1 = new ArrayBuffer(BytesToAllocate._);
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
   ,Append:function(Self, Data) {
      var lOffset = 0;
      if (Data.length > 0) {
         lOffset = (Self.FBuffer$1 !== null)?TManagedMemory.a$15(Self):0;
         TManagedMemory.Grow(Self,Data.length);
         TManagedMemory.WriteBuffer(Self,lOffset,Data);
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
         TManagedMemory.Allocate(Self,TManagedMemory.a$15(Self)+BytesToGrow);
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
      if (Offset$2 < 0 || Offset$2 >= TManagedMemory.a$15(Self)) {
         throw Exception.Create($New(EManagedMemory),"Invalid offset, expected 0.." + (TManagedMemory.a$15(Self)-1).toString() + " not " + Offset$2.toString() + " error");
      }
      LTemp = Self.FArray.subarray(Offset$2,Offset$2+ReadLen);
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
         if (NewSize != TManagedMemory.a$15(Self)) {
            if (NewSize > TManagedMemory.a$15(Self)) {
               TManagedMemory.Grow(Self,NewSize-TManagedMemory.a$15(Self));
            } else {
               TManagedMemory.Shrink(Self,TManagedMemory.a$15(Self)-NewSize);
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
         LNewSize = TManagedMemory.a$15(Self)-BytesToShrink;
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
   ,WriteBuffer:function(Self, Offset$2, Data) {
      if (Self.FBuffer$1 === null) {
         throw Exception.Create($New(EManagedMemory),"Write failed, buffer is empty error");
      }
      if (Data.length < 1) {
         return;
      }
      if (Offset$2 < 0 || Offset$2 >= TManagedMemory.a$15(Self)) {
         throw Exception.Create($New(EManagedMemory),"Invalid offset, expected 0.." + (TManagedMemory.a$15(Self)-1).toString() + " not " + Offset$2.toString() + " error");
      }
      Self.FArray.set(Data,Offset$2);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$6:TDataTypeConverter.Create$6
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
///  [line: 33, column: 3, file: qtx.time]
var TQTXRepeatResult = { 241:"rrContinue", 242:"rrStop", 243:"rrDispose" };
/// TQTXCustomRepeater = class (TObject)
///  [line: 49, column: 3, file: qtx.time]
var TQTXCustomRepeater = {
   $ClassName:"TQTXCustomRepeater",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FActive = false;
      $.FDelay = 0;
      $.FHandle$2 = undefined;
   }
   /// procedure TQTXCustomRepeater.AllocTimer()
   ///  [line: 287, column: 30, file: qtx.time]
   ,AllocTimer:function(Self) {
      if (Self.FHandle$2) {
         TQTXCustomRepeater.FreeTimer(Self);
      }
      Self.FHandle$2 = TQTXDispatch.SetInterval(TQTXDispatch,$Event0(Self,TQTXCustomRepeater.CBExecute$),Self.FDelay);
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
      if (Self.FHandle$2) {
         TQTXDispatch.ClearInterval(TQTXDispatch,Self.FHandle$2);
         Self.FHandle$2 = undefined;
      }
   }
   /// procedure TQTXCustomRepeater.SetActive(Value: Boolean)
   ///  [line: 258, column: 30, file: qtx.time]
   ,SetActive:function(Self, Value$1) {
      if (Value$1 != Self.FActive) {
         try {
            if (Self.FActive) {
               TQTXCustomRepeater.FreeTimer(Self);
            } else {
               TQTXCustomRepeater.AllocTimer(Self);
            }
         } finally {
            Self.FActive = Value$1;
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
         a$430 = 0,
         el$2 = null;
      lScore = 0;
      var $temp6;
      for(a$430=0,$temp6=Controls$1.length;a$430<$temp6;a$430++) {
         el$2 = Controls$1[a$430];
         if (el$2) {
            if (TVariant.ClassInstance(el$2)) {
               if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(el$2))) {
                  try {
                     if (TQTXWidget.QueryReadyState(el$2)) {
                        ++lScore;
                     } else {
                        break;
                     }
                  } catch ($e) {
                     var e$1 = $W($e);
                     WriteLn("Non class instance, removed");
                     $Remove(Controls$1,el$2,0);
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
         a$431 = 0,
         el$2 = null;
      lScore = 0;
      var $temp7;
      for(a$431=0,$temp7=controls.length;a$431<$temp7;a$431++) {
         el$2 = controls[a$431];
         if (el$2) {
            if (TVariant.ClassInstance(el$2)) {
               if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(el$2))) {
                  if (TQTXBrowser.GetElementReady(TQTXBrowser,TQTXComponent.GetHandle$(el$2),true)) {
                     if (TQTXWidget.QueryReadyState(el$2)) {
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
                  TQTXDispatch.RepeatExecute(Self,CB,Count$2-1,Delay$1);
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
      Result = new Date().getTime() * 1000+621355968000000000;
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
      Result = temp.getTime() * 1000+621355968000000000;
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
   ,GetInstanceFor:function(Self, Value$1) {
      var Result = null;
      if (Value$1) {
         if (_ElementLUT.hasOwnProperty(Value$1.id)) {
            Result = $As(TVariant.AsObject(_ElementLUT[Value$1.id]),TQTXWidget);
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
   ,RegisterElement:function(Self, Value$1, Obj) {
      if ((!_ElementLUT)) {
         _ElementLUT = TVariant.CreateObject();
      }
      _ElementLUT[Value$1.id] = Obj;
   }
   /// procedure TQTXWidgetRegistry.UnRegisterElement(Value: TWidgetHandle)
   ///  [line: 2865, column: 36, file: qtx.dom.widgets]
   ,UnRegisterElement:function(Self, Value$1) {
      if ((!_ElementLUT)) {
         _ElementLUT = TVariant.CreateObject();
      }
      delete _ElementLUT[(Value$1).id];
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
   ,Destroy:TObject.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
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
   ,Create$35:function(Self, AOwner) {
      TQTXOwnedObject.Create$35(Self,AOwner);
      Self.FSize = TQTXSize.Create$84($New(TQTXSize),TQTXCustomFont.GetOwnerHandle$(Self),"font-size",3);
      Self.FSize.OnChange = function (Sender) {
         if (Self.OnChange) {
            Self.OnChange(Self);
         }
      };
      return Self
   }
   ,Destroy:TObject.Destroy
   ,Create$35$:function($){return $.ClassType.Create$35.apply($.ClassType, arguments)}
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
         a$432 = 0,
         el$2 = "";
      if (TQTXComponent.GetHandle$(Self)) {
         lScore = Values$6.length;
         var $temp8;
         for(a$432=0,$temp8=Values$6.length;a$432<$temp8;a$432++) {
            el$2 = Values$6[a$432];
            if (TQTXComponent.GetHandle$(Self).hasAttribute(el$2)) {
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
   ,AttributeWrite:function(Self, Id, Value$1) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).setAttribute(Id,Value$1);
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
         a$433 = 0,
         el$2 = "";
      if (TQTXComponent.GetHandle$(Self)) {
         lScore = Values$6.length;
         var $temp9;
         for(a$433=0,$temp9=Values$6.length;a$433<$temp9;a$433++) {
            el$2 = Values$6[a$433];
            if (TQTXComponent.GetHandle$(Self).hasOwnProperty(el$2)) {
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
   ,PropertyExists$1:function(Self, Id) {
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
   ,PropertyRead$1:function(Self, Id) {
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
   ,PropertyWrite$1:function(Self, Id, Value$1) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self)[Id] = Value$1;
      } else {
         throw Exception.Create($New(EQTXPropertiesHandle),"Invalid widget handle error");
      }
   }
   /// procedure TQTXDOMComponent.SetEnabled(Value: Boolean)
   ///  [line: 1640, column: 28, file: qtx.dom.types]
   ,SetEnabled:function(Self, Value$1) {
      if (Value$1 != TQTXDOMComponent.GetEnabled$(Self)) {
         if (Value$1) {
            TQTXDOMComponent.AttributeRemove(Self,"disabled");
         } else {
            TQTXDOMComponent.AttributeWrite(Self,"disabled","true");
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXComponent.GetInstanceName
   ,SetOwner$1:TQTXComponent.SetOwner$1
   ,GetEnabled$:function($){return $.ClassType.GetEnabled($)}
   ,SetEnabled$:function($){return $.ClassType.SetEnabled.apply($.ClassType, arguments)}
};
TQTXDOMComponent.$Intf={
   IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,a$40:function(Self) {
      var Result = null;
      Result = $AsIntf(Self,"IQTXWidgetCssClasses");
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 861, column: 65, file: qtx.dom.widgets]
   ,a$35:function(Self, Value$1) {
      TQTXComponent.GetHandle$(Self).innerHTML = Value$1;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 861, column: 40, file: qtx.dom.widgets]
   ,a$34:function(Self) {
      var Result = "";
      Result = String(TQTXComponent.GetHandle$(Self).innerHTML);
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 860, column: 40, file: qtx.dom.widgets]
   ,a$33:function(Self) {
      var Result = null;
      Result = TQTXComponent.GetHandle$(Self).style;
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 834, column: 43, file: qtx.dom.widgets]
   ,a$31:function(Self) {
      var Result = null;
      Result = TQTXComponent.GetOwner$1(Self);
      return Result
   }
   /// procedure TQTXWidget.ApplyPropertyCache()
   ///  [line: 2114, column: 22, file: qtx.dom.widgets]
   ,ApplyPropertyCache:function(Self) {
      if (Self.FLeft != -1) {
         TQTXWidget.a$33(Self).left = TInt32.ToPxStr(Self.FLeft);
      }
      if (Self.FTop != -1) {
         TQTXWidget.a$33(Self).top = TInt32.ToPxStr(Self.FTop);
      }
      if (Self.FWidth > -1) {
         TQTXWidget.a$33(Self).width = TInt32.ToPxStr(Self.FWidth);
      }
      if (Self.FHeight > -1) {
         TQTXWidget.a$33(Self).height = TInt32.ToPxStr(Self.FHeight);
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
      var a$434 = 0,
         el$2 = "";
      if (TQTXComponent.GetHandle$(Self)) {
         var $temp10;
         for(a$434=0,$temp10=CssClassNames.length;a$434<$temp10;a$434++) {
            el$2 = CssClassNames[a$434];
            TQTXComponent.GetHandle$(Self).classList.add(el$2);
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
   ,ClassListSet:function(Self, Value$1) {
      TQTXDOMComponent.AttributeWrite(Self,"class",Value$1);
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
      var a$435 = 0,
         el$2 = "";
      if (TQTXComponent.GetHandle$(Self)) {
         var $temp11;
         for(a$435=0,$temp11=CssClassNames.length;a$435<$temp11;a$435++) {
            el$2 = CssClassNames[a$435];
            TQTXComponent.GetHandle$(Self).remove.add(el$2);
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
   ,Create$40:function(Self, AOwner, CB) {
      TQTXComponent.Create$37(Self,AOwner,function (Component) {
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
         Self.FFont = TQTXOwnedObject.Create$35$($New(TQTXWidgetFont),Self);
         Self.FResizeObserver = TQTXOwnedObject.Create$35$($New(TQTXResizeObserver),Self);
         Self.FMoveObserver = TQTXOwnedObject.Create$35$($New(TQTXMoveObserver),Self);
         if ($SetIn(lCreateOptions,0,0,3)) {
            TQTXWidget.StyleObject$(Self);
         }
         if ($SetIn(lCreateOptions,1,0,3)) {
            TQTXWidget.InitializeObject$(Self);
         }
         if (CB) {
            CB(Self);
         }
         if ($Is(TQTXWidget.a$31(Self),TQTXWidget)) {
            TQTXWidget.ChildAttach($As(TQTXWidget.a$31(Self),TQTXWidget),Self,lFragment);
         } else {
            TQTXComponent.GetHandle$(TQTXWidget.a$31(Self)).appendChild(lFragment);
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
      TQTXComponent.Create$37(Self,lOwnerWidget,function (Component) {
         Self.FState = 0;
         Self.FBehavior = [3];
         Self.FOwnership = 1;
         TQTXComponent.SetHandle(Self,DomElement);
         Self.FFont = TQTXOwnedObject.Create$35$($New(TQTXWidgetFont),Self);
         Self.FFont.OnChange = function (Sender) {
            if (TQTXWidget.ClassExists(Self,"ParentFont")) {
               TQTXWidget.ClassRemove(Self,"ParentFont");
            }
         };
         Self.FResizeObserver = TQTXOwnedObject.Create$35$($New(TQTXResizeObserver),Self);
         Self.FMoveObserver = TQTXOwnedObject.Create$35$($New(TQTXMoveObserver),Self);
         if (TVariant.AsString(DomElement.id) == "") {
            DomElement.id = TQTXWidgetRegistry.GetNewElementId(TQTXWidgetRegistry);
         }
         TQTXWidgetRegistry.RegisterElement(TQTXWidgetRegistry,DomElement,Self);
         if ($SetIn(cOptions,2,0,3)) {
            if (TQTXWidget.a$31(Self) !== null) {
               if ($Is(TQTXWidget.a$31(Self),TQTXWidget)) {
                  TQTXWidget.ChildAttach($As(TQTXWidget.a$31(Self),TQTXWidget),Self,DomElement);
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
      if (TQTXWidget.a$31(Self) !== null) {
         if ($Is(TQTXWidget.a$31(Self),TQTXWidget)) {
            TQTXWidget.ChildDetach($As(TQTXWidget.a$31(Self),TQTXWidget),Self);
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
      var a$436 = 0,
         el$2 = null;
      if (CB) {
         var a$437 = [];
         a$437 = Self.FChildren;
         var $temp12;
         for(a$436=0,$temp12=a$437.length;a$436<$temp12;a$436++) {
            el$2 = a$437[a$436];
            if (!CB(el$2)) {
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
         Self.Fbackg = TQTXWidgetBackground.Create$88($New(TQTXWidgetBackground),Self);
      }
      Result = Self.Fbackg;
      return Result
   }
   /// function TQTXWidget.GetBorder() : TQTXWidgetBorder
   ///  [line: 1560, column: 21, file: qtx.dom.widgets]
   ,GetBorder:function(Self) {
      var Result = null;
      if (Self.FBorders === null) {
         Self.FBorders = TQTXWidgetBorder.Create$73($New(TQTXWidgetBorder),Self);
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
      if (TQTXWidget.a$31(Self) !== null) {
         lParent = TQTXWidget.a$31(Self);
         lChildpos = TQTXComponent.GetHandle$(Self).getBoundingClientRect();
         lParentpos = TQTXComponent.GetHandle$(lParent).getBoundingClientRect();
         Result.X$1 = $VarToInt((lChildpos.left-lParentpos.left),"");
         Result.Y$1 = $VarToInt((lChildpos.top-lParentpos.top),"");
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
            Result.Right$1 = Self.FLeft+Self.FWidth;
            Result.Bottom$1 = Self.FTop+Self.FHeight;
            break;
         default :
            if (TQTXWidget.a$31(Self) === null) {
               return Result = CreateSized(TQTXWidget.GetLeft(Self),TQTXWidget.GetTop(Self),TQTXWidget.GetWidth(Self),TQTXWidget.GetHeight(Self));
            }
            lParent = TQTXWidget.a$31(Self);
            lChildpos = TQTXComponent.GetHandle$(Self).getBoundingClientRect();
            lParentpos = TQTXComponent.GetHandle$(lParent).getBoundingClientRect();
            dx = $VarToInt((lChildpos.left-lParentpos.left),"");
            dy = $VarToInt((lChildpos.top-lParentpos.top),"");
            (dx-= TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(lParent),"padding-left"));
            (dy-= TQTXBrowser.ReadComputedInt(TQTXBrowser,TQTXComponent.GetHandle$(lParent),"padding-top"));
            (dx+= $VarToInt(TQTXComponent.GetHandle$(lParent).scrollLeft,""));
            (dy+= $VarToInt(TQTXComponent.GetHandle$(lParent).scrollTop,""));
            Result.Left$2 = dx;
            Result.Top$2 = dy;
            Result.Right$1 = dx+TQTXWidget.GetWidth(Self);
            Result.Bottom$1 = dy+TQTXWidget.GetHeight(Self);
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
      return [7];
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
         if (TQTXWidget.a$31(Element) === null) {
            break;
         }
         if ($Is(TQTXWidget.a$31(Element),TQTXWidget)) {
            Element = $As(TQTXWidget.a$31(Element),TQTXWidget);
         } else {
            break;
         }
         (dx-= TQTXWidget.GetScrollLeft(Element));
         (dx+= TQTXWidgetBorderEdge.GetWidth$1(TQTXWidgetBorder.a$87(TQTXWidget.GetBorder(Element))));
         (dx+= TQTXWidgetBorderEdge.GetPadding(TQTXWidgetBorder.a$87(TQTXWidget.GetBorder(Element))));
         (dx+= TQTXWidgetBorderEdge.GetMargin(TQTXWidgetBorder.a$87(TQTXWidget.GetBorder(Element))));
         (dy-= TQTXWidget.GetScrollTop(Element));
         (dy+= TQTXWidgetBorderEdge.GetWidth$1(TQTXWidgetBorder.a$88(TQTXWidget.GetBorder(Element))));
         (dy+= TQTXWidgetBorderEdge.GetPadding(TQTXWidgetBorder.a$88(TQTXWidget.GetBorder(Element))));
         (dy+= TQTXWidgetBorderEdge.GetMargin(TQTXWidgetBorder.a$88(TQTXWidget.GetBorder(Element))));
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
      var a$438 = 0,
         el$2 = null,
         a$439 = [];
      a$439 = Self.FReadyStack;
      var $temp13;
      for(a$438=0,$temp13=a$439.length;a$438<$temp13;a$438++) {
         el$2 = a$439[a$438];
         el$2(Self);
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
   ,SetDisplayMode:function(Self, Value$1) {
      Self.FDisplay = Value$1;
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXWidget.a$33(Self).display = __DisplayStyles[Value$1];
      }
   }
   /// procedure TQTXWidget.SetEnabled(Value: Boolean)
   ///  [line: 2140, column: 22, file: qtx.dom.widgets]
   ,SetEnabled:function(Self, Value$1) {
      if (Self.FState == 1) {
         TQTXDOMComponent.SetEnabled(Self,Value$1);
         if (TQTXDOMComponent.GetEnabled$(Self)) {
            TQTXWidget.a$40(Self)[2]("TQTXDisabled");
         } else {
            TQTXWidget.a$40(Self)[0]("TQTXDisabled");
         }
      } else {
         Self.FEnabled = Value$1;
      }
   }
   /// procedure TQTXWidget.SetHeight(Value: int32)
   ///  [line: 2402, column: 22, file: qtx.dom.widgets]
   ,SetHeight:function(Self, Value$1) {
      if ($SetIn(Self.FBehavior,1,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FHeight = Value$1;
         } else if ($SetIn(Self.FBehavior,0,0,2)) {
            TQTXWidget.a$33(Self).height = TInt32.ToPxStr(Value$1);
         }
         if ($SetIn(Self.FBehavior,0,0,2)) {
            ++Self.FSizeChanged;
         }
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.SetLeft(Value: int32)
   ///  [line: 2305, column: 22, file: qtx.dom.widgets]
   ,SetLeft:function(Self, Value$1) {
      if ($SetIn(Self.FBehavior,0,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FLeft = Value$1;
         } else {
            TQTXWidget.a$33(Self).left = TInt32.ToPxStr(Value$1);
         }
         ++Self.FPosChanged;
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.SetOwner(NewOwner: TQTXComponent)
   ///  [line: 1439, column: 22, file: qtx.dom.widgets]
   ,SetOwner$1:function(Self, NewOwner) {
      if (TQTXWidget.a$31(Self) !== null) {
         if ($Is(TQTXWidget.a$31(Self),TQTXWidget)) {
            TQTXWidget.ChildDetach($As(TQTXWidget.a$31(Self),TQTXWidget),Self);
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
   ,SetPositionMode:function(Self, Value$1) {
      Self.FPosition = Value$1;
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXWidget.a$33(Self).position = __PositionModes[Self.FPosition];
      }
   }
   /// procedure TQTXWidget.SetScrollLeft(Value: int32)
   ///  [line: 2224, column: 22, file: qtx.dom.widgets]
   ,SetScrollLeft:function(Self, Value$1) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).scrollLeft = Value$1;
      }
   }
   /// procedure TQTXWidget.SetScrollTop(Value: int32)
   ///  [line: 2236, column: 22, file: qtx.dom.widgets]
   ,SetScrollTop:function(Self, Value$1) {
      if (TQTXComponent.GetHandle$(Self)) {
         TQTXComponent.GetHandle$(Self).scrollTop = Value$1;
      }
   }
   /// procedure TQTXWidget.SetSize(aWidth: int32; aHeight: int32)
   ///  [line: 1931, column: 22, file: qtx.dom.widgets]
   ,SetSize$2:function(Self, aWidth, aHeight) {
      if ($SetIn(Self.FBehavior,1,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FWidth = aWidth;
         } else {
            TQTXWidget.a$33(Self).width = aWidth.toString() + "px";
         }
         if (!Self.FState) {
            Self.FHeight = aHeight;
         } else {
            TQTXWidget.a$33(Self).height = aHeight.toString() + "px";
         }
         ++Self.FSizeChanged;
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.SetTop(Value: int32)
   ///  [line: 2339, column: 22, file: qtx.dom.widgets]
   ,SetTop:function(Self, Value$1) {
      if ($SetIn(Self.FBehavior,0,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FTop = Value$1;
         } else {
            TQTXWidget.a$33(Self).top = TInt32.ToPxStr(Value$1);
         }
         ++Self.FPosChanged;
         TQTXWidget.EndUpdate(Self);
      }
   }
   /// procedure TQTXWidget.SetVisible(Value: Boolean)
   ///  [line: 2165, column: 22, file: qtx.dom.widgets]
   ,SetVisible:function(Self, Value$1) {
      if (TVariant.ClassInstance(Self)) {
         switch (Self.FState) {
            case 0 :
               Self.FVisible = Value$1;
               break;
            case 2 :
            case 1 :
               if (Value$1) {
                  TQTXWidget.a$33(Self).display = __DisplayStyles[Self.FDisplay];
                  TQTXWidget.a$33(Self).visibility = "visible";
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
   ,SetWidth:function(Self, Value$1) {
      if ($SetIn(Self.FBehavior,1,0,2)) {
         TQTXWidget.BeginUpdate(Self);
         if (!Self.FState) {
            Self.FWidth = Value$1;
         } else {
            TQTXWidget.a$33(Self).width = TInt32.ToPxStr(Value$1);
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
      TQTXWidget.a$33(Self).position = __PositionModes[Self.FPosition];
      TQTXWidget.a$33(Self).display = __DisplayStyles[Self.FDisplay];
      TQTXWidget.a$33(Self).overflow = "hidden";
      TQTXWidget.a$33(Self).boxSizing = "border-box";
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
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName$:function($){return $.ClassType.GetInstanceName($)}
   ,SetOwner$1$:function($){return $.ClassType.SetOwner$1.apply($.ClassType, arguments)}
   ,GetEnabled$:function($){return $.ClassType.GetEnabled($)}
   ,SetEnabled$:function($){return $.ClassType.SetEnabled.apply($.ClassType, arguments)}
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName$:function($){return $.ClassType.GetInitialCSSClassName($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize.apply($.ClassType, arguments)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetSize$2$:function($){return $.ClassType.SetSize$2.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TQTXWidget.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
                  mLast = Result[x$6-1];
                  mCurrent = Result[x$6];
                  if (TQTXWidget.GetTop(mCurrent) < TQTXWidget.GetTop(mLast)) {
                     $ArraySwap(Result,(x$6-1),x$6);
                     mAltered = true;
                  }
               }
            } while (!(mAltered == false));
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
   ,SetView:function(Self, Value$1) {
      var lAccess = null,
         lAccess$1 = null;
      switch (Self.FState) {
         case 0 :
            Self.FView$2 = Value$1;
            break;
         case 1 :
            TQTXWidget.BeginUpdate(Self);
            try {
               if (Self.FView$2 !== null) {
                  lAccess = $AsIntf(Self.FView$2,"IQTXView");
                  lAccess[1](Self);
                  Self.FView$2 = null;
               }
               Self.FView$2 = Value$1;
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXWidgetContainer.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
      $.FHandle$3 = undefined;
   }
   /// constructor TQTXWidgetBorderEdge.Create(AOwner: TQTXWidgetBorder; Edge: TQTXWidgetBorderType)
   ///  [line: 2885, column: 34, file: qtx.dom.widgets]
   ,Create$72:function(Self, AOwner, Edge$1) {
      TQTXOwnedObject.Create$35(Self,AOwner);
      Self.FEdge = Edge$1;
      Self.FHandle$3 = TQTXComponent.GetHandle$(TQTXWidgetBorder.GetOwner$4(AOwner));
      return Self
   }
   /// function TQTXWidgetBorderEdge.GetMargin() : int32
   ///  [line: 2961, column: 31, file: qtx.dom.widgets]
   ,GetMargin:function(Self) {
      return TQTXBrowser.ReadComputedInt(TQTXBrowser,Self.FHandle$3,__margin_names[Self.FEdge]);
   }
   /// function TQTXWidgetBorderEdge.GetPadding() : int32
   ///  [line: 2933, column: 31, file: qtx.dom.widgets]
   ,GetPadding:function(Self) {
      return TQTXBrowser.ReadComputedInt(TQTXBrowser,Self.FHandle$3,__padding_names[Self.FEdge]);
   }
   /// function TQTXWidgetBorderEdge.GetSize() : int32
   ///  [line: 2892, column: 31, file: qtx.dom.widgets]
   ,GetSize$3:function(Self) {
      return TQTXWidgetBorderEdge.GetWidth$1(Self)+TQTXWidgetBorderEdge.GetPadding(Self)+TQTXWidgetBorderEdge.GetMargin(Self);
   }
   /// function TQTXWidgetBorderEdge.GetWidth() : int32
   ///  [line: 2923, column: 31, file: qtx.dom.widgets]
   ,GetWidth$1:function(Self) {
      return TQTXBrowser.ReadComputedInt(TQTXBrowser,Self.FHandle$3,__width_names[Self.FEdge]);
   }
   /// procedure TQTXWidgetBorderEdge.SetMargin(Value: int32)
   ///  [line: 2966, column: 32, file: qtx.dom.widgets]
   ,SetMargin:function(Self, Value$1) {
      Self.FHandle$3.style[__margin_names[Self.FEdge]] = Value$1.toString() + "px";
   }
   /// procedure TQTXWidgetBorderEdge.SetPadding(Value: int32)
   ///  [line: 2938, column: 32, file: qtx.dom.widgets]
   ,SetPadding:function(Self, Value$1) {
      Self.FHandle$3.style[__padding_names[Self.FEdge]] = Value$1.toString() + "px";
   }
   /// procedure TQTXWidgetBorderEdge.SetWidth(Value: int32)
   ///  [line: 2928, column: 32, file: qtx.dom.widgets]
   ,SetWidth$1:function(Self, Value$1) {
      Self.FHandle$3.style[__width_names[Self.FEdge]] = Value$1.toString() + "px";
   }
   ,Destroy:TObject.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
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
   ///  [line: 292, column: 48, file: qtx.dom.widgets]
   ,a$88:function(Self) {
      var Result = null;
      Result = Self.FEdges[1];
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 291, column: 49, file: qtx.dom.widgets]
   ,a$87:function(Self) {
      var Result = null;
      Result = Self.FEdges[0];
      return Result
   }
   /// function TQTXWidgetBorder.AdjustRect(Value: TRect) : TRect
   ///  [line: 2989, column: 27, file: qtx.dom.widgets]
   ,AdjustRect:function(Self, Value$1) {
      var Result = {Bottom$1:0,Left$2:0,Right$1:0,Top$2:0};
      var lEdge = null;
      Copy$TRect(Value$1,Result);
      lEdge = Self.FEdges[0];
      Result.Right$1 -= TQTXWidgetBorderEdge.GetSize$3(lEdge);
      lEdge = Self.FEdges[1];
      Result.Bottom$1 -= TQTXWidgetBorderEdge.GetSize$3(lEdge);
      return Result
   }
   /// constructor TQTXWidgetBorder.Create(AOwner: TQTXWidget)
   ///  [line: 2975, column: 30, file: qtx.dom.widgets]
   ,Create$73:function(Self, AOwner) {
      TQTXOwnedObject.Create$35(Self,AOwner);
      Self.FEdges[0] = TQTXWidgetBorderEdge.Create$72($New(TQTXWidgetBorderEdge),Self,0);
      Self.FEdges[1] = TQTXWidgetBorderEdge.Create$72($New(TQTXWidgetBorderEdge),Self,1);
      Self.FEdges[2] = TQTXWidgetBorderEdge.Create$72($New(TQTXWidgetBorderEdge),Self,2);
      Self.FEdges[3] = TQTXWidgetBorderEdge.Create$72($New(TQTXWidgetBorderEdge),Self,3);
      return Self
   }
   /// function TQTXWidgetBorder.GetOwner() : TQTXWidget
   ///  [line: 2984, column: 27, file: qtx.dom.widgets]
   ,GetOwner$4:function(Self) {
      return $As(TQTXOwnedObject.GetOwner(Self),TQTXWidget);
   }
   /// procedure TQTXWidgetBorder.SetPadding(Value: int32)
   ///  [line: 3035, column: 28, file: qtx.dom.widgets]
   ,SetPadding$1:function(Self, Value$1) {
      TQTXWidgetBorderEdge.SetPadding(Self.FEdges[0],Value$1);
      TQTXWidgetBorderEdge.SetPadding(Self.FEdges[1],Value$1);
      TQTXWidgetBorderEdge.SetPadding(Self.FEdges[2],Value$1);
      TQTXWidgetBorderEdge.SetPadding(Self.FEdges[3],Value$1);
   }
   ,Destroy:TObject.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
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
   ,Create$74:function(Self, AOwner) {
      TQTXComponent.Create$37(Self,null,function (Component) {
         TQTXComponent.SetHandle(Self,AOwner);
      });
      return Self
   }
   ,Destroy:TObject.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
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
   ,Create$76:function(Self) {
      TQTXProxyWidget.Create$74(Self,document.body);
      return Self
   }
   ,Destroy:TObject.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
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
   ,Create$35:function(Self, AOwner) {
      TQTXOwnedObject.Create$35(Self,AOwner);
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
   ,SetBound:function(Self, Value$1) {
      Self.FBound = Value$1;
   }
   /// procedure TQTXDelegate.SetEventId(Value: String)
   ///  [line: 259, column: 24, file: qtx.delegates]
   ,SetEventId:function(Self, Value$1) {
      Self.FEventid = Trim$_String_(Value$1);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$35$:function($){return $.ClassType.Create$35.apply($.ClassType, arguments)}
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
   ,GetFocusedElement:function(Self) {
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
   Result.Right$1 = Dx+Wd;
   Result.Bottom$1 = Dy+Hd;
   return Result
}
/// function TRect.Height(var Self: TRect) : int32
///  [line: 990, column: 16, file: qtx.dom.graphics]
function TRect$Height$1(Self$3) {
   return Self$3.Bottom$1-Self$3.Top$2;
}
/// function TRect.Width(var Self: TRect) : int32
///  [line: 985, column: 16, file: qtx.dom.graphics]
function TRect$Width$3(Self$4) {
   return Self$4.Right$1-Self$4.Left$2;
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
   ,Create$84:function(Self, AOwner, Name$7, Kind) {
      Self.FOwner$1 = AOwner;
      Self.FName$1 = Name$7;
      Self.FType = Kind;
      Self.FReference = AOwner;
      return Self
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
function StrToColor(Value$1) {
   Value$1 = { _ : Value$1 };
   var Result = 0;
   var lTokens = [],
      values$2 = [],
      x$5 = 0,
      el$2 = {_:""},
      lTemp = { _ : 0 };
   Value$1._ = (Trim$_String_(Value$1._)).toLocaleLowerCase();
   if (Value$1._.length < 1) {
      return 536870911;
   }
   if (Value$1._ == "transparent") {
      return 536870911;
   }
   if (Value$1._.charAt(0) == "#") {
      if (Value$1._.length == 7) {
         return $VarToInt((Hex28[Value$1._.substr(1,2)] * 65536+Hex28[Value$1._.substr(3,2)] * 256+Hex28[Value$1._.substr(5,2)]),"");
      } else {
         Delete(Value$1,1,1);
         return parseInt("0x" + Value$1._,16);
      }
   }
   if (Value$1._.charAt(0) == "$") {
      Delete(Value$1,1,1);
      return parseInt("0x" + Value$1._,16);
   }
   if ((Value$1._.substr(0,2)=="0x")) {
      return parseInt(Value$1._,16);
   }
   if (!((Value$1._.substr(0,4)=="rgb("))) {
      return 536870911;
   }
   if (!(Value$1._.charAt(Value$1._.length-1)==")")) {
      return 536870911;
   }
   Delete(Value$1,1,4);
   Delete(Value$1,Value$1._.length,1);
   Value$1._ = Trim$_String_(Value$1._);
   lTokens = Value$1._.split(",");
   if (lTokens.length != 3) {
      return 536870911;
   }
   values$2 = [0, 0, 0];
   for(x$5=0;x$5<=2;x$5++) {
      el$2._ = lTokens[x$5];
      if (el$2._.length < 1) {
         return 536870911;
      }
      if ((el$2._.indexOf(".")+1) > 0) {
         return 536870911;
      }
      if (el$2._.charAt(0) == "$") {
         Delete(el$2,1,1);
         if (el$2._.length == 1) {
            el$2._ = "0" + el$2._;
         } else {
            SetLength(el$2,2);
         }
         values$2[x$5]=$VarToInt(Hex28[el$2._],"");
         continue;
      }
      if ((el$2._.substr(0,2)=="0x")) {
         Delete(el$2,1,2);
         if (el$2._.length == 1) {
            el$2._ = "0" + el$2._;
         } else {
            SetLength(el$2,2);
         }
         values$2[x$5]=$VarToInt(Hex28[el$2._],"");
         continue;
      }
      if (TryStrToInt(el$2._,lTemp)) {
         values$2[x$5]=lTemp._;
      } else {
         return 536870911;
      }
   }
   Result = ((values$2[0]*65536)+(values$2[1]*256)+values$2[2]);
   return Result
};
function ColorToStr(Value$1) {
   var Result = "";
   var R$1 = 0,
      G$1 = 0,
      B$1 = 0;
   if (Value$1 == 536870911) {
      return "transparent";
   }
   R$1 = (Value$1>>>16)&255;
   G$1 = (Value$1>>>8)&255;
   B$1 = Value$1&255;
   R$1 = (R$1 < 0)?0:(R$1 > 255)?255:R$1;
   G$1 = (G$1 < 0)?0:(G$1 > 255)?255:G$1;
   B$1 = (B$1 < 0)?0:(B$1 > 255)?255:B$1;
   Result = "#" + B2Hex[R$1] + B2Hex[G$1] + B2Hex[B$1];
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
   ,Create$88:function(Self, Owner$10) {
      TQTXOwnedObject.Create$35(Self,Owner$10);
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
   ,SetColor$3:function(Self, Value$1) {
      Self.FHandle$5.style["background-color"] = ColorToStr(Value$1);
   }
   ,Destroy:TObject.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
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
      Self.FHandle$4.innerHTML = Self.FHandle$4.innerHTML + "\r" + SheetText;
   }
   /// constructor TQTXCSSRules.Create()
   ///  [line: 80, column: 26, file: qtx.dom.stylesheet]
   ,Create$77:function(Self) {
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
         _GlobalStyleSheet = TQTXCSSRules.Create$77($New(TQTXCSSRules));
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
   ,Create$35:function(Self, AOwner) {
      TQTXOwnedObject.Create$35(Self,AOwner);
      return Self
   }
   /// function TQTXCustomObserver.GetOwner() : TQTXWidget
   ///  [line: 249, column: 29, file: qtx.dom.observers]
   ,GetOwner$5:function(Self) {
      return $As(TQTXOwnedObject.GetOwner(Self),TQTXWidget);
   }
   ,Destroy:TObject.Destroy
   ,Create$35$:function($){return $.ClassType.Create$35.apply($.ClassType, arguments)}
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
   ,Create$35:function(Self, AOwner) {
      TQTXCustomObserver.Create$35(Self,AOwner);
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
   ,Create$35$:function($){return $.ClassType.Create$35.apply($.ClassType, arguments)}
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
   ,Create$35:function(Self, AOwner) {
      TQTXCustomObserver.Create$35(Self,AOwner);
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
   ,Create$35$:function($){return $.ClassType.Create$35.apply($.ClassType, arguments)}
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
      if (TQTXDOMDelegate.a$421(Self)) {
         if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(TQTXDOMDelegate.a$421(Self)))) {
            lAccess = TQTXComponent.GetHandle$(TQTXDOMDelegate.a$421(Self));
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
      if (TQTXDOMDelegate.a$421(Self)) {
         if (TQTXBrowser.ElementHandle(TQTXBrowser,TQTXComponent.GetHandle$(TQTXDOMDelegate.a$421(Self)))) {
            lAccess = TQTXComponent.GetHandle$(TQTXDOMDelegate.a$421(Self));
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
   ,a$421:function(Self) {
      var Result = null;
      Result = $As(TQTXOwnedObject.GetOwner(Self),TQTXComponent);
      return Result
   }
   /// constructor TQTXDOMDelegate.Create(Parent: TQTXComponent)
   ///  [line: 131, column: 29, file: qtx.dom.events]
   ,Create$90:function(Self, Parent) {
      var lAccess = null;
      TQTXDelegate.Create$35(Self,Parent);
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
      lAccess = $AsIntf(TQTXDOMDelegate.a$421(Self),"IQTXDOMDelegateHost");
      if (!(lAccess===null)) {
         lAccess[1](Self);
      }
      TQTXDelegate.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$91:function(Self, AOwner, CB) {
      TQTXWidget.Create$40(Self,AOwner,function (Widget) {
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXViewPort.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$37:function(Self, AOwner, CB) {
      TQTXComponent.Create$37(Self,AOwner,function (Component) {
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
   ,RegisterAppInstance:function(Self, Value$1) {
      AppInstance = Value$1;
   }
   /// procedure TQTXApplication.SetTerminated(Value: Boolean)
   ///  [line: 131, column: 27, file: qtx.application]
   ,SetTerminated:function(Self, Value$1) {
      Self.FTerminated = Value$1;
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37$:function($){return $.ClassType.Create$37.apply($.ClassType, arguments)}
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
   ,Create$37:function(Self, AOwner, CB) {
      TQTXApplication.Create$37(Self,AOwner,function (Component) {
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
   ,RegisterForm:function(Self, Value$1) {
      if (Value$1 !== null) {
         if (Self.FForms.indexOf(Value$1) >= 0) {
            throw EException.CreateFmt($New(EQTXDOMApplicationFormAlreadyRegistered),$R[0],[TQTXComponent.GetName(Value$1)]);
         }
         Self.FForms.push(Value$1);
      } else {
         throw Exception.Create($New(EQTXDOMApplicationFormInvalid),$R[1]);
      }
   }
   /// procedure TQTXDOMApplication.SetCurrentForm(Value: TQTXForm)
   ///  [line: 499, column: 30, file: qtx.dom.application]
   ,SetCurrentForm:function(Self, Value$1) {
      if (Value$1 !== Self.FCurrent) {
         Self.FCurrent = Value$1;
      }
   }
   /// procedure TQTXDOMApplication.ShowForm(Value: TQTXForm)
   ///  [line: 417, column: 30, file: qtx.dom.application]
   ,ShowForm:function(Self, Value$1) {
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
   ,UnRegisterForm:function(Self, Value$1) {
      var lIndex = 0;
      if (Value$1 !== null) {
         lIndex = Self.FForms.indexOf(Value$1);
         if (lIndex < 0) {
            throw EException.CreateFmt($New(EQTXDOMApplicationFormUnRegisterUnknown),$R[3],[TQTXComponent.GetName(Value$1)]);
         }
         Self.FForms.splice(lIndex,1)
         ;
         if (Self.FCurrent === Value$1) {
            if (Self.FForms.length > 0) {
               if (lIndex > 0) {
                  --lIndex;
               }
               TQTXDOMApplication.SetCurrentForm(Self,Value$1);
            }
         }
      } else {
         throw Exception.Create($New(EQTXDOMApplicationFormUnRegisterInvalid),$R[2]);
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37$:function($){return $.ClassType.Create$37.apply($.ClassType, arguments)}
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
/// TQTXDOMApplicationFull = class (TQTXDOMApplication)
///  [line: 131, column: 3, file: qtx.dom.application]
var TQTXDOMApplicationFull = {
   $ClassName:"TQTXDOMApplicationFull",$Parent:TQTXDOMApplication
   ,$Init:function ($) {
      TQTXDOMApplication.$Init($);
   }
   /// function TQTXDOMApplicationFull.GetHandle() : THandle
   ///  [line: 316, column: 33, file: qtx.dom.application]
   ,GetHandle:function(Self) {
      var Result = undefined;
      Result = document.body;
      return Result
   }
   ,Destroy:TQTXDOMApplication.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXDOMApplication.Create$37
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetInstanceName:TQTXComponent.GetInstanceName
   ,SetOwner$1:TQTXComponent.SetOwner$1
   ,DoExecute$1:TQTXDOMApplication.DoExecute$1
   ,FinalizeObject$1:TQTXApplication.FinalizeObject$1
   ,InitializeObject$1:TQTXApplication.InitializeObject$1
   ,RegisterForm:TQTXDOMApplication.RegisterForm
   ,ShowForm:TQTXDOMApplication.ShowForm
};
TQTXDOMApplicationFull.$Intf={
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
   ,Create$94:function(Self, AOwner, CB) {
      TQTXWidget.Create$40(Self,AOwner,function (Widget) {
         Self.FViewPort = TQTXViewPort.Create$91($New(TQTXViewPort),Self,function (ViewPort) {
            TQTXWidget.SetPositionMode(ViewPort,4);
            TQTXWidget.SetDisplayMode(ViewPort,3);
            TQTXWidget.a$33(ViewPort).width = "100%";
            TQTXWidget.a$33(ViewPort).overflow = "hidden";
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
      TQTXWidget.a$33(Self).overflow = "hidden";
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady$:function($){return $.ClassType.ObjectReady($)}
   ,Resize$:function($){return $.ClassType.Resize.apply($.ClassType, arguments)}
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject$:function($){return $.ClassType.StyleObject($)}
};
TQTXDisplay.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXDisplay.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
///  [line: 42, column: 3, file: qtx.dom.application]
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$35:TQTXDelegate.Create$35
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
   ,Create$95:function(Self, AOwner, CB) {
      TQTXWidget.Create$40(Self,AOwner,function (Widget) {
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName$:function($){return $.ClassType.GetInstanceName($)}
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName$:function($){return $.ClassType.GetInitialCSSClassName($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,ObjectReady:TQTXWidgetContainer.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXForm.$Intf={
   IQTXFormControl:[TQTXForm.FormPresented,TQTXForm.FormHidden,TQTXForm.FormOrientation]
   ,IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMVideo.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMSpan.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMRange.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMPre.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMParagraph.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMLabel.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMEdit.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMDiv.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMCheckBox.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,SetHeight:function(Self, Value$1) {
      TQTXWidget.SetHeight(Self,Value$1);
      TQTXComponent.GetHandle$(Self).height = TQTXWidget.GetHeight(Self);
   }
   /// procedure TQTXDOMCanvas.SetSize(aWidth: int32; aHeight: int32)
   ///  [line: 567, column: 25, file: qtx.dom.control.common]
   ,SetSize$2:function(Self, aWidth, aHeight) {
      TQTXWidget.SetSize$2(Self,aWidth,aHeight);
      TQTXComponent.GetHandle$(Self).width = TQTXWidget.GetWidth(Self);
      TQTXComponent.GetHandle$(Self).height = TQTXWidget.GetHeight(Self);
   }
   /// procedure TQTXDOMCanvas.SetWidth(Value: int32)
   ///  [line: 555, column: 25, file: qtx.dom.control.common]
   ,SetWidth:function(Self, Value$1) {
      TQTXWidget.SetWidth(Self,Value$1);
      TQTXComponent.GetHandle$(Self).width = TQTXWidget.GetWidth(Self);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetSize$2$:function($){return $.ClassType.SetSize$2.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMCanvas.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMButton.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance$:function($){return $.ClassType.CreateElementInstance($)}
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXDOMArticle.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,SetHAlign:function(Self, Value$1) {
      if (Value$1 != Self.FHAlign) {
         Self.FHAlign = Value$1;
         switch (Value$1) {
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
   ,SetVAlign:function(Self, Value$1) {
      if (Value$1 != Self.FVAlign) {
         Self.FVAlign = Value$1;
         switch (Value$1) {
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
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName$:function($){return $.ClassType.GetInitialCSSClassName($)}
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXContentBox.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
   ,a$427:function(Self) {
      var Result = "";
      Result = TQTXWidget.a$34(Self);
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 39, column: 56, file: qtx.dom.control.label]
   ,a$426:function(Self, Value$1) {
      TQTXWidget.a$35(Self,Value$1);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXLabelContent.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
/// TQTXLabel = class (TQTXContentBox)
///  [line: 44, column: 3, file: qtx.dom.control.label]
var TQTXLabel = {
   $ClassName:"TQTXLabel",$Parent:TQTXContentBox
   ,$Init:function ($) {
      TQTXContentBox.$Init($);
      $.FContent = null;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 53, column: 38, file: qtx.dom.control.label]
   ,a$429:function(Self) {
      var Result = "";
      Result = TQTXLabelContent.a$427(Self.FContent);
      return Result
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 53, column: 65, file: qtx.dom.control.label]
   ,a$428:function(Self, Value$1) {
      TQTXLabelContent.a$426(Self.FContent,Value$1);
   }
   /// constructor TQTXLabel.Create(AOwner: TQTXComponent; CB: TQTXLabelConstructor)
   ///  [line: 62, column: 23, file: qtx.dom.control.label]
   ,Create$96:function(Self, AOwner, CB) {
      TQTXWidget.Create$40(Self,AOwner,function (Widget) {
         Self.FContent = TQTXWidget.Create$40($New(TQTXLabelContent),Self,null);
         TQTXWidget.SetPositionMode(Self.FContent,0);
         if (CB) {
            CB(Self);
         }
      });
      return Self
   }
   /// procedure TQTXLabel.FinalizeObject()
   ///  [line: 75, column: 21, file: qtx.dom.control.label]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FContent);
      TQTXWidget.FinalizeObject(Self);
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,GetInitialCSSClassName:TQTXContentBox.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize:TQTXWidget.Resize
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXLabel.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXWidget.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
   ,IQTXOwnedObjectAccess:[TQTXOwnedObject.AcceptOwner,TQTXOwnedObject.SetOwner,TQTXOwnedObject.GetOwner]
}
function SetupLabelStyles() {
   var lSheet = null;
   lSheet = TQTXCSSRules.GetGlobalStyleSheet(TQTXCSSRules);
   TQTXCSSRules.AddStyles(lSheet,".TQTXLabelContent {\r\n  white-space: nowrap !important;\r\n  box-sizing: border-box;\r\n  overflow: hidden;\r\n  margin: 0px;\r\n  padding: 0px;\r\n  background-color: rgba(255, 255, 255, 0.3);\r\n}\r\n");
};
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
   ,SetOptions:function(Self, Value$1) {
      Self.FOptions$1 = Value$1.slice(0);
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
   ,Create$97:function(Self, AOwner, CB) {
      TQTXWidget.Create$40(Self,AOwner,function (Widget) {
         Self.FOptions$1 = [0];
         if (CB) {
            CB(Self);
         }
         TQTXPanel.SetOptions(Self,Self.FOptions$1.slice(0));
      });
      return Self
   }
   ,Destroy:TQTXWidget.Destroy
   ,Create$35:TQTXOwnedObject.Create$35
   ,Create$37:TQTXComponent.Create$37
   ,GetHandle:TQTXComponent.GetHandle
   ,GetInstanceName:TQTXWidget.GetInstanceName
   ,SetOwner$1:TQTXWidget.SetOwner$1
   ,GetEnabled:TQTXWidget.GetEnabled
   ,SetEnabled:TQTXWidget.SetEnabled
   ,CreateElementInstance:TQTXWidget.CreateElementInstance
   ,FinalizeObject:TQTXWidget.FinalizeObject
   ,GetInitialCSSClassName:TQTXWidget.GetInitialCSSClassName
   ,InitializeObject:TQTXWidget.InitializeObject
   ,ObjectReady:TQTXWidget.ObjectReady
   ,Resize$:function($){return $.ClassType.Resize.apply($.ClassType, arguments)}
   ,SetHeight:TQTXWidget.SetHeight
   ,SetSize$2:TQTXWidget.SetSize$2
   ,SetWidth:TQTXWidget.SetWidth
   ,StyleObject:TQTXWidget.StyleObject
};
TQTXPanel.$Intf={
   IQTXWidgetAccess:[TQTXWidget.Moved,TQTXPanel.Resize,TQTXWidget.Invalidate,TQTXWidget.GetBoundsPos,TQTXWidget.GetBoundsRect,TQTXWidget.GetClientRect,TQTXWidget.GetScreenRect]
   ,IQTXDOMDelegateHost:[TQTXWidget.RegisterDelegate,TQTXWidget.UnRegisterDelegate]
   ,IQTXWidgetCssClasses:[TQTXWidget.ClassAdd,TQTXWidget.ClassAddEx,TQTXWidget.ClassRemove,TQTXWidget.ClassRemoveEx,TQTXWidget.ClassExists,TQTXWidget.ClassToggle,TQTXWidget.ClassListGet,TQTXWidget.ClassListSet]
   ,IQTXWidgetAttributes:[TQTXDOMComponent.AttributeExists,TQTXDOMComponent.AttributesExist,TQTXDOMComponent.AttributeRead,TQTXDOMComponent.AttributeWrite,TQTXDOMComponent.AttributeRemove]
   ,IQTXWidgetProperties:[TQTXDOMComponent.PropertyExists$1,TQTXDOMComponent.PropertiesExist,TQTXDOMComponent.PropertyRead$1,TQTXDOMComponent.PropertyWrite$1,TQTXDOMComponent.PropertyRemove,TQTXDOMComponent.PropertyType]
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
            LPlaceholderCount = (b64.charAt((LTextLen-1)-1) == "=")?2:(b64.charAt(LTextLen-1) == "=")?1:0;
         }
         BufferSize = ($Div(LTextLen * 3,4))-LPlaceholderCount;
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
   ,BytesToBase64$1:function(Data) {
      var Result = "";
      var LLen = 0,
         LExtra = 0,
         LStrideLen = 0,
         LMaxChunkLength = 0,
         i = 0,
         Ahead = 0,
         SegSize = 0,
         output = "",
         LTemp = 0,
         LTemp$1 = 0;
      LLen = Data.length;
      if (LLen > 0) {
         LExtra = Data.length % 3;
         LStrideLen = LLen-LExtra;
         LMaxChunkLength = 16383;
         i = 0;
         while (i < LStrideLen) {
            Ahead = i+LMaxChunkLength;
            SegSize = (Ahead > LStrideLen)?LStrideLen:Ahead;
            Result += TQTXBase64Core.EncodeChunk(Data,i,SegSize);
            (i+= LMaxChunkLength);
         }
         if (LExtra > 0) {
            --LLen;
         }
         output = "";
         switch (LExtra) {
            case 1 :
               LTemp = Data[LLen];
               output += __B64_Lookup[LTemp>>>2];
               output += __B64_Lookup[(LTemp<<4)&63];
               output += "==";
               break;
            case 2 :
               LTemp$1 = (Data[LLen-1]<<8)+Data[LLen];
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
   ,EncodeChunk:function(Data, startpos, endpos) {
      var Result = "";
      var temp = 0;
      while (startpos < endpos) {
         temp = (Data[startpos]<<16)+(Data[startpos+1]<<8)+Data[startpos+2];
         Result += __B64_Lookup[(temp>>>18)&63] + __B64_Lookup[(temp>>>12)&63] + __B64_Lookup[(temp>>>6)&63] + __B64_Lookup[temp&63];
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
   ,Create$6:function(Self) {
      TDataTypeConverter.Create$6(Self);
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
   ,Create$6$:function($){return $.ClassType.Create$6($)}
   ,DecodeData$:function($){return $.ClassType.DecodeData.apply($.ClassType, arguments)}
   ,EncodeData$:function($){return $.ClassType.EncodeData.apply($.ClassType, arguments)}
   ,MakeCodecInfo$:function($){return $.ClassType.MakeCodecInfo($)}
};
TQTXCodec.$Intf={
   IQTXCodecBinding:[TQTXCodec.RegisterBinding,TQTXCodec.UnRegisterBinding]
   ,IQTXCodecProcess:[TQTXCodec.EncodeData,TQTXCodec.DecodeData]
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
      LVersion = Create$28(0,1,0);
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
   ,Create$6:TQTXCodec.Create$6
   ,DecodeData$:function($){return $.ClassType.DecodeData.apply($.ClassType, arguments)}
   ,EncodeData$:function($){return $.ClassType.EncodeData.apply($.ClassType, arguments)}
   ,MakeCodecInfo$:function($){return $.ClassType.MakeCodecInfo($)}
};
TBase64Codec.$Intf={
   IQTXCodecProcess:[TBase64Codec.EncodeData,TBase64Codec.DecodeData]
   ,IQTXCodecBinding:[TQTXCodec.RegisterBinding,TQTXCodec.UnRegisterBinding]
}
function InitializeBase64() {
   var i = 0;
   var $temp19;
   for(i=1,$temp19=CNT_B64_CHARSET.length;i<=$temp19;i++) {
      __B64_Lookup[i-1] = CNT_B64_CHARSET.charAt(i-1);
      __B64_RevLookup[TDataTypeConverter.CharToByte(CNT_B64_CHARSET.charAt(i-1))] = i-1;
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
function Create$28(Major, Minor, Revision) {
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
      var a$440 = 0,
         LItem = null,
         a$441 = [];
      Result = null;
      a$441 = Self.FCodecs;
      var $temp20;
      for(a$440=0,$temp20=a$441.length;a$440<$temp20;a$440++) {
         LItem = a$441[a$440];
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
         LItem = TDataTypeConverter.Create$6$($NewDyn(CodecClass,""));
         Self.FCodecs.push(LItem);
      } else {
         throw Exception.Create($New(ECodecManager),"Codec already registered error");
      }
   }
   /// procedure TQTXCodecManager.Reset()
   ///  [line: 201, column: 28, file: qtx.codec]
   ,Reset$1:function(Self) {
      var a$442 = 0,
         codec = null;
      try {
         var a$443 = [];
         a$443 = Self.FCodecs;
         var $temp21;
         for(a$442=0,$temp21=a$443.length;a$442<$temp21;a$442++) {
            codec = a$443[a$442];
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
   ,SetName:function(Self, coName) {
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
   ICodecInfo:[TQTXCodecInfo.SetName,TQTXCodecInfo.SetMime,TQTXCodecInfo.SetVersion,TQTXCodecInfo.SetDataFlow,TQTXCodecInfo.SetDescription,TQTXCodecInfo.SetInput,TQTXCodecInfo.SetOutput]
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
   ,Create$29:function(Self, EndPoint) {
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
      var Result = {_:false};
      try {
         var LTemp = undefined;
         try {
            LTemp = new Uint8ClampedArray(10);
         } catch ($e) {
            var e$1 = $W($e);
            return Result._;
         }
         if (LTemp) {
            Result._ = true;
         }
      } finally {return Result._}
   }
   /// function TQTXCodecUTF8.CanUseNativeConverter() : Boolean
   ///  [line: 170, column: 30, file: qtx.codec.utf8]
   ,CanUseNativeConverter:function() {
      var Result = {_:false};
      try {
         var LTemp = null;
         try {
            LTemp = new TextEncoder("utf8");
         } catch ($e) {
            var e$1 = $W($e);
            return false;
         }
         Result._ = LTemp !== null;
      } finally {return Result._}
   }
   /// function TQTXCodecUTF8.Decode(const BytesToDecode: TUInt8Array) : String
   ///  [line: 259, column: 24, file: qtx.codec.utf8]
   ,Decode:function(Self, BytesToDecode) {
      var Result = "";
      var LDecoder = null,
         LTyped,
         i = 0,
         bytelen = 0,
         c$1 = 0,
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
         i = 0;
         bytelen = BytesToDecode.length;
         if (bytelen > 2) {
            if (TQTXByteOrderMarkUTF8.CheckUTF8(TQTXByteOrderMarkUTF8,BytesToDecode)) {
               (i+= 3);
            }
         }
         while (i < bytelen) {
            c$1 = BytesToDecode[i];
            ++i;
            if (c$1 < 128) {
               Result += TString.FromCharCode(c$1);
            } else if (c$1 > 191 && c$1 < 224) {
               c2 = BytesToDecode[i];
               ++i;
               Result += TString.FromCharCode(((c$1&31)<<6)|(c2&63));
            } else if (c$1 > 239 && c$1 < 365) {
               c2$1 = BytesToDecode[i];
               ++i;
               c3 = BytesToDecode[i];
               ++i;
               c4 = BytesToDecode[i];
               ++i;
               u = (((((c$1&7)<<18)|((c2$1&63)<<12))|((c3&63)<<6))|(c4&63))-65536;
               Result += TString.FromCharCode(55296+(u>>>10));
               Result += TString.FromCharCode(56320+(u&1023));
            } else {
               c2$2 = BytesToDecode[i];
               ++i;
               c3$1 = BytesToDecode[i];
               ++i;
               Result += TString.FromCharCode(((c$1&15)<<12)|(((c2$2&63)<<6)|(c3$1&63)));
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
         var $temp22;
         for(n=1,$temp22=TextToEncode.length;n<=$temp22;n++) {
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
      LVersion = Create$28(0,2,0);
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
   ,Create$6:TQTXCodec.Create$6
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
   CRC_Table = function () {
      for (var r=[],i=0; i<513; i++) r.push(0);
      return r
   }(),
   Counter = 0,
   __Resolved = false,
   __SupportCTA = false,
   _NameId = 0,
   a$49 = null,
   _GlobalStyleSheet = null,
   _ElementId = 0,
   _ElementLUT = undefined,
   AppInstance = null,
   availableOptions = ["","","","","","","","",""],
   availableOptions = ["silent", "optionMergeStrategies", "devtools", "errorHandler", "warnHandler", "ignoredElements", "keyCodes", "performance", "productionTip"];
var VueVersion = "",
   vueapp$1 = undefined,
   vueapp = undefined,
   lSheet$1 = null,
   __DisplayStyles = ["","","","","","","","","","","","","","",""],
   __PositionModes = ["","","","","",""],
   __Border_StyleNames = ["","","","","","","","",""],
   __margin_names = ["","","",""],
   __padding_names = ["","","",""],
   __width_names = ["","","",""],
   __border_names = ["","","",""],
   __border_color_names = ["","","",""],
   lSheet$2 = null;
var __DisplayStyles = ["none", "initial", "inherit", "inline-block", "block", "flex", "table", "table-caption", "table-cell", "table-row", "table-column", "run-in", "list-item", "grid", "inline-grid"];
var __PositionModes = ["initial", "static", "relative", "fixed", "absolute", "sticky"];
var __Border_StyleNames = ["none", "initial", "inherited", "solid", "dotted", "double", "groove", "inset", "outset"];
var __margin_names = ["margin-left", "margin-top", "margin-right", "margin-bottom"];
var __padding_names = ["padding-left", "padding-top", "padding-right", "padding-bottom"];
var __width_names = ["border-left-width", "border-top-width", "border-right-width", "border-bottom-width"];
var __border_names = ["border-left-style", "border-top-style", "border-right-style", "border-bottom-style"];
var __border_color_names = ["border-left-color", "border-top-color", "border-right-color", "border-bottom-color"];
var B2Hex = function () {
      for (var r=[],i=0; i<256; i++) r.push("");
      return r
   }(),
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
var __B64_Lookup = function () {
      for (var r=[],i=0; i<257; i++) r.push("");
      return r
   }(),
   __B64_RevLookup = function () {
      for (var r=[],i=0; i<257; i++) r.push(0);
      return r
   }(),
   CNT_B64_CHARSET = "";
var CNT_B64_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+\/";
var __Manager = null;
var lSheet$2 = TQTXCSSRules.GetGlobalStyleSheet(TQTXCSSRules);
TQTXCSSRules.AddStyles(lSheet$2,".ParentFont {\r\n  font-family:  inherit;\r\n  font-size:    inherit;\r\n  color:        inherit;\r\n}\r\n\r\n.ParentBackground {\r\n  background: inherit;\r\n  background-color: inherit;\r\n  background-image: inherit;\r\n  background-position: inherit;\r\n  background-repeat: inherit;\r\n}\r\n\r\n.TQTXBorderNone {\r\n  -webkit-border-style: none;\r\n\t   -moz-border-style: none;\r\n\t    -ms-border-style: none;\r\n\t     -o-border-style: none;\r\n\t        border-style: none;\r\n}\r\n\r\ndiv, input, span {\r\n   cursor:  default;\r\n\r\n   border: 0px;\r\n   margin: 0px;\r\n   padding: 0px;\r\n\r\n  -webkit-box-sizing: border-box !important;\r\n\t   -moz-box-sizing: border-box !important;\r\n\t    -ms-box-sizing: border-box !important;\r\n\t     -o-box-sizing: border-box !important;\r\n\t        box-sizing: border-box !important;\r\n\r\n\t-webkit-tap-highlight-color: transparent;\r\n\t   -moz-tap-highlight-color: transparent;\r\n\t    -ms-tap-highlight-color: transparent;\r\n\t     -o-tap-highlight-color: transparent;\r\n\t        tap-highlight-color: transparent;\r\n\r\n\t-webkit-font-smoothing: always;\r\n\t   -moz-font-smoothing: always;\r\n\t    -ms-font-smoothing: always;\r\n\t        font-smoothing: always;\r\n\r\n  -webkit-text-size-adjust: auto;\r\n     -moz-text-size-adjust: auto;\r\n      -ms-text-size-adjust: auto;\r\n       -o-text-size-adjust: auto;\r\n\r\n  -webkit-touch-callout: none;\r\n    -webkit-user-select: none;\r\n       -moz-user-select: none;\r\n        -ms-user-select: none;\r\n            user-select: none;\r\n}\r\n\r\n.TQTXDisabled {\r\n  opacity:        0.5 !Important;\r\n  cursor:         not-allowed !Important;\r\n  touch-action:   none !Important;\r\n  outline:        none !Important;\r\n  pointer-events: none !Important;\r\n  \/*\r\n  background:     url(data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl\/xfgAAAABJRU5ErkJggg==) repeat !Important;\r\n  *\/\r\n}\r\n\r\n.TQTXDisabled: > * {\r\n  opacity:        0.5 !Important;\r\n  cursor:         not-allowed !Important;\r\n  touch-action:   none !Important;\r\n  outline:        none !Important;\r\n  pointer-events: none !Important;\r\n}\r\n\r\n");
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
if (!Uint8Array.prototype.fill) {
      Uint8Array.prototype.fill = Array.prototype.fill;
    }
;
InitializeBase64();
TQTXCodecManager.RegisterCodec(CodecManager(),TBase64Codec);
TQTXCodecManager.RegisterCodec(CodecManager(),TQTXCodecUTF8);
var lSheet$1 = TQTXCSSRules.GetGlobalStyleSheet(TQTXCSSRules);
TQTXCSSRules.AddStyles(lSheet$1,".TQTXContentBox {\r\n  display: flex !important;\r\n  white-space: nowrap;\r\n  box-sizing: border-box;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-direction: column;\r\n  width: 100%;\r\n  text-align: center;\r\n  min-height: 8px;\r\n}\r\n");
VueVersion = Vue.version;
;
SetupLabelStyles();
TQTXComponent.Create$37$($New(TQTXDOMApplicationFull),null,function (Widget) {
   /// anonymous TClassSymbol
   /// anonymous TClassSymbol
   Vue.component("button-counter",{
      "template" : "<button v-on:click=\"count++\">You have clicked the button {{ count }} times.<\/button>"
      ,"data" : function () {
         return {
            "count" : 0
         };
      }
   });
   vueapp = new Vue({
      "el" : "#app"
   });
});
var main = function() {
}
