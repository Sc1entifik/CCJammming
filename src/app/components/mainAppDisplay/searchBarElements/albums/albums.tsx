import AlbumGrid from "./albumGrid/albumGrid";


export default function Albums({albumName}: {albumName: string}) {
	return (
		<div className="flex flex-col items-center font-tropiLand gap-4 max-w-[40rem] max-h-[84dvh]">
				<h3 className="text-textColor">Click Album To Expand</h3>
				<h3 className="text-textColor">Click Song To Add To Playlist</h3>
				<h3 className="text-textColor mb-4">Click Spotify Tag To Play On Spotify</h3>
			<AlbumGrid artistName={albumName} fetchType="album name"/>
		</div>
	);
}
