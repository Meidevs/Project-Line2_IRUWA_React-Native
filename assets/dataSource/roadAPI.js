class ROADAPI {
    GET_CURRENT_LOCATION = async (position) => {
        try {
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
    SEARCH_DETAIL_ADDRESS = async (pageNum, location) => {
        try {
            var xhr = new XMLHttpRequest();
            // var url = `https://dapi.kakao.com/v2/local/search/keyword.json?page=${pageNum}&size=10&sort=accuracy&query=${location}`;
            // let response = await fetch(url, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         "Authorization": "KakaoAK fc1b70cdd283cc64b06d6d36d2f539a1",
            //     }
            // });
            var url = 'http://openapi.epost.go.kr/postal/retrieveNewAdressAreaCdSearchAllService/retrieveNewAdressAreaCdSearchAllService/getNewAddressListAreaCdSearchAll'
            var queryString = '?' + encodeURIComponent('ServiceKey') + '=' + 'EhJ8pn%2BJ1rcopTcJ8pnoe8TB2odM%2BGc%2FxWa7EHc7zuopxJOhVcBWDa4wChyKZ9DVMI8zsDQy8ck8v9FCBg6lNg%3D%3D';
            queryString += '&' + encodeURIComponent('srchwrd') + '=' + encodeURIComponent('공평동');
            queryString += '&' + encodeURIComponent('countPerPage') + '=' + encodeURIComponent('10');
            queryString += '&' + encodeURIComponent('currentPage') + '=' + encodeURIComponent('1');
            xhr.open(url + queryString);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
                }
            };
            // let json = await response.text();
            // console.log(json)
            if (response.ok) {
                return json;
            }
        } catch (err) {
            console.log(err);
        }
    }

    SEARCH_ADDRESS = async (location) => {
        try {
            var url = `https://dapi.kakao.com/v2/local/search/address.json?page=1&size=10&query=${location}`;
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