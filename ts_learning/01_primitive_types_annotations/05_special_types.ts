// any
let myValue: any;

myValue = 5;
myValue = 'five'
myValue = false;


// unknown
let input: unknown;

input = 'text';
input = 50;
input = [1, 2, 3, 4];

function run(task: unknown){
    if(typeof task === "string"){
        console.log(task.toLowerCase())
    }
}


// void
function display(name: string): void{
    console.log(`My name is ${name}`);
}

let result: void = undefined;


// never
function throwError(msg: string): never{
    throw new Error(msg);
}

function infinite(): never{
    while(true){
        console.log('infinite loop');
    }
}