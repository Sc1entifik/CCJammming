import { Track } from "@/utils/fetchInterfaces";
import { keySetter } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import AddTracksToPlaylist from "../commonElements/addTracksToPlaylist";
import SpotifyLogo from "@/components/spotifyLogo/page";
import SampleTrackCookieButton from "../commonElements/sampleTrackCookieButton";

export default function SpotifyTracks({tracks, albumCoverSize}: {tracks: Track[], albumCoverSize: number}) {
	const setUniqueKey = keySetter();
	const imageStyle = {
		height: `${albumCoverSize}rem`,
		width : `${albumCoverSize}rem`,
		borderRadius: "5%",
	};

	const trackFlex = tracks.map((track: Track) => (
		<div key={setUniqueKey()} className="grid grid-cols-subgrid col-span-2 snap-always snap-start">
			<div>
				<Link href={track.external_urls.spotify} target="_blank">
					<SpotifyLogo remSize={6}/>
				</Link>
				<AddTracksToPlaylist trackUris={[track.uri]}>
					<div className="snap-start snap-always">
						<p className="max-w-32">{track.artists.map(x => x.name).join(", ")}</p>
						<Image alt="tiny album cover" src={track.album.images[0].url} height={5000} width={5000} style={imageStyle}/>
						<p className="max-w-32 text-textColor">{track.name}</p>
					</div>
				</AddTracksToPlaylist>
			</div>
			<SampleTrackCookieButton trackUri={track.uri} />
		</div>
	));

	return (
		<div className="grid grid-cols-2 gap-14 my-4 overflow-y-auto no-scrollbar snap-y snap-mandatory">
			{trackFlex}
		</div>
	);
}
