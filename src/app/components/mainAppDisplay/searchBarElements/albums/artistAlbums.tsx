import ArtistNameAndImage from "../commonElements/artistNameAndImage";
import AlbumGrid from "./albumGrid/albumGrid";


export default function ArtistAlbums({artistName}: {artistName: string}) {

	return (
		<div className="flex flex-col items-center font-tropiLand gap-4 max-w-160 max-h-[84dvh]">
			<ArtistNameAndImage artistName={artistName}/>
			<div className="flex flex-col items-start">
				<h3 className="text-textColor">Scroll To See All Albums</h3>
				<h3 className="text-textColor">Click Album To Expand</h3>
				<h3 className="text-textColor">Click Song To Add To Playlist</h3>
				<h3 className="text-textColor">Click Spotify Tag To Lisen On Spotify</h3>
			</div>
			<AlbumGrid artistName={artistName} fetchType="artist name"/>
		</div>
	);
}
