import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap"
import { connect } from "react-redux"
import { addQuestion } from "../actions/questionActions"



class QuestionsModal extends Component {
    state = { 
        modal:false,
        wording: ""
     }

     toggle = () => {
         this.setState({
             modal : !this.state.modal
         })
     }

     onChange = (e) => {
         this.setState({
             wording: e.target.value
         })
     }

     onSubmit = (e)=> {
        e.preventDefault();
        const newQuestion = {
            wording : this.state.wording
        }

        //Add Item via Add Item Action
        this.props.addQuestion(newQuestion)

        this.toggle()
     }

    render() { 
        return ( 
        <div>
            <Button
                color="dark"
                style={{marginBottom: "2rem"}}
                onClick={this.toggle}>
                Add a question
            </Button>
            <Modal isOpen={this.state.modal}
                toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add to Database</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="question">Question</Label>
                            <Input
                            type="text"
                            name="wording"
                            id="question"
                            placeholder="add a question to the database"
                            onChange= {this.onChange}></Input>
                            <Button
                            color="dark"
                            style= {{marginTop : "2rem"}}
                            >Add question</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div> );
    }
}

const mapStateToProps = state => ({
    question : state.question
})
 
export default connect(mapStateToProps, {addQuestion})(QuestionsModal);