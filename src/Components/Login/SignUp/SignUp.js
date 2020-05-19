import React from 'react'
import css from "../Login.module.css";
import firebase from "../../../firebase";
import {NavLink} from "react-router-dom";
import ChoosePhotosField from "../ChoosePhotosField/ChoosePhotosField";

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            photoURL: '',
            backgroundPhotoUrl: '',
            currentSlide: 1,
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

    setPhotos = (photoUrl, name) => {
        this.setState({[name]: photoUrl})
    }

    render = () => {
        return (
            <div className={css.login__container}>
                <h1>Sign Up</h1>
                <div className={css.login__inputs}>
                    {this.state.currentSlide === 1 ? <>
                        <div className={css.form}>
                            <input type="text" name="name" required  onChange={this.handleChange}/>
                            <label htmlFor='name' className={css.form__label}>
                                <span className={css.label__content}>Enter a full name...</span>
                            </label>
                        </div>
                        <ChoosePhotosField backgroundPhotoUrl={this.state.backgroundPhotoUrl} photoURL={this.state.photoURL} setPhotos={this.setPhotos}/>
                        {/* <div className={css.form}>
                            <input type="text" name="photoURL" required  onChange={this.handleChange}/>
                            <label htmlFor='photoURL' className={css.form__label}>
                                <span className={css.label__content}>PhotoURL...</span>
                            </label>
                        </div>
                        <div className={css.form}>
                            <input type="text" name="backgroundPhotoUrl" required  onChange={this.handleChange}/>
                            <label htmlFor='backgroundPhotoUrl' className={css.form__label}>
                                <span className={css.label__content}>Background PhotoURL...</span>
                            </label>
                        </div> */}
                    </> : ''}
                    {this.state.currentSlide === 2 ? <>
                        <div className={css.form}>
                            <input type="text" name="email" required  onChange={this.handleChange}/>
                            <label htmlFor='email' className={css.form__label}>
                                <span className={css.label__content}>Email...</span>
                            </label>
                        </div>
                        <div className={css.form}>
                            <input type="password" name="password" required  onChange={this.handleChange}/>
                            <label htmlFor='password' className={css.form__label}>
                                <span className={css.label__content}>Password...</span>
                            </label>
                        </div>
                    </> : ''}

                    <div>
                        <NavLink to='/'>
                            <span className={css.login__link}>Comeback to login</span>
                        </NavLink>
                    </div>
                </div>
                {this.state.currentSlide === 2 ?  <div className={css.login__buton}>
                    <NavLink to={'/news'}><button onClick={() => {
                        this.props.signUp(this.state.email, this.state.password, this.state.name, this.state.photoURL, this.state.backgroundPhotoUrl, this.usersCount)
                    }}>Sign Up
                    </button></NavLink>
                </div> : ''}
                {this.state.currentSlide < 2 ? <div className={css.login__nextStepWrapper}>
                    <button onClick={() => {this.setState({currentSlide: this.state.currentSlide + 1})}} className={css.login__nextStep}><i className="fas fa-forward" /></button>
                </div> : ''}
            </div>
        )
    }
}

export default SignUp