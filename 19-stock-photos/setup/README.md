19 stock photos:

this app fetches data from unsplash.com, a stock photo API. inside the app, it uses template literals to set different URLs, depending if the user wants to search for a specific set of images or not, as well as refreshing the entire set of data collected if the search query is something new.

with every change to the query, we always set the page state to 0, which will refresh the data received when the submit button is clicked.
