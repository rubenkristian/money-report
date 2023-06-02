// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/list/[id].ts";
import * as $1 from "./routes/api/list/index.ts";
import * as $2 from "./routes/api/monthly.ts";
import * as $3 from "./routes/index.tsx";
import * as $4 from "./routes/monthly/[id].tsx";
import * as $5 from "./routes/monthly/create.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/CreateForm.tsx";
import * as $$2 from "./islands/Month.tsx";

const manifest = {
  routes: {
    "./routes/api/list/[id].ts": $0,
    "./routes/api/list/index.ts": $1,
    "./routes/api/monthly.ts": $2,
    "./routes/index.tsx": $3,
    "./routes/monthly/[id].tsx": $4,
    "./routes/monthly/create.tsx": $5,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/CreateForm.tsx": $$1,
    "./islands/Month.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;