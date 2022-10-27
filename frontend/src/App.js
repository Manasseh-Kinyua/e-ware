import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

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
            <Route path='/cart' element={ <CartScreen /> } />
            <Route path='/cart/:id' element={ <CartScreen /> } />
            <Route path='/register' element={ <RegisterScreen /> } />
            <Route path='/login' element={ <LoginScreen /> } />
            <Route path='/profile' element={ <ProfileScreen /> } />
            <Route path='/shipping' element={ <ShippingScreen /> } />
            <Route path='/payment' element={ <PaymentScreen /> } />
            <Route path='/placeorder' element={ <PlaceOrderScreen /> } />
            <Route path='/order/:id' element={ <OrderScreen /> } />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
