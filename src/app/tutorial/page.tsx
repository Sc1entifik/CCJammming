export default function About() {
	return (
		<div className="flex justify-center">
			<div className="flex font-bounce flex-col items-start tracking-widest w-4/5">
				<h1 className="text-6xl mb-4 mt-14">jaMMMing Spotify Playlist App</h1>
				<p className="text-textColor">jaMMMing is a performant web app that streamlines creating and working with Spotify playlists.</p>

				<h2 className="text-4xl mb-4 mt-10">App Permissions And Cookie Policy</h2>
				<p className="text-textColor">jaMMMing needs permissions from your Spotify account in order to modify playlists your playlists and create new ones. We use cookies so when you click the different links across the site everything works without us having to stop and ask you for your permission over and over again. These cookies do not track you or your information and we do not store data about you. These cookies expire and delete themselves after an hour or when you click the Disconnect Spotify Account link at the top of the page when you are done using the site.</p>
			</div>
		</div>
	);
}
