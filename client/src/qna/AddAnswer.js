import React, { useState, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';


function AddAnswer (props) {

  const {products, setProducts, currentProductId, setCurrentProductId, cqCopy, setCQCopy,
     showAnswerModal, setShowAnswerModal, currentQuestion, setCurrentQuestion, limitQuestions, setLimitQuestions, qIDAnswer, setqIDAnswer} = useContext(MainContext);

  const modalRef = useRef();

  const openAnswerModal = function () {
    setShowAnswerModal(true);
  }

  const closeAnswerModal = function (e) {
    if (e.target === modalRef.current) {
      setShowAnswerModal(false);
    }
  }

  const onSubmit = (event) => {
    event.preventDefault(event);
    let payload = {
      "body": event.target.qnaFormQuestion.value,
      "name": event.target.nickname.value,
      "email": event.target.email.value,
      "photos": []
    }
    console.log(payload);
    console.log(qIDAnswer);
    axios
      .post('/qa/questions/' + qIDAnswer + '/answers', payload)
      .then(() => {
        props.updateCPID()
      })
      .then(() => {
        console.log('Submitted Question')
        alert('Submitted Question')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return ReactDOM.createPortal(
    <div className="container" ref={modalRef} onClick={closeAnswerModal}>
      <div className="modal">
        <h2 id="formQF">Answer Fields</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="question">Answer (MANDATORY FIELD)</label>
            <input className="form-controlQA" id="qnaFormQuestion" type="text" placeholder="Your answer here" required="true"/>
          </div>
          <div className="form-group">
            <label htmlFor="nickname">Nickname (MANDATORY FIELD)</label>
            <input
              type="nickname"
              className="form-control"
              id="nickname"
              placeholder="jack543!"
              required="true"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address (MANDATORY FIELD)</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="jack@email.com"
              required="true"
            />
          </div>
          <input type="submit" value="SubmitQuestion"></input>
        </form>
      </div>
    </div>,
    document.getElementById("app")
  );



}

export default AddAnswer;

