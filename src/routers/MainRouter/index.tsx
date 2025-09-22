import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Home } from "../../pages/Home/index";
import { History } from "../../pages/History/index";
import { AboutPomodoro } from "../../pages/AboutPomodoro/index";
import { NotFound } from "../../pages/NotFound/index";
import { useEffect } from "react";
import { Settings } from "../../pages/Settings/index";

function ScrollToTop() {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }, [pathname])

  return null
}

export function MainRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/history/' element={<History/>} />
          <Route path='/settings/' element={<Settings/>} />
          <Route path='/about-pomodoro' element={<AboutPomodoro/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <ScrollToTop/>
      </BrowserRouter>
  )
}