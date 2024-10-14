// src/App.js
import React, { useState } from 'react';
import ApolloAppProvider from './ApolloProvider';
import UserList from './UserList';
import UserForm from './UserForm';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <ApolloAppProvider>
      <h1>User Management</h1>
      <UserList onEdit={setSelectedUser} />
      {selectedUser ? (
        <UserForm selectedUser={selectedUser} onCancel={() => setSelectedUser(null)} />
      ) : (
        <UserForm onCancel={() => setSelectedUser(null)} />
      )}
    </ApolloAppProvider>
  );
};

export default App;
