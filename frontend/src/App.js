import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3 main-bg'>
        <Container>
          <Routes>
            <Route path='/' element={ <LandingScreen /> } />
            <Route path='/home' element={ <HomeScreen /> } />
            <Route path='/product/:id' element={ <ProductScreen /> } />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
