import React, { Component } from 'react';
import { connect } from "react-redux"
import {Fade, Jumbotron } from "reactstrap"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"

class HomePage extends Component {

    
    
    state = {
        fade:false,
    
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
                <p>This is your private place to express yourself. You will be asked <NavLink to="/questionsForm">5 random questions</NavLink> as a base to express yourself and will be rewarded by a quotations from a famous man. You may add your own questions to the <NavLink to="/questionsDB">database</NavLink> and take a look at <NavLink to="/pages">your previous entries</NavLink></p>

                </Jumbotron> : <Jumbotron>Please register or login to use your diary</Jumbotron> }
            </Fade>
   
        )}
}

const mapStateToProps = state => ({
    auth : state.authReducer
  })
 
export default connect(mapStateToProps, null)(HomePage);