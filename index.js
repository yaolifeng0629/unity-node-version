#!/usr/bin/env node

import fs from 'fs';
import { exec } from 'child_process';

// Read the .nvmrc file to get the desired Node version
fs.readFile('.nvmrc', 'utf8', (err, desiredNodeVersion) => {
    if (err) {
        console.error('Failed to read .nvmrc file');
        process.exit(1);
    }

    desiredNodeVersion = desiredNodeVersion.trim().replace('v', '');

    const currentNodeVersion = process.version.replace('v', '');

    // If the current Node version does not match the version in the .nvmrc file
    if (currentNodeVersion !== desiredNodeVersion) {
        console.log(
            `Current Node version (${currentNodeVersion}) With the version in the .nvmrc file (${desiredNodeVersion}) Mismatch`
        );
        console.log();

        // Check if nvm is installed
        exec('command -v nvm', err => {
            if (err) {
                console.error('Please install nvm and make sure it is available in PATH');
                console.log('Download Url:', 'https://github.com/coreybutler/nvm-windows/releases');
                console.log();
                process.exit(1);
            }

            // Use nvm to switch to the correct Node version
            exec(`nvm use ${desiredNodeVersion}`, (err, stdout, stderr) => {
                if (err) {
                    console.error(`Switch to Node version ${desiredNodeVersion} fail!`);
                    console.error(stderr);

                    console.log();
                    process.exit(1);
                }

                console.log(stdout);
            });
        });
    } else {
        console.log('Great, the current version of Node matches the version in .nvmrc!');
        process.exit(1);
    }
});
