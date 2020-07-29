import React, {Component} from 'react';
import { Row,  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { connect } from "react-redux"
import { getQuestions } from "../actions/questionActions"
import { addQuestionsForm } from "../actions/questionsFormActions"
import PropTypes from "prop-types"

class QuestionsForm extends Component {

    componentDidMount(){
        console.log(this.props)
        if(this.props.auth.isAuthenticated === true) {
            if (this.props.question.loaded === false ) {
                this.props.getQuestions()
            } else {
    
            }
        }
     
        
    }
    
   
    state = {
    }

    sendForm = () => {
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
    }


    onChange = (e) => {        
        this.setState({
            [e.target.name] : e.target.value
            
        })
    }

    render() { 
       
        const { randomizedQuestions } = this.props.question

        if (this.props.auth.isAuthenticated === false) {
            return <Redirect to="/" />
          } else {
            return ( 
            <Form>
                {randomizedQuestions.map(({_id, wording, id}, index) => (
                    <FormGroup key={id}>
                        <Row className="justify-content-center">
                            <Col sm={8} xs={8}>
                                <Label for="wording" key={_id}>{wording}</Label>
                                <Input type="textarea" name={`answer${index+1}`} onChange={this.onChange}/>
                            </Col> 
                        </Row>
                        
                    </FormGroup>
                ))}
                <Button style={{marginBottom: "2rem"}} color="dark" onClick={this.sendForm}>Share my thought</Button>
            </Form>
         );
    }}
}

QuestionsForm.propTypes = {
    getQuestions : PropTypes.func.isRequired,
    addQuestionsForm : PropTypes.func.isRequired,
    question : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question,
    auth : state.quthReducer
})
 
export default connect(mapStateToProps, {addQuestionsForm, getQuestions})(QuestionsForm);
 
