import { connectDB } from "./util/db";
import cors from "cors";
require("dotenv").config();
import express from "express";
import v1Router from "./routes/v1";
import globalErrorHandler from "./middleware/globalErrorHandler";
import logger from "./util/logger";
import { requestLogger } from "./middleware/requestLogger";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express .json());

app.use(requestLogger)


app.use("/v1",v1Router)


app.use(globalErrorHandler)

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log("Server Started on"+ " "+PORT);
  }),
);
export default { app };
