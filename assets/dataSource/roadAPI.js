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
                var locationString;
                var data = json.documents[1].address_name.split(' ');
                if (data.length == 3) {
                    switch (data[0]) {
                        case "서울특별시":
                            locationString = '서울';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '대구광역시':
                            locationString = '대구';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '대전광역시':
                            locationString = '대전';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '부산광역시':
                            locationString = '부산';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '광주광역시':
                            locationString = '광주';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '인천광역시':
                            locationString = '인천';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '울산광역시':
                            locationString = '울산';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '부산광역시':
                            locationString = '부산';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '경기도':
                            locationString = '경기';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '강원도':
                            locationString = '강원';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '충청북도':
                            locationString = '충북';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '충청남도':
                            locationString = '충남';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '전라북도':
                            locationString = '전북';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '전라남도':
                            locationString = '전남';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '경상북도':
                            locationString = '경북';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;
                        case '경상남도':
                            locationString = '경남';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            break;

                    }
                } else {
                    switch (data[0]) {
                        case '서울특별시':
                            locationString = '서울';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '대구광역시':
                            locationString = '대구';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '대전광역시':
                            locationString = '대전';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '부산광역시':
                            locationString = '부산';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '광주광역시':
                            locationString = '광주';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '인천광역시':
                            locationString = '인천';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '울산광역시':
                            locationString = '울산';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '부산광역시':
                            locationString = '부산';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '경기도':
                            locationString = '경기';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '강원도':
                            locationString = '강원';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '충청북도':
                            locationString = '충북';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '충청남도':
                            locationString = '충남';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '전라북도':
                            locationString = '전북';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '전라남도':
                            locationString = '전남';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '경상북도':
                            locationString = '경북';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                            break;
                        case '경상남도':
                            locationString = '경남';
                            locationString += ' ' + data[1];
                            locationString += ' ' + data[2];
                            locationString += ' ' + data[3];
                    }
                }
                return locationString;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
    }
    SEARCH_DETAIL_ADDRESS = async (keyword) => {
        try {
            var keyword = keyword;
            let response = await fetch(`http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=100&keyword=${keyword}&confmKey=U01TX0FVVEgyMDIwMDgyNzA0MTc0NzExMDExMTc=&resultType=json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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