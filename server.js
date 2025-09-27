import { clerkMiddleware, requireAuth } from "@clerk/express";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import router from "./routes/aiRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
await connectCloudinary();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use(requireAuth());
app.use("/api/ai", router);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// To run the server, use the command: npm run dev
// Make sure you have nodemon installed globally or as a dev dependency
// You can install it globally using: npm install -g nodemon
// Or as a dev dependency using: npm install --save-dev nodemon
// psql 'postgresql://neondb_owner:npg_PcOo29YakJqR@ep-twilight-firefly-a8mh6kan-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require'