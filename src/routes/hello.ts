import { Router } from "ultimate-express";
import { createRouter, Implementation } from "../generated-server/generated.js";

const implementation: Implementation = {
  helloWorldGetHello: async (params, respond) => {
    return respond.with200().body({
      message: "Hello, World!",
    });
  },
  healthGetHealth: async (params, respond) => {
    return respond.with200().body({
      version: "1.0.0",
      uptime: process.uptime(),
    });
  },
};

const router: Router = createRouter(implementation);

export { router as helloRouter };
