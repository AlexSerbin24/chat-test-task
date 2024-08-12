import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserProvider  from './components/contexts/userContext';
import SelectedChatProvider  from './components/contexts/selectedChatContext';
import ChatsProvider  from './components/contexts/chatsContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={"383864390425-p9brifrb57luhbu7s4sv46ml5qucanqe.apps.googleusercontent.com"}>
    <UserProvider>
      <ChatsProvider>
        <SelectedChatProvider>
          <App />
        </SelectedChatProvider>
      </ChatsProvider>
    </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
