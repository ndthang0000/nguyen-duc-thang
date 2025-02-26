import express from 'express'
import storyRouter from './story.route'
import docRouter from './doc.route'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/story',
    route: storyRouter
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docRouter
  }
]

devRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

export default router
