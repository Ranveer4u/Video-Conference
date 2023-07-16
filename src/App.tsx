import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui';

import React,{ useEffect, useState }from 'react';
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./app/hooks"
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import VideoConference from './pages/VideoConference';
import ThemeSelector from './components/ThemeSelector';
import MyMeetings from './pages/MyMeetings';
import { setToasts } from './app/slices/MeetingSlice';
import Meeting from './pages/Meeting';
import JoinMeeting from './pages/JoinMeeting';




function App() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(zoom=>zoom.meetings.toasts);
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [isInitialTheme, setIsInitialTheme] = useState(true)
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  },[]);

  useEffect(() => {
    if(isInitialTheme) setIsInitialTheme(false);
    else{
      window.location.reload()
    }
  },[isDarkTheme]);

  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };
  const removeToast = (removeToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: {id: string }) => toast.id !== removeToast.id)
      )
    );
  };

  return (
    <ThemeSelector>
    <EuiProvider colorMode={theme}>
      <EuiThemeProvider modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<CreateMeeting/>} />
          <Route path="/create1on1" element={<OneOnOneMeeting/>} />
          <Route path="/videoconference" element={<VideoConference/>} />
          <Route path="/mymeetings" element={<MyMeetings/>} />
          <Route path="/meetings" element={<Meeting/>} />
          <Route path="/join/:id" element={<JoinMeeting/>} />
          <Route path="/" element={<Dashboard/>} />
          <Route path="*" element={<Dashboard/>} />
        </Routes>
        <EuiGlobalToastList toasts={toasts} dismissToast={removeToast} toastLifeTimeMs={5000}/>
      </EuiThemeProvider>
    </EuiProvider>
    </ThemeSelector>
  )
}

export default App;
