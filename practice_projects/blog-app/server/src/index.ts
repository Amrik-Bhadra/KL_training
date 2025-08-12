import dotenv from 'dotenv';
dotenv.config();

import app from "./app";
import http from "http";
import { connectToDB } from './config/database';

const PORT = process.env.PORT || 8000;

async function main() {
    await connectToDB();
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}


main().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
});

