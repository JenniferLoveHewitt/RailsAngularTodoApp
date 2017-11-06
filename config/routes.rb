Rails.application.routes.draw do
  root to: "home#index"

  resources :tasks, only: [:index, :create, :destroy, :update]
end
