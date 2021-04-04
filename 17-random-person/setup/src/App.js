import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

//external API url
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  //function that fetches the user

  // from the user, we need:

  // phone,
  // email,
  // image.large,
  // login.password,
  // name: first and last name,
  // dob.age

  const getPerson = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    //below is full one lined destructuring to manipulate the variables of the object:
    const {
      name: { first, last },
      email,
      dob: { age },
      location: {
        street: { number, name },
      },
      phone,
      picture: { large: image },
      login: { password },
    } = person;

    // below in comments is destructuring the object response in different lines

    // const { phone, email } = person; //creating the variables of phone and email.
    // const { large: image } = person.picture; // this is renaming the large property and setting it to image

    // const {
    //   login: { password },
    // } = person;

    // const { first, last } = person.name;
    // const {
    //   dob: { age },
    // } = person;

    // const {
    //   street: { number, name },
    // } = person.location;

    //  es6 feature: if prop name is equal to variable the holds the value, then we can just use this
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };

    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  //we use the data-label that is on the button.
  //the issue is that we hover over both the button and the icon, so the event.target.value is not reliable, but we set an if statement to only give us the button, because the button has the className .icon
  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'></div>
      <div className='container'>
        <img
          // if person is an object, and if it is not null, then look for person.image, else go for defaultImage
          src={(person && person.image) || defaultImage}
          alt='random user'
          className='user-img'
        />

        <p className='user-title'>My {title} is</p>
        <p className='user-value'>{value}</p>
        <div className='values-list'>
          <button className='icon' data-label='name' onMouseOver={handleValue}>
            <FaUser />
          </button>
          <button className='icon' data-label='email' onMouseOver={handleValue}>
            <FaEnvelopeOpen />
          </button>
          <button className='icon' data-label='age' onMouseOver={handleValue}>
            <FaCalendarTimes />
          </button>
          <button
            className='icon'
            data-label='street'
            onMouseOver={handleValue}
          >
            <FaMap />
          </button>
          <button className='icon' data-label='phone' onMouseOver={handleValue}>
            <FaPhone />
          </button>
          <button
            className='icon'
            data-label='password'
            onMouseOver={handleValue}
          >
            <FaLock />
          </button>
        </div>
        <button className='btn' type='button' onClick={getPerson}>
          {loading ? "Loading... " : "random user"}
        </button>
      </div>
    </main>
  );
}

// results is an Array, with one object. object has different properties, some are objects(highlighted in yellow curly brackets)
// name
// location
// email
// login
// dob
// registered
// phone

export default App;

// {"results":[

//   {
//     "gender":"female",
//     "name":{
//       "title":"Mrs",
//       "first":"Emily",
//       "last":"Sørensen"
//     },
//     "location":{
//   "street":{"number":3831,"name":"Slåenvej"},
// "city":"Lemvig",
// "state":"Danmark",
// "country":"Denmark",
// "postcode":58475,
// "coordinates":{"latitude":"-30.9635","longitude":"64.1925"},
// "timezone":{"offset":"+9:00","description":"Tokyo, Seoul, Osaka, Sapporo, Yakutsk"}
// },
// "email":"emily.sorensen@example.com",
// "login":{
//   "uuid":"4eae6b70-8318-47bd-a84b-0f4af2a51b2d",
//   "username":"sadbird950",
//   "password":"crazy1",
//   "salt":"oeIETZ4H",
//   "md5":"6f765c9381cfd61c030b541c81552b68",
//   "sha1":"0a3750c51bfc0d6e51512605ad7e89697c878b87","sha256":"bc76af46d80cc3133cfdea97895f050da3852b1dd56fa1b707cdf5b6917bc6d4"},

// "dob":{
//   "date":"1959-11-03T22:27:59.030Z",
//   "age":62
// },

// "registered":{
//   "date":"2013-06-22T00:56:07.174Z",
//   "age":8
// },
// "phone":"16317185",
// "cell":"96428151",
// "id":{"name":"CPR","value":"031159-1638"},
// "picture":{
//   "large":"https://randomuser.me/api/portraits/women/96.jpg",
//   "medium":"https://randomuser.me/api/portraits/med/women/96.jpg",
//   "thumbnail":"https://randomuser.me/api/portraits/thumb/women/96.jpg"
// },
// "nat":"DK"}],

// "info":{
//   "seed":"458601e34761fece",
//   "results":1,
//   "page":1,
//   "version":"1.3"}

// }
