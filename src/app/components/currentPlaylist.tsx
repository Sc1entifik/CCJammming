import { cookies } from "next/headers";
import Image from "next/image";

import { fetchPlaylistById } from "@/utils/commonFetches";
import { PlaylistTrackObject } from "@/utils/fetchInterfaces";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";

const playlistImageSize = 200;
const trackAlbumImageSize = 60;


export default async function CurrentPlaylist() {
	const cookieStore = await cookies();
	const playlistId = cookieStore.get("currentPlaylist")?.value;
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const currentPlaylist = await fetchPlaylistById(playlistId, authHeader);
	const setUniqueKey = keySetter();
	const playlistTracks = currentPlaylist.tracks.items
	.map((x: PlaylistTrackObject) => {
		if ("album" in x.track) {
			const trackAlbumImage = x.track.album.images[0].url;
			const trackArtistNames = x.track.artists.map(y => y.name).join(", ");

			return (
				<div key={setUniqueKey()} className="grid grid-cols-subgrid col-span-3 justify-items-start">
					<Image alt="Track album photo" src={trackAlbumImage} height={trackAlbumImageSize} width={trackAlbumImageSize}/>
					<p>{x.track.name}</p>
					<p>{trackArtistNames}</p>
				</div>
			);

		} else {
			const podcastImage = x.track.images[0].url;
			const podcastPublisher = x.track.show.publisher;
			const episodeName = x.track.show.name;

			return (
				<div key={setUniqueKey()} className="grid grid-cols-subgrid col-span-3 justify-items-start">
					<Image alt="Podcast episode photo" src={podcastImage} height={trackAlbumImageSize} width={trackAlbumImageSize}/>
					<p>{episodeName}</p>
					<p>{podcastPublisher}</p>
				</div>
			);			
		}
	});

	return (
		<div className="flex flex-col items-center">
			<h2>{currentPlaylist.name}</h2>
			{currentPlaylist.images && <Image alt="Mosaic of playlist album images" src={currentPlaylist.images[0].url} height={playlistImageSize} width={playlistImageSize}/>}
			<div className="grid grid-cols-3 max-w-96 gap-8 items-center justify-items-start my-5">
				<p>Album Image</p>
				<p>Track Name</p>
				<p>Artists</p>
				{playlistTracks}
			</div>
		</div>
	);
}
