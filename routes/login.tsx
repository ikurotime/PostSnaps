import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import LoginComponent from "../components/LoginComponent.tsx";
//import Layout from "../islands/Layout.tsx";

type Props = {};

export default function login(_: Props) {
  return (
    <>
      <Head>
        <title>PostSnaps</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
      </Head>
      <LoginComponent />
    </>
  );
}
