import consumer from "./consumer";
window.subGames = function(user_id) {
  if (!user_id) return;
  consumer.subscriptions.create({channel: "GamesChannel", user_id: user_id}, {
    connected() {
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      if (data.game.status == 'finished'){
        window.location.href = '/best_killer';
      }else {
        location.reload();
      }
    }
  });
};
