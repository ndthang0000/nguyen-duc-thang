import express from 'express'
import storyRouter from './story.route'

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

export default router
