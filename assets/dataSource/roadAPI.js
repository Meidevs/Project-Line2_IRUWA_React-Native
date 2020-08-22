class ROADAPI {
    GET_CURRENT_LOCATION = async (position) => {
        try {
            var version = 1;
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            var addressType = 'A01';
            var appKey = 'l7xxba602108162b4d6b83018e804f81a596';
            var url = `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=${version}&lat=${lat}&lon=${lon}&coordType=WGS84GEO&addressType=${addressType}&appKey=${appKey}`
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            if (response.ok) {
                return json.addressInfo.fullAddress;
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