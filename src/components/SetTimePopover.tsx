import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export interface Props {
  initialTime: string;
  updateTime: (time: string) => void;
}

export function SetTimePopover({ initialTime, updateTime }: Props) {
  const [timeH, setTimeH] = useState(Number(initialTime.slice(0, 2)));
  const [timeM, setTimeM] = useState(Number(initialTime.slice(3)));

  const handleTimeChange = (hours: boolean, value: string) => {
    const N =
      Number(value) <= 0 ? "00" : Number(value) < 10 ? "0" + value : value;

    if (hours) {
      setTimeH(Number(N));
      updateTime(`${N}:${timeM < 10 ? "0" + timeM.toString() : timeM}`);
    } else {
      setTimeM(Number(N));
      updateTime(`${timeH < 10 ? "0" + timeH.toString() : timeH}:${N}`);
    }
  };

  return (
    <div className="m-auto w-4/5">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group flex min-w-full justify-between rounded-lg py-2 text-left text-sm font-medium text-white opacity-90 hover:bg-supportingBlue3 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75`}
            >
              <span className="m-auto">{initialTime}</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-5 transform px-4 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative z-20 grid w-52 grid-cols-2 grid-rows-2 gap-2 rounded-lg bg-neutral9 p-7 px-4 py-4 text-sm text-neutral1 lg:grid-cols-2">
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
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
