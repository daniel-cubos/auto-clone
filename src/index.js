
const shell = require('shelljs');


const repos = [""];

shell.cd('challanges');

for (const repo of repos) {

    try {
        const splitedNames = repo.split(':')[1].split('/');
        const folderName = splitedNames[0];
        const repoName = splitedNames[1].split('.git')[0];

        shell.mkdir(folderName);

        shell.cd(`${folderName}`);

        shell.exec(`git clone ${repo}`);

        shell.cd(`${repoName}`);
        shell.cp('-R', '../../../src/cypressfiles', 'cypress');

    } catch (error) {
        continue;
    } finally {
        shell.cd('..');
    }

}

console.log("Done")