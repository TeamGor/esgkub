import { supabase } from "@/lib/supabase";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log({ email, password });

    // 1. Check existing user
    const { data: existingUser } = await supabase
      .from('users')
      .select('entity_id')
      .eq('entity_email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 2. Hash password
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 262144,
      timeCost: 4,
    });

    // 3. Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert([{ entity_email: email, password: hash }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}