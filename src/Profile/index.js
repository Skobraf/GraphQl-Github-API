import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import ErrorMessage from '../Error';

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
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    window.onscroll = () => {
      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.loadUsers();
      }
    };
  }
  render () {
    return (
      <Query query={GET_CURRENT_USER}>
      {({ data, loading, error }) => {
        const { search } = data;
          if (error) {
              return <ErrorMessage error={error} />
          }
        
        if(loading || !data) {
            return <Loading />;
        }
        return (
          <div>
              {console.log(search)}
          </div>
        );
      }}
    </Query>
    )
  }
}

export default Profile;