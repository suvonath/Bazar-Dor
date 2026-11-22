

import Image from "next/image";
import React, { Suspense } from "react";
import Navlinks from "./Navlinks";
import MarqueeSection from "./MarqueeSection";


const Header = () => {
 const date = new Date().toLocaleDateString("bn-BD", { dateStyle:'full'})

  return (
    <header>
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex gap-3 items-center">
          <div className="bg-green-500 h-10 w-10 rounded flex justify-center items-center">
            <Image
              src="/logo-icon.png"
              alt="Bazar-Dor logo"
              height={30}
              width={30}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold">বাজার দর</h2>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button>Profile</button>
          <button>Sign Out</button>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navlinks />
        <MarqueeSection />
      </Suspense>
    </header>
  );
};

export default Header;
