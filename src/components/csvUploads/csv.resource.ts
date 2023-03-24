
const url = 'http://localhost:3005/api/csv/uploads'



export const getCsvFiles = async () => {
    const response = await fetch(url);
    return response
}