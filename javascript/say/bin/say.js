#!/usr/bin/env node

/*!
 * If you are in macOS, you can try this script with:
 *
 * $ say.js 231 | say
 *
 * It will read the number loudly.
 */
var num = process.argv[2];
var out = require("../say.js").inEnglish(num);
process.stdout.write(out + '\n');

