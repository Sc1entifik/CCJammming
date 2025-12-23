"use client";

import { createRedirectCookie, deleteItemsFromCurrentPlaylist } from "@/utils/serverActions";
import Form from "next/form";

interface UriObject  {
	uri: string
};

export default function RemoveTracksFromPlaylist( {urlBase, searchTerm, searchTermType, tracks, children}: {urlBase: string, searchTerm: string, searchTermType: string, tracks: UriObject[], children: React.ReactNode} ) {
	const trackUris = tracks.map((x: UriObject) => {
		return {uri: x.uri};
	}); 
	const handleFormSubmit = (formData: FormData) => {
		createRedirectCookie(formData);
		deleteItemsFromCurrentPlaylist(trackUris, urlBase);
	}
	
	return (
		<Form action={handleFormSubmit}>
			<input name="searchTerm" value={searchTerm} hidden readOnly/>
			<input name="searchTermType" value={searchTermType} hidden readOnly/>
			<input name="urlBase" value={urlBase} hidden readOnly/>
			<button type="submit" className="hover:cursor-pointer">{children}</button>
		</Form>
	);
}
