import { rest } from "msw";
import { CreateRequest } from "../services/create";
export const handlers = [
  rest.post("/api/create", async (req, res, ctx) => {
    const data = await req.json<CreateRequest>();

    if (!data.text) {
      return res(ctx.delay(), ctx.status(400, "Invalid request"));
    }

    return res(ctx.delay(), ctx.json(data));
  }),
];
