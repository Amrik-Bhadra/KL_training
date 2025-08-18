"use strict";
// it doesnot support for string, else have to use lots of | (union)
function identityOne(val) {
    return val;
}
// it works but we should avoid using any
function identityTwo(val) {
    return val;
}
// here when any value is passed its Type is locked 
function identityThree(val) {
    return val;
}
identityThree(3); // identityThree<number>(3);
// following is used many times
// T can be anything: boolean, number, string, our custom type or interface
function identityFour(val) {
    return val;
}
function displayBottleData(val) {
    return val;
}
function getSearchProducts(products) {
    return products;
}
// function getSearchProducts<Product>(products: Array<Product>): Array<Product> {
//     return products;
// }
// arrow function with generic
const getMoreSearchProducts = (products) => {
    return products;
};
function anotherFunc(val1, val2) {
    return {
        val1,
        val2
    };
}
anotherFunc(3, { connection: '', username: '', password: '' });
class Sellable {
    constructor() {
        this.cart = [];
    }
    addToCart(product) {
        this.cart.push(product);
    }
}
const s1 = new Sellable();
const s2 = new Sellable();
//# sourceMappingURL=generics.js.map