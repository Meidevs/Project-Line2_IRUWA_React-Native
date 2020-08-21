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

    SEARCH_ADDRESS = async () => {
        try {
            var version = 1;
            var count = 10;
            var page = 10;
            var area_dong = '합정동';
            var callback = 'application/json';
            var appKey = 'l7xxba602108162b4d6b83018e804f81a596';
            var url = `https://apis.openapi.sk.com/tmap/poi/findPoiAreaDataByName?version=${version}&count=${count}&page=${page}&area_dong=${area_dong}&callback=${callback}&appKey=${appKey}`;
            console.log(url);

            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            console.log(json)
            if (response.ok) {
                console.log('json')
            }
        } catch (err) {
            console.log(err);
        }
    }
}


export default new ROADAPI();