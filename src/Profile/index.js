import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_CURRENT_USER = gql`
  query { 
  viewer { 
    login
    name
  }
}
`;

const Profile = () => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      const { viewer } = data;
      if(loading || !viewer) {
          return <div>Loading...</div>;
      }
      return (
        <div>
            {viewer.login} {viewer.name}
        </div>
      );
    }}
  </Query>
);

export default Profile;