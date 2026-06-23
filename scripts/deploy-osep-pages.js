/* eslint-disable no-console */
/**
 * OSEP GitHub Pages deployment helper.
 *
 * This script is intentionally written with Node.js APIs instead of PowerShell,
 * so it can run reliably on Windows, macOS, and Linux.
 *
 * Usage:
 *   npm run deploy:osep
 *   npm run deploy:osep -- "MVP-31-2 build for GitHub Pages"
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const sourceOsepDir = path.join(rootDir, 'static', 'osep');
const targetOsepDir = path.join(buildDir, 'osep');
const noJekyllPath = path.join(buildDir, '.nojekyll');

const run = command => {
    console.log(`\n> ${command}`);
    childProcess.execSync(command, {
        cwd: rootDir,
        stdio: 'inherit',
        shell: true
    });
};

const getCommand = command => (
    process.platform === 'win32' ? `${command}.cmd` : command
);

const removeDirIfExists = dirPath => {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, {
            recursive: true,
            force: true
        });
    }
};

const copyDir = (source, target) => {
    fs.cpSync(source, target, {
        recursive: true
    });
};

const getCurrentCommit = () => {
    try {
        return childProcess
            .execSync('git rev-parse --short HEAD', {
                cwd: rootDir,
                encoding: 'utf8'
            })
            .trim();
    } catch (error) {
        return 'unknown';
    }
};

const quoteForShell = value => JSON.stringify(value);

const main = () => {
    const customMessage = process.argv.slice(2).join(' ').trim();
    const commit = getCurrentCommit();
    const message = customMessage || `OSEP GitHub Pages build for ${commit}`;

    console.log('OSEP GitHub Pages deployment started.');
    console.log(`Project root: ${rootDir}`);
    console.log(`Deploy message: ${message}`);

    run(`${getCommand('npm')} run build`);

    if (!fs.existsSync(sourceOsepDir)) {
        throw new Error(`Missing source folder: ${sourceOsepDir}`);
    }

    console.log('\n> Sync static/osep to build/osep');
    removeDirIfExists(targetOsepDir);
    copyDir(sourceOsepDir, targetOsepDir);

    console.log('\n> Create build/.nojekyll');
    fs.closeSync(fs.openSync(noJekyllPath, 'w'));

    run(`${getCommand('npx')} gh-pages -t -d build -m ${quoteForShell(message)}`);

    console.log('\nOSEP GitHub Pages deployment completed.');
};

try {
    main();
} catch (error) {
    console.error('\nOSEP GitHub Pages deployment failed.');
    console.error(error && error.message ? error.message : error);
    process.exit(1);
}
