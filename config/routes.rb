Rails.application.routes.draw do

  devise_for :users

  post '/rate' => 'rater#create', :as => 'rate'

  root                  'static_pages#home'
  get 'help'         => 'static_pages#help'
  get 'about'        => 'static_pages#about'
  get 'contact'      => 'static_pages#contact'

  get 'register'     => 'facilities#new'

  resources :users do
    resources :facilities do
      resources :routes do
    resources :ticks
      end
    end
  end


  namespace :admin do
    get '', to: 'dashboard#index', as: '/'
    resources :facilities do
      resources :routes do
        member do
          post :expire #output path - expire_route/:id
          post :tagged #output path - tagged_route/:id
        end
      end
      resources :grades
      resources :zones
      resources :walls
      resources :setters

    end
  end

  resources :facilities do
    resources :routes, only: [:index, :show]
    resources :grades, only: [:index, :show]
    resources :zones, only: [:index, :show]
    resources :walls, only: [:index, :show]
    resources :setters, only: [:index, :show]
    resources :ticks
    member do
      get :leaderboard
      get :partners
      get :discussion
    end
  end

  default_url_options :host => 'localhost:3000'



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
