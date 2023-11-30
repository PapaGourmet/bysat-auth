import { Router } from "express";
import { Conn } from "../controllers/saveDataController";
const router = Router();

router.get('/', Conn);

export { router };