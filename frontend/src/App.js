import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <main className='py-3'>
        <Container>
          <h2>Mani</h2>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
