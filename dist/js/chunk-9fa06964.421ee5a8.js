(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9fa06964"],{"268f":function(e,t,r){e.exports=r("fde4")},"32a6":function(e,t,r){var n=r("241e"),a=r("c3a1");r("ce7e")("keys",function(){return function(e){return a(n(e))}})},"89b1":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("base-container",{attrs:{loading:e.loading}},[r("MediaTimeline",{attrs:{"media-list":e.mediaList}})],1)},a=[],i=r("268f"),c=r.n(i),u=r("e265"),o=r.n(u),s=r("a4bb"),f=r.n(s),l=r("85f2"),d=r.n(l);function p(e,t,r){return t in e?d()(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function h(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=f()(r);"function"===typeof o.a&&(n=n.concat(o()(r).filter(function(e){return c()(r,e).enumerable}))),n.forEach(function(t){p(e,t,r[t])})}return e}r("a481"),r("96cf");var v=r("3b8d"),b=r("d225"),g=r("b0b4"),m=r("308d"),w=r("6bb5"),x=r("4e2b"),k=r("9ab4"),y=r("60a3"),O=r("125a"),j=r("ee31"),R=r("7b04");y["a"].registerHooks(["beforeRouteEnter","beforeRouteUpdate"]);var I=function(e){function t(){var e;return Object(b["a"])(this,t),e=Object(m["a"])(this,Object(w["a"])(t).apply(this,arguments)),e.loading=!1,e}return Object(x["a"])(t,e),Object(g["a"])(t,[{key:"beforeRouteEnter",value:function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(t,r,n){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:a=parseInt(t.params.mediaId,10),new Promise(function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(t,r){var n,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=j["a"].media[a],!n){e.next=5;break}t(n),e.next=9;break;case 5:return e.next=7,j["a"].fetchMedia({id_in:[a]});case 7:i=e.sent,i.length?t(i.shift()):r();case 9:case"end":return e.stop()}},e)}));return function(t,r){return e.apply(this,arguments)}}()).then(function(e){var r=e.title.romaji;document.title="Anitree - "+r;var a=r.trim().replace(/[^\w\s]/g,"").replace(/\s/g,"-");return t.params.title!==a?n({name:"title",params:h({},t.params,{title:a}),replace:!0}):n(function(t){return t.fetch(e)})}).catch(function(){return n(!1)});case 2:case"end":return e.stop()}},e)}));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"beforeRouteUpdate",value:function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(t,r,n){var a,i=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:a=parseInt(t.params.mediaId,10),new Promise(function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(t,r){var n,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=j["a"].media[a],!n){e.next=5;break}t(n),e.next=9;break;case 5:return e.next=7,j["a"].fetchMedia({id_in:[a]});case 7:i=e.sent,i.length?t(i.shift()):r();case 9:case"end":return e.stop()}},e)}));return function(t,r){return e.apply(this,arguments)}}()).then(function(e){var r=e.title.romaji;document.title="Anitree - "+r;var a=r.trim().replace(/[^\w\s]/g,"").replace(/\s/g,"-");return t.params.title!==a?n({name:"title",params:h({},t.params,{title:a}),replace:!0}):(n(),void i.fetch(e))}).catch(function(){return n(!1)});case 2:case"end":return e.stop()}},e)}));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"fetch",value:function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(t){var r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=this.currentId,this.loading=!0,e.next=4,j["a"].handleQueue([t]);case 4:return e.next=6,j["a"].CHANGE_CURRENT_ID({currentId:r});case 6:return e.next=8,j["a"].changeFilteredMedia();case 8:this.loading=!1;case 9:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"changeFilteredMedia",value:function(){var e=Object(v["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return this.loading=!0,e.next=3,j["a"].changeFilteredMedia();case 3:this.loading=!1;case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},{key:"filters",get:function(){return j["a"].activeFilters}},{key:"mediaList",get:function(){return j["a"].sortedMedia}},{key:"currentId",get:function(){return parseInt(this.$route.params.mediaId,10)}}]),t}(y["d"]);k["c"]([Object(y["e"])("filters",{deep:!0})],I.prototype,"changeFilteredMedia",null),I=k["c"]([Object(y["a"])({components:{MediaTimeline:O["a"],BaseContainer:R["a"]}})],I);var M=I,S=M,$=r("2877"),A=Object($["a"])(S,n,a,!1,null,null,null);t["default"]=A.exports},"8aae":function(e,t,r){r("32a6"),e.exports=r("584a").Object.keys},a481:function(e,t,r){"use strict";var n=r("cb7c"),a=r("4bf8"),i=r("9def"),c=r("4588"),u=r("0390"),o=r("5f1b"),s=Math.max,f=Math.min,l=Math.floor,d=/\$([$&`']|\d\d?|<[^>]*>)/g,p=/\$([$&`']|\d\d?)/g,h=function(e){return void 0===e?e:String(e)};r("214f")("replace",2,function(e,t,r,v){return[function(n,a){var i=e(this),c=void 0==n?void 0:n[t];return void 0!==c?c.call(n,i,a):r.call(String(i),n,a)},function(e,t){var a=v(r,e,this,t);if(a.done)return a.value;var l=n(e),d=String(this),p="function"===typeof t;p||(t=String(t));var g=l.global;if(g){var m=l.unicode;l.lastIndex=0}var w=[];while(1){var x=o(l,d);if(null===x)break;if(w.push(x),!g)break;var k=String(x[0]);""===k&&(l.lastIndex=u(d,i(l.lastIndex),m))}for(var y="",O=0,j=0;j<w.length;j++){x=w[j];for(var R=String(x[0]),I=s(f(c(x.index),d.length),0),M=[],S=1;S<x.length;S++)M.push(h(x[S]));var $=x.groups;if(p){var A=[R].concat(M,I,d);void 0!==$&&A.push($);var E=String(t.apply(void 0,A))}else E=b(R,d,I,M,$,t);I>=O&&(y+=d.slice(O,I)+E,O=I+R.length)}return y+d.slice(O)}];function b(e,t,n,i,c,u){var o=n+e.length,s=i.length,f=p;return void 0!==c&&(c=a(c),f=d),r.call(u,f,function(r,a){var u;switch(a.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,n);case"'":return t.slice(o);case"<":u=c[a.slice(1,-1)];break;default:var f=+a;if(0===f)return r;if(f>s){var d=l(f/10);return 0===d?r:d<=s?void 0===i[d-1]?a.charAt(1):i[d-1]+a.charAt(1):r}u=i[f-1]}return void 0===u?"":u})}})},a4bb:function(e,t,r){e.exports=r("8aae")},bf90:function(e,t,r){var n=r("36c3"),a=r("bf0b").f;r("ce7e")("getOwnPropertyDescriptor",function(){return function(e,t){return a(n(e),t)}})},e265:function(e,t,r){e.exports=r("ed33")},ed33:function(e,t,r){r("014b"),e.exports=r("584a").Object.getOwnPropertySymbols},fde4:function(e,t,r){r("bf90");var n=r("584a").Object;e.exports=function(e,t){return n.getOwnPropertyDescriptor(e,t)}}}]);
//# sourceMappingURL=chunk-9fa06964.421ee5a8.js.map