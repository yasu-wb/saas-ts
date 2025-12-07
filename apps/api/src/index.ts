import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.text("Hello Hono!");
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

serve({
  fetch: app.fetch,
  port: 3001,
});
