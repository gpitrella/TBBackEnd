import axios from 'axios';
import CSV from 'csv-string';

export const getfilesdata = async (req, res) => {
    const fileName = req.query.file
    const listName = { names: [] }
    try {
        const request = await axios.get("https://echo-serv.tbxnet.com/v1/secret/files", {
             headers: {
                 authorization: 'Bearer aSuperSecretKey'
             }
        })
        .then((response) => { return response.data.files })
        .catch((error) => {
          throw new Error (error);
        });

                 
        const allData = request.map( async (file) => {
            return await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, {
                headers: {
                    authorization: 'Bearer aSuperSecretKey'
                }
            })
            .then((response) => { 
                listName.names.push(CSV.parse(response.data, { output: 'objects' })[0].file)
                return  CSV.parse(response.data, { output: 'objects' });
            }) 
            .catch((error) => { return [] })
        })  

        const dataPromise = await Promise.all(allData)
        const joinData = dataPromise.flat().filter((data) => { 
            if(data.file && data.text && data.number && data.hex) return data
        });
        const dataSchema = joinData.map((data) => { 
                return {
                    file: data.file,
                    lines: [
                        {
                            text: data.text,
                            number: data.number,
                            hex: data.hex
                        }
                    ]
                }
            }) 

        if(fileName) {
            const dataSchemaFilter = dataSchema.filter((data) => {
                return data.file === fileName;
            })
            dataSchemaFilter.unshift(listName);
            res.send(dataSchemaFilter);
        } else {
            dataSchema.unshift(listName);
            res.send(dataSchema);
        }
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

export const getfileslist = async (req, res) => {
    try {
        const request = await axios.get("https://echo-serv.tbxnet.com/v1/secret/files", {
             headers: {
                 authorization: 'Bearer aSuperSecretKey'
             }
        })
        .then((response) => { return response.data.files })
        .catch((error) => {
          throw new Error (error);
        });
                 
        const allData = request.map( async (file) => {
            return await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, {
                headers: {
                    authorization: 'Bearer aSuperSecretKey'
                }
            })
            .then((response) => { 
                return  CSV.stringify(response.data);
            }) 
            .catch((error) => { return [] })
        })  

        const dataPromise = await Promise.all(allData)        
        res.send(dataPromise.flat());
        
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
}

