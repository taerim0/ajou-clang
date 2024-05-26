import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
import {useEffect, useState} from 'react';


const GalleryPage = () => {
    const [mode, setMode] = useState('');

    const navigation = useNavigate();

    useEffect(() => {
        fetch("http://localhost:1542/api/auth/auth_check", {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.isLogin === "True") {
                setMode("Logined");
            }
            else {
                setMode("NotLogined");
            }
        });
    }, []);

    if (mode === "Logined") {
        return (
            <div>
                <h1>안녕하세요</h1>

                <button onClick={() => {
                    navigation('/auth');
                }}>로그아웃</button>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => {
                navigation('/auth');
            }}>로그인</button>
        </div>
    );
};

export default GalleryPage;