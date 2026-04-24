import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/app.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../docs/swagger";
import cors from "cors";


dotenv.config();

const PORT = process.env.PORT || 3001;
const rootPath = process.env.ROOT_PATH;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({
    origin: "*", // en dev
    credentials: true,
}));

app.use(`${rootPath}`, router);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`)
})