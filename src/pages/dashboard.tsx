import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
//import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Dashboard - TimeLume</title>
        <meta name="description" content="Take a look at your statistics." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7B93DB] to-[#BED0F7]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Link href="/">
            <h1 className="text-5xl font-extrabold italic tracking-tight text-white sm:text-[5rem]">
              Time<span className="text-[#35469C]">Lume</span>
            </h1>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
