
Rails.application.routes.draw do


  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks" }

  post '/rate' => 'rater#create', :as => 'rate'


  root                  'static_pages#home'
  get 'help'         => 'static_pages#help'
  get 'about'        => 'static_pages#about'
  get 'contact'      => 'static_pages#contact'
  get 'marketing'      => 'static_pages#marketing'
  get 'pricing'      => 'static_pages#pricing'
  get 'privacy_policy'  => 'static_pages#privacy_policy'
  get 'terms_of_service' => 'static_pages#terms_of_service'
  get 'register'     => 'facilities#new'

  resources :users do
    resources :facility_roles
    resources :routes do
      member do
        post :quick_flash #output path - expire_route/:id
        post :quick_redpoint #output path - tagged_route/:id
        post :quick_project
        post :quick_tick
        post :route_like
        post :route_unlike
      end
      collection do
        get :filter_results
        get :index
      end
      resources :ticks
    end
    collection do #collection gets index of users rather than specific tick ID
      get :manage_users
    end
    member do
      get :following, :followers, :competitions, :competition, :new_competition
    end
    member do
      post :follow #output path - user/:id/follow
      post :unfollow #output path - user/:id/unfollow
      get :phone #output path - user/:id/phone
    end

    resources :ticks do
      collection do #collection gets index of ticks rather than specific tick ID
        get :tick_list
      end
    end
    resources :facilities do
      post :unfollow_facility
      post :follow_facility #output path - /users/:user_id/facilities/:facility_id/follow_facility(.:format), user_facility_follow_facility
      resources :routes do
        resources :ticks

      end
    end
    member do
      get :inbox
      get :home
      get :analytics
    end
    resources :competitions do
      member do
        post :invite_user
      end
    end
  end

  resources :facility_roles do
    member do
      post :confirm
    end
  end

  resources :leads

  resources :plans
  resources :charges

  post 'admin/subscriptions/webhook'      => 'admin/subscriptions#webhook' #webhook for Stripe
  # post 'admin/facilities/:facility_id/routes/mass_expire'      => 'admin/routes#mass_expire' #webhook for Stripe

  resources :relationships,       only: [:create, :destroy]

  namespace :admin do
    get '', to: 'dashboard#index', as: '/'
    resources :grade_systems do
      resources :grades
    end

    resources :facilities do
      resources :routes do

        member do
          post :expire #output path - expire_route/:id
          post :unexpire
          post :tagged #output path - tagged_route/:id
          post :untagged #output path - tagged_route/:id
          post :create_task
          post :expire_zone_show #expire from zone show page
        end
      end
      resources :subscriptions do
        member do
          post :cancel
        end
      end

      member do
        get :plans
        post :choose_free_plan
        post :choose_basic_plan
        post :choose_pro_plan

      end

      resources :grades
      resources :zones do
        post :mass_expire
        post :mass_create_tasks
      end
      resources :walls
      resources :setters # delete after facility_roles is set up
      resources :facility_roles do
        member do
          post :resend_invite
        end
      end
      resources :sub_child_zones
      resources :facility_grade_systems
      resources :facility_targets
      resources :custom_colors
      resources :tasks do
        member do
          post :activate_route #output path - activate_route/:id
          post :complete_task
          post :uncomplete_task
        end
      end
      resources :competitions do
        member do
          get :routes
          get :route_list
          post :add_route
          post :remove_route
        end
        resources :routes do
          post :add_route
          post :remove_route
        end
      end

    end
  end

  resources :facilities do

    resources :routes, only: [:index, :show]
    resources :grades, only: [:index, :show]
    resources :zones, only: [:index, :show]
    resources :walls, only: [:index, :show]
    resources :setters, only: [:index, :show]
    resources :ticks
    resources :facility_roles
    member do
      post :follow_facility
      post :unfollow_facility
    end
    resources :competitions do
      member do
        get :routes
        get :followers
        get :invite
        get :route_list
        get :results
        post :add_route
        post :remove_route
        post :add_user
      end
      resources :routes do
        post :add_route
        post :remove_route
          member do
            post :quick_flash #output path - expire_route/:id
            post :quick_redpoint #output path - tagged_route/:id
            post :quick_project
            post :quick_comp_flash #output path - expire_route/:id
            post :quick_comp_redpoint #output path - tagged_route/:id
            post :quick_comp_project
            post :quick_tick
          end
      end
    end

    member do
      get :followers
      get :social
      get :analytics
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
