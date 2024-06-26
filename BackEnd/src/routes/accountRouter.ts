import { Router } from "express";
import {
  createNewAccout,
  deleteAccount,
  getAccount,
  getBADC,
  getCurrentUserAccounts,
} from "../controllers/accountController.js";

const router = Router();

// get all accounts in the bank (admin only) {filter by optional parameters}
router.get("/admin", () => {});

// get users stats (admin only)
router.get("/admin/stats", () => {});

// get current user accounts
router.get("/", getCurrentUserAccounts);

// get specific account for the current user
router.get("/:number", getAccount);

// get BADC: Bank account Details Confirmation for a specific account for the current user
router.get("/BADC/:number", getBADC);

// create new account for the current user
router.post("/", createNewAccout);

// delete a specific account for the current user
router.delete("/:number", deleteAccount);

export default router;
