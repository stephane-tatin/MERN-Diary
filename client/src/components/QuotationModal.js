import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Fade
} from "reactstrap"
import { connect } from "react-redux"
import { getQuotations } from "../actions/quotationsAction"



class QuotationModal extends Component {
   
    state = { 
        modal:false,
        fade:false
        }
    

     componentDidMount() {
         console.log(this.props)
         if (this.props.auth.isAuthenticated === true) {
             if (this.props.quotation.loaded === false) {
                 this.props.getQuotations()
                 this.setState({
                     fade: true
                 })
             } else {
             }
         }
     }

     toggle = () => {
         this.setState({
             modal: !this.state.modal
         })
     }


    render() { 
        return ( 
            <div>
                <Fade>
                    <Modal isOpen={this.state.modal}
                        toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Quotation of the day</ModalHeader>
                        <ModalBody>
                            <Form onClick={this.toggle}>
                                <FormGroup>
                                    {this.props.quotation ?this.props.quotation : null }
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Fade>
            </div> );
    }
}

const mapStateToProps = state => ({
    auth : state.authReducer,
    quotation : state.quotation
})
 
export default connect(mapStateToProps, {getQuotations})(QuotationModal);