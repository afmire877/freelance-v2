import React from "react";
import { FiXCircle } from "react-icons/fi";

export default function NotEligible() {
  return (
    <div className="flex h-screen w-full max-w-7xl flex-col items-center justify-center">
      <FiXCircle className="mb-4 text-6xl text-pink-500" />
      {/* <h1 className="text-3xl">Sorry...</h1> */}
      <span className=" text-black">
        You are not eligible to take this quiz{" "}
      </span>
    </div>
  );
}
