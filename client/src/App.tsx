import React from 'react';

import {BrowserRouter, Routes, Route} from "react-router-dom"

//Importing Pages
import MainPage from './Page/Main.page';
import ShoppingListManagerPage from './Page/ShoppingListManager.page';

function App() {
  return (
    <div className='bg-body-red'>
    <BrowserRouter>
      <Routes>
          <Route index element={<MainPage />} />
          <Route element={< ShoppingListManagerPage />} path='/shoppingList/update/:id' />
          <Route element={< ShoppingListManagerPage />} path='/shoppingList/create' />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
