# Toilet Finder Website

This project is a web application that helps users find public toilets near their location. Users can view the toilets on a Google map and get directions to them. Users can also favourite a toilet and these will persist between visits.
The website only serves the Brighton and Hove area and lists public toilets only.

# Table of Contents

Installation
Usage
License
Contributing
Acknowledgements
Installation

To install and run this project locally, you need to have Node.js, npm, and MongoDB installed on your machine.

# Installation

Clone this repository: git clone https://github.com/edickins/toiletFinderWebsite toilet-finder-website
The repository contains two folders - client and server.

Navigate to the project folder: cd toilet-finder-website.

# client

Navigate to the client folder.
Install the dependencies: npm install

# server

Navigate to the server folder.
Install the dependencies: npm install

Create a .env file in both the client and server folders and copy the contents of .env.example files. Replace the dummy values with your own values.

Start the server: npm run start:server
Start the client: npm run start:client
Open your browser and go to http://localhost:3000

# Usage

Once the project is running, you can use it as follows:

The app will load the homepage which shows a map of Brighton and Hove, showing all the public toilets.
To use your current location as the center of the map, click on the Locate Me button.
To get directions to a toilet, click on its marker on the map and then click on the Directions button.
To favourite a toilet, click on its marker on the map and then click on the favourite button in the details panel or do the same from the list of toilets on the toilets page. You do not need to sign in or sign up to do this.

Here are some screenshots of the project:

# License

This project is licensed under the MIT License - see the LICENSE file for details.

# Contributing

Contributions are welcome and appreciated. If you want to contribute to this project, please follow these steps:

# Fork this repository

Create a new branch with a descriptive name
Make your changes and commit them
Push your branch to your fork
Open a pull request with a clear description of your changes
Please make sure to follow the code style guide and adhere to the code of conduct.

# Acknowledgements

This project was inspired by the list of public toilets maintained by Brighton and Hove County Council https://www.brighton-hove.gov.uk/libraries-leisure-and-arts/public-toilets/list-public-toilets-brighton-hove.

This project uses the following libraries and tools:

- React - A JavaScript library for building user interfaces
- TypeScript - A superset of JavaScript that adds types
- Vite - A fast and lightweight web development tool
- Express - A web framework for Node.js
- MongoDB - A document-based database system
- Google Maps API - A web service that provides map and location data
- MirageJS - a tool for mocking RESTful API servers.

I would like to thank Joey Beltram for his guidance throughout this project.

start the sever using the pm2 process manager
cd into the server folder and type the command pm2 start server.js --name server
