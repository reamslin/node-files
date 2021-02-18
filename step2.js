const fs = require('fs');
const axios = require('axios');

function cat(path) {

    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log('couldnt read the file', err)
            process.exit(1)
        }
        console.log(`${data}`)
    })
}

async function webCat(url) {
    try {
        let resp = await axios.get(url)
        console.log(resp.data)
    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

let path = process.argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
} else {
    cat(path);
}