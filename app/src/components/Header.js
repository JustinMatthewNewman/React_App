import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ModalAtom.js";
import ThemeToggle from "./ThemeToggle.js";

import {
  HomeIcon,
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  SettingsIcon,
} from "@heroicons/react/outline";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  const handleSignInClick = () => {
    try {
      signIn();
    } catch (error) {
      console.error(error);
      alert("Sorry, a lot of people are signing in right now. Please try again in a couple seconds.");
      router.push('/');
    }
  };

  return (
    <div className="shadow-sm border-slate-300 bg-slate-900 top-0 z-50 fixed w-screen">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto ">
        {/*Left*/}

        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
        src="/logo.png"
        alt="React logo"
        width={50}
        height={50}
        className="flex center mt-1"
      />
        </div>

        <div onClick={() => router.push("/")} className="flex items-center">
          <div className="relative w-10 h-10 lg:hidden flex-shrink-0 flex cursor-pointer ">
            {/* <Image src="http://links.papareact.com/jjm" 
                    layout="fill"
                    objectFit="contain"
                    /> */}
          </div>
        </div>

        {/* Middle */}
        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            {/* <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="h-5 w-f text-gray-400"/>
                </div>
                <input className="bg-gray-50 black w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md" type="text" placeholder="Search"/> */}
            <p className="p-4"></p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navBtn" />
          {session ? (
            <>
              <div
                className="relative navBtn"
                onClick={() => router.push("/dm")}
              >
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-2 text-xs w-4 h-4 rounded-full flex items-center justify-center animate-pulse text-white" style={{backgroundImage: "linear-gradient(45deg, #8B5CF6, #EC4899, #FFB946, #F1C21B)"}}>
                †
                </div>
              </div>

              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon
                onClick={() => router.push("/myProfile")}
                className="navBtn"
              />
              <HeartIcon 
              onClick={() => router.push("/likesPage")}
              className="navBtn" />

              {/* <ThemeToggle/> */}
              <img
                onClick={() => router.push("/myProfile")}
                src={session?.user?.image}
                alt="profile_pic"
                className="h-10 rounded-full cursor-pointer"
              />
            </>
          ) : (
            <PlusCircleIcon onClick={handleSignInClick} className="navBtn" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
