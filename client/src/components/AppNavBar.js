import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    Container,
    NavbarBrand,
    NavbarToggler
} from "reactstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import RegisterModal from "./auth/RegisterModal"
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';


class AppNavBar extends Component {
   
   
    state = { 
        isOpen : false
     }

     static propTypes = {
         auth : PropTypes.object.isRequired
     }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    render() { 

        const { isAuthenticated } = this.props.auth
        
        const authLinks = (
            <Fragment>  
                <NavItem>
                    <NavLink style={{marginRight: "2rem", float: "left"}} className="text-white nav-link" to="/pages">How was I feeling ?</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{marginRight: "2rem" , float: "left"}} className="text-white nav-link" to="/questionsForm">Speak about myself</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{marginRight: "2rem" , float: "left"}} className="text-white nav-link" to="/questionsDB">Ask questions to my future self</NavLink>
                </NavItem>
                <NavItem>
                    <Logout>Logout</Logout>
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal></RegisterModal>
                </NavItem>
                <NavItem>
                    <LoginModal></LoginModal>
                </NavItem>
            </Fragment>
        )

        
        
        return ( 
            <div>
            
                <Navbar color="dark" dark expand="md" className="mb-5">
                    <Container>
                        <NavbarBrand style={{marginRight: "2rem"}} className="text-white" to="/">My Diary</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                              
                                {isAuthenticated ? authLinks : guestLinks}
                              
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
         );
    }
}

const mapStateToProp = state => ({
  auth : state.authReducer
})
 
export default connect(mapStateToProp, null)(AppNavBar);