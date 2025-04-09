"use client";
import { useRouter } from "next/navigation";

export default function Package() {
    const router = useRouter();
    
    const handleClick = () => {
        router.push('/Info'); 
    };

    return (
        <div className="px-4 md:px-[10%] pt-4 md:pt-[2%] grid grid-cols-1 md:grid-cols-2 min-h-screen gap-6 items-stretch">
            <div className="p-6 md:p-10 bg-[#A3AB82] text-white flex flex-col justify-between rounded-xl">
                <div>
                    <div className="text-xl md:text-2xl font-bold mb-4">Corporate Green Transformation</div>
                    <div className="mb-1"><strong className="text-[#2E2C1F]">Loan Amount:</strong> 5,000,000</div>
                    <div className="mb-1"><strong className="text-[#2E2C1F]">Interest Rate:</strong> 3.2% per annum</div>
                    <div className="mb-1"><strong className="text-[#2E2C1F]">Term Length:</strong> 15 years</div>
                    <div className="mb-1"><strong className="text-[#2E2C1F]">Repayment Frequency:</strong> Quarterly</div>
                    <div className="mb-1"><strong className="text-[#2E2C1F]">Prepayment Option:</strong> No penalty for early repayment after 3 years</div>
                    <div className="mb-1"><strong className="text-[#2E2C1F]">Late Payment Fees:</strong> $500 per missed payment</div>
                    <div className="mb-4"><strong className="text-[#2E2C1F]">ESG Compliance Requirement:</strong> Must meet a minimum of 85% ESG rating, with a focus on carbon neutrality, sustainable supply chains, and energy efficiency.</div>
                </div>
                
                <div
                    className="mt-auto self-end py-3 px-6 bg-[#0D3D03] text-white text-lg text-center rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#125C03] w-full sm:w-2/3 md:w-[60%] lg:w-[40%]"
                    onClick={handleClick}>
                    Select Package
                </div>
            </div>

            <div className="p-6 md:p-10 bg-[#A3AB82] flex items-center justify-center rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-white text-center">Coming Soon</div>
            </div>
        </div>
    )
}
