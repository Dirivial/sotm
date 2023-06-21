import { Disclosure, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export interface Props {
  initialTime: string;
  updateTime: (time: string) => void;
}

export function SetTimeDisclosure({ initialTime, updateTime }: Props) {
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
