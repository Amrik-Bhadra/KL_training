"use strict";
class Shape {
    area() { return 0; }
    ;
    perimeter() { return 0; }
    ;
}
class Rectangle extends Shape {
    constructor(length, breadth) {
        super();
        this.length = length;
        this.breadth = breadth;
    }
    area() { return Number((this.length * this.breadth).toFixed(2)); }
    perimeter() { return Number((2 * (this.length + this.breadth)).toFixed(2)); }
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() { return Number((Math.PI * this.radius * this.radius).toFixed(2)); }
    perimeter() { return Number((2 * Math.PI * this.radius).toFixed(2)); }
}
const rect1 = new Rectangle(10, 20);
const cir1 = new Circle(5);
console.log(`Area of rectangle: ${rect1.area()}\nPerimeter of rectangle: ${rect1.perimeter()}`);
console.log(`Area of circle: ${cir1.area()}\nPerimeter of circle: ${cir1.perimeter()}`);
