"use strict";
function performTask(val) {
    if (typeof val === 'number')
        return val + 10;
    else if (typeof val === 'string')
        return val.toLowerCase();
    else
        throw new Error('NULL value came');
}
function check(val) {
    // not null
    if (val) {
        if (typeof val === 'string')
            return val.toLocaleUpperCase();
        else if (typeof val === 'object')
            return val.length;
    }
    else {
        throw new Error('NULL value came');
    }
}
function checkIsAdmin(account) {
    if ("isAdmin" in account) {
        console.log('Account belongs to Admin?:', account.isAdmin);
    }
    else {
        console.log('Account belongs to User');
    }
}
// ------------------------------------------------------------------------------------------------
// instanceof
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
// following is type predicate
// this tells that if true than 100% sure return type is Fish else Bird
function isFish(pet) {
    return pet.swim !== undefined; // pet as Fish --> typecasting
}
function getFood(pet) {
    if (isFish(pet)) {
        pet;
        return "fish food";
    }
    else {
        pet;
        return "bird food";
    }
}
//# sourceMappingURL=type_narrowing.js.map