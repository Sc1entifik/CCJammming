import { cookies } from "next/headers";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { fetchTracksByName } from "@/utils/commonFetches";
import TrackWebPlayer from "./trackWebPlayer";
import IFrameWebPlayer from "./iFrameWebPlayer";

export default async function JammmingWebPlayer() {
	const cookieStore = await cookies();
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const fastCar = await fetchTracksByName("fast car", authHeader);

	return <IFrameWebPlayer playerItem={fastCar[0]} />
}
