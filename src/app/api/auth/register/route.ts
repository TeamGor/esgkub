import { supabaseAdmin } from "@/lib/supabase";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check existing user
    const { data: existingUser } = await supabaseAdmin
      .from('USERS')
      .select('id')
      .eq('entity_email', email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536,
      timeCost: 3,
    });

    // Create user
    const { data: user, error } = await supabaseAdmin
      .from('USERS')
      .insert([{
        entity_name: name,
        entity_email: email,
        password: hashedPassword
      }])
      .select()
      .single();

    if (error) {
      console.error("Registration error:", error);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: user.id,
      name: user.entity_name,
      email: user.entity_email
    }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}