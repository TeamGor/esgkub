"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { questionsByPage } from "@/data/questions";

export default function Info() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    return (
        <div className="flex justify-center items-center min-h-screen py-[6%]">
            <div className="bg-[#98a07c] max-w-[800px] w-full mx-[10%] py-[5%] px-[10%] rounded-2xl shadow-lg">
                {id === "0" ? (
                    <>
                        <p className="mb-[5%] leading-relaxed text-white font-bold text-xl text-center">
                            ยินดีต้อนรับสู่แบบทดสอบ!<br />
                            แบบทดสอบนี้จะช่วยประเมินความเข้าใจของคุณเกี่ยวกับ ESG และความยั่งยืน
                        </p>
                        <p className="mb-[5%] leading-relaxed text-white font-bold text-xl text-center">
                            คุณจะต้องตอบคำถามที่แตกต่างกันในแต่ละหน้า กด "เริ่มแบบทดสอบ" เพื่อเริ่มต้น!
                        </p>

                        <div className="flex justify-between">
                            <button 
                                onClick={() => router.push('/Info')}
                                className="w-[120px] bg-gray-600 text-white py-2 rounded-md text-md font-semibold shadow-md hover:bg-gray-700 transition">
                                ย้อนกลับ
                            </button>
                            <button 
                                onClick={() => router.push('/Info/1')}
                                className="w-[120px] bg-[#1d3b1d] text-white py-2 rounded-md text-md font-semibold shadow-md hover:bg-[#142a14] transition">
                                เริ่มแบบทดสอบ
                            </button>
                        </div>
                    </>
                ) : (
                    <QuizPage id={id} />
                )}
            </div>
        </div>
    );
}

function QuizPage({ id }: { id: string }) {
    const router = useRouter();
    const pageQuestions = questionsByPage[id] || [];
    const [answers, setAnswers] = useState<{ [key: number]: boolean | string }>({});

    useEffect(() => {
        if (typeof window !== "undefined" && id) {
            const storedScores = JSON.parse(localStorage.getItem("quizScores") || "{}");
            if (storedScores[id]) {
                setAnswers(storedScores[id]);
            }
        }
    }, [id]);

    const handleInputChange = (index: number, value: boolean | string) => {
        const updatedAnswers = { ...answers, [index]: value };
        setAnswers(updatedAnswers);

        if (typeof window !== "undefined") {
            const storedScores = JSON.parse(localStorage.getItem("quizScores") || "{}");
            storedScores[id] = updatedAnswers;
            localStorage.setItem("quizScores", JSON.stringify(storedScores));
        }
    };

    const pageNumbers = Object.keys(questionsByPage).map(Number);
    const lastPage = Math.max(...pageNumbers);

    return (
        <>
            <h1 className="text-white font-bold text-2xl text-center mb-[5%]">แบบทดสอบ หน้า {id}</h1>

            <div className="space-y-4">
                {pageQuestions.map((question, index) => (
                    <div key={index} className="flex flex-col bg-white p-3 rounded-lg shadow-md min-h-[60px]">
                        {question.type === "C" ? (
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={!!answers[index]}
                                    onChange={() => handleInputChange(index, !answers[index])}
                                    className="mr-3 w-5 h-5"
                                />
                                <p className="text-black font-bold text-xl">{question.text}</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-black font-bold text-xl mb-2">{question.text}</p>
                                <input
                                    type="text"
                                    value={(answers[index] as string) || ""}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    className="p-2 w-full rounded-md border border-gray-300"
                                    placeholder="โปรดกรอกคำตอบของคุณ"
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-[5%]">
                {parseInt(id, 10) === 1 ? (
                    <button 
                        onClick={() => router.push('/Info/0')}
                        className="w-[120px] bg-gray-600 text-white py-2 rounded-md text-md font-semibold shadow-md hover:bg-gray-700 transition">
                        ย้อนกลับ
                    </button>
                ) : parseInt(id, 10) > 1 && (
                    <button 
                        onClick={() => router.push(`/Info/${parseInt(id, 10) - 1}`)}
                        className="w-[120px] bg-gray-600 text-white py-2 rounded-md text-md font-semibold shadow-md hover:bg-gray-700 transition">
                        หน้าก่อนหน้า
                    </button>
                )}

                {questionsByPage[`${parseInt(id, 10) + 1}`] ? (
                    <button 
                        onClick={() => router.push(`/Info/${parseInt(id, 10) + 1}`)}
                        className="w-[120px] bg-[#1d3b1d] text-white py-2 rounded-md text-md font-semibold shadow-md hover:bg-[#142a14] transition">
                        ถัดไป
                    </button>
                ) : (
                    parseInt(id, 10) === lastPage && (
                        <button 
                            onClick={() => router.push('/result')}
                            className="w-[120px] bg-[#1d3b1d] text-white py-2 rounded-md text-md font-semibold shadow-md hover:bg-[#142a14] transition">
                            ดูผลลัพธ์
                        </button>
                    )
                )}
            </div>
        </>
    );
}
