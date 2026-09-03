import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  createUsers
} from "../controllers/userController.js";

const router = express.Router();

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
  authorizeRoles("SUPER_ADMIN","ADMIN","MANAGER"),
  createUsers
);

export default router;