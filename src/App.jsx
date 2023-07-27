import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './App.css'
import arrow from "./images/icon-arrow.svg"
import background from "./images/pattern-bg-desktop.png"
import icon from "./MapIcon"
import { useState, useEffect } from 'react'
function App() {

  return (
    <>
      <div className='h-screen'>
        <aside className='w-full h-1/3 lg:h-2/6'
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}>
          <p className='text-2xl 2xl:text-2xl font-bold text-white pt-8 text-center'>IP Address Tracker</p>
          <form action="" className='justify-center w-10/12 lg:max-w-xl mx-auto mt-6'>
            <div className='flex mt-4 '>
              <input type="text" className='p-4 lg:p-3 rounded-l-xl w-full' name="ipaddress" id="ipaddress" placeholder='Search for any IP Address or domain' />
              <button type="submit" className='bg-black p-3 rounded-r-xl hover:opacity-60'> <img src={arrow} alt="" /> </button>
            </div>
          </form>

        </aside>

        <main className='relative z-50 rounded-xl flex bg-white p-8 -mt-24 -mb-56 lg:-mb-24 lg:-mt-16 xl:-mt-12 shadow-lg w-10/12 lg:w-2/3 mx-auto' style={{zIndex:1000}}>
          <div className='flex flex-col lg:flex-row w-full place-content-between items-center lg:items-start gap-3 text-center lg:text-justify'>
            <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
              <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>IP ADDRESS</p>
              <p className="text-lg text-black font-bold">192.212.174.101</p>
            </div>
            <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
              <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>LOCATION</p>
              <p className="text-lg text-black font-bold">Brooklyn, NY 10001</p>
            </div>
            <div className='flex flex-col lg:border-r-2 lg:pr-16  lg: border-dark-gray'>
              <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>TIMEZONE</p>
              <p className="text-lg text-black font-bold">UTC -05:00</p>
            </div>
            <div className='flex flex-col '>
              <p className='text-dark-gray text-xs tracking-widest font-bold mb-2'>ISP</p>
              <p className="text-lg text-black font-bold">SpaceX Starlink</p>
            </div>
          </div>
        </main>
        <MapContainer center={[51.505, -0.09]}zoom={13} scrollWheelZoom={false} style={{height:"70vh", width:"100vw"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <footer></footer>
      </div>
    </>
  )
}

export default App
