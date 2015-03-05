  Rails.application.routes.draw do

  root 'users#index'
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  post '/answers.json' => 'answers#get_answer'

  resources :articles
  resources :posts
  resources :sessions
  resources :comments

end
