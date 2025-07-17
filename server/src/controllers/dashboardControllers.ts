import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// This is how we get data form 5 different data sources for our different SQL tsbles.

// Register Prisma models
const prisma = new PrismaClient();

// Backend logic
export const getDashboardMetrics = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
       // Grab values form database (prisma.producs, see schema).
       // 'desc' = descending.
        const popularProducts = await prisma.products.findMany({
            take: 15,
            orderBy: {
                stockQuantity: 'desc'
            }
        });

        const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc",
            },
          });

          const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc",
            },
          });

          const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc",
            },
          });

          const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
            {
              take: 5,
              orderBy: {
                date: "desc",
              },
            }
          );

          // In this instence we transform the data on the backend ourself.
          // Function: Grabbing items and mapping them to a new object but with the amount being converted to a string.
          const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item) => ({
              ...item,
              amount: item.amount.toString(),
            })
          );

          res.json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
          });
    } catch (error) {
       res.status(500).json({ message:'Error retrieving dashboard' }); 
    }
};