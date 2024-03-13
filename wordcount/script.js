let textArea = document.getElementById("input");
let wordCount = document.getElementById("wordCount");
let wordCountWithoutQuotes = document.getElementById("wordCountWithoutQuotes");

updateWordCount();

function updateWordCount() {
    let text = textArea.value;
    const quoteArray = text.split(/["“”]/);
    let total = 0;
    for (let i = 0; i < quoteArray.length; i += 2) {
        total += getWordCount(quoteArray[i]);
    }
    wordCount.innerHTML = `Word count: ${getWordCount(text)}`;
    wordCountWithoutQuotes.innerHTML = `Word count without quotations: ${total}`;
}

function getWordCount(words) {
    words = words.replaceAll("\r", " ");
    words = words.replaceAll("\n", " ");
    const wordArray = words.split(" ");
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i] == "" || wordArray[i] == "-" || wordArray[i] == "–" || wordArray[i] == ",") { wordArray.splice(i, 1); i--; }
    }
    return wordArray.length;
}
