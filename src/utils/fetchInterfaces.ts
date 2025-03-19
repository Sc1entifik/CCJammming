interface simplifiedArtist {
	external_urls: {
		spotify: string
	}

	href: string
	id: string
	name: string
	type: string
	uri: string
}


interface PodcastShow {
	available_markets: string[]
	copyrights: {
		text: string
		type: string
	}
	description: string
	html_description: string
	explicit: boolean
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	images: SpotifyImage[]
	is_externally_hosted: boolean
	languages: string[]
	media_type: string
	name: string
	publisher: string
	type: string
	uri: string
	total_episodes: number
}


export interface TrackObject {
	album: Album
	artists: simplifiedArtist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: {
		isrc: string
		ean: string
		upc: string
	}
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	is_playable: boolean
	restrictions: {
		reason: string
	}
	name: string
	popularity: number
	track_number: number
	type: string
	uri: string
	is_local: boolean
}


export interface EpisodeObject {
	description: string
	html_description: string
	duration_ms: number
	explicit: boolean
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	images: SpotifyImage[]
	is_externally_hosted: boolean
	is_playable: boolean
	language: string
	languages: string[]
	name: string
	release_date: string
	release_date_precision: string
	resume_point: {
		fully_played: boolean
		resume_position_ms: number
	}
	type: string
	uri: string
	restrictions: {
		reason: string
	}
	show: PodcastShow
}


export interface SpotifyImage {
	url: string
	height: number
	width: number
}

export interface AuthHeader {
	headers: {Authorization: string}
}

export interface Artist extends simplifiedArtist {
	followers: {
		href: string
		total: number
	}
	genres: string[]
	images: SpotifyImage[]
	popularity: number
}

export interface Album {
	album_type: string
	total_tracks: number
	available_markets: string[]
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	images: SpotifyImage[]
	name: string
	release_date: string
	release_date_precision: string
	type: string
	uri: string
	artists: Artist[]
}

export interface Track {
	album: Album
	artists: simplifiedArtist[]
	available_markets: string[]
	disc_number: number
	duration_ms: number
	explicit: boolean
	external_ids: {
		isrc: string
		ean: string
		upc: string
	}
	external_urls: {
		spotify: string
	}
	href: string
	id: string
	is_playable: boolean
	restrictions: {
		reason: string
	}
	name: string
	popularity: number
	track_number: number
	type: string
	uri: string
	is_local: boolean
}


export interface Owner {
	external_urls: {
		spotify: string
	}
	followers: {
		href: string | null
		total: number
	}
	href: string
	id: string
	type: string
	uri: string
	display_name: string | null
}


export interface PlaylistTrackObject {
	added_at: string
	added_by: {
		external_urls: {
			spotify: string
		}
		followers: {
			href: string
			total: number
		}
		href: string
		id: string
		type: string
		uri: string
	}
	is_local: boolean
	track: TrackObject | EpisodeObject
}


export interface PlaylistTracks {
	href: string
	limit: number
	next: string | null
	offset: number
	previous: string | null
	total: number
	items: PlaylistTrackObject[]
}


export interface Playlist {
	collaborative: boolean
	description: string | null
	external_urls: {
		spotify: string 
	}
	followers: {
		href: string | null
		total: number
	}
	href: string
	id: string
	images: SpotifyImage[]
	name: string
	owner: Owner
	public: boolean
	snapshot_id: string
	tracks: PlaylistTracks
	type: string
	uri: string
}


export interface UserProfile {
	display_name: string
	id: string
	images: SpotifyImage
	product: string
	type: string

}


export interface DeviceObject {
	id: string
	is_active: boolean
	is_private_session: boolean
	is_restricted: boolean
	name: string
	type: string
	volume_percent: number
	supports_volume: boolean
}
