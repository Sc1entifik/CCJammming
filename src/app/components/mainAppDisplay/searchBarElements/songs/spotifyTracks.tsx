import { Track } from "@/utils/fetchInterfaces";
import { keySetter } from "@/utils/helper";
import Image from "next/image";
import AddTracksToPlaylist from "../commonElements/addTracksToPlaylist";

export default function SpotifyTracks({tracks, albumCoverSize}: {tracks: Track[], albumCoverSize: number}) {
	const setUniqueKey = keySetter();
	const imageStyle = {
		height: `${albumCoverSize}rem`,
		width : `${albumCoverSize}rem`,
		borderRadius: "5%",
	};

	const trackFlex = tracks.map((track: Track) => (
		<AddTracksToPlaylist key={setUniqueKey()} trackUris={[track.uri]}>
			<div className="snap-start snap-always">
				<p className="max-w-32">{track.artists.map(x => x.name).join(", ")}</p>
				<Image alt="tiny album cover" src={track.album.images[0].url} height={5000} width={5000} style={imageStyle}/>
				<p className="max-w-32">{track.name}</p>
			</div>
		</AddTracksToPlaylist>
	));

	return (
		<div className="grid grid-cols-2 gap-14 my-4 overflow-y-auto no-scrollbar snap-y snap-mandatory">
			{trackFlex}
		</div>
	);

}
