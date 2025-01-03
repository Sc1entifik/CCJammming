import AlbumSongGrid from "./albumGrid"


export default function Albums({albumName}: {albumName: string}) {
	return (
		<div className="flex flex-col items-center font-tropiLand gap-4">
			<h3>Click Album To Expand</h3>
			<h3 className="mb-8">Click Song To Add To Playlist</h3>
			<AlbumSongGrid artistName={albumName} fetchType="album name"/>
		</div>
	);
}
