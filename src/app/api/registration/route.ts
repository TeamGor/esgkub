import { supabase } from "@/lib/supabase";
import * as argon2 from "argon2";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true
  }
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  console.log(req.body);

  // 1. Check existing user
  const { data: existingUser } = await supabase
    .from('users')
    .select('entity_id')
    .eq('entity_email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
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
    .insert([{ entity_email:email, password: hash }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(user);
}

export { handler as POST }