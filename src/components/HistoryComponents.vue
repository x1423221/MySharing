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
    <div class="container-body">
      <div class="card-container">
        <div class="card" v-for="(group, index) in historyRecords" :key="group.id"
          :class="{ hidden: cardisNew[group.id] }" :style="cardStyle[group.id]">
          <div class="card-body">
            <h5 class="card-title">{{ group.name }}</h5>
            <span>{{ group.date }}</span>
            <div>
              <button id="btnGotoGroupPage" class="btn btn-success" @click="gotoGroup(index)" style="width: 100%;">
                前往{{ group.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, reactive } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import { setCardStyle } from "@/Models/SplitModels";
import BtnGotoHomePage from "./BtnGotoHomePage.vue";


const historyRecords = ref([]);
const router = useRouter();

//取得父元件的資料
const isLoading = inject("isLoading");
const profile = inject("profile");
const currentGroup = inject("currentGroup");
const cardStyle = reactive({});
const cardisNew = reactive({});

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
              v.filter(item => {
                return item.userId === profile.value.userId
              }).length > 0
            );
          });
        })
        .map(([key, value]) => ({
          did: ele.id,
          id: key, // 確保 `id` 是單獨的欄位
          ...value,
        }));

      historyRecords.value = [...historyRecords.value, ...filteredGroups];
      historyRecords.value.sort((a,b) => a.date > b.date)
    });

    setCardStyle(historyRecords.value, cardStyle, cardisNew);

    isLoading.value = false;
  } catch (err) {
    alert(err);
  }
});
</script>

<style scoped></style>
