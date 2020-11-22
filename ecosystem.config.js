module.exports = {
    apps : [{
      name: "kushling discord bot",
      script: "./index.js",
      instances: "1",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }