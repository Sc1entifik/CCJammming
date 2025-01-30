import { cookies } from "next/headers";
import { fetchAlbumsByName, fetchAlbumTracksById, fetchArtistAlbums } from "@/utils/commonFetches";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { Album } from "@/utils/fetchInterfaces";
import AlbumTracksCollapse from "./albumCollapse/albumCollapse";

export default async function AlbumGrid({artistName, fetchType}: {artistName: string, fetchType: string}) {
	const setUniqueKey = keySetter();
	const authHeader = parseAuthHeaderFromCookieStore(await cookies());
	let albumFetch;

	switch (fetchType) {
		case "album name":
			albumFetch = await fetchAlbumsByName(artistName, authHeader);
			break;

		default:
			albumFetch = await fetchArtistAlbums(artistName, authHeader);
			break;
	}

	const albumGridItems = albumFetch.map(async (album: Album) => {
		const tracks = await fetchAlbumTracksById(album.id, authHeader);

		return <AlbumTracksCollapse key={setUniqueKey()} album={album} tracks={tracks}/>
	});

	return (
		<div className="grid grid-cols-2 gap-16">
			{albumGridItems}
		</div>
	);
}
