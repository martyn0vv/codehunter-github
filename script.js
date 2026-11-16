// grab the title and then never use it. emotional support variable
const title = document.querySelector("h1");
// grab the button, search box and place for the results
const button = document.querySelector("#Button");
const input = document.querySelector("#Input");
const result = document.querySelector("#result");

// do the search when i click the button
button.addEventListener("click" , function() {
    // take whatever i typed
    let text = input.value;
    // ask github for 3 repos. encode the text so it fits in the url
    fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(text)}&per_page=3`)
    // turn the response into js data
    .then(response => response.json())
    .then(data => {
       // throw out the old results
       result.innerHTML = "";
        // no repos? say that
        if (data.items.length === 0) {
            result.innerHTML = "<p>No repositories found.</p>";
        } else {
            // make a little box for each repo
            data.items.forEach(repo => {
                const repoElement = document.createElement("div");
                // dump the name, description and link into html. trust issues later
                repoElement.innerHTML = `
                    <h2>${repo.name}</h2>
                    <p>${repo.description || "No description available."}</p>
                    <a href="${repo.html_url}" target="_blank">View Repository</a>
                `;
                // put the box on the page
                result.appendChild(repoElement);
            });
        }
    });
    // no error handling here. github please behave
});

