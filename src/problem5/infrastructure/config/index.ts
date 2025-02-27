import dotenv from 'dotenv'
dotenv.config()

const configData = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  }
}

export default configData
