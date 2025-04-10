import { supabase } from "@/lib/supabase";
import * as argon2 from "argon2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Destructure all expected fields from the form
    const {
      email, // Keep email for login
      password, // Keep password for login
      companyName,
      registrationNumber,
      companyAddress,
      phoneNumber,
      website,
      // registrationDocument, // File needs special handling - see note below
      companyDetail,
      companyType,
      foundingYear,
      companySize,
      termsAccepted,
    } = await req.json();

    if (!email || !password || !companyName || !termsAccepted) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!termsAccepted) {
      return NextResponse.json(
        { error: "You must accept the terms of service" },
        { status: 400 }
      );
    }

    // 1. Check existing user (using email as the unique identifier)
    const { data: existingUser, error: checkError } = await supabase
      .from('USERS')
      .select('id')
      .eq('entity_email', email)
      .maybeSingle(); // Use maybeSingle to handle null case gracefully

    if (checkError && checkError.code !== 'PGRST116') { // Ignore 'PGRST116' (No rows found)
        console.error("Error checking existing user:", checkError);
        return NextResponse.json(
            { error: "Database error checking user" },
            { status: 500 }
        );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 } // 409 Conflict is more appropriate
      );
    }

    // 2. Hash password
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
      // Consider adjusting costs based on your server resources and security needs
      memoryCost: 19456, // 19 MiB (Argon2 default) - 262144 (256MiB) is very high
      timeCost: 2,       // Argon2 default - 4 is high
      parallelism: 1     // Argon2 default
    });

    // 3. Create user/company record
    // NOTE: File upload (registrationDocument) needs separate handling.
    // You would typically upload the file to Supabase Storage first,
    // get the URL/path, and then include that URL in this insert.
    // For now, we'll omit the document field from the insert.
    const { data: newUser, error: insertError } = await supabase
      .from('USERS')
      .insert([
        {
          entity_email: email,
          password: hash,
          entity_name: companyName,
          registration_number: registrationNumber,
          company_address: companyAddress,
          phone_number: phoneNumber,
          website: website || null, // Handle empty string case
          // registration_document_url: uploadedFileUrl, // Add this once you have the URL
          company_detail: companyDetail,
          company_type: companyType,
          founding_year: foundingYear ? parseInt(foundingYear, 10) : null, // Ensure it's an integer
          company_size: companySize,
          terms_accepted: termsAccepted,
        },
      ])
      .select() // Select the newly created record
      .single();

    if (insertError) {
        console.error("Error inserting user:", insertError);
        return NextResponse.json(
            { error: `Failed to create account: ${insertError.message}` },
            { status: 500 }
        );
    }

    // Don't return the password hash to the client!
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error: any) {
    console.error("Registration error:", error);
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    return NextResponse.json(
      // Provide a more generic error in production
      { error: "Internal server error during registration" },
      { status: 500 }
    );
  }
}