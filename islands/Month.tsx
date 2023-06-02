import { valid } from "https://deno.land/std@0.178.0/semver/mod.ts";
import { useEffect, useState } from "preact/hooks";
import { Card } from "../components/Card.tsx";

interface MonthInterface {
  id: number;
  month: number;
  year: number;
}

export default function Monthly() {
  const [reportMonthly, setReportMonthly] = useState<MonthInterface[]>([]);

  useEffect(() => {
    fetch("/api/monthly", {method: "GET"})
    .then((res) => res.json())
    .then((list: MonthInterface[]) => {
      setReportMonthly(list);
    })
  }, []);
  return (
    <div class="flex flex-col gap-2 w-full">
      {
        reportMonthly.map((val, index) => {
          return (
            <div key={val.id}>
              <Card
                id={val.id}
                month={val.month}
                year={val.year}
              />
            </div>
          );
        })
      }
    </div>
  );
}
