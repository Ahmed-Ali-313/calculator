from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        operation = data.get('operation')
        
        if not operation:
            return jsonify({'error': 'No operation specified'}), 400
        
        try:
            num1 = float(data.get('num1')) if data.get('num1') is not None else 0
            num2 = float(data.get('num2')) if data.get('num2') is not None else 0
        except (ValueError, TypeError) as e:
            return jsonify({'error': 'Invalid number format'}), 400

        result = None
        error = None

        try:
            if operation == 'add':
                result = num1 + num2
            elif operation == 'subtract':
                result = num1 - num2
            elif operation == 'multiply':
                result = num1 * num2
            elif operation == 'divide':
                if num2 == 0:
                    error = 'Cannot divide by zero'
                else:
                    result = num1 / num2
            elif operation == 'power':
                result = math.pow(num1, num2)
            elif operation == 'sqrt':
                if num1 < 0:
                    error = 'Cannot calculate square root of negative number'
                else:
                    result = math.sqrt(num1)
            elif operation == 'log':
                if num1 <= 0:
                    error = 'Logarithm defined only for positive numbers'
                else:
                    result = math.log10(num1)
            elif operation == 'cbrt':
                # Use cube root formula instead of math.cbrt for compatibility
                result = num1 ** (1/3) if num1 >= 0 else -((-num1) ** (1/3))
            else:
                error = 'Invalid operation'
        except Exception as e:
            error = f'Calculation error: {str(e)}'

        if error:
            return jsonify({'error': error}), 400
        
        return jsonify({'result': result}), 200
        
    except Exception as e:
        # Catch any unexpected errors
        return jsonify({'error': f'Server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
