console.log("JS is running")

prep_deck = document.getElementById("prep_deck")

function new_deck() {
    let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

    return new Promise((resolve, reject) => {
        axios
        .get(url, {
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
}  // END new_deck()

new_deck()
    .then(data => {
        console.log("New Deck Ready", data.deck_id)
        prep_deck.innerText = "New Deck Ready.";
    })
    .catch(err => {
        console.log("No deck loaded. Error:", err);
        prep_deck.innerTEXT = "No deck loaded. Error:";
    })