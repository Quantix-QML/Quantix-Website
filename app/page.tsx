import { Experience } from "@/components/experience/Experience";
import { IntroScene } from "@/components/site/IntroScene";
import { LandingScene } from "@/components/site/LandingScene";

export default function Home() {
  return (
    <>
      <IntroScene />
      <Experience centered landing />
      <LandingScene />
    </>
  );
}
