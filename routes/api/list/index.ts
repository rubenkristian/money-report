import { Handlers } from "$fresh/server.ts";
import { Database } from "sqlite3";
import { ReportInterface } from "../../../constants/interface.ts";

export const handler: Handlers = {
  async POST(req: Request) {
    const db = new Database("./base.db");

    const data: ReportInterface = await req.json();

    const ins = db.exec(
      "INSERT INTO report_list (date, report_monthly_id, desc, status, type, cash) VALUES (:date, :report_monthly_id, :desc, :status, :type, :cash)",
      {
        date: data.date,
        report_monthly_id: data.report_monthly_id,
        desc: data.desc,
        status: data.status,
        type: data.type,
        cash: data.cash,
      }
    );

    db.close();

    return Response.json({
      message: ins > 0 ? "successful to save data" : "failed to save data"
    }, {status: 201});
  },

  async PUT(req: Request) {
    const db = new Database("./base.db");

    const data: ReportInterface = await req.json();

    const ins = db.exec(
      `
        UPDATE report_list SET
          date = :date,
          report_monthly_id = :report_monthly_id,
          desc = :desc,
          status = :status,
          type = :type,
          cash = :cash
        WHERE
          id = :id
      `,
      {
        date: data.date,
        report_monthly_id: data.report_monthly_id,
        desc: data.desc,
        status: data.status,
        type: data.type,
        cash: data.cash,
        id: data.id,
      }
    );

    db.close();

    return Response.json({
      message: ins > 0 ? "successful to save data" : "failed to save data"
    }, {status: 201});
  },

  GET(req: Request) {
    const db = new Database("./base.db");

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const month_id = url.searchParams.get("month_id");

    if (month_id) {
      const stms = db.prepare("SELECT * FROM report_list WHERE report_monthly_id = :report_monthly_id");
      const list = stms.all({report_monthly_id: month_id});

      db.close();
      return Response.json({
        data: {
          list: list,
        }
      }, {status: 200});
    } else if (id) {
      const stms = db.prepare("SELECT * FROM report_list WHERE id = :id");
      const data = stms.get({id: id});

      db.close();
      return Response.json({
        data: data
      }, {status: 200});
    } else {
      return Response.json({message: "Not found"}, {status: 400});
    }
  }
}