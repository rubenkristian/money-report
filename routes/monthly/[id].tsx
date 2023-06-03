import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.6/server.ts";
import { Month } from "../../constants/month.ts";
import DetailReport from "../../islands/DetailReport.tsx";

interface MonthlyInterface {
  data: {
    id: number;
    month: number;
    year: number;
  }
}

export const handler: Handlers<MonthlyInterface | null> = {
  async GET(_, ctx) {
    const { id } = ctx.params;

    const resp = await fetch(`http://localhost:8000/api/monthly/${id}`, {method: "GET"});

    if (resp.status === 404) {
      return ctx.render(null);
    }
    const data: MonthlyInterface = await resp.json();
    return ctx.render(data);
  }
}

export default function MonthlyDetail({ data }: PageProps<MonthlyInterface | null>) {
  if (!data) {
    return (
      <h1>Not Found</h1>
    );
  }

  return (
    <>
      <Head>
        <title>Report ({Month[data.data.month]} {data.data.year})</title>
      </Head>
      <div class="flex w-full justify-center my-8">
        <div class="text-4xl font-bold">Report ({Month[data.data.month]} {data.data.year})</div>
      </div>
      <div>
        <DetailReport
          report_monthly_id={data.data.id}
        />
      </div>
    </>
  );
}
