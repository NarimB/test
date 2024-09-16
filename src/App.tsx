import './App.scss'
import { Form } from './containers/Form/Form'
import { Header } from './components/Header/Header'
import { Sidebar } from './containers/Sidebar/Sidebar'

function App() {
  return (
    <div className='layout'>
      <Header/>
      <div className='layout__content'>
        <Sidebar/>
        <Form/>
      </div>
    </div>
  )
}

export default App
