import{T as e}from"./Times.e71c0374.js";import t from"./OtherNumber.c0ca085c.js";import a from"./daysjs-ja.58bedf17.js";import n from"./oneDays.ec4fa0ab.js";import s from"./resultTotalMoney.21ba1473.js";import{n as o}from"./client.286e53c2.js";import"./TotalMonies.efeee3dd.js";import"./TotalMoney.e053f365.js";import"./PeriodSelect.3da9e2de.js";import"./Number.600fb47f.js";import"./iconSelect.8dae7215.js";import"./timelyMoney.a929036f.js";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{attrs:{color:"basil"}},[a("v-card-title",{staticClass:"text-center justify-center py-6"},[a("v-row",[a("v-col",{attrs:{cols:"auto"}},[a("v-btn",{on:{click:function(t){e.menuView=!e.menuView}}},[a("v-icon",{attrs:{large:""}},[e._v(" mdi-menu ")])],1)],1),a("v-col",{attrs:{cols:"11"}},[e._v(" 金額を入力してください。 ")])],1)],1),a("v-row",[a("v-slide-x-transition",{attrs:{mode:"out-in"}},[e.menuView?a("v-col",{attrs:{cols:"2"}},[a("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:"",vertical:""},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},e._l(e.tabMenus,(function(t){return a("v-tab",{key:t.name},[e._v(" "+e._s(t.name)+" ")])})),1)],1):e._e()],1),a("v-col",{attrs:{cols:"10"}},[a("v-tabs-items",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},e._l(e.tabMenus,(function(t){return a("v-tab-item",{key:t.name},[t.value==e.TabStatus.Work||t.value==e.TabStatus.Holiday?a("div",[a("one-days",{attrs:{periods:e.timeMoneys[t.value],tab:e.tab,item:t},on:{"change-value2":function(a){return e.setNumber(t.value,null,a)}}}),a("v-card",[a("v-card-text",[a("v-row",[a("v-col",[a("h1",[e._v(e._s(t.name)+"の合計金額"+e._s(e.total(t.value))+"円")])])],1)],1)],1)],1):t.value==e.TabStatus.Income?a("div",[a("v-card-text",[a("v-row",e._l(e.timeMoneys[t.value],(function(n,s){return a("v-col",{key:t.value+n.name+s,attrs:{cols:"12",md:"12",sm:"12"}},[a("other-number",{attrs:{tab:e.tab,status:1,name:n.name,value:n.money,"c-start":+n.cycle.start,"valid-flag":n.validFlag},on:{"change-value":function(a){return e.otherNumberSet(t.value,s,a)}}})],1)})),1)],1)],1):t.value==e.TabStatus.FixedCost?a("div",[a("v-card",{attrs:{flat:""}},[a("v-card-text",[a("v-row",e._l(e.timeMoneys[t.value],(function(n,s){return a("v-col",{key:n.name+s,attrs:{cols:"12"}},[a("other-number",{attrs:{tab:e.tab,status:0,name:n.name,value:n.money,"c-start":+n.cycle.start},on:{"change-value":function(a){return e.otherNumberSet(t.value,s,a)}}})],1)})),1)],1)],1)],1):t.value==e.TabStatus.All?a("div",[a("result-total-money",{key:e.allKey,attrs:{"tab-menus":e.tabMenus,"time-moneys":e.timeMoneys},on:{"update:tabMenus":function(t){e.tabMenus=t},"update:tab-menus":function(t){e.tabMenus=t},"update:timeMoneys":function(t){e.timeMoneys=t},"update:time-moneys":function(t){e.timeMoneys=t}}})],1):e._e(),t.value==e.TabStatus.Calendar?a("div",[a("v-row",e._l(e.dateList,(function(t){return a("v-col",{key:t.view,attrs:{cols:"4"}},[a("h2",[e._v(" "+e._s(t.view)+e._s(t.money)+e._s(t.names)+" ")])])})),1)],1):e._e()])})),1)],1)],1)],1)},l=[];const{dayjs:u}=a,{createTabMenu:i,timeCount:m,getComma:c,timePattern:y,TimeLine:d,TabStatus:h,CycleStatus:v}=e,f={};var b=o({components:{OtherNumber:t,oneDays:n,resultTotalMoney:s},data(){const e=i(),t={};return e.forEach((e=>{t[e.value]=[];for(let a=0;a<3;a++)t[e.value].push(Object.assign({},d("",Object.assign({},e.cycle),0)))})),{currentDate:u(new Date),tab:null,tabMenus:e,timeMoneys:t,TabStatus:h,menuView:!0,allKey:!1}},computed:{tabSummaryOneDayMoney(){return e=>{let t=0;const a=[];return this.timeMoneys[e].forEach((e=>{e.name&&a.push(e.name+"("+e.oneDayMoney()+"円)"),t+=e.oneDayMoney()})),{result:t,names:a}}},tabIndex(){const e=[];return e.push(h.Work),e.push(h.Holiday),e.push(h.Income),e.push(h.FixedCost),e.push(h.All),e.push(h.Calendar),e[this.tab]},allSummaryOneDayMoney(){return e=>this.tabIndex!=h.All?null:e==h.All?this.allOnlySummaryOneDayMoney:this.tabMenus.filter((t=>t.value==e)).map((e=>{const t=this.tabSummaryOneDayMoney(e.value).result;return console.log("■"+t),this.timeCalcList(t,e.value)}))},allOnlySummaryOneDayMoney(){const e=[h.Work,h.Holiday,h.Income,h.FixedCost],t=Array(y.length).fill(0);return e.forEach((e=>{this.allSummaryOneDayMoney(e).shift().forEach(((e,a)=>{t[a]+=+e}))})),[t]},dateList(){let e=this.currentDate;const t=[];for(let a=0;a<this.yearDays;a++){const{result:a,names:n}=this.aggregationDateToSummaryMoney(e);t.push({view:u(e).format("YYYY/MM/DD(dd)"),value:e,money:a,names:n}),e=u(e).add(1,"day")}return t},endDate(){return u(this.currentDate).add(1,"year")},yearDays(){return+this.endDate.diff(this.currentDate,"day")},aggregationDateToSummaryMoney(){const e=+this.yearDays,t=this.tabSummaryOneDayMoney(h.Work),a=this.tabSummaryOneDayMoney(h.Holiday),n=this.periodCalc(h.Income),s=this.periodCalc(h.FixedCost),o=(e,t,a)=>{let n=0;let s=[];return[t,a].map((t=>t.result[e])).filter((e=>e)).forEach((e=>{n+=e.money||0,s=s.concat(e.names.filter((e=>0!=e.length)))})),{result:n,names:s}},r=(t,a)=>{const r=a.format("YYYY/MM/DD");let l=0;const i=e=>{const t=a.endOf("month").format("YYYY/MM/DD"),l=a.startOf("month").format("YYYY/MM/DD");let u=null;if(r==l?u=1:r==t&&(u=2),v.TwoMonth.day==e.day&&1==u){u=+a.format("M")%2}const i=e.day+"-"+u;return o(i,s,n)},m=(e,t)=>{let a=0,l=[];if(0!=e.filter((e=>e==r)).length){const e=t.day+"-0",r=o(e,s,n);a=r.result,l=r.names}return{result:a,names:l}},c=[(()=>{const e=v.Week.day+"-"+t;return o(e,s,n)})(),i(v.Month),i(v.TwoMonth),(()=>{const t=[];for(let a=Math.floor(e/2);a<e;a+=Math.floor(e/2))t.push(u(this.currentDate).add(a,"day").format("YYYY/MM/DD"));return m(t,v.HalfYear)})(),(()=>{const e=[];return e.push(this.endDate.add(-1,"day").format("YYYY/MM/DD")),m(e,v.Year)})()],y=c.map((e=>e.names.filter((e=>e&&e.length>0)).join(","))).filter((e=>""!=e));return l=c.reduce(((e,t)=>t.result+e),0),{result:l,names:y}};return e=>{const n=u(e),s=+n.day();let o=0,l=[];0==s||6==s?(o=a.result,l=l.concat(a.names)):(o=t.result,l=l.concat(t.names));const i=r(s,n);return o+=i.result,l=l.concat(i.names),{result:o,names:l}}}},watch:{tab:function(e){}},methods:{periodCalc(e){const t={};return this.timeMoneys[e].forEach((e=>{const a=e.day+"-"+e.cycle.start;t[a]||(t[a]={money:0,names:[]}),t[a].money+=e.pay(),e.name&&t[a].names.push(e.name+"("+e.pay()+"円)")})),{result:t}},total(e){return c(this.tabSummaryOneDayMoney(e).result)},timeCalcList:(e,t)=>y.map((a=>Math.round(e*m(t,a.day)))),otherNumberSet(e,t,a){this.timeMoneys[e][t].name=a.name,this.timeMoneys[e][t].money=a.money,this.timeMoneys[e][t].day=a.day,this.timeMoneys[e][t].status=a.status,this.timeMoneys[e][t].cycle.value=a.cycle.value,this.timeMoneys[e][t].cycle.start=a.cycle.start,this.timeMoneys[e][t].validFlag=a.validFlag,this.timeMoneys[e][t].iconSelect=a.iconSelect},setNumber(e,t,a){console.log("number value set..."),console.log(a);const n=a.$index;this.timeMoneys[e][n].name=a.name,this.timeMoneys[e][n].money=a.value,this.timeMoneys[e][n].validFlag=a.validFlag,this.timeMoneys[e][n].iconSelect=a.iconSelect,this.$forceUpdate()}}},r,l,!1,M,"6fefb7c8",null,null);function M(e){for(let t in f)this[t]=f[t]}var p=function(){return b.exports}();export{p as default};