import React, { useState, useEffect } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import ProfileCard from './components/ProfileCard';
import CustomMap from './components/CustomMap';
import AdminPanel from './components/AdminPanel';
import ProfileDetails from './components/ProfileDetails';
import './App.css';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyCZTSITgWLrMrZn2pgV8vzgihGEHYT6H0M';

const defaultProfiles = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    description: "Software Developer from Delhi",
    lat: 28.6139,
    lng: 77.2090,
    contact: "john@example.com",
    interests: "Coding, Cricket"
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    description: "Designer from Mumbai",
    lat: 19.0760,
    lng: 72.8777,
    contact: "jane@example.com",
    interests: "Design, Art"
  }
];

function getInitialProfiles() {
  const saved = localStorage.getItem('profiles');
  return saved ? JSON.parse(saved) : defaultProfiles;
}

function App() {
  const [profiles, setProfiles] = useState(getInitialProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');


  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  const handleShowMap = (profile) => {
    setSelectedProfile(profile);
    setShowMap(true);
  };

  const handleShowDetails = (profile) => {
    setSelectedProfile(profile);
    setShowDetails(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setSelectedProfile(null);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedProfile(null);
  };

  const handleAddProfile = (newProfile) => {
    const profileWithId = { ...newProfile, id: Date.now() };
    setProfiles(prev => [...prev, profileWithId]);
  };

  const handleEditProfile = (updatedProfile) => {
    setProfiles(prev => prev.map(p => p.id === updatedProfile.id ? updatedProfile : p));
  };

  const handleDeleteProfile = (id) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
  };

  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} onLoad={() => console.log('Google Maps API loaded.')}>
      <div className="app-container">
        <h1>Profile Viewer</h1>

        <input
          type="text"
          className="search-bar"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <AdminPanel
          onAdd={handleAddProfile}
          onEdit={handleEditProfile}
          onDelete={handleDeleteProfile}
          profiles={profiles}
        />

        <div className="profile-list">
          {filteredProfiles.length === 0 ? (
            <p>No profiles found.</p>
          ) : (
            filteredProfiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onSummary={handleShowMap}
                onDetails={handleShowDetails}
                onDelete={handleDeleteProfile}
              />
            ))
          )}
        </div>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {showMap && selectedProfile && (
          <div className="modal">
            <div className="modal-content">
              <h2>Location of {selectedProfile.name}</h2>
              <CustomMap lat={selectedProfile.lat} lng={selectedProfile.lng} />
              <button onClick={handleCloseMap}>Close Map</button>
            </div>
          </div>
        )}

        {showDetails && selectedProfile && (
          <div className="modal">
            <div className="modal-content">
              <ProfileDetails profile={selectedProfile} />
              <button onClick={handleCloseDetails}>Close</button>
            </div>
          </div>
        )}
      </div>
    </APIProvider>
  );
}

export default App;
