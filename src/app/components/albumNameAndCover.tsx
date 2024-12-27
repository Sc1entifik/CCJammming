import Image from "next/image";

interface Album {
	name: string
	images: {
		url: string
	}[]
}

export default function AlbumNameAndCover({album, albumCoverSize}: {album: Album, albumCoverSize: number}) {
	return (
	<div className={"flex flex-col items-center"}>
		<Image alt="album cover" src={album.images[0].url} width={albumCoverSize} height={albumCoverSize}/>
		<p className="text-textColor max-w-32">{album.name}</p>
	</div>
	);
	
}
