import fs from 'fs';

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node clean_cards.js <file_path>');
    process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Remove @ts-nocheck
content = content.replace(/\/\/ @ts-nocheck\n?/, '');

// Remove companyTags: [...] and optional following comma/whitespace
content = content.replace(/companyTags:\s*\[[^\]]*\],?\s*/g, '');

// Remove egyptianContext: "..." and optional following comma/whitespace
// Handles simple double-quoted strings
content = content.replace(/egyptianContext:\s*"[^"]*",?\s*/g, '');

// Generalize strings that mention specific companies
content = content.replace(/Swvl/g, 'Tech Startups');
content = content.replace(/MaxAB/g, 'E-commerce Apps');
content = content.replace(/Fawry/g, 'Fintech Apps');
content = content.replace(/Paymob/g, 'Payment Gateways');

fs.writeFileSync(filePath, content);
console.log('Cleaned ' + filePath);
