import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import ResizableBox from "../islands/Box.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export async function getTweetData(link: string) {
  const statusID = link?.split("/").pop()!.split("?").shift();

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
export default function Home({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css"
        />
      </Head>
      <div class="p-4 mx-auto max-w-screen-md h-full">
        <div class="w-full h-full flex flex-col justify-around">
          <ResizableBox content={data} />
        </div>
      </div>
      <script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></script>
    </>
  );
}
