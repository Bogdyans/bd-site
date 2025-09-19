// app/api/visits/route.ts
import fs from 'fs';
import path from 'path';

const visitsFilePath = path.join(process.cwd(), 'data', 'visits.json');

// Ensure data directory exists
function ensureDataDirectory() {
    const dataDir = path.dirname(visitsFilePath);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

// Read visits count
function readVisits(): number {
    try {
        ensureDataDirectory();
        if (fs.existsSync(visitsFilePath)) {
            const data = fs.readFileSync(visitsFilePath, 'utf8');
            return JSON.parse(data).count;
        }
    } catch (error) {
        console.error('Error reading visits:', error);
    }
    return 0;
}

// Write visits count
function writeVisits(count: number): void {
    try {
        ensureDataDirectory();
        fs.writeFileSync(visitsFilePath, JSON.stringify({ count }), 'utf8');
    } catch (error) {
        console.error('Error writing visits:', error);
    }
}

export async function GET(request: Request) {
    const visitCount = readVisits();
    writeVisits(visitCount + 1);
    return Response.json({ num_of_visits: visitCount});
}

