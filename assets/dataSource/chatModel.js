class CHATTING {
    USER_INFO = async () => {
        try {
            let response = await fetch('https://mostfeel.site/api/chat/user/infos', {
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

    CMP_INFO = async (cmp_seq) => {
        try {
            let response = await fetch('https://mostfeel.site/api/chat/company/infos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body : JSON.stringify({cmp_seq : cmp_seq})
            });

            let json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {

        }
    }

    ITEM_INFO = async (items_seq) => {
        try {
            let response = await fetch('https://mostfeel.site/api/chat/items/infos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body : JSON.stringify({items_seq : items_seq})
            });

            let json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {

        }
    }
}


export default new CHATTING();