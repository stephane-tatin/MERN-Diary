import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button, Fade } from "reactstrap"

import { connect } from "react-redux"
import { getQuestions, deleteQuestion } from "../actions/questionActions"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"

class QuestionList extends Component {

    state = {
        fade : false
    }

    componentDidMount(){
        console.log(this.props)
        if(this.props.auth.isAuthenticated === true) {
            if (this.props.question.loaded === false ) {
                this.props.getQuestions()
                this.setState({
                    fade: true
                })
            } else {
    
            }
        }
     
        
    }

    onDeleteClick = (id) => {
        this.props.deleteQuestion(id)
    }
   

    render() { 
        
        const { questions } = this.props.question

        if (this.props.auth.isAuthenticated === false) {
            return <Redirect to="/" />
          } else {
        

        return ( 
            <Container>
                <Fade in={this.fade}>
                    <ListGroup>
                        
                            {questions.map(({_id, wording, userId}) => (
                               
                                    <ListGroupItem>
                                    {wording}
                                        {userId !== "genericQuestion" ? 
                                            <Button 
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                            >x</Button> : null }
                                        
                                          
                                    </ListGroupItem>
                              
                            
                            ))}
                       
                    </ListGroup>
                </Fade>
            </Container>
         );
    }
}
}

QuestionList.propTypes = {
    getQuestions : PropTypes.func.isRequired,
    question : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    question: state.question,
    auth : state.authReducer
})
 
export default connect(mapStateToProps, {getQuestions, deleteQuestion})(QuestionList);