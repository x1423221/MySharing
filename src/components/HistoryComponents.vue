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
        <div>
          <span>歷史紀錄</span>
        </div>
      </div>
    </div>
    <div class="card-container">
      <div class="card" v-for="(group, index) in result" :key="group.id">
        <h3>{{ group.name }}</h3>
        <button
          id="btnCreateNew"
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

const userId = ref(null);
const result = ref([]);
const router = useRouter();

const gotoHome = () => {
  router.push("/");
};

const gotoGroup = (index) => {
  sessionStorage.setItem("currentGroup", JSON.stringify(result.value[index]));
  sessionStorage.setItem("id", userId.value);
  router.push("/group");
};

onMounted(async () => {
  try {
    const isLoading = inject("isLoading");
    userId.value = sessionStorage.getItem("id");
    console.log("userId:" + userId.value);
    const firebase = getFirestore();
    const dbcol = collection(firebase, "241229Test");
    const doclist = await getDocs(dbcol);

    doclist.forEach((ele) => {
      const data = ele.data();
      if (ele.id === userId.value) {
        const tmpdata = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        result.value = [...result.value, ...tmpdata];
        return; // 直接跳過後續篩選
      }

      const filteredGroups = Object.entries(data)
        .filter(([key, value]) => {
          console.log("key:", key);

          // 篩選 `members` 陣列是否包含 `userId.value`
          return Object.entries(value).some(([k, v]) => {
            return (
              k === "members" && Array.isArray(v) && v.includes(userId.value)
            );
          });
        })
        .map(([key, value]) => ({
          id: key, // 確保 `id` 是單獨的欄位
          ...value,
        }));

      result.value = [...result.value, ...filteredGroups];
    });

    isLoading.value = false;
  } catch (err) {
    console.log(err);
  }
});
</script>

<style scoped>
.card-container {
  overflow-x: scroll;
  height: 98%;
}
</style>
