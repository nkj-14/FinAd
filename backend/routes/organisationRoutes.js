import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  createOrganisation,
  getOrganisationById,
  updateOrganisation,
  loginOrganisation,
  logoutOrganisation,
} from "../controllers/organisationController.js";

const router = express.Router();

router.post("/signup", authMiddleware, createOrganisation);
router.post("/signin", authMiddleware, loginOrganisation);
router.post("/logout", authMiddleware, logoutOrganisation);
router.get("/getorganisationbyid/:id", authMiddleware, getOrganisationById);
router.put("/updateorganisation", authMiddleware, updateOrganisation);

export default router;
