/*
 Adam Crawford
 SDI 1210
 Project 4
 10/18/12
 */

// MAKEUP : Global Variables through line 27 as missed in Project 3
var phoneNumber = "123-456-7890",
    emailAddress = "geeksbsmrt@fullsail.edu",
    url = "http://google.com",
    titleCase = "Wish uPOn a Star",
    separator = "a,b,c",
    findChar = ",",
    replaceWith = "\\",
    decimalNumber = Math.PI,
    decimalPlaces = 2,
    fuzzy1 = 12,
    fuzzy2 = 8,
    percent = 25,
    begin = "10/24/2012",
    end = "10/31/2012",
    toNum = "108",
    inputArray = [1, 2, 3, "Fred", ["George", "Michael", 12, 13, 20], 98, 99, "100", {"names" : ["Jordan", "Scott"], "ages" : [5,7], "likes": ["soccer", "hockey"]}, 25, 28, 76],
    compareTo = 15,
    keyedArray = [{"name":"adam", "age": 25}, {"name":"jessica", "age": 23}, {"name":"heather", "age": 2}, {"name": "Matthew", "age": 19}, {"name": "William", "age": 65}],
    key = "age",
    codeLib = function () {
        var checkNumber = function (numberString) { 
                var leading = numberString.indexOf("-"),
                    trailing = numberString.lastIndexOf("-"),
                    area = numberString.substring(0,leading),
                    exchange = numberString.substring(leading+1,trailing),
                    subscriber = numberString.substring(trailing+1, numberString.length);
                    if (area.length === 3 && exchange.length === 3 && subscriber.length === 4){
                        return true;
                    } else {
                        return false;
                    };
            },
            checkEmail = function (emailString) {
                // RegEx tests:
                // match any number of characters in the set, @, any characters in set, ., any 2-4 letters
                var str=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return str.test(emailString);
            },
            checkURL = function (urlString) {
                //matches http or https at beginning, escapes the :\\, any characters in set, ., any 2-4 letters
                var protocol = /^(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,4}$/;
                return protocol.test(urlString);
            },
            convertCase = function (casedString) {
                var title = casedString.toLowerCase().split(" ");
                for (i = 0; i<title.length; i++) {
                    title[i] = title[i].charAt(0).toUpperCase() + title[i].substring(1);
                }
                return title.join(" ");
            },
            switchSeparator = function (switchString, oldChar, newChar) {
                // build regular expresion to /oldChar/g to replace all instances of oldChar 
                var re = RegExp(oldChar, "g");
                var switched = switchString.replace(re, newChar);
                return switched;
            },
            formatDecimal = function (number, places) {
                var fixed = number.toFixed(places);
                return fixed;
            },
            fuzzyMatch = function (num1, num2, prct) {
                if (num1 >= (num2 - ((prct/100)*num2)) && num1 <= (num2 + ((prct/100) * num2))) {
                    return true;
                } else {
                    return false;
                }
            },
            dateDifference = function (startDate, endDate) {
                //find number of hours or days between two dates
                // set one day to milliseconds to allow calc from getTime() which calcs from Jan 1, 1970 in ms
                // 24h*60m*60s*1000ms
                var oneDay = 24*60*60*1000;
                // get date to yyyy,mm,dd
                var parseDate = function (date) {
                    var dateArray = date.split("/");
                    // mm is month -1 because in JS Jan = 0 and Dec = 11
                    var dateStr = parseInt(dateArray[2]) + "," + parseInt(dateArray[0]-1) + "," + parseInt(dateArray[1]);
                    return dateStr;
                }
                var start = new Date(parseDate(startDate));
                var last = new Date(parseDate(endDate));
                // convert day1 and day2 to ms and 
                // round the absolute value of (day1 - day2) / (num of ms in 1 day) to
                // closest whole number
                var diffDays = Math.round(Math.abs((start.getTime() - last.getTime())/(oneDay)));
                return diffDays;
            },
            strToNum = function (str) {
                var num = parseInt(str);
                return num;
            },
            smallestVal = function (array, number) {
                    var numArray = [];
                    for (i = 0; i < array.length; i++) {
                        if (!isNaN(array[i])) {
                            if (array[i] > number) {
                                numArray.push(array[i]);
                            };
                        };
                    };
                    var answer = numArray.sort(function(a,b) {return a-b});
                    return answer[0];
            },
            totalValue = function (array) {
                    var sum = 0;
                    for (i = 0; i < array.length; i++) {
                        if (!isNaN(array[i])) {
                            sum += parseInt(array[i]);
                        }
                    }
                    return sum;
            },
            sortArray = function (array, key) {
                //sort array of objs by key then value
                var sorted = array.sort(function(a, b) {
                    if (isNaN(a[key])) {
                    // only works on Strings, as localeCompare is a string method
                    return a[key].localeCompare(b[key]);
                    }
                    //allows sorting by numbers if above code doesnt run
                     return a[key]-b[key]
                }
                );
                return sorted; //MAKEUP return Object from Project 3
            }
        ;
        return { // MAKEUP return Object from Project 3
            "checkNumber" : checkNumber,
            "checkEmail" : checkEmail,
            "checkURL" : checkURL,
            "convertCase" : convertCase,
            "switchSeparator" : switchSeparator,
            "formatDecimal" : formatDecimal,
            "fuzzyMatch" : fuzzyMatch,
            "dateDifference" : dateDifference,
            "strToNum" : strToNum,
            "smallestVal" : smallestVal,
            "totalValue" : totalValue,
            "sortArray" : sortArray
        };
    }
;
var lib = codeLib();
console.log(phoneNumber + " is a phone number: " + lib.checkNumber(phoneNumber));
console.log(emailAddress + " is an email: " + lib.checkEmail(emailAddress));
console.log(url + " is URL: " + lib.checkURL(url));
console.log(titleCase + " to upper first letters: " + lib.convertCase(titleCase));
console.log(separator + " with switched separator: " + lib.switchSeparator(separator, findChar, replaceWith));
console.log("Pi to 2 decimal places: " + lib.formatDecimal(decimalNumber, decimalPlaces));
console.log("Fuzzy Match: " + lib.fuzzyMatch(fuzzy1, fuzzy2, percent));
console.log("Date Difference: " + lib.dateDifference(begin, end) + " days");
console.log("String to Number: " + lib.strToNum(toNum));
console.log("Smallest Value above " + compareTo + ": " + lib.smallestVal(inputArray, compareTo));
console.log("Total Value: " + lib.totalValue(inputArray));
console.log("Array sorted by " + key + ":")
console.log(lib.sortArray(keyedArray, key));