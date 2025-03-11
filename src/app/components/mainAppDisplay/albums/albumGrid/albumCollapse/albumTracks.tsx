import { SpotifyImage } from "@/utils/fetchInterfaces"
import Image from "next/image"
import AddTracksToPlaylist from "../../../commonElements/addTracksToPlaylist"
import TrackUriButton from "../../../searchBarElements/commonElements/trackUriButton"

interface SimplifiedTrackObject {
	name: string
	id: string
	is_playable: boolean
	uri: string
}

const imageStyle = {
	width: "2rem",
	height: "2rem",
	borderRadius: "5%",
};

export default function AlbumTrack({track, albumCover}: {track: SimplifiedTrackObject, albumCover: SpotifyImage}) {
	return (
		<div className="grid grid-cols-subgrid justify-items-start"> 
			<AddTracksToPlaylist trackUris={[track.uri]}>
				<Image alt="tiny album cover" src={albumCover.url} height={5000} width={5000} style={imageStyle}/>
			</AddTracksToPlaylist>
			<AddTracksToPlaylist trackUris={[track.uri]}>
				<p className="max-w-[15rem]">{track.name}</p>
			</AddTracksToPlaylist>
			<TrackUriButton trackUri={track.uri} />
		</div>
	);
}
