"use strict";(self["webpackChunksplit"]=self["webpackChunksplit"]||[]).push([[591],{9648:function(e,t,s){s.d(t,{JT:function(){return r},ZX:function(){return n},_l:function(){return i},dP:function(){return a}});class a{constructor(e,t){this.userId=e,this.name=t}topMap(){return{userId:this.userId,name:this.name}}}class n{constructor(e,t,s,a,r,i=[]){this.userId=e,this.payer=t,this.amount=s,this.description=a,this.date=n.dateFormat(r),this.split=i}toMap(){return{isLock:!1,userId:this.userId,payer:this.payer,amount:this.amount,description:this.description,date:this.date,split:this.split}}static dateFormat(e){const t=new Intl.DateTimeFormat("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}),s=t.format(e).replace(/\//g,"-").replace(",","");return s}}class r{constructor(e,t=[]){this.name=e,this.members=t}toMap(){return{name:this.name,members:this.members}}}class i{constructor(e="",t="",s=0){this.userId=e,this.userName=t,this.splitAmount=s}}},3409:function(e,t,s){s.d(t,{A:function(){return c}});var a=s(7617),n=s(3405),r="firebase",i="11.1.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0,n.KO)(r,i,"app");const u={apiKey:void 0,authDomain:"vuetest-35344.firebaseapp.com",projectId:"vuetest-35344",storageBucket:"vuetest-35344.firebasestorage.app",messagingSenderId:"2844207119",appId:"1:2844207119:web:687837aeece2bf9eea5b7a",measurementId:"G-42LZ3K97KN"},o=(0,n.Wp)(u),l=(0,a.aU)(o);var c=l},1591:function(e,t,s){s.r(t),s.d(t,{default:function(){return m}});s(4114);var a=s(6768),n=s(144),r=s(1387),i=s(7617),u=s(9648),o=s(3409),l=s(880);const c={class:"home-container"};var d={__name:"HomeComponents",setup(e){const t=(0,n.KR)(null),s=(0,n.KR)(null),d=(0,a.WQ)("isLoading"),p=(0,r.lq)(),h=(0,n.KR)(null),m=(0,n.KR)(null);(0,a.sV)((async()=>{d.value=!0,await l.A.getProfile().then((e=>{console.log(e.displayName),t.value=e})).finally((()=>{sessionStorage.setItem("id",t.value.userId),sessionStorage.setItem("displayName",t.value.displayName)})),h.value=p.query?.g,m.value=p.query?.u,h.value&&m&&await f(!0),d.value=!1}));const v=(0,r.rd)(),f=async()=>{const e=(0,i.H9)(o.A,"241229Test",m.value),t=await(0,i.x7)(e);if(t.exists()){const e=t.data()[h.value];e.id=h.value,alert(JSON.stringify(e)),sessionStorage.setItem("currentGroup",JSON.stringify(e)),v.push("/group")}else alert("載入失敗")},g=async()=>{d.value=!0;try{const e=(0,i.H9)(o.A,"241229Test",t.value.userId),a=await(0,i.x7)(e),n=crypto.randomUUID(),r=[];r.push(new u.dP(t.value.userId,t.value.displayName).topMap()),s.value=new u.JT(`${t.value.displayName}的群組`,r),a.exists()?await(0,i.mZ)(e,{[`${n}`]:s.value.toMap()}):await(0,i.BN)(e,{[`${n}`]:s.value.toMap()}).then((()=>console.log("Data saved successfully"))).catch((e=>console.error("Error saving data:",e))),s.value={...s.value,id:n},sessionStorage.setItem("currentGroup",JSON.stringify(s.value)),v.push({path:"/group"})}catch(e){alert(e+"新增資料失敗"),d.value=!1}},y=async()=>{d.value=!0,v.push({path:"/history"})};return(e,t)=>((0,a.uX)(),(0,a.CE)("div",c,[t[0]||(t[0]=(0,a.Lk)("h1",null,"分帳輕鬆搞定",-1)),t[1]||(t[1]=(0,a.Lk)("p",null,"快速紀錄與分帳，讓金錢計算更簡單。",-1)),(0,a.Lk)("div",null,[(0,a.Lk)("button",{id:"btnCreateNew",class:"btn btn-success",onClick:g}," 建立新分帳 "),(0,a.Lk)("button",{id:"btnShowHis",class:"btn btn-success",onClick:y}," 檢視歷史紀錄 ")])]))}},p=s(1241);const h=(0,p.A)(d,[["__scopeId","data-v-fb1e6db2"]]);var m=h}}]);
//# sourceMappingURL=591.6cded027.js.map