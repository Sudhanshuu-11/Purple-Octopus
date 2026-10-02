import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = Number(process.env.PORT) || 5000;

await connectDatabase(process.env.MONGODB_URI);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
