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
          <div>帳目名稱:<input v-model="Transaction.description" /></div>
          <div>總金額:<input v-model="Transaction.amount" /></div>
          <h3>分攤明細</h3>
          <div v-for="(l, index) in Transaction.split" :key="index">
            <select v-model="l.userId" @change="MemberChange(index)">
              <option
                v-for="(m, index) in MemberList.value"
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

import { onMounted, ref, defineExpose, inject } from "vue";

const modal = ref(null);
const myModal = ref(null);

const Amount = ref(0);
const groupId = ref(null);
const profile = inject("profile");

const Transaction = ref([]);
const MemberList = inject("MemberList");

onMounted(() => {
  myModal.value = new Modal(modal.value);
});

const showModal = (payment, group) => {
  Transaction.value = payment;
  Amount.value = Transaction.value.amount;

  //MemberList.value = members;

  // 🔥 確保 `split` 內部是物件，而不是字串
  Transaction.value.split = Transaction.value.split.map((item) =>
    typeof item === "string" ? JSON.parse(item) : item
  );

  groupId.value = group;
  myModal.value.show();
};

const hideModal = async (NeedUpdate) => {
  alert(groupId.value);
  const transListdocRef = doc(db, "transactionList", groupId.value);

  await updateDoc(transListdocRef, {
    [`${Transaction.value.id}.isLock`]: false,
  });

  if (NeedUpdate) {
    await updateDoc(transListdocRef, {
      [`${Transaction.value.id}.description`]: Transaction.value.description,
      [`${Transaction.value.id}.amount`]: Transaction.value.amount,
      [`${Transaction.value.id}.split`]: Transaction.value.split,
    });
  }
  myModal.value.hide();
};

const newShare = () => {
  Transaction.value.split.push({
    share: Number(0),
    userId: profile.value.userId,
    userName: profile.value.displayName,
  });
};

const MemberChange = (index) => {
  const selectedUser = MemberList.value.find(
    (m) => m.userId === Transaction.value.split[index].userId
  );

  Transaction.value.split[index].userName = selectedUser.name;
};

defineExpose({
  showModal,
  hideModal,
});
</script>

<style scoped></style>
