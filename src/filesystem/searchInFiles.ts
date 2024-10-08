import { promises as fs } from 'fs';
import * as path from 'path';


async function searchInFiles(dir: string, searchString: string): Promise<void> {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStat = await fs.stat(filePath);

      if (fileStat.isDirectory()) {
        await searchInFiles(filePath, searchString);
      } else if (fileStat.isFile()) {
        const content = await fs.readFile(filePath, 'utf8');
        if (content.includes(searchString)) {
          console.log(`Match found in file: ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error occurred: ${(error as Error).message}`);
  }
}

export default searchInFiles;