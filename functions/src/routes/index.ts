import * as express from "express";
import { food } from "./food";
import { root } from "./root";
import { seed } from "./seed";

const router = express.Router();

router.get("/", root);
router.get("/food", food);
router.post("/seed", seed);

export default router;
