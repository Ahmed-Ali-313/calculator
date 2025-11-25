import requests
import json

BASE_URL = 'http://localhost:5000/calculate'

def test_calculate(operation, num1, num2=None, expected_result=None):
    payload = {
        'operation': operation,
        'num1': num1,
        'num2': num2
    }
    try:
        response = requests.post(BASE_URL, json=payload)
        data = response.json()
        
        if response.status_code == 200:
            result = data.get('result')
            print(f"[{operation}] {num1} {num2 if num2 is not None else ''} = {result} ... ", end="")
            if expected_result is not None:
                if abs(result - expected_result) < 0.0001:
                    print("PASS")
                else:
                    print(f"FAIL (Expected {expected_result})")
            else:
                print("PASS (No expected value provided)")
        else:
            print(f"[{operation}] Failed: {data.get('error')}")
            
    except Exception as e:
        print(f"[{operation}] Error: {e}")

if __name__ == '__main__':
    print("Testing Calculator API...")
    test_calculate('add', 10, 5, 15)
    test_calculate('subtract', 10, 5, 5)
    test_calculate('multiply', 10, 5, 50)
    test_calculate('divide', 10, 5, 2)
    test_calculate('power', 2, 3, 8)
    test_calculate('sqrt', 16, expected_result=4)
    test_calculate('log', 100, expected_result=2)
    test_calculate('cbrt', 27, expected_result=3)
    test_calculate('divide', 10, 0) # Should fail
