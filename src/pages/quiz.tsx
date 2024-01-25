import React from "react";
import { Form } from "~/components/Form";
import { useQuestions } from "~/hooks/useQuestions";

export default function QuizPage() {
  const _ = useQuestions();
  return (
    <div className="mx-auto max-w-7xl">
      <Form />
    </div>
  );
}
