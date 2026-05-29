import UserInfo from "./components/user-info"
import UserNewFrom from "./components/user-new-form"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import UsersList from "./components/users-list"

const queryClient = new QueryClient()

function App() {
  return(
    <QueryClientProvider client={queryClient}>
      <UserInfo/>
      <hr/>
      <UserNewFrom/>
      <hr/>
      <UsersList/>
    </QueryClientProvider>
  )
}

export default App
