import{n as e}from"./client.286e53c2.js";const t={};var n=e({name:"TotalMoney",props:{money:{type:Number,default:0},name:{type:String,default:""}},data:()=>({}),computed:{changeColor(){return this.money>=0?"":"teal lighten-4--text"},absMoney(){return Math.abs(this.money)}},methods:{}},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("span",[e._v("日数："+e._s(e.name)),n("v-spacer")],1),e._v(" 金額："),n("span",{class:e.changeColor},[e._v(" "+e._s(e.absMoney)+"円")])])],1)}),[],!1,a,null,null,null);function a(e){for(let n in t)this[n]=t[n]}var o=function(){return n.exports}();export{o as default};