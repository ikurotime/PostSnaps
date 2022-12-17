import { User } from "supabase";
import Input from "./Input.tsx";

export default function Navbar({ user }: { user?: User }) {
  const logout = () => {
    // delete cookie
    document.cookie = "ps.supabase.auth.token=; max-age=0; path=/";
    // redirect to home
    window.location.href = "/";
  };

  return (
    <nav class="fixed top-0 z-10 mx-auto left-0 right-0 border-gray-200 px-2 sm:px-4 py-2.5 rounded bg-gray-800 transition-all">
      <div class="container flex gap-3 flex-wrap items-center justify-between mx-auto">
        <a href="/" class="flex items-center">
          <span class="self-center text-xl font-semibold whitespace-nowrap text-white">
            PostSnaps
          </span>
        </a>
        <div class="flex md:order-1 justify-center max-w-[500px] flex-1">
          <Input />
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            class="inline-flex items-center p-2 text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              >
              </path>
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-cta"
        >
          <ul class="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-900 md:bg-gray-900 border-gray-700">
            <li>
              <a
                href="/"
                class="block py-2 pl-3 pr-4 text-white bg-blue-600 rounded md:bg-transparent md:text-blue-600 md:p-0 "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/explore"
                class="block py-2 pl-3 pr-4 rounded md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                Explore
              </a>
            </li>
            <li>
              <a
                href="/favorites"
                class="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                Favorites
              </a>
            </li>
            {user
              ? (
                <li class="relative">
                  <div data-dial-init class="right-24 group">
                    <div
                      id="speed-dial-menu-dropdown"
                      class="absolute right-0 top-5 flex hidden flex-col justify-end py-1 mb-4 space-y-2 bg-white rounded-lg border border-gray-100 shadow-sm dark:border-gray-600 dark:bg-gray-700"
                    >
                      <ul class="text-sm text-gray-500 dark:text-gray-300">
                        <li>
                          <a
                            href="#"
                            class="flex items-center py-2 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
                          >
                            <svg
                              class="mr-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              >
                              </path>
                            </svg>
                            <span class="text-sm font-medium">Profile</span>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            class="flex items-center py-2 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
                          >
                            <svg
                              class="mr-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              >
                              </path>
                            </svg>
                            <button
                              onClick={logout}
                              class="text-sm font-medium"
                            >
                              Logout
                            </button>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <a
                      href="/profile"
                      class="block py-2 pl-3 pr-4 rounded md:hover:bg-transparent md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                    >
                      <span
                        data-dial-toggle="speed-dial-menu-dropdown"
                        aria-controls="speed-dial-menu-dropdown"
                        aria-expanded="false"
                      >
                        Settings
                      </span>
                    </a>
                  </div>
                </li>
              )
              : (
                <>
                  <li>
                    <a
                      href="/login"
                      class="block py-2 pl-3 pr-4 rounded  md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/signup"
                      class="block py-2 pl-3 pr-4 rounded  md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                    >
                      Sign up
                    </a>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
