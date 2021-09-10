const shell = require('shelljs');


const repos = [""];

// Only Users Linux
// shell.exec('git config --global user.name ');
// shell.exec('git config --global user.email ');
// shell.exec('git config --global user.password ');

shell.cd('challanges');


for (const repo of repos) {

    try {
        const splitedNames = repo.split(':')[1].split('/');
        const folderName = splitedNames[0];
        const repoName = splitedNames[1].split('.git')[0];

        shell.mkdir(folderName);

        shell.cd(`${folderName}`);
        shell.exec(`git clone ${repo}`)
    } catch (error) {
        continue;
    } finally {
        shell.cd('..');
    }

}

console.log("Done")