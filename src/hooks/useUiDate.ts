export const useUiDate = (str: string) => {
    const arr = str.split('T');
    let date;

    date = arr[0].split("-");
    const time = arr[1].split(":");
    date = date.concat(time);
    date.pop();
    date = format(date)
    return `${date}`
}

const format = (strs: string[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let month;
    let day;
    const year = strs[0];
    month = Number(strs[1]);
    day = strs[2];
    day = day.charAt(0) === '0' && day.replace('0', '');
    month = months[month-1];
    const time = `${strs[3]}:${strs[4]}`
    return `${month} ${day}, ${year} at ${time}`
}
