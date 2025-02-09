const { spawn } = require('child_process');
const path = require('path');

// Function to start a server process
function startServer(scriptName, serverName) {
    const serverProcess = spawn('node', [path.join(__dirname, scriptName)], {
        stdio: 'pipe'
    });

    // Handle server output
    serverProcess.stdout.on('data', (data) => {
        console.log(`[${serverName}] ${data.toString().trim()}`);
    });

    serverProcess.stderr.on('data', (data) => {
        console.error(`[${serverName} ERROR] ${data.toString().trim()}`);
    });

    // Handle server process exit
    serverProcess.on('close', (code) => {
        console.log(`[${serverName}] exited with code ${code}`);
    });

    return serverProcess;
}

// Start both servers
console.log('Starting servers...');

const mainServer = startServer('backend-server.js', 'MAIN SERVER');
const proxyServer = startServer('http-proxy-server.js', 'PROXY SERVER');

// Handle process termination
process.on('SIGINT', () => {
    console.log('\nGracefully shutting down servers...');
    mainServer.kill();
    proxyServer.kill();
    process.exit(0);
});
