import React, { Component } from 'react';
import { hashHistory } from 'react-router';

import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutation/Signup'
import query from '../queries/CurrentUser';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        };
    }

    componentDidUpdate(prevProps) {
        //this.props current set of props
        //prevProps is the previous set of props that will be in place
        if (!prevProps.data.user && this.props.data.user) {
            //redirect to dashboard!!!!
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {

        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors })
        });
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors}></AuthForm>
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(Signup)
);

