
import { RouterProvider, createBrowserRouter } from 'react-router'
import './App.css'
import MainPage from './pages/MainPage'
import NavbarWrapper from './components/NavbarWrapper'

function App() {
  const routes = createBrowserRouter(
    [
      {
        path: "",
        children: [
          {
            element: <NavbarWrapper />,
            children: [
              {
                path: "",
                element: <MainPage />
              }
            ]
          }
        ]
      }
    ],
    { basename: import.meta.env.APP_BASE_URL }
  )
  return (
    <RouterProvider router={routes} />
  )
}

export default App
