import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Profile from "./Profile";
import firebase from "./../../firebase";
import {getUsers, setUser} from "../../redux/state";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoaded: false
        }
    }

    componentDidMount() {
        firebase.firestore().collection('users')
            .get()
            .then(data => {
                this.users = data.docs.map(doc => ({
                    ...doc.data(),
                    uid: doc.id,
                }))
                this.currentUserPlace = 0
                this.users.forEach((item, i) => {
                    if (item.uid === this.props.user.uid) {
                        this.currentUserPlace = i
                        this.currentUser = item
                    }
                })
                this.users.splice(this.currentUserPlace, 1)// удаляю из списка текущего пользователя
                this.users = this.users.map((item, id) => ({
                    ...item,
                    id
                }))
                this.friends = []
                this.followers = []
                firebase.firestore().collection('users')
                    .doc(this.props.match.params.userUid !== undefined && this.props.match.params.userUid !== 'myPosts'
                        ? this.props.match.params.userUid : this.props.user.uid)
                    .get()
                    .then(data => {
                        this.currentUserProfile = data.data()
                        this.followsOfCurrentUser = data.data().follows// получаю текущие подписки пользователя
                        this.followersOfCurrentUser = data.data().followers// получаю текущих подписчиков пользователя
                        this.users.forEach(item => {
                            if (this.followsOfCurrentUser.indexOf(item.uid) !== -1) this.friends = [...this.friends, item]
                        })
                        this.users.forEach(item => {
                            if (this.followersOfCurrentUser.indexOf(item.uid) !== -1) this.followers = [...this.followers, item]
                        })
                        this.props.getUsers(this.props.user.uid, this.users, this.friends)
                        this.setState({isUserLoaded: true})
                    })

            })
    }

    render = () => {
        return this.state.isUserLoaded ?
            <Profile {...this.props} currentUser={this.props.user} user={this.currentUserProfile} followsOfCurrentUser={this.friends}
                     followersOfCurrentUser={this.followers} setUser={setUser}/> : <p>Loading...</p>
    }
}

let mapStateToProps = state => ({
    profilePage: state.profilePage
})


export default connect(mapStateToProps, {getUsers})(withRouter(ProfileContainer));