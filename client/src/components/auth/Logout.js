import React, { Component } from 'react';
import { logout } from "../../actions/authActions"
import {connect } from "react-redux" 
import {NavLink} from "react-router-dom"
import PropTypes from "prop-types"




class Logout extends Component {
    state = {  }

    static propTypes = {
        logout : PropTypes.func.isRequired
    }

    render() { 
        return ( 
        
            <NavLink to="/" className="text-white" onClick={this.props.logout} href="#">
                logout
            </NavLink>
        );
    }
}
 
export default connect(null, {logout })(Logout);