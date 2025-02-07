<template>
  <div class="home-container">
    <h1>分帳輕鬆搞定</h1>
    <p>快速紀錄與分帳，讓金錢計算更簡單。</p>
    <div>
      <button id="btnCreateNew" class="btn btn-success" @click="gotoGroupPage">
        建立新分帳
      </button>
      <button id="btnShowHis" class="btn btn-success" @click="gotoHistoryPage">
        檢視歷史紀錄
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { SplitData, Member } from "../Models/SplitModels";

import db from "../firebase/config";
import liff from "@line/liff";

//讀取旗標，用inject取得父元件定義的資料
const isLoading = inject("isLoading");

//LINE使用者資訊
const profile = ref(null);

//分帳資料
const splitData = ref(null);

//route用於切換至Group或者History
const route = useRoute();

//從get方式取得的文件id跟欄位id
//文件id取得的方式後續要再改
//現在使用get方式取得網址上的參數
//因為文件id就是uid
//後續預計調整成分享頁面會給guid
//然後寫入一個欄位guid存放uId、fId等這樣網址就不會存放機敏資料了!
const fId = ref(null);
const uId = ref(null);
const router = useRouter();

//Vue元件開始註冊時
onMounted(async () => {
  //設定讀取標籤為true，表示載入中，頁面反灰不可使用
  isLoading.value = true;
  //使用Liff方法取得目前登入使用者的資料
  await liff
    .getProfile()
    .then((value) => {
      //設定取得的資料
      profile.value = value;
    })
    .finally(() => {
      //將id、name 存在provide
      provide("userData", profile.value);
    });

  //嘗試抓取進入網址的參數，如果有表示他是從分享連結進來的
  fId.value = route.query?.g;
  uId.value = route.query?.u;
  if (fId.value && uId.value) {
    //根據傳進來的資料作處理
    await HasPGotoGroupPage(true);
  }

  //解除讀取狀態
  isLoading.value = false;
});

//如果是帶參數進入方式
const HasPGotoGroupPage = async () => {
  //根據uid、fid取得對應的資料
  const docRef = doc(db, "241229Test", uId.value);
  const docSnap = await getDoc(docRef);

  //如果有存在對應的文件
  if (docSnap.exists()) {
    //那就將對應欄位的值抓出來
    const fieldValue = docSnap.data()[fId.value];
    fieldValue.id = fId.value;

    //判斷欄位資料的建立者是否等於目前登入者
    const existsMember = fieldValue.members.find((record) => {
      return record.userId === profile.value.userId;
    });

    //如果不是，那就將現在這位人員加入members
    if (!existsMember) {
      await updateDoc(docRef, {
        [`${fieldValue.id}.members`]: arrayUnion(
          new Member(profile.value.userId, profile.value.displayName).topMap()
        ),
      });
    }

    //這邊要再改方式，否則目前的資料都可以從開發者工具上被讀取到
    sessionStorage.setItem("currentGroup", JSON.stringify(fieldValue));

    //跳轉到group
    router.push("/group");
  } else {
    alert("載入失敗");
  }
};

//透過按鈕的方式進入Group
const gotoGroupPage = async () => {
  isLoading.value = true;

  try {
    //讀取文件
    const docRef = doc(db, "241229Test", profile.value.userId);
    const docSnap = await getDoc(docRef);

    //建立Guid
    const RID = crypto.randomUUID();

    //將member預設填入自己
    const member = [];
    member.push(
      new Member(profile.value.userId, profile.value.displayName).topMap()
    );

    //建立分帳資料
    splitData.value = new SplitData(
      `${profile.value.displayName}的群組`,
      member
    );

    //判斷是否已經有存在這個文件有的話是做更新
    //應該可拿到建立新分帳就是新的阿XD
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [`${RID}`]: splitData.value.toMap(),
      });
    }
    //否則新增文件並新增群組
    else {
      await setDoc(docRef, {
        [`${RID}`]: splitData.value.toMap(),
      })
        .then(() => console.log("Data saved successfully"))
        .catch((err) => console.error("Error saving data:", err));
    }

    splitData.value = { ...splitData.value, id: RID };

    //要再換方式
    sessionStorage.setItem("currentGroup", JSON.stringify(splitData.value));

    //跳轉
    router.push({ path: "/group" });
  } catch (err) {
    alert(err + "新增資料失敗");
    isLoading.value = false;
  }
};

//前往History頁面
const gotoHistoryPage = async () => {
  isLoading.value = true;

  router.push({ path: "/history" });
};
</script>

<style scoped>
h1,
span,
a,
p {
  color: white;
  margin: 0 0 10px 0;
}

button {
  margin: 10px;
}

.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#btnShowHis {
  background: white;
  border: white;
  color: #2894ff;
}

#btnCreateNew {
  background: #f75000;
  border: white;
  color: white;
}

@media screen and (max-width: 700px) {
  .body {
    display: block;
    height: 100vh;
  }
}
</style>
