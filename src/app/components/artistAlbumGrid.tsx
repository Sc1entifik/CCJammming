import Album from "./helper/albumInterfaces";
import { cookies } from "next/headers";
import AlbumTracksCollapse from "./albumCollapse";
import { fetchAlbumTracksById, fetchArtistAlbums } from "@/utils/commonFetches";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
}


export default async function ArtistAlbumSongGrid({artistName}: {artistName: string}) {
	const setUniqueKey = keySetter();
	const authHeader = parseAuthHeaderFromCookieStore(await cookies());
	const artistAlbums = await fetchArtistAlbums(artistName, authHeader);
	const albumGridItems = artistAlbums.map(async (album: Album) => {
		const tracks = await fetchAlbumTracksById(album.id, authHeader);

		return <AlbumTracksCollapse key={setUniqueKey()} album={album} tracks={tracks}/>
	});

	return (
		<div className="grid grid-cols-1 gap-16">
			{albumGridItems}
		</div>
	);
}
