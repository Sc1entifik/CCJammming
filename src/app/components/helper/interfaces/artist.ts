import SpotifyImage from "./spotifyImage"

export default interface Artist {
	external_urls: { spotify: string }
	followers: { 
		href: string | null
		total: number
	} 
	genres: string[]
	href: string
	id: string
	images: SpotifyImage[]
	name: string
	popularity: number
	type: string
	uri: string
}
