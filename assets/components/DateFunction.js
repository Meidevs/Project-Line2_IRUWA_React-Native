const TodayTimeString = async () => {
    return new Promise(
        async (resolve, reject) => {
            try {
                var today = new Date().toISOString();
                resolve(today)
            } catch (err) {
                reject(err);
            }
        }
    )
}

export default TodayTimeString;