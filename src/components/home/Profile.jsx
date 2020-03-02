import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
class Profile extends Component {
    render() {
        const { handle } = this.props;
        let handleLoading;
        if (!handle) {
            handleLoading = <Spinner />
        } else {
            handleLoading = (
                <div className="user-data full-width">
                    <div className="user-profile">
                        <div className="username-dt">
                            <div className="usr-pic">
                                <img src={handle.avatar} alt={handle.name} width="110px" height="110px" />
                            </div>
                        </div>
                        <div className="user-specs">
                            <h3>{handle.name}</h3>
                            <span>{handle.status}</span>
                        </div>
                    </div>
                    <ul className="user-fw-status">
                        <li>
                            <Link to="/profile">Thông tin các nhân</Link>
                        </li>
                    </ul>
                </div>
            )
        }
        return (
            <div>
                {handleLoading}
            </div>
        )
    }
}
export default Profile;
