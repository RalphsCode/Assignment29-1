console.log("JS is running.")

// Get the form elements
const form = document.getElementById("fav_num_form");

const favNum = document.getElementById("fav_num");
const btnSubmit = document.getElementById("btn_fav_num");
const favNumberText = document.getElementById("fav_number_text");
const favNumberFact = document.getElementById("fav_number_fact");

// Add event listener to the submit button
btnSubmit.addEventListener("click", function(evt) {
    evt.preventDefault();
    // Get the entered number
    const num = favNum.value;
    // Write the number to the DOM
    favNumberText.innerHTML = `<p>Number: ${num}</p>`;

    // Make API Call
    getFacts(num)
        /* Calls a Promise to get the API data */
        .then(data => {
            favNumberFact.innerHTML = `<p>Number Fact: ${data.text}</p>`;
            })
        .catch(error => {
            console.error(`Promise Failed: ${error}`);   
            });
    } )    // END addEventListener 


function getFacts(num) {
    /* Make a promise to get the API data using Axios */
    let baseURL = "http://numbersapi.com";

    return new Promise((resolve, reject) => {
        axios
        .get(`${baseURL}/${num}/trivia?notfound=floor&json`, {
            headers: {
            'Content-Type': 'application/json'
            }
        } )
        .then(resp => {
            console.log("Promise completed successfully");
            resolve(resp.data);			
        })
        .catch(err => {
            console.log(`Oops, there was a problem, promise not completed. Error:( ${err}`);
            reject(err);
     } );
        });
        
    }  // END getFacts()