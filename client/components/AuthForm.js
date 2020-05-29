import React, { Component } from 'react';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' }
    }

    handleChange(e) {
        // If you are using babel, you can use ES 6 dictionary syntax
        // let change = { [e.target.name] = e.target.value }
        let change = {}
        change[e.target.name] = e.target.value
        this.setState(change)
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state
        this.props.onSubmit({ email, password });
    }

    render() {
        return (
            <div className="row">
                <form className="col s4" onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-field">
                        <input placeholder="Email" name="email" value={this.state.email}
                            onChange={this.handleChange.bind(this)} />
                    </div>
                    <div className="input-field">
                        <input placeholder="Password" type="password" name="password" value={this.state.password}
                            onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="errors">
                        {this.props.errors.map(error => <div key={error}>{error}</div>)}
                    </div>

                    <button className="btn" onClick={this.onSubmit.bind(this)}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AuthForm;