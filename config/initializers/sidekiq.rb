require 'sidekiq/web'

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_URL'] }
end

Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_URL'] }

  if Rails.env.development?
    Rails.logger = Logger.new(STDOUT)
    ActiveRecord::Base.logger = Logger.new(STDOUT)
  end
end

Sidekiq::Web.use Rack::Auth::Basic, 'Protected Area' do |username, password|
  Rack::Utils.secure_compare(::Digest::SHA256.hexdigest(username), ::Digest::SHA256.hexdigest('yazdes_glavnyi')) &
    Rack::Utils.secure_compare(::Digest::SHA256.hexdigest(password), ::Digest::SHA256.hexdigest('3DmX0PV7wR'))
end
