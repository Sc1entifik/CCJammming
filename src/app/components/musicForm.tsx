"use client"
import Form from "next/form";

type formParams = {
	code: string
	state: string
}

export default function MusicForm({code, state}: formParams) {
	
	return (
			<Form action="/" className="font-tropiLand">
				<input type="hidden" name="code" value={code}/>
				<input type="hidden" name="state" value={state}/>
				<input type="text" name="searchTerm" placeholder="Search Term"/>
				<br/>
				<input type="radio" name="searchTermType" value="artistTopTracks" defaultChecked/>
				<label htmlFor="searchTermType">artist top tracks</label>
				<input type="radio" name="searchTermType" value="Unused"/>
				<label htmlFor="searchTermType">Unused</label>
				<br/>
			</Form>
	);
}
