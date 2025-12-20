import Image from "next/image";
import RemoveTracksFromPlaylist from "./removeTracksFromPlaylist";
import Link from "next/link";
import SpotifyLogo from "../spotifyLogo/page";

interface MusicTrack {
		uri: string;
		name: string;
		artists: { name: string }[];
		external_urls: {
			spotify: string;
		};
		album: {
			images: {
				url: string;
			}[];
		};
}

export default function MusicSubGrid({ playlistTrack, urlBase, searchTerm, searchTermType }: {playlistTrack: MusicTrack, urlBase: string, searchTerm: string, searchTermType: string}) {
		const trackAlbumImage = playlistTrack.album.images[0].url;
		const trackArtistNames = playlistTrack.artists.map(x => x.name).join(", ");

		return (
			<div className="grid grid-cols-subgrid col-span-3 my-5 snap-start snap-always scroll-mt-4">
				<div>
					<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[playlistTrack]}>
						<Image alt="Track album photo" src={trackAlbumImage} height={5000} width={5000} style={ { height: "4rem", width: "4rem", borderRadius: "5%", } }/>
					</RemoveTracksFromPlaylist>
					
					<Link href={playlistTrack.external_urls.spotify}>
						<SpotifyLogo remSize={5}/>
					</Link>
				</div>

				<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[playlistTrack]}>
					<p>{playlistTrack.name}</p>
				</RemoveTracksFromPlaylist>

				<RemoveTracksFromPlaylist urlBase={urlBase} searchTerm={searchTerm} searchTermType={searchTermType} tracks={[playlistTrack]}>
					<p>{trackArtistNames}</p>
				</RemoveTracksFromPlaylist>
			</div>
		);
}
