import { Router } from "express";
import { getExpensesByCategory } from "../controllers/expenseControllers";

const router = Router();

router.get("/expenses", getExpensesByCategory);

export default router;