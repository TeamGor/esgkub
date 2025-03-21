import Image from "next/image"

export default function SustainabilityPolicies(){
    return(
        <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <div className="bg-[#A3AB82] p-6 rounded-xl">
                <Image src="/image/S1.png" alt="Main Picture" width={500} height={500} className="rounded-lg"/>
                <div className="py-[3%] px-[5%] text-lg text-white text-center font-bold">Sustainable Investment Approach</div>
                <div className="py-[2%] px-[5%] text-sm text-white">We believe in investments that not only generate profits but also create a positive impact on the environment and society. By supporting businesses committed to sustainable development, we select projects that operate responsibly and are based on ESG principles to ensure that our investments align with a bright and sustainable future.</div>
            </div>
            <div className="bg-[#A3AB82] p-6 rounded-xl">
                <Image src="/image/S2.png" alt="Main Picture" width={500} height={500} className="rounded-lg"/>
                <div className="py-[3%] px-[5%] text-lg text-white text-center font-bold">Support for Green Businesses</div>
                <div className="py-[2%] px-[5%] text-sm text-white">We are dedicated to supporting businesses that use natural resources efficiently, prevent and reduce harmful environmental impacts, and develop technologies or projects that bring about positive change in the world. We advocate for clean energy use and the development of socially responsible projects.</div>
            </div>
            <div className="bg-[#A3AB82] p-6 rounded-xl">
                <Image src="/image/S3.png" alt="Main Picture" width={500} height={500} className="rounded-lg"/>
                <div className="py-[3%] px-[5%] text-lg text-white text-center font-bold">Commitment to Transparency and Reporting</div>
                <div className="py-[2%] px-[5%] text-sm text-white">We are committed to transparency in our operations and to providing relevant information about the company’s activities. We will regularly publish ESG reports for all stakeholders, allowing them to track the success and progress of the projects we support.</div>
            </div>
        </div>
    )
}