/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import GGH from "../assets/ggh.svg";
import LocalChamp from "../assets/localChampions.svg";
import ArrowButton from "../assets/button.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Intro() {
  const router = useRouter();
  return (
    <div className="font-inter mx-auto flex w-full max-w-[480px] flex-col items-stretch bg-white pb-12 ">
      <div className="flex min-h-[58px] w-full flex-col" />
      <div className="mt-2 flex w-full flex-col px-6">
        <div className="self-center whitespace-nowrap text-3xl font-medium text-black">
          Intro to Freelance Quiz
        </div>
        <Image
          alt=""
          loading="lazy"
          src={GGH}
          className="mt-10 aspect-[1.06] w-[193px] max-w-full self-center overflow-hidden object-contain object-center"
        />
        <div className="mt-10 self-center whitespace-nowrap text-4xl font-thin leading-7 text-black">
          x
        </div>
        <Image
          alt=""
          loading="lazy"
          src={LocalChamp}
          className="mt-10 aspect-[3.79] w-[250px] max-w-full self-center overflow-hidden object-contain object-center"
        />
        <div className=" mt-11 self-stretch text-3xl font-light leading-8 text-black">
          Take our quiz to understand the basics of freelancing and where you
          stand.
        </div>
        <div className="ml-4 mt-9 self-stretch text-xl leading-7 text-black">
          <ul>
            <li className="list-disc pb-2 ">
              This quiz is divided into{" "}
              <span className="font-bold">6 sections</span> tailored to provide
              insights about your freelancing journey.
            </li>
            <li className="list-disc pb-2">
              Set aside approximately{" "}
              <span className="font-bold">30 minutes</span> to complete the
              quiz. This ensures you can thoughtfully answer each question.
            </li>
            <li className="list-disc pb-2">
              Once you've completed the quiz, you'll receive a{" "}
              <span className="font-bold">personalised</span>{" "}
              <span className="font-bold">report</span> offering suggestions for
              improvement.
            </li>
            <li className="list-disc pb-2">
              We'll guide you on the next steps, which may include a
              consultation <span className="font-bold">1-2-1 </span>
              <span className="font-bold">call</span> with our team
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
  );
}
