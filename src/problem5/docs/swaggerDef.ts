import { version } from '../../../package.json'
import configData from '../infrastructure/config'

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Code Challenge from 99Tech API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/ndthang0000/nguyen-duc-thang'
    }
  },
  servers: [
    {
      url: `http://localhost:${configData.port}/v1/api`
    }
  ]
}

export default swaggerDef
