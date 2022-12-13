import { Head } from "$fresh/runtime.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import ContextProvider from "../components/ContextProvider.tsx";
import SignUpComponent from "../components/SignUpComponent.tsx";
import Navbar from "../islands/Navbar.tsx";

type Props = {};

export default function signup(_: Props) {
  return (
    <>
      <Head>
        <title>PostSnaps - Sign up</title>
        <link rel="stylesheet" href={asset("../globals.css")} />
      </Head>
      <ContextProvider>
        <Navbar />
        <SignUpComponent />
      </ContextProvider>
    </>
  );
}
