"use strict";(self["webpackChunkproductivity_plus"]=self["webpackChunkproductivity_plus"]||[]).push([[53],{4034:function(e,a,t){t.d(a,{Z:function(){return l}});var n=t(3396),o=t(7139);function r(e,a,t,r,d,s){return(0,n.wg)(),(0,n.iD)("button",null,(0,o.zw)(t.text),1)}var d={props:{text:String}},s=t(89);const i=(0,s.Z)(d,[["render",r],["__scopeId","data-v-7f3dc646"]]);var l=i},1053:function(e,a,t){t.r(a),t.d(a,{default:function(){return g}});var n=t(3396),o=t(7139),r=t(9242);const d=e=>((0,n.dD)("data-v-588fd3dc"),e=e(),(0,n.Cn)(),e),s={class:"planner-header"},i=d((()=>(0,n._)("h1",null,"Week Planner",-1))),l={key:0,style:{color:"black"},class:"my-auto"},c={key:1,style:{color:"red"},class:"my-auto"},u={class:"week-planner"},y={class:"day-container"},w=["onUpdate:modelValue"];function v(e,a,t,d,v,k){const p=(0,n.up)("Button");return(0,n.wg)(),(0,n.iD)("div",null,[(0,n._)("div",s,[i,v.info?((0,n.wg)(),(0,n.iD)("div",l,(0,o.zw)(v.info),1)):(0,n.kq)("",!0),v.error?((0,n.wg)(),(0,n.iD)("div",c,(0,o.zw)(v.error),1)):(0,n.kq)("",!0),(0,n.Wm)(p,{text:"Save",onClick:a[0]||(a[0]=e=>k.savePlanner())})]),(0,n._)("div",u,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(v.weekData,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e.id},[(0,n._)("div",y,[(0,n._)("div",{class:"day",style:(0,o.j5)({backgroundColor:e.color,border:e.id===v.weekData.find((e=>e.name===v.today)).id?"5px solid lightgrey":""})},(0,o.zw)(e.name),5),(0,n.wy)((0,n._)("textarea",{rows:"5","onUpdate:modelValue":a=>e.text=a},null,8,w),[[r.nr,e.text]])])])))),128))])])}var k=t(7749),p=t(4034),f=t(23),h={components:{FontAwesomeIcon:k.GN,Button:p.Z},data(){return{today:(new Date).getDay(),weekData:[],info:"",error:""}},computed:{},mounted(){f.j.get("/api/v1/week-planner").then((e=>{if(e.data.today&&e.data.weekData){this.today=e.data.today;const a={Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6,Sunday:7,Notes:8};this.weekData=[...e.data.weekData.filter((e=>a[e.name]>=a[this.today]&&"Notes"!==e.name)),...e.data.weekData.filter((e=>a[e.name]<a[this.today]&&"Notes"!==e.name)),...e.data.weekData.filter((e=>"Notes"===e.name))]}})).catch((e=>console.log(e)))},methods:{savePlanner(){f.j.put("/api/v1/week-planner",this.weekData.map((e=>({name:e.name,text:e.text})))).then((()=>{this.info="Data Saved Successfully"})).catch((e=>{console.log(e),this.error="An Error occurred while saving the data"}))}}},m=t(89);const D=(0,m.Z)(h,[["render",v],["__scopeId","data-v-588fd3dc"]]);var g=D}}]);
//# sourceMappingURL=53.3a742414.js.map