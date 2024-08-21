import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import postLikeRoutes from "./routes/postLikeRoutes.js";
import organisationRoutes from "./routes/organisationRoutes.js";
import postOrganisationRoutes from "./routes/postOrganisationRoutes.js";
import postReachRoutes from "./routes/postReachRoutes.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 6000;

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/postlikes", postLikeRoutes);
app.use("/api/organisations", organisationRoutes);
app.use("/api/postorganisation", postOrganisationRoutes);
app.use("/api/reach", postReachRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
