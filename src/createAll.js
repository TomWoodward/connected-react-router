import * as actions from './actions'
import createConnectedRoute from './ConnectedRoute'
import createConnectedRouter from './ConnectedRouter'
import createConnectRouter from './reducer'
import routerMiddleware from './middleware'
import createSelectors from './selectors'

const createAll = structure => ({
  ...actions,
  ...createSelectors(structure),
  ConnectedRoute: createConnectedRoute(structure),
  ConnectedRouter: createConnectedRouter(structure),
  connectRouter: createConnectRouter(structure),
  routerMiddleware,
})

export default createAll
