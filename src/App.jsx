import UserForm from './components/UserForm';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client = { queryClient }>
    <div className = "App">
      <div className = "form">
        <UserForm />
      </div>
    </div>
    </QueryClientProvider>
  );
}