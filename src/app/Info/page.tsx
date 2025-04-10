"use client";

import { useRouter } from 'next/navigation';

export default function GeneralInfo() {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center my-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#98a07c] w-full max-w-4xl py-8 px-6 sm:py-10 sm:px-10 rounded-2xl shadow-lg">
                <p className="mb-6 leading-relaxed text-white font-bold text-xl sm:text-2xl">
                    ขอต้อนรับเข้าสู่การประเมิน ESG Rating สำหรับการกู้ยืม
                </p>
                <p className="mb-4 leading-relaxed text-white text-base sm:text-lg">
                    ในปัจจุบัน หลักการด้านสิ่งแวดล้อม สังคม และบรรษัทภิบาล (Environmental, Social, and Governance: ESG) กลายเป็นปัจจัยสำคัญในการดำเนินธุรกิจอย่างยั่งยืน ธุรกิจที่ให้ความสำคัญกับ ESG ไม่เพียงช่วยลดความเสี่ยงและเพิ่มโอกาสทางธุรกิจ แต่ยังสร้างความเชื่อมั่นให้กับนักลงทุนและสังคมโดยรวม
                </p>
                <p className="mb-4 leading-relaxed text-white text-base sm:text-lg">
                    เพื่อสนับสนุนบริษัทที่ดำเนินธุรกิจตามหลักการ ESG เราได้พัฒนาเครื่องมือ ESG Health Check สำหรับประเมินการดำเนินงานของบริษัทในด้านการกำกับดูแลกิจการ การบริหารความเสี่ยง การควบคุมภายใน และการจัดการห่วงโซ่อุปทาน โดยคำนึงถึงสิทธิมนุษยชน การไม่เลือกปฏิบัติ การจ้างแรงงานที่เป็นธรรม รวมถึงการจัดการพลังงานและก๊าซเรือนกระจก                
                </p>
                <p className="mb-6 leading-relaxed text-white text-base sm:text-lg">
                    กระบวนการ ESG Health Check ของเราช่วยให้บริษัทสามารถประเมินและปรับปรุงแนวทางปฏิบัติของตนให้สอดคล้องกับมาตรฐานสากล พร้อมทั้งเปิดโอกาสในการเข้าถึงแหล่งเงินทุนที่สนับสนุนธุรกิจที่มีความรับผิดชอบต่อสังคมและสิ่งแวดล้อม เรามุ่งหวังให้ธุรกิจที่ได้รับการสนับสนุนจากแพลตฟอร์มของเราสามารถเติบโตอย่างมั่นคงและสร้างผลกระทบเชิงบวกในระยะยาว                
                </p>
                
                <div className="flex justify-end">
                    <button 
                        onClick={() => router.push('/Info/0')}
                        className="bg-[#1d3b1d] text-white px-6 py-2 rounded-md text-md font-semibold shadow-md hover:bg-[#142a14] transition">
                        ถัดไป
                    </button>
                </div>
            </div>
        </div>
    );
}
