import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import AuthService from '../../../../services/AuthService';
import { useUser } from '../../../../hooks/useUser';

type Props = {
  closeModal:()=>void;
}
const GoogleLoginButton: React.FC<Props> = ({closeModal}) => {
  const { setUser } = useUser();
  const handleSuccess = async (response: any) => {

    const token = response.credential;

    try {
      const result = await AuthService.loginWithGoogle(token)
      setUser(result);
      closeModal();

    } catch (error) {
      console.error('Google error:', error);
    }
  };

  return (
    <GoogleLogin
      locale='en'
      onSuccess={handleSuccess}
    />
  );
};

export default GoogleLoginButton;
