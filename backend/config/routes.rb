Rails.application.routes.draw do

    post '/check_character', to: 'character#check'
    post "/user_create", to: "user#create"
    get "/user", to: "user#index"

end
