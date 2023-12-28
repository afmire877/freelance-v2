import * as React from "react";
import { Checkbox } from "./ui/checkbox";
import Image from "next/image";
import letter from "../assets/letter.png";
export function ImageCheckbox(props) {
  const mockchecklist = [
    {
      id: "callaction",
      text: "Call to action - confirm any assistance or actions that you and the client need to take to prepare for the event (including deadlines/or dates when you would need a response by)",
    },
    { id: "urgency", text: "Urgency" },
    { id: " formal-tone", text: " Formal Tone" },
    { id: "  clear-instructions", text: "  Clear Instructions" },
    { id: "include-social", text: " Include Social Media Handles" },
    {
      id: "confirm ",
      text: " Confirm I will share the exhibition through my networks",
    },
  ];
  return (
    <div className=" font-inter mt-10 pb-5 md:px-5">
      <div className="   flex  w-[306px] break-words text-3xl font-medium leading-[112.5%] text-slate-950 max-md:ml-2.5 md:w-full md:text-4xl lg:w-full lg:text-5xl">
        You are producing a visual arts exhibition for your local museum: A
        retained client, who you have a good relationship with.
      </div>
      <div className="mt-5 w-[321px]  self-center pb-3 text-xl font-light leading-7 text-black md:w-full">
        The client e-mailed you this, what would you include in your response?
        (Select All That Apply)
      </div>

      <Image
        src={letter}
        alt="letter"
        className="mt-2 flex aspect-square flex-col pb-5 lg:w-1/4 lg:px-5"
      />

      <div className="">
        {mockchecklist?.map(({ id, text }, idx) => {
          return (
            <div
              className="text-balance flex items-baseline space-x-2 py-4 "
              key={idx}
            >
              <Checkbox id={id} />
              <label
                htmlFor={id}
                className="text-lg font-normal leading-normal text-black peer-disabled:cursor-not-allowed  peer-disabled:opacity-70 lg:overflow-hidden lg:text-clip"
              >
                {text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
