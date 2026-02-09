
        let nopeus = 3;
        let piste = 0;
        let talpiste = 0;
        let healt = 5;

        let nimet = "";
        let score = [];

        var pelinloppu;
        var pelipala;
        var pelipiste;
        var peliesto;
        var peliohi;
// aloitaa pelin
        function aloitapeli() {
            peliarena.start();
            pelipala = new osansa(30, 30, "white", 10, 120);
            //peli alkaa ja kuutio alkavat levittä 
            pelipiste = new osansa(20, 20, "green", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
            peliesto = new osansa(20, 20, "red", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);       
            pelinloppu = new osansa(20, 20, "blue", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
        
            peliohi = new osansa("50px", "Consolas", "white", 130, 135, "text");    
            
            
        }
//pelin areena missä pelaja liikuu
        var peliarena = {
            canvas : document.createElement("canvas"),
            start : function(){

            this.canvas.width = 480;
            this.canvas.height = 270;
            this.canvas.radius = 30;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(paivitapelia, 20);
            window.addEventListener('keydown', function (e) {
                peliarena.key = e.keyCode;
            })
            window.addEventListener('keyup', function (e) {
                peliarena.key = false;
            })
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }, stop : function() {
                clearInterval(this.interval);
        }
    }

    
//osat ja tasot
    function osansa(width, height, color, x, y, type) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.nopeusX = 0;
        this.nopeusY = 0;  
        this.x = x;
        this.y = y;
        this.bouncs = 0.09;
        this.bounces = 0.09;
        this.bouncespeed = 0;
        this.bouncsX = 0.09;
        this.bouncesX = 0.09;
        this.bouncespeedX = 0;
        this.updaid = function() {
            ctx = peliarena.context;

        if (this.type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
        }
         ctx.fillStyle = color;
         ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.newpai = function(){
            this.x += this.nopeusX;
            this.y += this.nopeusY;
            this.seinao();
            this.latia();
            this.katto();
            this.seinav();
        }
        this.newbontu = function(){
            this.bouncespeed += this.bouncs;
            this.bouncespeedX += this.bouncsX;

            this.x += this.nopeusX + this.bouncespeedX;
            this.y += this.nopeusY + this.bouncespeed;

            this.seinaob();
            this.latiab();
            this.kattob();
            this.seinavb();
        }
            
        this.newkimo = function(){
         this.bouncespeedX += this.bouncsX;
        this.x += this.nopeusX + this.bouncespeedX;
        this.seinaob();
        this.seinavb();       
        }

        
        
        //pelajan ja kuution törmäksen havaintoi koodi
        this.osu = function(toinenta) {
            var munvase = this.x;
            var munoike = this.x + (this.width);
            var munylos = this.y;
            var munalas = this.y + (this.height);
            var senvase = toinenta.x;
            var senoike = toinenta.x + (toinenta.width);
            var senylos = toinenta.y;
            var senalas = toinenta.y + (toinenta.height);
            var osunut = true;
            if ((munalas < senylos) ||
               (munylos > senalas) ||
               (munoike < senvase)||
               (munvase > senoike)) { 
                osunut = false;
            }
            return osunut;
        }
//pelaja osuu seiniin, latian ja katoon
        this.seinao = function() {
            var seinaosu = peliarena.canvas.width - this.width;
            if (this.x > seinaosu) {
                this.x = seinaosu;
            }
        
        }
        this.latia = function() {
            var latiaosu = peliarena.canvas.height - this.height;
            if (this.y > latiaosu) {
                this.y = latiaosu;
            }
        }
        this.katto = function() {
            var kattoosu = peliarena.canvas.height + this.height;
            if (this.y < 0) {
                this.y = 0;
            }
            
        }
        this.seinav = function() {
            var seinavosu = peliarena.canvas.width + this.width;
            if (this.x < 0) {
                this.x = 0;
            }
        }
        //piste hypii seiniä ja kattoa ja latiaa
        this.seinaob = function() {
            var seinaosu = peliarena.canvas.width - this.width;
            if (this.x > seinaosu) {
                this.x = seinaosu;
                this.bouncespeedX = -(this.bouncespeedX * this.bouncesX);
                this.bouncsX = -this.bouncsX;
                
            }
        
        }
        this.latiab = function() {
            var latiaosu = peliarena.canvas.height - this.height;
            if (this.y > latiaosu) {
                this.y = latiaosu;
                this.bouncespeed = -(this.bouncespeed * this.bounces);
                this.bouncs = -this.bouncs;
                
            }
        }
        this.kattob = function() {
            var kattoosu = peliarena.canvas.height + this.height;
            if (this.y < 0) {
                this.y = 0;
                this.bouncespeed = -(this.bouncespeed * this.bounces);
                this.bouncs = -this.bouncs;
                
            }
            
        }
        this.seinavb = function() {
            var seinavosu = peliarena.canvas.width + this.width;
            if (this.x < 0) {
                this.x = 0;
                this.bouncespeedX = -(this.bouncespeedX * this.bouncesX);
                this.bouncsX = -this.bouncsX;
                
            }
        }
    }

   


//pelin, pelajan ja kuution päivitäminen
    function paivitapelia() {
        //kun pelaja kostkee kuution niin kuutio vaihtaa paikaa ja pelaja saa pisteen
        if (pelipala.osu(pelipiste)){
           lisaapiste();
            pelipiste = new osansa(20, 20, "green", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
            nopeus += 1;
        if (nopeus >= 15) {
                nopeus = 15;
        }
        }
        
        if (pelipala.osu(peliesto)){
            healt--;
            peliesto = new osansa(20, 20, "red",Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
                       
           

        
                
        } 
            if (pelipala.osu(pelinloppu) && piste >= 25){
                healt--;
                pelinloppu = new osansa(20, 20, "blue", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);


                
                
        }
        //lisää game over ruutu ja pysäytää pelin
         if (healt <= 0){
        peliohi.text = "GAME OVER";
        peliohi.updaid();
        pelipala = new osansa(30, 30, "black", 10, 120);
        pelipiste = new osansa(20, 20, "black", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
        peliesto = new osansa(20, 20, "black", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);       
        pelinloppu = new osansa(20, 20, "black", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);     
        pelipiste.updaid();
        peliesto.updaid();
        pelipala.updaid();
        peliarena.stop();
        addleaderborde();
        }else{   

        
        peliarena.clear();
        // liikuminen nuoli laskimilla
        pelinloppu.nopeusX = 0;
        pelinloppu.nopeusX = 0;
        pelipala.nopeusX = 0;
        pelipala.nopeusY = 0;
        if (peliarena.key && peliarena.key == 37) {pelipala.nopeusX += -nopeus; }
        if (peliarena.key && peliarena.key == 39) {pelipala.nopeusX += nopeus; }
        if (peliarena.key && peliarena.key == 38) {pelipala.nopeusY += -nopeus; }
        if (peliarena.key && peliarena.key == 40) {pelipala.nopeusY += nopeus; }
        //pelajan ja kuution päivitys
        

            
        pelipiste.updaid();
        peliesto.updaid();
        pelipala.newpai();
        pelipala.updaid();
        peliesto.newkimo();
                 
        if (piste >= 25){
        pelinloppu.updaid();
        pelinloppu.newbontu();
        }
        }
    }

        function talenatpisteetaulu(){
                
            document.getElementById("tpiste").innerHTML = talpiste; 
        
        
        }

        //pisten päivityksen
        function paivitapiste() {
            document.getElementById("piste").innerHTML = piste;
            document.getElementById("nopeus").innerHTML = nopeus;
        }
        //lisää pisteitä
        function lisaapiste() {
        piste++;
        paivitapiste();

        if (talpiste <= piste){
                talpiste = piste;    
        }else{
                talpiste = talpiste;
        }
        
        talenatpisteetaulu();
        }
        //pisteen vähetäminen
        function pienenapiste() {
            piste--;
            paivitapiste();
        }
        //pisteiden aloitaa alusta
        function resepiste() {
        piste = 0;
        nopeus = 3;
        healt = 5;
        aloitapeli();
        paivitapiste();
        
        }

        function laitanimi() {
           nimet = document.getElementById("nime").value;
           return nimet;
        }
        

        function addleaderborde() {
            
            laitanimi();
            score.push(piste);

            var ul = document.getElementById('pisteet');


            
                
            var li = document.createElement('li');
                ul.appendChild(li);
                li.innerHTML = li.innerHTML + nimet + ":" + " " + piste;
                
            

            
        }
        
        


        //pisteiden talentamiseen

        function scorepistetal() {
          localStorage.setItem("tpiste", talpiste);      
        }

        function scorepisteudel() {
         let tale = localStorage.getItem("tpiste");
            if (tale !== null) {
                talpiste = Number(tale);
            }
            talenatpisteetaulu();    
        }


       function talepistee() {
            localStorage.setItem("piste", piste);
        
        }
        //pisteiden uudelen ladatumiseen viimeksi talentuksesta
        function uudelenpistee() {
            let tale = localStorage.getItem("piste");
            if (tale !== null) {
                piste = Number(tale);
            }
            paivitapiste();
        
        }
