describe('testing jest.fn() basics', () => {
    test('mockFunc testing', () => {
        // it tells jest, when this function (mockFunc()) will be called, it will return 'hello
        const mockFunc = jest.fn().mockReturnValue('Hello');
        mockFunc('amrik');
        expect(mockFunc()).toBe("Hello");
        expect(mockFunc()).toBe("Hello");
        expect(mockFunc).toHaveBeenCalledTimes(3);   // verifies that mockFn was called n times
        expect(mockFunc).toHaveBeenCalledWith('amrik');  // verfies that mockFn was called with parameter 'amrik'
    });
});


// usecase
function greet(callback: () => string): string {
    return 'Greeting: ' + callback();
}

describe('usecase testing of jest.fn()', () => {
    test('greet works with callback', () => {
        const mockCallbackFunc = jest.fn().mockReturnValue('Hello');
        const result = greet(mockCallbackFunc);
        expect(result).toBe('Greeting: Hello');
        expect(mockCallbackFunc).toHaveBeenCalledTimes(1);
    });
});


// multiple values each time
describe('testing getting multiple values', () => {
    test('multiple values each time', () => {
        const mockFunc = jest.fn()
            .mockReturnValueOnce('First')
            .mockReturnValueOnce('Second')
            .mockReturnValueOnce('Third');

        const result1 = mockFunc();
        const result2 = mockFunc();
        const result3 = mockFunc();

        expect(result1).toBe('First');
        expect(result2).toBe('Second');
        expect(result3).toBe('Third');
    });
});


// Asynchronous mock function
describe.only('testing asynchronous mock function', () => {
    const asyncMockFunc = jest.fn().mockResolvedValue('Async Hello');
    // const asyncMockFunc = jest.fn().mockReturnValue(Promise.resolve('Async Hello'));  // another way

    test('asyncMockFunc return "Async Hello"', async () => {
        await expect(asyncMockFunc()).resolves.toBe("Async Hello");
    });
});