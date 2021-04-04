//we want to display a certain amount of followers at a time. we have a giant array of users, but we want an array of PAGES, the page will hold an array of followers.
//clicking buttons below displays the index of that array.

//in each array, i want to pull in a certain amount of items into my list
const paginate = (followers) => {
  const itemsPerPage = 10;
  const pages = Math.ceil(followers.length / itemsPerPage); //13

  const newFollowers = Array.from({ length: pages }, (item, index) => {
    const start = index * itemsPerPage;
    //this means we pull our followers from our paginate argument on top. for EACH array in the parent array, we make a new array with slice. start is index * itemPerPage, and we add 8
    //if the index is 2, the start is 16, and ends with 24. this is the 3rd page, since its 2nd index
    return followers.slice(start, start + itemsPerPage); //starting with 0, end with 8, next iteration: start with 8, end with 16, and so on
  });

  return newFollowers;
};

export default paginate;

//paginate exports to the useFetch custom hook, so the function run is @ useFetch.
