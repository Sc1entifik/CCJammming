"use client";
import { Playlist } from "@/utils/fetchInterfaces";
import { changePlaylistNameAndDescription } from "@/utils/serverSideFetches";
import Form from "next/form";
import { useState } from "react";

export default function PlaylistNameAndDescription({currentPlaylist} : {currentPlaylist: Playlist}) {
	const [playlistName, setPlaylistName] = useState(currentPlaylist.name);
	const [playlistDescription, setPlaylistDescription] = useState(currentPlaylist.description ? currentPlaylist.description : "");

	return (
		<div>
		<h2 className="text-center mb-2 tracking-wide font-tropiLand text-textColor">Changes Made To Playlist Name And Description May Take A Minute To Process</h2>
		<Form action={changePlaylistNameAndDescription} className="flex gap-10 justify-center">
			<div className="flex flex-col gap-1">
				<input name="playlistName" className="mb-2 w-60 px-2 text-black" value={playlistName} onChange={event => setPlaylistName(event.target.value)} placeholder={playlistName}/>
				<input name="playlistDescription" className="w-60 px-2 text-black" value={playlistDescription} onChange={event => setPlaylistDescription(event.target.value)} placeholder={playlistDescription ? playlistDescription : "Add a playlist description here"} />
			</div>
			<button className="bg-gray-500 border rounded-md px-2 text-textColor" type="submit">Update Name And Description</button>
		</Form>
		</div>
	);
}
