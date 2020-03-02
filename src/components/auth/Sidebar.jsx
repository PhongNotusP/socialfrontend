import React, { Component } from 'react'
import { Link } from 'react-router-dom';
class Sidebar extends Component {
    render() {
        return (
            <div className="col-lg-3">
                <div className="acc-leftbar">
                    <div className="nav nav-tabs">
                        <div style={{background:"red", height:"500px"}} > </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Sidebar;
