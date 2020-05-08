import React from 'react'
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import {
    getUsersFollowsAndFollowers,
    setModalMessageWindow
} from "../../redux/profile-reducer";
import {addFollowThunk, getUsers} from "../../redux/users-reducer";
import {createDialogAndRedirect, getDialogsData} from "../../redux/dialogs-reducer";

class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userUid: this.props.match.params.userUid !== undefined && ['myPosts', 'friends', 'followers'].indexOf(this.props.match.params.userUid) === -1
                ? this.props.match.params.userUid : this.props.user.uid
        }
    }
    componentDidMount() {
        this.props.getUsersFollowsAndFollowers(this.props.user, this.state.userUid)
        this.props.getUsers(this.props.user, 0)
    }

    render = () => {

        return this.props.profilePage.isUserLoaded ?
            <Profile {...this.props} currentUser={this.props.user} users={this.props.usersData}
                     user={this.props.currentUser}
                     followsOfCurrentUser={this.props.profilePage.followsData}
                     uidFromUrl={this.props.match.params.userUid}
                     followersOfCurrentUser={this.props.profilePage.followersData}/>
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
    usersData: state.usersPage.usersData,
    currentUser: state.usersPage.currentUser,
    dialogsData: state.dialogsPage.dialogsData
})


export default connect(mapStateToProps, {
    getUsersFollowsAndFollowers,
    addFollowThunk,
    getUsers,
    setModalMessageWindow,
    createDialogAndRedirect,
    getDialogsData
})(withRouter(ProfileContainer));