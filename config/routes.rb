Rails.application.routes.draw do
  root to: 'posts#index'
  # get 'posts/new', to:'posts#new'
  get 'posts/:id', to: 'posts#checked'
end
