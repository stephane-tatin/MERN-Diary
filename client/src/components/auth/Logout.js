import React, { Component, Fragment } from 'react';
import { logout } from "../../actions/authActions"
import {connect } from "react-redux" 
import {NavLink} from "reactstrap"
import PropTypes from "prop-types"




class Logout extends Component {
    state = {  }

    static propTypes = {
        logout : PropTypes.func.isRequired
    }

    render() { 
        return ( <Fragment>
            <NavLink onClick={this.props.logout} href="#">
                logout
            </NavLink>
        </Fragment> );
    }
}
 
export default connect(null, {logout })(Logout);