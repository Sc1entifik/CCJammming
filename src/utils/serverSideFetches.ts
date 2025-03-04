"use server";
import { cookies } from "next/headers";
import { fetchTracksByName } from "./commonFetches";
import { parseAuthHeaderFromCookieStore } from "./helper";


export const fetchSongList = async (songName: string) => {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const tracks = await fetchTracksByName(songName, authHeader);

	return tracks;
}; 
