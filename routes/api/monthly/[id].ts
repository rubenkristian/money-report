import { HandlerContext } from "fresh";
import { Database } from "sqlite3";
import { Handlers } from "$fresh/compat";

export const handler: Handlers = {
  GET(ctx: HandlerContext) {
    const db = new Database("./base.db");

    const { id } = ctx.params;
    const stmt = db.prepare("SELECT * FROM report_monthly WHERE id = :id");

    const data = stmt.get({ id: id });

    if (data) {
      return Response.json({
        data: data,
      }, { status: 200 });
    }

    return Response.json({
      message: "Not found",
    }, { status: 404 });
  },
};
