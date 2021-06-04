#!/usr/bin/env node

/**
 * clean-empty-dir
 * a command to clean all the empty dirs.
 *
 * @author weiran <https://github.com/aladdin-add>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
})();
