import React, { useReducer } from "react";
import ButtonDigit from "./ButtonDigit.js"
import ButtonOperation from "./ButtonOperation.js"
import './styles.css';


export const ACTIONS = {
	ADD_DIGIT: "add-digit",
	DELETE_DIGIT: "delete-digit",
	CHOOSE_OPERATION: "choose-operation",
	CLEAR_ALL: "clear-all",
	EVALUATE: "evaluate"
}

function reducer(state, { type, payload }) {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite) {
				return {
					...state,
					currentOperand: `${payload.digit}`,
					overwrite: false
				}
			}
			if (state.currentOperand === "0" && payload.digit === "0") {
				return state;
			}
			if (state.currentOperand === "0" && payload.digit !== ".") {
				return {
					...state,
					currentOperand: `${payload.digit}`
				}
			}
			return {
				...state,
				currentOperand: `${state.currentOperand || ""}${payload.digit}`,
			}

		case ACTIONS.DELETE_DIGIT:
			if (state.overwrite) {
				return state
			}
			if (state.currentOperand === "0") {
				return state;
			}
			if (state.currentOperand.length === 1) {
				return {
					...state,
					currentOperand: "0"
				}
			}
			return {
				...state,
				currentOperand: state.currentOperand.slice(0, -1)
			}

		case ACTIONS.CHOOSE_OPERATION:
			if (state.operation && state.currentOperand === "0") {
				return {
					...state,
					previousOperand: `${state.previousOperand.slice(0, -1)} ${payload.operation}`,
					operation: payload.operation
				}
			}
			if (state.operation && state.previousOperand && state.currentOperand) {
				return {
					...state,
					previousOperand: `${evaluate(state)} ${payload.operation}`,
					operation: payload.operation,
					currentOperand: "0"
				}
			}
			return {
				...state,
				previousOperand: `${state.currentOperand} ${payload.operation}`,
				operation: payload.operation,
				currentOperand: "0"
			}
		
		case ACTIONS.CLEAR_ALL:
			return {
				...state,
				previousOperand: null,
				opertion: null,
				currentOperand: "0"
			}

		case ACTIONS.EVALUATE:
			if (state.overwrite) {
				return state;
			}
			return {
				...state,
				previousOperand: null,
				currentOperand: evaluate(state),
				overwrite: true
			}
	}
}

function evaluate({ previousOperand, currentOperand, operation }) {
	const prev = parseFloat(previousOperand);
	const current = parseFloat(currentOperand);

	if (isNaN(prev) || isNaN(current)) return "0";

	switch (operation) {
		case "+":
			return (prev + current).toString();
			case "-":
			return (prev - current).toString();
		case "*":
			return (prev * current).toString();
		case "÷":
			return (prev / current).toString();
	}
}

function App() {

	const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: "0"})

	return (
		<div className="calculator">
			<div className="output">
				<p className="previous-operand">{previousOperand}</p>
				<p className="current-operand">{currentOperand}</p>
			</div>
			<div className="button-block">
				<button className="span-2" onClick={() => dispatch({type: ACTIONS.CLEAR_ALL})}>AC</button>
				<button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>C</button>
				<ButtonOperation operation="÷" dispatch={dispatch} />
				<ButtonDigit digit="1" dispatch={dispatch} />
				<ButtonDigit digit="2" dispatch={dispatch} />
				<ButtonDigit digit="3" dispatch={dispatch} />
				<ButtonOperation operation="*" dispatch={dispatch} />
				<ButtonDigit digit="4" dispatch={dispatch} />
				<ButtonDigit digit="5" dispatch={dispatch} />
				<ButtonDigit digit="6" dispatch={dispatch} />
				<ButtonOperation operation="-" dispatch={dispatch} />
				<ButtonDigit digit="7" dispatch={dispatch} />
				<ButtonDigit digit="8" dispatch={dispatch} />
				<ButtonDigit digit="9" dispatch={dispatch} />
				<ButtonOperation operation="+" dispatch={dispatch} />
				<ButtonDigit digit="." dispatch={dispatch} />
				<ButtonDigit digit="0" dispatch={dispatch} />
				<button className="span-2" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
			</div>
		</div>
	);
	}

export default App;
