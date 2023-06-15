class Item {
  constructor(playfield, kitten, top, itemsOnScreen) {
    this.playfield = playfield;
    this.width = 50;
    this.height = 50;
    this.left = 990; // Initialize the obstacle to the right of the playfield
    this.top = top;
    this.kitten = kitten;
    this.itemsOnScreen = itemsOnScreen;

    // this.playfield = playfield;
    // this.gameplay = gameplay;
    // this.score = 0;
    // this.lives = 3;
    // this.left = 80;
    // this.initialTop = 400;
    // this.top = this.initialTop;
    // this.width = 88;
    // this.initialHeight = 76;
    // this.height = this.initialHeight;
    // this.crounchedHeight = 52;

    this.element = document.createElement("div");
    this.element.className = "item";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.background = "black";
    this.element.style.top = `${this.top}px`;
    this.playfield.appendChild(this.element);

    this.moveInterval = setInterval(() => this.update(), 20); // its calling the this.move() function every 20 miliseconds
  }
  update() {
    this.move();

    // If the kitten collides with an item
    this.collisionsGameActions();
  }

  move() {
    this.left -= 1; // decreasing 1px to the left --- moving the object

    if (this.left <= 0 - this.width) {
      this.destroy();
    } else {
      this.element.style.left = `${this.left}px`;
    }
  }

  collisionsGameActions() {
    const collidesChecking = this.kitten.checkCollidesWith(this);

    if (collidesChecking) {
      if (this instanceof Vacuum || this instanceof AngryLady) {
        // Vacuum and AngryLady collidem com o gatinho
        this.kitten.decreaseLives();
        this.destroy();
      } else if (this instanceof Snacks) {
        // Snacks colidem com o gatinho, aumenta as vidas
        this.kitten.changingScore();
        this.destroy();
      }
    } else {
      if (
        (this instanceof Vacuum || this instanceof AngryLady) &&
        this.left + this.width < this.kitten.left
      ) {
        // Vacuum ou AngryLady estão à esquerda do gatinho sem colidir, aumenta o score
        this.kitten.changingScore();
        this.destroy();
      }
    }
  }

  destroy() {
    clearInterval(this.moveInterval); // Limpa o intervalo de atualização de movimento

    //this.gameplay.itemsOnScreen.splice(index, 1); // Remove o item da lista

    this.element.remove();
  }
}
class Vacuum extends Item {
  constructor(playfield, kitten, top, itemsOnScreen) {
    super(playfield, kitten, 400, itemsOnScreen); // Chama o construtor pai com o valor atualizado de 'top'
    this.element.style.background = "red";
  }
  update() {
    super.update(); // Call the parent's update method
  }
}

class Snacks extends Item {
  constructor(playfield, kitten, top, itemsOnScreen) {
    super(playfield, kitten, 440, itemsOnScreen); // Chama o construtor pai com o valor atualizado de 'top'
    this.element.style.background = "pink";
  }
  update() {
    super.update(); // Call the parent's update method
  }
}
class AngryLady extends Item {
  constructor(playfield, kitten, top, itemsOnScreen) {
    super(playfield, kitten, 360, itemsOnScreen); // Chama o construtor pai com o valor atualizado de 'top'
    this.element.style.backgroundImage = "";
  }

  update() {
    super.update(); // Call the parent's update method
  }
}