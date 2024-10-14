import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $age: Int!, $email: String!, $phone: String!) {
    createUser(firstName: $firstName, lastName: $lastName, age: $age, email: $email, phone: $phone) {
      id
      firstName
      lastName
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $firstName: String!, $lastName: String!, $age: Int) {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, age: $age) {
      id
      firstName
      lastName
    }
  }
`;

const UserForm = ({ selectedUser, onCancel }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState(''); // Add state for age
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setEmail(selectedUser.email);
      setPhone(selectedUser.phone);
      setAge(selectedUser.age || ''); // Set age if editing
    }
  }, [selectedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser) {
      await updateUser({ variables: { id: selectedUser.id, firstName, lastName, age: parseInt(age) || null } });
    } else {
      await createUser({ variables: { firstName, lastName, age: parseInt(age), email, phone } });
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={firstName} 
        onChange={(e) => setFirstName(e.target.value)} 
        placeholder="First Name" 
        required 
      />
      <input 
        type="text" 
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)} 
        placeholder="Last Name" 
        required 
      />
      <input 
        type="number" 
        value={age} 
        onChange={(e) => setAge(e.target.value)} 
        placeholder="Age" 
        required 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="text" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        placeholder="Phone" 
        required 
      />
      <button type="submit">{selectedUser ? 'Update' : 'Add'} User</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UserForm;
