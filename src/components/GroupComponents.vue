<template>
  <div class="group-container">
    <div class="container-title">
      <div class="title-container">
        <BtnGotoHomePage></BtnGotoHomePage>
        <div v-if="currentGroup && !isEdit">
          <span>{{ currentGroup.value.name }}</span>
          <i class="bi bi-pencil" @click="EditGroupName"></i>
        </div>
        <div v-if="currentGroup && isEdit">
          <input type="text" style="width: 150px" v-model="groupName" />
          <i class="bi bi-check-circle" @click="SaveGroupName"></i>
          <i class="bi bi-x-circle" @click="EditGroupName"></i>
        </div>
      </div>
    </div>
    <div class="container-body">
      <PaymentComponents ref="XsModal"></PaymentComponents>
      <div style="overflow-y: hidden;">
        <h3>即時統計</h3>
        <div style="height: 100%; overflow-y: auto;">
          <div v-for="(user, index) in TransactionData" :key="index" class="row">
            <div class="t">
              <span>{{ user.userName.substring(0, 1) }}</span>
            </div>
            <div class="col">
              <span v-if="user.splitAmount > 0">支出</span>
              <span v-else>需支付:</span>
              {{
                user.splitAmount > 0 ? user.splitAmount : user.splitAmount * -1
              }}
              元
            </div>
          </div>
        </div>
      </div>
      <div style="overflow-y: hidden;">
        <h3>建議付款方案</h3>
        <div style="height: 100%; overflow-y: auto;">
          <ul>
            <li v-for="(payment, index) in paymentsList" :key="index">
              {{ payment.from }} 應支付 {{ payment.amount }} 元給 {{ payment.to }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h3>帳目列表</h3>
        <div class="card-container">
          <div v-for="d in TransactionList" :key="d.id" class="card" :class="{ hidden: cardisNew[d.id] }"
            :style="cardStyle[d.id]">
            <div class="card-body">
              <h5 class="card-title">{{ d.description }}</h5>
              金額:<span>{{ d.amount }}</span>
              <div v-if="!d.isLock">
                <button class="btn btn-primary" data-bs-target="#exampleModal" @click="showModal(d)">
                  編輯
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btnArea">
      <button class="btn btn-success" @click="shareMember">分享</button>
      <button class="btn btn-success" @click="NewTransaction">新增帳目</button>
    </div>
  </div>
</template>

<script setup>
import liff from "@line/liff";
import db from "../firebase/config";
import BtnGotoHomePage from "./BtnGotoHomePage.vue";
import PaymentComponents from "./PaymentComponents.vue";

import { inject, onMounted, ref, onUnmounted, reactive, watch } from "vue";
import { doc, updateDoc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { Transaction, TransactionDetail } from "../Models/SplitModels";
import { setCardStyle } from "../Models/SplitModels";

const isEdit = ref(false);
const groupName = ref("");
const TransactionList = ref([]);
const TransactionData = ref([]);
const paymentsList = ref([]);
const XsModal = ref(null);
const groupId = ref(null);
const cardStyle = reactive({});
const cardisNew = reactive({});

const profile = inject("profile");
const isLoading = inject("isLoading");
const currentGroup = inject("currentGroup");
const MemberList = inject("MemberList");

onMounted(async () => {
  try {
    isLoading.value = true;

    groupName.value = currentGroup.value.name;
    groupId.value = currentGroup.value.id;

    if (currentGroup) {
      fetchTransactions(groupId.value);
    }
  } catch (err) {
    alert(err);
  } finally {
    isLoading.value = false;
  }
});

watch(TransactionList, (newItem, oldItem) => {

  if (oldItem.length > 0) {
    const tmpdata = newItem.filter(item => {
      // 如果在 oldItem 中找不到對應的 item.id，則保留這個 item
      return !oldItem.some(_item => _item.id === item.id);
    });

    setCardStyle(tmpdata, cardStyle, cardisNew)
  }
  else {
    setCardStyle(newItem, cardStyle, cardisNew)
  }
})

const EditGroupName = () => {
  isEdit.value = !isEdit.value;
};

const SaveGroupName = async () => {
  try {
    isLoading.value = true;
    currentGroup.value.name = groupName.value;
    const docRef = doc(db, "241229Test", currentGroup.value.did);
    await updateDoc(docRef, {
      [`${currentGroup.value.id}.name`]: currentGroup.value.name,
    });

    isEdit.value = !isEdit.value;
    isLoading.value = false;
  } catch (err) {
    alert(err);
  }
};

const NewTransaction = async () => {
  isLoading.value = true;

  //id, payer, amount, description, date, split = [];
  const RID = crypto.randomUUID();

  const transaction = new Transaction(
    profile.value.userId,
    profile.value.displayName,
    0,
    profile.value.displayName + "創建",
    new Date()
  ).toMap();

  try {
    const TransactionListdoc = doc(
      db,
      "transactionList",
      currentGroup.value.id
    );
    const TransactionListnap = await getDoc(TransactionListdoc);

    if (TransactionListnap.exists()) {
      await updateDoc(TransactionListdoc, {
        [`${RID}`]: transaction,
      });
    }
    //否則新增文件並新增群組
    else {
      await setDoc(TransactionListdoc, {
        [`${RID}`]: transaction,
      });
    }

    isLoading.value = false;
  } catch (err) {
    alert(err);
  }
};

const shareMember = () => {
  try {
    const RID = crypto.randomUUID();

    const currentUrl = "https://liff.line.me/2006768109-93myxPab" + "/"; // 取得當前頁面網址
    const shareUrl = `${currentUrl}?s=${RID}`; // 組合分享連結

    //alert(liff.isApiAvailable("shareTargetPicker"));
    liff
      .shareTargetPicker(
        [
          {
            type: "text",
            text: `Hi! 這是你的分帳連結，點擊加入群組：\n${shareUrl}`,
          },
        ],
        {
          isMultiple: true,
        }
      )
      .then(async () => {
        const TokenDoc = doc(db, "TokenList", RID);
        await setDoc(TokenDoc, {
          date: new Date(),
          docId: currentGroup.value.did,
          fid: currentGroup.value.id,
        });
      });
  } catch (err) {
    alert(err);
  }
};

const calculatePayments = () => {
  let transactions = [];

  // 1️⃣ 先計算每個人的 "淨支出" (netAmount)
  let balances = TransactionData.value.map((user) => ({
    userName: user.userName,
    netAmount: user.splitAmount,
  }));

  // 2️⃣ 把欠錢的人 (debtors) 和 多付錢的人 (creditors) 分開
  let debtors = balances.filter((user) => user.netAmount < 0);
  let creditors = balances.filter((user) => user.netAmount > 0);

  // 3️⃣ 讓欠錢的 (debtors) 依序還款給多付錢的 (creditors)
  let payments = [];

  while (debtors.length > 0 && creditors.length > 0) {
    let debtor = debtors[0]; // 取第一個欠錢的人
    let creditor = creditors[0]; // 取第一個多付錢的人

    let paymentAmount = Math.min(
      Math.abs(debtor.netAmount),
      creditor.netAmount
    );

    // 記錄這筆付款
    payments.push({
      from: debtor.userName,
      to: creditor.userName,
      amount: paymentAmount,
    });

    // 更新 debtor, creditor 的餘額
    debtor.netAmount += paymentAmount;
    creditor.netAmount -= paymentAmount;

    // 移除 netAmount 變成 0 的人
    if (debtor.netAmount === 0) debtors.shift();
    if (creditor.netAmount === 0) creditors.shift();
  }

  // 4️⃣ 更新 Vue 變數，讓畫面可以顯示
  transactions = payments;
  return transactions;
};

const fetchTransactions = async (groupId) => {
  const transListdocRef = doc(db, "transactionList", groupId);
  const splitRef = doc(db, "241229Test", currentGroup.value.did);
  
  const splitShot = onSnapshot(splitRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data()[currentGroup.value.id];
      currentGroup.value.members = data.members;
      MemberList.value = data.members;
    }
  });

  // 設置 Firebase 監聽
  const unsubscribe = onSnapshot(transListdocRef, (docSnap) => {
    TransactionList.value = [];
    TransactionData.value = [];
    paymentsList.value = [];
    if (docSnap.exists()) {
      const data = docSnap.data();
      const tmpdata = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      }));
      TransactionList.value = tmpdata;

      TransactionList.value.forEach((value) => {
        let isExsist = TransactionData.value.find((record) => {
          return record.userId == value.userId;
        });

        if (isExsist) {
          isExsist.splitAmount += value.amount;
        } else {
          TransactionData.value.push(
            new TransactionDetail(value.userId, value.payer, value.amount)
          );
        }

        value.split.forEach((split) => {
          const userId = split.userId;
          const userName = split.userName;
          const share = parseFloat(split.share) * -1; // 轉換成負值

          if (userId != value.userId) {
            isExsist = TransactionData.value.find((record) => {
              return record.userId === userId;
            });

            if (isExsist) {
              isExsist.splitAmount += share;
            } else {
              TransactionData.value.push(
                new TransactionDetail(userId, userName, share)
              );
            }
          }
        });
      });
      paymentsList.value = calculatePayments(); // 每次 Firebase 資料變動時更新統計數據

      paymentsList.value.sort((a, b) => b.amount - a.amount);
      TransactionList.value.sort((a, b) => new Date(b.date) - new Date(a.date));
      TransactionData.value.sort((a, b) => a.splitAmount - b.splitAmount);

    } else {
      TransactionList.value = [];
      TransactionData.value = [];
    }
  });

  // 當組件卸載時，停止監聽
  onUnmounted(() => {
    splitShot();
    unsubscribe();
  });
};

const showModal = async (payment) => {
  const transListdocRef = doc(db, "transactionList", groupId.value);
  //const TransactionListnap = await getDoc(transListdocRef);
  isLoading.value = true;
  await updateDoc(transListdocRef, {
    [`${payment.id}.isLock`]: true,
  });

  XsModal.value.showModal(
    payment,
    //currentGroup.value.members,
    groupId.value
  );

  isLoading.value = false;
};
</script>

<style scoped>
.detail {
  background-color: #bebebe;
  padding: 5px;
  margin: 5px;
}

.btnArea {
  display: flex;
  align-items: center;
  justify-content: center;
}

.t {
  color: white;
  width: 40px;
  height: 40px;
  background-color: lightslategray;
  border-radius: 50%;
  text-align: center;
  align-content: center;
}

.row {
  margin: 5px;
}

.col {
  align-items: center;
  align-content: center;
}
</style>
