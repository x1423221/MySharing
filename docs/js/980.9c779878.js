"use strict";(self["webpackChunksplit"]=self["webpackChunksplit"]||[]).push([[980],{9648:function(t,e,s){s.d(e,{JT:function(){return n},ZX:function(){return a}});class a{constructor(t,e,s,a,n,i,r=[]){this.id=t,this.userid=e,this.payer=s,this.amount=a,this.description=n,this.date=i,this.split=r}toMap(){return{isLock:!1,id:this.id,userid:this.userid,payer:this.payer,amount:this.amount,description:this.description,date:this.date,split:this.split}}}class n{constructor(t,e=[],s=[]){this.name=t,this.members=e,this.transactions=s}toMap(){return{name:this.name,members:this.members,transactions:this.transactions}}}},3409:function(t,e,s){s.d(e,{A:function(){return l}});var a=s(7617),n=s(3405),i="firebase",r="11.1.0";
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
(0,n.KO)(i,r,"app");const o={apiKey:void 0,authDomain:"vuetest-35344.firebaseapp.com",projectId:"vuetest-35344",storageBucket:"vuetest-35344.firebasestorage.app",messagingSenderId:"2844207119",appId:"1:2844207119:web:687837aeece2bf9eea5b7a",measurementId:"G-42LZ3K97KN"},u=(0,n.Wp)(o),c=(0,a.aU)(u);var l=c},1980:function(t,e,s){s.r(e),s.d(e,{default:function(){return m}});s(4114);var a=s(6768),n=s(144),i=s(1387),r=s(7617),o=s(9648),u=s(3409),c=s(880);const l={class:"home-container"};var p={__name:"HomeComponents",setup(t){const e=(0,n.KR)(null),s=(0,n.KR)(null),p=(0,a.WQ)("isLoading");(0,a.sV)((async()=>{p.value=!0,await c.A.getProfile().then((t=>{console.log(t.displayName),e.value=t})).finally((()=>{p.value=!1,sessionStorage.setItem("id",e.value.userId),sessionStorage.setItem("displayName",e.value.displayName)}))}));const d=(0,i.rd)(),h=async()=>{p.value=!0;try{const t=(0,r.H9)(u.A,"241229Test",e.value.userId),a=await(0,r.x7)(t),n=crypto.randomUUID();s.value=new o.JT(`${e.value.displayName}的群組`),a.exists()?await(0,r.mZ)(t,{[`${n}`]:s.value.toMap()}):await(0,r.BN)(t,{[`${n}`]:s.value.toMap()}).then((()=>console.log("Data saved successfully"))).catch((t=>console.error("Error saving data:",t))),s.value={...s.value,id:n},sessionStorage.setItem("currentGroup",JSON.stringify(s.value)),d.push({path:"/group"})}catch(t){alert(t+"新增資料失敗"),p.value=!1}},m=async()=>{p.value=!0,d.push({path:"/history"})};return(t,e)=>((0,a.uX)(),(0,a.CE)("div",l,[e[0]||(e[0]=(0,a.Lk)("h1",null,"分帳輕鬆搞定",-1)),e[1]||(e[1]=(0,a.Lk)("p",null,"快速紀錄與分帳，讓金錢計算更簡單。",-1)),(0,a.Lk)("div",null,[(0,a.Lk)("button",{id:"btnCreateNew",class:"btn btn-success",onClick:h}," 建立新分帳 "),(0,a.Lk)("button",{id:"btnShowHis",class:"btn btn-success",onClick:m}," 檢視歷史紀錄 ")])]))}},d=s(1241);const h=(0,d.A)(p,[["__scopeId","data-v-3fd6888e"]]);var m=h}}]);
//# sourceMappingURL=980.9c779878.js.map