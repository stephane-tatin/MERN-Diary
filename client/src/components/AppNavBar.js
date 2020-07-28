import React, {Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Container
} from "reactstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Link, NavLink } from "react-router-dom"
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

        const { isAuthenticated, user } = this.props.auth
        
        const authLinks = (
            <Fragment>  
                <NavItem>
                    <NavLink style={{marginRight: "2rem"}} className="text-white" to="/pages">How was I feeling ?</NavLink>
                        </NavItem>
                    <NavItem>
                        <NavLink style={{marginRight: "2rem"}} className="text-white" to="/questionsForm">Speak about myself</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{marginRight: "2rem"}} className="text-white" to="/questionsDB">Ask questions to my future self</NavLink>
                    </NavItem>
                <NavItem>
                    <Logout className="text-white">Logout</Logout>
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
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavLink style={{marginRight: "2rem"}} className="text-white" to="/">My Diary</NavLink>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={true}>
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