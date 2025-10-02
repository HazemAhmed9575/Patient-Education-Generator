import { NextResponse } from "next/server";

type Body = {
  condition: string;
  language: "en" | "ar";
  readingLevel: "basic" | "intermediate" | "advanced";
  sources?: string[];
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (!body?.condition?.trim()) {
    return NextResponse.json({ message: "Condition is required" }, { status: 400 });
  }

  const isAr = body.language === "ar";

  const payload = {
    title: isAr
      ? `${body.condition} — دليل مبسّط للمريض`
      : `${body.condition} — Patient Guide`,
    sections: [
      {
        heading: isAr ? "ما هي الحالة؟" : "What is it?",
        text: isAr
          ? "شرح مبسّط عن الحالة، الأسباب الشائعة والأعراض المتوقعة."
          : "Plain-language description of the condition, common causes and expected symptoms.",
        citations: [
          "https://www.who.int/",
        ],
      },
      {
        heading: isAr ? "كيفية التعامل" : "How to manage",
        text: isAr
          ? "نصائح عملية ونمط حياة وأدوية شائعة مع تحذيرات السلامة."
          : "Actionable tips, lifestyle changes, and common medications with safety notes.",
        citations: [
          "https://www.cdc.gov/",
        ],
      },
    ],
    lineage: {
      createdAt: new Date().toISOString(),
      sourcesCount: (body.sources?.length || 0) + 2,
    },
  };

  // نحاكي latency صغيرة
  await new Promise((r) => setTimeout(r, 700));

  return NextResponse.json(payload);
}
