# 2. Full Stack Project: 2

### This is a second project for full stack programming course in Laurea.

#### App is connected to Reaktor API.

### I had to use axios to have a connection to API data, otherwise it would not be possible due to CORS-Error. After I connected to API using axios I sended all API data to a JSON file.

### Data sended to JSON file is not duplicated, because of statement which checks data by id.

### After that I create a new get method for json data called /json. This method outputs all the previously copied API json data in browser.

### Game.js in other hand is fetching data and outputs all data to the ejs using DOM. App outputs game session, which contains players names, players played hands and every session result. After each session creates two diffirent "Dictionary" alike arrays. One array contains score data, other contains every session data-history. This arrays used to visualise data in html using DOM method. In html code I have two different tables, one is for scoreboard and other is for session history. Session history is insorted and scoreboard is sorted in way by players highest score amount. List of Object is dynamic, so as the html table-element.

#### App was builded using following tools:

- nodejs
- express
- vanilla js
- sass/css
