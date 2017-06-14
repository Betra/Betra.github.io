
    function Draw(phi) {
        var canvas = document.getElementById('canv');
        canvas.height = 600;
        canvas.width = 600; 

        var context = canvas.getContext('2d');
        context.strokeStyle="#c0392b";

        context.save();
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.restore();

        var t = 0;
        var dt = 0.01;
        var Pi=Math.PI;
        var X = 0;
        var Y = 0;

        var A = document.Parametr.A.value;
        var B = document.Parametr.B.value;
        var w1 = document.Parametr.Omega1.value;
        var w2 = document.Parametr.Omega2.value;
        var fi = document.Parametr.Phi.value;
        fi = parseFloat(phi);

        context.beginPath();

        for(t=0; t<(w1+w2); t+=dt ) 
        {
            X=A*Math.cos(w1*t);
            Y=B*Math.cos(w2*t+fi);

            context.lineTo((500+ X)/(200/112.7),(1000+ Y)/(200/60)); 
        }

        context.scale(0.3,1)
        context.stroke();
        }

        function Rotate() {
            var fi = parseFloat(document.Parametr.Phi.value);
            Draw(fi);
            fi += 0.01;
            document.Parametr.Phi.value = fi.toFixed(2);
            
            }

        function checkbox() {
            var da = document.getElementById('da');
            if(da.innerHTML == "Да") { 
                da.innerHTML = da.innerHTML.replace(/Да/,'Нет');
            }
            else {
                da.innerHTML = da.innerHTML.replace(/Нет/,'Да');
            }
        }
        function checker() {    
            var da = document.getElementById('da');
            if(da.innerHTML == "Да") {              
                update = true;
            }
            else {
                update = false;
            }
                
            return update;
            }

        function countDigits(n) {
            for(var i = 0; n > 1; i++) {
             n /= 10;
            }
            return i;
        }
        function start() {
            var button = document.Parametr.button.value;
            if(button == "Начать") {

                var A = document.Parametr.A.value;
                var B = document.Parametr.B.value;
                var w1 = document.Parametr.Omega1.value;
                var w2 = document.Parametr.Omega2.value;
                var fi = document.Parametr.Phi.value;
                if(A == '')  document.Parametr.A.value = 200;
                if(B == '')  document.Parametr.B.value = 200;
                if(w1 == '') document.Parametr.Omega1.value = 3;
                if(w2 == '') document.Parametr.Omega2.value = 5;
                if(fi == '') document.Parametr.Phi.value = 0;
                
                if(countDigits(w1) > 1) {
                    alert("Слишком большая нагрузка на ЦП при двузначной ω \n ω = "+w1);
                    return 0;
                }
                if(countDigits(w2) > 1) {
                    alert("Слишком большая нагрузка на ЦП при двузначной ω \n ω = "+w2);
                    return 0;
                }

                

                if(checker() == true) {
            
                    counter = setInterval(Rotate,20);
                }
                else {
                    Draw(fi)
                }
                document.Parametr.button.value = "Остановить"
            }
            else {
                 document.Parametr.button.value = "Начать"
                 clearInterval(counter);
            }

        }    