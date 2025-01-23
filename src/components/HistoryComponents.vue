<template>
  <div class="group-container">
    <div class="row align-items-start">
      <div class="col-2">
        <button class="btn btn-danger" @click="gotoHome">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
    <div class="row" v-for="(group, index) in result" :key="group.id">
      <div class="row">
        <h3>{{ group.name }}</h3>
        <button
          id="btnCreateNew"
          class="btn btn-success"
          @click="gotoGroup(index)"
        ></button>
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
  sessionStorage.setItem("currentGroup", result.value[index]);
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

<style scoped>
.group-container {
  width: 80vw;
  height: 90vh;
  background: white;
  border-radius: 25px;
  padding: 15px;
}
</style>
