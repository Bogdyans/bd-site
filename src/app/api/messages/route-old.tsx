// app/api/visits/route.ts
import fs from 'fs';
import path from 'path';

const visitsFilePath = path.join(process.cwd(), 'data', 'messages.json');

type Message = {
    name: string,
    message: string,
}

// Ensure data directory exists
function ensureDataDirectory() {
    const dataDir = path.dirname(visitsFilePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
        fs.writeFileSync(visitsFilePath, JSON.stringify([]), 'utf8');
    }
}

function readMessages(): (Message[] | null) {
    try {
        if (fs.existsSync(visitsFilePath)) {
            const data = fs.readFileSync(visitsFilePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (error) {
        console.error('Error reading visits:', error);
    }
    return null;
}

// Write message
function writeMessage(name: string, message: string): void {
    try {
        ensureDataDirectory();
        const messages = readMessages();
        if (!messages) {
            return;
        }


        messages.push({ name, message })
        fs.writeFileSync(visitsFilePath, JSON.stringify(messages), 'utf8');
    } catch (error) {
        console.error('Error writing visits:', error);
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    writeMessage(data.name, data.message);
    return Response.json({ status: 'success' });
}

export async function GET() {
    return Response.json({ messages: readMessages() });
}
