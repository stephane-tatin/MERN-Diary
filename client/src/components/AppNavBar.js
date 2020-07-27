import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from "reactstrap"
import { Link, NavLink } from "react-router-dom"
import RegisterModal from "./auth/RegisterModal"
import Logout from './auth/Logout';


class AppNavBar extends Component {
   
   
    state = { 
        isOpen : false
     }

    toggle = () => {
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    render() { 
        return ( 
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">My Diary</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}></NavbarToggler>
                        <Collapse isOpen={true}>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink style={{marginRight: "2rem"}} className="text-white" to="/pages">How was I feeling ?</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink style={{marginRight: "2rem"}} className="text-white" to="/questionsForm">Speak about myself</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="text-white" to="/questionsDB">Ask questions to my future self</NavLink>
                                </NavItem>
                                <NavItem>
                                    <RegisterModal className="text-white">Register</RegisterModal>
                                </NavItem>
                                <NavItem>
                                    <Logout className="text-white">Logout</Logout>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
         );
    }
}
 
export default AppNavBar;