import json

def handler(request):
    try:
        # Vercel passes the raw request body as a string
        data = json.loads(request.body)
        operation = data.get('operation')
        num1 = float(data.get('num1')) if data.get('num1') is not None else 0
        num2 = float(data.get('num2')) if data.get('num2') is not None else 0
        if not operation:
            return {
                'statusCode': 400,
                'body': json.dumps({'error': 'No operation specified'})
            }
        # Perform calculation
        if operation == 'add':
            result = num1 + num2
        elif operation == 'subtract':
            result = num1 - num2
        elif operation == 'multiply':
            result = num1 * num2
        elif operation == 'divide':
            if num2 == 0:
                return {'statusCode': 400, 'body': json.dumps({'error': 'Cannot divide by zero'})}
            result = num1 / num2
        elif operation == 'power':
            result = num1 ** num2
        elif operation == 'sqrt':
            if num1 < 0:
                return {'statusCode': 400, 'body': json.dumps({'error': 'Cannot calculate square root of negative number'})}
            result = num1 ** 0.5
        elif operation == 'log':
            if num1 <= 0:
                return {'statusCode': 400, 'body': json.dumps({'error': 'Logarithm defined only for positive numbers'})}
            import math
            result = math.log10(num1)
        elif operation == 'cbrt':
            result = num1 ** (1/3) if num1 >= 0 else -((-num1) ** (1/3))
        else:
            return {'statusCode': 400, 'body': json.dumps({'error': 'Invalid operation'})}
        return {'statusCode': 200, 'body': json.dumps({'result': result})}
    except Exception as e:
        return {'statusCode': 500, 'body': json.dumps({'error': f'Server error: {str(e)}'})}
