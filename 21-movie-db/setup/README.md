we also refactor fetch to a custom hook

currently, we have two "urls", one for the search and one for the ID, in the useFetch we set them dynamically.

for the useFetch, it returns an object based on the url params, called in context.js (list of movies) and SingleMovie.js (single movie, id params)
