import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { connect } from "react-redux"
import { getQuestions, deleteQuestion } from "../actions/questionActions"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"

class QuestionList extends Component {

    

    componentDidMount(){
        console.log(this.props)
        if(this.props.auth.isAuthenticated === true) {
            if (this.props.question.loaded === false ) {
                this.props.getQuestions()
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
                <ListGroup>
                    <TransitionGroup className="question-list">
                        {questions.map(({_id, wording}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>{wording}
                                    <Button 
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        X
                                    </Button>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
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