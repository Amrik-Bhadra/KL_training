/*
    Type can define:
        --> object shape
        --> union & intersection
        --> primitive alias
        --> utility types
        --> tuples
        --> function signatures
*/


// object shapes
type Car = {
    model: string,
    brand: string,
    airgbags: number,
    isManual: boolean
}

const bmw_m5: Car = {
    model: 'M 5',
    brand: 'BMW',
    airgbags: 6,
    isManual: false
}


// Union & Intersection types


