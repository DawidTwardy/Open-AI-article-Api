import fs from 'fs';          
import fetch from 'node-fetch'; 

const apiKey = "Klucz Do Sztucznej OpenAI";  


function readFileAndPreparePrompts(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        
        const lines = data.split('\n').map(line => line.trim()).filter(line => line !== '');
        const prompts = [];

        
        for (let i = 0; i < lines.length; i += 2) {
          const header = lines[i];       
          const content = lines[i + 1];  

          if (header && content) {
           
            prompts.push({ header, content });
          }
        }

        resolve(prompts);
      }
    });
  });
}


async function sendToOpenAI(header, content) {
  try {
   
    const modifiedPrompt = `Chcę stworzyć wpis na bloga o następującym tytule: ${header}, z treścią:\n${content}\n
                            Proszę wygenerować artykuł w formacie HTML, spełniając poniższe wytyczne:
                              1. Użyj znacznika <article> jako głównego kontenera artykułu.
                              2. Umieść tytuł wpisu w znaczniku <h2>.
                              3. Treść artykułu umieść w kontenerze <div>, a nagłówki sekcji w znacznikach <h3>.
                              4. Samodzielnie określ, gdzie najlepiej wstawić obrazki, aby dobrze się komponowały na stronie. Wstaw obrazki w odpowiednich miejscach, używając tagu <img> z atrybutem src="image_placeholder.jpg ".
                              5. Każdy obrazek i odpowiadający mu tekst mają być wycentrowane, ustawione w jednej linii, z obrazkiem po lewej stronie, a tekstem po prawej. 
                              6. **Przypisz klasę "image" do elementów <img>.**
                              7. **Przypisz klasę "dalle-text" do tekstu "wpisz w DALL-E, aby wygenerować zdjęcie".**
                              8. Dodaj atrybut alt do każdego obrazka, zawierający dokładny prompt do grafiki, ale nie powielaj tego promptu jako tekstu na stronie.
                              9. **Przypisz klasę "image-container" do kontenera zawierającego obrazek i tekst.**  
                              10.**Pamiętaj,aby zawsze pod obrazkiem dać   "wpisz w DALL-E, aby wygenerować zdjęcie",ale nie powielaj go,jeśli już jest.**
                            Wygenerowany kod ma zawierać tylko zawartość artykułu, bez dodatkowych elementów strukturalnych HTML ani komentarzy.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: modifiedPrompt }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data && data.choices && data.choices[0]) {
      return data.choices[0].message.content.trim();
    } else {
      console.error('Brak oczekiwanych danych w odpowiedzi:', data);
      return 'Brak odpowiedzi od AI.';
    }
  } catch (error) {
    console.error("Błąd komunikacji z API:", error);
    return 'Wystąpił błąd podczas wysyłania zapytania.';
  }
}


function cleanHtmlResponse(response) {
  return response.replace(/```html|```/g, '').trim();
}


function saveResultsToText(results, filePath) {
  const outputContent = results.map(result => `

 ${cleanHtmlResponse(result.response)}

`).join('\n');


  fs.promises.unlink(filePath)
    .catch(() => {  })
    .finally(() => {
      fs.promises.writeFile(filePath, outputContent, 'utf8')
        .then(() => console.log(`Wyniki zapisano do pliku ${filePath}`))
        .catch(err => console.error('Błąd podczas zapisywania pliku:', err));
    });
    
}


async function processFile(filePath) {
  let i=1;
  try {
    const prompts = await readFileAndPreparePrompts(filePath);
    const results = [];

    for (const { header, content } of prompts) {
      console.log("Wysyłam zapytanie  nr. "+i+" do sztucznej inteligencji");
      const aiResponse = await sendToOpenAI(header, content);
      results.push({ header, content, response: aiResponse });
      i++;
    }

    saveResultsToText(results, 'artykul.html');
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
}


processFile('./testy.txt');
