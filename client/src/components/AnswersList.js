import React, { Component } from 'react';
import { Card, CardTitle, CardText, Row, Col, Container, CardHeader} from "reactstrap"
import { connect } from "react-redux"
import { getQuestionsForms } from "../actions/questionsFormActions"
import PropTypes from "prop-types"
import Moment from "react-moment"


class AnswersList extends Component {

    componentDidMount(){
     
    this.props.getQuestionsForms()
    
    }

    state = {  }
    render() { 
        console.log(this.props)
        const { questionsForms } = this.props.questionsForm
        console.log(questionsForms)
       
    

  
        
        return ( 

      

            <Container>
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
        </Container>
         );
    }
}

AnswersList.propTypes = {
    getQuestionsForms : PropTypes.func.isRequired,
    questionsForm : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    questionsForm: state.questionsForm
})
 
export default connect(mapStateToProps, {getQuestionsForms})(AnswersList);
