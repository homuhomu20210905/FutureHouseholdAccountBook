!function(){var t=document.createElement("style");t.innerHTML=".full-page{height:80vh}\n",document.head.appendChild(t),System.register(["./topmessage01-legacy.c9bc9cdf.js","./client-legacy.09901f2e.js"],(function(t){"use strict";var e,n;return{setters:[function(t){e=t.default},function(t){n=t.n}],execute:function(){var o={},r=n({components:{topmessage01:e},data:function(){return{point:1}},computed:{tagName:function(){return["","topmessage01","topmessage02","topmessage03"][this.point]}},methods:{add:function(){this.point++,this.point>=10&&(this.point=1)}}},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",{attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"12"}},[n("v-scroll-y-reverse-transition",{attrs:{mode:"out-in",appear:"",group:""}},t._l(10,(function(e){return n("div",{key:e},[e==t.point?n("div",{staticClass:"full-page",attrs:{cols:"12"}},[t._v(" "+t._s(e)+"シート目 "),n(t.tagName,{tag:"component"})],1):t._e()])})),0)],1)],1),n("v-row",[n("v-col",[n("v-btn",{attrs:{color:"",dark:"",bottom:"",block:""},on:{click:t.add}},[n("v-icon",{attrs:{large:""}},[t._v(" mdi-chevron-down ")])],1)],1)],1)],1)}),[],!1,s,null,null,null);function s(t){for(var e in o)this[e]=o[e]}t("default",function(){return r.exports}())}}}))}();
