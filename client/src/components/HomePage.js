import React, { Component } from 'react';
import { connect } from "react-redux"
import {Fade } from "reactstrap"
import PropTypes from "prop-types"

class HomePage extends Component {

    state = {
        fade:false
    }


    
    componentDidMount(){
        this.setState({
            fade:true
        })
    }
    

    static propTypes = {
        auth : PropTypes.object.isRequired
    }


    render() { 

        const { user, isAuthenticated } = this.props.auth



        return ( 
            <Fade in={this.fade}>
                <div>
                    {isAuthenticated ? `Welcome ${user.name}. This is your private place to express yourself and think about you today` : "please register or login to use your diary" }
                </div>
            </Fade>
   
        )}
}

const mapStateToProps = state => ({
    auth : state.authReducer
  })
 
export default connect(mapStateToProps, null)(HomePage);