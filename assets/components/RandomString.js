const hashCode = (s) => {
    console.log(s)
    let i;
    let h;
    for (i = 0, h = 0; i < s.length; i++) {
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    }
    return h;
};

export default hashCode;