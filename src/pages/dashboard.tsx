import { type Category } from "@prisma/client";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CategoryCombobox from "~/components/CategoryCombobox";
import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const { data: sessionData } = useSession();
  const categories = api.category.getAll.useQuery({
    id: sessionData?.user?.id ? sessionData?.user?.id : "",
  }).data;

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const createCategory = api.category.add.useMutation();

  const handleCategorySelected = (category: Category) => {
    setSelectedCategory(category);
  };

  // const sendButton = () => {
  //   try {
  //     createCategory.mutate({
  //       name: categoryName,
  //       color: "red",
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Dashboard - TimeLume</title>
        <meta name="description" content="Take a look at your statistics." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7B93DB] to-[#BED0F7]">
        <Link href="/" className="absolute left-4 top-4">
          <h1 className="text-xl font-extrabold italic tracking-tight text-white sm:text-[2rem]">
            Time<span className="text-[#35469C]">Lume</span>
          </h1>
        </Link>

        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h2 className="text-xl">Manage Categories</h2>
          <CategoryCombobox
            categories={categories ? categories : []}
            updateSelected={handleCategorySelected}
          />

          <div className="flex w-2/6 flex-row justify-between gap-3">
            <button
              className="mt-2 rounded-md bg-primary2 p-3 text-neutral9"
              onClick={() => console.log("This should fire a creation modal")}
            >
              Create
            </button>

            <button
              className="mt-2 rounded-md bg-red-900 p-3 text-neutral9"
              onClick={() => console.log("This should fire a deletion modal")}
            >
              Delete
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
