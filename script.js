function fetchDefinition() {
    var word = document.getElementById("wordInput").value;
    var url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word;
    if (!word) {
        alert("Please enter the word");
        return; // stop execution if word is not provided
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        var meanings = data[0].meanings;
       
        // Extracting definition
        var definition = meanings[0].definitions[0].definition;
        document.getElementById("definition").innerHTML = `<b>Definition: <i>${definition}</i></b>`;
       
        // Extracting synonyms
        if (meanings[0].definitions[0].synonyms) {
            var synonyms = meanings[0].definitions[0].synonyms.join(", ");
            document.getElementById("synonyms").innerText = "Synonyms: " + synonyms;
        } else {
            document.getElementById("synonyms").innerText = "Synonyms: Not available";
        }

        // Extracting phonetic word
        var phonetic = meanings[0].phonetics[0].text;
        document.getElementById("phonetic").innerHTML = `<b>Phonetic: <i>  ${phonetic}</i> <b>`;
       
        // Extracting audio pronunciation
        if (data[0].phonetics && data[0].phonetics[0].audio) {
            var audioUrl = data[0].phonetics[0].audio;
            var audioElement = document.createElement("audio");
            audioElement.src = audioUrl;
            audioElement.controls = true;
            document.getElementById("audio").innerHTML = "";
            document.getElementById("audio").appendChild(audioElement);
        } else {
            document.getElementById("audio").innerText = "Audio: Not available";
        }      
       
        // Clearing input value
        document.getElementById("wordInput").value = "";
    })
    .catch(error => {
        console.log("Error fetching definition:", error);
        document.getElementById("definition").innerText = "Failed to fetch definition.";
    });
}
