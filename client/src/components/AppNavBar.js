import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from "reactstrap"
import { Link } from "react-router-dom"

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
                                <NavItem dark>
                                    <NavLink href="/questionsForm">Speak about yourself</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/questionsDB" >Questions from database</NavLink>
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