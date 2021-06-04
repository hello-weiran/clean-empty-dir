'use strict';

/**
 * clean empty dirs recursively.
 * @param {*} dir to clean
 * @returns cleaned dirs
 */
module.exports = function cleanEmptyFoldersRecursively(dir) {
	const fs = require('fs');
	const path = require('path');
	const clearedDirs = [];

	const isDir = fs.statSync(dir).isDirectory();
	if (!isDir) {
		return clearedDirs;
	}
	let files = fs.readdirSync(dir);
	if (files.length > 0) {
		files.forEach(function (file) {
			const fullPath = path.join(dir, file);
			clearedDirs.push(...cleanEmptyFoldersRecursively(fullPath));
		});

		// re-evaluate files; after deleting subfolder
		// we may have parent folder empty now
		files = fs.readdirSync(dir);
	}

	if (files.length == 0) {
		console.log('removing: ', dir);
		clearedDirs.push(dir);
		fs.rmdirSync(dir);
	}
};
