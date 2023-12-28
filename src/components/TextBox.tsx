import * as React from "react";
import { Textarea } from "./ui/textarea";
export function TextBox() {
  return (
    <div className="font-inter mt-10  flex flex-col items-start ">
      <div className=" ml-3 flex w-[306px]   break-words text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 md:text-4xl lg:whitespace-nowrap lg:text-5xl ">
        Which platforms do you use to share your work?
      </div>
      <div className="lg:text-1xl ml-3.5 mt-5 self-start text-lg text-black">
        Use the text box below to answer...
      </div>

      <Textarea className=" mt-12 aspect-[1.78] w-full self-stretch overflow-hidden fill-white stroke-slate-950 stroke-[2px] object-contain object-center pb-6 lg:h-60 " />
    </div>
  );
}
