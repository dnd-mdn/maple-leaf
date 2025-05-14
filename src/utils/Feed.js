import EventEmitter from "events";
import axios from "axios";

const defaultConfig = {
	en: {
		root: '/en/department-national-defence/maple-leaf',
		live: '/content/dam/dnd-mdn/documents/json/maple-en.json',
	},
	fr: {
		root: '/fr/ministere-defense-nationale/feuille-derable',
		live: '/content/dam/dnd-mdn/documents/json/maple-fr.json',
	},
}

class Feed extends EventEmitter {

	constructor(config = defaultConfig) {
		super();

		this.config = config;
		this.cache = {};
		this._log = [];
	}

	async load() {
		const promises = Object.entries(this.config).map(async ([lang, { current }]) => {
			if (!this.cache[lang]) {
				try {
					const response = await axios.get(current, { timeout: 5000 });
					this.cache[lang] = response.data;
				} catch (error) {
					console.error(`Error loading feed for ${lang}:`, error);
					throw new Error(`Failed to load feed for ${lang}`);
				}
			}
		});

		await Promise.all(promises);
	}

	/**
	 * Log messages to an internal array of messages
	 * @param {string} message - The message to log
	 * @param {boolean} [overwrite=false] - If true, overwrite the last message instead of adding a new one
	 * @private
	 */
	#log(message, overwrite = false) {
		if (overwrite) {
			this._log[this._log.length - 1] = message;
		} else {
			this._log.push(message);
		}

		this.emit("progress", this._log);
	}

}

export default Feed;