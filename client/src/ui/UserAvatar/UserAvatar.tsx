import React from 'react';


interface Props {
    src?: string; // Сделать необязательным
    alt?: string; // Сделать необязательным
}

const defaultSrc = '/default.jpg'; // Укажите путь к дефолтному изображению

export default function UserAvatar({ src, alt = 'User Avatar' }: Props) {
    return (
        <div className="avatar">
            <img src={src || defaultSrc} alt={alt} />
        </div>
    );
}
