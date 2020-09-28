class DATA_SORUCE {
    GET_ITEMS = async (user_location) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
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

    DELETE_ITEM = async (items_seq) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/removeitem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ items_seq : items_seq })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }

    GET_PREMIUM_ITEMS = async (user_location) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/premiums', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ user_location: user_location })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {

        }
    }


    GET_ITEM_DETAIL = async (items_seq, cmp_seq) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/list/detail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ items_seq: items_seq, cmp_seq: cmp_seq })
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
            var response = await fetch('http://192.168.0.40:8888/api/category/all', {
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
            var response = await fetch('http://192.168.0.40:8888/api/item/create', {
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
            console.log(err)
        }
    }

    UPDATE_IMAGE = async (formData) => {
        console.log(formData)
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/update', {
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
            console.log(err)
        }
    }

    GET_ITEMS_ON_KEYWORD = async (keyword) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/search/keyword', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ keyword: keyword }),
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }
    GET_ITEMS_ON_CATEGORY = async (category_seq) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/search/category', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ category_seq: category_seq })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err)
        }
    }

    GET_MY_ITEMS = async (cmp_seq) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/mylist', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ cmp_seq: cmp_seq })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    UPDATE_ITEM_PICK = async (items_seq) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/list/pick', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ items_seq: items_seq })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    GET_MY_PICKS = async (user_seq) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/mypick', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
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
    INSERT_RINGING_LIST = async (data) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/phone', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ data: data })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    DELETE_RINGING_LIST = async (phone_seq) => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/removephone', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ phone_seq: phone_seq })
            });
            var json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    GET_RINGING_LIST = async () => {
        try {
            var response = await fetch('http://192.168.0.40:8888/api/item/phonelist', {
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
}


export default new DATA_SORUCE();