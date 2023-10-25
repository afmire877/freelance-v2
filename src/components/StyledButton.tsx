import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import ArrowButton from "../assets/button.svg";
interface IStyledButton {
  label: string;
  onClick?: () => void;
}

export default function StyledButton({ onClick, label }: IStyledButton) {
  const defaultOnClick = () => router.push("/quiz");

  const router = useRouter();
  return (
    <div
      className="relative mt-10 cursor-pointer"
      onClick={onClick ?? defaultOnClick}
    >
      <Image
        loading="lazy"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        src={ArrowButton}
        className="mb-12 mt-0 aspect-[4.61] w-[341px] max-w-full overflow-hidden object-cover object-center max-md:mb-10"
        alt=""
      />
      <div className=" absolute left-[5%] top-[25px] text-white">
        <p>{label ?? "Take Quiz"}</p>
      </div>
    </div>
  );
}
