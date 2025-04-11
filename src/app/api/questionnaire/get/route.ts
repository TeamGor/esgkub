import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabase";
import { authOptions } from "../../auth/[...nextauth]/authoptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Use maybeSingle() instead of single() to avoid error when no record exists
    const { data, error } = await supabase
      .from("QUESTIONNAIRE")
      .select("answer")
      .eq("id", session.user.id)
      .maybeSingle();

    // Only treat database errors as actual errors, not "not found" situations
    if (error && error.code !== 'PGRST116') {  // PGRST116 is the "not found" error code
      console.error("Error fetching answers from Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Return the answers directly from the nested structure to match what the frontend expects
    console.log("Data from Supabase:", data);
    return NextResponse.json(data?.answer || {});
  } catch (error: any) {
    console.error("Error fetching questionnaire answers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}