import React, { Component } from 'react';
import { connect } from "react-redux"
import PropTypes from "prop-types"

class HomePage extends Component {
    

    static propTypes = {
        auth : PropTypes.object.isRequired
    }


    render() { 

        const { user, isAuthenticated } = this.props.auth



        return ( <div>
            {isAuthenticated ? `Welcome ${user.name}. This is your private place to express yourself and think about you today` : "please register or login to use your diary" }
        </div> );
    }
}

const mapStateToProps = state => ({
    auth : state.authReducer
  })
 
export default connect(mapStateToProps, null)(HomePage);