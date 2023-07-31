import express from "express";
import User from "../models/user.js";
import verify from "../verify.js";
import path from "path";
import fs from "fs";

const router = express.Router();

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/:path", async (req, res) => {
    const imagePath = path.join(__dirname, "resources", req.params.path);
    try {
      const image = fs.readFileSync(imagePath);
      const base64Image = Buffer.from(image).toString("base64");
      return res.status(200).send({ imageData: base64Image });
    } catch (error) {
      console.log("err",error)
      const tempPath = path.join(__dirname, "resources", "TempProfilePic.jpeg");
      const image = fs.readFileSync(tempPath);
      const base64Image = Buffer.from(image).toString("base64");
      return res.status(500).send({ message: "Failed to read the image file",imageData:base64Image });
    }

});

export default router;
