export async function getAdress(ip = '8.8.8.8') {
    const response = await fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=at_kpiKUBLAyYln1JoxmqyU7Ve0yx4bH&ipAddress=${ip}`
    );
    return await response.json();
}
