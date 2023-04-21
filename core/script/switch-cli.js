const { switchVersion } = require('./utils');

const version = process.argv[2];

if (version == '2') {
    switchVersion(2);
} else if (version == '3') {
    switchVersion(3);
} else {
    console.warn(
        `[vue-office] expecting version "2" or "3" but got "${version}"`
    );
    process.exit(1);
}