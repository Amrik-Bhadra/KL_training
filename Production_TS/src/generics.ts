// it doesnot support for string, else have to use lots of | (union)
function identityOne(val: boolean | number): boolean | number {
    return val
}

// it works but we should avoid using any
function identityTwo(val: any): any{
    return val;
}

// here when any value is passed its Type is locked 
function identityThree<Type>(val: Type): Type {
    return val;
}

identityThree(3);   // identityThree<number>(3);


// following is used many times
// T can be anything: boolean, number, string, our custom type or interface
function identityFour<T>(val: T): T{
    return val;
}

interface IBottle {
    brand: string;
    type: string;
}

function displayBottleData<IBottle>(val: IBottle): IBottle{
    return val;
}

//------------------------------------------------------------------------------------------------

// Generics in array and arrow functions

type Product = {
    id: string,
    name: string,
    price: number,
}

function getSearchProducts<Product>(products: Product[]): Product[] {
    return products
}

// function getSearchProducts<Product>(products: Array<Product>): Array<Product> {
//     return products;
// }


// arrow function with generic
const getMoreSearchProducts = <Product>(products: Product[]): Product[] => {
    return products
}

// note: <T,>  -> this tells this is generic

//------------------------------------------------------------------------------------------------

// Type parameters in Generic constraints

interface IDatabase {
    connection: string;
    username: string;
    password: string;
}

function anotherFunc<T, U extends IDatabase>(val1: T, val2: U): object {
    return {
        val1,
        val2
    }
}

anotherFunc(3, {connection: '', username: '', password: ''});

//------------------------------------------------------------------------------------------------

// Generics in class

interface  IQuiz {
    name: string;
    type: string;
}

interface ICourse {
    name: string;
    author: string;
    subject: string;
}

class Sellable<T> {
    public cart: T[] = [];

    addToCart(product: T){
        this.cart.push(product);
    }
}

const s1 = new Sellable<IQuiz>();
const s2 = new Sellable<ICourse>();