<template>
  <div class="group-container">
    <div class="row align-items-start">
      <div class="col-2">
        <button class="btn btn-danger" @click="gotoHome">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
    <div class="row" v-for="i in result.value" :key="i.key">
      <div>
        {{ i.key }}
      </div>
      <div>
        {{ i.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, useRouter, ref } from "vue";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const userId = ref(null);

const gotoHome = () => {
  const router = useRouter();
  router.push("/");
};

onMounted(async () => {
  try {
    const isLoading = inject("isLoading");
    userId.value = sessionStorage.getItem("id");

    const firebase = getFirestore();
    const dbcol = collection(firebase, "241229Test");
    const doclist = await getDocs(dbcol);
    //Uea43486b3bc11062986a319913daeb56
    doclist.forEach((ele) => {
      const data = ele.data();
      console.log("資料:" + JSON.stringify(data));
      console.log("資料:" + data);
      //const targetMember = "Uea43486b3bc11062986a319913daeb56"; // 目標成員

      const filteredGroups = Object.entries(data).filter(([value]) => {
        return Object.entries(value).filter(([k, v]) => {
          if (k == "members") {
            console.log("value.key:" + k);
            return Array.isArray(v.members) && v.members.includes(userId);
          }
        });
      });

      const result = filteredGroups.map(([key, value]) => ({
        id: key,
        ...value,
      }));

      console.log("處理後資料:" + filteredGroups);
      console.log(result);
      isLoading.value = false;
    });
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
