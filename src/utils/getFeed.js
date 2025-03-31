import axios from 'axios';
import Ajv from 'ajv';
import schema from '../schemas/feed.json';

/**
 * Load and validate a feed from a URL
 * @param {string} url The URL of the feed to get
 * @throws {Error} If the feed is not reachable or invalid
 * @returns {Object} The feed object
 */
const getFeed = async (url) => {
    const response = await axios.get(url, { timeout: 5000 });

    if (response.status !== 200) {
        throw new Error(`HTTP Error: ${response.statusText}`);
    }

    // Validate the response data against the schema
    const validate = new Ajv().compile(schema);
    const valid = validate(response.data);

    if (!valid) {
        console.error('Validation errors:', validate.errors);
        throw new Error(`Validation failed ${url}`);
    }

    return response.data;
}

export default getFeed;