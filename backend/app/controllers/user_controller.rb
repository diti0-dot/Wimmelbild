class UserController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    user = User.create(name: params[:name], timing: params[:timing])
    if user.persisted?
      render json: { success: true }
    else
      render json: { success: false, errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @users = User.order(timing: :asc).limit(10)
    render json: @users
  end
end