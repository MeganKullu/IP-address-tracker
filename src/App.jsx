import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './App.css';
import arrow from "./images/icon-arrow.svg";
import background from "./images/pattern-bg-desktop.png";
import { useState } from 'react';
import MarkerPos from './MarkerPos';

function App() {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const apiKey = import.meta.env.VITE_MY_API_KEY;
  const checkIp = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
  const checkDomain = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/i;

  async function handleSubmit(e) {
    e.preventDefault();

    if (checkIp.test(ipAddress) || checkDomain.test(ipAddress)) {
      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&${checkIp.test(ipAddress) ? `ipAddress=${ipAddress}` : `domain=${ipAddress}`}`
        );
        const data = await response.json();
        setAddress(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Handle invalid IP address or domain
      alert("Invalid IP address or domain.");
    }
  }

  return (
    <>
      <div className='h-screen'>
        <aside
          className='w-full h-1/3 lg:h-2/6'
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <p className='text-2xl 2xl:text-2xl font-bold text-white pt-8 text-center'>IP Address Tracker</p>
          <form autoComplete="off" onSubmit={handleSubmit} className='justify-center w-10/12 lg:max-w-xl mx-auto mt-6'>
            <div className='flex mt-4 '>
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

        {address &&
          <main
            className='relative z-50 rounded-xl flex bg-white p-8 -mt-24 -mb-56 lg:-mb-24 lg:-mt-16 xl:-mt-12 shadow-lg w-10/12 lg:w-2/3 mx-auto'
            style={{ zIndex: 1000 }}
          >
            <div className='flex flex-col lg:flex-row w-full place-content-between items-center lg:items-start gap-3 text-center lg:text-justify'>
              <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
                <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>IP ADDRESS</p>
                <p className="text-lg text-black font-bold">{address.ip}</p>
              </div>
              <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
                <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>LOCATION</p>
                <p className="text-lg text-black font-bold">{address.location.region}, {address.location.country}</p>
              </div>
              <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
                <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>TIMEZONE</p>
                <p className="text-lg text-black font-bold">UTC {address.location.timezone}</p>
              </div>
              <div className='flex flex-col '>
                <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>{address.isp}</p>
                <p className="text-lg text-black font-bold">SpaceX Starlink</p>
              </div>
            </div>
          </main>
        }

        {address && address.location.lat && address.location.lng &&
          <MapContainer
            center={[address.location.lat, address.location.lng]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "70vh", width: "100vw" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerPos/>
          </MapContainer>
        }
      </div>
    </>
  )
}

export default App;
