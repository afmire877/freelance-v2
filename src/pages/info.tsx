/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useToast } from "@/components/ui/use-toast";
import { ErrorMessage } from "@hookform/error-message";
import Image from "next/image";
import { useForm } from "react-hook-form";
import StyledButton from "~/components/StyledButton";
import useUserStore, { type User } from "~/store/userStore";
import GGH from "../assets/ggh.svg";
import LocalChamp from "../assets/localChampions.svg";

import { useRouter } from "next/router";
import { Checkbox } from "~/components/ui/checkbox";
import { Borough, NewsletterOptions } from "~/services/submittable";
import { api } from "~/utils/api";

export default function Info() {
  const setUser = useUserStore((s) => s.setUser);
  const router = useRouter();
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm<User>({ mode: "onBlur" });
  const { toast } = useToast();
  const submittableMutation = api.submission.saveToSubmittable.useMutation();
  const createMutation = api.submission.create.useMutation();
  const getIncomplete = api.submission.getIncomplete.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !getValues().name ||
      !getValues().dateOfBirth ||
      !getValues().email ||
      !getValues().contactNumber ||
      !getValues().borough ||
      !getValues().revenue ||
      !getValues().desiredRevenue ||
      !getValues().acceptedTOS
    ) {
      toast({
        variant: "destructive",
        title: "Please fill in all the fields.",
      });

      return;
    }
    const values = getValues();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    values.marketingConsent = values?.marketingConsent === "on" ? true : false;
    setUser(values);

    const {
      borough,
      contactNumber,
      email,
      dateOfBirth: dob,
      name,
      marketingConsent,
      acceptedTOS,
    } = getValues();

    const BoroughKey = borough.replace(" ", "") as keyof typeof Borough;
    const incompleteQuiz = await getIncomplete.mutateAsync({
      email: values.email,
    });

    if (incompleteQuiz) {
      toast({
        variant: "default",
        title: "You have an incomplete quiz, redirecting you to it.",
      });

      await router.push(`/quiz/${incompleteQuiz.uuid}`);
      return;
    }

    const [fname, lname] = name.split(" ");

    const firstName = fname ?? "";

    const record = await submittableMutation.mutateAsync({
      email,
      borough: Borough[BoroughKey],
      dob,
      personalData: !!acceptedTOS,
      phone: contactNumber,
      newsletter: !!marketingConsent
        ? NewsletterOptions.Yes
        : NewsletterOptions.No,
      firstName: firstName ?? "",
      lastName: lname ?? firstName,
    });

    const quiz = await createMutation.mutateAsync({
      answers: [],
      result: [],
      currentQuestionIndex: 0,
      user: getValues(),
      submissionId: record.id,
    });

    if (!quiz) return;

    await router.push(`/quiz/${quiz.uuid}`);
  };

  return (
    <div className="g:px-8 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:max-h-full xl:max-h-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 lg:text-3xl">
          About me
        </h2>
      </div>

      <form
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-lg"
        onSubmit={handleSubmit}
      >
        <div className="mt-5 text-xl text-black">Name</div>
        <input
          {...register("name", { required: true })}
          className="mt-2.5 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          placeholder="Type your name here..."
        />

        <div className="mt-4 text-xl text-black">Date of Birth</div>
        <input
          // / must be 18 to 30 to take the quiz
          min="1993-01-01"
          max="2003-01-01"
          {...register("dateOfBirth", {
            required: true,
            min: {
              value: "1993-01-01",
              message: "You must be 18 to 30 to take the quiz",
            },
            max: {
              value: "2003-01-01",
              message: "You must be 18 to 30 to take the quiz",
            },
          })}
          type="date"
          className="mt-3 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
        />
        <ErrorMessage
          errors={errors}
          name="dateOfBirth"
          render={() => (
            <>
              <div className="mt-3 text-sm text-red-500">
                {errors.dateOfBirth?.message}
              </div>
            </>
          )}
        />
        <div className="mt-4 text-xl text-black">Email</div>
        <input
          required={true}
          {...register("email", { required: true })}
          className="mt-1.5 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          placeholder="Type your email here..."
        />
        <div className="mt-6 text-xl text-black">Contact Number</div>
        <input
          required={true}
          {...register("contactNumber", { required: true })}
          className="mt-2.5 w-full border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          placeholder=" Type your Number here..."
        />
        <div className="mt-6 text-xl text-black">
          What borough do you live in?
        </div>
        <select
          className="mt-1.5 w-full grow border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          required={true}
          {...register("borough", { required: true })}
        >
          <option value="">Select the Borough You Live In...</option>
          <option value="Hackney">Hackney</option>
          <option value="Newham">Newham</option>

          <option value="Tower Hamlets">Tower Hamlets</option>
          <option value="Waltham Forest">Waltham Forest</option>
        </select>
        <div className="mt-6 text-xl text-black">
          I earn approx .... per year
        </div>
        <select
          className="mt-1.5 w-full grow border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          required={true}
          {...register("revenue", { required: true })}
        >
          <option value="">I earn approx .... per year</option>
          <option value="10-20">10,000 - 20,000</option>
          <option value="20-40">20,000 - 40,000</option>
          <option value="40-60">40,000 - 60,000</option>
          <option value="60-80">60,000 - 80,000</option>
          <option value="80-100">80,000 - 100,000</option>
          <option value="100+">100,000+</option>
        </select>
        <div className="mt-5 text-xl text-black">I would like to earn ...</div>
        <select
          className="mt-1.5 w-full grow border border-solid border-[color:var(--GGH\_navy,#050325)] bg-white py-3.5 pl-2 pr-5 text-sm text-black text-opacity-50"
          required={true}
          {...register("desiredRevenue", { required: true })}
        >
          <option value="">I earn approx .... per year</option>
          <option value="10-20">10,000 - 20,000</option>
          <option value="20-40">20,000 - 40,000</option>
          <option value="40-60">40,000 - 60,000</option>
          <option value="60-80">60,000 - 80,000</option>
          <option value="80-100">80,000 - 100,000</option>
          <option value="100+">100,000+</option>
          <option value="100+">200,000+</option>
        </select>

        <div className="my-3">
          <Checkbox
            {...register("acceptedTOS", { required: true })}
            className="mr-2"
          />
          <label>
            I have read and agree to the privacy policy, terms of service and
            community guidelines
          </label>
        </div>
        <div className="my-3">
          <Checkbox {...register("marketingConsent")} className="mr-2" />
          <label>
            I would like to receive news about Local Champions and Good Growth
            Hub
          </label>
        </div>

        <div className="mb-2  mt-2 flex w-[331px] max-w-full flex-col  lg:w-[800px]">
          <StyledButton
            type="submit"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onClick={handleSubmit}
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
      </form>
    </div>
  );
}
