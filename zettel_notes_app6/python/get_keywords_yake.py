# Importing libraries
# from wordcloud import WordCloud
# import matplotlib.pyplot as plt
import yake
from flask import Flask, jsonify, request, render_template, after_this_request

# Initializing the YAKE instance
# language = ""

yake_kw = yake.KeywordExtractor()
app = Flask(__name__)

class KeywordsList:
    def __init__(self, request_body, keywords):
        self.request_body = request_body
        self.keywords = keywords

@app.route('/yake', methods=['POST'])
def extract_keywords():
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    if request.method == 'POST':
        #!!!
        note_text = request.form.get('noteText')
        key_words_scored = yake_kw.extract_keywords(note_text)
        key_words_unscored = []
        for word, score in key_words_scored:
            print(word)
            key_words_unscored.append(word.lower())
        # return jsonify(key_words_unscored)
        return jsonify(key_words_unscored)
        # return jsonify(KeywordsList(note_text, key_words_unscored))
    else:
        return jsonify("An error occurred when extracting keywords at get_keywords_yake.py")
    


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)



           






# # Input text
# # input_text = '''
# # NLP stands for Natural Language Processing.
# # It is the branch of Artificial Intelligence that gives the ability to machine understand
# # and process human languages. Human languages can be in the form of text or audio format.
# # Natural Language Processing started in 1950 When Alan Mathison Turing published
# # an article in the name Computing Machinery and Intelligence.
# # It is based on Artificial intelligence. It talks about automatic interpretation and
# # generation of natural language.
# # As the technology evolved, different approaches have come to deal with NLP tasks.
# # '''

# input_text = '''
# Капиталистический способ производства имеет как общие черты с рабовладельческим и феодальным способами производства, так и существенные отличия от них. Основная общая черта — частная собственность на средства производства.  Конкретные формы этой собственности различны, но и для рабовладельческого строя, и для феодализма, и для капитализма характерно то, что средства производства принадлежат не всему обществу, а частным собственникам. Общей чертой рабовладельческой, феодальной и капиталистической формаций является и деление общества на антагонистические классы  — эксплуататоров и эксплуатируемых.
# Но каждая классово-антагонистическая формация имеет свои особенности. Основные отличия капиталистического способа производства от рабовладельческого и феодального заключаются в следующем.
# Во-первых, для капитализма характерно господство товарного производства,  тогда как докапиталистические способы производства характеризовались господством натурального хозяйства. При рабовладельческом строе и при феодализме преобладающая часть продуктов общественного труда производилась непосредственно для потребления. Напротив, при капитализме продукты, как правило, производятся для обмена.
# Во-вторых, капиталистический способ производства основан на эксплуатации наемного труда,  в то время как до капитализма имела место эксплуатация рабского или крепостного труда.
# '''

# # Extracting keywords
# KeyWords = yake_kw.extract_keywords(input_text)

# # Displaying the keywords
# print(KeyWords)
# # display(KeyWords)

# # Extracting keywords
# keywords = [kw for kw, _ in KeyWords]


