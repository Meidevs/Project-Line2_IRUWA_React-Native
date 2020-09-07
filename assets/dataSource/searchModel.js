class SEARCH_API {
    SAVE_PREV_SEARCH_LIST = async (data) => {
        console.log('dadadad', data)
        try {
            var response = await fetch('http://127.0.0.1:8888/api/search/history/update', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ keyword: data })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {

        }
    }

    GET_PREV_SEARCH_LIST = async () => {
        try {
            var response = await fetch('http://127.0.0.1:8888/api/search/history/read', {
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

    DELETE_PREV_SEARCH_LIST = async (keyword) => {
        try {
            var response = await fetch('http://127.0.0.1:8888/api/search/history/delete', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ keyword: keyword })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
    DELETE_PREV_ALL = async () => {
        try {
            var response = await fetch('http://127.0.0.1:8888/api/search/history/deleteall', {
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

        }
    }
}


export default new SEARCH_API();