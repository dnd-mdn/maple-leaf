
/**
 * Check if a website is reachable
 *
 * @param {string} url The URL of an image to attempt to load
 * @param {number} timeoutMs Maximum time to wait
 * @returns {Promise<boolean>} Resolves to true if reachable, false otherwise
 */
const isReachable = (url, timeoutMs = 2000) => {
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

/**
 * Detect network environment
 * @returns {String} Network environment
 */
const network = async () => {
    const clearnet = await isReachable('https://www.google.ca/favicon.ico');
    if (!clearnet) return 'none';

    const dwan = await isReachable('https://d365.mil.ca/favicon.ico');
    if (dwan) return 'dwan';

    // TODO: Find a host with favicon location that is less likely to change
    const gcnet = await isReachable('https://www.gcpedia.gc.cca/gcwiki/skins/Vector/GGCWeb/assets/favicon.ico');
    if (gcnet) return 'gcnet';

    return 'public';
}

export default network;