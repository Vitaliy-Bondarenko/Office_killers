# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth' }

  namespace :api do
    namespace :v1 do
      resources :users, only: :update
      resources :games, only: %i[new create update destroy] do
        put 'killer_start', on: :member
      end
      resources :players, only: %i[create destroy]
    end
  end

  resources :games, only: :show
  get 'auth/google_oauth2/callback', to: 'omniauth#googleAuth'
  get 'auth/failure', to: redirect('/')
  get '/login', to: redirect('/users/auth/google_oauth2')
  get '/logout', to: redirect('/users/sign_out')
  match '*path', to: 'hello_world#index', via: :all

  root 'hello_world#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
