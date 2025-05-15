import React from 'react';
import './ProfileCard.css';


function ProfileCard({ profile, onSummary, onDetails, onDelete }) {
  return (
    <div className="profile-card">
      <img src={profile.photo} alt={profile.name} className="profile-photo" />
      <h3>{profile.name}</h3>
      <p>{profile.description}</p>
      <div className="profile-actions">
        <button onClick={() => onSummary(profile)}>Summary</button>
        <button onClick={() => onDetails(profile)}>Details</button>
        <button onClick={() => onDelete(profile.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ProfileCard;
