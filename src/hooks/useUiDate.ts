export const useUiDate = (str: string) => {
    const arr = str.split(' ');
    let day = arr[0].split('.');
    let time = arr[1].replace('.', ':').split('.');
    time.pop();
    const date = format(day.concat(time))
    return `${date}`
}

const format = (arr: string[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = arr[0];
    const month = months[Number(arr[1])-1];
    const year = arr[2];
    const time = arr[3]
    return `${month} ${day}, ${year} at ${time}`
}
