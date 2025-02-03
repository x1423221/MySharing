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
          <input type="text" v-model="GroupName" />
          <i class="bi bi-check" @click="SaveGroupName"></i>
        </div>
      </div>
    </div>
    <div class="row">
      <h1>帳目表</h1>
    </div>
    <button class="btn btn-success" @click="shareMember">分享</button>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import liff from "@line/liff";
import db from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const router = useRouter();
const storedGroup = ref(null);
const userId = ref(null);
const IsEdit = ref(false);
const GroupName = ref("");
let isLoading;

onMounted(() => {
  try {
    isLoading = inject("isLoading");
    const groupDataString = JSON.parse(sessionStorage.getItem("currentGroup"));
    userId.value = sessionStorage.getItem("id");
    storedGroup.value = groupDataString;
    GroupName.value = storedGroup.value.name;
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
    storedGroup.value.name = GroupName.value;
    const docRef = doc(db, "241229Test", userId.value);
    await updateDoc(docRef, {
      [`${storedGroup.value.id}.name`]: GroupName.value,
    });

    IsEdit.value = !IsEdit.value;
  } catch (err) {
    alert(err);
  }
};
</script>

<style scoped></style>
