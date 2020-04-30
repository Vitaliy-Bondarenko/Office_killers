import consumer from "./consumer";
window.subGames = function(user_id) {
  if (!user_id) return;
  consumer.subscriptions.create({channel: "GamesChannel", user_id: user_id}, {
    connected() {
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(_data) {
      location.reload();
      // Called when there's incoming data on the websocket for this channel
    }
  });
};
