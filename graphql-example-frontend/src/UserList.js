// src/UserList.js
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const GET_USERS = gql`
  query {
    users {
      id
      firstName
      lastName
      email
      phone
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const UserList = ({ onEdit }) => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [GET_USERS],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>
          {user.firstName} {user.lastName} - {user.email}
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => deleteUser({ variables: { id: user.id } })}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
