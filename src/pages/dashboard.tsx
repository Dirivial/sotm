import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { api } from "~/utils/api";

import { Category } from "@prisma/client";

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();
  const [categoryName, setCategoryName] = useState("");
  const categories = api.category.getAll.useQuery({
    id: sessionData?.user?.id ? sessionData?.user?.id : "",
  }).data;

  const createCategory = api.category.add.useMutation();

  const testButton = () => {
    console.log(categories);
  };

  const sendButton = () => {
    try {
      createCategory.mutate({
        name: categoryName,
        color: "red",
      });
    } catch (error) {
      console.log(error);
    }
  };

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

        <div>
          <h2>Create a new category:</h2>
          <input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button onClick={() => sendButton()}>Add</button>
          <button onClick={testButton}>Epic button</button>
          <p>
            {categories?.map((item, key) => {
              return <p key={key}>{item.name}</p>;
            })}
          </p>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
