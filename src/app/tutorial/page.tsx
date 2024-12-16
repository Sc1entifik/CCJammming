export default function About() {
	return (
		<div className="flex justify-center">
			<div className="flex font-bounce flex-col items-start tracking-widest w-4/5">
				<h1 className="text-6xl mb-4">jaMMMing Spotify Playlist App</h1>
				<p className="text-textColor">jaMMMing is a performant web app for listening to songs while creating and working with Spotify playlists. (Listening to songs requires Spotify Premium)</p>
				<p className="text-textColor">Working with playlists in the standard Spotify app can feel frustrating so I made this app to streamline the process. Once you start building your playlists this way you will want to use the app everytime you work with your playlists.</p>

				<h2 className="text-4xl mb-4 mt-10">App Permissions</h2>
				<p className="text-textColor">The app needs permissions from your Spotify account in order for you to listen to songs, create, and modify playlists.</p>
			</div>
		</div>
	);
}
