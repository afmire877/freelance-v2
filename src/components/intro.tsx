/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import GGH from "../assets/ggh.svg";
import LocalChamp from "../assets/localChampions.svg";
import LLDC from "../assets/lldc.jpeg";
import ArrowButton from "../assets/button.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Intro() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-md overflow-hidden  md:max-w-full">
      <div className="self-center whitespace-nowrap p-4 text-3xl font-medium text-black  md:mx-6  md:my-10 md:pt-12 lg:text-5xl ">
        Welcome to the Freelancer&apos;s Odyssey with Career Navigator{" "}
      </div>
      <div className="md:flex">
        <div className="flex flex-col md:mx-10 md:shrink-0 md:py-20">
          <Image
            alt=""
            loading="lazy"
            src={GGH}
            className=" self-center   object-cover "
          />
          <div className="flex justify-around py-2 text-4xl font-thin leading-7 text-black ">
            x
          </div>
          <Image
            alt=""
            loading="lazy"
            src={LocalChamp}
            className="mt-10 aspect-[3.79] w-[250px] max-w-full self-center overflow-hidden object-contain object-center"
          />
          <div className="flex justify-around py-2 text-4xl font-thin leading-7 text-black ">
            x
          </div>
          <Image
            alt=""
            loading="lazy"
            src={LLDC}
            className="mt-10 aspect-[3.79] h-[100px] max-w-full self-center overflow-hidden object-contain object-center"
          />
        </div>
        <div className="p-8">
          {/* <div className=" mt-11 self-stretch text-3xl font-light leading-8 text-black lg:w-[500px] lg:text-4xl">
            Welcome to the Freelancer&apos;s Odyssey with Career Navigator
          </div> */}
          <div className="lg:text-1xl ml-4 mt-9 self-stretch text-xl leading-7 text-black">
            <ul>
              <li className="list-disc pb-2 ">
                Begin your quest to unlock your freelance career&apos;s
                potential with our interactive quiz.
              </li>
              <li className="list-disc pb-2 ">
                Explore <span className="font-bold">6 sections</span>, each
                revealing a different aspect of your freelancing adventure.
              </li>
              <li className="list-disc pb-2 ">
                Invest just <span className="font-bold">30 minutes</span> for
                insightful responses that will shape your path.
              </li>
              <li className="list-disc pb-2">
                Receive a <span className="font-bold">tailored report</span>{" "}
                filled with <span className="font-bold">actionable</span> tips
                upon completion.
              </li>
              <li className="list-disc pb-2">
                Allow us to guide you forward, possibly with personalized
                coaching from our experts.
              </li>
            </ul>
          </div>
          <div
            className="relative mt-10 cursor-pointer"
            onClick={() => router.push("/info")}
          >
            <Image
              loading="lazy"
              src={ArrowButton}
              className="mb-12 mt-0 aspect-[4.61] w-[341px] max-w-full overflow-hidden object-cover object-center max-md:mb-10"
              alt=""
            />
            <div className=" absolute left-[5%] top-[25px] text-lg text-white">
              <p>Take Quiz</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
