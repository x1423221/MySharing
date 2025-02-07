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
import { ref, onMounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { SplitData, Member } from "../Models/SplitModels";
import db from "../firebase/config";
import liff from "@line/liff";

const profile = ref(null);
const splitallData = ref(null);
const isLoading = inject("isLoading");
const route = useRoute();
const group = ref(null);
const uid = ref(null);

onMounted(async () => {
  isLoading.value = true;
  await liff
    .getProfile()
    .then((value) => {
      console.log(value.displayName);
      profile.value = value;
    })
    .finally(() => {
      sessionStorage.setItem("id", profile.value.userId);
      sessionStorage.setItem("displayName", profile.value.displayName);
    });

  group.value = route.query?.g;
  uid.value = route.query?.u;
  if (group.value && uid) {
    await HasPGotoGroupPage(true);
  }
  isLoading.value = false;
});

const router = useRouter();

const HasPGotoGroupPage = async () => {
  const docRef = doc(db, "241229Test", uid.value);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const fieldValue = docSnap.data()[group.value];
    fieldValue.id = group.value;

    alert(JSON.stringify(fieldValue));

    sessionStorage.setItem("currentGroup", JSON.stringify(fieldValue));
    router.push("/group");
  } else {
    alert("載入失敗");
  }
};

const gotoGroupPage = async () => {
  isLoading.value = true;
  try {
    const docRef = doc(db, "241229Test", profile.value.userId);
    const docSnap = await getDoc(docRef);
    const RID = crypto.randomUUID();
    const member = [];
    member.push(
      new Member(profile.value.userId, profile.value.displayName).topMap()
    );
    splitallData.value = new SplitData(
      `${profile.value.displayName}的群組`,
      member
    );
    //已經存在這個文件
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [`${RID}`]: splitallData.value.toMap(),
      });
    }
    //否則新增文件並新增群組
    else {
      await setDoc(docRef, {
        [`${RID}`]: splitallData.value.toMap(),
      })
        .then(() => console.log("Data saved successfully"))
        .catch((err) => console.error("Error saving data:", err));
    }
    splitallData.value = { ...splitallData.value, id: RID };
    sessionStorage.setItem("currentGroup", JSON.stringify(splitallData.value));
    router.push({ path: "/group" });
  } catch (err) {
    alert(err + "新增資料失敗");
    isLoading.value = false;
  }
};

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
