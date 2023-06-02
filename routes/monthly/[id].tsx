import { Head } from "$fresh/runtime.ts";
import { PageProps } from "https://deno.land/x/fresh@1.1.6/server.ts";

export default function MonthlyDetail(props: PageProps) {
  const {id} = props.params;
  return (
    <>
    {id}
    </>
  );
}
