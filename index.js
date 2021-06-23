const fs = require('fs');
const readline = require('readline');

const brazilInfo = [0, 0], chileInfo = [0, 0], mexicoInfo = [0, 0]; // array[users, actives] 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.question('Digite o arquivo log que deseja ler: ', (logFile) => {
    console.log('');
    readLogs(logFile);
    rl.close();
})

function readLogs(logFile) {
    const data = fs.readFileSync(logFile, { encoding: 'utf-8' });
    const logsArray = data.split('\r\n');    

    for(let logs of logsArray) {
        const countryID = logs.slice(0,2); // ID do país (55 Brasil, 56 Chile, etc)
        const info = logs.split(' ')[1];
        storeInfo(countryID, info);        
    }
    printInfo();
}

function storeInfo(countryID, info) {    
    if(countryID === '55') { // 55 --> Brasil 
        if(info === 'assinado') brazilInfo[1]++;
        brazilInfo[0]++;
    } 

    if(countryID === '56') { // 56 --> Chile
        if(info === 'assinado') chileInfo[1]++;
        chileInfo[0]++;
    }

    if(countryID === '52') { // 52 --> México
        if(info === 'assinado') mexicoInfo[1]++
        mexicoInfo[0]++;
    }
}

function printInfo() {
    console.log(`Brasil, ${brazilInfo[0]}, ${brazilInfo[1]}`);
    console.log(`Chile, ${chileInfo[0]}, ${chileInfo[1]}`);
    console.log(`México, ${mexicoInfo[0]}, ${mexicoInfo[1]}`);
}


// melhorias --> hash table com a tupla countryID e o nome do país, apenas seria necessário
// uma busca no hash para comparar o id e alterar as variáveis em questão (com template string)
// por ex: tupla (55, Brasil) --> armazena a informação em ${tupla.pais}info[]