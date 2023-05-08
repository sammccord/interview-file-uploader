import { Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment } from "react";
import { useUser } from "./UserContext";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { profilePic, profileHistory } = useUser();

  return (
    <>
      <div className="min-h-full">
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-36 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <MagnifyingGlassCircleIcon className="h-16 w-auto text-indigo-500" />
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-24 aspect-auto rounded-md"
                        src={profilePic?.images?.preview_gif.url!}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {profileHistory.map((gif) => (
                        <Menu.Item key={gif.id}>
                          {({ active }) => (
                            <div className="flex items-center justify-center">
                              <img
                                className="h-24 aspect-auto rounded-md"
                                src={gif?.images?.preview_gif.url!}
                                alt=""
                              />{" "}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">{children}</div>
      </div>
    </>
  );
};
