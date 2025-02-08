<template>
  <div class="group-container">
    <div class="container-title">
      <div class="title-container">
        <BtnGotoHomePage></BtnGotoHomePage>
        <div>
          <span>歷史紀錄</span>
        </div>
      </div>
    </div>
    <div class="card-container">
      <div
        class="card"
        v-for="(group, index) in historyRecords"
        :key="group.id"
      >
        <h3>{{ group.name }}</h3>
        <button
          id="btnGotoHomePage"
          class="btn btn-success"
          @click="gotoGroup(index)"
        >
          前往{{ group.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import BtnGotoHomePage from "./BtnGotoHomePage.vue";

const historyRecords = ref([]);
const router = useRouter();

//取得父元件的資料
const isLoading = inject("isLoading");
const profile = inject("profile");
const currentGroup = inject("currentGroup");

const gotoGroup = (index) => {
  currentGroup.value = historyRecords.value[index];
  router.push("/group");
};

//註冊階段
onMounted(async () => {
  try {
    //取得分帳資料集合內的所有文件
    const firebase = getFirestore();
    const dbcol = collection(firebase, "241229Test");
    const doclist = await getDocs(dbcol);

    //過濾出文件Id是自己或者members中有自己的資料
    doclist.forEach((ele) => {
      const data = ele.data();

      //過濾文件id是自己的
      if (ele.id === profile.value.userId) {
        const tmpdata = Object.entries(data).map(([key, value]) => ({
          did: ele.id,
          id: key,
          ...value,
        }));

        historyRecords.value = [...historyRecords.value, ...tmpdata];
        return; // 直接跳過後續篩選
      }

      //過濾members欄位中有自己的
      const filteredGroups = Object.entries(data)
        .filter(([key, value]) => {
          console.log("key:", key);

          // 篩選 `members` 陣列是否包含 `userId.value`
          return Object.entries(value).some(([k, v]) => {
            return (
              k === "members" &&
              Array.isArray(v) &&
              v.includes(profile.value.userId)
            );
          });
        })
        .map(([key, value]) => ({
          id: key, // 確保 `id` 是單獨的欄位
          ...value,
        }));

      historyRecords.value = [...historyRecords.value, ...filteredGroups];
    });

    isLoading.value = false;
  } catch (err) {
    alert(err);
  }
});
</script>

<style scoped>
.card-container {
  overflow-x: scroll;
  height: 98%;
}
</style>
