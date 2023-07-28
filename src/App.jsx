import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './App.css';
import arrow from "./images/icon-arrow.svg";
import background from "./images/pattern-bg-desktop.png";
import { useState, useEffect } from 'react';
import MarkerPos from './MarkerPos';
import axios from 'axios';

function App() {
  const initialAddressState = {
    ip: "",
    location: { region: "", country: "", timezone: "", lat: 0, lng: 0 },
    isp: ""
  };

  const [address, setAddress] = useState(initialAddressState);
  const [ipAddress, setIpAddress] = useState("");
  const [shouldFly, setShouldFly] = useState(false);
  const apiKey = import.meta.env.VITE_MY_API_KEY;
  const checkIp = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  const checkDomain = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/i;

  // Function to reset the address state to the initial template
  const resetAddress = () => {
    setAddress(initialAddressState);
    setShouldFly(false);
  };

  // useEffect to call the reset function on component load and fetch initial data
  useEffect(() => {
    // Fetch user's IP address on initial load
    axios.get('https://api64.ipify.org?format=json')
      .then(response => {
        setIpAddress(response.data.ip);
        return response.data.ip;
      })
      .then(ip => {
        // Fetch the initial address data based on the user's IP address
        return axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`);
      })
      .then(response => {
        const data = response.data;
        setAddress({
          ip: data.ip,
          location: {
            region: data.location.region,
            country: data.location.country,
            timezone: data.location.timezone,
            lat: data.location.lat,
            lng: data.location.lng,
          },
          isp: data.isp,
        });
        setShouldFly(true);
      })
      .catch(error => {
        console.error('Failed to fetch data:', error);
        resetAddress();
      });
  }, []);  
  //async function to handle submit and api call
  async function handleSubmit(e) {
    e.preventDefault();

    if (checkIp.test(ipAddress) || checkDomain.test(ipAddress)) {
      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&${checkIp.test(ipAddress) ? `ipAddress=${ipAddress}` : `domain=${ipAddress}`}`
        );
        const data = await response.json();
        setAddress(data);
        setShouldFly(true);
        console.log(address);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Handle invalid IP address or domain
      alert("Invalid IP address or domain.");
      resetAddress(); // Call the reset function to reset the address state to initial values
    }
  }

  return (
    <>
      <div className='h-screen w-full flex flex-col'>
        <aside
          className='w-full xs-screen:h-80 small-screen:h-1/2 normal-screen:h-1/2 large-mobile:h-2/5 md:lg-1/4 lg:h-56 xl:h-64'
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            backgroundSize: "100% 100%",
          }}
        >
          <p className='text-2xl 2xl:text-2xl font-bold text-white pt-8 xl:pt-8 text-center'>IP Address Tracker</p>
          <form autoComplete="off" onSubmit={handleSubmit} className='justify-center w-10/12 lg:max-w-xl mx-auto mt-6 xl:mt-4'>
            <div className='flex  lg:mt-4  xl:mt-8 mb-4 '>
              <input
                type="text"
                className='p-4 lg:p-3 rounded-l-xl w-full'
                name="ipaddress"
                id="ipaddress"
                placeholder='Search for any IP Address or domain'
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
              />
              <button type="submit" className='bg-black p-3 rounded-r-xl hover:opacity-60'> <img src={arrow} alt="" /> </button>
            </div>
          </form>
        </aside>

        {Object.keys(address).length > 0 && (
          <main
            className='relative z-50 rounded-xl flex bg-white p-8 -mt-28 md:-mt-40 lg:-mt-20 -mb-56 lg:-mb-16 shadow-lg w-10/12 lg:w-2/3 mx-auto'
            style={{ zIndex: 1000 }}
          >
            <div className='flex flex-col lg:flex-row w-full place-content-between items-center lg:items-start gap-3 text-center lg:text-justify'>
              <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
                <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>IP ADDRESS</p>
                <p className="text-lg text-black font-bold">{address.ip}</p>
              </div>
              <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
                <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>LOCATION</p>
                <p className="text-lg text-black font-bold">{address.location.region} , {address.location.country}</p>
              </div>
              <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
                <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>TIMEZONE</p>
                <p className="text-lg text-black font-bold">UTC {address.location.timezone}</p>
              </div>
              <div className='flex flex-col'>
                <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>ISP</p>
                <p className="text-lg text-black font-bold">{address.isp}</p>
              </div>
            </div>
          </main>
        )}
        
       
        {address.location.lat !== 0 && address.location.lng !== 0 && (
          <MapContainer
            center={ [address.location.lat, address.location.lng]}
            zoom={shouldFly ? 13 : 5}
            scrollWheelZoom={false}
            style={{ height: "70vh", width: "100vw" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">            
              </TileLayer>
            <MarkerPos address={address} />
            
          </MapContainer>
        )}

        
      </div>
    </>
  );
}

export default App;
