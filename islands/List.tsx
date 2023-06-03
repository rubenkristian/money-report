import { useEffect, useState } from "preact/hooks";
import { ReportInterface } from "../constants/interface.ts";
import { Add, ArrowDown, ArrowUp, Edit } from "../components/Svg.tsx";
import Currency from "../components/Currency.tsx";

export default function List({id}: {id: number}) {
  const [list, setList] = useState<ReportInterface[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/list?month_id=${id}`)
      .then((res) => res.json())
      .then((res) => {
        setList(res.data.list);
      })
    }
  }, [id]);

  return (
    <div class="my-4 mx-auto max-w-screen-md flex flex-col">
      <a href={`/monthly/detail/create/${id}`} class="my-4">
        <Add/>
      </a>
      <div class="flex flex-col gap-2">
        {
          list.map((val, index) => (
            <div class="flex h-20 border rounded-sm p-4 justify-between" key={val.id}>
              <div class="flex flex-col">
                <div>
                  {val.date}
                </div>
                <div>
                  {val.desc}
                </div>
              </div>
              <div class="flex gap-2 items-center">
                <div>
                  {
                    val.status === 0 ? <ArrowUp/> : <ArrowDown/>
                  }
                </div>
                <div>
                  <Currency
                    val={val.cash}
                    currency="IDR"
                    loc="id-ID"
                  />
                </div>
              </div>
              <div class="flex gap-2 items-center">
                <div>
                  {
                    val.type === 0 ? "General" : "Operational"
                  }
                </div>
              </div>
              <div class="flex p-4 items-center gap-2">
                <a href={`/monthly/detail/edit/${val.id}`}>
                  <Edit/>
                </a>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}