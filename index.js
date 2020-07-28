class HousieGame {
    constructor(id, name , drawn = []) {
        this._id = id || Math.random().toString(36);
        this.name = name;
        this._engine = new Random();
        this.drawn = drawn;

        this._numbers = [];

        for(var i =1 ; i <= 90; i++) {
            if(!(i in this.drawn)) this._numbers.push(i);
        }
    }

    draw() {
        if(this._numbers.length == 0) throw "Error: Game is complete!!!"

        var picked = this._engine.pick(this._numbers);
        this.drawn.push(picked);
        this._numbers = this._numbers.filter(function (num) {
            return num != picked;
        });
        return picked;
    }

    numbersDrawn() {
        return this.drawn.length;
    }

    numbersLeft() {
        return this._numbers.length;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            drawn: this.drawn
        }
    }
}

window.onload = function () {
    var gameDB = new PouchDB("games")
    window.gameDB = gameDB;
    var previousList = document.getElementById("previous-games-list");

    gameDB.allDocs().then(function(result) {
        result.rows.forEach(function(row) {
            gameDB.get(row.id).then(function(game) {
                var p = document.createElement("p");
                var a = document.createElement("a");
                a.href = "#";
                a.innerText = game.name;
                a.setAttribute("data-id", game.id);
                p.appendChild(a);
                previousList.appendChild(p);

                a.onclick = function() {
                    window.load(row.id);
                    return false;
                }
            });
        });
    });

}

function draw() {
    try {
        var picked = window.GAME.draw();
        gameDB.get(window.GAME._id).then(function(game) {
            game.drawn = window.GAME.drawn;
            gameDB.put(game);
        })
    } catch(e) {
        alert(e);
    }
    render(window.GAME)
}

function load(id) {
    window.gameDB.allDocs().then(function(result) {
        var gameDoc = result.rows.find((game) => id == game.id)

        if(!gameDoc) return alert("NOT FOUND!");
        window.gameDB.get(gameDoc.id).then(function(game) {
            window.GAME = new HousieGame(gameDoc.id, game.name, game.drawn);
            render(window.GAME);
            showGameWindow();
        });
    });
}

function render(game) {
    document.getElementById("game-name").innerText = game.name;
    var drawSequence = document.getElementById("draw-sequence");
    drawSequence.innerHTML = "";
    game.drawn.forEach(function(num) {
        document.getElementById("num-" + num).className = "drawn";
        var historyElement = document.createElement("span");
        historyElement.innerText = num + ", "
        drawSequence.appendChild(historyElement);
    });
}

function createNewGame() {
    try {
        var textField = document.getElementById("new-game-name")
        var name = textField.value;
        textField.value = "";

        var game = new HousieGame(null, name);
        window.GAME = game;
        window.gameDB.put(game.toJSON());
        render(game);
        showGameWindow();

    } catch(e) {
        alert("There was some error!!");
        throw e;
    }

    return false;
}

function showCreateWidget() {
    document.getElementById("create-new-game-widget").className = ""
    document.getElementById("game-window").className = "hidden"
}

function showGameWindow() {
    document.getElementById("create-new-game-widget").className = "hidden"
    document.getElementById("game-window").className = ""
}
