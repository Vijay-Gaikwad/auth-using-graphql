import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutation/Login';
import query from '../queries/CurrentUser';

class Login extends Component {
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
                <h3>Login</h3>
                <AuthForm onSubmit={this.onSubmit.bind(this)} errors={this.state.errors}></AuthForm>
            </div>
        )
    }
}

export default graphql(query)(
    graphql(mutation)(Login)
);
