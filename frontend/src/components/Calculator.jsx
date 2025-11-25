import React, { useState } from 'react';
import axios from 'axios';
import './Calculator.css';

const Calculator = () => {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleClick = (value) => {
        setDisplay(prev => prev + value);
        setError('');
    };

    const handleClear = () => {
        setDisplay('');
        setResult('');
        setError('');
    };

    const handleCalculate = async (operation, num1, num2 = null) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('/api/calculate', {
                operation,
                num1,
                num2
            });
            setResult(response.data.result);
            setDisplay(String(response.data.result));
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleAdvanced = (operation) => {
        const num = parseFloat(display);
        if (!isNaN(num)) {
            handleCalculate(operation, num);
        }
    };

    const handleEqual = () => {
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

            let operationName = '';
            switch (operator) {
                case '+': operationName = 'add'; break;
                case '-': operationName = 'subtract'; break;
                case '*': operationName = 'multiply'; break;
                case '/': operationName = 'divide'; break;
                case '^': operationName = 'power'; break;
                default: return;
            }
            handleCalculate(operationName, num1, num2);
        }
    };

    return (
        <div className="calculator-container">
            <div className="calculator">
                <div className="display">
                    <div className="input">{display || '0'}</div>
                    <div className="result">{error ? <span className="error">{error}</span> : (result !== '' ? `= ${result}` : '')}</div>
                </div>
                <div className="buttons">
                    <button onClick={handleClear} className="btn clear">AC</button>
                    <button onClick={() => handleAdvanced('cbrt')} className="btn func">∛</button>
                    <button onClick={() => handleAdvanced('sqrt')} className="btn func">√</button>
                    <button onClick={() => handleClick('/')} className="btn op">÷</button>

                    <button onClick={() => handleClick('7')} className="btn num">7</button>
                    <button onClick={() => handleClick('8')} className="btn num">8</button>
                    <button onClick={() => handleClick('9')} className="btn num">9</button>
                    <button onClick={() => handleClick('*')} className="btn op">×</button>

                    <button onClick={() => handleClick('4')} className="btn num">4</button>
                    <button onClick={() => handleClick('5')} className="btn num">5</button>
                    <button onClick={() => handleClick('6')} className="btn num">6</button>
                    <button onClick={() => handleClick('-')} className="btn op">-</button>

                    <button onClick={() => handleClick('1')} className="btn num">1</button>
                    <button onClick={() => handleClick('2')} className="btn num">2</button>
                    <button onClick={() => handleClick('3')} className="btn num">3</button>
                    <button onClick={() => handleClick('+')} className="btn op">+</button>

                    <button onClick={() => handleAdvanced('log')} className="btn func">log</button>
                    <button onClick={() => handleClick('0')} className="btn num">0</button>
                    <button onClick={() => handleClick('.')} className="btn num">.</button>
                    <button onClick={handleEqual} className="btn equal">=</button>

                    <button onClick={() => {
                        // Power needs two numbers. Let's implement a simple way: 
                        // User types base, clicks pow, types exponent, clicks =
                        // But our parser above only handles basic ops.
                        // Let's use a custom symbol for power in display like '^'
                        handleClick('^');
                    }} className="btn func">xʸ</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
