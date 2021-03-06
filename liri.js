let cmd = process.argv[2];
let songQuery;
let movieQuery;

function tweetList() {
  const Twitter = require('twitter');
  const key = require('./tkeys.js');
  let client = new Twitter(key);

  console.log(`Recent tweets from devnoch: \n`);
  console.log(`-----------------\n`);

  const params = {
    screen_name: 'devnoch',
    count: 20
  };

  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (let i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        let tweetBody = tweets[i].text;
        let output = JSON.stringify(tweetBody, null, 4);
        console.log(`${output}\n`);
        console.log(`-----------------\n`);
      }
    }
  });

}

function nameSong() {

  const Spotify = require('node-spotify-api');
  const key = require('./skeys.js');
  let spotify = new Spotify(key);

  if (songQuery){

    spotify.search({ type: 'track', query: songQuery, limit: 3 }, function(err, data) {
      if (err) {
        return console.log(`Error occurred: ${err}`);
      }

      let songName = data.tracks.items[0].name;
      let songArtist = data.tracks.items[0].artists[0].name;
      let songURL = data.tracks.items[0].album.external_urls.spotify;
      let songAlbum = data.tracks.items[0].album.name;

      console.log(`-----------------\n`);
      console.log(`This song's for you:`);
      console.log(`"${songName}" by "${songArtist}"`);
      console.log(`\nAlbum:`);
      console.log(songAlbum)
      console.log(`\nPreview Link:`);
      console.log(songURL);
      console.log(`\n----------------------\n`);

    });

  } else {

    spotify.search({ type: 'track', query: 'Ace of Base The Sign', limit: 3 }, function(err, data) {
      if (err) {
        return console.log(`Error occurred: ${err}`);
      }

      let songName = data.tracks.items[0].name;
      let songArtist = data.tracks.items[0].artists[0].name;
      let songURL = data.tracks.items[0].album.external_urls.spotify;
      let songAlbum = data.tracks.items[0].album.name;

      console.log(`\n----------------------`);
      console.log(`You didn't enter a song, but check out`);
      console.log(`"${songName}" by "${songArtist}"`);
      console.log(`\nAlbum:`);
      console.log(songAlbum)
      console.log(`\nPreview Link:`);
      console.log(songURL);
      console.log(`----------------------\n`);

    });

  }

}

function showMovie() {

  const OmdbApi = require('omdb-api-pt')
  const key = require('./okeys.js');
  let omdb = new OmdbApi(key);

  if (movieQuery) {

    omdb.byId({
      title: movieQuery,
    })
    .then(function(res) {

            let movieTitle = res.Title;
            let movieYear = res.Year;
            let imdbRating = res.Ratings[0].Value;
            let rottenTomatoes = res.Ratings[1].Value;
            let moviePlot = res.Plot;
            let actorsArray = res.Actors.split(',');
            let countryArray = res.Country.split(',');
            let langArray = res.Language.split(',');

            console.log(`\n----------------------\n`);
            console.log(`Here is some info for:\n`);
            console.log(`${movieTitle}\n`);
            console.log(`${moviePlot}\n`);
            console.log(`Year released:`);
            console.log(`${movieYear}\n`);
            console.log(`Starring:`);
            for (let i = 0; i < actorsArray.length; i++) {
              console.log(`${actorsArray[i].trim(' ')}\r`);
            }
            console.log();
            console.log(`IMDB Rating: ${imdbRating}`);
            console.log(`Rotten Tomatoes: ${rottenTomatoes}\n`);
            console.log(`County(s) of Production:`);
            for (let i = 0; i < countryArray.length; i++) {
              console.log(`${countryArray[i].trim(' ')}\r`);
            }
            console.log();
            console.log(`Language(s):`);
            for (let i = 0; i < langArray.length; i++) {
              console.log(`${langArray[i].trim(' ')}\r`);
            }
            console.log(`\n----------------------\n`);

          })
      .catch(err => console.error(err))

  } else {

    console.log(`You didn't type in a movie. But check this out:`);

    omdb.byId({
      title: 'Mr. Nobody',
    })
    .then(function(res) {

            // console.log(res);
            let movieTitle = res.Title;
            let movieYear = res.Year;
            let imdbRating = res.Ratings[0].Value;
            let rottenTomatoes = res.Ratings[1].Value;
            let moviePlot = res.Plot;
            let actorsArray = res.Actors.split(',');
            let countryArray = res.Country.split(',');
            let langArray = res.Language.split(',');

            console.log(`\n----------------------\n`);
            console.log(`Here is some info for:`);
            console.log(`${movieTitle}\n`);
            console.log(`${moviePlot}\n`);
            console.log(`Year released:`);
            console.log(`${movieYear}\n`);
            console.log(`Starring:`);
            for (let i = 0; i < actorsArray.length; i++) {
              console.log(`${actorsArray[i].trim(' ')}\r`);
            }
            console.log();
            console.log(`IMDB Rating: ${imdbRating}`);
            console.log(`Rotten Tomatoes: ${rottenTomatoes}\n`);
            console.log(`County(s) of Production:`);
            for (let i = 0; i < countryArray.length; i++) {
              console.log(`${countryArray[i].trim(' ')}\r`);
            }
            console.log();
            console.log(`Language(s):`);
            for (let i = 0; i < langArray.length; i++) {
              console.log(`${langArray[i].trim(' ')}\r`);
            }
            console.log(`----------------------`);

            console.log(`If you haven't watched "Mr. Nobody," then you should:`);
            console.log(`${res.Website}\n`);

            console.log(`It's on Netflix!`);

            console.log(`\n----------------------\n`);

          })
      .catch(err => console.error(err))

  }
}

function doWhat() {

  const fs = require("fs");

  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    let output = data.split(",");

    for (let i = 0; i < output.length; i++) {
      switch (output[i]) {
        case 'my-tweets':
          tweetList()
          break;
        case 'spotify-this-song':
          songQuery = output[i+1];
          nameSong();
          break;
        case 'movie-this':
          movieQuery = output[i+1];
          showMovie();
          break;
        case '':
          console.log(`There is no item here or your text file is blank.`);
        // default:
        //   console.log('Sorry, I didn\'t see an values in your text file.');
      }
    }

  });

}

function helper() {

  console.log(`\n----------------------`);
  console.log(`Hi this is LIRI, your somewhat intellegent assistant for finding tweets, songs and movies.\n`);

  console.log(`To get started type the following to get results:\n`);

  console.log(`For tweets:\r`);
  console.log(`node liri.js my-tweets\n`);

  console.log(`For song info:\r`);
  console.log(`node liri.js spotify-this-song 'Song Title and/or Band'\n`);

  console.log(`For movie info:\r`);
  console.log(`node liri.js movie-this 'Movie Title'\n`);

  console.log(`You may also add arguments to the included text file to run in node.`);
  console.log(`Please separate items with a comma.\n`);

  console.log(`To run arguments from the text file:\r`);
  console.log(`node liri.js do-what-it-says`);
  console.log(`----------------------\n`);

}

switch (cmd) {
  case 'my-tweets':
    tweetList()
    break;
  case 'spotify-this-song':
    songQuery = process.argv[3];
    nameSong();
    break;
  case 'movie-this':
    movieQuery = process.argv[3];
    showMovie();
    break;
  case 'do-what-it-says':
    doWhat();
    break;
  case undefined:
    helper();
    break;
  default:
    console.log(`Sorry, I dont understand the command '${cmd}'.`);
    break;
}
