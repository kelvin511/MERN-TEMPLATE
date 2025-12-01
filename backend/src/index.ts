import { connectDB } from "./util/db";
import cors from "cors";
require("dotenv").config();
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
import router from "./routes/user.route";

app.use(cors());
app.use(express .json());

app.use("/user", router);

connectDB().then(() =>
  app.listen(PORT, () => {
    console.log("Server Started");
  }),
);
export default { app };
