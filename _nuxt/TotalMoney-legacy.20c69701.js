System.register(["./client-legacy.09901f2e.js"],(function(e){"use strict";var t;return{setters:[function(e){t=e.n}],execute:function(){var n={},r=t({name:"TotalMoney",props:{money:{type:Number,default:0},name:{type:String,default:""}},data:function(){return{}},computed:{changeColor:function(){return this.money>=0?"":"teal lighten-4--text"},absMoney:function(){return Math.abs(this.money)}},methods:{}},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("span",[e._v("日数："+e._s(e.name)),n("v-spacer")],1),e._v(" 金額："),n("span",{class:e.changeColor},[e._v(" "+e._s(e.absMoney)+"円")])])],1)}),[],!1,o,null,null,null);function o(e){for(var t in n)this[t]=n[t]}e("default",function(){return r.exports}())}}}));
