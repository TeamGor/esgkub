import Image from "next/image";

export default function IntroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* First Row */}
      <div className="flex justify-center">
        <Image
          src="/image/MainPic.png"
          alt="Main Picture"
          width={500}
          height={500}
          className="rounded-lg w-full max-w-md"
        />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <Image
          src="/image/Logo.png"
          alt="Logo"
          width={1000}
          height={500}
          className="rounded-lg w-full max-w-lg"
        />
        <div className="py-4 px-4 text-base md:text-lg xl:text-xl text-[#0D3D03]">
          {/* We are an investment company dedicated to fostering sustainable growth
          for businesses that prioritize environmental and social responsibility,
          with a particular focus on those with high ESG. */}
          พวกเราเป็นบริษัทลงทุนที่มุ่งมั่นส่งเสริมการเติบโตอย่างยั่งยืนให้กับธุรกิจที่ให้ความสำคัญกับความรับผิดชอบต่อสิ่งแวดล้อมและสังคม โดยเน้นเป็นพิเศษกับธุรกิจที่มีคะแนน ESG สูง
        </div>
        <div className="py-4 px-4 text-base md:text-lg xl:text-xl text-[#0D3D03]">
          {/* Our mission is to support projects that reduce longterm environmental
          impact while creating opportunities for the development of sustainable
          technologies and efficient resource utilization. */}
          พันธกิจของเราคือการสนับสนุนโครงการที่ช่วยลดผลกระทบต่อสิ่งแวดล้อมในระยะยาว พร้อมทั้งสร้างโอกาสในการพัฒนาเทคโนโลยีที่ยั่งยืนและการใช้ทรัพยากรอย่างมีประสิทธิภาพ
        </div>
      </div>

      {/* Second Row (Full width) */}
      <div className="col-span-1 lg:col-span-2 px-4">
        <div className="py-4 text-base md:text-lg xl:text-xl text-[#0D3D03]">
          {/* We believe that a good investment not only generates financial returns
          but also creates positive impact on society and the environment. We
          specialize in selecting projects with high growth potential that can
          lead businesses towards long-term success, all while adhering to
          principles of transparency, responsibility, and creating value for
          shareholders and stakeholders alike. */}
          เรามีความเชื่อว่าการลงทุนที่ดีไม่เพียงแต่ให้ผลตอบแทนทางการเงินเท่านั้น แต่ยังต้องสร้างผลกระทบเชิงบวกต่อสังคมและสิ่งแวดล้อมด้วย เราเชี่ยวชาญในการคัดเลือกโครงการที่มีศักยภาพในการเติบโตสูง ซึ่งสามารถนำพาธุรกิจไปสู่ความสำเร็จในระยะยาว โดยยึดมั่นในหลักความโปร่งใส ความรับผิดชอบ และการสร้างคุณค่าให้แก่ผู้ถือหุ้นและผู้มีส่วนได้ส่วนเสียทุกฝ่าย
        </div>
        <div className="pb-4 text-base md:text-lg xl:text-xl text-[#0D3D03]">
          {/* We are committed to being a leader in supporting the growth of
          businesses that drive the world forward in a sustainable and
          environmentally friendly manner. */}
          เรามุ่งมั่นที่จะเป็นผู้นำในการสนับสนุนการเติบโตของธุรกิจที่ขับเคลื่อนโลกไปข้างหน้าอย่างยั่งยืนและเป็นมิตรต่อสิ่งแวดล้อม
        </div>
      </div>
    </div>
  );
}
