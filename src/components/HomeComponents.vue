<!-- <template>
  <div>
    <button class="btn btn-success" @click="handleAction('CreateGroup')">
      建立群組
    </button>
    <button class="btn btn-success" @click="handleAction('addMember')">
      新增成員
    </button>
    <button class="btn btn-success" @click="handleAction('addTransaction')">
      新增交易
    </button>
    <button class="btn btn-success" @click="handleAction('addSplit')">
      新增分割
    </button>
    <div>
      <textarea v-model="jdata" style="height: 500px; width: 50vw" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import db from "../src/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Member, SplitData, Transaction } from "../src/Models/SplitModels";
const splitallData = ref(null);
const jdata = ref("");
const docRef = doc(db, "241229Test", "Robert");

const handleAction = (action) => {
  switch (action) {
    case "CreateGroup":
      splitallData.value = new SplitData(generateGUID(), "Robert Groups");
      break;
    case "addMember":
      splitallData.value.members.push(new Member(generateGUID(), "New Member"));
      break;
    case "addTransaction":
      splitallData.value.transactions.push(
        new Transaction(
          generateGUID(),
          "132",
          100,
          "Example",
          new Date().toISOString()
        )
      );
      break;
    case "addSplit":
      splitallData.value.transactions[0].split.push(
        new Member(generateGUID(), 1000)
      );
      break;
    default:
      console.error("Unknown action:", action);
      return;
  }

  updateData();
};

const updateData = () => {
  console.log;
  jdata.value = JSON.stringify(splitallData.value);
  setDoc(docRef, { splitallData: jdata.value })
    .then(() => console.log("Data saved successfully"))
    .catch((err) => console.error("Error saving data:", err));
};

const generateGUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};
</script>

<style></style> -->

<template>
  <div class="home-container">
    <h1>分帳輕鬆搞定</h1>
    <p>快速紀錄與分帳，讓金錢計算更簡單。</p>
    <div>
      <button id="btnCreateNew" class="btn btn-success" @click="gotoGroup">
        建立新分帳
      </button>
      <button id="btnShowHis" class="btn btn-success" @click="gotoHistory">
        檢視歷史紀錄
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { SplitData } from "../Models/SplitModels";
import db from "../firebase/config";
import liff from "@line/liff";

const profile = ref(null);
const splitallData = ref(null);
const isLoading = inject("isLoading");

onMounted(async () => {
  isLoading.value = true;
  await liff
    .getProfile()
    .then((value) => {
      console.log(value.displayName);
      profile.value = value;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const router = useRouter();

const gotoGroup = async () => {
  isLoading.value = true;
  try {
    const docRef = doc(db, "241229Test", profile.value.userId);
    const docSnap = await getDoc(docRef);

    splitallData.value = new SplitData(`${profile.value.displayName}的群組`);
    //已經存在這個文件
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [crypto.randomUUID()]: splitallData.value.toMap(),
      });
    }
    //否則新增文件並新增群組
    else {
      await setDoc(docRef, {
        [crypto.randomUUID()]: splitallData.value.toMap(),
      })
        .then(() => console.log("Data saved successfully"))
        .catch((err) => console.error("Error saving data:", err));
    }
    sessionStorage.setItem("currentGroup", splitallData.value.toMap());
    sessionStorage.setItem("id", profile.value.userId);
  } catch (err) {
    console.log(err + "新增資料失敗");
  }
  router.push({ path: "/group" });
};

const gotoHistory = async () => {
  isLoading.value = true;
  sessionStorage.setItem("id", profile.value.userId);
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
