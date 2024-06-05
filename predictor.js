const {spawn} = require('child_process');
const data = require('./model_columns.json');

async function run_model(inputData){
    // console.log(inputData);
    return new Promise((resolve, reject) => {
        const childPython = spawn('python', ['model.py',inputData]);

        let price_in_lakh=0.0;
        childPython.stdout.on('data', (data) => {
            let temp = String(data);
            price_in_lakh = parseFloat(temp.substring(1,temp.indexOf(']')));
            console.log(`price_in_lakh: ${price_in_lakh}`);
            resolve(price_in_lakh);
        });

        childPython.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            // reject(data);
        });

        childPython.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}

async function calculate_price(body){
    let {location, sqft, bath, bhk} = body;
    location = location.toLowerCase().trim();
    location = 'location_'+location;
    data_columns = data['data_columns'];
    const locationIndex = data_columns.indexOf(location);
    const inputData = [sqft, bath, bhk, locationIndex];
    console.log('before');
    try {
        const x = await run_model(inputData);
        return x;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

module.exports = {calculate_price};