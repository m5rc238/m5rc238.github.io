<script>
    function DisplayTime(timeZoneOffsetminutes){
        if (!document.all && !document.getElementById)
        return
        timeElement=document.getElementById? document.getElementById("clock"): document.all.tick2
        var requiredDate=getTimeZoneTimeObj(timeZoneOffsetminutes)
        var hours=requiredDate.h;
        var minutes=requiredDate.m;
        var seconds=requiredDate.s;
        var DayNight="PM";
        if (hours<12) DayNight="AM";
        if (hours>12) hours=hours-12;
        if (hours==0) hours=12;
        if (minutes<=9) minutes="0"+minutes;
        if (seconds<=9) seconds="0"+seconds;
        var currentTime=hours+":"+minutes+":"+seconds+" "+DayNight;
        timeElement.innerHTML="<font style='font-family:Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext,latin-extfont-size:14px;color:#fff;'>"+currentTime+"</b>"
        setTimeout("DisplayTime(-330)",1000)
        }
        window.onload=DisplayTime(-330);
        function getTimeZoneTimeObj(timeZoneOffsetminutes){
            var localdate = new Date()
            var timeZoneDate = new Date(localdate.getTime() + ((localdate.getTimezoneOffset()- timeZoneOffsetminutes)*60*1000));
            return {'h':timeZoneDate.getHours(),'m':timeZoneDate.getMinutes(),'s':timeZoneDate.getSeconds()};
        }
    </script>