import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';

const GET_CURRENT_USER = gql`
 query ($query: String!, $type: String, $first: int!, $after: String) {
     	search(query: "is:public archived:false created:>2019-04-15", type:REPOSITORY, first:4 ) {
    			edges{
            node {
              ...on Repository{
                name
                owner {
                  avatarUrl
                  login
                }
                description
                issues{
                  totalCount
                }
                stargazers{
                  totalCount
                }
                createdAt
              }
            }
          }
    			pageInfo{
            endCursor
            hasNextPage
          }
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