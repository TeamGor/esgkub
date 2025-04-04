"use client";

import { useEffect, useState } from "react";
import { questionsByPage } from "@/data/questions";

const ResultPage = () => {
    const [totalScore, setTotalScore] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedScores = JSON.parse(localStorage.getItem("quizScores") || "{}");
            let score = 0;

            Object.entries(questionsByPage).forEach(([page, questions]) => {
                const answers = storedScores[page] || {};

                questions.forEach((question, index) => {
                    if (question.type === "C" && answers[index]) {
                        score += 1;
                    }
                });
            });

            setTotalScore(score);
        }
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="bg-[#98a07c] max-w-[600px] w-full mx-[10%] py-[5%] px-[10%] rounded-2xl shadow-lg text-center">
                <h1 className="text-white font-bold text-2xl mb-[5%]">ผลลัพธ์แบบทดสอบ</h1>
                <p className="text-white font-bold text-xl mb-[5%]">คะแนนรวมของคุณ: {totalScore}</p>
                <button 
                    onClick={() => window.location.href = "/Info/1"}
                    className="w-[150px] bg-[#1d3b1d] text-white py-2 rounded-md text-md font-semibold shadow-md hover:bg-[#142a14] transition">
                    ทำแบบทดสอบอีกครั้ง
                </button>
            </div>
        </div>
    );
};

export default ResultPage;
