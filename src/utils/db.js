import Dexie from 'dexie'

const db = new Dexie('datashare')
db.version(1).stores({
  download_file: `++fileId, &fileName`
})
export default db
