# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  private

  def parsed_params
    @parsed_params ||= ActionController::Parameters.new(JSON.parse(request.body.read, symbolize_names: true))
  end
end
