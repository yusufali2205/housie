
window.draw = $.throttle(2000, true, function() {
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
  window.speaker().speak(picked);
})

window.speaker = function (number) {
  if(!window.SpeechSynthesisUtterance) return new NoopSpeaker();
  return new ChromeSpeaker();
}
