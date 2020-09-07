class UsersController < ApplicationController
  def create
    if cookies[:user_id]
      @user = User.find_by(id: cookies[:user_id])
    else
      @user = User.create(image_URL: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                          first_name: 'Guest_',
                          password: SecureRandom.hex(4),
                          email: SecureRandom.hex(5) + '@gmail.com')
      @user.update(first_name: @user.first_name + @user.id.to_s)
      cookies[:user_id] = @user.id
    end
    sign_in_and_redirect @user
  end
end
