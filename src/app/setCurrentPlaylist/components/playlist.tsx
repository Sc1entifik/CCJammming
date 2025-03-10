import Image from "next/image";
import SimplifiedPlaylistObject from "./userPlaylistInterfaces";

const imageStyle = {
	height: "5.3rem",
	width: "5.3rem",
	borderRadius: "5%",
};

export default function Playlist({playlist, handleClick}: {playlist: SimplifiedPlaylistObject, handleClick: () => void}) {
	
	return (
		<button className="font-tropiLand flex flex-col gap-2 m-4" onClick={handleClick}>
			<h2>{playlist.name}</h2>
			{playlist.images && <Image alt="Mosaic of playlist album covers" src={playlist.images[0].url} height={5000} width={5000} style={imageStyle}/>}
			<p>{playlist.description}</p>
		</button>	
	);
}
