import searchInFiles from './filesystem/searchInFiles';

const dir = process.argv[2];
const searchString = process.argv[3];

(async () => {
  await searchInFiles(dir, searchString);
})();
