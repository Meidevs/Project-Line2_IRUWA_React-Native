class DATA_SORUCE {
    GET_ITEMS = async (user_location) => {
        try {
            var response = await fetch('http://localhost:8888/api/item/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
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

    GetCategoryList = async () => {
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

    UpdateLocationStatus = async (data) => {
        try {
            var response = await fetch('http://localhost:3000/api/locations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data })
            });
            var json = await response.json();

            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log('Update Location Status Err :', err)
        }
    }

    GetItemInfos = async (data) => {
        try {
            var response = await fetch('http://localhost:3000/api/itemdetail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log('Fail! Getting Item Information!');
        }
    }

    GetAdsList = async (data) => {
        try {
            var response = await fetch('http://localhost:3000/api/adslist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: data })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log('Fail! Getting Item Information!');
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