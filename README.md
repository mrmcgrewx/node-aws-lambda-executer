# Node Express AWS Executor #

This is a lightweight node server that I developed a few months ago for tracking website data on popular airline websites.
This is just the management part of the scraper and you will notice there is no scraping code within this repo.
If you are interested, that code can be found in the python repo.

This premise of this app is simple, it utilizes the node-schedule package to trigger AWS lambda functions that then handle
the actual scraping of the data. I went with this approach because using AWS lambdas allows me to send high amounts of URL requests
without having to manage IP's.

For personal reasons I decided to migrate to a Java Spring code base, so I figured I would share this for anyone interested in
a lightweight node server that manages AWS lambdas.


### How to install ###

Assuming you have Nodejs and npm already installed.

Do a npm install.

`npm install`

You'll need to set the env var for the AWS Lambda endpoint (or paste in there).

Then start the server.

`npm start`

