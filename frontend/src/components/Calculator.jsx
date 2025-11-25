import React, { useState } from 'react';
import axios from 'axios';
import './Calculator.css';

const Calculator = () => {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleClick = (value) => {
        try {
            setDisplay(prev => prev + value);
            setError('');
            setResult(null);
        } catch (err) {
            console.error('Click error:', err);
        }
    };

    const handleClear = () => {
        try {
            setDisplay('');
            setResult(null);
            setError('');
        } catch (err) {
            console.error('Clear error:', err);
        }
    };

    const handleCalculate = async (operation, num1, num2 = null) => {
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await axios.post('/api/calculate', {
                operation,
                num1,
                num2
            });

            if (response && response.data && response.data.result !== undefined && response.data.result !== null) {
                const calculatedResult = response.data.result;
                setResult(calculatedResult);
                setDisplay(String(calculatedResult));
                setError('');
            } else {
                setError('Invalid response from server');
                setResult(null);
            }
        } catch (err) {
            console.error('Calculation error:', err);
            let errorMessage = 'An error occurred';

            try {
                if (err.response && err.response.data && err.response.data.error) {
                    errorMessage = err.response.data.error;
                } else if (err.message) {
                    errorMessage = err.message;
                }
            } catch (parseErr) {
                console.error('Error parsing error:', parseErr);
            }

            setError(errorMessage);
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    const handleAdvanced = (operation) => {
        try {
            const num = parseFloat(display);
            if (!isNaN(num)) {
                handleCalculate(operation, num);
            } else {
                setError('Please enter a valid number');
            }
        } catch (err) {
            console.error('Advanced operation error:', err);
            setError('Invalid input');
        }
    };

    const handleEqual = () => {
        try {
            if (!display || display.trim() === '') {
                setError('Please enter a calculation');
                return;
            }

            const operators = ['+', '-', '*', '/', '^'];
            let operator = null;
            let nums = [];

            for (let op of operators) {
                if (display.includes(op)) {
                    operator = op;
                    nums = display.split(op);
                    break;
                }
            }

            if (operator && nums.length === 2) {
                const num1 = parseFloat(nums[0]);
                const num2 = parseFloat(nums[1]);

                if (isNaN(num1) || isNaN(num2)) {
                    setError('Invalid numbers');
                    return;
                }

                let operationName = '';
                switch (operator) {
                    case '+': operationName = 'add'; break;
                    case '-': operationName = 'subtract'; break;
                    case '*': operationName = 'multiply'; break;
                    case '/': operationName = 'divide'; break;
                    case '^': operationName = 'power'; break;
                    default:
                        setError('Invalid operation');
                        return;
                }
                handleCalculate(operationName, num1, num2);
            } else {
                setError('Invalid expression');
            }
        } catch (err) {
            console.error('Equal operation error:', err);
            setError('Calculation failed');
        }
    };

    // Safe render helper
    const renderDisplay = () => {
        try {
            return display || '0';
        } catch (err) {
            return '0';
        }
    };

    const renderResult = () => {
        try {
            if (error) {
                return <span className="error">{String(error)}</span>;
            }
            if (result !== null && result !== undefined) {
                return `= ${result}`;
            }
            return '';
        } catch (err) {
            return '';
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator">
                <div className="display">
                    <div className="input">{renderDisplay()}</div>
                    <div className="result">{renderResult()}</div>
                </div>
                <div className="buttons">
                    <button onClick={handleClear} className="btn clear" disabled={loading}>AC</button>
                    <button onClick={() => handleAdvanced('cbrt')} className="btn func" disabled={loading}>∛</button>
                    <button onClick={() => handleAdvanced('sqrt')} className="btn func" disabled={loading}>√</button>
                    <button onClick={() => handleClick('/')} className="btn op" disabled={loading}>÷</button>

                    <button onClick={() => handleClick('7')} className="btn num" disabled={loading}>7</button>
                    <button onClick={() => handleClick('8')} className="btn num" disabled={loading}>8</button>
                    <button onClick={() => handleClick('9')} className="btn num" disabled={loading}>9</button>
                    <button onClick={() => handleClick('*')} className="btn op" disabled={loading}>×</button>

                    <button onClick={() => handleClick('4')} className="btn num" disabled={loading}>4</button>
                    <button onClick={() => handleClick('5')} className="btn num" disabled={loading}>5</button>
                    <button onClick={() => handleClick('6')} className="btn num" disabled={loading}>6</button>
                    <button onClick={() => handleClick('-')} className="btn op" disabled={loading}>-</button>

                    <button onClick={() => handleClick('1')} className="btn num" disabled={loading}>1</button>
                    <button onClick={() => handleClick('2')} className="btn num" disabled={loading}>2</button>
                    <button onClick={() => handleClick('3')} className="btn num" disabled={loading}>3</button>
                    <button onClick={() => handleClick('+')} className="btn op" disabled={loading}>+</button>

                    <button onClick={() => handleAdvanced('log')} className="btn func" disabled={loading}>log</button>
                    <button onClick={() => handleClick('0')} className="btn num" disabled={loading}>0</button>
                    <button onClick={() => handleClick('.')} className="btn num" disabled={loading}>.</button>
                    <button onClick={handleEqual} className="btn equal" disabled={loading}>=</button>

                    <button onClick={() => handleClick('^')} className="btn func" disabled={loading}>xʸ</button>
                </div>
                {loading && <div style={{ textAlign: 'center', marginTop: '10px', color: '#666' }}>Calculating...</div>}
            </div>
        </div>
    );
};

export default Calculator;
