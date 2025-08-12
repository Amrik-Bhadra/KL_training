class BankAccount{
    private balance: number;
    constructor(intialBalance: number){
        this.balance = intialBalance;
    }

    public deposit(amount: number): void{
        if(amount < 0){
            console.log('amount to deposit cannot be negative');
        }else if(amount < 10){
            console.log('minim Rs. 10 should be deposited');
        }else{
            this.balance += amount;
            console.log('Amount deposited successfully!');
        }
    }

    public get myBalance(){
        return this.balance;
    }

    public withdraw(amount: number): void{
        if(amount < 0){
            console.log('amount to be withdrawn cannot be negative');
        }else if(amount < 10){
            console.log('Minimum Rs 10 can be withdrawn');
        }else if(amount > this.balance){
            console.log('Insufficient balance');
        }else{
            this.balance -= amount;
            console.log('Amount withdrawn successfully!');
        }
    }
}


const account1 = new BankAccount(5000);
account1.deposit(300);
console.log('Balance:', account1.myBalance);
account1.withdraw(10000);
account1.withdraw(2000);
console.log('Balance:', account1.myBalance);