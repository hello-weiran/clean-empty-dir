#!/usr/bin/env node

/**
 * clean-empty-dir
 * a command to clean all the empty dirs.
 *
 * @author weiran <https://github.com/aladdin-add>
 */

const clean = require('./utils/clean-empty-dir');
const cli = require('./utils/cli');
const log = require('./utils/log');

// by defalut, just clean the cwd.
const input = cli.input.length ? cli.input : [process.cwd()];
const flags = cli.flags;
const { debug } = flags;

(async () => {
	const emptyDirs = clean(input);
	log('successfully cleaned empty dirs: ', emptyDirs.join('\n'));
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
})();
