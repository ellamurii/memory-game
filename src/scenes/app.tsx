import MemoryGame from 'scenes/memory-game/memory-game';
import './app.scss';

const App = () => {
  return (
    <div className='app' data-testid='app'>
      <MemoryGame />
    </div>
  );
};

export default App;
