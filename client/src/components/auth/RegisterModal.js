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
    NavLink,
    Alert
} from "reactstrap"
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

     componentDidUpdate() {
        console.log(this.props)
        console.log(this.state)
        
        if (this.props.error !== null){
            console.log("if statement works")
           
        } else {
            console.log("not working")
        }
        
        
     }

    //  componentDidUpdate(previousProps){
   
    //     const { error, isAuthenticated } = this.props

    //     console.log(previousProps.error)
    //     console.log(error)

    //     console.log(previousProps.error == error )
        
       
    //     if(error !== previousProps.error) {
    //         //Check for register error
    //         if(error.id === "REGISTER_FAIL") {
    //             console.log("register failed")
    //             this.setState({ msg: error.msg.msg })
         
    //         } else {
    //             this.setState({ msg : null})
    //         }
    //     }
    //     console.log(this.state)

    //     if(this.state.modal){
    //         if(isAuthenticated) {
                
    //             this.setState({
    //                 modal:false
    //             })
    //         }
    //     }
 
    //  }

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

    //     console.log(this.props)
    //     console.log(this.props.error)

    //   console.log(this.props.error[0] != null)
    //   console.log(this.props.error != null)

    //     if (this.props.error != null){
    //         console.log("if statement works")
            
    //     }

  

    
     }

    render() { 
        return ( 
        <div>
           <NavLink
           onClick={this.toggle}
           href="">
                Register
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
    error: state.errorReducer.msg,

})
 
export default connect(mapStateToProps, {register, clearErrors})(RegisterModal);