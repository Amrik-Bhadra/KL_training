// following is integration testing

import app from "../src/app";
import request from "supertest";

describe("GET /hello", () => {
    it("should return Hello World message", async() => {
        const res = await request(app).get('/hello');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Hello World!');
    });
});