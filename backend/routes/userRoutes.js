import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

import {
  createUsers, getAllUsers, getSingleUsers,updateUsers, userDeleted, permanentDelete
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

router.get(
  "/users",
  authenticate,
  authorizeRoles("SUPER_ADMIN"),
  getAllUsers
);

router.get(
  "/user/:id",
  authenticate,
  authorizeRoles("SUPER_ADMIN"),
  getSingleUsers
);


router.put(
  "/users/:id",
  authenticate,
  authorizeRoles("SUPER_ADMIN"),
  updateUsers
)

router.delete(
  "/users/:id/status",
  authenticate,
  authorizeRoles("SUPER_ADMIN"),
  userDeleted
)

router.delete(
  "/user/:id",
  authenticate,
  authorizeRoles("SUPER_ADMIN"),
  permanentDelete
)

export default router;