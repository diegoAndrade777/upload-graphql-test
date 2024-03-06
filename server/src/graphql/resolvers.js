import path, { dirname } from "path"
import { fileURLToPath } from "url"
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

export const resolvers = {
  Mutation: {
    singleUpload: async (_, { file }) =>  {
      try {
        const fileDir = dirname(fileURLToPath(import.meta.url))
        const fileExtension = file.substring("data:image/".length, file.indexOf(";base64"))
        const fileName = `image${uuidv4()}.${fileExtension}`

        const fileInfo = file.replace(/^data:image\/\w+;base64,/, "");
        const buf = Buffer.from(fileInfo, 'base64')

        console.log('buffer => ', buf)
        
        const folderPath = path.join(fileDir, 'uploadedFiles')
        const filePath = path.join(folderPath, fileName)
        await fs.writeFileSync(filePath, buf)

        return { success: true } 
      } catch (error) {
        console.error('Erro ao salvar o arquivo:', error)
        return { success: false }
      }
    },
  },
};