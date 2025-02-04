"use strict";(self["webpackChunksplit"]=self["webpackChunksplit"]||[]).push([[215],{9648:function(t,e,a){a.d(e,{JT:function(){return n},ZX:function(){return s}});class s{constructor(t,e,a,s,n,i,l=[]){this.id=t,this.userid=e,this.payer=a,this.amount=s,this.description=n,this.date=i,this.split=l}toMap(){return{isLock:!1,id:this.id,userid:this.userid,payer:this.payer,amount:this.amount,description:this.description,date:this.date,split:this.split}}}class n{constructor(t,e=[],a=[]){this.name=t,this.members=e,this.transactions=a}toMap(){return{name:this.name,members:this.members,transactions:this.transactions}}}},3409:function(t,e,a){a.d(e,{A:function(){return o}});var s=a(7617),n=a(3405),i="firebase",l="11.1.0";
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
(0,n.KO)(i,l,"app");const u={apiKey:void 0,authDomain:"vuetest-35344.firebaseapp.com",projectId:"vuetest-35344",storageBucket:"vuetest-35344.firebasestorage.app",messagingSenderId:"2844207119",appId:"1:2844207119:web:687837aeece2bf9eea5b7a",measurementId:"G-42LZ3K97KN"},c=(0,n.Wp)(u),r=(0,s.aU)(c);var o=r},8215:function(t,e,a){a.r(e),a.d(e,{default:function(){return f}});a(4114);var s=a(6768),n=a(4232),i=a(5130),l=a(144),u=a(1387),c=a(880),r=a(3409),o=a(7617),v=a(9648);const p={class:"group-container"},d={class:"container-title"},h={class:"title-container"},m={key:0},k={key:1};var b={__name:"GroupComponents",setup(t){const e=(0,u.rd)(),a=(0,l.KR)(null),b=(0,l.KR)(null),g=(0,l.KR)(""),f=(0,l.KR)(!1),y=(0,l.KR)(""),L=(0,l.KR)([]);let w;(0,s.sV)((()=>{try{w=(0,s.WQ)("isLoading");const t=JSON.parse(sessionStorage.getItem("currentGroup"));alert(JSON.stringify(t)),b.value=sessionStorage.getItem("id"),g.value=sessionStorage.getItem("displayName"),a.value=t,y.value=a.value.name,L.value=a.value.transactions}catch(t){alert(t)}finally{w.value=!1}}));const C=()=>{e.push("/")},K=()=>{try{c.A.shareTargetPicker([{type:"text",text:"Hi!這是給你的分帳連結"}],{isMultiple:!0}).then((function(t){t?alert(`[${t.status}] Message sent!`):alert("TargetPicker was closed!")})).catch((function(t){alert("something wrong happen"+t)}))}catch(t){alert(t)}},I=()=>{f.value=!f.value},x=async()=>{try{w.value=!0,a.value.name=y.value;const t=(0,o.H9)(r.A,"241229Test",b.value);await(0,o.mZ)(t,{[`${a.value.id}.name`]:y.value}),f.value=!f.value,w.value=!1}catch(t){alert(t)}},R=async()=>{const t=crypto.randomUUID(),e=new v.ZX(t,b.value,g.value,0,g.value+"創建",new Date).toMap();try{w.value=!0;const s=(0,o.H9)(r.A,"transactionList",a.value.id);await(0,o.BN)(s,{[`${a.value.id}`]:e});const n=(0,o.H9)(r.A,"241229Test",b.value);await(0,o.mZ)(n,{[`${a.value.id}.transactions`]:(0,o.hq)(t)}),w.value=!1}catch(s){alert(s)}};return(t,e)=>((0,s.uX)(),(0,s.CE)("div",p,[(0,s.Lk)("div",d,[(0,s.Lk)("div",h,[(0,s.Lk)("button",{id:"btnGoHome",class:"btn btn-danger d-flex align-items-center justify-content-center",onClick:C},e[1]||(e[1]=[(0,s.Lk)("i",{class:"bi bi-x-lg"},null,-1)])),a.value&&!f.value?((0,s.uX)(),(0,s.CE)("div",m,[(0,s.Lk)("span",null,(0,n.v_)(a.value.name),1),(0,s.Lk)("i",{class:"bi bi-pencil",onClick:I})])):(0,s.Q3)("",!0),a.value&&f.value?((0,s.uX)(),(0,s.CE)("div",k,[(0,s.bo)((0,s.Lk)("input",{type:"text",style:{width:"150px"},"onUpdate:modelValue":e[0]||(e[0]=t=>y.value=t)},null,512),[[i.Jo,y.value]]),(0,s.Lk)("i",{class:"bi bi-check-circle",onClick:x}),(0,s.Lk)("i",{class:"bi bi-x-circle",onClick:I})])):(0,s.Q3)("",!0)])]),e[2]||(e[2]=(0,s.Lk)("div",{class:"row"},[(0,s.Lk)("h3",null,"帳目列表")],-1)),e[3]||(e[3]=(0,s.Lk)("div",{class:"row"},[(0,s.Lk)("h3",null,"即時統計"),(0,s.Lk)("div")],-1)),(0,s.Lk)("button",{class:"btn btn-success",onClick:K},"分享"),(0,s.Lk)("button",{class:"btn btn-success",onClick:R},"新增帳目")]))}};const g=b;var f=g}}]);
//# sourceMappingURL=215.845f7c5d.js.map