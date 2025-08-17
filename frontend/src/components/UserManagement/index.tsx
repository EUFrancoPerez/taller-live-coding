import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  clearError,
} from '@/store/slices/userSlice';
import type { User } from '@/store/slices/userSlice';
import './index.css';

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && editingUser) {
      await dispatch(updateUser({ id: editingUser.id, userData: formData }));
      setIsEditing(false);
      setEditingUser(null);
    } else {
      await dispatch(createUser(formData));
    }

    setFormData({ name: '', email: '' });
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingUser(null);
    setFormData({ name: '', email: '' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteUser(id));
    }
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {error && (
        <div className="error-message">
          <span>{error}</span>
          <button onClick={handleClearError} className="close-error">
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="user-form">
        <h3>{isEditing ? 'Edit User' : 'Add New User'}</h3>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter user name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter user email"
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEditing ? 'Update User' : 'Add User'}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="users-list">
        <h3>Users List</h3>

        {loading && users.length === 0 ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="no-users">No users found</div>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  {user.createdAt && (
                    <small>
                      Created: {new Date(user.createdAt).toLocaleDateString()}
                    </small>
                  )}
                </div>

                <div className="user-actions">
                  <button
                    onClick={() => handleEdit(user)}
                    className="edit-btn"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="delete-btn"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
