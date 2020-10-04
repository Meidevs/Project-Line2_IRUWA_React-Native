class AUTHENTICATION {
    LOGIN = async (user_id, user_pw, user_device) => {
        try {
            let response = await fetch('http://192.168.0.40:8888/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ user_id: user_id, user_pw: user_pw, user_device : user_device})
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
            let response = await fetch('http://192.168.0.40:8888/api/auth/logout', {
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
        console.log(formData)
        try {
            let response = await fetch('http://192.168.0.40:8888/api/auth/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
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

    GET_USER_INFOs = async () => {
        try {
            let response = await fetch('http://192.168.0.40:8888/api/auth/info', {
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
            let response = await fetch('http://192.168.0.40:8888/api/auth/userlocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body : JSON.stringify({user_location : user_location})
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
            var response = await fetch('http://192.168.0.40:8888/api/auth/userprofile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body : JSON.stringify ({user_seq : user_seq})
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
            var response = await fetch('http://192.168.0.40:8888/api/auth/profileimage', {
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

    SET_DEVICE_TOKEN = async () => {
        try {

        } catch (err) {
            
        }
    }
}


export default new AUTHENTICATION();