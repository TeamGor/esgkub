"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { questionsByPage } from "@/data/questions";

export default function Info() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex justify-center items-center bg-[#f4f4f4] px-4 py-6 sm:py-8 md:px-10 lg:px-20 my-4 sm:my-6 md:my-8">
      <div className="bg-[#98a07c] w-full max-w-4xl py-6 sm:py-8 px-4 sm:px-6 md:px-10 rounded-2xl shadow-xl transition-all duration-300">
        {id === "0" ? (
          <div>
            <p className="mb-2 leading-relaxed text-white font-extrabold text-xl sm:text-2xl">
              คำแนะนำก่อนทำประเมิน ESG Rating for loan
            </p>
            <p className="mb-2 leading-relaxed text-white text-base sm:text-lg">
              แบบประเมิน ESG Health Check แบ่งเป็น 3 ด้าน จำนวนรวม 26 ข้อ คะแนนเต็ม 153 คะแนน แบ่งเป็น
            </p>
            <p className="mb-2 leading-relaxed text-white text-base sm:text-lg">
              &#x2022; การประเมินด้าน Governance จำนวน 10 ข้อ (มี 56 ข้อย่อย)
            </p>
            <p className="mb-2 leading-relaxed text-white text-base sm:text-lg">
              &#x2022; การประเมินด้าน Social จำนวน 6 ข้อ (มี 38 ข้อย่อย)
            </p>
            <p className="mb-4 leading-relaxed text-white text-base sm:text-lg">
              &#x2022; การประเมินด้าน Environment จำนวน 10 ข้อ (มี 59 ข้อย่อย)
            </p>
            <p className="mb-2 leading-relaxed text-white text-base sm:text-lg">
              ในแต่ละข้อประเมินผู้ทำแบบประเมินสามารถเลือกตอบได้มากกว่า 1 ตัวเลือก
            </p>
            <p className="mb-6 leading-relaxed text-white text-base sm:text-lg font-bold">
              หลังทำแบบประเมินเสร็จ บริษัทจะทราบผลคะแนนการประเมินกู้เงินทันที
            </p>

            <div className="flex flex-wrap justify-between gap-4">
              <button
                onClick={() => router.push("/")}
                className="flex-1 min-w-[120px] bg-[#1d3b1d] text-white px-4 py-2 rounded-md text-md font-semibold shadow-md hover:bg-[#142a14] transition">
                ย้อนกลับ
              </button>
              <button
                onClick={() => router.push("/Info/1")}
                className="flex-1 min-w-[120px] bg-[#1d3b1d] text-white px-4 py-2 rounded-md text-md font-semibold shadow-md hover:bg-[#142a14] transition">
                ถัดไป
              </button>
            </div>
          </div>
        ) : (
          <QuizPage id={id} />
        )}
      </div>
    </div>
  );
}

function QuizPage({ id }: { id: string }) {
  const router = useRouter();
  const pageData = questionsByPage[id];

  const pageName = pageData?.name || "";
  const pageQuestions = pageData?.questions || [];
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});

  const totalPages = Object.keys(questionsByPage).length;
  const isLastPage = parseInt(id) === totalPages;

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      const storedAllAnswers = JSON.parse(localStorage.getItem("allAnswers") || "{}");
      if (storedAllAnswers[id]) {
        setAnswers(storedAllAnswers[id]);
      }
    }
  }, [id]);

  const handleInputChange = (qid: string, value: any) => {
    const updatedAnswers = { ...answers, [qid]: value };
    setAnswers(updatedAnswers);

    if (typeof window !== "undefined") {
      const storedAllAnswers = JSON.parse(localStorage.getItem("allAnswers") || "{}");
      storedAllAnswers[id] = updatedAnswers;
      localStorage.setItem("allAnswers", JSON.stringify(storedAllAnswers));
    }
  };

  if (!pageData) {
    return <p className="text-white text-center">ไม่พบข้อมูลคำถามหน้านี้</p>;
  }

  return (
    <>
      <h2 className="text-white font-bold text-3xl sm:text-4xl text-center mb-6">{pageName}</h2>

      <div className="space-y-6">
        {pageQuestions.map((question) => {
          const currentAnswer = answers[question.id] || {};

          if (question.type === "Sq") {
            return (
              <div key={question.id} className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300">
                <p className="text-black font-bold text-lg">{question.text}</p>
              </div>
            );
          }

          return (
            <div key={question.id} className="bg-white p-4 rounded-lg shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <input
                    type="checkbox"
                    checked={currentAnswer.checked || false}
                    onChange={() =>
                      handleInputChange(question.id, { ...currentAnswer, checked: !currentAnswer.checked })
                    }
                    className="w-5 h-5 min-w-[20px] min-h-[20px] cursor-pointer accent-[#1d3b1d]"
                  />
                </div>
                <label className="text-black text-base sm:text-lg leading-relaxed">{question.text}</label>
              </div>


              {question.type === "CT" && currentAnswer.checked && (
                <input
                  type="text"
                  value={currentAnswer.text || ""}
                  onChange={(e) =>
                    handleInputChange(question.id, { ...currentAnswer, text: e.target.value })
                  }
                  className="mt-2 p-2 w-full rounded-md border border-gray-300"
                  placeholder="โปรดเติมคำตอบ"
                />
              )}

              {question.type === "CU" && currentAnswer.checked && (
                <input
                  type="file"
                  onChange={(e) =>
                    handleInputChange(question.id, {
                      ...currentAnswer,
                      fileName: e.target.files?.[0]?.name || "dummy_file.pdf",
                    })
                  }
                  className="mt-2 p-2 w-full rounded-md border border-gray-300"
                />
              )}
            </div>
          );
        })}
      </div>


      <div className="flex flex-wrap justify-between mt-6 gap-4">
        <button
          onClick={() => router.push(`/Info/${parseInt(id, 10) - 1}`)}
          className="flex-1 min-w-[140px] bg-gray-600 text-white py-2 rounded-lg text-md font-semibold shadow-md hover:bg-gray-700 transition-all">
          หน้าก่อนหน้า
        </button>

        {isLastPage ? (
          <button
            onClick={() => {
              const allAnswers = JSON.parse(localStorage.getItem("allAnswers") || "{}");
              localStorage.setItem("esgResult", JSON.stringify(allAnswers));
              router.push("/result");
            }}
            className="flex-1 min-w-[140px] bg-[#1d3b1d] text-white py-2 rounded-lg text-md font-semibold shadow-md hover:bg-[#142a14] transition-all">
            ดูผลลัพธ์ ESG
          </button>
        ) : (
          <button
            onClick={() => router.push(`/Info/${parseInt(id, 10) + 1}`)}
            className="flex-1 min-w-[140px] bg-[#1d3b1d] text-white py-2 rounded-lg text-md font-semibold shadow-md hover:bg-[#142a14] transition-all">
            ถัดไป
          </button>
        )}
      </div>
    </>
  );
}
