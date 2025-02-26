import express from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerDef from '../../docs/swaggerDef'

const router = express.Router()

const specs = swaggerJsdoc({
  swaggerDefinition: swaggerDef,
  apis: ['src/problem5/docs/*.yml', 'src/problem5/routes/v1/*.ts']
})

router.use('/', swaggerUi.serve)
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true
  })
)

export default router
