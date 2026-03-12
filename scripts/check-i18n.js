const fs = require('fs');
const path = require('path');

const PT_PATH = path.join(__dirname, '../src/dictionaries/pt.json');
const EN_PATH = path.join(__dirname, '../src/dictionaries/en.json');
const ES_PATH = path.join(__dirname, '../src/dictionaries/es.json');

// Função recursiva para extrair todos os caminhos de chaves (ex: navbar.home)
function getAllKeys(obj, prefix = '') {
    return Object.keys(obj).reduce((res, el) => {
        const name = prefix ? `${prefix}.${el}` : el;
        if (typeof obj[el] === 'object' && obj[el] !== null && !Array.isArray(obj[el])) {
            res.push(...getAllKeys(obj[el], name));
        } else if (Array.isArray(obj[el])) {
            // Para arrays (como services), verificamos a estrutura do primeiro item
            res.push(`${name}[]`);
            if (obj[el].length > 0 && typeof obj[el][0] === 'object') {
                res.push(...getAllKeys(obj[el][0], `${name}[0]`));
            }
        } else {
            res.push(name);
        }
        return res;
    }, []);
}

function checkI18n() {
    console.log('🔍 Iniciando verificação de integridade dos dicionários...\n');

    const pt = JSON.parse(fs.readFileSync(PT_PATH, 'utf8'));
    const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
    const es = JSON.parse(fs.readFileSync(ES_PATH, 'utf8'));

    const ptKeys = new Set(getAllKeys(pt));
    const enKeys = new Set(getAllKeys(en));
    const esKeys = new Set(getAllKeys(es));

    const missingInEn = [...ptKeys].filter(x => !enKeys.has(x));
    const missingInPt = [...enKeys].filter(x => !ptKeys.has(x));
    const missingInEs = [...esKeys].filter(x => !esKeys.has(x));

    if (missingInEn.length === 0 && missingInPt.length === 0) {
        console.log('✅ Sucesso: Os dicionários estão perfeitamente sincronizados!');
        process.exit(0);
    }

    if (missingInEn.length > 0) {
        console.error('❌ Erro: Chaves presentes em PT mas faltando em EN:');
        missingInEn.forEach(key => console.error(`   - ${key}`));
    }

    if (missingInPt.length > 0) {
        console.error('\n❌ Erro: Chaves presentes em EN mas faltando em PT:');
        missingInPt.forEach(key => console.error(`   - ${key}`));
    }

    process.exit(1);
}

checkI18n();