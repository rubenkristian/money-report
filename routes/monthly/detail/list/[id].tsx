import { PageProps } from "$fresh/server.ts";
import List from "../../../../islands/List.tsx";

export default function ListDetailMonthly(props: PageProps) {
  const { id } = props.params;

  return (
    <>
    <List
      id={Number(id)}
    />
    </>
  );
}