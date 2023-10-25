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
    <div className="flex flex-col bg-white pl-5 pr-5">
      <div className="ml-3 mt-16 max-w-[301px] text-3xl font-bold text-black max-md:ml-2.5 max-md:mt-10">
        Intro to Freelance Quiz
      </div>
      <Image
        loading="lazy"
        src={GGH}
        className="mt-10 aspect-[1.06] w-[193px] max-w-full self-center overflow-hidden object-cover object-center"
        alt=""
      />
      <div className="self-center text-4xl font-thin leading-[70%] text-black">
        x
      </div>
      <Image
        loading="lazy"
        src={LocalChamp}
        className="mt-10 aspect-[3.79] w-[250px] max-w-full self-center overflow-hidden object-cover object-center"
        alt=""
      />
      <div className="mt-5 w-[343px] max-w-full text-3xl leading-[114.286%] text-black max-md:ml-2.5">
        Take our quiz to understand the basics of freelancing and where you
        stand
      </div>
      <div className="mt-9 w-[319px] max-w-full text-xl font-bold leading-7 text-black max-md:ml-1">
        This quiz is divided into 6 sections tailored to provide insights about
        your freelancing journey. <br /> Set aside approximately 30 minutes to
        complete the quiz. This ensures you can thoughtfully answer each
        question. Once you&apos;ve completed the quiz, you&apos;ll receive a
        personalised report offering suggestions for improvement. <br />{" "}
        We&apos;ll guide you on the next steps, which may include a consultation
        1-2-1 call with our team.
      </div>{" "}
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
        <div className=" absolute left-[5%] top-[25px] text-white">
          <p>Take Quiz</p>
        </div>
      </div>
    </div>
  );
}
