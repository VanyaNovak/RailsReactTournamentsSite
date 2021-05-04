class Api::V1::TournamentsController < ApplicationController
  def index
    tournament = Tournament.all.order(created_at: :desc)
    render json: tournament
  end

  def create
    tournament = Tournament.create!(tournament_params)
    if tournament
      render json: tournament
    else
      render json: tournament.errors
    end
  end

  def show
    if tournament
      render json: tournament
    else
      render json: tournament.errors
    end
  end

  def destroy
    tournament&.destroy
    render json: { message: 'Tournament deleted!'}
  end

  private

  def tournament_params
    params.permit(:name, :image, :team, :description)
  end

  def tournament
      @tournament ||= Tournament.find(params[:id])
  end
end