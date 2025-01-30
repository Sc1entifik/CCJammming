import { SpotifyImage } from "@/utils/fetchInterfaces"
import Image from "next/image"
import AddTracksToPlaylist from "../../../commonElements/addTracksToPlaylist"

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
	uri: string
}

const tinyAlbumCoverSize = 22;

export default function AlbumTrack({track, albumCover}: {track: SimplifiedTrackObject, albumCover: SpotifyImage}) {
	const albumCoverAndTrack = (
		<div className="flex gap-4">
			<Image alt="tiny album cover" src={albumCover.url} height={tinyAlbumCoverSize} width={tinyAlbumCoverSize}/>
			<p>{track.name}</p>
		</div>
	);

	return <AddTracksToPlaylist trackUris={[track.uri]}>{albumCoverAndTrack}</AddTracksToPlaylist>;
}
