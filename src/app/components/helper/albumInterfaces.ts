import SpotifyImage from "./interfaces/spotifyImage" 


interface SimplifiedArtist {
	external_urls: { spotify: string }
	href: string
	id: string
	name: string
	type: string
	uri: string
}

interface SimplifiedTrack {
	artists: SimplifiedArtist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_urls: { spotify: string }
	href: string
	id: string
	is_playable: boolean
	linked_from: {
		external_urls: { spotify: string }
		href: string
		id: string
		type: string
		uri: string
	}
	restrictions: { reason: string }
	name: string
	preview_url: string | null
	track_number: number
	type: string
	uri: string
	is_local: boolean
}

interface TracksObject {
	href: string
	limit: number
	next: string
	offset: number
	previous: string
	total: number
	items: SimplifiedTrack
}

export default interface Album {
	album_type: string
	total_tracks: number
	available_markets: string[]
	external_urls: { spotify: string }
	href: string
	id: string
	images: SpotifyImage[]
	name: string
	release_date: string
	release_date_precision: string
	restrictions: { reason: string }
	type: string
	uri: string
	artists: SimplifiedArtist
	tracks: TracksObject
	copyrights: {
		text: string
		type: string
	}
	external_ids: {
		isrc: string
		ean: string
		upc: string
	}
	genres: string[]
	label: string
	popularity: number
}
