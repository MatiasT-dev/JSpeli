

        let nopeus = 0.5;
        let piste = 0;
        
        
        var pelinloppu;
        var pelipala;
        var pelipiste;
        var peliesto;
// aloitaa pelin
        function aloitapeli() {
            peliarena.start();
            pelipala = new osansa(30, 30, "white", 10, 120);
            //peli alkaa ja kuutio alkavat levittä 
            pelipiste = new osansa(20, 20, "green", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
            peliesto = new osansa(20, 20, "red",Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
        pelinloppu = new osansa(20, 20, "blue", 460, 255);
        }
//pelin areena missä pelaja liikuu
        var peliarena = {
            canvas : document.createElement("canvas"),
            start : function(){

            this.canvas.width = 480;
            this.canvas.height = 270;
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
        } 
    }

    
//osat ja tasot
    function osansa(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.nopeusX = 0;
        this.nopeusY = 0;  
        this.x = x;
        this.y = y;
        this.updaid = function() {
          ctx = peliarena.context;
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
    }
//pelin, pelajan ja kuution päivitäminen
    function paivitapelia() {
        //kun pelaja kostkee kuution niin kuutio vaihtaa paikaa ja pelaja saa pisteen
        if (pelipala.osu(pelipiste)){
           lisaapiste();
            pelipiste = new osansa(20, 20, "green", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
            nopeus += 0.5;
        }
        
        if (pelipala.osu(peliesto)){
            pienenapiste();
            peliesto = new osansa(20, 20, "red",Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
            nopeus -= 1;
            piste += 0.5;
        }

        
        peliarena.clear();
        // liikuminen nuoli laskimilla
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
        pelinloppu.updaid();
        
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
        }
        //pisteen vähetäminen
        function pienenapiste() {
            piste--;
            paivitapiste();
        }
        //pisteiden aloitaa alusta
        function resepiste() {
        piste = 0;
        nopeus = 0.5;
        pelipala = new osansa(30, 30, "white", 10, 120);
        pelipiste = new osansa(20, 20, "green", Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
        peliesto = new osansa(20, 20, "red",Math.floor(Math.random() * 460) + 9, Math.floor(Math.random() * 255) + 9);
        paivitapiste();
        }
        //pisteiden talentamiseen
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
