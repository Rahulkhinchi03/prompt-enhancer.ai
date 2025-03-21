#!/usr/bin/env node

/**
 * Environment Setup Tool
 * 
 * This tool helps set up the .env file securely for development.
 * It can generate API keys and configure environment variables
 * without putting sensitive information in source code.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

// File paths
const ENV_EXAMPLE_PATH = path.join(__dirname, '../.env.example');
const ENV_PATH = path.join(__dirname, '../.env');
const GITIGNORE_PATH = path.join(__dirname, '../.gitignore');

// Set up readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Generate a random API key
 * @returns {string} - Random API key
 */
function generateApiKey() {
    return crypto.randomBytes(24).toString('base64').replace(/[+/=]/g, '');
}

/**
 * Check if a file contains a string
 * @param {string} filePath - Path to the file
 * @param {string} searchString - String to search for
 * @returns {boolean} - Whether the file contains the string
 */
function fileContains(filePath, searchString) {
    if (!fs.existsSync(filePath)) return false;

    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(searchString);
}

/**
 * Ensure .env is in .gitignore
 */
function ensureGitignore() {
    if (!fs.existsSync(GITIGNORE_PATH)) {
        fs.writeFileSync(GITIGNORE_PATH, '.env\n');
        console.log('✅ Created .gitignore with .env entry');
        return;
    }

    if (!fileContains(GITIGNORE_PATH, '.env')) {
        fs.appendFileSync(GITIGNORE_PATH, '\n# Environment Variables\n.env\n');
        console.log('✅ Added .env to .gitignore');
    } else {
        console.log('✅ .env is already in .gitignore');
    }
}

/**
 * Setup the .env file
 */
async function setupEnv() {
    console.log('\n🔧 Environment Setup Tool');
    console.log('-------------------------');

    // Check for .env.example
    if (!fs.existsSync(ENV_EXAMPLE_PATH)) {
        console.error('❌ .env.example file not found. Please make sure it exists.');
        rl.close();
        return;
    }

    // Check if .env already exists
    let overwrite = false;
    if (fs.existsSync(ENV_PATH)) {
        overwrite = await new Promise((resolve) => {
            rl.question('⚠️ .env file already exists. Overwrite? (y/n): ', (answer) => {
                resolve(answer.toLowerCase() === 'y');
            });
        });

        if (!overwrite) {
            console.log('Operation cancelled. Existing .env file was not modified.');
            rl.close();
            return;
        }
    }

    // Read .env.example
    const envExample = fs.readFileSync(ENV_EXAMPLE_PATH, 'utf8');

    // Configure environment type
    const envType = await new Promise((resolve) => {
        rl.question('Select environment (development/production): ', (answer) => {
            const env = answer.toLowerCase();
            return resolve(env === 'production' ? 'production' : 'development');
        });
    });

    // Configure AI provider
    const aiProvider = await new Promise((resolve) => {
        rl.question('Select AI provider (openai/mistral): ', (answer) => {
            const provider = answer.toLowerCase();
            return resolve(provider === 'mistral' ? 'mistral' : 'openai');
        });
    });

    console.log(`\nSetting up ${envType} environment with ${aiProvider} provider...`);

    // Generate API authentication key
    const apiKey = generateApiKey();
    console.log(`\n✅ Generated new API authentication key: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`);

    // Update environment variables
    let envContent = envExample
        .replace(/NODE_ENV=.*/, `NODE_ENV=${envType}`)
        .replace(/API_KEY=.*/, `API_KEY=${apiKey}`)
        .replace(/AI_PROVIDER=.*/, `AI_PROVIDER=${aiProvider}`);

    // Get API keys
    if (aiProvider === 'openai') {
        const openaiKey = await new Promise((resolve) => {
            rl.question('OpenAI API Key: ', resolve);
        });


        if (openaiKey) {
            envContent = envContent.replace(/OPENAI_API_KEY=.*/, `OPENAI_API_KEY=${openaiKey}`);
        }

    } else if (aiProvider === 'mistral') {
        const mistralKey = await new Promise((resolve) => {
            rl.question('Mistral API Key: ', resolve);
        });

        if (mistralKey) {
            envContent = envContent.replace(/# MISTRAL_API_KEY=.*/, `MISTRAL_API_KEY=${mistralKey}`);
        }
    }

    // Write the new .env file
    fs.writeFileSync(ENV_PATH, envContent);
    console.log('\n✅ Environment file (.env) created successfully!');

    // Ensure .env is in .gitignore
    ensureGitignore();

    console.log('\n🚀 Your development environment is ready!');
    console.log('Run "npm run dev" to start the application.');

    rl.close();
}

/**
 * Print information about the environment configuration
 */
function printInfo() {
    if (!fs.existsSync(ENV_PATH)) {
        console.error('\n❌ .env file not found. Run "node setup-env.js setup" to create one.');
        rl.close();
        return;
    }

    const envContent = fs.readFileSync(ENV_PATH, 'utf8');

    // Parse key variables
    const envVars = {};
    const lines = envContent.split('\n');

    lines.forEach(line => {
        if (line.trim() && !line.startsWith('#')) {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const [, key, value] = match;
                envVars[key.trim()] = value.trim();
            }
        }
    });

    console.log('\n🔍 Environment Configuration');
    console.log('---------------------------');
    console.log(`Environment: ${envVars.NODE_ENV || 'Not set'}`);
    console.log(`AI Provider: ${envVars.AI_PROVIDER || 'Not set'}`);

    // Mask sensitive keys
    if (envVars.API_KEY) {
        const apiKey = envVars.API_KEY;
        console.log(`API Key: ${apiKey.substring(0, 4)}${'*'.repeat(10)}${apiKey.substring(apiKey.length - 4)}`);
    } else {
        console.log('API Key: Not set');
    }

    if (envVars.OPENAI_API_KEY) {
        const key = envVars.OPENAI_API_KEY;
        console.log(`OpenAI API Key: ${key.substring(0, 4)}${'*'.repeat(10)}${key.substring(key.length - 4)}`);
    } else {
        console.log('OpenAI API Key: Not set');
    }

    if (envVars.MISTRAL_API_KEY) {
        const key = envVars.MISTRAL_API_KEY;
        console.log(`Mistral API Key: ${key.substring(0, 4)}${'*'.repeat(10)}${key.substring(key.length - 4)}`);
    } else {
        console.log('Mistral API Key: Not set');
    }

    console.log('---------------------------\n');
    rl.close();
}

/**
 * Print help information
 */
function printHelp() {
    console.log('\n🔧 Environment Setup Tool');
    console.log('------------------------');
    console.log('Usage:');
    console.log('  node setup-env.js setup  - Set up the .env file');
    console.log('  node setup-env.js info   - Show current environment configuration');
    console.log('  node setup-env.js help   - Show this help message\n');
    rl.close();
}

// Main function to handle command line arguments
function main() {
    const args = process.argv.slice(2);
    const command = args[0]?.toLowerCase();

    switch (command) {
        case 'setup':
            setupEnv();
            break;
        case 'info':
            printInfo();
            break;
        case 'help':
        default:
            printHelp();
            break;
    }
}

// Run the script
main();