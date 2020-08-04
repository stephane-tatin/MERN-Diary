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
        
            <NavLink to="/" style={{marginRight: "2rem" , float: "left"}} className="text-white nav-link" onClick={this.props.logout} href="#">
                Logout
            </NavLink>
        );
    }
}
 
export default connect(null, {logout })(Logout);