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
    <div className=" font-inter mt-10">
      <div className=" text-balance ml-3 w-[306px]  text-3xl font-semibold leading-[112.5%] text-slate-950 max-md:ml-2.5">
        You are producing a visual arts exhibition for your local museum: A
        retained client, who you have a good relationship with.
      </div>
      <div className="mt-5 w-[321px] self-center pb-3 text-xl font-light leading-7 text-black">
        The client e-mailed you this, what would you include in your response?
        (Select All That Apply)
      </div>

      <Image
        src={letter}
        alt="letter"
        className="mt-2 flex aspect-square flex-col pb-5"
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
                className="whitespace-normal text-lg  font-normal leading-normal text-black  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
