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
  <router-view></router-view>
</template>

<script setup>
import { provide, ref } from "vue";
const isLoading = ref(false); // 全局加载状态

provide("isLoading", isLoading); // 提供加载状态给子组件
</script>

<style scoped>
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
</style>
