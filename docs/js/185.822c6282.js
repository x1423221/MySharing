"use strict";(self["webpackChunksplit"]=self["webpackChunksplit"]||[]).push([[185],{9648:function(e,t,a){a.d(t,{JT:function(){return r},ZX:function(){return n},_l:function(){return i},dP:function(){return s}});class s{constructor(e,t){this.userId=e,this.name=t}topMap(){return{userId:this.userId,name:this.name}}}class n{constructor(e,t,a,s,r,i=[]){this.userId=e,this.payer=t,this.amount=a,this.description=s,this.date=n.dateFormat(r),this.split=i}toMap(){return{isLock:!1,userId:this.userId,payer:this.payer,amount:this.amount,description:this.description,date:this.date,split:this.split}}static dateFormat(e){const t=new Intl.DateTimeFormat("zh-TW",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1}),a=t.format(e).replace(/\//g,"-").replace(",","");return a}}class r{constructor(e,t=[]){this.name=e,this.members=t}toMap(){return{name:this.name,members:this.members}}}class i{constructor(e="",t="",a=0){this.userId=e,this.userName=t,this.splitAmount=a}}},3409:function(e,t,a){a.d(t,{A:function(){return l}});var s=a(7617),n=a(3405),r="firebase",i="11.1.0";
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
(0,n.KO)(r,i,"app");const u={apiKey:void 0,authDomain:"vuetest-35344.firebaseapp.com",projectId:"vuetest-35344",storageBucket:"vuetest-35344.firebasestorage.app",messagingSenderId:"2844207119",appId:"1:2844207119:web:687837aeece2bf9eea5b7a",measurementId:"G-42LZ3K97KN"},o=(0,n.Wp)(u),c=(0,s.aU)(o);var l=c},6185:function(e,t,a){a.r(t),a.d(t,{default:function(){return m}});a(4114),a(8992),a(2577);var s=a(6768),n=a(144),r=a(1387),i=a(7617),u=a(9648),o=a(3409),c=a(880);const l={class:"home-container"};var d={__name:"HomeComponents",setup(e){const t=(0,s.WQ)("isLoading"),a=(0,s.WQ)("profile"),d=(0,s.WQ)("currentGroup"),p=(0,n.KR)({}),h=(0,r.lq)(),m=(0,n.KR)(null),v=(0,r.rd)();(0,s.sV)((async()=>{t.value=!0,await c.A.getProfile().then((e=>{a.value=e})),m.value=h.query.s,m.value&&await w(),t.value=!1}));const w=async()=>{try{const t=(0,i.H9)(o.A,"TokenList",m.value),s=await(0,i.x7)(t);if(s.exists()){const n=s.data(),r=new Date(1e3*n.date.seconds),c=new Date,l=new Date(r),p=n.fid,h=n.docId;l.setDate(l.getDate()+1),c>l&&(alert("連結已過期"),await(0,i.kd)(t),window.close());const m=(0,i.H9)(o.A,"241229Test",h),w=await(0,i.x7)(m);if(w.exists()){const t=w.data()[p],s=t.members.find((e=>e.userId===a.value.userId));if(s){try{t.members.push(new u.dP(a.value.userId,a.value.displayName))}catch(e){alert(e)}await(0,i.mZ)(m,{[`${p}.members`]:(0,i.hq)(new u.dP(a.value.userId,a.value.displayName).topMap())})}t.did=h,t.id=p,d.value=t,v.push("/group")}}else alert("連結已失效"),window.close()}catch(e){alert(e)}},f=async()=>{t.value=!0;try{const e=(0,i.H9)(o.A,"241229Test",a.value.userId),t=await(0,i.x7)(e),s=crypto.randomUUID(),n=[];n.push(new u.dP(a.value.userId,a.value.displayName).topMap()),p.value=new u.JT(`${a.value.displayName}的群組`,n),t.exists()?await(0,i.mZ)(e,{[`${s}`]:p.value.toMap()}):await(0,i.BN)(e,{[`${s}`]:p.value.toMap()}).then((()=>console.log("Data saved successfully"))).catch((e=>console.error("Error saving data:",e))),p.value={...p.value,id:s,did:a.value.userId},d.value=p.value,v.push({path:"/group"})}catch(e){alert(e+"新增資料失敗"),t.value=!1}},b=async()=>{t.value=!0,v.push({path:"/history"})};return(e,t)=>((0,s.uX)(),(0,s.CE)("div",l,[t[0]||(t[0]=(0,s.Lk)("h1",null,"分帳輕鬆搞定",-1)),t[1]||(t[1]=(0,s.Lk)("p",null,"快速紀錄與分帳，讓金錢計算更簡單。",-1)),(0,s.Lk)("div",null,[(0,s.Lk)("button",{id:"btnCreateNew",class:"btn btn-success",onClick:f}," 建立新分帳 "),(0,s.Lk)("button",{id:"btnShowHis",class:"btn btn-success",onClick:b}," 檢視歷史紀錄 ")])]))}},p=a(1241);const h=(0,p.A)(d,[["__scopeId","data-v-5c9988d0"]]);var m=h}}]);
//# sourceMappingURL=185.822c6282.js.map