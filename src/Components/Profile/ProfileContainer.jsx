import React from 'react'
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Loader from "react-loader-spinner";
import {getUsersFollowsAndFollowers} from "../../redux/profile-reducer";
import {setUser} from "../../redux/auth-reducer";
import {addFollow, addFollowThunk} from "../../redux/users-reducer";

class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersFollowsAndFollowers(this.props.user, this.props.match.params.userUid)
    }

    render = () => {

        return this.props.profilePage.isUserLoaded ?
            <Profile {...this.props} currentUser={this.props.user} users={this.props.usersData} user={this.props.currentUser}
                     followsOfCurrentUser={this.props.profilePage.followsData} uidFromUrl={this.props.match.params.userUid}
                     followersOfCurrentUser={this.props.profilePage.followersData} addFollowThunk={this.props.addFollowThunk} />
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
    currentUser: state.usersPage.currentUser
    //user: ownProps.user
})


export default connect(mapStateToProps, { addFollow, getUsersFollowsAndFollowers, addFollowThunk})(withRouter(ProfileContainer));