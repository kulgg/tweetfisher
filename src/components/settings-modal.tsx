import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

export type SettingsModalProps = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  twitterTps: number;
  archiveTps: number;
  handleSave: (twitterTpsInput: string, archiveTpsInput: string) => void;
};

export default function SettingsModal({
  twitterTps,
  archiveTps,
  handleSave,
  isVisible,
  setIsVisible,
}: SettingsModalProps) {
  const [twitterTpsInput, setTwitterTpsInput] = useState(twitterTps.toString());
  const [archiveTpsInput, setArchiveTpsInput] = useState(archiveTps.toString());
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setTwitterTpsInput(twitterTps.toString());
      setArchiveTpsInput(archiveTps.toString());
    }, 150);

    return () => {
      clearTimeout(t);
    };
  }, [isVisible]);

  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsVisible}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-2 mt-3 text-center text-gray-200 sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-left text-lg font-medium leading-6"
                    >
                      Settings
                    </Dialog.Title>
                    <div className="mb-8 mt-6 text-left">
                      <fieldset>
                        <legend className="block text-sm font-medium text-rose-200">
                          Requests per second
                        </legend>
                        <div className="flex w-full items-center justify-center gap-4">
                          <div className="relative mt-3 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                            <label
                              htmlFor="twittertps"
                              className="absolute -top-2 left-2 -mt-px inline-block bg-gray-800 px-1 text-xs font-medium text-gray-300"
                            >
                              Twitter.com
                            </label>
                            <input
                              type="text"
                              name="twittertps"
                              id="twittertps"
                              className="block w-full border-0 bg-gray-800 p-1 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-base"
                              placeholder="1.0"
                              value={twitterTpsInput}
                              onChange={(e) =>
                                setTwitterTpsInput(e.target.value)
                              }
                            />
                          </div>
                          <div className="relative mt-3 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400">
                            <label
                              htmlFor="archivetps"
                              className="absolute -top-2 left-2 -mt-px inline-block bg-gray-800 px-1 text-xs font-medium text-gray-300"
                            >
                              Archive.org
                            </label>
                            <input
                              type="text"
                              name="archivetps"
                              id="archivetps"
                              className="block w-full border-0 bg-gray-800 p-1 text-gray-200 placeholder-gray-500 focus:ring-0 sm:text-base"
                              placeholder="1.0"
                              value={archiveTpsInput}
                              onChange={(e) =>
                                setArchiveTpsInput(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-500 px-4 py-2 text-base font-medium text-gray-100 shadow-sm outline-none hover:border hover:border-gray-400 active:scale-105 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setIsVisible(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:border hover:border-gray-400 active:scale-105 sm:col-start-2 sm:text-sm"
                    onClick={() => {
                      handleSave(twitterTpsInput, archiveTpsInput);
                      setIsVisible(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
