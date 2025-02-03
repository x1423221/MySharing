"use strict";(self["webpackChunksplit"]=self["webpackChunksplit"]||[]).push([[215],{3409:function(e,t,a){a.d(t,{A:function(){return o}});var n=a(7617),s=a(3405),l="firebase",u="11.1.0";
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
(0,s.KO)(l,u,"app");const i={apiKey:void 0,authDomain:"vuetest-35344.firebaseapp.com",projectId:"vuetest-35344",storageBucket:"vuetest-35344.firebasestorage.app",messagingSenderId:"2844207119",appId:"1:2844207119:web:687837aeece2bf9eea5b7a",measurementId:"G-42LZ3K97KN"},c=(0,s.Wp)(i),r=(0,n.aU)(c);var o=r},8215:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});a(4114);var n=a(6768),s=a(4232),l=a(5130),u=a(144),i=a(1387),c=a(880),r=a(3409),o=a(7617);const v={class:"group-container"},p={class:"container-title"},d={class:"title-container"},k={key:0},b={key:1};var g={__name:"GroupComponents",setup(e){const t=(0,i.rd)(),a=(0,u.KR)(null),g=(0,u.KR)(null),m=(0,u.KR)(!1),f=(0,u.KR)("");let h;(0,n.sV)((()=>{try{h=(0,n.WQ)("isLoading");const e=JSON.parse(sessionStorage.getItem("currentGroup"));g.value=sessionStorage.getItem("id"),a.value=e,f.value=a.value.name}catch(e){alert(e)}finally{h.value=!1}}));const L=()=>{t.push("/")},y=()=>{try{c.A.shareTargetPicker([{type:"text",text:"Hi!這是給你的分帳連結"}],{isMultiple:!0}).then((function(e){e?alert(`[${e.status}] Message sent!`):alert("TargetPicker was closed!")})).catch((function(e){alert("something wrong happen"+e)}))}catch(e){alert(e)}},C=()=>{m.value=!m.value},K=async()=>{try{a.value.name=f.value;const e=(0,o.H9)(r.A,"241229Test",g.value);await(0,o.mZ)(e,{[`${a.value.id}.name`]:f.value}),m.value=!m.value}catch(e){alert(e)}};return(e,t)=>((0,n.uX)(),(0,n.CE)("div",v,[(0,n.Lk)("div",p,[(0,n.Lk)("div",d,[(0,n.Lk)("button",{id:"btnGoHome",class:"btn btn-danger d-flex align-items-center justify-content-center",onClick:L},t[1]||(t[1]=[(0,n.Lk)("i",{class:"bi bi-x-lg"},null,-1)])),a.value&&!m.value?((0,n.uX)(),(0,n.CE)("div",k,[(0,n.Lk)("span",null,(0,s.v_)(a.value.name),1),(0,n.Lk)("i",{class:"bi bi-pencil",onClick:C})])):(0,n.Q3)("",!0),a.value&&m.value?((0,n.uX)(),(0,n.CE)("div",b,[(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>f.value=e)},null,512),[[l.Jo,f.value]]),(0,n.Lk)("i",{class:"bi bi-check",onClick:K})])):(0,n.Q3)("",!0)])]),t[2]||(t[2]=(0,n.Lk)("div",{class:"row"},[(0,n.Lk)("h1",null,"帳目表")],-1)),(0,n.Lk)("button",{class:"btn btn-success",onClick:y},"分享")]))}};const m=g;var f=m}}]);
//# sourceMappingURL=215.0430903a.js.map