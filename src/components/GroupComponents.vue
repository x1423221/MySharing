<template>
  <div class="group-container">
    <div class="container-title">
      <div class="title-container">
        <button
          id="btnGoHome"
          class="btn btn-danger d-flex align-items-center justify-content-center"
          @click="gotoHome"
        >
          <i class="bi bi-x-lg"></i>
        </button>
        <div v-if="storedGroup && !IsEdit">
          <span>{{ storedGroup.name }}</span>
          <i class="bi bi-pencil" @click="EditGroupName"></i>
        </div>
        <div v-if="storedGroup && IsEdit">
          <input type="text" style="width: 150px" v-model="GroupName" />
          <i class="bi bi-check-circle" @click="SaveGroupName"></i>
          <i class="bi bi-x-circle" @click="EditGroupName"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <h3>帳目列表</h3>
      <!-- <div
        v-for="(d, index) in storedGroup.transactions"
        :key="index"
        class="detail"
      >
        <span>{{ d.description }}</span>
      </div> -->
    </div>
    <div class="row">
      <h3>即時統計</h3>
      <div></div>
    </div>

    <button class="btn btn-success" @click="shareMember">分享</button>
    <button class="btn btn-success" @click="NewTransaction">新增帳目</button>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import liff from "@line/liff";
import db from "../firebase/config";
import { doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { Transaction } from "../Models/SplitModels";

const router = useRouter();
const storedGroup = ref(null);
const userId = ref(null);
const userName = ref("");
const IsEdit = ref(false);
const GroupName = ref("");
const TransactionList = ref([]);
let isLoading;

onMounted(() => {
  try {
    isLoading = inject("isLoading");
    const groupDataString = JSON.parse(sessionStorage.getItem("currentGroup"));
    alert(JSON.stringify(groupDataString));
    userId.value = sessionStorage.getItem("id");
    userName.value = sessionStorage.getItem("displayName");
    storedGroup.value = groupDataString;
    GroupName.value = storedGroup.value.name;
    TransactionList.value = storedGroup.value.transactions;
  } catch (err) {
    alert(err);
  } finally {
    isLoading.value = false;
  }
});

const gotoHome = () => {
  router.push("/");
};

const shareMember = () => {
  try {
    //alert(liff.isApiAvailable("shareTargetPicker"));
    liff
      .shareTargetPicker(
        [
          {
            type: "text",
            text: `Hi!這是給你的分帳連結`,
          },
        ],
        {
          isMultiple: true,
        }
      )
      .then(function (res) {
        if (res) {
          // succeeded in sending a message through TargetPicker
          alert(`[${res.status}] Message sent!`);
        } else {
          // sending message canceled
          alert("TargetPicker was closed!");
        }
      })
      .catch(function (err) {
        // something went wrong before sending a message
        alert("something wrong happen" + err);
      });
  } catch (err) {
    alert(err);
  }
};

const EditGroupName = () => {
  IsEdit.value = !IsEdit.value;
};

const SaveGroupName = async () => {
  try {
    isLoading.value = true;
    storedGroup.value.name = GroupName.value;
    const docRef = doc(db, "241229Test", userId.value);
    await updateDoc(docRef, {
      [`${storedGroup.value.id}.name`]: GroupName.value,
    });

    IsEdit.value = !IsEdit.value;
    isLoading.value = false;
  } catch (err) {
    alert(err);
  }
};

const NewTransaction = async () => {
  //id, payer, amount, description, date, split = [];
  const RID = crypto.randomUUID();
  const transaction = new Transaction(
    RID,
    userId.value,
    userName.value,
    0,
    userName.value + "創建",
    new Date()
  ).toMap();

  try {
    isLoading.value = true;
    const TransactionListdoc = doc(db, "transactionList", storedGroup.value.id);

    await setDoc(TransactionListdoc, {
      [`${storedGroup.value.id}`]: transaction,
    });

    //後面要再補充這邊的邏輯
    const docRef = doc(db, "241229Test", userId.value);
    await updateDoc(docRef, {
      [`${storedGroup.value.id}.transactions`]: arrayUnion(RID),
    });

    isLoading.value = false;
  } catch (err) {
    alert(err);
  }
};
</script>

<style scoped></style>
