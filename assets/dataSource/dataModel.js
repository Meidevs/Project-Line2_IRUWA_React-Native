class DATA_SORUCE {
    GET_ITEMS = async (user_location) => {
        try {
            var response = await fetch('http://localhost:8888/api/item/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials : 'include',
                body: JSON.stringify({ user_location: user_location })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }

    GET_CATEGORIES = async () => {
        try {
            var response = await fetch('http://localhost:8888/api/category/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            var json = await response.json();

            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }

    SAVE_IMAGES = async (formData) => {
        console.log(formData)
        try {
            var response = await fetch('http://localhost:8888/api/item/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                credentials : 'include',
                body: formData, 
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }
}


export default new DATA_SORUCE();