import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Disclosure, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface Props {
  dragId: string;
  content: string;
  removeItem?: (id: string) => void;
  opacity: string;
}

const Item: React.FC<Props> = ({ dragId, content, removeItem, opacity }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: dragId });

  const [time, setTime] = useState("00:00");

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = () => {
    if (removeItem) {
      removeItem(dragId);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`my-3 flex flex-row justify-center rounded-sm bg-gradient-to-br from-[#035388] to-[#2BB0ED] align-middle  shadow-md ${opacity}`}
    >
      <div className="flex w-1/5 flex-none flex-row border-r-2">
        {/* <SetTimePopover initialTime={time} updateTime={setTime} /> */}
        <Example initialTime={time} updateTime={setTime} />
      </div>
      <div
        className={"h-[60px] flex-grow p-4 text-white"}
        data-id={dragId}
        {...attributes}
        {...listeners}
      >
        {content}
      </div>
      <div className="grid grid-cols-1 grid-rows-2">
        <button className="w-5" onClick={handleRemove}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon-close fill-white transition-colors ease-in-out hover:fill-supportingRed6"
          >
            <path
              className="secondary"
              fill-rule="evenodd"
              d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
            />
          </svg>
        </button>
        <div className="rounded-sm" {...attributes} {...listeners} />
      </div>
    </div>
  );
};

export default Item;

interface SetTimeProps {
  initialTime: string;
  updateTime: (time: string) => void;
}

function Example({ initialTime, updateTime }: SetTimeProps) {
  const [timeH, setTimeH] = useState(Number(initialTime.slice(0, 2)));
  const [timeM, setTimeM] = useState(Number(initialTime.slice(3)));

  const handleTimeChange = (hours: boolean, value: string) => {
    if (hours) {
      setTimeH(Number(value));
      updateTime(
        `${Number(value) < 10 ? "0" + value : value}:${
          timeM < 10 ? "0" + timeM.toString() : timeM
        }`
      );
    } else {
      setTimeM(Number(value));
      updateTime(
        `${timeH < 10 ? "0" + timeH.toString() : timeH}:${
          Number(value) < 10 ? "0" + value : value
        }`
      );
    }
  };

  return (
    <div className="m-auto w-4/5">
      <div className="rounded-2xl">
        <Disclosure>
          {() => (
            <>
              <Disclosure.Button className="flex min-w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-white opacity-90 hover:bg-supportingBlue3 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <p className="m-auto">{initialTime}</p>
              </Disclosure.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Disclosure.Panel className="absolute z-20 mt-5 grid grid-cols-2 grid-rows-2 gap-2 rounded-lg bg-neutral9 px-4 py-4 text-sm text-neutral1">
                  <label>Hours</label>
                  <input
                    className="rounded-md px-1 outline-none"
                    type="number"
                    min={0}
                    max={24}
                    value={timeH}
                    onChange={(e) => handleTimeChange(true, e.target.value)}
                  />
                  <label className="inline-block">Minutes</label>
                  <input
                    className="rounded-md px-1 outline-none"
                    type="number"
                    min={0}
                    max={59}
                    value={timeM}
                    onChange={(e) => handleTimeChange(false, e.target.value)}
                  />
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
