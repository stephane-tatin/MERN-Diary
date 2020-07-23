import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, Row, Col} from "reactstrap"
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
            <Row>
                {questionsForms.map((questionsForm) => (
                     <Col sm="6">
                        <Card>
                            <CardTitle><Moment format="ddd DD/MM/YYYY">{questionsForm.date}</Moment></CardTitle>
                            <CardText><small class="questionCard">{questionsForm.question1}</small></CardText>
                            <CardText>{questionsForm.answer1}</CardText>
                            <CardText><small class="questionCard">{questionsForm.question2}</small></CardText>
                            <CardText>{questionsForm.answer2}</CardText>
                            <CardText><small class="questionCard">{questionsForm.question3}</small></CardText>
                            <CardText>{questionsForm.answer3}</CardText>
                            <CardText><small class="questionCard">{questionsForm.question4}</small></CardText>
                            <CardText>{questionsForm.answer4}</CardText>
                            <CardText><small class="questionCard">{questionsForm.question5}</small></CardText>
                            <CardText>{questionsForm.answer5}</CardText>
                        </Card>
                    </Col>
                ))}
              
            </Row>
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
