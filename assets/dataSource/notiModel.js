class DATA_SORUCE {
    GET_NOTIFICATIONS = async (user_location) => {
        try {
            var response = await fetch('http://localhost:3000/api/noti/list', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
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