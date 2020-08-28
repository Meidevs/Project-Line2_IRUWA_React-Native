const TimeGap = (data) => {
    var now = new Date();
    var old = new Date(data);
    var time = now.getTime() - old.getTime();
    var Hour = parseInt(time / (1000 * 60 * 60));
    var Minute = parseInt((time / 60000) % 60);
    var Seconds = parseInt((time % 3600) / 100);
    var timeGapString;

    if (Hour >= 24) {
        timeGapString = parseInt(Hour / 24) + '일 전';
    } else if (Hour != 0) {
        timeGapString = Hour + '시간 전';
    } else if (Minute != 0) {
        timeGapString = Minute + '분 전';
    } else {
        timeGapString = Seconds + '초 전';
    }
    return timeGapString;
};

export default TimeGap;