import { valid } from "https://deno.land/std@0.178.0/semver/mod.ts";
import { useEffect, useState } from "preact/hooks";
import { Card } from "../components/Card.tsx";

interface MonthInterface {
  id: number;
  month: number;
  year: number;
}

interface YearInterface {
  year: number;
}

interface ResponseInterface {
  data: {
    years: YearInterface[];
    monthly: MonthInterface[];
    selected: number;
  }
}

export default function Monthly() {
  const [reportMonthly, setReportMonthly] = useState<MonthInterface[]>([]);
  const [years, setYears] = useState<YearInterface[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(0);

  useEffect(() => {
    fetch("/api/monthly", {method: "GET"})
    .then((res) => res.json())
    .then((res: ResponseInterface) => {
      const { data: {monthly, years,selected} } = res;
      setYears(years);
      setReportMonthly(monthly);
      setSelectedYear(selected);
    });
  }, []);

  useEffect(() => {
    fetch(`/api/monthly?year=${selectedYear}`, {method: "GET"})
    .then((res) => res.json())
    .then((res: ResponseInterface) => {
      const { data: {monthly, years,selected} } = res;
      setYears(years);
      setReportMonthly(monthly);
    });
  }, [selectedYear]);

  return (
    <>
      <div class="flex my-4 gap-2">
        {
          years.map((val, index) => (
            <div class={`flex h-8 border py-1 px-4 items-center rounded-md cursor-pointer ${val.year === selectedYear ? `bg-[#38bdf8] text-white` : ``}`} key={index} onClick={() => setSelectedYear(val.year)}>
              {val.year}
            </div>
          ))
        }
      </div>
      <div class="flex flex-col gap-2 w-full">
        {
          reportMonthly.map((val) => {
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
    </>
  );
}
