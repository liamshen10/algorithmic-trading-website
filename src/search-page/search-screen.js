  import React, { useState, useEffect, useCallback, useRef } from 'react';
  import { useParams, useNavigate } from 'react-router-dom';
  import axios from 'axios';
  import './search-screen.css';
  import 'mapbox-gl/dist/mapbox-gl.css'; 
  import mapboxgl from 'mapbox-gl';

  const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const { criteria } = useParams();
    const navigate = useNavigate();

    const mapRef = useRef();
    const popupRef = useRef();

    const fetchResults = useCallback(async (searchTerm) => {
      if (!searchTerm || !showResults) return;
      try {
        const bbox = '-71.1912,42.2279,-70.7488,42.3981';
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}&proximity=-71.057083,42.361145&bbox=${bbox}`);
        setResults(response.data.features);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    }, [showResults]);

    useEffect(() => {
      if (criteria) {
        setSearchTerm(criteria);
        fetchResults(criteria);
      }
    }, [criteria, fetchResults]);

    useEffect(() => {
      fetchResults(searchTerm);
    }, [searchTerm, fetchResults]);

    const handleSearch = () => {
      navigate(`/search/${searchTerm}`);
    };

    useEffect(() => {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-71.0936, 42.3398], // Northeastern University
        zoom: 11.15,
        maxBounds: [
          [-71.1912, 42.2279], // southwest corner of Boston
          [-70.7488, 42.3981]  // northeast corner of Boston
        ]
      });

      map.on('dblclick', async (e) => {
        setShowResults(false);
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?access_token=${process.env.REACT_APP_MAPBOX_API_KEY}`);
        const placeName = response.data.features[0]?.place_name;
        showPopup(e.lngLat, placeName);
        navigate(`/search/${placeName}`);
        // Reset the results to prevent list items from showing
        setResults([]);
      });

      mapRef.current = map;
    }, []);

    const showPopup = (coords, placeName) => {
      if (popupRef.current) {
        popupRef.current.remove();
      }

      const imageURL = `https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${encodeURIComponent(placeName)}&fov=80&heading=70&pitch=0&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

      popupRef.current = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(coords)
        .setHTML(`<div style="text-align:center;"><img src="${imageURL}" alt="Street View" style="width:100px;height:100px;"/><p>${placeName}</p></div><a href="/details/${encodeURIComponent(placeName)}">Details</a>`)
        .addTo(mapRef.current);
    };

    const handleResultClick = (result) => {
      if (!mapRef.current) return;
    
      const placeName = result.place_name;
      setSearchTerm(placeName);
      mapRef.current.flyTo({ center: result.geometry.coordinates, zoom: 15 });
      setResults([]); // Clear the results to hide the list
      showPopup(result.geometry.coordinates, placeName); // Show the popup
      navigate(`/search/${placeName}`);
      setShowResults(false); // Set showResults to false after clicking a list item
    };
    

    const handleFocus = () => {
      setShowResults(true);
      document.getElementById('map').style.filter = 'blur(4px)';
    };
    
    const handleBlur = (e) => {
      if (e.relatedTarget && e.relatedTarget.tagName === 'LI') return;
    
      setTimeout(() => {
        document.getElementById('map').style.filter = 'none';
        setResults([]); // Hide the list items
      }, 100);
    };
    
    return (
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value && showResults) {
                fetchResults(e.target.value);
              }
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {results.length > 0 && (
          <ul>
            {results.map((result) => (
              <li key={result.id} onClick={() => handleResultClick(result)}>
                {result.place_name}
              </li>
            ))}
          </ul>
        )}
        <div id="map"></div>
      </div>
    );
  };

  export default SearchPage;
