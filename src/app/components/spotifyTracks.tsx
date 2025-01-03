import { Track } from "@/utils/fetchInterfaces";
import { keySetter } from "@/utils/helper";
import Image from "next/image";

export default function SpotifyTracks({tracks, albumCoverSize}: {tracks: Track[], albumCoverSize: number}) {
	const setUniqueKey = keySetter();
	const trackFlex = tracks.map((track: Track) => (
		<div key={setUniqueKey()}>
			<p className="max-w-32">{track.artists.map(x => x.name).join(", ")}</p>
			<Image alt="tiny album cover" src={track.album.images[0].url} height={albumCoverSize} width={albumCoverSize}/>
			<p className="max-w-32">{track.name}</p>
		</div>
	));

	return (
		<div className="grid grid-cols-2 gap-14 my-4 ">
			{trackFlex}
		</div>
	);

}
