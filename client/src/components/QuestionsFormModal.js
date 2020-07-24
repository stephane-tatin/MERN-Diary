import React, {Component} from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Container
} from "reactstrap"
import { connect } from "react-redux"
import { getQuestions } from "../actions/questionActions"
import { addQuestionsForm } from "../actions/questionsFormActions"


class QuestionsFormModal extends Component {

    componentDidMount(){
    
        if (this.props.question.loaded == false) {
            this.props.getQuestions()
        } else {
        }
        
    }

    state = { 
        modal: false,
        wording: ""
     }

     toggle = () => {
         this.setState({
             modal : !this.state.modal
         })
     }

     onChange = (e) => {        
        this.setState({
            [e.target.name] : e.target.value
            
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { randomizedQuestions } =  this.props.question
       
        const newQuestionsForm = {
            answer1 : this.state.answer1,
            answer2 : this.state.answer2,
            answer3 : this.state.answer3,
            answer4 : this.state.answer4,
            answer5 : this.state.answer5,
            question1 : randomizedQuestions[0].wording,
            question2 : randomizedQuestions[1].wording,
            question3 : randomizedQuestions[2].wording,
            question4 : randomizedQuestions[3].wording,
            question5 : randomizedQuestions[4].wording

        }
        console.log(newQuestionsForm)
        console.log(this.props)

        this.props.addQuestionsForm(newQuestionsForm)

        this.toggle()
    }


    render() { 

        const { randomizedQuestions } = this.props.question

        return ( 
            <Container>
                <Button 
                color="dark"
                style= {{marginBottom: "2rem"}}
                onClick={this.toggle}>
                    Share my thougth
                </Button>
                <Modal 
                isOpen={this.state.modal}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>This is your place</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                {randomizedQuestions.map(({_id, wording, id}, index) => (
                                    
                                    <FormGroup key={id}>
                                        <Label for="question">{wording}</Label>
                                        <Input 
                                        type="text"
                                        name={`answer${index+1}`} 
                                        id="answer"
                                        placeholder=""
                                        onChange={ this.onChange }
                                        >Question</Input>
                                    </FormGroup>
                                ))}
                              
                                <Button
                                color="dark"
                                style= {{marginTop : "2rem"}}
                                >Write in my journal</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>
         );
    }
}

const mapStateToProps = state => ({
    question : state.question
})
 
export default connect(mapStateToProps, {addQuestionsForm, getQuestions})(QuestionsFormModal);

