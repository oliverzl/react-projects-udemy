//fetch github followers, and paginate the followers. we can decide on the amount of items on a page.

//if we have 100 items, and 10 items per page, that will be 10 pages.

//when it comes to pagination, there is pagination on the front end on the client. we require a batch of data and just paginate on them
//second flavour is paginating on a server: it is already paginated, and we just set up the request for different pages.

//here, we just need to tell the server to give us the data, and we automatically paginate

//we want an array of arrays
//an array of each page, and each page is one array, an item of the parent array
import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  //immeditely gets the data from the custom hook useFetch.
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0); //this value acts as the index of the parent array, and the default is 0, so that the first 'page'/array of followers that are rendered in that one page only are displayed.

  const [followers, setFollowers] = useState([]);

  //setting up the useEffect that grabs a certain page after loading, this useEffect will always run when loading state value changes.

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page]);

  const handlePage = (index) => {
    setPage(index);
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }

      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }

      return prevPage;
    });
  };

  return (
    <main>
      <div className='section-title'>
        <h1>{loading ? "Loading..." : "Pagination"}</h1>
        <div className='underline'></div>
      </div>
      <section className='followers'>
        <div className='container'>
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>

        {!loading && (
          <div className='btn-container'>
            <button className='prev-btn' onClick={prevPage}>
              prev
            </button>
            {data.map((item, index) => {
              return (
                <button
                  onClick={() => {
                    handlePage(index);
                  }}
                  key={index}
                  className={`page-btn ${index === page ? "active-btn" : null}`}
                >
                  {index + 1}
                </button>
              );
            })}
            <button className='next-btn' onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
