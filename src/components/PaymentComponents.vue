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
          <div>總金額:<input v-model="Amount" /></div>
          <h3>分攤明細</h3>
          <div v-for="(l, index) in Transaction.split" :key="index">
            <select v-model="l.userId" @change="MemberChange(index)">
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
          <button @click="newShare">新增分攤明細</button>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="hideModal(false)"
          >
            關閉
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="hideModal(true)"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "bootstrap/js/dist/modal";
import db from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

import { onMounted, ref, defineExpose, reactive } from "vue";

const modal = ref(null);
const myModal = ref(null);
let Transaction = reactive([]);
const MemberList = ref([]);
const Amount = ref(0);
const groupId = ref(null);

onMounted(() => {
  myModal.value = new Modal(modal.value);
});

const showModal = (payment, members, group) => {
  Transaction = payment;
  MemberList.value = members;
  Amount.value = Transaction.amount;
  // 🔥 確保 `split` 內部是物件，而不是字串
  Transaction.split = Transaction.split.map((item) =>
    typeof item === "string" ? JSON.parse(item) : item
  );

  groupId.value = group;
  myModal.value.show();
};
const hideModal = async (NeedUpdate) => {
  const transListdocRef = doc(db, "transactionList", groupId.value);

  await updateDoc(transListdocRef, {
    [`${Transaction.id}.isLock`]: false,
  });

  if (NeedUpdate) {
    await updateDoc(transListdocRef, {
      [`${Transaction.id}.amount`]: Number(Amount.value),
      [`${Transaction.id}.split`]: Transaction.split,
    });
  }
  myModal.value.hide();
};

const newShare = () => {
  Transaction.split = [
    ...Transaction.split,
    {
      share: Number(0),
      userId: sessionStorage.getItem("id"),
      userName: sessionStorage.getItem("displayName"),
    },
  ];
};

const MemberChange = (index) => {
  const selectedUser = MemberList.value.find(
    (m) => m.userId === Transaction.split[index].userId
  );

  Transaction.split[index].userName = selectedUser.name;
};

defineExpose({
  showModal,
  hideModal,
});
</script>

<style scoped></style>
