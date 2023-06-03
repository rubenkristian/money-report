export default function Currency({val, currency = "IDR", loc = "id-ID"}: {val: number; currency: string; loc: string;}) {
  const price = new Intl.NumberFormat(loc, {
    style: "currency",
    currency: currency,
  }).format(val)
  return (
    <>
      {price}
    </>
  );
}