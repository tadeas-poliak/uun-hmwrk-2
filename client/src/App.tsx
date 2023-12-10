import React from 'react';

import {BrowserRouter, Routes, Route} from "react-router-dom"

import { Suspense } from 'react';

//Importing Pages
import MainPage from './Page/Main.page';
import ShoppingListManagerPage from './Page/ShoppingListManager.page';

import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div className='bg-body-red'>
    <Suspense>
      
      <BrowserRouter>
        <Routes>
            <Route index element={<MainPage />} />
            <Route element={< ShoppingListManagerPage />} path='/shoppingList/update/:id' />
            <Route element={< ShoppingListManagerPage />} path='/shoppingList/create' />
        </Routes>
      </BrowserRouter>
      
    </Suspense>
    </div>
  );
}

export default App;
