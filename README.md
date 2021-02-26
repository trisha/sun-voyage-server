# sun-voyage-server
This is the back-end code for Sun Voyage (pronounced like 'Bon Voyage'), a decoupled fullstack app.

# About
Welcome to Sun Voyage! Visit planets and dwarf planets in the Solar System to learn more about each, and to see what your age and weight would be in a different world. Interact with other galactic travelers by creating stories together in the comments, similar to in the game 'Once Upon a Time.'

http://sunvoyage.herokuapp.com is the link to our live site.

[Here](sun-voyage.herokuapp.com) is the link to our site's backend.

# Teammates
Patricia Pan
Elyssa Winch
Yasaman Forouzesh

# Timeline
<!-- How to add lists w/i a markdown table: https://stackoverflow.com/questions/19950648/how-to-write-lists-inside-a-markdown-table -->
b = backend functionalty; f = frontend functionality.

user = generic user; User = logged in user. 
| On... | We created/implemented the following... |
| ---- | --------------- |
| Fri, 2/19/21 | <ul> <li>Project idea</li> <li> React components blueprint (f)</li> <li> RESTful Route paths (b)</li> <li>API for planet info (b)</li> <li>User login  (f, b)</li> <li>Account creation from backend (b)</li> </ul> |
| Sat, 2/20/21 | <ul> <li>Atlas cluster (online database, DB) (b)</li> <li>Mongoose model schemas (b)</li> <li>API seeder file (b)</li> <li>Stubbing for files and components/routes (f, b)</li> <li>Navbar partial (f)</li> </ul>|
| Mon, 2/22/21 | <ul> <li>Atlas DB with planet data (from seeder file) (b)</li> <li>User commenting on planets (f, b)</li> <li>Comment editing from backend (b)</li> <li>Navbar styling (f)</li> </ul> |
| Tues, 2/23/21 | <ul> <li>Styling for homepage and planets display (f)</li> <li>Comment deletion from backend (b)</li> <li>User info on Profile page, User info conversions on Planet page</li> </ul> | 
| Wed, 2/24/21 | <ul> <li>DB refactor: Object reference Comment schema (instead of Planet subdocument) (b)</li> <li>User commenting with new Comment schema (f, b)</li> <li>User editing Profile (f, b)</li> <li>'Picture of the Day,' NASA API space photos (f)</li> <li>About page styling, twinkling cover on homepage (f)</li> </ul> |
| Thurs, 2/25/21 | <ul> <li>User comments display on Profile, grouped by Planet (f)</li> <li>User deletion of comments (from Comment, User.comments, and Planet.comments) (f,b)</li> <li>Styling for Astronomy Picture of the Day (APOD)</li> <li>Fresh User token generation when updating Profile (f, b)</li></ul>


<!-- How to deploy to Heroku:
(Server) https://gawdiseattle.gitbook.io/wdi/00-config-deployment/deploy-node-mongo
(Client) https://gawdiseattle.gitbook.io/wdi/00-config-deployment/deploy-node-mongo

Sample APIs and Clients to clone and fork for deployment practice: 
API: https://github.com/TaylorDarneille/MERN-Auth-API/blob/main/package.json
Client: https://github.com/WDI-SEA/MERN-auth-client-1214

We deploy both the client AND the server repos. 

The server URL is sun-voyage.herokuapp.com
The client URL is sunvoyage.herokuapp.com

We can set up our environment/config variables either via terminal commands, or in the Heroku Dashboard: Project > Settings > Show Config Vars (and copy over your environment variables except for Port, since Heroku uses its own)
-->