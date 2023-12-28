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
    <div className="g:px-8 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:max-h-full xl:max-h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 lg:text-3xl">
          About me
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-lg">
        <div className="mt-5 text-xl text-black">Name</div>
        <input
          {...register("name", { required: true })}
          className="mt-2.5 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          placeholder="Type your name here..."
        />
        <div className="mt-4 text-xl text-black">Date of Birth</div>
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

        <div className="mb-2 ml-4  mt-2 flex w-[331px] max-w-full flex-col max-md:ml-2.5 lg:w-[800px]">
          {" "}
          <StyledButton
            onClick={async () => {
              console.log(getValues());
              setUser(getValues());
              await router.push("/quiz");
            }}
            label="Continue"
          />
          <div className="mt-1 flex w-[282px] max-w-full items-start justify-between gap-10 self-center lg:mt-3 lg:w-[800px]">
            <Image
              loading="lazy"
              src={GGH}
              className="lg:h-22 aspect-[1.06] w-[50px] max-w-full self-stretch overflow-hidden object-cover object-center "
              alt=""
            />
            <Image
              loading="lazy"
              src={LocalChamp}
              className="lg:h-22 my-auto aspect-[3.81] w-20 max-w-full self-center overflow-hidden object-cover object-center"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
