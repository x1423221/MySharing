"use strict";(self["webpackChunksplit"]=self["webpackChunksplit"]||[]).push([[935],{3935:function(e,s,a){a.r(s),a.d(s,{default:function(){return k}});a(4114);var t=a(6768),n=a(144),o=a(1387),r=a(7617);class u{constructor(e,s=[],a=[]){this.name=e,this.members=s,this.transactions=a}toMap(){return{name:this.name,members:this.members,transactions:this.transactions}}}var c=a(3405),l="firebase",i="11.1.0";
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
(0,c.KO)(l,i,"app");const p={apiKey:void 0,authDomain:"vuetest-35344.firebaseapp.com",projectId:"vuetest-35344",storageBucket:"vuetest-35344.firebasestorage.app",messagingSenderId:"2844207119",appId:"1:2844207119:web:687837aeece2bf9eea5b7a",measurementId:"G-42LZ3K97KN"},d=(0,c.Wp)(p),v=(0,r.aU)(d);var m=v,h=a(880);const b={class:"home-container"};var g={__name:"HomeComponents",setup(e){const s=(0,n.KR)(null),a=(0,n.KR)(null),c=(0,t.WQ)("isLoading");(0,t.sV)((async()=>{c.value=!0,await h.A.getProfile().then((e=>{console.log(e.displayName),s.value=e})).finally((()=>{c.value=!1}))}));const l=(0,o.rd)(),i=async()=>{c.value=!0;try{const e=(0,r.H9)(m,"241229Test",s.value.userId),t=await(0,r.x7)(e);a.value=new u(`${s.value.displayName}的群組`),t.exists()?await(0,r.mZ)(e,{[crypto.randomUUID()]:a.value.toMap()}):await(0,r.BN)(e,{[crypto.randomUUID()]:a.value.toMap()}).then((()=>console.log("Data saved successfully"))).catch((e=>console.error("Error saving data:",e))),sessionStorage.setItem("currentGroup",a.value),sessionStorage.setItem("id",s.value.userId)}catch(e){console.log(e+"新增資料失敗")}l.push({path:"/group"})},p=async()=>{c.value=!0,sessionStorage.setItem("id",s.value.userId),l.push({path:"/history"})};return(e,s)=>((0,t.uX)(),(0,t.CE)("div",b,[s[0]||(s[0]=(0,t.Lk)("h1",null,"分帳輕鬆搞定",-1)),s[1]||(s[1]=(0,t.Lk)("p",null,"快速紀錄與分帳，讓金錢計算更簡單。",-1)),(0,t.Lk)("div",null,[(0,t.Lk)("button",{id:"btnCreateNew",class:"btn btn-success",onClick:i}," 建立新分帳 "),(0,t.Lk)("button",{id:"btnShowHis",class:"btn btn-success",onClick:p}," 檢視歷史紀錄 ")])]))}},I=a(1241);const f=(0,I.A)(g,[["__scopeId","data-v-378b7d7e"]]);var k=f}}]);
//# sourceMappingURL=935.f790c489.js.map