import { useState, useEffect } from 'react'

const App = () => {
  const [time, setTime] = useState(0);
  const [nonsense, setNonsense] = useState({});
  const [cities, setCities] = useState([]);

  //this more compact syntax uses promises instead of async/await to grab data from the backend
  //I'm not sure if there's any downside to doing it the pithier way
  //maybe this doesn't work so well with events like button presses?
  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      //note - the data.time syntax here means the same thing as data['time']
      setTime(data.time);
    });
  }, []);


  //testing pulling an array of cities from the test mysql db on the backend
  useEffect(() => {
    fetch('/api/test_db').then(res => res.json()).then(data => {
      setCities(data);
    });
  }, []);
  console.log(cities);

  //this code uses async/await as with the traversy react tutorial
  useEffect(() => {
    const getNonsense = async () => {
      const nonsenseFromServer = await fetchNonsense();
      setNonsense(nonsenseFromServer);
    };

    getNonsense();
  }, []);

  const fetchNonsense = async () => {
    const res = await fetch('/api/nonsense');
    return await res.json()
  };

  return (
    <div className="App">
      <h1>Reacting with Flask!</h1>
      <p>The time is {time}!</p>
      <h4>The Nonsense is as Follows...</h4>
      <ul>
      {Object.keys(nonsense).map((nsKey) => <li key={nsKey}>{nsKey}: {nonsense[nsKey]}</li>)}
      </ul>
      <h4>And here's some cities!</h4>
      <ul>
      {cities.map((city) => <li key={city['id']}>{city['name']}</li>)}
      </ul>
    </div>
  );
}

export default App;
