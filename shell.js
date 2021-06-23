const shell = require('shelljs');


const repos = "git@github.com:aldusosi/desafio-modulo-03.git,git@github.com:anabeatrizgn/desafio-modulo-03.git,git@github.com:beatriztourinho/desafio-modulo-03.git"

const splitedRepos = repos.split(',');


shell.cd('challange');


for (const repo of splitedRepos) {
    const splitedNames = repo.split(':')[1].split('/');
    const folderName = splitedNames[0];
    const repoName = splitedNames[1].split('.git')[0];
    
    // criar as pastas para cada aluno
    shell.mkdir(folderName);

    // clonar os repositórios nas pastas corretas
    shell.cd(`${folderName}`);

    if (shell.exec(`git clone ${repo}`).code === 0) {
        shell.echo('Cloned with success!');     
        shell.cd(repoName);
        shell.exec('npm install');
        shell.cd('..');
    } else {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }
    shell.cd('..');
}

console.log("Done")