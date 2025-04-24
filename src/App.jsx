import Header from './components/Header';
import Todo from './components/Todo';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <div className="background-blob-primary"></div>
        <Todo />
        <div className="background-blob-secondary"></div>
      </Wrapper>
    </>
  );
}

export default App;
