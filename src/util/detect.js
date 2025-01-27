
/**
 * Check if a website is reachable
 *
 * @param {string} url The URL of an image to attempt to load
 * @param {number} timeoutMs Maximum time to wait
 * @returns {Promise<boolean>} Resolves to true if reachable, false otherwise
 */
const isReachable = (url, timeoutMs = 5000) => {
    return new Promise((resolve) => {
        const img = new Image();
        let timedOut = false;

        const timer = setTimeout(() => {
            timedOut = true;
            resolve(false);
        }, timeoutMs);

        img.onload = () => {
            if (!timedOut) {
                clearTimeout(timer);
                resolve(true);
            }
        };

        img.onerror = () => {
            if (!timedOut) {
                clearTimeout(timer);
                resolve(false);
            }
        };

        img.src = `${url}?_=${Date.now()}`;
    });
};


export const isDWAN = async () => await isReachable('https://d365.mil.ca/favicon.ico');

export const isGCNet = async () => await isReachable('https://www.gcpedia.gc.ca/gcwiki/skins/Vector/GCWeb/assets/favicon.ico');

