function fetchUser(id: number): Promise<{id: number, name: string }> {
    return Promise.resolve({id: 1, name: 'Amrik'});
}

// following is asynchronous api testing

test("fetch user by id", async () => {
    const user = await fetchUser(1);
    expect(user.name).toBe('Amrik');  // passes
    // expect(user.name).toBe('amrik');  // fails
});