import Image from "next/image";
import SpotifyLogo from "../spotifyLogo/page";
import RemoveTracksFromPlaylist from "./removeTracksFromPlaylist";

interface PodcastTrackObject {
	uri: string;
	images: { url: string }[];
	show: {
		publisher: string;
		name: string;
	};
}

const trackAlbumImageStyle = {
	height: "4rem",
	width: "4rem",
	borderRadius: "5%",
}

export default function PodcastSubgrid({ playlistTrack, urlBase, searchTerm, searchTermType }: {playlistTrack: PodcastTrackObject, urlBase: string, searchTerm: string, searchTermType: string }) {
	const podcastImage = playlistTrack.images[0].url;
	const podcastPublisher = playlistTrack.show.publisher; 
	const episodeName = playlistTrack.show.name;

	return (
		<div className="grid grid-cols-subgrid col-span-3 my-5 snap-start snap-always scroll-mt-4">
			<div>
				<SpotifyLogo remSize={5}/>

				<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[playlistTrack]}>
					<Image alt="Podcast episode photo" src={podcastImage} height={5000} width={5000} style={trackAlbumImageStyle}/>
				</RemoveTracksFromPlaylist>
			</div>

			<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[playlistTrack]}>
				<p>{episodeName}</p>
			</RemoveTracksFromPlaylist>
			
			<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[playlistTrack]}>
				<p>{podcastPublisher}</p>
			</RemoveTracksFromPlaylist>
		</div>

	);
	
}
