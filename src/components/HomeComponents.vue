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
  <div v-if="isLoading" class="overlay">
    <div class="spinner"></div>
  </div>

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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import db from "../firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { SplitData } from "../Models/SplitModels";
import liff from "@line/liff";

const profile = ref(null);
const splitallData = ref(null);
const jdata = ref(null);
const isLoading = ref(false);

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
    const dv = getFirestore();
    const testref = collection(dv, "241229Test");
    const doclist = await getDocs(testref);
    //Uea43486b3bc11062986a319913daeb56
    doclist.forEach((ele) => {
      const data = ele.data();
      console.log("資料:" + JSON.stringify(data));
      console.log("資料:" + data);
      //const targetMember = "Uea43486b3bc11062986a319913daeb56"; // 目標成員

      const filteredGroups = Object.entries(ele).filter(([key, value]) => {
        console.log(key);
        Object.entries(value).filter(([k, v]) => {
          console.log("key" + k);
          console.log("value" + v);
        });
      });

      // const result = filteredGroups.map(([key, value]) => ({
      //   id: key,
      //   ...value,
      // }));

      console.log("處理後資料:" + filteredGroups);
      //console.log(result);
    });
  } catch (err) {
    console.log(err);
  }

  try {
    const docRef = doc(db, "241229Test", profile.value.userId);
    const docSnap = await getDoc(docRef);

    splitallData.value = new SplitData(`${profile.value.displayName}的群組`);
    jdata.value = JSON.stringify(splitallData.value);
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
  } catch (err) {
    console.log(err + "新增資料失敗");
  }
  router.push({ path: "/group", query: { id: profile.value.userId } });
};

const gotoHistory = async () => {
  isLoading.value = true;
  router.push({ path: "/history" });
};

// const generateGUID = () => {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0;
//     return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
//   });
// };
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg); /* 初始位置 */
  }
  100% {
    transform: rotate(360deg); /* 完成一整圈 */
  }
}

@media screen and (max-width: 700px) {
  .body {
    display: block;
    height: 100vh;
  }
}
</style>
