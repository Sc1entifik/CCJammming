import ArtistNameAndImage from "../commonElements/artistNameAndImage";
import SongGrid from "./songGrid";


export default function ArtistTopTracks({artistName}: {artistName: string}) {

	return (
		<div className="ml-2 mr-2 flex flex-col md:flex-row font-tropiLand md:gap-20">
			<div>
				<ArtistNameAndImage artistName={artistName}/>
				<p className="mt-4 text-textColor tracking-wide">Scroll To See All Songs</p>
				<p className="text-textColor tracking-wide">Click Song To Add To Playlist</p>
				<p className="mb-4 text-textColor tracking-wide">Click Spotify Tag To Play On Spotify</p>
			</div>
			<SongGrid queryTerm={artistName} />
		</div>
	); 
}
