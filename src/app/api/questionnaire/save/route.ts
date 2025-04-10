import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabase";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await request.json();
    console.log(data);
    console.log(typeof(data));
    console.log(session.user.id);
    
    const { error } = await supabase
      .from("QUESTIONNAIRE")
      .upsert({ 
        id: session.user.id,
        answer: data
      }, {
        onConflict: 'id'
      });

    console.log(error);

    if (error) {
      console.error("Error saving answers to Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(NextResponse.json);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving questionnaire answers:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}