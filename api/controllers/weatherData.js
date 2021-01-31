// const WeatherData = require('../models/weatherData');
const fs = require('fs');
const csv = require('csv-parser');
// const folderPath = '/home/jim/Desktop/';
// const folderPath = '/Users/joycetoussaint/netquest_data/14270/Measurements.csv'
const folderPath = '/Users/joycetoussaint/netquest_data/'

// function WeatherData =(stn, date, time, ) => {
//     stn : String,
//     date : Date,
//     time : String,
//     temp: Float32Array,
//     dewp: Float32Array,
//     stp: Float32Array,
//     slp: Float32Array,
//     visib : Float32Array,
//     wdsp : Float32Array,
//     prcp : Float32Array,
//     sndp : Float32Array,
//     frshtt : Number,
//     cldc : Float32Array,
//     wnddir : Number
//
// }

// const data = {
//
// }

// backend moet ff meesturen wat voor station het is zodat
//     //de frontend kan checken of daar al een object van is

exports.weatherData_get_all = (req, res, next) => {
    fs.readdir(folderPath, 'utf8', function (err, data) {
        // console.log(data)
        for (let item in data) {
            // console.log(data[item])
            // console.log(typeof data[item])
            if (data[item].length == 5 || data[item].length == 6) {
                // if(data[item].match('/^[0-9]+$/')){
                // console.log('dit is een legit station ' + data[item])
                const station = data[item]
                fs.readdir('/Users/joycetoussaint/netquest_data/' + station, 'utf-8', function (err, data) {
                    for(let csv_file in data){
                        // console.log(data)
                        const reader = fs.createReadStream('/Users/joycetoussaint/netquest_data/' + station + '/' + data);
                        reader.on('data', function (chunk) {
                            // console.log(folderPath + station + '/' + data)
                            const spl = chunk.toString().split(/[\n,]+/)
                                const newData = {
                                    stn: spl[0],
                                    date: spl[1],
                                    time: spl[2],
                                    temp: spl[3],
                                    dewp: spl[4],
                                    stp: spl[5],
                                    slp: spl[6],
                                    visib: spl[7],
                                    wdsp: spl[8],
                                    prcp: spl[9],
                                    sndp: spl[10],
                                    frshtt: spl[11],
                                    cldc : spl[12],
                                    wnddir: spl[12]
                                }
                            // console.log(spl)
                            console.log(newData)
                            res.send(newData)
                        })
                    }

                    // if(err){
                    //     console.log(err)
                    //     return err;
                    //
                    // }
                })
                // if (err) {
                //     console.log(err)
                //     return err;
                // }
            }
        }
        //     if (err) {
        //         console.log(err)
        //         return err;
        // }
    }
    )
}

    // for(let station in folderPath){
    //     console.log(station)
    // })

    //     for(let csv_file in station){
    //         const reader = fs.createReadStream(folderPath);
    //         reader.on('data', function (chunk) {
    //             //backend moet ff meesturen wat voor station het is zodat
    //             //de frontend kan checken of daar al een object van is
    //             const spl = chunk.toString().split(/[\n,]+/)
    //             const newData = {
    //                 stn : spl[0],
    //                 date : spl[1],
    //                 time : spl[2],
    //                 temp : spl[3],
    //                 dewp : spl[4],
    //                 stp : spl[5],
    //                 slp : spl[6],
    //                 visib : spl[7],
    //                 wdsp : spl[8],
    //                 prcp : spl[9],
    //                 sndp : spl[10],
    //                 frshtt : spl[11],
    //                 // cldc : spl[12],
    //                 wnddir : spl[12]
    //             }
    //             res.send(newData)
    //     });
    // }
    // }
// }
//     const reader = fs.createReadStream(folderPath);
//     //voor elk station in de data directory
//     // lees elk measurements.csv
//     // moet ook even gaan kijken hoe het moet als ik bijvoorbeeld alleen data wil laten
//     // zien van een bepaald station of een bepaald aantal stations..
//
//     reader.on('data', function (chunk) {
//         //backend moet ff meesturen wat voor station het is zodat
//         //de frontend kan checken of daar al een object van is
//         const spl = chunk.toString().split(/[\n,]+/)
//         const newData = {
//             stn : spl[0],
//             date : spl[1],
//             time : spl[2],
//             temp : spl[3],
//             dewp : spl[4],
//             stp : spl[5],
//             slp : spl[6],
//             visib : spl[7],
//             wdsp : spl[8],
//             prcp : spl[9],
//             sndp : spl[10],
//             frshtt : spl[11],
//             // cldc : spl[12],
//             wnddir : spl[12]
//         }
//         res.send(newData)
//         // console.log(newData)
//     });
// }


    // fs.readdir(folderPath, 'utf8', function (err,data) {
    //     for(let l in data){
    //         console.log(l)
    //     }
    //     if (err) {
    //         console.log(err)
    //         return err;
    //     }
        // console.log(data);
        // return data;
    // })


// const reader = fs.createReadStream(folderPath + station);
// reader.on('data', function (chunk) {
//     const spl = chunk.toString().split(/[\n,]+/)
//     const newData = {
//         stn: spl[0],
//         date: spl[1],
//         time: spl[2],
//         temp: spl[3],
//         dewp: spl[4],
//         stp: spl[5],
//         slp: spl[6],
//         visib: spl[7],
//         wdsp: spl[8],
//         prcp: spl[9],
//         sndp: spl[10],
//         frshtt: spl[11],
//         // cldc : spl[12],
//         wnddir: spl[12]
//     }
//     console.log(newData)
//     // res.send(newData)
// })

