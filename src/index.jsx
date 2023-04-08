import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const App = () => {
  return <MainView />;
};

const container = document.querySelector('#root');
ReactDOM.render(<App />, container);
