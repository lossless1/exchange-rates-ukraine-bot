module.exports = {
  apps: [
    {
      name: 'exchange-bot',
      script: './src/index.js',
      instances: 1,
      autorestart: true,
      watch: true,
      exec_mode: 'cluster',
      max_memory_restart: '1000M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],

  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-52-15-67-42.us-east-2.compute.amazonaws.com',
      ref: 'origin/master',
      repo: 'git@github.com:lossless1/exchange-rates-ukraine-bot.git',
      path: '/home/ubuntu/exchange-rates-ukraine-bot',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
