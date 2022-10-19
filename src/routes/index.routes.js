import { Router } from "express";
import { getfilesdata, getfileslist } from '../controllers/getfilesdataController.js';

const router = Router();

router.get("/files/data", getfilesdata)
router.get("/files/list", getfileslist)

export default router;