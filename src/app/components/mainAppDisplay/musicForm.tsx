"use client"
import { createRedirectCookie } from "@/utils/serverActions";
import Form from "next/form";


export default function MusicForm() {
	
	return (
			<div className="flex justify-center">
			<Form action={createRedirectCookie} className="font-tropiLand flex flex-col items-start mb-4 tracking-wider">
				<div className="bg-white">
					<input type="text" name="searchTerm" placeholder="Search Term" className="py-0.5 px-2 w-60 text-black"/>
				</div>
				<br/>

				<div className="mb-0.5">
					<input id="artistTopTracks" type="radio" name="searchTermType" value="artistTopTracks" className="mr-0.5" defaultChecked/>
					<label htmlFor="artistTopTracks" className="pl-3">Artist Top Tracks</label>
				</div>
			
				<div className="mb-0.5">
					<input id="albumsByArtist" type="radio" name="searchTermType" value="albumsByArtist" className="mr-0.5"/>
					<label htmlFor="albumsByArtist" className="pl-3">Artist Albums</label>
				</div>

				<div className="mb-0.5">
					<input id="albums" type="radio" name="searchTermType" value="albums" className="mr-0.5"/>
					<label htmlFor="albums" className="pl-3">Album</label>
				</div>

				<div className="mb-0.5">
					<input id="songs" type="radio" name="searchTermType" value="songs" className="mr-0.5"/>
					<label htmlFor="songs" className="pl-3">Song</label>
				</div>
				<br/>
			</Form>
			</div>
	);
}
