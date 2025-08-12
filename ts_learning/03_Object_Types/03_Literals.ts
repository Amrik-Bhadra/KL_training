// string literal
type Direction = "up" | "down" | "left" | "right";
let dir: Direction = 'down';


// number literals
type Dice = 1 | 2 | 3 | 4 | 5 | 6;
let roll: Dice = 6;

// Union type
type ApiResponse = 'success' | 'error'
let response: ApiResponse = 'success';

// intersection
type User = { name: string };
type Admin = User & { admin: true };
const user: Admin = { name: "Dev", admin: true };
