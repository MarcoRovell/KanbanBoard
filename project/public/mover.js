/* Text to add to the move here button */
const MOVE_HERE_TEXT = "— Move here —";

export default class Mover {
  constructor() {
    this.selectedCard = null;
    this.moveHereButton = document.createElement("button");
    this.moveHereButton.textContent = MOVE_HERE_TEXT;
    this.moveHereButton.classList.add("moveHere");
    this.isMoving = false;
  }


  // But note that stopMoving may be called when 
  // no card is selected and no move here buttons 
  // exist (in which case it should do nothing).\
  startMoving(card) {
    this.cancelMove(card); // sanity check

    this.selectedCard = card;

    if (!this.selectedCard || this.isMoving === true) {
      return;
    }

    // create Node Lists of all columnTitle's and Cards
    let cardList = document.querySelectorAll(".card:not(.moving):not(.template)");
    let colTitleList = document.querySelectorAll(".columnTitle");

    card.classList.add("moving");
    this.isMoving = true;

    // loop through both lists and create a new moveHere button Node, add eventListener
    for (let card of cardList) {
      const newButton = this.moveHereButton.cloneNode(true);
      newButton.addEventListener("click", (event) => {  
        this.stopMoving(event);
      });
      card.after(newButton);
    }

    for (let cols of colTitleList) {
      const newButton = this.moveHereButton.cloneNode(true);
      newButton.addEventListener("click", (event) => {
        this.stopMoving(event);
      });
      cols.after(newButton);
    }
  }

  stopMoving(event) {
    if (!this.selectedCard) {
      return;
    }

    this.isMoving = false;

    const moveHereButton = event.currentTarget;
    const newPosition = moveHereButton.parentNode;
    newPosition.insertBefore(this.selectedCard, moveHereButton);


    const moveHereButtons = document.querySelectorAll('.moveHere');
    for (let button of moveHereButtons) {
        button.remove();
    }

    this.selectedCard.classList.remove("moving");
    this.selectedCard = null;

    this.isMoving = false;

    // currentTarget() should be usefull
    // remove moveHereButtons
    // move card selected through this.selectedCard
    // remove "moving" class from card
    // NEED TO MAKE IT SO OTHER BUTTONS CAN NOT BE PRESSED i.e. canceling out of moving card
  }

  getSelectedCard() {
    return this.selectedCard;
  }

  cancelMove(card) {
    if (!this.selectedCard || this.selectedCard === card) {
        return;
    }

    this.selectedCard.classList.remove("moving");
    this.selectedCard = null;
    this.isMoving = false;

    const moveHereButtons = document.querySelectorAll('.moveHere');
    for (let button of moveHereButtons) {
        button.remove();
    }
  }
}
