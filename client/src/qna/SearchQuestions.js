import React, { useState, useContext, useEffect, useRef } from 'react';
import {MainContext} from '../contexts/contexts.js'
import Axios from 'axios';
import { FaSearch } from "react-icons/fa";

function SearchQuestions (props) {

  const {products, setProducts, currentProductId, setCurrentProductId, cqCopy, setCQCopy,
     currentQuestion, setCurrentQuestion, query, setQuery, filteredQuestions, setFilteredQuestions, limitQuestions, setLimitQuestions, showAllQuestions, setShowAllQuestions} = useContext(MainContext);

  // Handles text change in query
  const onFormChange = function(e) {
    setQuery(e.target.value);
  }

  // When query length is less than 3, question list is set to original list
  // When query length is 3 or more, runs filtered question and sets question list to the filtered list
  // When it goes back to less than 3, question list is set to the original again
  const onQueryChange = function () {
    let filter = filteredQuestion();
    if (query.length >= 3) {
      showAllQuestions ? setLimitQuestions(filter) : setLimitQuestions(filter.slice(0, 4));
    } else {
      showAllQuestions ? setLimitQuestions(currentQuestion) : setLimitQuestions(currentQuestion.slice(0, 4));
    }
  }


  // Filters current question list based on whether or not
  // the question in lower case contains lower case query string
  const filteredQuestion = function() {
    const result = currentQuestion.filter(oneQuestion =>
      oneQuestion.question_body.toLowerCase().includes(query.toLowerCase())
    );
    return result;
  }


  // useEffect only runs when query value is changed to prevent infinite loops
  useEffect(() => {

    cqCopy && cqCopy.length && onQueryChange()


  }, [query])

  return (
    <div className="form-center">
      <form id="formQASearch">
        <div id="searchText">
          <FaSearch />
        </div>
        <label>
          <input
            name="search"
            id="QASearch"
            type="text"
            value={query}
            placeholder="Have a question? Search for answers..."
            onChange={onFormChange}
            />
        </label>
      </form>
    </div>
  )

}

export default SearchQuestions;