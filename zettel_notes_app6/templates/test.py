# app.py
from flask import Flask, jsonify, request, render_template, after_this_request
app = Flask(__name__)

@app.route('/')
def greet():
    return "Hello World!"

@app.route('/hello', methods=['GET', 'POST'])
def hello():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return 'OK', 200

    # GET request
    else:
        
        message = {'greeting':'Hello from Flask!'}
        return jsonify(message)  # serialize and use JSON headers

@app.route('/test')
def test_page():
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)