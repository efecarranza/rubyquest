Rails.application.routes.draw do

  get '/' => 'users#index'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/signup' => 'users#new'
  post '/users' => 'users#create'

  resources :articles
  resources :posts
  resources :sessions

  root 'posts#index'
end
