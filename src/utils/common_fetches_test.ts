import { assertEquals } from "jsr:@std/assert";

import { fetchAlbumsByName, fetchAlbumTracksById, fetchArtistAlbums, fetchArtistDataByName, fetchArtistTopTracks, fetchTracksByName } from "./commonFetches";
import { publicAccessObject } from "./spotifyOAuth";
import { Album, Track } from "./fetchInterfaces";


const daftPunkAlbumAndTrackList = () => {
	type AlbumsAndTrackList = [album:string, trackList: string[]];
	const daftPunkAlbumsAndTracks: AlbumsAndTrackList = [["Homework", ["Daftendirekt", "WDPK 83.7 FM", "Revolution 909", "Da Funk", "Phoenix", "Fresh", "Around the World", "Rollin' & Scratchin'", "Teachers", "High Fidelity", "Rock'n Roll", "Oh Yeah", "Burnin'", "Indo Silver Club", "Alive", "Funk Ad"]], ["Discovery", ["One More Time", "Aerodynamic", "Digital Love", "Harder, Better, Faster, Stronger", "Crescendolls", "Nightvision", "Superheroes", "High Life", "Something About Us", "Voyager", "Veridis Quo", "Short Circuit", "Face to Face", "Too Long"]], ["Alive 2007", ["Robot Rock / Oh Yeah", "Touch It / Technologic", "Television Rules the Nation / Crescendolls", "Too Long / Steam Machine", "Around the World / Harder, Better, Faster, Stronger", "Burnin' / Too Long", "Face to Face / Short Circuit", "One More Time / Aerodynamic", "Aerodynamic Beats / Gabrielle , Forget About the World", "Prime Time of Your Life / Brainwasher / Rollin' & Scratchin' / Alive", "Da Funk / Daftendirekt", "Superheroes / Human After All / Rock'n Roll", "Human After All / Together / One More Time / Music Sounds Better with You"]], ["Random Access Memories", ["Give Life Back to Music", "The Game of Love", "Giorgio by Moroder", "Within", "Instant Crush (feat. Julian Casablancas)", "Lose Yourself to Dance (feat. Pharrell Williams)", "Touch (feat. Paul Williams)", "Get Lucky (feat. Pharrell Williams and Nile Rodgers)", "Beyond", "Motherboard", "Fragments of Time (feat. Todd Edwards)", "Doin' it Right (feat. Panda Bear)", "Contact"]]];

	return daftPunkAlbumsAndTracks;
};


Deno.test("Public Access Header: Fields Exist", async () => {
	const accessHeader = await publicAccessObject();

	assertEquals(typeof accessHeader.access_token, "string");
	assertEquals(typeof accessHeader.expires_in, "number");
	assertEquals(typeof accessHeader.token_type, "string");
	assertEquals(typeof accessHeader.authHeader.headers, "object");
});


Deno.test("Fetch Artist Data By Name: Finds Artists", async () => {
	const accessHeader = await publicAccessObject().then(res => res.authHeader);
	const artistLookups = ["Eminem", "Cage", "The Rolling Stones", "The Beatles", "Prince", "Michael Jackson", "Elvis", "Marilyn Manson", "Five Finger Death Punch", "Oasis"];

	for (const artistName in artistLookups) {
		const artistFetch = await fetchArtistDataByName(artistName, accessHeader);
		assertEquals(artistFetch.name, artistName);
	}
});


Deno.test("Fetch Artist Top Tracks: Make Sure Object Gets Fetched", async() => {
	const accessHeader = await publicAccessObject().then(res => res.authHeader);
	const artistList = ["Eminem", "Cage", "The Rolling Stones", "The Beatles", "Prince", "Michael Jackson", "Elvis", "Marilyn Manson", "Five Finger Death Punch", "Oasis"];

	for (let i=0; i<artistList.length; i++) {
		const artist = artistList[i];
		const artistTopTracks = await fetchArtistTopTracks(artist, accessHeader);
		const artistFromSearchObject = artistTopTracks[0].artists.find(x => x.name === artist).name;

		assertEquals(artist, artistFromSearchObject);
	}
});


