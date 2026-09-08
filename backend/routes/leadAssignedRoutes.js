import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import { assignLead, getMyassignedLeads } from "../controllers/leadAssignController.js";

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorizeRoles(
        "SUPER_ADMIN",
        "ADMIN",
        "MANAGER",
        "TL"
    ),
    assignLead
);

router.get(
    "/get-assigned-leads",
    authenticate,
    authorizeRoles("STAFF"),
    getMyassignedLeads
)

export default router;
