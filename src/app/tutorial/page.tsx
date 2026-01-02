import ScreenshotImageOne from "./screenshotImageOne";
import ScreenshotImageTwo from "./screenshotImageTwo";

export default function About() {
	return (
		<div className="flex justify-center">
			<div className="flex font-bounce flex-col items-start tracking-widest w-4/5">
				<h1 className="text-6xl mb-4 mt-14">jaMMMing Spotify Playlist App</h1>
				<p className="text-textColor">jaMMMing is a performant web app that streamlines creating and working with Spotify playlists.</p>

				<h2 className="text-4xl mb-4 mt-10">App Permissions And Cookie Policy</h2>
				<p className="text-textColor">jaMMMing needs permissions from your Spotify account in order to modify your playlists and create new ones. We use cookies so that when you click the different links across the site everything works without us having to stop and ask you for your permissions over and over again. These cookies do not track you or your information and we do not store data about you. These cookies expire and delete themselves after an hour or when you click the Disconnect Spotify Account link at the top of the page when you are done using the site.</p>

				<h2 className="text-4xl mb-4 mt-10">How To Use The App</h2>
				<h3 className="text-alternativeColor text-2xl mb-1 mt-4">Connect Your Spotify Account</h3>
				<p className="text-textColor">The first thing you need to do to start jaMMMing is to authenticate your Spotify account to use the app. This allows the app to use the Spotify API to create and modify playlists on your behalf. To do this just follow the instructions that appear on the screen when you first navigate to the home screen. Once you click the link there you will be taken to a Spotify authentication page asking you if you would like to give jaMMMing the permissions it needs. After this is done once authentication will be easier on subsequent visits.</p> 
				<ScreenshotImageOne src="/images/initialHomePage1.png"/>

				<h3 className="text-alternativeColor text-2xl mb-1 mt-4">Set The Current Playlist To Modify</h3>
				<p className="text-textColor">After jaMMMing is authenticated to your Spotify account the next step is to set the active playlist which can be done from the Set Current Playlist link at the top of the page or clicking the link from the instructions on the front of the home page. Your current playlist can always be selected or changed from the Set Current Playlist page. This determines which of your Spotify playlists gets modified when you add, remove, or reorder songs on your playlist.</p>
				<ScreenshotImageOne src="/images/initialHomePage2.png"/>
				<p className="text-textColor">This is also the screen you can use to create new playlists and unfollow playlists you are no longer interested in.</p>
				<ScreenshotImageTwo src="/images/setCurrentPlaylist1.png"/>


				<h3 className="text-alternativeColor text-2xl mb-1 mt-4">Music Search And Adding Or Removing Songs</h3>
				<p className="text-textColor">Once you are authenticated to the app and a current playlist is chosen when you navigate to the home page by clicking on the JaMMMing logo at the top of the page or the Home Page link from the navigation bar you will be taken to a music search form.</p>
				<ScreenshotImageTwo src="/images/musicSearch.png"/>

				<p className="text-textColor">There are four search criteria. Artist Top Tracks and Artist Albums lets you look up songs and albums by artist name. Album lets you look up albums by album name and Song lets you look up songs by song name.</p>
				<ScreenshotImageTwo src="/images/artistTopTracks.png"/>

				<p className="text-textColor">Clicking a song will add it to your playlist. Clicking an album will expand the album showing the songs in the album to add them individually to your playlist. Clicking the Click for Play Sample button will bring up a few second sample of the song for you to listen to.</p>
				<ScreenshotImageTwo src="/images/samplePlayer.png"/>

				<p className="text-textColor">On the album and artist album searches you can also add the entire album to your playlist with the add album to playlist button.</p>
				<ScreenshotImageTwo src="/images/artistAlbums1.png" />
				<ScreenshotImageTwo src="/images/artistAlbumsExpandedAlbum.png" />
				<p className="text-textColor">Songs will always be added to the bottom of your playlist and clicking a song from our playlist will remove a song from it.</p>


				<h3 className="text-alternativeColor text-2xl mb-1 mt-4">Reordering And Renaming Playlists</h3>
				<p className="text-textColor">Once you add all the songs you want to your playlist you will probably want to set the perfect playorder for your playlist. Simply go to the Reorder Playlist page and you can grab any song from your playlist and drag it around to change the playlist order. Once you drag all the songs where you want them on your playlist click the Click To Reorder Playlist button to actually make the changes to your playlist.
				This is also the screen that allows you to change the name and description of your playlist.</p>
				<ScreenshotImageTwo src="/images/reorderPlaylist1.png" />
			</div>
		</div>
	);
}
