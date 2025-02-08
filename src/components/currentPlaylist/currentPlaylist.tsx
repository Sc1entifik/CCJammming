import { cookies } from "next/headers";
import Image from "next/image";

import { fetchPlaylistById } from "@/utils/commonFetches";
import { PlaylistTrackObject } from "@/utils/fetchInterfaces";
import { keySetter, parseAuthHeaderFromCookieStore } from "@/utils/helper";
import RemoveTracksFromPlaylist from "./removeTracksFromPlaylist";

const playlistImageStyle = {
	height: "11rem",
	width: "11rem",
	borderRadius: "5%",
};
const trackAlbumImageStyle = {
	height: "4rem",
	width: "4rem",
	borderRadius: "5%",
};


export default async function CurrentPlaylist({ searchTerm="", searchTermType="", urlBase="" } : { searchTerm: string, searchTermType: string, urlBase: string }) {
	const cookieStore = await cookies();
	const playlistId = cookieStore.get("currentPlaylist")?.value as string;
	const authHeader = parseAuthHeaderFromCookieStore(cookieStore);
	const currentPlaylist = await fetchPlaylistById(playlistId, authHeader);
	const setUniqueKey = keySetter();
	const playlistTracks = currentPlaylist.tracks.items
	.map((x: PlaylistTrackObject) => {
		if ("album" in x.track) {
			const trackAlbumImage = x.track.album.images[0].url;
			const trackArtistNames = x.track.artists.map(y => y.name).join(", ");

			return (
					<div key={setUniqueKey()} className="grid grid-cols-subgrid col-span-3 my-5 snap-start scroll-mt-4">
						<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[x.track]}><Image alt="Track album photo" src={trackAlbumImage} height={5000} width={5000} style={trackAlbumImageStyle}/></RemoveTracksFromPlaylist>
						<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[x.track]}><p>{x.track.name}</p></RemoveTracksFromPlaylist>
						<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[x.track]}><p>{trackArtistNames}</p></RemoveTracksFromPlaylist>
					</div>
			);

		} else {
			const podcastImage = x.track.images[0].url;
			const podcastPublisher = x.track.show.publisher;
			const episodeName = x.track.show.name;

			return (
				<div key={setUniqueKey()} className="grid grid-cols-subgrid col-span-3 my-5 snap-start scroll-mt-4">
					<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[x.track]}><Image alt="Podcast episode photo" src={podcastImage} height={5000} width={5000} style={trackAlbumImageStyle}/></RemoveTracksFromPlaylist>
					<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[x.track]}><p>{episodeName}</p></RemoveTracksFromPlaylist>
					<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[x.track]}><p>{podcastPublisher}</p></RemoveTracksFromPlaylist>
				</div>
			);			
		}
	});

	return (
		<div className="flex flex-col items-center font-tropiLand">
			<h2>{currentPlaylist.name}</h2>
			{currentPlaylist.images && <Image priority={true} alt="Mosaic of playlist album images" src={currentPlaylist.images[0].url} height={5000} width={5000} style={playlistImageStyle}/>}
			<p className="mt-4 tracking-wide">Scroll To See All Songs</p>
			<p className="mt-4 tracking-wide">Click Track To Remove From Playlist</p>
			<div className="grid grid-cols-3 max-w-[29rem] max-h-[85dvh] gap-5 items-center justify-items-start my-5">
				<p>Album Image</p>
				<p>Track Name</p>
				<p>Artists</p>
				<div className="text-textColor grid grid-cols-subgrid col-span-3 max-h-[29rem] overflow-y-auto no-scrollbar gap-5 items-center justify-items-start snap-y snap-mandatory">
					{playlistTracks}
				</div>
			</div>
		</div>
	);
}
