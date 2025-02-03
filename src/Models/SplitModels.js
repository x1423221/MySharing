// models.js
export class Member {
    constructor(userid, name) {
        this.userid = userid;
        this.name = name;
    }

    toMap() {
        return {
            userid: this.userid,
            name: this.name
        };
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

    toMap() {
        return {
            id: this.id,
            payer: this.payer,
            amount: this.amount,
            description: this.description,
            date: this.date,
            split: this.split
        };
    }
}

export class Split {
    constructor(userid = "", share = 0) {
        this.userid = userid;
        this.share = share;
    }

    toMap() {
        return {
            userid: this.userid,
            share: this.share,
        };
    }
}

export class SplitData {
    constructor(name, members = [], transactions = []) {
        this.name = name;
        this.members = members;
        this.transactions = transactions;
    }

    toMap() {
        return {
            name: this.name,
            members: this.members,
            transactions: this.transactions
        };
    }
}
