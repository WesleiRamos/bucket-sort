import Menu from './Menu'
import Provider from './Provider'
import Container from './Container'
import { AppWrapper  } from './styled'

const App = () => (
  <Provider>
    <AppWrapper>
      <Container />
      <Menu />
    </AppWrapper>
  </Provider>
)

export default App
