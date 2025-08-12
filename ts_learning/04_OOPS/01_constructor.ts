class BottleMaker {
    constructor(public name: string, public price: number, public waranty: number = 4) {
    }
}

// creating object of BottleMaker class
const bottle1 = new BottleMaker('Milton x2', 1200, 2);
const bottle2 = new BottleMaker('Cello z1', 2300);


class MusicMaker {
    constructor(public name: string, public duration: number, public isFree: boolean, public thumbnail: string = 'thumbnail1.jpg') { }
}

const m1 = new MusicMaker('Jugrafia', 4.3, false);



// this keyword
class abcd {
    name: string = 'amrik';

    changeName(newName: string) {
        this.name = newName;
    }
}


// access specifiers
// public: accessible within class and outside the class
// private: accessible within the class only; cannot access in children classes also (inheritance)
// protected: accessible within the parent class and its children classes aswell

class Chocolate {
    constructor(private name: string) {
    }

    display() {
        console.log(this.name);
    }
}


const chocolate1 = new Chocolate('Kit Kat');

console.log(chocolate1.display());
// console.log(chocolate1.name);  // cannot access it here



class Bike {
    protected brand: string;
    constructor(brand: string) {
        this.brand = brand;
    }
}

class ElectricBike extends Bike {
    public name: string;

    // readonly -> cannot be changed later once provided the value
    constructor(brand: string, name: string, public readonly isManual: boolean) {
        super(brand);
        this.name = name;
    }
}

const bike1 = new ElectricBike('BMW', 'S1000RR', false);