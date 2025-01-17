"use client"
import { addPlaylist } from "@/utils/serverActions";
import Form from "next/form"

export default function NewPlaylistForm() {

	return (
		<Form className="flex flex-col gap-y-3 my-11" action={addPlaylist}>
			<input type="text" name="newPlaylistName" placeholder="New playlist Name Here" required/>
			<input type="text" name="newPlaylistDescription" placeholder="New playlist description here" required/>
			<div className="flex">
				<input type="radio" name="playlistType" value="public" defaultChecked/>
				<label htmlFor="playlistType" className="mr-3 font-sans tracking-widest">Public</label>
				<input type="radio" name="playlistType" value="private"/>
				<label htmlFor="playlistType" className="mr-3 font-sans tracking-widest">Private</label>
			</div>
			<button type="submit" hidden>Submit</button>
		</Form>
	);
}
