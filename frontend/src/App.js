import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/Customer/LandingPage';
import Cart from './components/Customer/Cart';
import Order from './components/Customer/Order';
import Chatbot from './components/Chat/Chatbot';
import FoodInfo from './components/Chat/FoodInfo';
import UserProfile from './components/UserProfile';
import Layout from './components/Layout';
import QRScan from './components/QRScan';
import RestaurantRegister from './components/RestaurantForms/RestaurantRegister';
import RestaurantInfo from './components/RestaurantDashboard/RestaurantInfo';
import RestaurantDashboard from './components/RestaurantDashboard/RestaurantDashboard';
import AddDishForm from './components/RestaurantForms/AddDishForm';
import MenuManagement from './components/MenuManagement';
import ViewOrders from './components/RestaurantDashboard/ViewOrders';
import RestaurantDetails from './components/RestaurantDetails';
import Payment from "./components/Customer/Payment";
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import RestaurantLogin from './components/RestaurantForms/RestaurantLogin';
import AddToMenu from './components/RestaurantForms/AddToMenu';
import CreateMenu from './components/RestaurantForms/CreateMenu';

function App() {
  return (
    <Router>
      <Layout>

      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/chat/:id" element={<Chatbot />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/scan" element={<QRScan />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path='/dish-details' element={<FoodInfo />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/payment" element={<Payment />} />
          
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurant/info/:id" element={<RestaurantInfo />} />
          <Route path='/restaurant/register' element={<RestaurantRegister />} />
          <Route path='/restaurant/login' element={<RestaurantLogin />} />
          <Route path="/restaurant/adddish" element={<AddDishForm />} />
          <Route path="/restaurant/manage/menu" element={<MenuManagement />} />
          <Route path="/restaurant/view/orders" element={<ViewOrders />} />
          <Route path="/restaurant/details" element={<RestaurantDetails />} />
          <Route path="/restaurant/addtomenu" element={<AddToMenu />} />
          <Route path="/restaurant/createmenu" element={<CreateMenu />} />
        </Routes>
      </div>
      </Layout>
    </Router>
  );
}

export default App;
