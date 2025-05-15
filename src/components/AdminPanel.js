import React, { useState } from 'react';
import './AdminPanel.css'; 

const emptyProfile = {
  name: '',
  photo: '',
  description: '',
  lat: '',
  lng: '',
  contact: '',
  interests: ''
};

function AdminPanel({ onAdd, onEdit, onDelete, profiles }) {
  const [form, setForm] = useState(emptyProfile);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.photo || !form.description || !form.lat || !form.lng) {
      alert('Please fill all required fields.');
      return;
    }
    const profileData = {
      ...form,
      lat: parseFloat(form.lat),
      lng: parseFloat(form.lng),
      id: editId ? editId : Date.now()
    };
    if (editId) {
      onEdit(profileData);
    } else {
      onAdd(profileData);
    }
    setForm(emptyProfile);
    setEditId(null);
  };

  const handleEdit = (profile) => {
    setForm(profile);
    setEditId(profile.id);
  };

  const handleCancel = () => {
    setForm(emptyProfile);
    setEditId(null);
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-title">{editId ? 'Edit Profile' : 'Add Profile'}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input className="input-field" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="input-field" placeholder="Photo URL" value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} />
        <input className="input-field" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input className="input-field" placeholder="Latitude" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} />
        <input className="input-field" placeholder="Longitude" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} />
        <input className="input-field" placeholder="Contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
        <input className="input-field" placeholder="Interests" value={form.interests} onChange={e => setForm({ ...form, interests: e.target.value })} />
        <div className="button-group">
          <button className="btn primary-btn" type="submit">{editId ? 'Update' : 'Add'}</button>
          {editId && <button className="btn secondary-btn" type="button" onClick={handleCancel}>Cancel</button>}
        </div>
      </form>
      <div className="admin-list">
        {profiles.map(profile => (
          <div key={profile.id} className="admin-list-item">
            <span className="profile-name">{profile.name}</span>
            <div className="list-item-buttons">
              <button className="btn edit-btn" onClick={() => handleEdit(profile)}>Edit</button>
              <button className="btn delete-btn" onClick={() => onDelete(profile.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
