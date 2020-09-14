
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
    let cards_elem = $('.card_wrapper');
    card_data.forEach(function (card, index) {
        let card_pair =
            '<div class="card">'+
            '  <div class="card-back card-face">' +
            '    <img class="dice dice-top-left" src="assets/images/dice.png">'+
            '    <img class="dice dice-top-right" src="assets/images/dice.png">' +
            '    <img class="dice dice-bottom-left" src="assets/images/dice.png">' +
            '    <img class="dice dice-bottom-right" src="assets/images/dice.png">' +
            '    <img class="chip" src="assets/images/chip.png">' +
            '  </div> ' +
            '  <div class="card-front card-face">' +
            '     <img class="dice dice-top-left" src="assets/images/dice.png">' +
            '     <img class="dice dice-top-right" src="assets/images/dice.png">' +
            '     <img class="dice dice-bottom-left" src="assets/images/dice.png">' +
            '     <img class="dice dice-bottom-right" src="assets/images/dice.png">' +
            '     <img class="win-card" src="assets/images/' +  card['image'] + '">' +
            '  </div>' +
            '</div>' +
            '<div class="card">' +
            '   <div class="card-back card-face">' +
            '      <img class="dice dice-top-left" src="assets/images/dice.png">' +
            '      <img class="dice dice-top-right" src="assets/images/dice.png">' +
            '      <img class="dice dice-bottom-left" src="assets/images/dice.png">' +
            '      <img class="dice dice-bottom-right" src="assets/images/dice.png">' +
            '      <img class="chip" src="assets/images/chip.png">' +
            '   </div>' +
            '   <div class="card-front card-face">' +
            '      <img class="dice dice-top-left" src="assets/images/dice.png">' +
            '      <img class="dice dice-top-right" src="assets/images/dice.png">' +
            '      <img class="dice dice-bottom-left" src="assets/images/dice.png">' +
            '      <img class="dice dice-bottom-right" src="assets/images/dice.png">' +
            '      <img class="win-card" src="assets/images/' +  card['image'] + '">' +
            '   </div>' +
            '</div>';
        //cards_elem.append(card_pair);
        $(".card_wrapper" ).insertAfter(card_pair);
    });
}