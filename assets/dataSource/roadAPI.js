class ROADAPI {
    GET_CURRENT_LOCATION = async (position) => {
        try {
            console.log(position)
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?input_coord=WGS84&output_coord=WGS84&x=${lon}&y=${lat}`;
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'KakaoAK fc1b70cdd283cc64b06d6d36d2f539a1'
                }
            });
            let json = await response.json();
            if (response.ok) {
                return json.documents[1].address_name;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }

    SEARCH_ADDRESS = async (location) => {
        try {
            var url = `https://dapi.kakao.com/v2/local/search/address.json?page=1&size=10&query=%ED%95%A9%EC%A0%95%EB%8F%99`;
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "KakaoAK fc1b70cdd283cc64b06d6d36d2f539a1",
                }
            });
            let json = await response.json();
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }
}


export default new ROADAPI();