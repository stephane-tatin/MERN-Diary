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
    Container,
    Fade,
    Alert
} from "reactstrap"
import { connect } from "react-redux"
import { getQuestions } from "../actions/questionActions"
import { addQuestionsForm, clearQuestionsForm } from "../actions/questionsFormActions"
import { getQuotations } from "../actions/quotationsAction"
import {Redirect } from "react-router-dom"



class QuestionsFormModal extends Component {

    state = {
        fade: false,
        msg: null,
        modal: false,
        modalQuotation: false,
        wording: ""
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated === true) {
            if (this.props.question.loaded === false || this.props.quotation.loaded === false) {
                this.props.getQuestions()
                this.props.getQuotations()
                this.setState({
                    fade: true
                })
            } else {}
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {
            error,
            questionsForm
        } = this.props;


        if (questionsForm !== prevProps.questionsForm  ) {
       
            this.toggleQuotation()
        }

        if (error !== prevProps.error) {
            if (error.status === "ADD_QUESTIONSFORM_ERROR") {
                this.setState({
                    msg: error.msg.msg
                })
            } else {
                this.setState({
                    msg: null
                })
            }
        }
    }

    toggle = () => {
        console.log("toggle called ", !this.state.modal)
   
        
        this.setState({
            modal: !this.state.modal,
            msg: null
        })
   }

    toggleQuotation = () => {
        console.log("togglequotation called ", !this.state.modalQuotation)
     
        this.setState({
            modalQuotation: !this.state.modalQuotation,
            msg: null
        })

        console.log(this.props.quotations)
      
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {
            randomizedQuestions
        } = this.props.question
        const {
            user
        } = this.props.auth
        const newQuestionsForm = {
            answer1: this.state.answer1,
            answer2: this.state.answer2,
            answer3: this.state.answer3,
            answer4: this.state.answer4,
            answer5: this.state.answer5,
            question1: randomizedQuestions[0].wording,
            question2: randomizedQuestions[1].wording,
            question3: randomizedQuestions[2].wording,
            question4: randomizedQuestions[3].wording,
            question5: randomizedQuestions[4].wording,
            userId: user._id
        }

        this.props.addQuestionsForm(newQuestionsForm)

        if (this.state.msg === null) {
            this.toggle()
        }
   
          
    }


    render() { 

        const { randomizedQuestions } = this.props.question
        const { quotations } = this.props.quotation
        const singleQuotation = quotations[Math.round(Math.random()* quotations.length-1)]

        if (this.props.auth.isAuthenticated === false) {
            return <Redirect to="/" />
          } else {
            return ( 
                <Container>
                    <Fade>
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
                                        {this.state.msg !== null ? <Alert color="danger">{this.state.msg}</Alert> : null}
                                        {randomizedQuestions.map(({ wording, _id}, index) => (
                                            
                                            <FormGroup key={_id}>
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
                    </Fade>
                    <Fade>
                        <Modal isOpen={this.state.modalQuotation}
                            toggle={this.toggleQuotation}>
                            <ModalHeader toggle={this.toggleQuotation}>Quotation of the day</ModalHeader>
                            <ModalBody>
                                <Form onClick={this.toggleQuotation}>
                                    <FormGroup>
                                        <div>{singleQuotation ? singleQuotation.quotation : null }</div>
                                        <div style={{fontStyle:"italic"}}>{singleQuotation ? singleQuotation.author : null }</div>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </Fade>
                </Container>
            );
        }}
    }

const mapStateToProps = state => ({
    questionsForm : state.questionsForm,
    question : state.question,
    auth : state.authReducer,
    error : state.errorReducer,
    quotation : state.quotation
})
 
export default connect(mapStateToProps, {addQuestionsForm, clearQuestionsForm,  getQuestions, getQuotations})(QuestionsFormModal);

