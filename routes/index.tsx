import { Head } from "$fresh/runtime.ts";
import { Button } from "../components/Button.tsx";
import Monthly from "../islands/Month.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Monthly Report</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <div class="flex items-center my-4">
          <span>Monthly Report</span>
        </div>
        <Monthly/>
        <div class="flex justify-between my-4">
          <a href="/monthly/create">
            create new monthly report
          </a>
        </div>
      </div>
    </>
  );
}
