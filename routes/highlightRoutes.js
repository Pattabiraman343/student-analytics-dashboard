import express from "express";
import {protect} from "../middleware/authMiddleware.js";

import {addHighlight,getHighlights} from "../controllers/highlightController.js";

const router = express.Router();

router.post("/",protect,addHighlight);
router.get("/",protect,getHighlights);

export default router;