import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardControllers";

const router = Router();

router.get("/dashboard", getDashboardMetrics);

export default router;