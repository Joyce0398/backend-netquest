const fs = require('fs');
const folderPath = '/Users/joycetoussaint/netquest_data/'

exports.weatherData_get_all = (req, res, next) => {
    fs.readdir(folderPath, 'utf8', function (err, data) {
        let dict = {}
        if (err) {
            return res.status(500).json({error: "Something failed!"});
        } else {
            for (let item in data) {
                    const station = data[item];
                        if (fs.existsSync(folderPath + station + '/Measurements.csv')) {
                                const chunk = fs.readFileSync(folderPath + station + '/Measurements.csv');
                                        const spl = chunk.toString().split(/[\n,]+/);
                                        dict[spl[0]] = spl.slice(1, 14)
                }
            }
            req.headers['if-none-match'] = 'no-match-for-this';
            return res.status(200).send(dict);
        }
    });
}
