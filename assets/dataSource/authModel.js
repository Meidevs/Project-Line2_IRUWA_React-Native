class AUTHENTICATION {
    LOGIN = async (user_id, user_pw, user_device) => {
        try {
            let response = await fetch('https://mostfeel.site/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ user_id: user_id, user_pw: user_pw, user_device: user_device })
            });

            let json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }

    }
    LOGOUT = async () => {
        try {
            let response = await fetch('https://mostfeel.site/api/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (response.ok) {
                return true;
            }
        } catch (err) {
            console.log(err)
        }
    }
    REGISTER = async (formData) => {
        try {
            let response = await fetch('https://mostfeel.site/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                credentials: 'include',
                body: formData
            });

            let json = await response.json();

            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }
    EMAIL_DUPLICATION = async (user_email) => {
        try {
            let response = await fetch('https://mostfeel.site/api/auth/duplication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ user_email: user_email })
            });

            let json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }
    GET_USER_INFOs = async () => {
        try {
            let response = await fetch('https://mostfeel.site/api/auth/info', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            let json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }

    UPDATE_USER_LOCATION = async (user_location) => {
        try {
            let response = await fetch('https://mostfeel.site/api/auth/userlocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ user_location: user_location })
            });

            let json = await response.json();

            if (response.ok) {
                return json;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }

    GET_USER_PROFILE = async (user_seq) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/userprofile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ user_seq: user_seq })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    SAVE_PROFILE_IMAGE = async (formData) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/profileimage', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                credentials: 'include',
                body: formData,
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
    USER_APPSTATE = async (appstate, data) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/appstate', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ appState: appstate, pushToken: data }),
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
    PROFILE_CHANGE = async (data) => {
        var sendData = new Object();
        switch (data.code) {
            case '0':
                sendData = {
                    user_name: data.data
                }
                break;
            case '1':
                sendData = {
                    user_phone: data.data
                }
                break;
        }
        try {
            var response = await fetch('https://mostfeel.site/api/auth/profile', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(sendData),
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    PROFILE_CMP_CHANGE = async (data) => {
        var sendData = new Object();
        switch (data.code) {
            case '0':
                sendData = {
                    cmp_name: data.data
                }
                break;

            case '1':
                sendData = {
                    cmp_phone: data.data
                }
                break;
        }
        try {
            var response = await fetch('https://mostfeel.site/api/auth/cmpprofile', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(sendData),
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }
    SET_BANNED_USER = async (data) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/ban', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ receiver_seq: data }),
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
    GET_BANNED_LIST = async () => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/banlist', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
    REMOVE_BAN_USER = async (data) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/removeban', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ target_user_seq: data })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    GET_COUPONS = async () => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/removeban', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ target_user_seq: data })
            });
            var json = await response.json();
        } catch (err) {
            console.log(err);
        }
    }

    SEND_USER_EMAIL = async (data) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/userid', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_email: data })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
    FIND_USER_PASSWORD = async (data) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/userpw', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_email: data })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    PASSWORD_UPDATE = async (data) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/userpw', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_email: data })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
    UPDATE_PASSWORD = async (prevPassword, newPassword) => {
        try {
            var response = await fetch('https://mostfeel.site/api/auth/newpassword', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prevPassword : prevPassword, newPassword : newPassword})
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
}


export default new AUTHENTICATION();