import { assertEquals } from "jsr:@std/assert";

import { fetchArtistDataByName } from "./commonFetches";
import { publicAccessObject } from "./spotifyOAuth2";

//deno test --env-file --unstable-sloppy-imports --no-check --allow-read --allow-net --allow-env needs to be ran to get test to function
Deno.test("Public Access Header: Fields Exist", async () => {
	const accessHeader = await publicAccessObject();

	assertEquals(typeof accessHeader.access_token, "string");
	assertEquals(typeof accessHeader.expires_in, "number");
	assertEquals(typeof accessHeader.token_type, "string");
	assertEquals(typeof accessHeader.authHeader.headers, "object");
});

//deno test --unstable-sloppy-imports --no-check --allow-read --allow-net --allow-env needs to be ran to get test to function
Deno.test("Fetch Artist Data By Name: Finds Artists", async () => {
	const accessHeader = await publicAccessObject().then(res => res.authHeader);
	const artistLookups = ["Eminem", "Cage", "The Rolling Stones", "The Beatles", "Prince", "Michael Jackson", "Elvis", "Marilyn Manson", "Five Finger Death Punch", "Oasis"];

	for (const artistName in artistLookups) {
		const artistFetch = await fetchArtistDataByName(artistName, accessHeader);
		assertEquals(artistFetch.name, artistName);
	}

});
