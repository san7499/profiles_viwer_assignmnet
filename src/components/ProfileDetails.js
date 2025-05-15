import React from 'react';
import './ProfileDetails.css'; 

function ProfileDetails({ profile }) {
  return (
    <div className="profile-details">
      <img src={profile.photo} alt={profile.name} className="profile-photo-large" />
      <h2>{profile.name}</h2>
      <p>{profile.description}</p>
      <p><strong>Contact:</strong> {profile.contact}</p>
      <p><strong>Interests:</strong> {profile.interests}</p>
    </div>
  );
}

export default ProfileDetails;
