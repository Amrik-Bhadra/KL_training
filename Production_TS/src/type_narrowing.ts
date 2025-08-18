function performTask(val: number | string | null) {
    if(typeof val === 'number') return val + 10;
    else if(typeof val === 'string') return val.toLowerCase();
    else throw new Error('NULL value came');
}

function check(val: string | string[] | null) {
    // not null
    if(val){
        if(typeof val === 'string') return val.toLocaleUpperCase();
        else if(typeof val === 'object') return val.length;
    }else{
        throw new Error('NULL value came');
    }
}


// ------------------------------------------------------------------------------------------------

interface IUser{
    name: string;
    email: string;
}

interface IAdmin{
    name: string;
    email: string;
    isAdmin: boolean;
}

function checkIsAdmin(account: IUser | IAdmin) {
    if("isAdmin" in account){
        console.log('Account belongs to Admin?:', account.isAdmin);
    }else{
        console.log('Account belongs to User');
    }
}

// ------------------------------------------------------------------------------------------------

// instanceof

function logValue(x: Date | string){
    if(x instanceof Date){
        console.log(x.toUTCString());
    }else{
        console.log(x.toUpperCase());
    }
}



type Fish = { swim: () => void };
type Bird = { fly: () => void };


// following is type predicate
// this tells that if true than 100% sure return type is Fish else Bird
function isFish(pet: Fish | Bird) : pet is Fish{
    return (pet as Fish).swim !== undefined;          // pet as Fish --> typecasting
}

function getFood(pet: Fish | Bird){
    if(isFish(pet)){
        pet
        return "fish food";
    }else{
        pet
        return "bird food";
    }
}