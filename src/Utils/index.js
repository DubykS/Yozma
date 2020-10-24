export const setStorage = data => {
    return  localStorage.setItem('contacts',  JSON.stringify(data))
}
export const getStorage = () => {
    return JSON.parse(localStorage.getItem('contacts'))
}