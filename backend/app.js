import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();
dotenv.config({ path: "./.env" });

app.use(cors({
    methods: ["GET", "POST", "PUT"],
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use("/api/user", userRoutes);

export default app;