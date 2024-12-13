import SpotifyImage from "./helper/interfaces/spotifyImage"

interface Owner {
	external_urls: { spotify: string }
	followers: {
		href: string
		total: number
	}
	href: string
	id: string
	type: string
	uri: string
	display_name: string | null

}

export default interface SimplifiedPlaylistObject {
	collaborative: boolean
	description: string
	external_urls: { spotify: string }
	href: string
	id: string
	images: SpotifyImage[]
	name: string
	owner: Owner
	public: boolean
	shapshot_id: string
	tracks: {
		href: string
		total: number
	}
	type: string
	uri: string
}
