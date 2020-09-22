class AUTHENTICATION {
    LOGIN = async (user_id, user_pw) => {
        try {
            let response = await fetch('http://192.168.25.41:8888/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ user_id: user_id, user_pw: user_pw })
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
            let response = await fetch('http://192.168.25.41:8888/api/auth/logout', {
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
    REGISTER = async (data) => {
        try {
            let response = await fetch('http://192.168.25.41:8888/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    status: data.status,
                    user_id: data.user_id,
                    user_pw: data.user_pw,
                    user_name: data.user_name,
                    user_phone: data.user_phone,
                    user_email: data.user_email,
                    user_location: data.user_location,
                    category_seq: data.category_seq,
                    cmp_name: data.cmp_name,
                    cmp_phone: data.cmp_phone,
                    cmp_location: data.cmp_location,
                    cmp_detail_location : data.cmp_detail_location,
                    lat : data.lat,
                    lon : data.lon,
                    cmp_certificates: data.cmp_certificates,
                })
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
            let response = await fetch('http://192.168.25.41:8888/api/auth/info', {
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

        }
    }

    UPDATE_USER_LOCATION = async (user_location) => {
        try {
            let response = await fetch('http://192.168.25.41:8888/api/auth/userlocation', {
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
            var response = await fetch('http://192.168.25.41:8888/api/auth/userprofile', {
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
            var response = await fetch('http://192.168.25.41:8888/api/auth/profileimage', {
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
}


export default new AUTHENTICATION();