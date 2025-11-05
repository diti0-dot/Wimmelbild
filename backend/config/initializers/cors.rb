# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "https://wimmelbild.netlify.app/"
    resource "*", headers: :any, methods: [:get, :post, :options]
  end
end
