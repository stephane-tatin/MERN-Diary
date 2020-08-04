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
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { register } from "../../actions/authActions"
import { clearErrors } from "../../actions/errorActions"

class RegisterModal extends Component {
    state = { 
        modal:false,
        name:"",
        email:"",
        password:"",
        msg: null
     }

     static propTypes = {
         isAuthenticated : PropTypes.bool,
         error : PropTypes.object.isRequired,
         register : PropTypes.func.isRequired,
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
        const {name, email, password } = this.state
        const newUser = {
            name,email,password
        }
        this.props.register(newUser) 
      
    }

    componentDidUpdate(prevProps, prevState)   {
        const { error } = this.props;
        if(error !== prevProps.error) {

            if(error.status ==="REGISTER_FAIL") {
                this.setState({msg: error.msg.data.msg})
           
            }   else {
         
                this.setState({ msg: null})
            }
        }
    }

    render() { 
        return ( 
        <div>
           <NavLink to="/registerForm"
           style={{marginRight: "2rem" , float: "left"}} 
           className="text-white nav-link"
           onClick={this.toggle}
           >Register
           </NavLink>
            <Modal isOpen={this.state.modal}
                toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add to Database</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                        { this.state.msg!== null  ? <Alert color="danger">{ this.state.msg} </Alert> : null} 
                            <Label for="name">Name</Label>
                            <Input
                            className="mb-3"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="name"
                            onChange= {this.onChange}></Input>
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
                            >Register</Button>
                          
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
 
export default connect(mapStateToProps, {register, clearErrors})(RegisterModal);