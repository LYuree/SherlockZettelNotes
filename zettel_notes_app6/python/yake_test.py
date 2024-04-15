# Importing libraries 
# from wordcloud import WordCloud 
# import matplotlib.pyplot as plt 
import yake 
  
# Initializing the YAKE instance 
yake_kw = yake.KeywordExtractor() 
  
# Input text 
input_text = ''' 
NLP stands for Natural Language Processing. 
It is the branch of Artificial Intelligence that gives the ability to machine understand  
and process human languages. Human languages can be in the form of text or audio format. 
Natural Language Processing started in 1950 When Alan Mathison Turing published  
an article in the name Computing Machinery and Intelligence.  
It is based on Artificial intelligence. It talks about automatic interpretation and  
generation of natural language. 
As the technology evolved, different approaches have come to deal with NLP tasks. 
'''
  
# Extracting keywords 
KeyWords = yake_kw.extract_keywords(input_text) 
  
# Displaying the keywords 
print(KeyWords) 
# for word in KeyWords:
    # print(f"{word}\n")
  
# Extracting keywords 
keywords = [kw for kw, _ in KeyWords] 
# for word in keywords:
    # print(f"{word}")

  
# Generate WordCloud 
# wordcloud = WordCloud().generate(' '.join(keywords)) 
  
# Display the WordCloud 
# plt.figure(figsize=(10, 10)) 
# plt.imshow(wordcloud, interpolation='bilinear') 
# plt.axis('off') 
# plt.show()