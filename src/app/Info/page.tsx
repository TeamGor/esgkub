"use client";

import { useRouter } from 'next/navigation';

export default function GeneralInfo() {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center py-[6%]">
            <div className="bg-[#98a07c] max-w-screen mx-[10%] py-[5%] px-[10%] rounded-2xl shadow-lg">
                <p className="mb-[5%] leading-relaxed text-white font-bold text-xl text-center">
                    ในปัจจุบัน หลักการด้านสิ่งแวดล้อม สังคม และบรรษัทภิบาล (Environmental, Social, and Governance: ESG) 
                    กลายเป็นปัจจัยสำคัญในการดำเนินธุรกิจอย่างยั่งยืน ธุรกิจที่ให้ความสำคัญกับ ESG ไม่เพียงช่วยลดความเสี่ยงและเพิ่มโอกาสทางธุรกิจ 
                    แต่ยังสร้างความเชื่อมั่นให้กับนักลงทุนและสังคมโดยรวม
                </p>
                <p className="mb-[5%] leading-relaxed text-white font-bold text-xl text-center">
                    กระบวนการ ESG Health Check ของเราช่วยให้บริษัทสามารถประเมินและปรับปรุงแนวทางปฏิบัติของตนให้สอดคล้องกับมาตรฐานสากล 
                    พร้อมทั้งเปิดโอกาสในการเข้าถึงแหล่งเงินทุนที่สนับสนุนธุรกิจที่มีความรับผิดชอบต่อสังคมและสิ่งแวดล้อม
                </p>
                
                {/* Button container aligned to the right */}
                <div className="flex justify-end">
                    <button 
                        onClick={() => router.push('/Info/0')}
                        className="bg-[#1d3b1d] text-white px-[8%] py-2 
                        rounded-md text-md font-semibold shadow-md hover:bg-[#142a14] transition">
                        ถัดไป
                    </button>
                </div>
            </div>
        </div>
    );
}
