// Tuples: fixed-length array in which we have data-type for each  position

// let user: [string, number] = ["Alice", 25];


// real world usecase: when you

// 1. Returning multiple values from a function:
function getUser(): [string, number]{
    return ["Amrik", 22];
}

const [username, userage] = getUser();


// 2. representing pairs
type Coordinate = [number, number];
const point: Coordinate = [23, 34];


// optional elements in tupes
const myTuple: [string, number?] = ['apple', 45];
const myTuple2: [string, boolean?, number?] = ['banana', ,32];


// Named tuples
type UserTyple = [name: string, age: number];
const myuser: UserTyple = ["Rita", 30];
