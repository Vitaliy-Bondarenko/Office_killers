ActiveAdmin.register User do
  permit_params :email, :encrypted_password, :first_name, :last_name, :notify_game_start, :notify_game_finish, :news, :notif_token
end
