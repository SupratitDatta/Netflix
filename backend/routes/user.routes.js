import { Router } from "express";
import { addToLikedMovies, getLikedMovies, removeFromLikedMovies } from "../controllers/user.controller.js";

const router = Router();

router.get("/liked/:email", getLikedMovies);
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);

export default router;