Rails.application.routes.draw do
  get 'users/new' => 'users#new'
  post '/users' => 'users#create'

  resources :posts

  root 'posts#index'
end
