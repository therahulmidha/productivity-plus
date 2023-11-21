"use strict";(self["webpackChunkproductivity_plus"]=self["webpackChunkproductivity_plus"]||[]).push([[697],{7697:function(e,t,s){s.r(t),s.d(t,{default:function(){return oe}});var i=s(3396),n=s(7139);const r=e=>((0,i.dD)("data-v-3323e104"),e=e(),(0,i.Cn)(),e),a={class:"d-flex justify-content-between"},o=r((()=>(0,i._)("h1",{class:"my-auto"},"Exercise Scheduler",-1))),d={key:0,class:"my-auto",style:{color:"black"}},l={key:1,class:"my-auto",style:{color:"red"}},c=["disabled"],u={class:"scheduler d-flex flex-wrap justify-content-evenly"},h={class:"col-md-4 mx-2 d-inline-block my-5"},m={class:"d-flex justify-content-between"},x=r((()=>(0,i._)("h3",null,"Exercises",-1))),p=["disabled"],g={class:"table table-hover"},b=r((()=>(0,i._)("thead",null,[(0,i._)("tr",null,[(0,i._)("th",{scope:"col"},"Name"),(0,i._)("th",{scope:"col"},"Duration"),(0,i._)("th",{scope:"col"},"Break"),(0,i._)("th",{scope:"col"}),(0,i._)("th",{scope:"col"})])],-1))),k={class:"exercise-container"},y=["onClick"],v=["onClick"],_={key:0},E=r((()=>(0,i._)("p",{class:"text-center"},"No Exercises Added Yet!",-1))),f=[E],D={class:"col-md-6 mx-auto"},w={key:0,class:"exercise-start-info"},C={key:1,class:"exercise-name"},S={key:2,class:"exercise-duration"};function T(e,t,s,r,E,T){const A=(0,i.up)("ExerciseAddEditModal"),I=(0,i.up)("ExerciseDeleteModal"),M=(0,i.up)("font-awesome-icon");return(0,i.wg)(),(0,i.iD)("div",null,[E.modalAction?((0,i.wg)(),(0,i.j4)(A,{key:0,action:E.modalAction,data:E.currentExerciseData,onSaveExercise:T.saveExercise,onClose:T.closeModal},null,8,["action","data","onSaveExercise","onClose"])):(0,i.kq)("",!0),E.deletionId?((0,i.wg)(),(0,i.j4)(I,{key:1,deletionId:E.deletionId,onConfirmDelete:T.confirmDeletion},null,8,["deletionId","onConfirmDelete"])):(0,i.kq)("",!0),(0,i._)("div",a,[o,E.info?((0,i.wg)(),(0,i.iD)("div",d,(0,n.zw)(E.info),1)):(0,i.kq)("",!0),E.error?((0,i.wg)(),(0,i.iD)("div",l,(0,n.zw)(E.error),1)):(0,i.kq)("",!0),(0,i._)("button",{class:"btn btn-success my-auto",onClick:t[0]||(t[0]=e=>T.toggleStart()),disabled:!E.exercises.length},(0,n.zw)(E.started?"Stop":"Start"),9,c)]),(0,i._)("div",u,[(0,i._)("div",h,[(0,i._)("div",m,[x,(0,i._)("button",{type:"button",onClick:t[1]||(t[1]=e=>T.openModal("Add")),class:"btn btn-primary my-auto",disabled:E.started}," Add ",8,p)]),(0,i._)("table",g,[b,((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(E.exercises,(e=>((0,i.wg)(),(0,i.iD)("tbody",{key:e.id},[(0,i._)("tr",k,[(0,i._)("td",null,(0,n.zw)(e.name),1),(0,i._)("td",null,(0,n.zw)(e.duration),1),(0,i._)("td",null,(0,n.zw)(e.break),1),(0,i._)("td",{onClick:t=>T.openModal("Edit",e)},[(0,i.Wm)(M,{icon:"fa-solid fa-edit"})],8,y),(0,i._)("td",{onClick:t=>T.openDeleteModal(e.id)},[(0,i.Wm)(M,{icon:"fa-solid fa-trash"})],8,v)])])))),128))]),E.exercises.length?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",_,f))]),(0,i._)("div",D,[E.started?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",w,(0,n.zw)(E.displayMessage),1)),E.started?((0,i.wg)(),(0,i.iD)("div",C,(0,n.zw)(E.runningExerciseName),1)):(0,i.kq)("",!0),E.started?((0,i.wg)(),(0,i.iD)("div",S,(0,n.zw)(E.runningExerciseDuration),1)):(0,i.kq)("",!0)])])])}s(7658);var A=s(9242);const I={key:0,class:"modal",tabindex:"-1",role:"dialog",style:{display:"block"}},M={class:"modal-dialog",role:"document"},q={class:"modal-content"},z={class:"modal-header"},j={class:"modal-title"},N=(0,i._)("span",{"aria-hidden":"true"},"×",-1),Q=[N],B={class:"modal-body"},$={key:0,style:{color:"red"}},O={class:"modal-footer"};function U(e,t,s,r,a,o){return a.modalAction?((0,i.wg)(),(0,i.iD)("div",I,[(0,i._)("div",M,[(0,i._)("div",q,[(0,i._)("div",z,[(0,i._)("h5",j,(0,n.zw)(a.modalAction)+" Exercise",1),(0,i._)("button",{type:"button",class:"close btn btn-lg","data-dismiss":"modal","aria-label":"Close",onClick:t[0]||(t[0]=t=>e.$emit("close"))},Q)]),(0,i._)("div",B,[(0,i.wy)((0,i._)("input",{placeholder:"Name",class:"form-control my-3","onUpdate:modelValue":t[1]||(t[1]=e=>a.name=e)},null,512),[[A.nr,a.name]]),(0,i.wy)((0,i._)("input",{placeholder:"Duration (mm:ss)",class:"form-control my-3","onUpdate:modelValue":t[2]||(t[2]=e=>a.duration=e)},null,512),[[A.nr,a.duration]]),(0,i.wy)((0,i._)("input",{placeholder:"Break (seconds)",class:"form-control my-3","onUpdate:modelValue":t[3]||(t[3]=e=>a.breakTime=e)},null,512),[[A.nr,a.breakTime]]),a.error?((0,i.wg)(),(0,i.iD)("div",$,(0,n.zw)(a.error),1)):(0,i.kq)("",!0)]),(0,i._)("div",O,[(0,i._)("button",{type:"button",class:"btn btn-primary",onClick:t[4]||(t[4]=e=>o.saveChanges())}," Save "),(0,i._)("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal",onClick:t[5]||(t[5]=t=>e.$emit("close"))}," Close ")])])])])):(0,i.kq)("",!0)}var V={name:"ExerciseAddEditModal",props:{action:String,data:{type:Object,default:{}}},data(){return{modalAction:this.action,id:this.data.id||"",name:this.data.name||"",duration:this.data.duration||"",breakTime:this.data.break||0,error:""}},methods:{saveChanges(){this.name&&this.duration?this.duration.match(/\d\d:\d\d/)?(this.error="",this.$emit("save-exercise",{name:this.name,duration:this.duration,break:this.breakTime,id:this.id})):this.error="Duration should be in format: mm:ss":this.error="Exercise name and duration are mandatory"}}},W=s(89);const Y=(0,W.Z)(V,[["render",U]]);var Z=Y;const H={key:0,class:"modal",tabindex:"-1",role:"dialog",style:{display:"block"}},K={class:"modal-dialog",role:"document"},F={class:"modal-content"},G={class:"modal-header"},J=(0,i._)("h5",{class:"modal-title"},"Delete Exercise",-1),L=(0,i._)("span",{"aria-hidden":"true"},"×",-1),P=[L],R=(0,i._)("div",{class:"modal-body"}," Are you sure you want to delete this exercise? ",-1),X={class:"modal-footer"};function ee(e,t,s,n,r,a){return s.deletionId?((0,i.wg)(),(0,i.iD)("div",H,[(0,i._)("div",K,[(0,i._)("div",F,[(0,i._)("div",G,[J,(0,i._)("button",{type:"button",class:"close btn btn-lg","data-dismiss":"modal","aria-label":"Close",onClick:t[0]||(t[0]=e=>a.deleteExercise(!1))},P)]),R,(0,i._)("div",X,[(0,i._)("button",{type:"button",class:"btn btn-primary",onClick:t[1]||(t[1]=e=>a.deleteExercise(!0))}," Yes "),(0,i._)("button",{type:"button",class:"btn btn-secondary","data-dismiss":"modal",onClick:t[2]||(t[2]=e=>a.deleteExercise(!1))}," Close ")])])])])):(0,i.kq)("",!0)}var te={name:"ExerciseAddEditModal",props:{deletionId:String},methods:{deleteExercise(e){this.$emit("confirm-delete",e)}}};const se=(0,W.Z)(te,[["render",ee]]);var ie=se,ne=s(23),re={components:{ExerciseAddEditModal:Z,ExerciseDeleteModal:ie},data(){return{exercises:[],noOfExercises:0,error:"",info:"",modalAction:"",currentExerciseData:{},deletionId:null,displayMessage:"",started:!1,runningExerciseName:"",runningExerciseDuration:null,runningTimeInSeconds:null,exerciseQueue:[],exerciseTimeout:null,sounds:{break:new Audio(s(2274)),startExercise:new Audio(s(7640))}}},mounted(){ne.j.get("/api/v1/exercises").then((e=>{e.data.length&&(this.exercises=e.data,this.displayMessage=0===this.exercises.length?"Add exercises to start a schedule!":"Click the start button to start the schedule.")})).catch((e=>console.log(e)))},watch:{runningTimeInSeconds(e,t){0===e?this.exerciseQueue.length?this.prepareNextExerciseData():(this.started=!1,this.runningExerciseName="",this.runningExerciseDuration=null,this.runningTimeInSeconds=null,this.displayMessage="Well Done!"):this.exerciseTimeout=setTimeout((()=>{this.runningTimeInSeconds--,this.runningExerciseDuration=this.convertSecondsToStringTime(this.runningTimeInSeconds)}),1e3)},noOfExercises(e){e?e>0&&(this.displayMessage="Click the start button to start the schedule."):this.displayMessage="Add exercises to start a schedule!"}},methods:{convertSecondsToStringTime(e){if(e>60){const t=Math.floor(e/60);return this.getDoubleDigitString(t)+":"+this.getDoubleDigitString(e%60)}return"00:"+this.getDoubleDigitString(e)},getDoubleDigitString(e){return e<10?"0"+e:e},prepareNextExerciseData(){const e=this.exerciseQueue[0];this.runningExerciseName=e.name,this.runningExerciseDuration=e.duration,this.runningTimeInSeconds=60*+this.runningExerciseDuration.split(":")[0]+ +this.runningExerciseDuration.split(":")[1],e.isBreak?this.sounds.break.play():this.sounds.startExercise.play(),this.exerciseQueue.splice(0,1)},toggleStart(){this.started=!this.started,this.started?(this.exercises.forEach((e=>{this.exerciseQueue.push({name:e.name,duration:e.duration,isBreak:!1}),e.break&&this.exerciseQueue.push({name:"Break",duration:this.convertSecondsToStringTime(e.break),isBreak:!0})})),this.prepareNextExerciseData()):(this.exerciseQueue=[],clearTimeout(this.exerciseTimeout))},openDeleteModal(e){this.deletionId=e},confirmDeletion(e){if(!e)return void(this.deletionId=null);const t=this.exercises.findIndex((e=>e.id===this.deletionId));-1!==t&&ne.j.delete(`/api/v1/exercises/${this.deletionId}`).then((e=>{204===e.status?(this.exercises.splice(t,1),this.noOfExercises=this.exercises.length):(this.error="Error Deleting the exercise!",setTimeout((()=>{this.error=""}),2e3))})).catch((e=>console.log(e))),this.deletionId=null},openModal(e,t){this.modalAction=e,t&&(this.currentExerciseData=t)},closeModal(){this.modalAction=""},saveExercise(e){this.modalAction="";const t=this.exercises.findIndex((t=>t.id===e.id));-1!==t?ne.j.put(`/api/v1/exercises/${this.exercises[t].id}`,e).then((s=>{204===s.status?(this.exercises[t].name=e.name,this.exercises[t].duration=e.duration,this.exercises[t].break=e.break):(this.error="Error Updating the exercise!",setTimeout((()=>{this.error=""}),2e3))})).catch((e=>console.log(e))):ne.j.post("/api/v1/exercises",e).then((e=>{e.data.id?(this.exercises.push(e.data),this.noOfExercises=this.exercises.length):(this.error="Error Adding the exercise!",setTimeout((()=>{this.error=""}),2e3))})).catch((e=>console.log(e)))}}};const ae=(0,W.Z)(re,[["render",T],["__scopeId","data-v-3323e104"]]);var oe=ae},2274:function(e,t,s){e.exports=s.p+"media/break_bell.f7f9d88c.mp3"},7640:function(e,t,s){e.exports=s.p+"media/start_exercise.913a71fc.wav"}}]);
//# sourceMappingURL=697.1574fde9.js.map