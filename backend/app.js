import express from "express";
import loginAdminRoute from "./src/routes/loginAdminRoute.js";
import loginCustomerRoute from "./src/routes/loginCustomerRoute.js"
import logoutRoute from "./src/routes/logoutRoutes.js"
import registerAdminRoute from "./src/routes/registerAdminRoute.js"
import registerCustomerRoute from "./src/routes/registerCustomerRoute.js"
import ticketsRoute from "./src/routes/ticketsRoutes.js"
import wompiRoutes from "./src/routes/wompiRoutes.js"
import cookieParser from "cookie-parser";

const app = express();

app.use (cookieParser());
app.use (express.json());
app.use("/api/loginAdmin", loginAdminRoute);
app.use ("/api/loginCustomer", loginCustomerRoute);
app.use ("/api/logout", logoutRoute);
app.use ("/api/registerAdmin", registerAdminRoute);
app.use ("/api/registerCustomer", registerCustomerRoute);
app.use ("/api/tickets", ticketsRoute);
app.use ("/api/wompi", wompiRoutes)


export default app;


















