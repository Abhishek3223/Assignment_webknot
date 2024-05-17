import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const resp = await fetch('https://api.sampleapis.com/beers/ale');
    const json = await resp.json();
    // Filter the beers with rating more than 4.5
    const filteredBeers = json.filter(beer => beer.rating.average > 4.5);
    // Parse the prices and sort the beers by price -- from low to high
    const sortedBeers = filteredBeers.sort((a, b) => {
      const priceA = parseFloat(a.price.replace('$', ''));
      const priceB = parseFloat(b.price.replace('$', ''));
      return priceA - priceB;
    });
    setData(sortedBeers);
    setData(filteredBeers);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App p-4">
      <h1 className='text-2xl font-bold text-center mb-6'>Beers with Rating Above 4.5</h1>
      <div className='flex mt-[30px]  flex-wrap gap-6 justify-center'>
        {data.map(beer => (
          <div
            className='beerCard bg-white shadow-md rounded-lg overflow-hidden w-80 transform transition duration-300 hover:scale-105 hover:shadow-xl'
            key={beer.id}
          >
            <img className='w-full h-48 object-cover' src={beer.image} alt={beer.name} />
            <div className='p-4'>
              <h2 className='text-xl font-semibold mb-2'>Name: {beer.name}</h2>
              <p className='text-gray-700 mb-1'>Price: {beer.price}</p>
              <p className='text-gray-700'>Rating: {beer.rating.average} ({beer.rating.reviews} reviews)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
