import React, { useState, useContext, useEffect, useRef } from 'react';
import {MainContext} from '../contexts/contexts.js'
import axios from 'axios';

function IndividualQandA () {

  const {products, setProducts, currentProductId, setCurrentProductId, numCurrentQuestions, setNumCurrentQuestions, cqCopy, setCQCopy,
    currentQuestion, questionIDs, setQuestionIDs, answerIDs, setAnswerIDs, reportAnswerIDs, setReportAnswerIDs, questionIDs2, setQuestionIDs2, currentCount, setCurrentCount, showAnswerModal, setShowAnswerModal,
     setCurrentQuestion, query, setQuery, filteredQuestions, setFilteredQuestions, limitQuestions, setLimitQuestions, showAllQuestions, setShowAllQuestions, qIDAnswer, setqIDAnswer} = useContext(MainContext);

  // Get all answers for a specific Question based on questionID
  const getAnswers = function (id) {
    axios
      .get('/qa/questions/' + id.toString() + '/answers')
      .then((results) => {
        let resultsArray = results.data.results
        console.log(resultsArray)
        return resultsArray;
      })
  }

  // Updates the currentQuestion list to show that the YES count has increased
  const updateCPID = function() {
    if (showAllQuestions) {
    axios
      .get('/qa/questions?product_id=' + currentProductId + '&count=100')
      .then((result) => {
        setCurrentQuestion(result.data.results)
        setLimitQuestions(result.data.results);
        setCQCopy(result.data.results);
      })
    } else if (!showAllQuestions) {
      axios
        .get('/qa/questions?product_id=' + currentProductId + '&count=100')
        .then((result) => {
          setCurrentQuestion(result.data.results)
          setLimitQuestions(result.data.results.slice(0, 4));
          setCQCopy(result.data.results.slice(0, 4));
        })
      }
  }

  // Send a PUT Request for a specific Answer ID to mark it as helpful and increase helpful count on server
  const updateAHelpful = function(e) {
    let aID = e.currentTarget.dataset.id;
    let stateCopy1 = answerIDs;
    if (!answerIDs[aID]) {
      axios
        .put('/qa/answers/' + aID.toString() + '/helpful')
        .then(() => {updateCPID()})
        .then(() => {
          stateCopy1[aID] = true;
          setAnswerIDs(stateCopy1);
        })
        .then((results) => {
          console.log('Successfully marked answer ' + aID.toString() + ' as helpful');
        })
    } else {
      alert('You have already marked this answer as helpful!')
    }
  }

  // Send a PUT Request for a specific answer ID to mark the question as reported on the database
  const reportAnswer = function(e) {
    let aID = e.currentTarget.dataset.id;
    let stateCopy2 = reportAnswerIDs;
    if (!reportAnswerIDs[aID]) {
      axios
        .put('/qa/questions/' + aID.toString() + '/report')
        .then(() => {
          updateCPID()
        })
        .then(() => {
          stateCopy2[aID] = true;
          setReportAnswerIDs(stateCopy2);
          // alert('Reported Answer ' + aID + '.')
        })
    } else {
      alert ('You have already reported this answer!');
    }
  }


  // Send a PUT Request for a specific Question ID if it was helpful to increase the helpful count on server
  // if user has already marked a question as helpful, will not send a PUT request and alert user that they
  // have already marked this question as helpful
  const updateQHelpful = function(e) {
    let qID = e.currentTarget.dataset.id;
    let questionIDsCopy = questionIDs;
    if (questionIDs[qID]) {
      axios
        .put('/qa/questions/' + qID.toString() + '/helpful')
        .then((results) => {
          console.log('Successfully marked question ' + qID + ' as helpful');
        })
        .then(() => {
          updateCPID()
          console.log(currentProductId)
        })
        .then(() => {
          questionIDsCopy[qID] = false;
          setQuestionIDs(questionIDsCopy);
        })
    } else {
      alert ('You have already marked this question as helpful!');
    }

  }

  const updateQID = function (e) {
    let qID = e.currentTarget.dataset.id
    console.log(qID);
    setqIDAnswer(e.currentTarget.dataset.id);
    setShowAnswerModal(true);
  }

  // Function that fills up the answerIDs and reportAnswerIDs state
  // with an object of objects with key of answerID and value of false
  const fillAnswerIDs = function() {
    let aIDObject = {};
    let raIDObject = {};
    const helper = function(array) {
      for (var i = 0; i < array.length; i++) {
        aIDObject[array[i]['answer_id']] = false;
        raIDObject[array[i]['answer_id']] = false;
      }
      setAnswerIDs(aIDObject);
      setReportAnswerIDs(raIDObject);
    }
    let qIDArray = Object.keys(questionIDs);
    for (var i = 0; i < qIDArray.length; i++) {
      let qID = qIDArray[i];
      axios
        .get('/qa/questions/' + qID + '/answers')
        .then((results) => {
          let resultsArray = results.data.results
          resultsArray.length ? helper(resultsArray) : null;
        })
    }

  }

  const loadAnswers = function(e) {
    let qID = e.target.name;
    let stateCopy = questionIDs2;
    stateCopy[qID] = false;
    setQuestionIDs2(stateCopy);
    updateCPID()
  }

  useEffect(() => {
    questionIDs ? fillAnswerIDs() : null;
  }, [questionIDs])



  // Will show "LOADING..." until
  // currentQuestion object has been resolved in qna.js
  // and successfully passed down to this component
  if (cqCopy === null) {
    return (
      <div>
        LOADING...
      </div>
    )
  }

  return (

    <div id="IndividualQA">
      {/* Dynamically renders questions from currentQuestion prop in the format of Question, then Answer, then asker name, date asked, helpful, how many people found it helpful, and report*/}

      {limitQuestions && reportAnswerIDs ? limitQuestions.map(oneQuestion => {
        let answerArray = Object.values(oneQuestion.answers);
        let finalAnswers = answerArray.map(oneAnswer => {
          return (
            <div key={oneAnswer.id} id="totalAnswer">
              <div className="answerBody"><span><b>A: </b></span>{oneAnswer.body}</div>
              <div className="answerBottomText">by {oneAnswer.answerer_name}, {oneAnswer.date.slice(0,10)}   |   Helpful? <span className="helpfulYes" data-id={oneAnswer.id} onClick={updateAHelpful}><u>Yes</u></span>({oneAnswer.helpfulness})   |  <span data-id={oneAnswer.id.toString()} className="reportAnswer" onClick={reportAnswer}><u>{reportAnswerIDs[oneAnswer.id] ? "Reported" : "Report"}</u></span></div>
            </div>
          );
        });
        let finalAnswersSliced = answerArray.slice(0, 2).map(oneAnswer => {
          return (
            <div key={oneAnswer.id} id="totalAnswer">
              <div className="answerBody"><span><b>A: </b></span>{oneAnswer.body}</div>
              <div className="answerBottomText">by {oneAnswer.answerer_name}, {oneAnswer.date.slice(0,10)}   |   Helpful? <span className="helpfulYes" data-id={oneAnswer.id} onClick={updateAHelpful}><u>Yes</u></span>({oneAnswer.helpfulness})   |  <span data-id={oneAnswer.id.toString()} className="reportAnswer" onClick={reportAnswer}><u>{reportAnswerIDs[oneAnswer.id] ? "Reported" : "Report"}</u></span></div>
            </div>
          );
        });
        return (
          <div key={oneQuestion.question_id} className="individualQA">
            <div id="questionAsked">
              Q: {oneQuestion.question_body}
              <span id="questionAskedInfo"> asked by: {oneQuestion.asker_name}   |    Date Asked: {oneQuestion.question_date.slice(0, 10)}   |   Helpful? <span className="helpfulYes" data-id={oneQuestion.question_id} onClick={updateQHelpful}><u>Yes</u></span> ({oneQuestion.question_helpfulness})   | <span data-id={oneQuestion.question_id} className="addAnswer" onClick={updateQID}> <u> Add Answer </u></span> </span>
            </div>
            <div id="answers">{questionIDs2[oneQuestion.question_id] ? finalAnswersSliced : finalAnswers}</div>
            <div id="loadingButton">
              {questionIDs2[oneQuestion.question_id] ? <button onClick={loadAnswers} name={oneQuestion.question_id} className="answerLoad">LOAD MORE ANSWERS</button> : null}
            </div>
          </div>
        )
      }): <div>LOADING...</div>}
    </div>
  )

}

export default IndividualQandA;