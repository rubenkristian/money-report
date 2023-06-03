import { PageProps } from "$fresh/server.ts";
import { Head } from "https://deno.land/x/fresh@1.1.6/runtime.ts";
import DetailMonthly from "../../../../islands/DetailMonthly.tsx";

export default function ReportDetailCreate(props: PageProps) {
  const { id } = props.params;

  return (
    <>
      <Head>
        <title>Edit</title>
      </Head>
      <div>
        <DetailMonthly monthReportId={Number(id)} title="Create"/>
      </div>
    </>
  );
}