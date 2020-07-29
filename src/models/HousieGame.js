import { Random } from "random-js";

class HousieGame {
  constructor(id, name , drawn = [], createdAt = new Date) {
    this._id = id || window.randomId();
    this.name = name;
    this.drawn = drawn;
    this.createdAt = createdAt;
    this._engine = new Random();

    this._numbers = [];

    for(var i =1 ; i <= 90; i++) {
        if(!(i in this.drawn)) this._numbers.push(i);
    }
  }

  draw() {
    if(this._numbers.length == 0) throw "Error: Game is complete!!!"

    var picked = this._engine.pick(this._numbers);
    this._numbers = this._numbers.filter(function (num) {
        return num != picked;
    });
    this.drawn.push(picked);
    return picked;
  }

  numbersDrawn() {
    return this.drawn.length;
  }

  numbersLeft() {
    return this._numbers.length;
  }

  createdAtReadable() {
    if(this.createdAt instanceof Date) return this.createdAt.toLocaleString();
    return "";
  }

  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      drawn: this.drawn,
      createdAt: this.createdAt
    }
  }
}

export default HousieGame;
