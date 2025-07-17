"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const client_1 = require("@prisma/client");
// This is how we get data form 5 different data sources for our different SQL tsbles.
// Register Prisma models
const prisma = new client_1.PrismaClient();
// Backend logic
const getDashboardMetrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Grab values form database (prisma.producs, see schema).
        // 'desc' = descending.
        const popularProducts = yield prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: 'desc'
            }
        });
        const salesSummary = yield prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        const purchaseSummary = yield prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        const expenseSummary = yield prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        const expenseByCategorySummaryRaw = yield prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
        });
        // In this instence we transform the data on the backend ourself.
        // Function: Grabbing items and mapping them to a new object but with the amount being converted to a string.
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => (Object.assign(Object.assign({}, item), { amount: item.amount.toString() })));
        res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving dashboard' });
    }
});
exports.getDashboardMetrics = getDashboardMetrics;
