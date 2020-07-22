import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import AppNavBar from "./components/AppNavBar"
import QuestionsForm from './components/QuestionsForm';
import QuestionModals from "./components/QuestionModals"
import { Provider } from "react-redux"
import store from "./store"
import QuestionList from './components/QuestionList';
import { BrowserRouter, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <AppNavBar></AppNavBar>
          <Route path="/questionsDB" component={QuestionList}></Route>
          <Route path="/questionsDB" component={QuestionModals}></Route>
          <Route path="/questionsForm" component={QuestionsForm}></Route>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
