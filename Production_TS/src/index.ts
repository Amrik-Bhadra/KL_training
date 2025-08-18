// simple way: 
// class User{
//     email: string;
//     name: string;
//     city: string;
//     state: string;

//     constructor(email: string, name: string, city: string, state: string){
//         this.email = email;
//         this.name = name;
//         this.city = city;
//         this.state = state;
//     }
// }


// class User {
//     private email: string;    // property of class User
//     private name: string;     // property of class User
//     private city?: string;    // optional attribute (?)
//     private readonly state?: string;  //  readonly cannot be changed
//     constructor(email: string, name: string, city?: string, state?: string){
//         this.email = email;
//         this.name = name
//         this.city = city;
//         this.state = state;
//     }
// }


// more professional way
class User{
    protected _courseCount: number = 1;
    constructor(
        private _email: string, 
        private _name: string, 
        public city: string, 
        readonly state?: string
    ) {}


    // getter
    get name(): string { return this._name; }
    get email(): string { return this._email; }
    get courseCount(): number { return this._courseCount; }

    // setter
    set name(name: string){
        this._name = name;
    }

    set email(email: string){
        this._email = email;
    }

    set courseCount(courseCount: number){
        if(courseCount < 1) {
            throw new Error('course count cannot be < 1');
        }
        this._courseCount = courseCount;
    }

}


const user1 = new User("amrik.bhadra@gmail.com", "Amrik Bhadra", "Pune", "Maharashtra");
console.log(user1);

// user1.state = 'Jharkhand'   // -> gives error

console.log(user1.name);
user1.name = 'Ricky';


class SubUser extends User {
    isFamily: boolean = true;
    changeCourseCount(){
        this._courseCount = 4;
    }
}


