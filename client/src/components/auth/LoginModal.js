import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,

    Alert
} from "reactstrap"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { login } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"
import { Link, NavLink } from "react-router-dom"

class LoginModal extends Component {
    state = { 
        modal:false,
        email:"",
        password:"",
        msg: null
     }

     static propTypes = {
         isAuthenticated : PropTypes.bool,
         error : PropTypes.object.isRequired,
         login : PropTypes.func.isRequired,
         clearErrors : PropTypes.func.isRequired
     }

    toggle = (e) => {
        e.preventDefault();
        this.props.clearErrors()
         this.setState({
             modal : !this.state.modal
         })
     }

    onChange = (e) => {
         this.setState({
             [e.target.name]: e.target.value
         })
     }

     onSubmit = (e)=> {
        e.preventDefault();
        const { email, password } = this.state
        const user = {
            email,password
        }
        this.props.login(user) 
    }

    componentDidUpdate(prevProps, prevState)   {
        const { error } = this.props;
        if(error !== prevProps.error) {
            console.log("not equal")
            console.log(prevProps.error)
            console.log(error)
            console.log(error.status)
            if(error.status ==="LOGIN_FAIL") {
                console.log("login failed")
                console.log(error.msg.data.msg)
                this.setState( {msg: error.msg.data.msg})
                console.log(this.state)
            }   else {
                console.log("login not failed")
                this.setState({ msg: null})
            }
        }
    }

    render() { 
        return ( 
        <div>
           <NavLink to="/loginForm"
           className="text-white"
           onClick={this.toggle}
           >Login
           </NavLink>
            <Modal isOpen={this.state.modal}
                toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                        { this.state.msg!== null  ? <Alert color="danger">{ this.state.msg} </Alert> : null} 
                            <Label for="name">Email</Label>
                            <Input
                             className="mb-3"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email"
                            onChange= {this.onChange}></Input>
                            <Label for="name">Password</Label>
                            <Input
                            className="mb-3"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            onChange= {this.onChange}></Input>
                            <Button
                            color="dark"
                            style= {{marginTop : "2rem"}}
                            >Login</Button>
                          
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div> );
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.authReducer.isAuthenticated,
    error: state.errorReducer,

})
 
export default connect(mapStateToProps, {login, clearErrors})(LoginModal);