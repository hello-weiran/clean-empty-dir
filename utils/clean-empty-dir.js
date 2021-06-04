'use strict';
const fs = require('fs');
const path = require('path');

/**
 * clean empty dirs recursively.
 * @param {*} dir to clean
 * @returns cleaned dirs
 */
module.exports = function cleanEmptyDir(dirs) {
	const emptyDirs = [];
	dirs = Array.isArray(dirs) ? dirs : [dirs];

	for (const dir of dirs) {
		const isDir = fs.statSync(dir).isDirectory();
		if (!isDir) {
			return emptyDirs;
		}
		let files = fs.readdirSync(dir);
		if (files.length > 0) {
			files.forEach(function (file) {
				const fullPath = path.join(dir, file);
                const _dirs = cleanEmptyDir(fullPath);
                emptyDirs.push(..._dirs)
			});

			// re-evaluate files; after deleting subfolder
			// we may have parent folder empty now
			files = fs.readdirSync(dir);
		}

		if (files.length == 0) {
			console.log('removing: ', dir);
			emptyDirs.push(dir);
			fs.rmdirSync(dir);
		}
	}

	return emptyDirs;
};
