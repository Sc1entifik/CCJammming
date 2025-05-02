import ArtistNameAndImage from "../commonElements/artistNameAndImage";
import SongGrid from "./songGrid";


export default function ArtistTopTracks({artistName}: {artistName: string}) {

	return (
		<div className="ml-2 mr-2 flex flex-col items-center font-tropiLand">
			<ArtistNameAndImage artistName={artistName}/>
			<p className="mt-4 text-textColor tracking-wide">Scroll To See All Songs</p>
			<p className="mb-4 text-textColor tracking-wide">Click Song To Add To Playlist</p>
			<SongGrid queryTerm={artistName} />
		</div>
	); 
}
