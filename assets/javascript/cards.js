
let card_data = [
    {
        'name': 'coins',
        'image': 'coins.png' 
    },
    {
        'name': 'cherry',
        'image': 'cherry.png'
    },
    {
        'name': 'seven',
        'image': 'seven.png'
    },
    {
        'name': 'ace',
        'image': 'ace.png'
    },
    {
        'name': 'jackpot',
        'image': 'jackpot.png'
    },
    {
        'name': 'lemon',
        'image': 'lemon.png'
    },
    {
        'name': 'melon',
        'image': 'melon.png'
    },
    {
        'name': 'bells',
        'image': 'bells.png'
    }
];
function buildCards() {
    /*in build cards*/
    card_data.forEach(function (card, index) {
        document.getElementById('card_wrapper').insertAdjacentHTML('afterend',
            '<div class="card">'+
            '  <div class="card-back card-face">' +
            '    <img class="dice dice-top-left" src="assets/images/dice.png" alt="card imagery dice">'+
            '    <img class="dice dice-top-right" src="assets/images/dice.png" alt="card imagery dice">'+
            '    <img class="dice dice-bottom-left" src="assets/images/dice.png" alt="card imagery dice">'+
            '    <img class="dice dice-bottom-right" src="assets/images/dice.png" alt="card imagery dice">'+
            '    <img class="chip" src="assets/images/chip.png" alt="card">'+
            '  </div> ' +
            '  <div class="card-front card-face">' +
            '     <img class="dice dice-top-left" src="assets/images/dice.png" alt="card imagery dice">'+
            '     <img class="dice dice-top-right" src="assets/images/dice.png" alt="card imagery dice">'+
            '     <img class="dice dice-bottom-left" src="assets/images/dice.png" alt="card imagery dice">'+
            '     <img class="dice dice-bottom-right" src="assets/images/dice.png" alt="card imagery dice">'+
            '     <img class="win-card" src="assets/images/' +  card['image'] + '" alt="card">'+
            '  </div>' +
            '</div>' +
            '<div class="card">' +
            '   <div class="card-back card-face">' +
            '      <img class="dice dice-top-left" src="assets/images/dice.png" alt="card imagery dice">'+
            '      <img class="dice dice-top-right" src="assets/images/dice.png" alt="card imagery dice">'+
            '      <img class="dice dice-bottom-left" src="assets/images/dice.png" alt="card imagery dice">'+
            '      <img class="dice dice-bottom-right" src="assets/images/dice.png" alt="card imagery dice">'+
            '      <img class="chip" src="assets/images/chip.png" alt="card">'+
            '   </div>' +
            '   <div class="card-front card-face">' +
            '      <img class="dice dice-top-left" src="assets/images/dice.png" alt="card imagery dice">'+
            '      <img class="dice dice-top-right" src="assets/images/dice.png" alt="card imagery dice">'+
            '      <img class="dice dice-bottom-left" src="assets/images/dice.png" alt="card imagery dice">'+
            '      <img class="dice dice-bottom-right" src="assets/images/dice.png" alt="card imagery dice">'+
            '      <img class="win-card" src="assets/images/' +  card['image'] + '" alt="card">'+
            '   </div>' +
            '</div>'
        );
    });
}