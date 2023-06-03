import { Handlers } from "$fresh/server.ts";
import { Database } from "sqlite3";

interface MonthlyInterface {
  month: number;
  year: number;
}

export const handler: Handlers = {
  async POST(req: Request) {
    const db = new Database("./base.db");

    const data: MonthlyInterface = await req.json();
    const stms = db.prepare("SELECT * FROM report_monthly WHERE month = :month AND year = :year");
    const exists = stms.get({month: data.month, year: data.year});
    if (!exists) {
      const ins = db.exec("INSERT INTO report_monthly (month, year) VALUES (:month, :year)", {month: data.month, year: data.year});
      db.close();
      return Response.json({
        message: ins > 0 ? "successful to save data" : "failed to save data"
      }, {status: 201});
    } else {
      db.close();
      return Response.json({
        message: "data exists",
      }, {status: 409});
    }
  },

  GET(req: Request) {
    const db = new Database("./base.db");

    const url = new URL(req.url);
    const selectedYear = url.searchParams.get("year") ?? new Date().getFullYear();
    const year = db.prepare("SELECT year FROM report_monthly GROUP BY year");
    const stmt = db.prepare("SELECT * FROM report_monthly WHERE year = :year ORDER BY month ASC");
    
    const dataYears = year.all();
    const dataMonthly = stmt.all({year: selectedYear});

    db.close();
    return Response.json({
      data: {
        years: dataYears,
        monthly: dataMonthly,
        selected: selectedYear,
      }
    }, {status: 200});
  }
}