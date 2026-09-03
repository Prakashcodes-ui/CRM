import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  createUsers
} from "../controllers/authController.js";

router.post(
  "/users/admin/",
  authenticate,
  authorizeRoles("SUPER_ADMIN"),
  createUsers
);

router.post(
  "/users/manager/",
  authenticate,
  authorizeRoles("SUPER_ADMIN","ADMIN"),
  createUsers
);

router.post(
  "/users/tl/",
  authenticate,
  authorizeRoles("SUPER_ADMIN","ADMIN","MANAGER"),
  createUsers
);

router.post(
  "/users/staff/",
  authenticate,
  authorizeRoles("SUPER_ADMIN","ADMIN","MANAGER","TL"),
  createUsers
);

export default router;