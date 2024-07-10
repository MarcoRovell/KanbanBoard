import Card from "./card.js";
import Mover from "./mover.js";

export default class App {
  constructor() {
    this.mover = new Mover();
    this.col_todo = document.getElementById('todo');
    this.col_doing = document.getElementById('doing');
    this.col_done = document.getElementById('done');

      // HTML form submission 
    const form = document.getElementById('addCard');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = document.getElementById('cardTitle').value;
      const color = document.getElementById('cardColor').value;
      // console.log(color);
      this.addCard("todo", title, color);

      form.reset();
    });



    // loop through each column and collect necessary 
    // info (background color, description, title)
    // ALSO: create an index, and store this in the object
    // put it all into a JSON object and then run .stringify() on it
    window.addEventListener("beforeunload", () => { 
      let cards_todo = this.col_todo.querySelectorAll(".card");
      let cards_doing = this.col_doing.querySelectorAll(".card");
      let cards_done = this.col_done.querySelectorAll(".card");

      const todo_arr = [];
      for (let card of cards_todo) {
        const title = card.querySelector(".title").textContent;
        const description = card.querySelector(".description").textContent;
        const bgColor = this.rgbToHex(card.style.backgroundColor);
        const color = this.rgbToHex(card.style.color);
        todo_arr.push({title: title, desc: description, bg: bgColor, color: color });
      }
      localStorage.setItem("todo_cards", JSON.stringify(todo_arr));

      const doing_arr = [];
      for (let card of cards_doing) {
        const title = card.querySelector(".title").textContent;
        const description = card.querySelector(".description").textContent;
        const bgColor = this.rgbToHex(card.style.backgroundColor);
        const color = this.rgbToHex(card.style.color);
        doing_arr.push({title: title, desc: description, bg: bgColor, color: color });
      }
      localStorage.setItem("doing_cards", JSON.stringify(doing_arr));

      const done_arr = [];
      for (let card of cards_done) {
        const title = card.querySelector(".title").textContent;
        const description = card.querySelector(".description").textContent;
        const bgColor = this.rgbToHex(card.style.backgroundColor);
        const color = this.rgbToHex(card.style.color);
        done_arr.push({title: title, desc: description, bg: bgColor, color: color });
      }
      localStorage.setItem("done_cards", JSON.stringify(done_arr));
    });

    window.addEventListener("load", () => {
      const todo_cards = JSON.parse(localStorage.getItem("todo_cards"));
      const doing_cards = JSON.parse(localStorage.getItem("doing_cards"));
      const done_cards = JSON.parse(localStorage.getItem("done_cards"));

      for (let card of todo_cards) {
        let newCard = this.addCard("todo", card.title, card.bg);
        newCard.setDescription(card.desc);
        newCard.setColor(card.color, card.bg);        
      }

      for (let card of doing_cards) {
        let newCard = this.addCard("doing", card.title, card.bg);
        newCard.setDescription(card.desc);
        newCard.setColor(card.color, card.bg);

      }

      for (let card of done_cards) {
        let newCard = this.addCard("done", card.title, card.bg);
        newCard.setDescription(card.desc);

        newCard.setColor(card.color, card.bg);
      }
    });

  }

  //https://learnersbucket.com/examples/interview/convert-rgb-to-hex-color-in-javascript/
  
/*https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
inspiration for this function*/ 
  rgbToHex(color) { 
    const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');
    return `#${hexR}${hexG}${hexB}`;
  }


  addCard(col, title, color) {
    // console.log(color);
    let card = new Card(title, color);
    const column = document.getElementById(col);

    // card.classList.add("moving");

    card.addToCol(column, this.mover);
    return card;
  }

  addDropListeners(column) {
    column.addEventListener('dragover', (event) => {
        event.preventDefault(); 
    });

    column.addEventListener('drop', (event) => {
        event.preventDefault();
        const cardHTML = document.getElementsByClassName("moving");
        column.appendChild(cardHTML[0]);

        cardHTML[0].classList.remove("moving");
        this.mover.stopMoving(event);
    });
  }


}