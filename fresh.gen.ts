// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/_app.tsx";
import * as $2 from "./routes/api/get-tweet-info.ts";
import * as $3 from "./routes/api/joke.ts";
import * as $4 from "./routes/index.tsx";
import * as $5 from "./routes/login.tsx";
import * as $$0 from "./islands/BottomBar.tsx";
import * as $$1 from "./islands/Input.tsx";
import * as $$2 from "./islands/Layout.tsx";
import * as $$3 from "./islands/Navbar.tsx";
import * as $$4 from "./islands/TweetContainer.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/_app.tsx": $1,
    "./routes/api/get-tweet-info.ts": $2,
    "./routes/api/joke.ts": $3,
    "./routes/index.tsx": $4,
    "./routes/login.tsx": $5,
  },
  islands: {
    "./islands/BottomBar.tsx": $$0,
    "./islands/Input.tsx": $$1,
    "./islands/Layout.tsx": $$2,
    "./islands/Navbar.tsx": $$3,
    "./islands/TweetContainer.tsx": $$4,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
