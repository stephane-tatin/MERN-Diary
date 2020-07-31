import React, { Component } from 'react';
import { connect } from "react-redux"
import {Fade, Jumbotron } from "reactstrap"
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
               {isAuthenticated ?  <Jumbotron>
                <h1>Welcome {user.name}.</h1> 
                <p>This is your private place to express yourself and think about you today</p>

                </Jumbotron> : <Jumbotron>Please register or login to use your diary</Jumbotron> }
            </Fade>
   
        )}
}

const mapStateToProps = state => ({
    auth : state.authReducer
  })
 
export default connect(mapStateToProps, null)(HomePage);