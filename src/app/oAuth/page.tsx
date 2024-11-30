"use server";
import SpotifyOAuth from "@/utils/spotifyOAuth";
import { redirect } from "next/navigation";
import querystring from "node:querystring";

export default async function WriteAuthHeader({ searchParams }: {searchParams: Promise<{[key: string]: string }>}) {
	const {code, state} = await searchParams;
	const writeAuthJson = new SpotifyOAuth(code, state);
	writeAuthJson.writeAuthorizationHeaderJson();

	redirect("/?" + querystring.stringify({
		code,
		state,
	}));
}
