import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

(async () => {
  await connectDB();
  app.listen(env.PORT, () => console.log(`Server up on http://localhost:${env.PORT}`));
})();
