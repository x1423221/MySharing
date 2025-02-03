"use strict";(self["webpackChunksplit"]=self["webpackChunksplit"]||[]).push([[892],{3409:function(e,a,s){s.d(a,{A:function(){return c}});var t=s(7617),n=s(3405),o="firebase",r="11.1.0";
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
(0,n.KO)(o,r,"app");const u={apiKey:void 0,authDomain:"vuetest-35344.firebaseapp.com",projectId:"vuetest-35344",storageBucket:"vuetest-35344.firebasestorage.app",messagingSenderId:"2844207119",appId:"1:2844207119:web:687837aeece2bf9eea5b7a",measurementId:"G-42LZ3K97KN"},i=(0,n.Wp)(u),l=(0,t.aU)(i);var c=l},7892:function(e,a,s){s.r(a),s.d(a,{default:function(){return m}});s(4114);var t=s(6768),n=s(144),o=s(1387),r=s(7617);class u{constructor(e,a=[],s=[]){this.name=e,this.members=a,this.transactions=s}toMap(){return{name:this.name,members:this.members,transactions:this.transactions}}}var i=s(3409),l=s(880);const c={class:"home-container"};var p={__name:"HomeComponents",setup(e){const a=(0,n.KR)(null),s=(0,n.KR)(null),p=(0,t.WQ)("isLoading");(0,t.sV)((async()=>{p.value=!0,await l.A.getProfile().then((e=>{console.log(e.displayName),a.value=e})).finally((()=>{p.value=!1}))}));const v=(0,o.rd)(),d=async()=>{p.value=!0;try{const e=(0,r.H9)(i.A,"241229Test",a.value.userId),t=await(0,r.x7)(e),n=crypto.randomUUID();s.value=new u(`${a.value.displayName}的群組`),t.exists()?await(0,r.mZ)(e,{[`${n}`]:s.value.toMap()}):await(0,r.BN)(e,{[`${n}`]:s.value.toMap()}).then((()=>console.log("Data saved successfully"))).catch((e=>console.error("Error saving data:",e))),s.value={...s.value,id:n},sessionStorage.setItem("currentGroup",JSON.stringify(s.value)),sessionStorage.setItem("id",a.value.userId),v.push({path:"/group"})}catch(e){alert(e+"新增資料失敗"),p.value=!1}},m=async()=>{p.value=!0,sessionStorage.setItem("id",a.value.userId),v.push({path:"/history"})};return(e,a)=>((0,t.uX)(),(0,t.CE)("div",c,[a[0]||(a[0]=(0,t.Lk)("h1",null,"分帳輕鬆搞定",-1)),a[1]||(a[1]=(0,t.Lk)("p",null,"快速紀錄與分帳，讓金錢計算更簡單。",-1)),(0,t.Lk)("div",null,[(0,t.Lk)("button",{id:"btnCreateNew",class:"btn btn-success",onClick:d}," 建立新分帳 "),(0,t.Lk)("button",{id:"btnShowHis",class:"btn btn-success",onClick:m}," 檢視歷史紀錄 ")])]))}},v=s(1241);const d=(0,v.A)(p,[["__scopeId","data-v-17c036f4"]]);var m=d}}]);
//# sourceMappingURL=892.4d501134.js.map