import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import ContextProvider from "../components/ContextProvider.tsx";
import LoginComponent from "../components/LoginComponent.tsx";
import Navbar from "../islands/Navbar.tsx";
//import Layout from "../islands/Layout.tsx";

type Props = {};

export default function login(_: Props) {
  return (
    <>
      <Head>
        <title>PostSnaps</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
      </Head>
      <ContextProvider>
        <Navbar />
        <LoginComponent />
      </ContextProvider>
    </>
  );
}
