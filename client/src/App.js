import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavBar from "./components/AppNavBar"
// import QuestionsForm from './components/QuestionsForm';
import QuestionModals from "./components/QuestionModals"
import { Provider } from "react-redux"
import store from "./store"
import QuestionList from './components/QuestionList';
import { BrowserRouter, Route } from "react-router-dom"
import AnswersList from './components/AnswersList';
import QuestionsFormModal from './components/QuestionsFormModal';
import RegisterModal from "./components/auth/RegisterModal"
import { loadUser } from "./actions/authActions"
import LoginModal from './components/auth/LoginModal';
import HomePage from './components/HomePage';


class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser())
  }

  render(){
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          	<AppNavBar></AppNavBar>
            <Route exact path="/" component= {HomePage}></Route>
        	  <Route path="/pages" component= {AnswersList}></Route>

            <Route path="/questionsDB" component={QuestionModals}></Route>
          	<Route path="/questionsDB" component={QuestionList}></Route>
          	
          	<Route path="/registerForm" component={RegisterModal}></Route>
			      <Route path="/questionsForm" component={QuestionsFormModal}></Route>
            <Route path="/loginForm" component={LoginModal}></Route>
            

           
        </div>
      </Provider>
    </BrowserRouter>
  );
}
}

export default App;
