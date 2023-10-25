export default function Scale() {
  return (
    <div className="flex flex-col bg-white px-5">
      <div className="mt-10 flex w-[306px] max-w-full flex-col">
        <div className="flex h-2 w-[23px] flex-col bg-pink-600" />
        <div className="ml-3 text-3xl font-bold leading-[112.5%] text-slate-950 max-md:ml-2.5">
          I feel confident writing an invoice
        </div>
        <div className="ml-3.5 mt-20 flex w-[154px] max-w-full items-start gap-5 max-md:ml-2.5 max-md:mt-10">
          <img
            loading="lazy"
            srcSet="..."
            className="aspect-square w-5 max-w-full overflow-hidden rounded-[50%] stroke-[2px] object-cover object-center"
          />
          <div className="mt-1 text-lg text-black">Very Confident</div>
        </div>
        <div className="ml-3.5 mt-16 flex w-[161px] max-w-full items-start gap-5 max-md:ml-2.5 max-md:mt-10">
          <img
            loading="lazy"
            srcSet="..."
            className="aspect-square w-5 max-w-full overflow-hidden rounded-[50%] stroke-[2px] object-cover object-center"
          />
          <div className="flex w-[123px] flex-col">
            <div className="text-lg text-black max-md:mr-0.5">
              Quite Confident
            </div>
            <div className="mt-2 h-0.5 w-full self-stretch bg-pink-600" />
          </div>
        </div>
        <div className="ml-3.5 mt-16 flex w-[204px] max-w-full items-start gap-5 max-md:ml-2.5 max-md:mt-10">
          <img
            loading="lazy"
            srcSet="..."
            className="aspect-square w-5 max-w-full self-stretch overflow-hidden rounded-[50%] stroke-[2px] object-cover object-center"
          />
          <div className="my-auto text-lg text-black">Somewhat Confident</div>
        </div>
        <div className="ml-3.5 mt-16 flex w-[177px] max-w-full items-start gap-5 max-md:ml-2.5 max-md:mt-10">
          <img
            loading="lazy"
            srcSet="..."
            className="aspect-square w-5 max-w-full overflow-hidden rounded-[50%] stroke-[2px] object-cover object-center"
          />
          <div className="text-lg text-black">Slightly Confident</div>
        </div>
        <div className="ml-3 mt-16 flex w-[191px] max-w-full items-start gap-5 max-md:ml-2.5 max-md:mt-10">
          <img
            loading="lazy"
            srcSet="..."
            className="aspect-square w-5 max-w-full self-stretch overflow-hidden rounded-[50%] stroke-[2px] object-cover object-center"
          />
          <div className="my-auto text-lg text-black">Not at all Confident</div>
        </div>
      </div>
      <div className="mb-14 mt-48 flex w-[345px] max-w-full items-start justify-between gap-5 max-md:my-10">
        <div className="flex items-start justify-between gap-2.5 self-stretch">
          <img
            loading="lazy"
            srcSet="..."
            className="aspect-square w-full flex-1 -rotate-90 overflow-hidden object-cover object-center"
          />
          <div className="my-auto self-center text-base font-bold text-black">
            Back
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 self-stretch">
          <div className="my-auto self-center text-base font-bold text-black">
            Next{" "}
          </div>
          <img
            loading="lazy"
            srcSet="..."
            className="aspect-square w-full flex-1 rotate-90 overflow-hidden object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
