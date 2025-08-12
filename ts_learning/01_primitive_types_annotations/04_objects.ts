interface UserType {
    id: string | number;
    name: string;
    email: string;
    phoneNo: number;
    isLoggedIn: boolean;
    isAdmin?: boolean;  // optional
}

let newUser: UserType = { id: 2, name: 'Srivaths Iyer', email: 'srivaths.iyer@gmail.com', phoneNo: 9878732429, isLoggedIn: true }

let userData: UserType = { id: 1, name: 'Amrik Bhadra', email: 'amrik.bhadra@gmail.com', phoneNo: 7739226540, isLoggedIn: false, isAdmin: false }


let person: { name: string; age: number };
person = { name: "John", age: 30 };
// person = { name: "John" }; // Error: Property 'age' is missing

type Gadget = { id: number; name: string };
let item: Gadget = { id: 1, name: "mobile phone" };


// optional or default parameters