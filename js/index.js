const TOPLIST = {
    0: 'ㄱ',
    1: 'ㄲ',
    2: 'ㄴ',
    3: 'ㄷ',
    4: 'ㄸ',
    5: 'ㄹ',
    6: 'ㅁ',
    7: 'ㅂ',
    8: 'ㅃ',
    9: 'ㅅ',
    10: 'ㅆ',
    11: 'ㅇ',
    12: 'ㅈ',
    13: 'ㅉ',
    14: 'ㅊ',
    15: 'ㅋ',
    16: 'ㅌ',
    17: 'ㅍ',
    18: 'ㅎ'
}

const MIDLIST = {
    0: 'ㅏ',
    1: 'ㅐ',
    2: 'ㅑ',
    3: 'ㅒ',
    4: 'ㅓ',
    5: 'ㅔ',
    6: 'ㅕ',
    7: 'ㅖ',
    8: 'ㅗ',
    9: 'ㅘ',
    10: 'ㅙ',
    11: 'ㅚ',
    12: 'ㅛ',
    13: 'ㅜ',
    14: 'ㅝ',
    15: 'ㅞ',
    16: 'ㅟ',
    17: 'ㅠ',
    18: 'ㅡ',
    19: 'ㅢ',
    20: 'ㅣ'
}

const BOTLIST = {
    1: 'ㄱ',
    2: 'ㄲ',
    3: 'ㄳ',
    4: 'ㄴ',
    5: 'ㄵ',
    6: 'ㄶ',
    7: 'ㄷ',
    8: 'ㄹ',
    9: 'ㄺ',
    10: 'ㄻ',
    11: 'ㄼ',
    12: 'ㄽ',
    13: 'ㄾ',
    14: 'ㄿ',
    15: 'ㅀ',
    16: 'ㅁ',
    17: 'ㅂ',
    18: 'ㅄ',
    19: 'ㅅ',
    20: 'ㅆ',
    21: 'ㅇ',
    22: 'ㅈ',
    23: 'ㅊ',
    24: 'ㅋ',
    25: 'ㅌ',
    26: 'ㅍ',
    27: 'ㅎ'
}

var change_mid = function(word) {
    if(word == 'ㅔ') return 'ㅐ';
    else if(word == 'ㅐ') return 'ㅔ';
    else if(word == 'ㅙ') return 'ㅚ';
    else if(word == 'ㅚ') return 'ㅙ';
    else if(word == 'ㅖ') return 'ㅒ';
    else if(word == 'ㅒ') return 'ㅖ';
    else return word.replace('ㅛ', 'ㅕ');
}

var change_bot = function(word) {
    if(word == 'ㅅ') return 'ㅌ';
    else if(word == 'ㅆ') return 'ㅈ';
    else if(word == 'ㅎ') return 'ㅅ';
    else return word.replace('ㅉ', 'ㅈ');
}

var second_filter = function(word) {
    return word.replace('떡', '떻').replace('안', '않').replace('괜', '괞').replace('찮', '찬').replace('떻', '떡').replace('송', '성');
}

var final_filter = function(word) {
    var result_imoji = '';

    if(word.includes('...')) { // 크라이
        var rand = parseInt(Math.random() * 10000 % 5);
        for(var i = -7; i < rand; i++) {
            if(parseInt(Math.random() * 10000 % 5) == 4) {
                result_imoji += 'ㅜ';
            }
            result_imoji += 'ㅠ';
        }
        var rand = parseInt(Math.random() * 10000 % 4);
        for(var i = -7; i < rand; i++) {
            if(parseInt(Math.random() * 10000 % 5) == 4) {
                result_imoji += '😢';
            }
            result_imoji += '😭';
        }
    }
    else if(word.includes('!!!')) { // 화남
        var rand = parseInt(Math.random() * 10000 % 5);
        for(var i = -7; i < rand; i++) {
            if(parseInt(Math.random() * 10000 % 5) == 4) {
                result_imoji += '@';
            }
            result_imoji += ';';
        }
        var rand = parseInt(Math.random() * 10000 % 4);
        for(var i = -7; i < rand; i++) {
            if(parseInt(Math.random() * 10000 % 5) == 4) {
                result_imoji += '!';
            }
            result_imoji += '🤬';
        }
    }
    return word
    .replace('아니', '않이')
    .replace('읽으', '일그')
    .replace('합니', '함미')
    .replace('습니', '슴미') + result_imoji;
}

