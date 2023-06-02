import { useState } from "preact/hooks";

const MonthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default function CreateForm() {
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);

  const insertMonthly = async () => {
    const insert = await fetch("/api/monthly", {method: "POST",  body: JSON.stringify({
      month: month,
      year: year,
    })});

    console.log(insert);
  }

  return (
    <div class="my-4 mx-auto max-w-screen-md flex flex-col">
      <span class="my-4">Create</span>
      <form onSubmit={(e) => e.preventDefault()}>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-2">
            <label for="month">Year :</label>
            <input type="number" value={year} onInput={(e) => setYear(Number((e.target as HTMLInputElement).value))} class="h-8 border rounded-sm w-full"/>
          </div>
          <div class="flex flex-col gap-2">
            <label for="month">Month :</label>
            <select value={month} onChange={(e) => setMonth(Number((e.target as HTMLSelectElement).value))} id="month" class="h-8 border rounded-sm w-full">
              {
                MonthList.map((val, index) => (
                  <option value={index}>{val}</option>
                ))
              }
            </select>
          </div>
          <div class="flex flex-col gap-2">
              <button onClick={insertMonthly}>Create</button>
          </div>
        </div>
      </form>
    </div>
  );
}