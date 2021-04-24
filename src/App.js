import { useState, useEffect } from 'react'
import './App.css';

const SubmitTextForm = ({placeholderText, submitLabel, submitEvent}) => {
  const [cityName, setCityName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if(!cityName)
    {
      alert('Enter a city name!');
      return;
    }

    submitEvent(cityName)
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder={placeholderText} value={cityName} onChange={ (e) => setCityName(e.target.value) }/>
      <input type="submit" value={submitLabel}/>
    </form>
  )
}

SubmitTextForm.defaultProps = {
  submitLabel: 'Submit',
  placeholderText: 'Type Something'
}

const App = () => {
  const [cities, setCities] = useState([]);

  //testing pulling an array of cities from the test mysql db on the backend
  useEffect(() => {
    fetch('/api/get_cities').then(res => res.json()).then(data => {
      setCities(data);
    });
  }, []);
  console.log(cities);

  const onAddCity = (newCityName) => {
    console.log('adding city: ' + newCityName);
    const newCity = {
      id: cities.length + 1,
      name: newCityName
    };
    setCities([...cities, newCity]);
  }

  return (
    <div className="App">
      <h1>Reacting with Flask!</h1>
      <SubmitTextForm submitLabel='Add City' placeholderText='City Name' submitEvent={onAddCity}/>
      <h4>A List of Cities for You!</h4>
      <ul>
      {cities.map((city) => <li key={city['id']}>{city['name']}</li>)}
      </ul>
    </div>
  );
}

export default App;
