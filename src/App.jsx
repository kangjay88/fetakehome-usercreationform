import UserForm from './components/UserForm'
import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  const user = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  };

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <h1>React Form</h1>
      <div className="form">
        <UserForm  />
      </div>
    </div>
    </QueryClientProvider>
  );
  }