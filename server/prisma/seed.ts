
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

// Seed data, delete data beforehand, and upload the data that we have to our sql database.


// Delete data function (first deletes any pre-existing data in database incase you update your seed data in any way).
async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

// Function to grab seed data from the seedData directory (mock data).

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");
  
  // Figure out the file names (order matters for foreign id connection: ids are created in sequential order).
  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];
  
  // Delete any data that might exist in our databases (logic above). WHen you first start you wont have any data but when you create data and you want to seed it again, this will delete all the data created beforehand.
  await deleteAllData(orderedFileNames);


  // Grab each file, get the correct name with error handling, and create model schemas.
  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];
    
    // Error handling.
    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }
    // Create model schemas and pass data into each (Prisma).
    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
