// method 1

// class MyClass{
//     constructor(private value: number){}

//     // getter
//     getValue(){
//         return this.value;
//     }

//     // setter
//     setValue(value: number){
//         this.value = value
//     }
// }

// const ob1 = new MyClass(45);
// ob1.getValue(); // 45
// ob1.setValue(56);
// ob1.getValue(); // 56



// method 2 - get, set keywords provided by typescript

class MyClass{
    constructor(private _value: number){ }

    get value(){
        return this._value;
    }

    set value(val: number){
        this._value = val;
    }
}


const ob1 = new MyClass(45);
ob1.value;  // 45    (here acting like property and not method call)
ob1.value = 34;    // sets the new value
ob1.value;  // 34