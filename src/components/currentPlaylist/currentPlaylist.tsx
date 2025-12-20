import { cookies } from "next/headers";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import CurrentPlaylistMosaic from "./currentPlaylistMosaic";
import CurrentPlaylistTracks from "./currentPlaylistTracks";
import { Suspense } from "react";


export default async function CurrentPlaylist({ searchTerm="", searchTermType="", urlBase="" } : { searchTerm: string, searchTermType: string, urlBase: string }) {
	const cookieStore = await cookies();
	const playlistId = cookieStore.get("currentPlaylist")?.value as string;
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);

	return (
		<div className="flex flex-col items-center md:flex-row md:justify-center md:gap-20 font-tropiLand">
			<Suspense fallback={<p>Loading...</p>}>
				<CurrentPlaylistMosaic playlistId={playlistId} authHeader={authHeader}/>
			</Suspense>

			<Suspense fallback={<p>Loading...</p>}>
			<CurrentPlaylistTracks searchTerm={searchTerm} searchTermType={searchTermType} urlBase={urlBase} playlistId={playlistId} authHeader={authHeader}/>
			</Suspense>
		</div>
	);
}
