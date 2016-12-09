var fs = require('fs');
var jsdom = require('jsdom');
var request = require('request');

var area = 'ra';
var page = 'pg';
var areaCount = 9;
var pageCount = 100;
var urlPrefix = 'http://bj.lianjia.com/zufang/';

var urls = [];

function init() {
    fs.writeFile('result.txt', '', 'utf8', function(err) {
        if (err) {
            console.log('init result.txt fail!');
            throw err;
        }
    });
    fs.writeFile('resultUrls.txt', '', 'utf8', function(err) {
        if (err) {
            console.log('init resultUrls.txt fail!');
            throw err;
        }
    });
}

function generateUrls() {
    var urlArray = [];
    for (var i = 1; i <= areaCount; i++) {
        for (var j = 1; j <= pageCount; j++) {
            var currentUrl = j != 1 ? urlPrefix + page + j + area + i : urlPrefix + area + i;
            urlArray.push(currentUrl);
        }
    }
    return urlArray;
}

function fetchPage(url, pageNum) {
    request({
        url: url,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
                // 'Cookie': 'all-lj=007e0800fb44885aa2065c6dfaaa4029; lianjia_uuid=8c210b41-c9df-4edf-b8ed-6e03f873e466; select_city=110000; _jzqckmp=1; _jzqx=1.1480918386.1481016750.5.jzqsr=bj%2Elianjia%2Ecom|jzqct=/zufang/ra1/.jzqsr=captcha%2Elianjia%2Ecom|jzqct=/; sample_traffic_test=controlled_54; _smt_uid=58411e0d.41255ac2; _jzqa=1.753532205490623700.1480662543.1481014542.1481016750.9; _jzqc=1; CNZZDATA1253477573=542390979-1480659757-%7C1481013496; _qzja=1.467622307.1480662542550.1481014541909.1481016750260.1481016750260.1481017733318.0.0.0.53.9; _qzjc=1; _qzjto=11.4.0; CNZZDATA1254525948=2088301644-1480660477-%7C1481016880; CNZZDATA1255633284=1990493396-1480661741-%7C1481012769; CNZZDATA1255604082=151680868-1480660104-%7C1481014397; _ga=GA1.2.1547177457.1480662560; lianjia_ssid=9cf5e6fe-8ce1-43ca-9d12-4d073f4a1bb8'
        }
    }, function(err, response, body) {
        if (err) {
            return console.error(err);
        }
        parsePage(url, body, pageNum);
    });
}

function parsePage(url, html, pageNum) {
    jsdom.env(
        html, ['./node_modules/jquery/dist/jquery.js'],
        function(err, window) {
            var emptyEle = window.$('.list-no-data') || [];
            if (emptyEle[0]) {
                return true;
            }
            var items = window.$('#house-lst li');
            if (items.length) {
                var pageSplit = '~~~~~~~~~~~~~~~~~~~~~~~~第' + pageNum + '页~~~~~~~~~~~~~~~~~~~~~~~\r\n';
                var rows = [pageSplit];
                items.each(function(index, value) {
                    var room = {};
                    room['小区名'] = window.$(value).find('.region').text();
                    room['厅室信息'] = window.$(value).find('.zone').text();
                    room['平米数'] = window.$(value).find('.meters').text();
                    room['房间朝向'] = window.$(value).find('.meters + span').text();
                    room['价格'] = window.$(value).find('.price').text();
                    room['地理位置'] = window.$(value).find('.con').text().split('/')[0];
                    room['楼层信息'] = window.$(value).find('.con').text().split('/')[1];
                    room['建筑年代'] = window.$(value).find('.con').text().split('/')[2];
                    room['交通信息'] = window.$(value).find('.fang-subway-ex').text();
                    var row = [
                        room['小区名'],
                        room['厅室信息'],
                        room['平米数'],
                        room['房间朝向'],
                        room['价格'],
                        room['地理位置'],
                        room['楼层信息'],
                        room['建筑年代'],
                        room['交通信息'],
                        '\r\n'
                    ].join('|');
                    rows.push(row);
                });

                if (rows) {
                    fs.appendFile('result.txt', rows.join(''), 'utf8', function(err) {
                        if (err) {
                            console.log('appendFile result.txt fail!');
                            throw err;
                        }
                    });
                    fs.appendFile('resultUrls.txt', url + '\r\n', 'utf8', function(err) {
                        if (err) {
                            console.log('appendFile resultUrls.txt fail!');
                            throw err;
                        }
                    });
                }
            }
            console.log(url + ' has export success!');
        }
    );
}

