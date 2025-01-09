import Image from "next/image";
import SimplifiedPlaylistObject from "./userPlaylistInterfaces";

const mosaicImageSize = 85;

export default function Playlist({playlist, handleClick}: {playlist: SimplifiedPlaylistObject, handleClick: () => void}) {
	
	return (
		<button className="font-tropiLand flex flex-col gap-2 m-4" onClick={handleClick}>
			<h2>{playlist.name}</h2>
			{playlist.images && <Image alt="Mosaic of playlist album covers" src={playlist.images[0].url} height={mosaicImageSize} width={mosaicImageSize}/>}
			<p>{playlist.description}</p>
		</button>	
	);
}
