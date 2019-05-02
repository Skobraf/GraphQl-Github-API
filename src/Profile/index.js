import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';
import Repos from '../Repos';
import moment from "moment";

const GET_CURRENT_USER = gql`
 query ($query:String!, $cursor: String) {
     	search(query: $query, type:REPOSITORY, first:4, after: $cursor ) {
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
class Profile extends React.Component {

  render () {
    const date = new moment(new Date()).substract(1, 'months');
    const dateFormat = date.format("YYYY-MM-DD");
    const query = `is:public archived:false sort:stars-desc created:>${dateFormat}`;
    return (
      <Query
      query={GET_CURRENT_USER}
      notifyOnNetworkStatusChange={true}
      variables={{
        query
      }}
      >
      {({ data, loading, error, fetchMore }) => {
        const { search } = this.data;
          if (error) {
              return <ErrorMessage error={error} />
          }
        
        if(loading || !data) {
            return <Loading />;
        }
        return (
          <Repos
          loading={loading}
          entries={search}
          onLoadMore={() =>
            fetchMore({
              variables: {
                query,
                cursor: search.pageInfo.endCursor
              },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.search.edges;
                const pageInfo = fetchMoreResult.search.pageInfo;
                return newEdges.length
                  ? {
                      search: {
                        __typename: prevResult.search.__typename,
                        edges: [...prevResult.search.edges, ...newEdges],
                        pageInfo
                      }
                    }
                  : prevResult;
              }
            })
          }
        />
        );
      }}
    </Query>
    )
  }
}

export default Profile;