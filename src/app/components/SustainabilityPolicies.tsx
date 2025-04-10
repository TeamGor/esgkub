import Image from "next/image";

export default function SustainabilityPolicies() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div className="bg-[#A3AB82] p-6 rounded-xl flex flex-col items-center">
        <Image
          src="/image/S1.png"
          alt="S1"
          width={500}
          height={500}
          className="rounded-lg w-full max-w-sm"
        />
        <div className="py-3 px-4 text-white text-center font-bold">
          {/* Sustainable Investment Approach */}
          แนวทางการลงทุนอย่างยั่งยืน
        </div>
        <div className="py-2 px-4 text-sm text-white">
          {/* We believe in investments that not only generate profits but also
          create a positive impact on the environment and society. By supporting
          businesses committed to sustainable development, we select projects
          that operate responsibly and are based on ESG principles to ensure that
          our investments align with a bright and sustainable future. */}
          เรามีความเชื่อในการลงทุนที่ไม่เพียงแต่สร้างผลกำไร แต่ยังต้องส่งเสริมผลกระทบเชิงบวกต่อสิ่งแวดล้อมและสังคม ด้วยการสนับสนุนธุรกิจที่มุ่งมั่นต่อการพัฒนาอย่างยั่งยืน เราคัดเลือกโครงการที่ดำเนินงานอย่างมีความรับผิดชอบและยึดหลัก ESG เพื่อให้มั่นใจว่าการลงทุนของเราสอดคล้องกับอนาคตที่สดใสและยั่งยืน
        </div>
      </div>
      <div className="bg-[#A3AB82] p-6 rounded-xl flex flex-col items-center">
        <Image
          src="/image/S2.png"
          alt="S2"
          width={500}
          height={500}
          className="rounded-lg w-full max-w-sm"
        />
        <div className="py-3 px-4 text-white text-center font-bold">
          {/* Support for Green Businesses */}
          การสนับสนุนธุรกิจสีเขียว
        </div>
        <div className="py-2 px-4 text-sm text-white">
          {/* We are dedicated to supporting businesses that use natural resources
          efficiently, prevent and reduce harmful environmental impacts, and
          develop technologies or projects that bring about positive change in
          the world. We advocate for clean energy use and the development of
          socially responsible projects. */}
          เราทุ่มเทในการสนับสนุนธุรกิจที่ใช้ทรัพยากรธรรมชาติอย่างมีประสิทธิภาพ ป้องกันและลดผลกระทบที่เป็นอันตรายต่อสิ่งแวดล้อม รวมถึงพัฒนาเทคโนโลยีหรือโครงการที่ก่อให้เกิดการเปลี่ยนแปลงเชิงบวกต่อโลก เราสนับสนุนการใช้พลังงานสะอาดและการพัฒนาโครงการที่มีความรับผิดชอบต่อสังคม
        </div>
      </div>
      <div className="bg-[#A3AB82] p-6 rounded-xl flex flex-col items-center">
        <Image
          src="/image/S3.png"
          alt="S3"
          width={500}
          height={500}
          className="rounded-lg w-full max-w-sm"
        />
        <div className="py-3 px-4 text-white text-center font-bold">
          {/* Commitment to Transparency and Reporting */}
          ความมุ่งมั่นในความโปร่งใสและการรายงานข้อมูล
        </div>
        <div className="py-2 px-4 text-sm text-white">
          {/* We are committed to transparency in our operations and to providing
          relevant information about the company’s activities. We will regularly
          publish ESG reports for all stakeholders, allowing them to track the
          success and progress of the projects we support. */}
          เรามุ่งมั่นในการดำเนินงานอย่างโปร่งใส และให้ข้อมูลที่เกี่ยวข้องเกี่ยวกับกิจกรรมของบริษัทอย่างครบถ้วน เราจะจัดทำรายงาน ESG อย่างสม่ำเสมอเพื่อเผยแพร่แก่ผู้มีส่วนได้ส่วนเสียทุกฝ่าย เพื่อให้สามารถติดตามความสำเร็จและความก้าวหน้าของโครงการที่เราให้การสนับสนุนได้อย่างต่อเนื่อง
        </div>
      </div>
    </div>
  );
}
