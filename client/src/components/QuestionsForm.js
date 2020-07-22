import React, {Component} from 'react';
import { Row,  Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import uuid from "uuid/dist/v1"
import { connect } from "react-redux"
import { getQuestions } from "../actions/questionActions"
import PropTypes from "prop-types"

class QuestionsForm extends Component {
    componentDidMount(){
        this.props.getQuestions();
    }
   

    render() { 

        //Questions Randomizer
        function random (arr) {
            var newSet = new Set()
            for (let i = 0; i< arr.length; i++){
                newSet.add(arr[Math.floor(Math.random()*arr.length)])               
                        if(newSet.size === 5) {
                         break
                    }
            }
                return Array.from(newSet)
        }
        
        
        
        const { questions } = this.props.question
        const randomQuestions = random(questions)
  
        return ( 
            <Form>
                {randomQuestions.map(({id, wording}) => (
                    <FormGroup  key={id}>
                        <Row className="justify-content-center">
                            <Col sm={8} xs={8}>
                                <Label for="wording">{wording}</Label>
                                <Input type="textarea" name="text"/>
                            </Col> 
                        </Row>
                        
                    </FormGroup>
                ))}
                <Button style={{marginBottom: "2rem"}} color="dark">Share my thought</Button>
            </Form>
         );
    }
}


QuestionsForm.propTypes = {
    getQuestions : PropTypes.func.isRequired,
    question : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question
})
 
export default connect(mapStateToProps, {getQuestions})(QuestionsForm);
 
