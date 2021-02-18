const fs = require('fs');
const axios = require('axios');

function cat(path, out) {

    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log('couldnt read the file', err)
            process.exit(1)
        }
        handleOutput(data, out)
    })
}

async function webCat(url, out) {
    try {
        let resp = await axios.get(url)
        handleOutput(resp.data, out)
    }
    catch (err) {
        console.error(`Couldnt get data from url: ${url}. Error: ${err}`)
        process.exit(1)
    }
}

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function (err) {
            if (err) {
                console.error(`Couldn't write to file: ${out}. Error: ${err}`)
            }
        })
    } else {
        console.log(text)
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3]
    path = process.argv[4]
} else {
    path = process.argv[2]
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}