function parsePageByRegexp(url, html, pageNum) {
    var pageSplit = '~~~~~~~~~~~~~~~~~~~~~~~~第' + pageNum + '页~~~~~~~~~~~~~~~~~~~~~~~\r\n';
    var rows = [pageSplit];
    var list = html.match(/<ul\sid\=\"house\-lst\"\sclass\=\"house\-lst\">[\s\S]*<\/ul>/g)[0];
    if (!list) {
        return false;
    }
    var names = list.match(/<span\sclass\=\"region\">([\S]*)<\/span>/g);
    var zones = list.match(/<span\sclass\=\"zone\"><span>[\S]*<\/span><\/span>/g);
    var meters = list.match(/<span\sclass\=\"meters\">[\S]*<\/span><span/g);
    var orientations = list.match(/<span\sclass\=\"meters\">[\S]*<\/span>/g);
    var prices = list.match(/<div\sclass\=\"price\"><span\sclass\=\"num\">[\d]*<\/span>/g);
    var locations = list.match(/(\S*)<\/a><span>\/<\/span>/g);
    var floors = list.match(/\/<\/span>[\S]*<span>\/<\/span>/g);
    var years = list.match(/<span>\/[\S]*<span>([\S]*)<\/div>/g);
    var addresses = list.match(/<span\sclass\=\"fang\-subway\-ex\"><span>([\S]*)<\/span><\/span>/g);
    names.forEach(function(value, index) {
        var room = {};
        room['小区名'] = value.match(/>[\S]*</g).length ? value.match(/>[\S]*</g)[0].slice(1, -1) : '';
        room['厅室信息'] = zones[index].match(/>[\S]*</g) ? zones[index].match(/>[\S]*</g)[0].slice(7, -8) : '';
        room['平米数'] = meters[index].match(/>[\S]*</g) ? meters[index].match(/>[\S]*</g)[0].slice(1, -8) : '';
        room['房间朝向'] = orientations[index].match(/<\/span><span>[\S]*<\/span>/g) ? orientations[index].match(/<\/span><span>[\S]*<\/span>/g)[0].slice(13, -7) : '';
        room['价格'] = prices[index].match(/[\d]+/) ? prices[index].match(/[\d]+/)[0] + '元/月' : '';
        room['地理位置'] = locations[index].match(/>([\S]*)<\/a>/) ? locations[index].match(/>([\S]*)<\/a>/)[1] : '';
        room['楼层信息'] = floors[index] ? floors[index].slice(8, -14) : '';
        room['建筑年代'] = years[index] ? years[index].match(/[\S]*<span>\/<\/span>([\S]*)<\/div>/)[1].slice(0, -6) : '';
        room['交通信息'] = addresses[index] !== undefined ? addresses[index].match(/<span>([\S]*)<\/span><\/span>/)[1] : '';
        var row = [
            room['小区名'],
            room['厅室信息'],
            room['平米数'],
            room['房间朝向'],
            room['价格'],
            room['地理位置'],
            room['楼层信息'],
            room['建筑年代'],
            room['交通信息'],
            '\r\n'
        ].join('|');
        rows.push(row);
    });
    if (rows) {
        fs.appendFile('result.txt', rows.join(''), 'utf8', function(err) {
            if (err) {
                console.log('appendFile result.txt fail!');
                throw err;
            }
        });
        fs.appendFile('resultUrls.txt', url + '\r\n', 'utf8', function(err) {
            if (err) {
                console.log('appendFile resultUrls.txt fail!');
                throw err;
            }
        });
    }
    console.log(url + ' has export success!');
}

function fetchData() {
    var urls = generateUrls();
    var currPage = 0;
    var fetchDataInterval = setInterval(function() {
        if (currPage < urls.length) {
            console.log('fetch page ' + currPage + '.');
            fetchPage(urls[currPage], currPage);
            currPage++;
        }
        if (currPage == urls.length) {
            clearInterval(fetchDataInterval);
            console.log('All pages export success!');
        }
    }, 2000);
}

init();
fetchData();
