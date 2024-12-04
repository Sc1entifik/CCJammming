"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import SpotifyOAuth from "@/utils/spotifyOAuth";

const isProduction = process.env.SERVER_ENVIRONMENT === "Production";

export async function GET(request: NextRequest) {
	const [code, state] = request.nextUrl.searchParams.values();
	const cookieStore = await cookies();
	const authObject = new SpotifyOAuth(code);
	
	if (state === cookieStore.get("state")?.value) {
		const spotifyAuthHeaderObject = await authObject.authorizationHeader();
		const authHeader = JSON.stringify(spotifyAuthHeaderObject);
		cookieStore.set("auth", authHeader, { httpOnly: true, secure: isProduction, expires: spotifyAuthHeaderObject.expires_in  });
	}

	redirect("/");
}
