- v-0.0.0.0.1 - Initial commit nothing done.
- v-0.3 - Built Input validation function for using the Spotify Search api. Built class to use the Spotify API. Enum built containing Spotify endpoints. .env file made.
- v-0.3.5 - Finished class to obtain access token from an access code. Built some data fetching methods using access token. Loaded custom font for Header on page. 
- v-0.3.8 - Refactored authorization and api fetching class to two separate classes with composition having the api fetching class use the authorization class to get the authorization header it needs to make api calls. Made interfaces so objects and list returned from the SpotifyApi class have proper methods and return types. Added custom styling fonts and created color pairs for website. 
- v-0.5 - Fixed bug where using the search bar resulted in Spotify passing a bad oAuth header. Wrote code for writing to and reading from an oAuthHeader.json file to utilize headers returned from Spotify on page refresh. Added search bar component. 
- v-0.6 - Learned how to use cookies to store the header data which is more efficient than writing the JSON method on the server. This streamlined the process greatly. Also removed the now unnecessary oAuthHeader.json file. Added a few more fetch methods and interfaces to the SpotifyApiFetch class.
- v-0.6.3 - Added Artist album component which is a collapsable component that shows the looked up artist albums and then expands and shows the album track when clicked on.
- v-0.6.6 - Added Playlist component which shows each playlist that the user can modify by filtering the user's playlists by the playlists that they can modify. 
- v-0.7 - Refactored Layout.ts so that the nav bar shows whether or not you are connected to your Spotify account and allows you to connect and disconnect it. Added server action for deleting browser cookie by disconnect link. Refactored Spotify Login Authorization to a server action instead of an API endpoint. Refactored client side fetching to use functions instead of classes. Wrote tests for client side fetches. Discovered and fixed Underground Artist Data Bug as detailed below.  Refactored various functional components.
- v-0.7.2 - Refactored all elements to use new fetching system. Removed old fetching system. Removed unnecessary helper component files. Wrote more tests for fetching system.
- v-0.7.5 - Wrote fetch and test for album form query. Added Album fetch to form radio button. Refactored albumCollapse.tsx to show artist for every album. Renamed ArtistAlbumSongGrid to AlbumSongGrid and renamed artistAlbumGrid.tsx to albumGrid.tsx. 
- v-0.7.6 - Wrote fetch and test for song form query. Wrote Functional components for song lookup.
- v-0.7.8 - Wrote fetch for user playlists. Wrote fetch for user account. Filtered playlists for only playlists the user owns and can modify. Created a separate page route for selecting playlists. Created a hidden link in layout.ts that shows up after user connects their spotify account which links to the setCurrentPlaylist route. Created "use server" function inside of map object that sets the currentPlaylist cookie which stores a playlist id. Moved some functional components to their local routes.
- v-0.8 - Created new fetches that can look up playlists by playlist id. Created functional components to display the current playlist and it's contents. The setCurrentPlaylist route now displays current playlist once chosen. 


Bug Fixes:
- Search Bar Refresh - Bug triggered when page refresh happened from form submit. This triggered another oAuth header request which results in an invalid header. Fixed this by saving the header to a JSON file and then retrieving it. Later switched to a cookie based system.

- Underground Artist Data Bug - Bug triggered when looking for a lesser known artist by name which has a similar name to a well known artist thus causing the more well known artist data to get returned instead. Fixed this by filtering for artist name on list with .find() and then returning res.items[0] only when res.items.find() variable is undefined.


Things Coming:
1. More search point options.
2. Playlist functionality.
3. Ability to play songs.
