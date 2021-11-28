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
      switch (data.game.status) {
        case 'unstarted':
          if (data.additional_params == 'page_changing') {
            window.updatePlayerIndividually(data.game, data.player);
            location.reload();
          } else {
            window.forceUpdatePlayersCount(data.game);
          }
          break;
        case 'in_progress':
          window.forceUpdatePlayers(data.player);
          break;
        case 'finished':
          window.location = '/best_killer';
          break;
        default:
      }
    }
  });
};
