import express, {RequestHandler} from "ultimate-express";
import cors from "cors";
import helmet from "helmet";
import {serve, setup} from "swagger-ui-express";
import {errorHandler} from "./middleware/errorHandler.js";
import swaggerDocument from "./openapi.json" with {type: "json"};
import http from "http";
import {helloRouter} from "./routes/hello.js";


const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger UI
app.use("/api-docs", serve as unknown as RequestHandler[], setup(swaggerDocument) as unknown as RequestHandler);

// Routes
app.use(helloRouter);

// 404 handler
app.use("*", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Error handler
app.use(errorHandler);

// Initialize and start server
let server: http.Server;

function startServer() {
  try {
    const PORT = "3000";

    // Start server only if not in test environment
    if (process.env.NODE_ENV !== "test") {
      server = app.listen(Number(PORT), () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  startServer();
}

export { app, server };
