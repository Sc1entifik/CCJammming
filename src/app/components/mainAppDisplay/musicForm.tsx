"use client"
import { createRedirectCookie } from "@/utils/serverActions";
import Form from "next/form";


export default function MusicForm() {
	
	return (
			<Form action={createRedirectCookie} className="font-tropiLand text-center mb-4">
				<input type="text" name="searchTerm" placeholder="Search Term"/>
				<br/>
				<input id="artistTopTracks" type="radio" name="searchTermType" value="artistTopTracks" className="mr-0.5" defaultChecked/>
				<label htmlFor="artistTopTracks" className="mr-3">Artist Top Tracks</label>
				<input id="albumsByArtist" type="radio" name="searchTermType" value="albumsByArtist" className="mr-0.5"/>
				<label htmlFor="albumsByArtist" className="mr-3">Artist Albums</label>
				<input id="albums" type="radio" name="searchTermType" value="albums" className="mr-0.5"/>
				<label htmlFor="albums" className="mr-3">Album</label>
				<input id="songs" type="radio" name="searchTermType" value="songs" className="mr-0.5"/>
				<label htmlFor="songs" className="mr-3">Song</label>
				<br/>
			</Form>
	);
}
