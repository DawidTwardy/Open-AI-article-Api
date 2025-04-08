
# How to Run

1. Download the project and open the folder in Visual Studio Code (VSC).
2. Open the terminal in VSC and run the following command:
   ```bash
   node app.js

The terminal will display information about the task number currently being executed.

# Description
 app.js

        Importing Dependencies:
        We import fs and node-fetch to handle file operations and API requests to OpenAI.
    
        API Key:
        A constant is defined to store the API key used to authenticate requests to OpenAI.
    
        readFileAndPreparePrompts(filePath):
        This function reads a text file specified in the filePath variable, removes any empty lines, and creates an array of objects containing {header, content}. This structure helps in generating better prompts for OpenAI. The function returns the processed array of objects.
    
        sendToOpenAI(header, content):
        This function takes the separated header and content objects and formats them into a detailed prompt for ChatGPT. It sends the modified prompt to OpenAI's GPT-3.5-turbo API. The function handles potential issues such as missing data in the response or API communication errors. If successful, it returns the response from OpenAI.
    
        cleanHtmlResponse(response):
        This function cleans up the HTML response by removing the "```html" tag and unnecessary spaces.
    
        saveResultsToText(results, filePath):
        This function iterates over the results array, applies cleanHtmlResponse(response) to each item, and concatenates them into a single text string. It then writes this string to a file named artkul.html. Before saving the new version, it deletes the old version of the file.
    
        processFile(filePath):
        The main function that accepts a file with source data. It uses the functions described above to read the file, send the data to OpenAI, modify the received data, and save the results to a file.
    
        To run the program, call processFile(testy.txt), where testy.txt is the source file containing the data.

# HTML Files

  szablon.html:
    A simple HTML page that dynamically loads the CSS to visualize how the articles will look on the webpage.

 podglad.html:
    This file loads articles from artkul.html. It includes error handling in case the file fails to load. It processes the artkul.html file, recognizing new articles based on the separation of at least four newline characters. The function loadArticleFromFil is used to load the articles after the page has fully loaded.

# Tech Stack

   1. Node.js: JavaScript runtime used to run the app.
   2. fs (File System): Node.js module for handling file operations.
   3. node-fetch: A module used to make HTTP requests to the OpenAI API.
   4. OpenAI API: Used to generate responses based on prompts sent to GPT-3.5-turbo.
   5. HTML/CSS: For building and styling the frontend pages.

# Author

This project was developed by Dawid Twardy.

