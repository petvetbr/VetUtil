

class Util
{ 
    FormatDate(dt: Date): string 
    { 
        var d = dt.getDate();
        var m = dt.getMonth() + 1;
        var a = dt.getFullYear();
        if (a < 1900) { 
            a +=1900;
        }
        return d + '/' + m + '/' + a;
    }

}