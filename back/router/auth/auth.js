const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../lib/db.js');

const router = express.Router();

const regexId = /^[0-9]{9,9}$/;

const regexPw = /^[a-z0-9#?!@$%^&*-](?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])[a-z0-9#?!@$%^&*-]{8,20}$/;

router.get('/auth_check', (req, res) => {
    var LoginData = { isLogin : '', studentID : '' };

    console.log('session data');
    console.log(req.session.is_logined);

    if (req.session.is_logined === true) {
        LoginData = {
            isLogin : 'True',
            studentID : req.session.userID
        };

        console.log('isLogin is true');
    }
    else {
        LoginData = {
            isLogin : 'False',
            studentID : 'NULL'
        };

        console.log('isLogin is false');
    }

    console.log(LoginData);

    res.send(LoginData);
});

router.get('/logout_process', async (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    })
})

router.post('/login_process', async (req, res) => {
    const id = req.body.id.toString();
    const pw = req.body.pw.toString();

    var sendData = { isLogin : '' };

    if (id && pw) {
        if (!regexId.test(id)) {
            sendData.isSuccess = '학번 형식이 잘못되었습니다.';
            return res.send(sendData);
        }
        if (!regexPw.test(pw)) {
            sendData.isSuccess = '비밀번호 형식이 잘못되었습니다.';
            return res.send(sendData);
        }

        db.query(`SELECT * FROM user_logindata WHERE studentID = '${id}'`, (err, data, fields) => {
            if (err) {
                sendData.isLogin = 'DB query error';
                res.send(sendData);

                throw err;
            }
            
            if (data.length > 0) {
                bcrypt.compare(pw, data[0].hash_password, (err, result) => {
                    if (result === true) {
                        req.session.is_logined = true;
                        req.session.userID = id;
                        req.session.save(() => {
                            sendData.isLogin = "Logined";
                            return res.send(sendData);
                        })
                    }
                    else {
                        sendData.isLogin = '비밀번호가 일치하지 않습니다.';
                        return res.send(sendData);
                    }
                })
            }
            else {
                sendData.isLogin = '일치하는 학번 계정 정보가 없습니다.';
                return res.send(sendData);
            }
        });
    }
    else {
        sendData.isLogin = '학번과 비밀번호를 입력하세요.';
        return res.send(sendData);
    }
})

router.post('/register_process', async (req, res) => {
    const id = req.body.id.toString();
    const pw = req.body.pw.toString();
    const pwc = req.body.pwc.toString();

    var sendData = { isSuccess : '' };

    if (id && pw && pwc) {

        if (!regexId.test(id)) {
            sendData.isSuccess = '학번 형식이 잘못되었습니다.';
            return res.send(sendData);
        }
        if (!regexPw.test(pw)) {
            sendData.isSuccess = '비밀번호 형식이 잘못되었습니다.';
            return res.send(sendData);
        }

        db.query(`SELECT * FROM user_logindata WHERE studentID = '${id}'`, async (err, data, fields) => {
            if (err) {
                sendData.isSuccess = 'DB query error';
                res.send(sendData);

                throw err;
            }

            if (data.length <= 0 && pw == pwc) {
                const hashed_pw = await bcrypt.hash(pw, 10);

                db.query(`INSERT INTO user_logindata (studentID, hash_password) VALUES('${id}', '${hashed_pw}')`, (err, data, fields) => {
                    if (err) {
                        sendData.isSuccess = 'DB query error';
                        res.send(sendData);
        
                        throw err;
                    }

                    req.session.is_logined = true;
                    req.session.userID = id;
                    req.session.save(() => {
                        sendData.isSuccess = 'Registered';
                        return res.send(sendData);
                    })
                })
            }
            else if (pw != pwc) {
                sendData.isSuccess = '입력된 비밀번호가 서로 다릅니다.';
                return res.send(sendData);
            }
            else {
                sendData.isSuccess = '이미 계정이 생성된 학번입니다. 관리자에게 문의하세요.';
                return res.send(sendData);
            }
        });
    }
    else {
        sendData.isSuccess = '학번과 비밀번호를 입력하세요.';
        return res.send(sendData);
    }
})



module.exports = router;