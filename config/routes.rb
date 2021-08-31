# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth' }
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  namespace :api do
    namespace :v1 do
      resources :users, only: %i[update create show]
      resources :games, only: %i[new create update destroy] do
        put 'killer_start', on: :member
      end
      resources :players, only: %i[create destroy] do
        put 'death_confirm', on: :member
        put 'player_killed', on: :member
        put 'error_death', on: :member
      end
    end
  end

  resources :games, only: :show
  get 'auth/google_oauth2/callback', to: 'omniauth#googleAuth'
  get 'auth/failure', to: redirect('/')
  get '/login', to: redirect('/users/auth/google_oauth2')
  get '/game', to: 'hello_world#index', as: 'game_redirect'
  get '/guest_login', to: 'users#create', as: 'guest_create'
  get '/best_killer', to: 'hello_world#index', as: 'best_killer'
  get '/logout', to: redirect('/users/sign_out')
  match '*path', to: 'hello_world#index', via: :all

  mount ActionCable.server => '/cable'
  root 'hello_world#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
