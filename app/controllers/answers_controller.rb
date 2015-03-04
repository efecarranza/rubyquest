class AnswersController < ApplicationController
  def get_answer
    @answer = Answer.find(params[:id])
    if @answer.answers.include? params[:answer]
      render :json => { message: @answer.message }
    else
      render :json => { message: "Error" }
    end
  end
end
