import ArtistNameAndImage from "../commonElements/artistNameAndImage";
import AlbumGrid from "./albumGrid/albumGrid";


export default async function ArtistAlbums({artistName}: {artistName: string}) {

	return (
		<div className="flex flex-col items-center xl:flex-row xl:items-start font-tropiLand gap-10 max-w-160 h-[110dvh] xl:h-[84dvh] pl-2">
			<div suppressHydrationWarning className="flex flex-col items-start gap-2">
				<ArtistNameAndImage artistName={artistName}/>
				<h3 className="text-textColor">Scroll To See All Albums</h3>
				<h3 className="text-textColor">Click Album To Expand</h3>
				<h3 className="text-textColor">Click Song To Add To Playlist</h3>
				<h3 className="text-textColor">Click Spotify Tag To Lisen On Spotify</h3>
			</div>
			<AlbumGrid artistName={artistName} />
		</div>
	);
}
