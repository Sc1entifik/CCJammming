"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { accountAccessObject } from "@/utils/spotifyOAuth2";

const isProduction = process.env.SERVER_ENVIRONMENT === "Production";

export async function GET(request: NextRequest) {
	const [code, state] = request.nextUrl.searchParams.values();
	const cookieStore = await cookies();
	
	if (state === cookieStore.get("state")?.value) {
		const authObject = await accountAccessObject(code);
		const cookiePayload = JSON.stringify(authObject);
		cookieStore.set("auth", cookiePayload, { httpOnly: true, secure: isProduction, expires: authObject.expires_in });
		cookieStore.delete("state");
	}

	redirect("/");
}
