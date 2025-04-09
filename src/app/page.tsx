"use client";
import { useRouter } from "next/navigation";
import IntroSection from "./components/Introsection";
import SustainabilityPolicies from "./components/SustainabilityPolicies";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = () => {
    router.push("/Package");
  };

  return (
    <div className="px-4 sm:px-8 md:px-[10%] pt-8 flex flex-col items-center w-full max-w-screen-xl mx-auto">
      <IntroSection />
      <div className="my-[2%]" />
      <SustainabilityPolicies />
      <div
        className="w-full sm:w-[60%] md:w-[40%] bg-[#0D3D03] text-white font-bold text-lg text-center rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#125C03] my-8 py-3"
        onClick={handleClick}
      >
        Start Your Journey
      </div>
    </div>
  );
}
