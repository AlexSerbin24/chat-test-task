import React, { useState } from 'react';
import Modal from '../../../ui/Modal/Modal';
import AuthService from '../../../services/AuthService';
import { useUser } from '../../../hooks/useUser';
import GoogleLoginButton from './components/GoogleButton';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const { setUser } = useUser();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ name?: string; surname?: string; email?: string; password?: string, other?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!name) {
            setErrors(prev => ({ ...prev, name: 'Name is required' }));
        }

        if (!email) {
            setErrors(prev => ({ ...prev, surname: 'Surname is required' }));
        }

        if (!email) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
        }
        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Password is required' }));
        }

        if (!name || !surname || !email || !password) return;

        try {
            setIsSubmitting(true);
            const result = await AuthService.register({ name, surname, email, password });
            console.log(result);
            setUser(result);
            onClose();
        } catch (error: any) {
            setErrors({ other: error.message });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Register">
            <form className='modal-form' onSubmit={handleSubmit}>
                {errors.other && <span className='error'>{errors.other}</span>}
                <div>
                    {errors.name && <span className='error'>{errors.name}</span>}
                    <input
                        type="text"
                        name="name"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    {errors.surname && <span className='error'>{errors.surname}</span>}
                    <input
                        type="text"
                        name="surname"
                        placeholder='Surname'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
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
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <GoogleLoginButton closeModal={() => onClose()} />
            </div>
        </Modal>
    );
}
