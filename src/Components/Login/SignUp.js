import React from 'react'
import css from "./Login.module.css";
import firebase from "./../../firebase";

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            photoURL: '',
            backgroundPhotoUrl: '',
            users: []
        }
    }

    componentDidMount() {
        firebase.firestore().collection('users').get().then(response => {
            this.usersCount = response.docs.length
        })
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render = () => {
        return (
            <div className={css.login__container}>
                <h1>Sign Up</h1>
                <div className={css.login__inputs}>
                    <input type="email" name="name" onChange={this.handleChange} placeholder='Name...'/>
                    <input type="email" name="photoURL" onChange={this.handleChange} placeholder='PhotoURL...'/>
                    <input type="email" name="backgroundPhotoUrl" onChange={this.handleChange} placeholder='Background PhotoURL...'/>
                    <input type="email" name="email" onChange={this.handleChange} placeholder='Email...'/>
                    <input type="password" name="password" onChange={this.handleChange} placeholder='Password...'/>
                </div>
                <div className={css.login__buton}>
                    <button onClick={() => {
                        this.props.signUp(this.state.email, this.state.password, this.state.name, this.state.photoURL, this.state.backgroundPhotoUrl, this.usersCount)
                    }}>Sign Up
                    </button>
                </div>
            </div>
        )
    }
}

export default SignUp