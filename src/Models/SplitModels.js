// models.js
export class Member {
    constructor(userId, name) {
        this.userId = userId;
        this.name = name;
    }

    topMap() {
        return {
            userId: this.userId,
            name: this.name
        }
    }
}

export class Transaction {
    constructor(userId, payer, amount, description, date, split = []) {
        this.userId = userId;
        this.payer = payer;
        this.amount = amount;
        this.description = description;
        this.date = Transaction.dateFormat(date);
        this.split = split;
    }

    toMap() {
        return {
            isLock: false,
            userId: this.userId,
            payer: this.payer,
            amount: this.amount,
            description: this.description,
            date: this.date,
            split: this.split
        };
    }

    static dateFormat(date) {
        const formatter = new Intl.DateTimeFormat("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        });
        const formattedDate = formatter.format(date).replace(/\//g, "-").replace(",", "");
        return formattedDate;
    }
}

export class Split {
    constructor(userId = "", userName = "", share = 0) {
        this.userId = userId;
        this.userName = userName;
        this.share = share;
    }

    toMap() {
        return {
            userName: this.userName,
            userId: this.userId,
            share: this.share,
        };
    }
}

export class SplitData {
    constructor(name, members = []) {
        this.name = name;
        this.members = members;
    }

    toMap() {
        return {
            name: this.name,
            members: this.members,
        };
    }
}

export class TransactionDetail {
    constructor(userId = "", userName = "", splitAmount = 0) {
        this.userId = userId;
        this.userName = userName;
        this.splitAmount = splitAmount;
    }
}