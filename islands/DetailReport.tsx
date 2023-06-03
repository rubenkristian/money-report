import { useEffect, useState } from "preact/hooks";
import { CalculateDetailInterface, ReportDetailDateInterface, ReportDetailInterface, ResponseDetailDateInterface, ResponseDetailInterface } from "../constants/interface.ts";
import { ArrowDown, ArrowUp, ArrowUpDown, Back, Result } from "../components/Svg.tsx";
import Currency from "../components/Currency.tsx";

enum Tabs {
  Operational = 1,
  General = 0,
}

export default function DetailReport({report_monthly_id}: {report_monthly_id: number;}) {
  const [selected, setSelected] = useState<Tabs>(Tabs.Operational);
  const [list, setList] = useState<ReportDetailInterface[]>([]);
  const [calculate, setCalculate] = useState<CalculateDetailInterface>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [listDetailReportDate, setListDetailReportDate] = useState<ReportDetailDateInterface[]>([]);

  const loadDetail = async () => {
    const res = await fetch(`http://localhost:8000/api/detail?report_monthly_id=${report_monthly_id}&type=${selected}`, {method: "GET"});
    const {data}: ResponseDetailInterface = await res.json();

    setList(data.list);
    setCalculate(data.calculate);
  }

  const loadDetailDate = async () => {
    const res = await fetch(`http://localhost:8000/api/detail/date?report_monthly_id=${report_monthly_id}&type=${selected}&date=${selectedDate}`, {method: "GET"});
    const {data}: ResponseDetailDateInterface = await res.json();

    setListDetailReportDate(data.list);
    console.log(data.calculate);
    setCalculate(data.calculate);
  }

  useEffect(() => {
    loadDetail();
  }, []);

  useEffect(() => {
    loadDetail();
    setSelectedDate(null);
  }, [selected]);

  useEffect(() => {
    if (selectedDate) {
      loadDetailDate();
    } else {
      loadDetail();
    }
  }, [selectedDate]);

  return (
    <>
      <div class="h-12 w-full flex justify-between text-2xl font-bold">
        <a onClick={(e) => {
          e.preventDefault();
          setSelected(Tabs.Operational);
        }} href="#operational" class={`flex w-full items-center justify-center border ${selected === Tabs.Operational ? `bg-[#38bdf8] text-white` : ``}`}>
          Operational
        </a>
        <a onClick={(e) => {
          e.preventDefault();
          setSelected(Tabs.General);
        }} href="#general" class={`flex w-full items-center justify-center border ${selected === Tabs.General ? `bg-[#38bdf8] text-white` : ``}`}>
          General
        </a>
      </div>
      <div class="min-h-screen flex flex-col items-center gap-20 my-8">
        <div class="flex flex-col w-full items-center mb-8 gap-3">
          {
            !selectedDate && list.map((val, index, list) => (
              <div key={val.date} onClick={() => setSelectedDate(val.date)} class="flex w-4/5 h-16 border rounded-sm items-center py-4 px-3 justify-between cursor-pointer">
                <span class="text-2xl font-bold">{val.date}</span>
                <div class="flex gap-2 text-2xl font-bold text-[#00DFA2]">
                  <span><ArrowDown size={34} color="#00DFA2"/></span>
                  <span>
                    <Currency
                      val={val.debit}
                      currency="IDR"
                      loc="id-ID"
                    />
                  </span>
                </div>
                <div class="flex gap-2 text-2xl font-bold text-[#FF0060]">
                  <span><ArrowUp size={34} color="#FF0060"/></span>
                  <span>
                    <Currency
                      val={val.credit}
                      currency="IDR"
                      loc="id-ID"
                    />
                  </span>
                </div>
                <div class="flex gap-2 text-2xl font-bold text-[#0079FF]">
                  <span>
                    <Currency
                      val={val.total}
                      currency="IDR"
                      loc="id-ID"
                    />
                  </span>
                </div>
              </div>
            ))
          }
          {
            selectedDate && (
              <>
              <div class="w-4/5 flex justify-start items-center gap-12 mb-8">
                <a onClick={() => setSelectedDate(null)} href="#"><Back/></a>
                <span class="text-3xl font-bold">{selectedDate}</span>
              </div>
              {
                listDetailReportDate.map((val, index) => (
                  <div key={index} class="flex w-4/5 h-16 border rounded-sm items-center gap-8">
                    <div class={`w-1/3 flex items-center py-1 px-2 ${val.status === 0 ? `bg-[#00DFA2]` : `bg-[#FF0060]`}`}>
                      <span>
                        {
                          val.status === 0 ? (
                            <ArrowDown size={54} color="#FFFFFF"/>
                          ) : (
                            <ArrowUp size={54} color="#FFFFFF"/>
                          )
                        }
                      </span>
                      <span class="text-white font-bold text-2xl">
                        <Currency
                          val={val.cash}
                          currency="IDR"
                          loc="id-ID"
                        />
                      </span>
                    </div>
                    <span class="text-xl">"{val.desc}"</span>
                  </div>
                ))
              }
              </>
            )
          }
        </div>
        <div class="fixed bottom-0 w-full">
        {
          calculate && (
            <div class="w-full flex flex-col gap-12 items-center border p-4">
              <div class="w-full flex gap-20 justify-center">
                <div class="flex text-6xl font-bold text-[#00DFA2]">
                  <span><ArrowDown size={54} color="#00DFA2"/></span>
                  <span>
                    <Currency
                      val={calculate.debit ?? 0}
                      currency="IDR"
                      loc="id-ID"
                    />
                  </span>
                </div>
                <div class="flex text-6xl font-bold text-[#FF0060]">
                  <span><ArrowUp size={54} color="#FF0060"/></span>
                  <span>
                    <Currency
                      val={calculate.credit ?? 0}
                      currency="IDR"
                      loc="id-ID"
                    />
                  </span>
                </div>
                <div class="flex gap-4 text-6xl font-bold text-[#0079FF]">
                  <span><Result size={54} color="#0079FF"/></span>
                  <span>
                    <Currency
                      val={calculate.total ?? 0}
                      currency="IDR"
                      loc="id-ID"
                    />
                  </span>
                </div>
              </div>
            </div>
          )
        }
        </div>
      </div>
    </>
  );
}