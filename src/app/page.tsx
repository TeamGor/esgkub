"use client"
import IntroSection from "./components/Introsection";
import SustainabilityPolicies from "./components/SustainabilityPolicies";

export default function Home() {
    const handleClick = () => {
        alert('Button clicked!');
    };

    return (
      <div className="px-[10%] pt-[2%] flex flex-col items-center">
        <IntroSection/>
        <div className="mt-[-20%]"></div>
        <SustainabilityPolicies/>
        <div
            className="py-3 w-[40%] bg-[#0D3D03] text-white text-lg text-center rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#125C03] my-[5%]"
            onClick={handleClick}>
            Start Your Journey
        </div>
      </div>
    );
  }