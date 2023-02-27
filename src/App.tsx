import React, { Suspense, useState } from 'react';
import { Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import LoadingCom from './component/LoadingComp/LoadingCom';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import Main from './pages/Main';
import { AuthRouter, MainRouter } from './router';
import { useAppSelector } from './store/hooks';

function App() {
  const [token, setToken] = useState<boolean>(false)
  const store = useAppSelector(state => state)

  return (
    store.account.userId ? <Main /> : <Suspense fallback={<LoadingCom />}>
      <Routes>
        {AuthRouter.map((item) => {
          const { path, element: Component } = item;
          return <Route key={path} path={path} element={<Component />} />;
        })}
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
