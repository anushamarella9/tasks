import './App.css';
import TasksPage from './containers/TasksPage';
import store from './app/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TasksPage />
        {/*<Product />*/}
      </Provider>

    </div>
  );
}

export default App;
