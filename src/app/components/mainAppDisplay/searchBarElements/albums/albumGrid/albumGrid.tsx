import { cookies } from "next/headers";
import { fetchAlbumsByName, fetchAlbumTracksById, fetchArtistAlbums } from "@/utils/commonFetches";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { Album, Track } from "@/utils/fetchInterfaces";
import AlbumTracksCollapse from "./albumCollapse/albumCollapse";


export default async function AlbumGrid({artistName, fetchType}: {artistName: string, fetchType: string}) {
	const authHeader = parseAuthHeaderFromCookieStore(await cookies());
	const setUniqueKey = keySetter();
	let albumFetch;

	switch (fetchType) {
		case "album name":
			albumFetch = await fetchAlbumsByName(artistName, authHeader);
			break;

		default:
			albumFetch = await fetchArtistAlbums(artistName, authHeader);
			break;
	}

	const albumGridItems = albumFetch
		.map(async (album: Album) => {
			"use server"
			const tracks = await fetchAlbumTracksById(album.id, authHeader);
			const albumAndTracks: [Album, Track[]] = [album, tracks];

			return albumAndTracks
		})
		.map(async x => {
			const [album, tracks] = await x;
			
			return <AlbumTracksCollapse key={setUniqueKey()} album={album} tracks={tracks}/>
		});

	return (
		<div className="grid grid-cols-1 gap-16 overflow-y-auto no-scrollbar max-h-[72dvh]">
			{albumGridItems}
		</div>
	);
}
