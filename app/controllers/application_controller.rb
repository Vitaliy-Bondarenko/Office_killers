# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  include ActiveStorage::SetCurrent

  def authenticate_admin
    # return true if Rails.env.development?
    authenticate_or_request_with_http_basic do |name, password|
      name == 'office' && password == 'htoya'
    end
  end

  private

  def parsed_params
    @parsed_params ||= ActionController::Parameters.new(JSON.parse(request.body.read, symbolize_names: true))
  end

  def player
    @player ||= Player.find(params[:id])
  end

  def serialize(collection, serializer, adapter=:json)
    ActiveModelSerializers::SerializableResource.new(
      collection,
      each_serializer: serializer,
      adapter: adapter
    ).as_json
  end
end
