import React from 'react'
import Users from "./Users";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.user, 0)
    }

    render() {
        return <Users users={this.props.state.usersData} currentUser={this.props.user}
                      addFollowThunk={this.props.addFollowThunk} isFetching={this.props.isFetching}/>
    }
}

export default UsersAPIComponent;