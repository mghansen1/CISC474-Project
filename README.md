Hello, you can run our project with the command:
>>http-server 
in the root of the project to host locally on port 8080. For online multiplayer, navigate to the game-server directory
and run the command:
>> nodemon server.js
When connecting to the corresponding port (defaulting port 10000), the online arena has no characters appear. Currently a test default character will load for testing server.js. However, the client.js located in game-server/public directory is NOT the cleint side used in multiplayer. The main client for the online multiplayer can be found in online-client, which connects to the already deployed render server (https://cisc474-online-service.onrender.com).