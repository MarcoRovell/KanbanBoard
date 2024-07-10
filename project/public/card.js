/* The text to use when description is empty */
const NO_DESCRIPTION_TEXT = "(No description)";

export default class Card {
  constructor(title, color) {
    // get template, clone, and remove template class.
    const template = document.querySelector('.template.card');
    this.card = template.cloneNode(true);
    this.card.classList.remove('template');
    // set title
    this.title = this.card.querySelector('.title');
    this.title.textContent = title;

    // set description to no description text
    this.description = this.card.querySelector('.description');
    this.description.textContent = NO_DESCRIPTION_TEXT;
    this.isEmpty = true;

    // set background color
    this.card.style.backgroundColor = color;
    // editDescription element
    this.editDescription = this.card.querySelector('.editDescription');

    // edit Button
    this.editButton = this.card.querySelector('.edit');
    this.editButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.description.classList.add("hidden");
      if (this.isEmpty) {
        this.editDescription.textContent = "";
      } else {
        this.editDescription.textContent = this.description.textContent;
        this.isEmpty = false;
      }
      this.editDescription.classList.remove("hidden");
      this.editDescription.focus();
      this.editDescription.select();
    });

    // setting new description
    this.editDescription.addEventListener('blur', () => {
      this.setDescription(this.editDescription.value);
      this.editDescription.classList.add("hidden");
      this.description.classList.remove("hidden");
    });

    this.card.setAttribute('draggable', 'true');

    const brightness = this.getBrightness(color); // ONLY PRINTS WITH BLACK CARDS???
    // console.log(color);
    // console.log(brightness);
    if (brightness < 128) {
      // console.log(brightness);
      this.card.style.color = "#FFFFFF";
      let buttonsIMG = this.card.querySelectorAll(".buttons button img");
      for (let img of buttonsIMG) {
        img.style.filter = "invert(100%)";
      }
      // this.card.style.border = "2px solid white";
      let description = this.card.querySelector(".editDescription");
      description.style.color = "#FFFFFF";
    } else {
      this.card.style.color = "#000000";
    }

  }

  addToCol(colElem, mover) {
    this.deleteButton = this.card.querySelector('.delete');
    this.deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.deleteCard();

      if (mover.getSelectedCard()) {
        mover.cancelMove();
      }

    });




    colElem.appendChild(this.card);
    let moveButton = this.card.querySelector(".startMove");
    // for (let moveButton of moveButtons)
      moveButton.addEventListener("click", (event) => {
        event.preventDefault();
        mover.startMoving(moveButton.parentNode.parentNode);
    }); 

    this.card.addEventListener('dragstart', () => {
      // event.dataTransfer.setData('cardHTML', this.card.outerHTML);
      this.card.classList.add("moving");
    });




    if (mover.getSelectedCard()) {
      mover.cancelMove();
    }
  }

  setDescription(text) {
    if (text === NO_DESCRIPTION_TEXT) {
      this.description.textContent = NO_DESCRIPTION_TEXT;
      this.isEmpty = true;
    }
    else if (text.trim()) {
      this.description.textContent = text;
      this.isEmpty = false;
    } else {
      this.description.textContent = NO_DESCRIPTION_TEXT;
      this.isEmpty = true;
    }
  }

  setColor(color, bg) {
    // console.log(bg);
    this.card.style.color = color;
    let buttonsIMG = this.card.querySelectorAll(".buttons button img");
    const brightness = this.getBrightness(bg);
    if (brightness < 128) {
      for (let img of buttonsIMG) {
        img.style.fill = "invert(100%)";
      }
    }

    this.description.style.color = color;
    this.editDescription.style.color = color;
  }

  deleteCard() {
    this.card.remove();
  }
  
  /*https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
    Tweaked these to fit the colors defined in spec for white/black font color*/
  getBrightness(color) {  
    const r = parseInt(color.substr(1,2), 16);
    const g = parseInt(color.substr(3,2), 16);
    const b = parseInt(color.substr(5,2), 16);

    return 0.375 * r + 0.5 * g + 0.125 * b; // formula from stackOverflow
  } 
}