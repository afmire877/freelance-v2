import Image from "next/image";
import { useRouter } from "next/router";
import React, { type FormEvent, type MouseEventHandler } from "react";
import ArrowButton from "../assets/button.svg";
interface IStyledButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLFormElement> {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function StyledButton({
  onClick,
  label,
  ...props
}: IStyledButton) {
  const defaultOnClick = () => router.push("/quiz");

  const router = useRouter();
  return (
    <button
      className="g:w-full lg:abosolute relative mt-5 cursor-pointer lg:inset-y-0 lg:right-0"
      onClick={onClick ?? defaultOnClick}
      {...props}
    >
      <Image
        loading="lazy"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        src={ArrowButton}
        className="mb-2 mt-0 aspect-[4.61] w-[341px] max-w-full overflow-hidden object-cover object-center max-md:mb-10"
        alt=""
      />
      <div className=" absolute left-[5%] top-[25px] pb-4 text-lg text-white ">
        <p>{label ?? "Take Quiz"}</p>
      </div>
    </button>
  );
}
