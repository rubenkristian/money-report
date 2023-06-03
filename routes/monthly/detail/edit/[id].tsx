import { Head,  } from "https://deno.land/x/fresh@1.1.6/runtime.ts";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.6/server.ts";
import DetailMonthly from "../../../../islands/DetailMonthly.tsx";
import { ReportInterface } from "../../../../constants/interface.ts";

interface EditInterface {
  data: ReportInterface
}

export const handler: Handlers<EditInterface | null> = {
  async GET(_, ctx) {
    const { id } = ctx.params;

    const resp = await fetch(`http://localhost:8000/api/list?id=${id}`, {method: "GET"});

    if (resp.status === 404) {
      return ctx.render(null);
    }
    const json = await resp.json();

    const data: EditInterface = json;
    return ctx.render(data);
  }
}

export default function ReportDetailEdit({ data }: PageProps<EditInterface | null>) {
  if (!data) {
    return (
      <h1>Not Found</h1>
    );
  }

  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      <div>
        <DetailMonthly
          id={data.data.id}
          title="Edit"
          monthReportId={data.data.report_monthly_id}
          _date={data.data.date}
          _desc={data.data.desc}
          _status={data.data.status}
          _type={data.data.type}
          _cash={data.data.cash}
        />
      </div>
    </>
  );
}