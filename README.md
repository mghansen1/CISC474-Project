## Fight Club Use
Welcome to the game, just click the link deployed in github actions and sign up. You can play a local version
of the game or play online!

# Technologies Used
TeckStack: Javascript, HTML, CSS, Firebase, Node.js, WebSockets (socket.io), Render deployment, Python

## Fight Club Local Clone/Run Instructions
If you want to clone the repo, you can run our project in the terminal with the command:<br>
```
npm i
http-server
```
in the root of the project to host locally on port 8080. For online multiplayer, navigate to the game-server directory in your/another terminal and run the command :<br>
```
node server.js
```
The corresponding port defaults to port 10000. Currently a test default character will load for testing server.js. You can open multiple browser tabs with localhost on port 10000 and those players will join your games. However, the client.js located in game-server/public directory is depreciated and is **NOT** the client side used in deployed multiplayer. The main client for the deployed online multiplayer can be found in the online-client directory, which connects to the already deployed render server (https://cisc474-online-service.onrender.com).