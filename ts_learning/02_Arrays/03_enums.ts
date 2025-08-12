// numeric: values are auto-increment , starting from 0

enum nums{
    zero,   // 0
    one,    // 1
    two,    // 2
    three,  // 3
    four    // 4
}

console.log(nums.three) // 3


// provide value for initial enum, and furuther will be auto-increment
enum values{
    a = 10,
    b,  // 11
    c,  // 12
    d,  // 13
    e   // 14
}


// string enums
enum Codes {
  OK = 200,
  BadRequest = 400
}

console.log(Codes.OK);         // 200
console.log(Codes[200]);       // "OK"
