interface Artist {
	external_urls: {
		spotify: string
		href: string
		id: string
		name: string
		type: string
		uri: string
	}
}

interface Image {
	url: string
	width: number
	height: number
}

interface Album {
	album_type: string
	artists: Artist[]
	available_markets: string[]
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	images: Image[]
	name: string
	release_date: string
	release_date_precision: string
	total_tracks: number
	type: string
	uri: string
}

export default interface Track {
	album: Album
	artists: Artist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: { isrc: string }
	external_urls: { spotify: string }
	href: string
	id: string
	is_local: boolean
	name: string
	popularity: number
	preview_url: string | null
	track_number: number
	type: string
	uri: string
}
