import React, {useState, useEffect} from "react";
import {FaAngleDoubleRight} from "react-icons/fa";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tabs-project";

function App() {
  //3 useState values
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState(0);

  //function fetchJobs, that runs with the useEffect right below this useEffect
  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  //this useEffect only runs ON MOUNT, because of the second argument empty array
  useEffect(() => {
    fetchJobs();
  }, []);

  //here, the app supports multiple returns. if loading is true, return the <Loading /> component
  if (loading) {
    return (
      <section className='section loading'>
        <h1>Loading...</h1>
      </section>
    );
  }

  //destucturing the object to each variable
  const {company, dates, duties, title} = jobs[value];
  return (
    <section className='section'>
      <div className='title'>
        <h2>Experience</h2>
        <div className='underline'></div>
      </div>

      <div className='jobs-center'>
        {/* btn container */}
        {/* this btn-container below houses all the buttons for the different companies, each button click will change the display on the right side.  */}

        <div className='btn-container'>
          {/* remember, arrays have the map method, and the index below refers to the position on the jobs array. */}
          {/* since there are three companies, 3 buttons are displayed */}
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`job-btn ${index === value && "active-btn"}`}
                style={{outline: "none"}}
              >
                {item.company}
              </button>
            );
          })}
        </div>

        {/* this is the job info section, that displays the corresponding job as the job button clicks. this is the big section right below the Experience h2. */}
        <article className='job-info'>
          {/* the title, company, dates, duties, all depend on the value state, since on top, its already destructured to the object[value] */}
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>

          {/* we need a duties.map as duties in each item in the array is an object with either 3 or 4 strings inside. */}
          {duties.map((duty, index) => {
            return (
              <div key={index} className='job-desc'>
                <FaAngleDoubleRight className='job-icon' />
                <p>{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
    </section>
  );
}

export default App;

//API is an arrray of objects
//
//
//
//

// [
//   {
//     id: "recAGJfiU4CeaV0HL",
//     order: 3,
//     title: "Full Stack Web Developer",
//     dates: "December 2015 - Present",
//     duties: [
//       "Tote bag sartorial mlkshk air plant vinyl banjo lumbersexual poke leggings offal cold-pressed brunch neutra. Hammock photo booth live-edge disrupt.",
//       "Post-ironic selvage chambray sartorial freegan meditation. Chambray chartreuse kombucha meditation, man bun four dollar toast street art cloud bread live-edge heirloom.",
//       "Butcher drinking vinegar franzen authentic messenger bag copper mug food truck taxidermy. Mumblecore lomo echo park readymade iPhone migas single-origin coffee franzen cloud bread tilde vegan flexitarian.",
//     ],
//     company: "TOMMY",
//   },
//   {
//     id: "recIL6mJNfWObonls",
//     order: 2,
//     title: "Front-End Engineer",
//     dates: "May 2015 - December 2015",
//     duties: [
//       "Hashtag drinking vinegar scenester mumblecore snackwave four dollar toast, lumbersexual XOXO. Cardigan church-key pabst, biodiesel vexillologist viral squid.",
//       "Franzen af pitchfork, mumblecore try-hard kogi XOXO roof party la croix cardigan neutra retro tattooed copper mug. Meditation lomo biodiesel scenester",
//       "Fam VHS enamel pin try-hard echo park raw denim unicorn fanny pack vape authentic. Helvetica fixie church-key, small batch jianbing messenger bag scenester +1",
//       "Fam VHS enamel pin try-hard echo park raw denim unicorn fanny pack vape authentic. Helvetica fixie church-key, small batch jianbing messenger bag scenester +1",
//     ],
//     company: "BIGDROP",
//   },
//   {
//     id: "rec61x18GVY99hQq5",
//     order: 1,
//     title: "Engineering Intern",
//     dates: "May 2014 - September 2015",
//     duties: [
//       "I'm baby woke mumblecore stumptown enamel pin. Snackwave prism pork belly, blog vape four loko sriracha messenger bag jean shorts DIY bushwick VHS. Banjo post-ironic hella af, palo santo craft beer gluten-free.",
//       "YOLO drinking vinegar chambray pok pok selfies quinoa kinfolk pitchfork street art la croix unicorn DIY. Woke offal jianbing venmo tote bag, palo santo subway tile slow-carb post-ironic pug ugh taxidermy squid.",
//       "Pour-over glossier chambray umami 3 wolf moon. Iceland kale chips asymmetrical craft beer actually forage, biodiesel tattooed fingerstache. Pork belly lomo man braid, portland pitchfork locavore man bun prism.",
//     ],
//     company: "CUKER",
//   },
// ];
