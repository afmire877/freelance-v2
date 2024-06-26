import Head from "next/head";
import { notFound } from "next/navigation";
import Intro from "~/components/intro";
import { useQuestions } from "~/hooks/useQuestions";

export default function Home() {
  const { error } = useQuestions();

  if (error) notFound();

  return (
    <>
      <Head>
        <title>Freelancer&apos;s Odyssey - Good Growth Hub </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Intro />
      </main>
    </>
  );
}
