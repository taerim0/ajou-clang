import './AuthPage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [mode, setMode] = useState('');
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [PWC, setPWC] = useState('');

    const navigation = useNavigate();

    useEffect(() => {
        fetch('http://localhost:1542/api/auth/auth_check', {
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((json) => {
            if (json.isLogin === 'True') {
                alert('이미 로그인 되어 있습니다.');
                navigation('/main');
            }
            else {
                if (mode === undefined || mode === 'Register') {
                    setMode('Register');
                }
                else {
                    setMode('Login');
                }
            }
        });
    }, []);
    
    if (mode === 'Login') {
        return <>
            <div className = 'LoginForm'>
                <p><input className='login' type='text' name='userID' placeholder='학번' onChange={event => {
                    setID(event.target.value);
                }}/></p>
                <p><input className='login' type='password' name='pwd' placeholder='비밀번호' onChange={event => {
                    setPW(event.target.value);
                }}/></p>
                <p><input className='btn' type='submit' value='로그인' onClick={() => {
                    const userData = {
                        id : ID,
                        pw : PW,
                    };

                    fetch('http://localhost:1542/api/auth/login_process', {
                        method : 'post',
                        headers : {
                            'content-type' : 'application/json',
                        },
                        body : JSON.stringify(userData),
                        credentials: 'include',
                    })
                    .then((res) => res.json())
                    .then((json) => {
                        if (json.isLogin === 'Logined') {
                            alert(json.isLogin);
                            setMode('Logined');
                        }
                        else {
                            alert(json.isLogin);
                        }
                    })
                }}/></p>
            </div>
            <p><button onClick={() => {
                setMode('Register');
            }}>회원가입</button></p>
        </>
    }
    else if (mode === 'Register') {
        return <>
            <div className='RegisterForm'>
                <p><input className='login' type='text' placeholder='아이디' onChange={event => {
                    setID(event.target.value);
                }}/></p>
                <p><input className='login' type='password' placeholder='비밀번호' onChange={event => {
                    setPW(event.target.value);
                }}/></p>
                <p><input className='login' type='password' placeholder='비밀번호 확인' onChange={event => {
                    setPWC(event.target.value);
                }}/></p>

                <p><input className='btn' type='submit' value='회원가입' onClick={() => {
                    const userData = {
                        id : ID,
                        pw : PW,
                        pwc : PWC,
                    };
                    fetch('http://localhost:1542/api/auth/register_process', {
                        method : 'post',
                        headers : {
                            'content-type' : 'application/json',
                        },
                        body : JSON.stringify(userData),
                        credentials: 'include',
                    })
                    .then((res) => res.json())
                    .then((json) => {
                        if (json.isSuccess === 'Registered') {
                            alert('계정 생성 완료');
                            setMode('Logined');
                        }
                        else {
                            alert(json.isSuccess);
                        }
                    });
                }}/></p>

                <p><button onClick={() => {
                    setMode('Login');
                }}>로그인</button></p>
            </div>
        </>
    }

    return null;
}

export default AuthPage;