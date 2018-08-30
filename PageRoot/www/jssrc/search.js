"use strict";

let splitSentences = function(text, delimiter) {
    // Split a paragraph to an array of sentences
    let sentences = [];

    let parts = text.split(delimiter);

    parts = parts.filter(function(part) {
        return part.trim();
    }, parts);

    sentences = sentences.concat(parts.map(function(part) {
        return part.trim() + delimiter;
    }));

    return sentences;
};

let dedupKeywords = function(arr) {
    // return a copy of array, without duplicates
    let result = [];
    let kwSet = new Set();

    arr.map(function(keyword) {
        let lowerKeyword = keyword.toLocaleLowerCase();
        if (!kwSet.has(lowerKeyword)) {
            kwSet.add(lowerKeyword);
            result.push(keyword);
        }
    });
    return result;
};

let sortKeywordsByLength = function(arr) {
    // in order to maximize the keywords which can get highlighted
    // Keywords need to be sorted in descending order by length.
    let copy = [].concat(arr);
    copy.sort(function(kw1, kw2) {
        return kw2.length - kw1.length;
    });
    return copy;
};

let sortSearchResults = function(keywords, results) {
    // sort results to make headers to go first
    let movedAheads = [];
    let notMovedAheads = [];
    for (let result of results) {
        let moveAhead = false;
        let anchorText = result.anchorText;
        FindKeyword: for (let keyword of keywords) {
            if (anchorText.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) >= 0) {
                moveAhead = true;
                break FindKeyword;
            }
        }
        if (moveAhead) {
            movedAheads.push(result);
        } else {
            notMovedAheads.push(result);
        }
    }
    return [].concat(movedAheads).concat(notMovedAheads);
};

if (typeof exports !== "undefined") {
    exports.dedupKeywords = dedupKeywords;
    exports.splitSentences = splitSentences;
    exports.sortKeywordsByLength = sortKeywordsByLength;
    exports.sortSearchResults = sortSearchResults;
}