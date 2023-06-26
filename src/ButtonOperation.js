import React from 'react'
import { ACTIONS } from "./App.js";

function ButtonOperation({ operation, dispatch }) {
  return (
		<button
			onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}
		>
			{operation}
		</button>
  )
}

export default ButtonOperation