import { Track, Artist } from "@/utils/spotifyApi";
import Image from "next/image";

import { keySetter } from "@/utils/helper";

type TopTrackProps = {
	artistTopTracks: Track[]
	artistData: Artist
}


const mediumArtistImageElement = (x: Artist) => {
	const mediumImage = x.images[1];

	return <Image src={mediumImage.url} height={mediumImage.height} width={mediumImage.width} alt={`${x.name} photo`} />;
};


export default function ArtistTopTracks({artistTopTracks, artistData}: TopTrackProps) {
	const artistImage = mediumArtistImageElement(artistData);
	const setUniqueKey = keySetter();
	const artistSongs = artistTopTracks.map(x => [<p key={setUniqueKey()} className="text-textColor max-w-20">{x.name}</p>,  <Image key={setUniqueKey()} src={x.album.images[0].url} width="60" height="60" alt="album photo" />, <p key={setUniqueKey()} className="text-textColor max-w-20">{x.album.name}</p>, <p key={setUniqueKey()} className="text-textColor max-w-20">+</p>]);

	return (
		<div className="ml-2 mr-2 flex flex-col items-center">
			<h2 className="font-tropiLand text-4xl">{artistData.name}</h2>
			{artistImage}
			<div className="font-tropiLand grid grid-cols-4 gap-5 w-fit mt-6">
				<h3>Track Title</h3>
				<h3>Album Art</h3>
				<h3>Album</h3>
				<h3>Add Track To Playlist</h3>
				{artistSongs}
			</div>
		</div>
	); 
}
