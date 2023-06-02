interface MonthlyInterface {
  id: number;
  month: number;
  year: number;
}

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

export const Card = ({
  id,
  month,
  year,
}: MonthlyInterface) => {
  return (
    <a href={`/monthly/${id}`}>
      <div class="flex flex-col w-full p-4 border rounded">
        <span>
          {year}
        </span>
        <span>
          {MonthList[month-1]}
        </span>
      </div>
    </a>
  )
}