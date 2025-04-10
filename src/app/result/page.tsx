"use client";

import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { questionsByPage } from "@/data/questions";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function ResultPage() {
  const [answers, setAnswers] = useState<any>({});
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAnswers = async () => {
      if (session) {
        try {
          // Try to get answers from API
          const response = await fetch('/api/questionnaire/get');
          
          if (response.ok) {
            const data = await response.json();
            if (data.answers) {
              setAnswers(data.answers);
            } else {
              fallbackToLocalStorage();
            }
          } else {
            console.error("Error fetching answers from API");
            fallbackToLocalStorage();
          }
        } catch (err) {
          console.error("Failed to fetch answers from API:", err);
          fallbackToLocalStorage();
        }
      } else {
        // No session, use localStorage
        fallbackToLocalStorage();
      }
    };

    const fallbackToLocalStorage = () => {
      if (typeof window !== "undefined") {
        const data = JSON.parse(localStorage.getItem("esgResult") || "{}");
        setAnswers(data);
      }
    };

    fetchAnswers();
  }, [session]);

  const getSectionScore = (prefix: string, pageRange: number[]) => {
    const chartData: any[] = [];
    let totalScore = 0;
    let totalPossible = 0;

    Object.entries(questionsByPage)
      .filter(([page]) => {
        const num = parseInt(page);
        return num >= pageRange[0] && num <= pageRange[1];
      })
      .forEach(([page, section]) => {
        const sectionId = section.name.split(" ")[0];
        const all = section.questions.filter((q) => q.type !== "Sq");
        const score = all.reduce((acc, q) => {
          return acc + (answers[page]?.[q.id]?.checked ? 1 : 0);
        }, 0);
        chartData.push({
          category: sectionId,
          label: section.name.replace(`${sectionId} `, ""),
          score,
          total: all.length,
          percentage: Math.round((score / all.length) * 100),
        });
        totalScore += score;
        totalPossible += all.length;
      });

    return {
      total: Math.round((totalScore / totalPossible) * 100),
      chartData,
    };
  };

  const gScore = getSectionScore("G", [1, 10]);
  const eScore = getSectionScore("E", [11, 16]);
  const sScore = getSectionScore("S", [17, 26]);
  const totalESG = Math.round((gScore.total + eScore.total + sScore.total) / 3);

  const getESGRating = (score: number) => {
    if (score >= 90) return "AAA";
    if (score >= 80) return "AA";
    if (score >= 65) return "A";
    if (score >= 50) return "BBB";
    return "Below BBB";
  };

  const MAX_LIMIT = 10_000_000;
  const LOAN_RATE = totalESG / 100;
  const LOAN_LIMIT = Math.round(MAX_LIMIT * LOAN_RATE);

  const companyName = session?.user.username || null;

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl mx-auto">

      <div className="flex justify-center mb-4">
        <Image
          src="/image/Logo.png"
          alt="Logo"
          width={1000}
          height={250}
          className="rounded-lg object-contain w-full sm:w-2/3 md:w-1/2 h-auto"
        />
      </div>

      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-green-900">{companyName ? `${companyName}`: "Your Company" }</h1>
      </section>

      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Loan Information</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 mb-1">Maximum Limit</p>
            <p className="text-xl font-extrabold text-green-800">฿10,000,000</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Loan Rate based on ESG Score</p>
            <p className="text-xl font-extrabold text-green-800">{totalESG}%</p>
          </div>
          <div>
            <p className="text-gray-600 mb-1">Approved Loan Limit</p>
            <p className="text-xl font-extrabold text-green-800">
              ฿{LOAN_LIMIT.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* ESG Overview */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { category: "Governance", score: gScore.total },
                  { category: "Environment", score: eScore.total },
                  { category: "Social", score: sScore.total },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#1d3b1d" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/3 bg-green-50 p-4 rounded-xl border border-green-200 flex flex-col justify-between">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600">Your ESG Rating</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-green-800">{getESGRating(totalESG)}</h2>
              <p className="text-sm text-gray-600 mt-1">Overall Score: {totalESG}%</p>
            </div>
            <div className="text-sm">
              <h3 className="text-md font-bold text-white bg-green-900 px-3 py-2 rounded-t-md text-center">
                ESG Rating levels
              </h3>
              <table className="w-full text-sm border border-gray-200">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="px-3 py-1 text-left">คะแนนรวม</th>
                    <th className="px-3 py-1 text-left">SET ESG Ratings</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { range: "90 - 100", label: "AAA" },
                    { range: "80 - 89", label: "AA" },
                    { range: "65 - 79", label: "A" },
                    { range: "50 - 64", label: "BBB" },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className={`border-t border-gray-100 ${
                        getESGRating(totalESG) === row.label ? "bg-green-200 font-bold" : ""
                      }`}
                    >
                      <td className="px-3 py-1">{row.range}</td>
                      <td className="px-3 py-1">{row.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Radar Sections */}
      {[{ title: "Governance", data: gScore }, { title: "Environment", data: eScore }, { title: "Social", data: sScore }].map(({ title, data }) => (
        <section
          key={title}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200"
        >
          <div className="flex flex-col md:flex-row items-stretch gap-6">
            <div className="md:w-1/4 text-center md:text-left">
              <h3 className="text-4xl font-extrabold text-green-900">{data.total}%</h3>
              <p className="text-base font-semibold text-green-800 mt-2">{title} Performance Score</p>
            </div>

            <div className="md:w-2/4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={90} data={data.chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="category" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name={title}
                    dataKey="percentage"
                    stroke="#1d3b1d"
                    fill="#1d3b1d"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="md:w-1/4 text-left">
              <ul className="text-sm space-y-1">
                {data.chartData.map((item) => (
                  <li key={item.category} className="flex justify-between items-center border-b border-dashed border-gray-200 pb-1">
                    <span className="text-gray-700">• {item.category} {item.label}</span>
                    <span className="font-semibold text-green-700">{item.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      {/* Additional Info */}
      <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Additional Information</h3>

        {/* Key Contacts */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Key ESG Contacts</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-1">กรรมการด้านกำกับดูแลกิจการ สังคม หรือสิ่งแวดล้อม</p>
              <p className="font-bold text-black">{answers["1"]?.["G1-4"]?.text || "ไม่ระบุ"}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">บุคคล หรือหน่วยงาน ที่รับผิดชอบเรื่องความยั่งยืนขององค์กร</p>
              <p className="font-bold text-black">{answers["2"]?.["G2-4"]?.text || "ไม่ระบุ"}</p>
            </div>
          </div>
        </div>

        {/* Energy Usage */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Energy Usage</h4>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-600 mb-1">การใช้ไฟ/พลังงานในการผลิตสินค้า</p>
              <p className="font-bold text-black">{answers["12"]?.["E2-2"]?.text || "ไม่ระบุ"}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">การใช้ไฟ/พลังงานในอาคารสำนักงาน</p>
              <p className="font-bold text-black">{answers["12"]?.["E2-3"]?.text || "ไม่ระบุ"}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">การใช้ไฟ/พลังงานในกระบวนการขนส่ง</p>
              <p className="font-bold text-black">{answers["12"]?.["E2-4"]?.text || "ไม่ระบุ"}</p>
            </div>
          </div>
        </div>

        {/* Water Usage */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Water Usage</h4>
          <div className="grid md:grid-cols-1">
            <div>
              <p className="text-gray-600 mb-1">การใช้น้ำในอาคาร สำนักงาน</p>
              <p className="font-bold text-black">{answers["13"]?.["E3-2"]?.text || "ไม่ระบุ"}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center pt-6 print:hidden">
        <button
          onClick={() => window.print()}
          className="bg-green-800 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-green-900 transition"
        >
          พิมพ์รายงาน PDF
        </button>
      </div>
    </main>
  );
}
