import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
/* ROUTE IMPORTS */
import dashboardRoutes from './routes/dashboardRoutes';
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";


/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
// Accept cross-origin express
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/dashboard", dashboardRoutes); // http://localhost:8000/dashboard
app.get("/products", productRoutes); // http://localhost:8000/products
app.get("/users", userRoutes); // http://localhost:8000/users
app.get("/expenses", expenseRoutes); // http://localhost:8000/expenses

/* SERVER: We usr our port env if it's available, if not we default to port 3001 */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});