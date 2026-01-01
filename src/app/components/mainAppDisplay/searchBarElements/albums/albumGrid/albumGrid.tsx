import { cookies } from "next/headers";
import { fetchAlbumsByName, fetchAlbumTracksById} from "@/utils/commonFetches";
import { parseAuthHeaderFromCookieStore } from "@/utils/helper";
import { Album, Track } from "@/utils/fetchInterfaces";
import AlbumTracksCollapse from "./albumCollapse/albumCollapse";


export default async function AlbumGrid({artistName}: {artistName: string}) {
	const authHeader = parseAuthHeaderFromCookieStore(await cookies());
	const albumFetch = await fetchAlbumsByName(artistName, authHeader);
	
	const albumGridItems = albumFetch
	
		.map(async (album: Album) => {
			"use server"
			const tracks = await fetchAlbumTracksById(album.id, authHeader);
			const albumAndTracks: [Album, Track[]] = [album, tracks];

			return albumAndTracks
		})
		.map(async (x,y) => {
			const [album, tracks] = await x;
			
		return (
			<div key={y} suppressHydrationWarning>
				<AlbumTracksCollapse key={y} album={album} tracks={tracks}/>	
			</div>
		);
	});

	return (
		<div className="grid grid-cols-1 gap-16 overflow-y-auto no-scrollbar snap-y snap-mandatory h-full">
			{albumGridItems}
		</div>
	);
}
