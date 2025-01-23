"use strict";(self["webpackChunksplit"]=self["webpackChunksplit"]||[]).push([[724],{2724:function(e,a,s){s.r(a),s.d(a,{default:function(){return k}});s(4114);var t=s(6768),n=s(144),o=s(1387),r=s(7617);class u{constructor(e,a=[],s=[]){this.name=e,this.members=a,this.transactions=s}toMap(){return{name:this.name,members:this.members,transactions:this.transactions}}}var c=s(3405),l="firebase",i="11.1.0";
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
(0,c.KO)(l,i,"app");const p={apiKey:void 0,authDomain:"vuetest-35344.firebaseapp.com",projectId:"vuetest-35344",storageBucket:"vuetest-35344.firebasestorage.app",messagingSenderId:"2844207119",appId:"1:2844207119:web:687837aeece2bf9eea5b7a",measurementId:"G-42LZ3K97KN"},d=(0,c.Wp)(p),v=(0,r.aU)(d);var m=v,h=s(880);const b={class:"home-container"};var f={__name:"HomeComponents",setup(e){const a=(0,n.KR)(null),s=(0,n.KR)(null),c=(0,t.WQ)("isLoading");(0,t.sV)((async()=>{c.value=!0,await h.A.getProfile().then((e=>{console.log(e.displayName),a.value=e})).finally((()=>{c.value=!1}))}));const l=(0,o.rd)(),i=async()=>{c.value=!0;try{const e=(0,r.H9)(m,"241229Test",a.value.userId),t=await(0,r.x7)(e);s.value=new u(`${a.value.displayName}的群組`),t.exists()?await(0,r.mZ)(e,{[crypto.randomUUID()]:s.value.toMap()}):await(0,r.BN)(e,{[crypto.randomUUID()]:s.value.toMap()}).then((()=>console.log("Data saved successfully"))).catch((e=>console.error("Error saving data:",e))),sessionStorage.setItem("currentGroup",s.value.toMap())}catch(e){console.log(e+"新增資料失敗")}l.push({path:"/group",query:{id:a.value.userId}})},p=async()=>{c.value=!0,l.push({path:"/history",query:{id:a.value.userId}})};return(e,a)=>((0,t.uX)(),(0,t.CE)("div",b,[a[0]||(a[0]=(0,t.Lk)("h1",null,"分帳輕鬆搞定",-1)),a[1]||(a[1]=(0,t.Lk)("p",null,"快速紀錄與分帳，讓金錢計算更簡單。",-1)),(0,t.Lk)("div",null,[(0,t.Lk)("button",{id:"btnCreateNew",class:"btn btn-success",onClick:i}," 建立新分帳 "),(0,t.Lk)("button",{id:"btnShowHis",class:"btn btn-success",onClick:p}," 檢視歷史紀錄 ")])]))}},y=s(1241);const g=(0,y.A)(f,[["__scopeId","data-v-59f8df55"]]);var k=g}}]);
//# sourceMappingURL=724.b20d902a.js.map