import React from 'react'
import { ACTIONS } from "./App.js"


function ButtonDigit({ digit, dispatch }) {
  return (
	<button
		  onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
	>
		{digit}
	</button>
  )
}

export default ButtonDigit