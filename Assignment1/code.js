const trianglesizes = [1, 1, 1, 1, 1, 1];

window.addEventListener("load", function () {
    var currDate = new Date();
    var curryear = currDate.getFullYear();
    var currmonth = currDate.getMonth()+1;
    var currday = currDate.getDay();

    if(currmonth < 10) currmonth = "0"+currmonth;
    if(currday < 10) currday = "0"+currday;

    document.getElementById("dateprint").innerHTML = currday+"-"+currmonth+"-"+curryear;
});

function increase(n) {
    trianglesizes[n]++;
    let mod = "v" + (n + 1);
    document.getElementById(mod).innerHTML = trianglesizes[n];
}

function decrease(n) {
    if (trianglesizes[n] > 0) {
        trianglesizes[n]--;
        let mod = "v" + (n + 1);
        document.getElementById(mod).innerHTML = trianglesizes[n];
    }
}

function setDate() {
    var myDate = document.getElementById("ds").value;
    var myyear = myDate.substring(0,4);
    var mymonth = myDate.substring(5,7);
    var myday = myDate.substring(8,10);
    document.getElementById("dateprint").innerHTML = myday+"-"+mymonth+"-"+myyear;
}
