/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import StyledButton from "~/components/StyledButton";
import GGH from "../assets/ggh.svg";
import LocalChamp from "../assets/localChampions.svg";
import useUserStore, { type User } from "~/store/userStore";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Info() {
  const setUser = useUserStore((state) => state.setUser);
  const { register, getValues } = useForm<User>();
  const router = useRouter();

  return (
    <div className="flex flex-col bg-white pl-3.5 pr-5">
      <div className="mt-16 flex w-[356px] max-w-full flex-col max-md:mt-10">
        <div className="text-3xl font-bold text-black">About Me</div>
        <div className="mt-10 text-xl text-black">Name</div>
        <input
          {...register("name", { required: true })}
          className="mt-2.5 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          placeholder="Type your name here..."
        />
        <div className="mt-4 text-xl text-black" />
        <input
          {...register("dateOfBirth", { required: true })}
          type="date"
          className="mt-3 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
        />

        <div className="mt-4 text-xl text-black">Email</div>
        <input
          {...register("email", { required: true })}
          className="mt-1.5 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          placeholder="Type your email here..."
        />

        <div className="mt-6 text-xl text-black">Contact Number</div>
        <input
          {...register("contactNumber", { required: true })}
          className="mt-2.5 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          placeholder=" Type your Number here..."
        />
        <div className="mt-6 text-xl text-black">Borough</div>
        <select
          {...register("borough", { required: true })}
          className="mt-1.5 w-full grow border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
        >
          <option value="">Select the Borough You Live In...</option>
          <option value="Hackney">Hackney</option>
          <option value="Newham">Newham</option>
          <option value="Redbridge">Redbridge</option>
          <option value="Tower Hamlets">Tower Hamlets</option>
          <option value="Waltham Forest">Waltham Forest</option>
        </select>
      </div>
      <div className="mb-8 ml-4  flex w-[341px] max-w-full flex-col max-md:ml-2.5 ">
        <StyledButton
          onClick={async () => {
            setUser(getValues());
            await router.push("/quiz");
          }}
          label="continue"
        />
        <div className="mt-3 flex w-[282px] max-w-full items-start justify-between gap-5 self-center">
          <Image
            loading="lazy"
            src={GGH}
            className="aspect-[1.06] w-[50px] max-w-full self-stretch overflow-hidden object-cover object-center"
            alt=""
          />
          <Image
            loading="lazy"
            src={LocalChamp}
            className="my-auto aspect-[3.81] w-20 max-w-full self-center overflow-hidden object-cover object-center"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
