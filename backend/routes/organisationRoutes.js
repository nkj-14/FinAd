import express from "express";

import {
  createOrganisation,
  getOrganisationById,
  updateOrganisation,
  loginOrganisation,
  logoutOrganisation,
} from "../controllers/organisationController.js";

const router = express.Router();

router.post("/signup", createOrganisation);
router.post("/signin", loginOrganisation);
router.post("/logout", logoutOrganisation);
router.get("/getorganisationbyid/:id", getOrganisationById);
router.put("/updateorganisation", updateOrganisation);

export default router;
