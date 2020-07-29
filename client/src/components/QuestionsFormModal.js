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
import { addQuestionsForm } from "../actions/questionsFormActions"
import {Redirect } from "react-router-dom"


class QuestionsFormModal extends Component {

    state={
        fade : false,
        msg: null,
        modal: false,
        wording: ""
    }

    componentDidMount(){
        if(this.props.auth.isAuthenticated === true) {
            if (this.props.question.loaded === false ) {
                this.props.getQuestions()
                this.setState({
                    fade:true
                })
            } else {
            }
        }
    }

    componentDidUpdate(prevProps, prevState)   {
        const { error, questionsForm } = this.props;


        if(questionsForm !== prevProps.questionsForm) {   
            this.toggle()
        }
    
        if(error !== prevProps.error) {
            if(error.status ==="ADD_QUESTIONSFORM_ERROR") {
              this.setState( {msg: error.msg.msg})
            }  else {
                this.setState({ msg: null})
            }
        }
    }

     toggle = () => {
         this.setState({
             modal : !this.state.modal,
             msg: null
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
        const { user } =  this.props.auth  
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
            question5 : randomizedQuestions[4].wording,
            userId : user._id
        }

        this.props.addQuestionsForm(newQuestionsForm)

        if (this.props.error.msg ===null) {
            this.toggle()
        } else {
            this.setState({
                msg : this.props.error.msg.msg
            })
        }
    }


    render() { 

        const { randomizedQuestions } = this.props.question

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
                </Container>
            );
        }}
    }

const mapStateToProps = state => ({
    questionsForm : state.questionsForm,
    question : state.question,
    auth : state.authReducer,
    error : state.errorReducer
})
 
export default connect(mapStateToProps, {addQuestionsForm, getQuestions})(QuestionsFormModal);

