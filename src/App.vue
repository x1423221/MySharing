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
  <router-view></router-view>
</template>

<script setup></script>

<style scoped></style>
