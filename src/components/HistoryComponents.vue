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
        <span>歷史紀錄</span>
      </div>
    </div>
    <div>
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
      const filteredGroups = Object.entries(data).filter(([key, value]) => {
        console.log("key:" + key);
        const tmpdata = Object.entries(value).filter(([k, v]) => {
          if (k == "members") {
            return v.includes(userId.value);
          }
        });
        return tmpdata.length > 0;
      });

      result.value = [
        ...result.value,
        ...filteredGroups.map(([key, value]) => ({
          id: key,
          ...value,
        })),
      ];
    });

    isLoading.value = false;
  } catch (err) {
    console.log(err);
  }
});
</script>

<style scoped></style>
