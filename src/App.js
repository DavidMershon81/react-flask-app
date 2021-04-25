import { useState, useEffect } from 'react'
import FormWithText from './components/FormWithText'
import './App.css';


const App = () => {
  const [cities, setCities] = useState([]);

  //testing pulling an array of cities from the test mysql db on the backend
  useEffect(() => {
    fetch('/api/get_cities').then(res => res.json()).then(data => {
      setCities(data);
    });
  }, []);
  console.log(cities);

  const addCity = (newCityName) => {
    fetch('/api/add_city', {
      method: 'POST',
      headers: { 
        'Content-type' : 'application/json' 
      },
      body: JSON.stringify({ 'newCityName' : newCityName })
    }).then(res => { 
      return res.json(); 
    }).then(newCity => {
      console.log(newCity);
      setCities([...cities, newCity]);
    });
  };

  /*
  const onAddCity = (newCityName) => {
    console.log('adding city: ' + newCityName);
    const newCity = {
      id: cities.length + 1,
      name: newCityName
    };
    setCities([...cities, newCity]);
  }
  */

  return (
    <div className="App">
      <h1>Reacting with Flask!</h1>
      <FormWithText submitLabel='Add City' placeholderText='City Name' submitEvent={addCity}/>
      <h4>A List of Cities for You!</h4>
      <ul>
      {cities.map((city) => <li key={city['id']}>{city['name']}</li>)}
      </ul>
    </div>
  );
}

export default App;
