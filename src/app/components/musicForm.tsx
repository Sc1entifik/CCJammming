"use client"
import Form from "next/form";


export default function MusicForm() {
	
	return (
			<Form action="/" className="font-tropiLand">

				<input type="text" name="searchTerm" placeholder="Search Term"/>
				<br/>
				<input id="artistTopTracks" type="radio" name="searchTermType" value="artistTopTracks" className="mr-0.5" defaultChecked/>
				<label htmlFor="artistTopTracks" className="mr-3">artist top tracks</label>
				<input id="albumsByArtist" type="radio" name="searchTermType" value="albumsByArtist" className="mr-0.5"/>
				<label htmlFor="albumsByArtist" className="mr-3">Artist Albums</label>
				<input id="album" type="radio" name="searchTermType" value="album" className="mr-0.5"/>
				<label htmlFor="album" className="mr-3">Album</label>
				<br/>
			</Form>
	);
}
