import AlbumSongGrid from "./albumGrid";
import ArtistNameAndImage from "./artistNameAndImage";


export default function ArtistAlbums({artistName}: {artistName: string}) {

	return (
		<div className="flex flex-col items-center font-tropiLand gap-4">
			<ArtistNameAndImage artistName={artistName}/>
			<h3>Click Album To Expand</h3>
			<h3>Click Song To Add To Playlist</h3>
			<AlbumSongGrid artistName={artistName} fetchType="artist name"/>
		</div>
	);
}
