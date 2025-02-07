import Image from "next/image";

interface Album {
	name: string
	images: {
		url: string
	}[]
}

export default function AlbumNameAndCover({album, albumCoverSize}: {album: Album, albumCoverSize: number}) {
	const imageStyle = {
		height: `${albumCoverSize}rem`,
		width: `${albumCoverSize}rem`,
	};


	return (
	<div className={"flex flex-col items-center"}>
		<Image alt="album cover" src={album.images[0].url} width={5000} height={5000} style={imageStyle}/>
		<p className="text-textColor max-w-32">{album.name}</p>
	</div>
	);
	
}
