"use client"
import { createRedirectCookie } from "@/utils/serverActions";
import Form from "next/form";


export default function MusicForm() {
	
	return (
				<Form
					action={createRedirectCookie} 
					className="
						w-120
						font-tropiLand 
						text-xl
						text-alternativeColor
						flex 
						flex-col 
						items-start
						tracking-wider
						gap-1.5
						bg-[hsl(268,70%,18%)] 
						rounded-2xl 
						shadow-[20px_20px_40px_rgba(0,0,0,0.9),-8px_-8px_20px_rgba(255,255,255,0.04)]
				">
					<input 
						type="text"
						name="searchTerm"
						placeholder="Search Term"
						className="
							w-4/5
							py-0.5
							px-2
							text-black
							bg-white
							m-4
							rounded-xl 
					"/>

					<div className="mx-4">
						<input id="artistTopTracks" type="radio" name="searchTermType" value="artistTopTracks" defaultChecked />
						<label htmlFor="artistTopTracks" className="pl-3">Artist Top Tracks</label>
					</div>
				
					<div className="mx-4">
						<input id="albumsByArtist" type="radio" name="searchTermType" value="albumsByArtist" />
						<label htmlFor="albumsByArtist" className="pl-3">Artist Albums</label>
					</div>

					<div className="mx-4">
						<input id="albums" type="radio" name="searchTermType" value="albums" />
						<label htmlFor="albums" className="pl-3">Album</label>
					</div>

					<div className="mx-4 pb-3">
						<input id="songs" type="radio" name="searchTermType" value="songs" />
						<label htmlFor="songs" className="pl-3">Song</label>
					</div>
				</Form>
	);
}
