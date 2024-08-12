import React, { useState } from 'react';
import Modal from '../../../ui/Modal/Modal';
import AuthService from '../../../services/AuthService';
import { useUser } from '../../../hooks/useUser';
import GoogleLoginButton from './components/GoogleButton';


interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { setUser } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string, other?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!email) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
        }
        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Password is required' }));
        }

        if (!email || !password) return;


        try {
            setIsSubmitting(true);
            const result = await AuthService.login({ email, password });
            setUser(result);
            onClose();
        } catch (error: any) {
            setErrors({ other: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Login">
            <form className='modal-form' onSubmit={handleSubmit}>
                {errors.other && <span className='error'>{errors.other}</span>}
                <div>
                    {errors.email && <span className='error'>{errors.email}</span>}
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    {errors.password && <span className='error'>{errors.password}</span>}
                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <div style={{display:"flex", justifyContent:"center"}}>
                <GoogleLoginButton closeModal={()=>onClose()}/>
            </div>
        </Modal>
    );
}
