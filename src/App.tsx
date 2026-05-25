import { useEffect, useState } from "react";
import { TopStrip } from "./components/TopStrip";
import { NationalHeader } from "./components/NationalHeader";
import { Hero } from "./components/Hero";
import { GDPFlipTracker } from "./components/GDPFlipTracker";
import { President } from "./components/President";
import { Constitution } from "./components/Constitution";
import { Citizenship } from "./components/Citizenship";
import { Footer } from "./components/Footer";
import { IssueCitizenship } from "./components/IssueCitizenship";

function currentRoute() {
  const h = window.location.hash || "";
  if (h.startsWith("#/issue")) return "issue";
  return "home";
}

export default function App() {
  const [route, setRoute] = useState<"home" | "issue">(() => currentRoute());

  useEffect(() => {
    const onHash = () => setRoute(currentRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  if (route === "issue") {
    return (
      <>
        <TopStrip />
        <IssueCitizenship />
        <Footer />
      </>
    );
  }

  return (
    <>
      <TopStrip />
      <NationalHeader />
      <main>
        <Hero />
        <GDPFlipTracker />
        <President />
        <Constitution />
        <Citizenship />
      </main>
      <Footer />
    </>
  );
}
