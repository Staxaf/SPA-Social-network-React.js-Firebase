import React from 'react'
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {usersAPI} from "../../redux/api";
import Loader from "react-loader-spinner";
import {getUsers} from "../../redux/profile-reducer";
import {setUser} from "../../redux/auth-reducer";
import {addFollow} from "../../redux/users-reducer";

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoaded: false
        }
    }

    componentDidMount() {
        usersAPI.getUsers()
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
                usersAPI.getUser(this.props.match.params.userUid !== undefined && ['myPosts', 'friends', 'followers'].indexOf(this.props.match.params.userUid) === -1
                    ? this.props.match.params.userUid : this.props.user.uid)
                    .then(data => {
                        this.currentUserProfile = data.data()
                        this.props.setUser(this.currentUserProfile.name, this.currentUserProfile.photoURL, this.currentUserProfile.uid)
                        this.followsOfCurrentUser  = []
                        this.followersOfCurrentUser = []
                        if(data.data().follows !== undefined) this.followsOfCurrentUser = data.data().follows// получаю текущие подписки пользователя
                        if(data.data().followers !== undefined) this.followersOfCurrentUser = data.data().followers// получаю текущих подписчиков пользователя
                        this.users.forEach(item => {
                            if (this.followsOfCurrentUser.indexOf(item.uid) !== -1) this.friends = [...this.friends, item]
                        })
                        this.users.forEach(item => {
                            if (this.followersOfCurrentUser.indexOf(item.uid) !== -1) this.followers = [...this.followers, item]
                        })
                        if (this.followsOfCurrentUser.indexOf(this.props.user.uid) !== -1) this.friends = [...this.friends, this.props.user]
                        if (this.followersOfCurrentUser.indexOf(this.props.user.uid) !== -1) this.followers = [...this.followers, this.props.user]
                        this.props.getUsers(this.props.user.uid, this.users, this.friends)
                        this.setState({isUserLoaded: true})
                    })

            })
    }

    render = () => {

        return this.state.isUserLoaded ?
            <Profile {...this.props} currentUser={this.props.user} users={this.users} user={this.currentUserProfile}
                     followsOfCurrentUser={this.friends}
                     followersOfCurrentUser={this.followers} setUser={setUser}/>
            : <div className="text-center">
                <Loader type="Oval"
                        color="#00BFFF"
                        height={40}
                        width={40}/>
            </div>
    }
}

let mapStateToProps = (state, ownProps) => ({
    profilePage: state.profilePage,
    //user: ownProps.user
})


export default connect(mapStateToProps, {getUsers, setUser, addFollow})(withRouter(ProfileContainer));