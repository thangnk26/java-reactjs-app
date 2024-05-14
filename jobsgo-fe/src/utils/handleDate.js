export const formatDate = (dateStr, type = 'dd-mm-yyyy') => {
    const today = new Date(dateStr);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hh = today.getHours();
    let MM = today.getMinutes();
    let ss = today.getSeconds();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    switch (type) {
        case 'dd-mm-yyyy':
            return dd + '-' + mm + '-' + yyyy;
        case 'yyyy-mm-dd':
            return yyyy + '-' + mm + '-' + dd;
        case 'dd-mm-yyyy hh:MM:ss':
            return dd + '-' + mm + '-' + yyyy + ' ' + hh + ':' + MM + ':' + ss;
        default:
            break;
    }
};

export const minusDate = (dateEnd) => {
    const date1 = new Date();
    const date2 = new Date(dateEnd);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};
