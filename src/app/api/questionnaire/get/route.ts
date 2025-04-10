import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabase";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { data, error } = await supabase
      .from("QUESTIONNAIRE")
      .select("answer")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Error fetching answers from Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ answers: data || null });
  } catch (error: any) {
    console.error("Error fetching questionnaire answers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}