<template>
  <div class="group-container">
    <div class="row align-items-start">
      <div class="col-2">
        <button class="btn btn-danger" @click="gotoHome">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-9" v-if="storedGroup">
        {{ storedGroup.name }}
      </div>
    </div>
    <div class="row">
      <button class="btn btn-success" @click="shareMember">分享</button>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import liff from "@line/liff";

const router = useRouter();
const route = useRoute();
const storedGroup = ref(null);
const userId = ref(null);

onMounted(() => {
  try {
    const isLoading = inject("isLoading");
    isLoading.value = false;
    const groupDataString = JSON.parse(sessionStorage.getItem("currentGroup"));
    userId.value = sessionStorage.getItem("id");

    storedGroup.value = groupDataString;
  } catch (err) {
    alert(err);
  }
});

const gotoHome = () => {
  router.push("/");
};

const shareMember = () => {
  liff
    .shareTargetPicker(
      [
        {
          type: "text",
          text: `Hi!這是給你的分帳連結${
            window.location.origin + route.fullPath + "?groupId=" + userId.value
          }`,
        },
      ],
      {
        isMultiple: true,
      }
    )
    .then(function (res) {
      if (res) {
        // succeeded in sending a message through TargetPicker
        console.log(`[${res.status}] Message sent!`);
      } else {
        // sending message canceled
        console.log("TargetPicker was closed!");
      }
    })
    .catch(function (err) {
      // something went wrong before sending a message
      console.log("something wrong happen" + err);
    });
};
</script>

<style scoped>
.group-container {
  width: 80vw;
  height: 90vh;
  background: white;
  border-radius: 25px;
  padding: 15px;
}
</style>
