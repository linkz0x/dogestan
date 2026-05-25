import { TopStrip } from "./components/TopStrip";
import { NationalHeader } from "./components/NationalHeader";
import { Hero } from "./components/Hero";
import { GDPFlipTracker } from "./components/GDPFlipTracker";
import { President } from "./components/President";
import { Constitution } from "./components/Constitution";
import { Citizenship } from "./components/Citizenship";
import { Footer } from "./components/Footer";

export default function App() {
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
