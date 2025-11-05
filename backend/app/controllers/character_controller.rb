class CharacterController < ApplicationController
    protect_from_forgery with: :null_session 
    def check 
        character = Character.find_by(name:params[:name])


        x = params[:x].to_f
        y = params[:y].to_f

        range = 3.0

        if (x-character.pos_x).abs <= range && (y-character.pos_y).abs <= range 
            render json:{found: true, character:character.name}
        else
            render json:{found: false}
        end 
    end 
end
