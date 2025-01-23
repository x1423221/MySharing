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
    <!-- <div>
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
    </div> -->
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

<style scoped>
.group-container {
  width: 80vw;
  height: 90vh;
  background: white;
  border-radius: 25px;
}

.container-title {
  background: dimgrey;
  border-radius: 25px 25px 0 0;
}

#btnGoHome {
  border-radius: 50%; /* 圓角 100% 形成圓形 */
  width: 20px;
  height: 20px;
  border: 1px solid red;
  padding: 0; /* 移除額外的內間距 */
}

.title-container {
  width: 150px;
  margin-left: 15px;
}
</style>
