import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

type Category = {
  id: number;
  name: string;
};

type Props = {
  categories: Category[];
  updateSelected: (category: Category) => void;
};

export default function CategoryCombobox({
  categories,
  updateSelected,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    categories[0] ? categories[0] : { id: 0, name: "" }
  );

  const [query, setQuery] = useState("");

  const filteredCategories =
    query === ""
      ? categories
      : categories.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  const handleSelect = (category: Category) => {
    setSelectedCategory(category);
    updateSelected(category);
  };

  return (
    <Combobox value={selectedCategory} onChange={handleSelect}>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:outline-none focus:ring-0"
            displayValue={(category: Category) => category.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <p className="h-5 w-5 text-neutral5" aria-hidden="true">
              V
            </p>
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCategories.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredCategories.map((category) => (
                <Combobox.Option
                  key={category.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-primary3 text-white" : "text-neutral1"
                    }`
                  }
                  value={category}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {category.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <p className="h-5 w-5" aria-hidden="true">
                            X
                          </p>
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