var getBottom = function() {

    console.log('가'.charCodeAt(0));
    // console.log('ㅥ'.charCodeAt(0));
    console.log('ㅏ'.charCodeAt(0));
    // console.log('A'.charCodeAt(0));
    // console.log(String.fromCharCode(12592));


    var letterList = new Array();
    var result = new Array();

    let content = document.getElementById('text-input').value;

    for(var i = 0; i < content.length; i++) {

        var unicodeDec = content.charCodeAt(i);

        console.log(unicodeDec);

        if(unicodeDec < 12593) {
            letterList.push(content[i]);
            letterList.push(undefined);
            letterList.push(undefined);
            continue;
        }
        else if(unicodeDec < 44032) {
            console.log('자음만');
            letterList.push(content[i]);
            letterList.push(undefined);
            letterList.push(undefined);
            continue;
        }

        let letterIndex = unicodeDec - 44032;
    
        let topIndex = parseInt(letterIndex / (21 * 28));
        let midIndex = parseInt((letterIndex % (21 * 28)) / 28);
        let botIndex = parseInt((letterIndex % (21 * 28)) % 28);

        letterList.push(TOPLIST[topIndex]);
        letterList.push(MIDLIST[midIndex]);
        letterList.push(BOTLIST[botIndex]);
    }

    // console.log(letterList);

    let top = '';
    let mid = '';
    let bot = '';

    for(var i = 0; i < letterList.length; i+=3) {

        if(((letterList[i] + '').charCodeAt(0) < 44032) && letterList[i+1] == undefined) { // 완성된 글자가 아닐 경우
            // if(letterList[i+1] != undefined && ((letterList[i+1] + '').charCodeAt(0) < 12623)) { // 중성이 모음이 아닐 경우
            //     if(letterList[i+2] != undefined && ((letterList[i+2] + '').charCodeAt(0) < 12623)) { // 종성이 모음이 아닐 경우
            //         result.push(letterList[i]);
            //         result.push(letterList[i+1]);
            //         result.push(letterList[i+2]);
            //         continue;
            //     }
            //     result.push(letterList[i]);
            //     result.push(letterList[i+1]);
            //     i -= 1;
            //     continue;
            // }
            result.push(letterList[i]);
            continue;
        }

        top = letterList[i];
        mid = letterList[i+1];
        bot = letterList[i+2];

        if(parseInt(Math.random() * 10000000 % 5) === 2) {
            result.push(top);
            if(mid != undefined) {
                result.push(change_mid(mid));
            }
            if(bot != undefined) {
                result.push(change_bot(bot));
            }
            continue;
        }
        else {
            var topIndex = function(word) {
                for(var key in TOPLIST) {
                    if(TOPLIST[key] == word) {
                        return parseInt(key);
                    }
                }
            }

            var midIndex = function(word) {
                let replaced = change_mid(word);
                for(var key in MIDLIST) {
                    if(MIDLIST[key] == replaced) {
                        return parseInt(key);
                    }
                }
            }

            var botIndex = function(word) {
                let replaced = change_bot(word);
                for(var key in BOTLIST) {
                    if(BOTLIST[key] == replaced) {
                        return parseInt(key);
                    }
                }
            }

            // console.log(top);
            // console.log(mid);
            // console.log(bot);


            if(mid != undefined) {
                if(bot != undefined) {
                    console.log('asdf');
                    result.push(String.fromCharCode((((topIndex(top) * 21) + midIndex(mid)) * 28 + botIndex(bot)) + 44032)); // 둘 다 있을때
                }
                else {
                    console.log('2222');
                    result.push(String.fromCharCode((((topIndex(top) * 21) + midIndex(mid)) * 28) + 44032)); // 받침만 없을 때
                }
            }
            else {
                for(var j = 0; j < 50; j++) {
                    console.log(top);
                }
                result.push(top);
            }
        }
    }

    var html = '';

    console.log(letterList);
    console.log(result);

    for(var i = 0; i < result.length; i++) {
        html += second_filter(result[i]);
    }

    document.getElementById('result-text').innerHTML = final_filter(html);
}