import Image from "next/image"

export default function IntroSection(){
    return(
        <div className="grid grid-cols-2 grid-rows-2 gap-6">
            {/* FirstRow */}
            <div className="col-span-1">
                <Image src="/image/MainPic.png" alt="Main Picture" width={500} height={500} className="rounded-lg" />
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center">
                <Image src="/image/Logo.png" alt="Logo" width={1000} height={500} className="rounded-lg" />
                <div className="py-[2%] px-[5%] text-xl">We are an investment company dedicated to fostering sustainable growth for businesses that prioritize environmental and social responsibility, with a particular focus on those with high ESG.</div>
                <div className="py-[2%] px-[5%] text-xl">Our mission is to support projects that reduce longterm environmental impact while creating opportunities for the development of sustainable technologies and efficient resource utilization.</div>
            </div>
            {/* SecondRow */}
            <div className="col-span-2">
                <div className="py-[2%] px-[5%] text-xl">We believe that a good investment not only generates financial returns but also creates positive impact on society and the environment. We specialize in selecting projects with high growth potential that can lead businesses towards long-term success, all while adhering to principles of transparency, responsibility, and creating value for shareholders and stakeholders alike.</div>
                <div className="pb-[2%] px-[5%] text-xl">We are committed to being a leader in supporting the growth of businesses that drive the world forward in a sustainable and environmentally friendly manner.</div>
            </div>
        </div>
    )
}
