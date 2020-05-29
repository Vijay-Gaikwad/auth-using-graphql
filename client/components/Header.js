import React, { Component } from 'react';
import { Link } from 'react-router';

import { graphql } from 'react-apollo';
import mutation from '../mutation/Logout'
import query from '../queries/CurrentUser';

class Header extends Component {

    logout() {
        this.props.mutate({
            refetchQueries: [{
                query
            }]
        });
    }

    renderButtons() {
        const { loading, user } = this.props.data
        if (loading) { return <div>Loading...</div> }
        if (user) {
            return (
                <div>
                    <li><a onClick={this.logout.bind(this)}>Logout</a></li>
                </div>
            )
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup">SignUp</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            )
        }
    }

    render() {
        return (
            <nav >
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">Home</Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default graphql(mutation)(
    graphql(query)(Header)
);