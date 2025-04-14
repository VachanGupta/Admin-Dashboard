import React, { useState } from 'react';
import DataTable from '../components/table/DataTable';
import { FiPlus } from 'react-icons/fi';
import UserModal from '../components/users/UserModal';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
  ]);
  const [currentUser, setCurrentUser] = useState(null);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];

  const handleAddUser = (user) => {
    const newUser = {
      id: users.length + 1,
      ...user
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(users.filter(u => u.id !== user.id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Users</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary flex items-center"
        >
          <FiPlus className="mr-2" />
          Add User
        </button>
      </div>

      <DataTable
        data={users}
        columns={columns}
        title="User Management"
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={currentUser ? handleUpdateUser : handleAddUser}
        user={currentUser}
      />
    </div>
  );
};

export default Users;