Deno.test("Fetch Artist Albums: Make Sure Specific Albums Get Fetched", async() => {
	type ArtistAlbums = [artist: string, albums: string[]];
	const accessHeader = await publicAccessObject().then(res => res.authHeader);
	const artistsAndAlbums: ArtistAlbums[] = [["Eminem", ["The Slim Shady LP", "The Marshall Mathers LP", "The Eminem Show", "Relapse"]], ["Korn", ["Follow The Leader", "Life Is Peachy", "Issues"]], ["Daft Punk", ["Homework", "Discovery", "Random Access Memories", "Alive 2007"]], ["The Prodigy", ["The Fat of the Land", "Experience", "No Tourists", "Music for the Jilted Generation"]]];

	for(let i=0; i<artistsAndAlbums.length; i++) {
		const [artist, albums] = artistsAndAlbums[i];
		const artistAlbums = await fetchArtistAlbums(artist, accessHeader);
		
		albums.forEach(albumName => {
			const foundAlbum = artistAlbums.find(x => x.name === albumName);

			assertEquals(foundAlbum.name, albumName);
		});
	}
});


Deno.test("Fetch Album Tracks By ID: Make Sure Album Traks Get Fetched", async() => {
	const convertDateToNumber = (x: string) => x.replaceAll("-","");
	const accessHeader = await publicAccessObject().then(res => res.authHeader);
	const daftPunkAlbums = await fetchArtistAlbums("Daft Punk", accessHeader);
	const daftPunkAlbumsAndTracks = daftPunkAlbumAndTrackList(); 
	const fetchedTracks = daftPunkAlbums
	.filter((x: Album) => daftPunkAlbumsAndTracks.map(x => x[0]).includes(x.name))
	.sort((a: Album, b: Album) => convertDateToNumber(a.release_date) - convertDateToNumber(b.release_date))
	.map((x: Album) => fetchAlbumTracksById(x.id, accessHeader));

	for (let i=0; i<fetchedTracks.length; i++) {
		const albumTrackList = daftPunkAlbumsAndTracks[i][1];
		const fetchedTracksFromAlbum = await fetchedTracks[i]
			.then(res => res.map(x => x.name));

		assertEquals(albumTrackList, fetchedTracksFromAlbum);
	}
});


Deno.test("Fetch Abums Query Search: Fetch Albums By Name", async() => {
	type ArtistAndAlbum = [artist: string, album: string];
	const accessHeader = await publicAccessObject().then(res => res.authHeader);
	const albumList: ArtistAndAlbum[] = [["Deftones", "Gore"], ["Kendrick Lamar", "DAMN."], ["Korn", "Life Is Peachy"], ["J. Cole", "2014 Forest Hills Drive"], ["Nas", "Illmatic"], ["Killswitch Engage", "The End of Heartache (Special Edition)"]];

	for (let i=0; i<albumList.length; i++) {
		const [artist, album] = albumList[i];
		const albumFetch = await fetchAlbumsByName(album, accessHeader);
		const targetAlbum = albumFetch.find(x => x.artists.find(x => x.name === artist));

		assertEquals(targetAlbum?.name, album);
	}
});


Deno.test("Fetch Track Query Search: Fetch Tracks By Name", async() => {
	type ArtistAndTracks = [artist: string, track: string];
	const accessHeader = await publicAccessObject().then(res => res.authHeader);
	const artistsAndTracks: ArtistAndTracks[] = [["Eminem", "Role Model"], ["Cage", "Underground Rapstar"], ["Metallica", "Ride The Lightning (Remastered)"], ["Tracy Chapman", "Fast Car"], ["Taylor Swift", "Shake It Off"], ["Marilyn Manson", "The Beautiful People"], ["Alanis Morissette", "Ironic"]]; 

	for (const songAndArtist of artistsAndTracks) {
		const [artistName, trackName] = songAndArtist;
		const trackFetch = await fetchTracksByName(trackName, accessHeader);
		const targetTrack = trackFetch.find((x: Track) => x.artists.find(y => y.name === artistName));

		assertEquals(targetTrack.name, trackName);
	}
}); 
