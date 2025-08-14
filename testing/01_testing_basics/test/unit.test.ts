function add(n1: number, n2: number): number{
    return n1 + n2;
}

function greeting(name: string): string {
    return `Good Morning, ${name}`;
}

// following is unit testing
test("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
});

test("greet the user", () => {
    expect(greeting('Amrik')).toBe('Good Morning, Amrik');
});