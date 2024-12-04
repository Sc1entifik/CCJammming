"use client"
import Form from "next/form";


export default function MusicForm() {
	
	return (
			<Form action="/" className="font-tropiLand">

				<input type="text" name="searchTerm" placeholder="Search Term"/>
				<br/>
				<input type="radio" name="searchTermType" value="artistTopTracks" className="mr-0.5" defaultChecked/>
				<label htmlFor="searchTermType" className="mr-3">artist top tracks</label>
				<input type="radio" name="searchTermType" value="Albums By Artist" className="mr-0.5"/>
				<label htmlFor="searchTermType" className="mr-3">Artist Albums</label>
				<input type="radio" name="searchTermType" value="Album" className="mr-0.5"/>
				<label htmlFor="searchTermType" className="mr-3">Album</label>
			<br/>
			</Form>
	);
}
