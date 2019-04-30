import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';

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
    {({ data, loading, error }) => {
        if (error) {
            return <ErrorMessage error={error} />
        }
      const { viewer } = data;
      if(loading || !viewer) {
          return <Loading />;
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