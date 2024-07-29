import * as dotenv from "dotenv"
dotenv.configDotenv({debug:true})
dotenv.config()

if (!process.env.PORT) {
  process.exit(1)
}
const PORT:number =parseInt(process.env.PORT as string, 10)

import express, { json, response } from "express";
import cors from "cors"
const SERVER = express();
SERVER.use(json());
SERVER.use(cors());

SERVER.get("/hotel", async (req, res)=>{
  res.status(200).json({response: "success"})
})

SERVER.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
