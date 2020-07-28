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

$(function () {
    var gameDB = new PouchDB("games")
    window.gameDB = gameDB;
    var previousList = $("#previous-games-list");

    gameDB.allDocs().then(function(result) {
        result.rows.forEach(function(row) {
            gameDB.get(row.id).then(function(game) {
                game = new HousieGame(row.id, game.name, game.drawn, new Date(game.createdAt));
                var p = $("<li>");
                var a = $("<a>");
                var span = $("<span>");
                a.attr("href", "#" + row.id).text(game.name);
                span.text(" (" + game.createdAtReadable() + ")");
                p.append(a);
                p.append(span);
                previousList.append(p);

                a.on("click", function() {
                    window.load(row.id);
                });
            });
        });
    });

    var hash = window.location.hash.substring(1);
    if(hash.length > 0) {
        window.load(hash);
    }

    $("#delete-all-games").on("click", (e) => {
       e.preventDefault();

       if(!confirm("WARNING!!! \nAre you sure? This action is irreversible.")) return;

       window.gameDB.destroy(() => window.location.reload());
    });
});

function draw() {
    try {
        window.GAME.draw();
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
        }).catch(() => {
            alert("Game not found!")
            window.location.hash = "";
        });
    });
}

function render(game) {
    $("#game-name").text(game.name);
    var drawSequence = $("#draw-sequence");
    drawSequence.html("");
    game.drawn.forEach(function(num) {
        $("#num-" + num).addClass("drawn");
        var historyElement = $("<span>");
        historyElement.text(num + ", ");
        drawSequence.append(historyElement);
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
    window.location.hash = "";
    document.getElementById("create-new-game-widget").className = "";
    document.getElementById("game-window").className = "hidden";
    setTimeout(() => window.location.reload(), 100);
}

function showGameWindow() {
    document.getElementById("create-new-game-widget").className = "hidden"
    document.getElementById("game-window").className = ""
}

function randomId() {
    return (Math.random() * Math.pow(10,16)).toString(36);
}