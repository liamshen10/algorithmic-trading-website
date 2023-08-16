
import {BrowserRouter} from "react-router-dom"
import {Routes, Route, Navigate} from "react-router";
import RegisterScreen from "./register-page/registration-screen";
import authReducer from "./reducers/auth-reducer";
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationSidebar from "./navigation/navigation";

const store = configureStore(
  {reducer: {user: authReducer}});

function App() {
   return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="row">
       <div className="col-4">
         <NavigationSidebar />
       </div>
       <div className="col-8">
         <Routes>

           <Route path="/register" element={<RegisterScreen/>} />


         </Routes>
       </div>
     </div>
   </BrowserRouter>
   </Provider>
 );
}

export default App;
