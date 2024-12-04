- v-0.0.0.0.1 - Initial commit nothing done.
- v-0.3 - Built Input validation function for using the Spotify Search api. Built class to use the Spotify API. Enum built containing Spotify endpoints. .env file made.
- v-0.3.5 - Finished class to obtain access token from an access code. Built some data fetching methods using access token. Loaded custom font for Header on page. 
- v-0.3.8 - Refactored authorization and api fetching class to two separate classes with composition having the api fetching class use the authorization class to get the authorization header it needs to make api calls. Made interfaces so objects and list returned from the SpotifyApi class have proper methods and return types. Added custom styling fonts and created color pairs for website. 
- v-0.5 - Fixed bug where using the search bar resulted in Spotify passing a bad oAuth header. Wrote code for writing to and reading from an oAuthHeader.json file to utilize headers returned from Spotify on page refresh. Added search bar component. 
- v-0.6 - Learned how to use cookies to store the header data which is more efficient than writing the JSON method on the server. This streamlined the process greatly. Also removed the now unnecessary oAuthHeader.json file. Added a few more fetch methods and interfaces to the SpotifyApiFetch class.


Things Coming:
1. Front end.
2. More search point options.


