"use client";
import { useRouter } from "next/navigation";

export default function Package() {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/Info'); 
    };

    return (
        <div className="px-[10%] pt-[2%] grid grid-cols-2 h-screen gap-6 items-stretch">
            <div className="p-4 bg-[#A3AB82] text-white flex flex-col items-start justify-start px-[10%] pt-[10%] pb-[10%] rounded-xl">
                <div className="text-2xl font-bold mb-2">Corporate Green Transformation</div>
                <div><strong className="text-[#2E2C1F]">Loan Amount:</strong> 5,000,000</div>
                <div><strong className="text-[#2E2C1F]">Interest Rate:</strong> 3.2% per annum</div>
                <div><strong className="text-[#2E2C1F]">Term Length:</strong> 15 years</div>
                <div><strong className="text-[#2E2C1F]">Repayment Frequency:</strong> Quarterly</div>
                <div><strong className="text-[#2E2C1F]">Prepayment Option:</strong> No penalty for early repayment after 3 years</div>
                <div><strong className="text-[#2E2C1F]">Late Payment Fees:</strong> $500 per missed payment</div>
                <div><strong className="text-[#2E2C1F]">ESG Compliance Requirement:</strong> Must meet a minimum of 85% ESG rating, with a focus on carbon neutrality, sustainable supply chains, and energy efficiency.</div>
                <div
                    className="py-3 w-[40%] bg-[#0D3D03] text-white text-lg text-center rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#125C03] my-[5%]"
                    onClick={handleClick}>
                    Select Package
                </div>
            </div>
            <div className="p-4 bg-[#A3AB82] flex items-center justify-center rounded-xl py-[10%]">
                <div className="text-4xl font-bold text-white">Coming Soon</div>
            </div>
        </div>
    )
}
