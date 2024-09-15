console.log("JS is running")

const prep_deck = document.getElementById("prep_deck")
const new_card = document.getElementById("new_card")
const btn_draw = document.getElementById("btn_draw")
const btn_load = document.getElementById("btn_load")
const card_image = document.getElementById('card_image');
let deck_id = ""

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


function draw_a_card() {
    let url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`

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
}  // END draw_a_card()


btn_draw.addEventListener("click", function(evt) {
    evt.preventDefault();
    draw_a_card()
    .then(data => {
        
        card_image.src = `${data.cards[0].image}`;
        prep_deck.innerText = "";
        console.log("New Card Drawn:", data.cards[0].value, "of", data.cards[0].suit)
        new_card.innerText += `${data.cards[0].value} of ${data.cards[0].suit}\n`;
    })
    .catch(err => {
        console.log("No deck loaded. Error:", err);
        prep_deck.innerTEXT = "No deck loaded. Error:";
    })

})  // END addEventListener


btn_load.addEventListener("click", function(evt) {
    evt.preventDefault();
    new_deck()
        .then(data => {
            console.log("New Deck Ready", data.deck_id);
            prep_deck.innerText = "New Deck Ready.";
            new_card.innerText = "";
            card_image.src = "https://deckofcardsapi.com/static/img/back.png"
            deck_id = data.deck_id;
        })
        .catch(err => {
            console.log("No deck loaded. Error:", err);
            prep_deck.innerTEXT = "No deck loaded. Error:";
        })
    })  // END addEventListener