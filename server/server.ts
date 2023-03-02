import { config } from "dotenv";
config();
import fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/users";

const app = fastify();
app.register(cors, { origin: process.env.CLIENT_URL });
app.register(userRoutes);

console.log(`hi from ${process.env.PORT}`);
app.listen({ port: parseInt(process.env.PORT!) });
