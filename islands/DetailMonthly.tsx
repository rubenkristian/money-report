import { useState } from "preact/hooks";

export default function DetailMonthly({
  id,
  title,
  monthReportId,
  _date = null,
  _desc = "",
  _status = 0,
  _type = 0,
  _cash = 0,
}: {
  id?: number;
  title: string;
  monthReportId: number;
  _date?: string | null;
  _desc?: string;
  _status?: number;
  _type?: number;
  _cash?: number;
}) {
  const [date, setDate] = useState<string | null>(_date);
  const [desc, setDesc] = useState<string>(_desc);
  const [status, setStatus] = useState<number>(_status);
  const [type, setType] = useState<number>(_type);
  const [cash, setCash] = useState<number>(_cash);

  const saveDetailMonthly = async () => {
    if (!id) {
      const body = {
        date: date,
        desc: desc,
        status: status,
        type: type,
        cash: cash,
        report_monthly_id: monthReportId,
      }
      await fetch("http://localhost:8000/api/list", {method: "POST", body: JSON.stringify(body)});
    } else {
      const body = {
        id: id,
        date: date,
        desc: desc,
        status: status,
        type: type,
        cash: cash,
        report_monthly_id: monthReportId,
      }
      await fetch("http://localhost:8000/api/list", {method: "PUT", body: JSON.stringify(body)});
    }

    window.location.replace(`/monthly/detail/list/${monthReportId}`);
  }
  
  return (
    <div class="my-4 mx-auto max-w-screen-md flex flex-col">
      <span class="my-4">{title}</span>
      <form onSubmit={(e) => e.preventDefault()}>
        <div class="flex flex-col gap-3">
          <div class="flex flex-col gap-2">
            <label for="date">Date :</label>
            <input value={date ?? ''} onInput={(e) => setDate((e.target as HTMLInputElement).value)} id="date" type="date" class="h-8 border rounded-sm w-full"/>
          </div>
          <div class="flex flex-col gap-2">
            <label for="desc">Desc :</label>
            <textarea value={desc} onInput={(e) => setDesc((e.target as HTMLTextAreaElement).value)} id="desc" class="h-32 border rounded-sm w-full"/>
          </div>
          <div class="flex flex-col gap-2">
            <label for="status">Status :</label>
            <select value={status} onChange={(e) => setStatus(Number((e.target as HTMLSelectElement).value))} id="status" class="h-8 border rounded-sm w-full">
              <option value={0}>Debit</option>
              <option value={1}>Credit</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="type">Type :</label>
            <select value={type} onChange={(e) => setType(Number((e.target as HTMLSelectElement).value))} id="type" class="h-8 border rounded-sm w-full">
              <option value={0}>General</option>
              <option value={1}>Operational</option>
            </select>
          </div>
          <div class="flex flex-col gap-2">
            <label for="cash">Cash :</label>
            <input value={cash} onInput={(e) => setCash(Number((e.target as HTMLInputElement).value))} id="cash" type="number" class="h-8 border rounded-sm w-full"/>
          </div>
          <button class="w-full bg-[#38bdf8] text-white p-2 rounded-sm" onClick={() => saveDetailMonthly()}>
            { id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}