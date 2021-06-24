const fs = require('fs');
const readline = require('readline');

// array[users, actives] 
const brazilInfo = [0, 0], chileInfo = [0, 0], mexicoInfo = [0, 0]; 

// Capturar o stdin do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.question('Digite o arquivo log que deseja ler: ', (logFile) => {
    readLogs(logFile);
    rl.close();
});

// Função para ler os logs
function readLogs(logFile) {
    const data = fs.readFileSync(logFile, { encoding: 'utf-8' }); // lê os dados do arquivo passado como parêmetro
    const logsArray = data.split('\r\n'); // separar os espaços e tabs

    for(let logs of logsArray) {
        const countryID = logs.slice(0,2); // ID do país (55 Brasil, 56 Chile, etc)
        const info = logs.split(' ')[1]; // 'assinado' ou 'cancelado'
        storeInfo(countryID, info);        
    }
    printInfo();
}

// Função para armazenar os dados do log nas variáveis referentes à cada país.
function storeInfo(countryID, info) {    
    if(countryID === '55') { // 55 --> Brasil 
        if(info === 'assinado') brazilInfo[1]++; // Actives
        brazilInfo[0]++; // Total users
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

// Função para armazenar os resultados da análise em um arquivo
function printInfo() {
    const analyzedData = `Brasil, ${brazilInfo[0]}, ${brazilInfo[1]}\nChile, ${chileInfo[0]}, ${chileInfo[1]}\nMéxico, ${mexicoInfo[0]}, ${mexicoInfo[1]}`;
    
    fs.writeFile('./analyzedData.txt', analyzedData, error => {
        if(error) {
            console.log(error);
            return;
        }
        console.log("Arquivo de análise de dados criado com sucesso!\n");
    });
}

// melhorias --> hash table com a tupla countryID e o nome do país, apenas seria necessário
// uma busca no hash para comparar o id e alterar as variáveis em questão (com template string)
// por ex: tupla (55, Brasil) --> armazena a informação em ${tupla.pais}info[]