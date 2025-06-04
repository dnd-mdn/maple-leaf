import EventEmitter from "events";
import axios from "axios";

import Ajv from "ajv";
import schema from "../schemas/feed.json";


const isValid = new Ajv().compile(schema);


const defaultConfig = {
	en: {
		root: '/en/department-national-defence/maple-leaf',
		live: '/content/dam/dnd-mdn/documents/json/maple-en.json',
	},
	fr: {
		root: '/fr/ministere-defense-nationale/feuille-derable',
		live: '/content/dam/dnd-mdn/documents/json/maple-fr.json2',
	},
	match: /\/\d{4}\/\d{2}\/[^/]+$/
}

class Feed extends EventEmitter {

	/**
	 * Create a new Feed instance
	 * @param {Object} config Configuration object
	 * @param {Object} console Console object for logging
	 */
	constructor(config = defaultConfig, console) {
		super();

		this.config = config;
		this.isActive = false;

		this._data = {};
		this._warnings = [];

		this.en = {data: []};
		this.fr = {data: []};
	}

	async run() {
		this.isActive = true;
		this.#status('ℹ️ Starting feed generation\n');

		await this.#loadFeeds();
		await this.validate();
	}

	/**
	 * Download all live feed data
	 */
	async #loadFeeds() {
		await this.#loadFeed('en')
		await this.#loadFeed('fr')
	}

	/**
	 * Download live feed data
	 * @param {string} url The URL of the feed to get
	 * @throws {Error} If the feed is unreachable or invalid
	 * @returns {Object} The feed object
	 */
	async #loadFeed(lang) {
		this.#status(`ℹ️ Downloading ${lang === 'en' ? 'English' : 'French'} feed...`);

		const url = new URL(this.config[lang].live, 'https://www.canada.ca');
		const response = await axios.get(url, { timeout: 10000 });
	
		if (response.status !== 200) {
			throw new Error(`⛔ Error: ${response.statusText}`);
		}

		this[lang] = response.data;
		this.#status(`✅ Downloaded successfull\n`);
	}

	/**
	 * Validate contents using the schema
	 * @throws {Error} If it fails validation
	 */
	validate() {
		this.#status('Validating feed contents...');

		if (!isValid(this.en) || !isValid(this.fr)) {
			throw new Error(`Validation failed`);
		}

		this.#status('Validation passed');
	}

	/**
	 * Emit a status message
	 * @param {string} message 
	 */
	#status(message) {
		this.emit('status', `${message}`);
	}

}

export default Feed;