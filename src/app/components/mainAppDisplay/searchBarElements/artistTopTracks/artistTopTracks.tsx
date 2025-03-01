import ArtistNameAndImage from "../commonElements/artistNameAndImage";
import SongGrid from "./songGrid";


export default function ArtistTopTracks({artistName}: {artistName: string}) {

	return (
		<div className="ml-2 mr-2 flex flex-col items-center">
			<ArtistNameAndImage artistName={artistName}/>
			<p className="my-4 tracking-wide">Scroll To See All Songs</p>
			<SongGrid queryTerm={artistName} gridType="artist top tracks"/>
		</div>
	); 
}
