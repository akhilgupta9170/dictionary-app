const wordInput = document.querySelector('#wordInput');
const submitBtn = document.querySelector('#submitBtn');
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const word = wordInput.value.trim();
    getWords(word);
});

async function getWords(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        if (data.length === 0) {
            throw new Error('No results found');
        }

        displayWordInfo(data);
    } catch (err) {
        console.error("Error fetching", err);
        const wordDefinition = document.querySelector('#word-definition');
        wordDefinition.innerHTML = `<p>Error: ${err.message}</p>`;
    }
}

function displayWordInfo(data) {
    const wordDefinition = document.querySelector('#word-definition');
    wordDefinition.innerHTML = ""; // Clear previous results

    const wordMeaning = document.createElement('h2');
    wordMeaning.textContent = `Meaning: ${data[0].meanings[0].partOfSpeech}`;
    wordDefinition.appendChild(wordMeaning);

    const wordExamples = document.createElement('ul');
    data[0].meanings[0].definitions.forEach(def => {
        const exampleItem = document.createElement('li');
        exampleItem.textContent = def.definition;
        wordExamples.appendChild(exampleItem);
        if (def.example) {
            const exampleText = document.createElement('p');
            exampleText.textContent = `Example: ${def.example}`;
            exampleText.classList.add('example');
            wordExamples.appendChild(exampleText);
        }
    });

    wordDefinition.appendChild(wordExamples);
}
