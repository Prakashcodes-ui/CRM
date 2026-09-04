import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import { createLead, updateLeadStatus } from "../controllers/leadController.js";

const router = express.Router();

router.post(
    "/created",
    authenticate,
    authorizeRoles(
        "SUPER_ADMIN",
        "ADMIN",
        "MANAGER",
        "TL",
        "STAFF"
    ),
    createLead
);

router.patch(
    "/:id/status",
    authenticate,
    authorizeRoles(
        "SUPER_ADMIN",
        "ADMIN",
        "MANAGER",
        "TL",
        "STAFF"
    ),
    updateLeadStatus
);


export default router;