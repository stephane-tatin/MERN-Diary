import React, { Component } from 'react';
import { Card, CardText, Row, Col, Container, CardHeader, Fade} from "reactstrap"
import { connect } from "react-redux"
import { getQuestionsForms } from "../actions/questionsFormActions"
import PropTypes from "prop-types"
import Moment from "react-moment"
import { Redirect } from "react-router-dom"


class AnswersList extends Component {

    state = {
        fade : false
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.auth.isAuthenticated === true) {
            if (this.props.questionsForm.loaded === false ) {
                this.props.getQuestionsForms()
                this.setState({
                    fade:true
                })
            } else {
    
            }
        }
     
        
    }

    state = {  }
    render() { 
     
        const { questionsForms } = this.props.questionsForm
        
        

            if (this.props.auth.isAuthenticated === false) {
                return <Redirect to="/" />
              } else {
                return ( 
            <Container>
                <Fade in={this.fade}>
                    <Row sm="12">
                        {questionsForms.map((questionsForm) => (
                            <Col sm="4">
                                <Card body>
                                    <CardHeader><Moment format="ddd DD/MM/YYYY">{questionsForm.date}</Moment></CardHeader>
                                    <Container style={{border:"solid light-grey 2px"}}>                             
                                        <CardText className="questionCard"><small>{questionsForm.question1}</small></CardText>
                                        <CardText className="answerCard">{questionsForm.answer1}</CardText>
                                        <CardText className="questionCard"><small>{questionsForm.question2}</small></CardText>
                                        <CardText className="answerCard">{questionsForm.answer2}</CardText>
                                        <CardText className="questionCard"><small>{questionsForm.question3}</small></CardText>
                                        <CardText className="answerCard">{questionsForm.answer3}</CardText>
                                        <CardText className="questionCard"><small>{questionsForm.question4}</small></CardText>
                                        <CardText className="answerCard">{questionsForm.answer4}</CardText>
                                        <CardText className="questionCard"><small>{questionsForm.question5}</small></CardText>
                                        <CardText className="answerCard">{questionsForm.answer5}</CardText>
                                    </Container>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Fade>
            </Container>
         );
    }}
}

AnswersList.propTypes = {
    getQuestionsForms : PropTypes.func.isRequired,
    questionsForm : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    questionsForm: state.questionsForm,
    auth: state.authReducer
})
 
export default connect(mapStateToProps, {getQuestionsForms})(AnswersList);
