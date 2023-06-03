import { Month } from "../constants/month.ts";
import {Add, ListSvg, Trash} from "./Svg.tsx";

interface MonthlyInterface {
  id: number;
  month: number;
  year: number;
}

export const Card = ({
  id,
  month,
  year,
}: MonthlyInterface) => {
  return (
    <a class="flex w-full border rounded justify-between" href={`/monthly/${id}`}>
      <div class="flex flex-col p-4">
        <span>
          {year}
        </span>
        <span>
          {Month[month]}
        </span>
      </div>
      <div class="flex p-4 items-center gap-2">
        <a href={`/monthly/detail/create/${id}`}>
          <Add/>
        </a>
        <a href={`/monthly/detail/list/${id}`}>
          <ListSvg/>
        </a>
        <a href="#">
          <Trash/>
        </a>
      </div>
    </a>
  )
}