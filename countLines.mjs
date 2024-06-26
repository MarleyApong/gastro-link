import fs from 'fs'
import path from 'path'

// Fonction pour lire tous les fichiers dans un répertoire
function getFiles(dir, extensions, excludeList, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!excludeList.includes(file)) {
                getFiles(filePath, extensions, excludeList, fileList);
            }
        } else if (extensions.includes(path.extname(file))) {
            if (!excludeList.includes(filePath)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

// Fonction pour compter les lignes de code dans un fichier
function countLines(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.split('\n').length;
}

// Extensions de fichiers à inclure dans le comptage
const extensions = ['.js', '.jsx', '.scss', '.css', '.html'];

// Répertoire de votre projet
const projectDir = '.';

// Dossiers et fichiers à exclure
const excludeList = [
    'node_modules', // Exclure le dossier node_modules
    '.git',         // Exclure le dossier .git
    'build',        // Exclure le dossier build
    'dist',         // Exclure le dossier dist
    'countLines.js' // Exclure ce script lui-même
];

const files = getFiles(projectDir, extensions, excludeList);

let totalLines = 0;

files.forEach(file => {
    const lines = countLines(file);
    totalLines += lines;
    console.log(`${file}: ${lines} lines`);
});

console.log(`Total lines of code: ${totalLines}`);
