import path from "path"
import {promises as fs} from "fs"

export default async function handler (req,res) {
    const folderData = path.join(process.cwd(),'config');
    const fileContents = await fs.readFile(folderData + '/data.json','utf8')
    // const data = JSON.parse(fileContents)
    res.status(200).json(fileContents)
}
