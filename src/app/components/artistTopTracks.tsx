import { Track, Artist } from "@/utils/spotifyApi";
import Image from "next/image";

import { keySetter } from "@/utils/helper";
import ArtistNameAndImage from "./artistNameAndImage";
import SongGrid from "./songGrid";


export default function ArtistTopTracks({artistName}: {artistName: string}) {

	return (
		<div className="ml-2 mr-2 flex flex-col items-center">
			<ArtistNameAndImage artistName={artistName}/>
			<SongGrid queryTerm={artistName} gridType="artist top tracks"/>
		</div>
	); 
}
