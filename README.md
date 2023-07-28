# Frontend Mentor - IP address tracker solution

This is a solution to the [IP address tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0). Frontend Mentor challenges help one improve their coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for each page depending on their device's screen size
- See hover states for all interactive elements on the page
- See their own IP address on the map on the initial page load
- Search for any IP addresses or domains and see the key information and location

### Screenshot

![screenshot](./src/images/IP-Tracker%20solution.png)

### Links

- Live Site URL: [My live site](https://your-solution-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- React Leaflet Library
- Axios Library
- Vite development server

### What I learned

I re-inforced my learning of useState, useEffect and useRef hooks, I also learnt how to avoid explosing my API Key to my respository when using vite development server. I also learnt how to customize the marker component to use my custom pin. 


```jsx

  useEffect(() => {
    if (address && address.location && address.location.lat !== 0 && address.location.lng !== 0) {
      const newPosition = [address.location.lat, address.location.lng];
      markerRef.current.setLatLng(newPosition);

      if (initialLoad) {
        // Only fly to California on the initial load
        map.flyTo([34.04915, -118.09462], 13, {
          animate: true,
        });
        setInitialLoad(false);
      } else {
        // Fly to the new coordinates when address data is fetched
        map.flyTo(newPosition, 13, {
          animate: true,
        });
      }
    }
  }, [map, address, initialLoad]);

```

### Continued development

I would like to continue practising with React Hooks.

### Useful resources

- [freecodecamp.org](https://www.freecodecamp.org/news/react-hooks-fundamentals/) - This helped me understand react hooks better.
- [freecodecamp.org](https://www.freecodecamp.org/news/how-to-use-axios-with-react/) - This is an amazing article which helped me set up axios with react.

## Author

- LinkedIn - [Megan Kullu](https://https://www.linkedin.com/in/megankullu/)
- Frontend Mentor - [@MeganKullu](https://www.frontendmentor.io/profile/MeganKullu)
- Twitter - [@megankullu](https://www.twitter.com/megankullu)


