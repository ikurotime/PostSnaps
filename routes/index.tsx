import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { asset } from "$fresh/src/runtime/utils.ts";
import ResizableBox from "../islands/Box.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";


export async function getTweetData(statusID: string) {
  return await fetch("/api/get-tweet-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      statusID: statusID,
    }),
  }).then((res) => res.json());
}

/* export const handler: Handlers = {
  async GET(_req, ctx) {
    const response = await getTweetData("1537687751272845312")
    console.log(response);
    return ctx.render(response);
  },
}; */
export default function Home({data}:PageProps) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
      <div class="w-full h-full grid place-content-center">
			<ResizableBox content={data}/>
		</div>
      </div>
    </>
  );
}
