// models.js
export class Member {
    constructor(userid, name) {
        this.userid = userid;
        this.name = name;
    }
}

export class Transaction {
    constructor(id, payer, amount, description, date, split = []) {
        this.id = id;
        this.payer = payer;
        this.amount = amount;
        this.description = description;
        this.date = date;
        this.split = split;
    }
}

export class Split {
    constructor(userid = "", share = 0) {
        this.userid = userid;
        this.share = share;
    }
}

export class SplitData {
    constructor(name, members = [], transactions = []) {
        this.name = name;
        this.members = members;
        this.transactions = transactions;
    }
}
