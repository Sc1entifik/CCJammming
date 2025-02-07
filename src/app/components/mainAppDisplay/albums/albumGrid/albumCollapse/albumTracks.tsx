import { SpotifyImage } from "@/utils/fetchInterfaces"
import Image from "next/image"
import AddTracksToPlaylist from "../../../commonElements/addTracksToPlaylist"

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
	uri: string
}

const imageStyle = {
	width: "2rem",
	height: "2rem",
};

export default function AlbumTrack({track, albumCover}: {track: SimplifiedTrackObject, albumCover: SpotifyImage}) {
	const albumCoverAndTrack = (
		<div>
			<Image alt="tiny album cover" src={albumCover.url} height={5000} width={5000} style={imageStyle}/>
			<p>{track.name}</p>
		</div>
	);

	return <AddTracksToPlaylist trackUris={[track.uri]}>{albumCoverAndTrack}</AddTracksToPlaylist>;
}
