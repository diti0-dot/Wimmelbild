# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://benevolent-crostata-059d4e.netlify.app'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Access-Control-Allow-Origin'],
      max_age: 600
  end
end