import { useRouter } from "next/router";
import { useEffect } from "react";
import { Form } from "~/components/Form";
import Spinner from "~/components/Spinner";
import useUserStore from "~/store/userStore";

export default function QuizPage() {
  const user = useUserStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.email) void router.push("/");
  }, [user.email]);

  if (!user.email)
    return (
      <div className="flex h-screen max-w-7xl items-center justify-center text-center text-4xl">
        <div>
          <Spinner label="Redirecting...." />
        </div>
      </div>
    );

  return (
    <div className="pattern">
      <div className=" mx-auto max-w-7xl">
        <Form />
      </div>
    </div>
  );
}
