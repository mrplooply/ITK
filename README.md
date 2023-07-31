# In The Kitchen

## Client

### Styles and Themes

The assets folder contains resources for styles and themes. The styles file exports objects for styling main and contentWrap components. Each new page should be wrapped by a View with style contentWrap and that view should be wrapped by a SafeAreaView with style main. This allows consistency throughout the app.

The colors can be accessed in assets/themes/... For now we only have a light theme, but this allows for easier implementation of a dark theme later on. The lights file has primary and second key names.

import light from assets/themes

import dark from assets/themes

import {PageStyles} from assets/Styles

### Dependencies

- npm install

- npx expo install react-native-maps

- npm install @react-navigation/native @react-navigation/native-stack

- npx expo install react-native-screens react-native-safe-area-context

- npm install react-navigation

- npm install react-native-gesture-handler

- sudo npx expo install expo-image-picker

- npm install react-native-ratings

### Friends / Long Polling

Since the friend requests will be frequently updated, we use long polling to consistently update the status of friend requests with live feedback. We send in a request with setInterval and useEffect every 5 seconds, however, this could be adjusted to shorter for even quicker feedback.
>>>>>>> README.md

## Server

### Dependencies

- npm i mongoose

- npm i dotenv

- npm i cors

- npm i bodyparser

- npm i express

- npm i bcryptjs

- npm i jsonwebtoken

### Running the Server

For development testing, run _npm run devStart_ in a terminal. This will start the server on localhost:5000 since we have not yet deployed. GET requests can be made in the browser by visiting the url _http://localhost:5000_ followed by any appropiate routing for testing purposes. Any other form of requests should be made in postman or another third-party app.

For PUT/POST requests for users – fName, lName, username, and password are all required.
For PUT/POST requests for courts – name, location, Google Places ID, are all required.

### Models

The models for data that is stored in our MongoDB are created here. That is, the information needed for relevant collections in our Database. For example, users will need a first name, last name, username, password, profile picture, and bio. Likewise, courts need to have a location, an associated name, the current rating, a unique Google Places ID, and the times people meet there.

As of sprint 2, Models for user and court have been modified to store more information. The user stores friends, friend requests, and a path to his/her profile pic on the server. The courts now store an array of image paths to render on the client sides view park page.

### Routes

The routes folder is where all the re-routing takes place. This may be to the /auth page or the /courts page where the necessary handling of HTTP Requests go.

_Auth.js_

The auth route handles user logins and registration. Posts to /auth/register are for new users to create accounts. It checks if the username exists in the Database already and if not, it can create a new user in the database with the appropiate user info. The server uses JWT to create a token and send it over to the client. The client can then use this token to query the user route with authentication. We use bcrypt to encrypt passwords with salting and unique hashes.

The /auth/login checks for a valid username in the database, and if there is one, uses bcrypt to match the entered password to the encrypted one stored.

_courts.js_

The courts route is responsible for uploading new court information and fetching information on already uploaded courts. Currently, our working model for courts would not allow for filtering on regions or states but could be considered for future implementation.

_user.js_

We have a GET and PUT method for the user route. PUT can update information such as friends, bio, and images. The GET would return information about a user such as the First Name, Last Name, Username, Friends, and Image. When queries are sent to the user route, the header for "token" should be specified where token should be attained upon login/register.

### Serving Images

Serving images from the database would be slow and taxing. Instead, it would be best to save the images onto the server and put the file name into the database with the respective users and posts. For now we would save each image as user_image-x.png where x is an incremented number. We handle the image uploads under the user route. We store the data as base64 data to the client which renders this as the URL.
