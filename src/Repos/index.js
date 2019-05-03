import React from 'react';
import { style }from './style.css';

class Repos extends React.Component {
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
            this.props.loadUsers();
            console.log('scrolling');
            }
          };
    }
    render() {
        const repos = this.props.users.edges || [];
        return (
            <div>
                {repos.map(({ node }, index) => (
                    <section key={index}>
                        <div>
                            <img src={node.owner.avatarUrl} alt={node.name}/>
                        </div>
                        <ul>
                            <li><h2>{node.name}</h2></li>
                            <li><p>{node.description}</p></li>
                            <li>
                                <div style={{ display: "inline-block"}}>
                                    <span>Stars: {node.stargazers.totalCount}</span>
                                </div>
                                <div style={{ display: "inline-block"}}>
                                    <span>Issues: {node.issues.totalCount}</span>
                                </div>
                                <div style={{ display: "inline-block"}}>
                                    <p>
                                        Submited {node.createdAt} by: {node.owner.login}
                                    </p>
                                </div>
                            </li>
                        </ul>
                        {console.log(node)}
                    </section>
                ))}
            </div>
        )
    }
}
export default Repos;