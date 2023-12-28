import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const Dashboard = () => {
  return (
    <div className="flex items-start justify-around gap-5 bg-white py-12 pl-5 pr-20 max-md:flex-wrap max-md:px-5">
      <div className="mt-5 flex flex-col items-stretch max-md:max-w-full">
        <div className="text-3xl font-bold leading-9 text-black max-md:max-w-full">
          Intro To Freelance Quiz: Results
        </div>
        <div className="mt-8 text-3xl leading-8 text-pink-600 max-md:max-w-full">
          Toyin Martins
        </div>
        <div className="mt-6 flex items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="text-xl font-bold leading-7 text-black">
            Age: <span className="">25</span>
          </div>
          <div className="shrink grow basis-auto text-xl font-bold leading-7 text-black">
            Borough: <span className="">Waltham Forest</span>
          </div>
        </div>
        <div className="mt-6 border-2 border-solid border-slate-950 bg-blue-300 px-2 py-3 max-md:max-w-full max-md:pr-5">
          <div className="flex gap-5 max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex w-[52%] flex-col items-stretch max-md:ml-0 max-md:w-full">
              <div className="text-xl leading-7 text-black max-md:mt-10">
                Freelance Sector(s):
                <br />
                <span className="text-base">Technology</span>
                <br />
                <span className="text-base">Product Design</span>
                <br />
                <span className="text-base">Research</span>
              </div>
            </div>
            <div className="ml-5 flex w-[48%] flex-col items-stretch max-md:ml-0 max-md:w-full">
              <div className="text-xl leading-7 text-black max-md:mt-10">
                Freelance Experience:
                <br />
                <span className="text-base">1-3 Years</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-3xl leading-8 text-black max-md:max-w-full">
          Summary of Results
        </div>
        <Accordion type="single" collapsible className=" w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Sales: <span className="item-end ">9</span>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Marketing <span>8</span>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Portfolio: <span>8</span>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Admin: <span>8</span>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Legal: <span>8</span>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>
              Financial Literacy: <span>8</span>
            </AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <div className="mt-10 text-xl font-bold leading-7 text-black max-md:max-w-full">
          <div _text="" />
        </div>
    //  */}
      </div>
      <div className="my-auto flex items-stretch justify-between gap-5 self-center px-10 max-md:max-w-full max-md:flex-wrap">
        <div className="h-[827px] w-px shrink-0 bg-black" />
        <div className="my-auto flex grow basis-[0%] flex-col items-stretch self-center">
          <div className="flex w-full flex-col items-stretch border-2 border-solid border-slate-950 bg-white py-3.5 pr-3.5">
            <div className="flex items-center justify-between gap-0">
              <div className="my-auto text-xs text-black">
                Financial Literacy
              </div>
              <div className="relative flex aspect-[0.8746081504702194] grow basis-[0%] flex-col items-stretch self-stretch overflow-hidden pb-4 pl-7 pr-9 pt-11 max-md:px-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e5768e28ec2f5a9a8fe95c3c1f74c4d701be6157143d10f095875ee5c71fa64c?apiKey=2ab1cdf719934d17a59058b713a44a56&"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="relative flex items-start justify-between gap-5">
                  <div className="flex basis-[0%] flex-col items-center">
                    <div className="flex flex-col items-stretch self-stretch">
                      <div className="whitespace-nowrap text-xs leading-8 text-black">
                        Sales
                      </div>
                      <div className="mt-12 flex h-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px] max-md:mt-10" />
                    </div>
                    <div className="mt-8 flex h-[5px] shrink-0 flex-col self-stretch rounded-[50%] stroke-[0.4px]" />
                    <div className="mt-7 flex h-[5px] w-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                  </div>
                  <div className="flex grow basis-[0%] flex-col self-stretch">
                    <div className="flex items-end justify-between gap-5 self-stretch">
                      <div className="mt-11 flex h-[5px] w-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px] max-md:mt-10" />
                      <div className="flex flex-col items-end self-stretch">
                        <div className="whitespace-nowrap text-xs leading-8 text-black">
                          Marketing
                        </div>
                        <div className="mt-8 flex h-[5px] shrink-0 flex-col self-stretch rounded-[50%] stroke-[0.4px]" />
                        <div className="mt-2.5 flex h-[5px] w-[5px] shrink-0 flex-col self-center rounded-[50%] stroke-[0.4px]" />
                      </div>
                    </div>
                    <div className="mt-12 flex items-stretch justify-between gap-5 self-stretch pr-10 max-md:mt-10 max-md:pr-5">
                      <div className="flex flex-col items-end">
                        <div className="flex h-[5px] w-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                        <div className="mt-7 flex h-[5px] shrink-0 flex-col self-stretch rounded-[50%] stroke-[0.4px]" />
                      </div>
                      <div className="my-auto flex flex-col items-stretch self-center">
                        <div className="flex h-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                        <div className="mt-3 flex h-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                      </div>
                    </div>
                    <div className="mt-5 flex h-[5px] shrink-0 flex-col self-stretch rounded-[50%] stroke-[0.4px]" />
                    <div className="mt-3 flex items-start justify-between gap-3 self-center">
                      <div className="flex h-[5px] w-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                      <div className="flex grow basis-[0%] flex-col items-stretch">
                        <div className="flex h-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                        <div className="mt-1 flex h-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                      </div>
                      <div className="mt-3.5 flex h-[5px] w-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                      <div className="flex h-[5px] w-[5px] shrink-0 flex-col rounded-[50%] stroke-[0.4px]" />
                    </div>
                  </div>
                </div>
                <div className="relative mt-10 flex w-[189px] max-w-full items-stretch justify-between gap-5 self-center">
                  <div className="text-xs leading-8 text-black">Legal</div>
                  <div className="self-start text-xs leading-8 text-black">
                    Admin
                  </div>
                </div>
              </div>
              <div className="mt-40 self-start whitespace-nowrap text-xs leading-8 text-black max-md:mt-10">
                Portfolio
              </div>
            </div>
            <div className="mt-5 flex w-16 max-w-full items-center gap-0.5 self-start">
              <div className="my-auto text-xs font-bold leading-8 text-black">
                Confidence:
                <br />
                Competence:{" "}
              </div>
              <div className="flex grow basis-[0%] flex-col items-stretch self-stretch">
                <div className="flex h-[11px] shrink-0 flex-col border border-solid border-blue-300 bg-blue-300 bg-opacity-40" />
                <div className="mt-5 flex h-[11px] shrink-0 flex-col border border-solid border-pink-600 bg-pink-600 bg-opacity-20" />
              </div>
            </div>
          </div>
          <div className="relative mt-72 aspect-[4.608108108108108] flex-col items-stretch justify-center self-start overflow-hidden py-7 text-xl font-bold leading-7 text-white max-md:mt-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/293244e73d78dbd82ef3d920285cf07a58eaa71da63fd449130e8c54876cc01e?apiKey=2ab1cdf719934d17a59058b713a44a56&"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            Contact Toyin
          </div>
        </div>
      </div>
    </div>
  );
};
