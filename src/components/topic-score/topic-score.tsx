import classnames from "classnames";
import React from "react";
import useUserStore from "~/store/userStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Progress } from "../ui/progress";

export interface TopicScoreProps {
  className?: string;
}

export const TopicScore: React.FC<TopicScoreProps> = ({ className = "" }) => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  const result = useUserStore((s) => s.result);

  return (
    <div className={classnames(className, "w-full border-none")}>
      {result?.map(
        (
          { breakdown, overallResult: { competence, confidence }, topic },
          idx,
        ) => {
          return (
            <Accordion
              key={idx}
              type="single"
              collapsible
              className="w-full "
              value={value}
              onValueChange={setValue}
            >
              <h2 className="my-2 text-3xl font-bold ">{topic}</h2>
              {Object.entries(breakdown)?.map(
                ([subtopic, { competence, improvement }], idx) => {
                  if (!subtopic || subtopic === "undefined") return null;

                  const scoreMax =
                    competence.score / (competence.percentage / 100);
                  const id = `${subtopic}-${idx}`;

                  const needsImprovement = competence.percentage < 90;
                  return (
                    <AccordionItem
                      key={idx}
                      value={id}
                      className="mb-5 border-none"
                      disabled={!needsImprovement}
                    >
                      <AccordionTrigger
                        className={classnames(
                          "md:4xl  bg-gray-100 px-4 py-8 text-2xl font-medium",
                          value === id ? "rounded-t-lg" : "rounded-lg",
                        )}
                        disabled={
                          !needsImprovement || improvement?.length === 0
                        }
                      >
                        <div className="flex w-full flex-col">
                          <div className="flex w-full">
                            <p className="mr-10">{subtopic}</p>
                            {needsImprovement && (
                              <span className="hover:underline-transparent inline-flex items-center rounded-md bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800 ring-1 ring-inset ring-orange-600/20 hover:no-underline">
                                🔥 Needs improvement
                              </span>
                            )}
                          </div>

                          <div className="flex w-full flex-col ">
                            <p className="mb-2 text-left text-sm font-light">
                              {competence.score}/
                              {!isNaN(scoreMax) ? scoreMax : 0}
                            </p>
                            <Progress value={competence.percentage} />
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="rounded-b-lg  bg-gray-100 px-4 py-8">
                        <p className="font-bold">Things to work on:</p>
                        <ul className="list-disc">
                          {improvement?.map((item, idx) => {
                            return (
                              <li key={idx} className="ml-2">
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  );
                },
              )}
            </Accordion>
          );
        },
      )}
    </div>
  );
};
