<template>
  <div class="modal" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">帳目維護</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" v-if="Transaction && MemberList">
          <div>總金額:<input v-model="Transaction.amount" /></div>
          <h3>分攤明細</h3>
          <div v-for="(l, index) in Transaction.split" :key="index">
            <select v-model="l.userId">
              <option
                v-for="(m, index) in MemberList"
                :key="index"
                :value="m.userId"
              >
                {{ m.name }}
              </option>
            </select>
            :<input v-model="l.share" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="hideModal()"
          >
            關閉
          </button>
          <button type="button" class="btn btn-primary" @click="hideModal()">
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "bootstrap/js/dist/modal";
import { onMounted, ref, defineExpose } from "vue";

const modal = ref(null);
const myModal = ref(null);
const Transaction = ref(null);
const MemberList = ref([]);
onMounted(() => {
  myModal.value = new Modal(modal.value);
});

const showModal = (payment, members) => {
  Transaction.value = payment;
  MemberList.value = members;

  // 🔥 確保 `split` 內部是物件，而不是字串
  Transaction.value.split = Transaction.value.split.map((item) =>
    typeof item === "string" ? JSON.parse(item) : item
  );

  alert(members);
  myModal.value.show();
};
const hideModal = () => {
  myModal.value.hide();
};

defineExpose({
  showModal,
  hideModal,
});
</script>

<style scoped></style>
