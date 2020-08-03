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
                <p>You can <NavLink to="/questionsForm" className="text-muted">add an entry</NavLink> to your personal diary by answering randomised questions, take a look at <NavLink to="/pages" className="text-muted">your previous entries</NavLink> or <NavLink to="/questionsDB" className="text-muted">add questions</NavLink> to the database</p>
                </Jumbotron> : <Jumbotron>Please register or login to use your diary</Jumbotron> }
            </Fade>
   
        )}
}

const mapStateToProps = state => ({
    auth : state.authReducer
  })
 
export default connect(mapStateToProps, null)(HomePage);