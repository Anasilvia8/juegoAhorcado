;(function(){
    var palabras = [
        "ALURA",
        "PROGRAMAR",
        "ORACLE",
        "SUPER",
        "INTELIGENTE",
        "CODIGO",
        "PYTHON"
    ]

    //variable para almacenar
    var juego = null
    //para ver si ya se lanzo alguna alerta
    var finalizado = false

    var $html = {
        hombre: document.getElementById("hombre"),
        adivinado: document.querySelector(".adivinado"),
        errado: document.querySelector(".errado")
    }

    function dibujar(juego){
        //actualizar la imagen del hombre
        var $elem

        var estado = juego.estado
        if(estado == 8){
            estado = juego.previo
        }
        $elem = $html.hombre
        $elem.src = "estados/0" + estado + ".png"

        //creamos las letras adivinadas
        var palabra = juego.palabra
        var adivinado = juego.adivinado
        $elem = $html.adivinado
        //borramos los elementos anteriores
        $elem.innerHTML = ""
        for(let letra of palabra){
            let $span = document.createElement("span")
            let $txt = document.createTextNode("")

            if(adivinado.indexOf(letra) >= 0){
                $txt.nodeValue = letra
            }
            $span.setAttribute("class", "letra adivinada")
            $span.appendChild($txt)
            $elem.appendChild($span)
        }

        //creamos las letras erradas
        var errado = juego.errado
        $elem = $html.errado
        //borramos los elementos anteriores
        $elem.innerHTML=""
        for(let letra of errado){
            let $span = document.createElement("span")
            let $txt = document.createTextNode(letra)

            $span.setAttribute("class", "letra errada")
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }

    //siguiente parte
    function adivinar(juego, letra){
        var estado = juego.estado
        //si ya se ha perdido o ganado no debe cambiar ese estado asi queda hecho 
        if(estado == 1 || estado ==8){
            return 
        }
        //si ya se adivino o errado la letra no se debe hacer nada
        var adivinado = juego.adivinado
        var errado = juego.errado
        if(adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){ //indexOf significa contiene
            return
        }

        var palabra = juego.palabra
        //si es letra de la palabra
        if(palabra.indexOf(letra) >= 0){
            let ganado = true
            //debemos ver si llegamos al estado ganado
            for(let l of palabra){
                if(adivinado.indexOf(l)<0 && l != letra){
                    ganado = false
                    juego.previo = juego.estado
                    break
                }
            }
            //si ya se ha ganado debemos indicarlo
            if(ganado){
                juego.estado = 8
            }
            //agregamos la letra a la lista de palabras adivinadas
            adivinado.push(letra)
          //si no es letra d la palabra
        } else{
            //el hombre se acerca a la horca
            juego.estado--
            //se agrega la letra errada a esta lista
            errado.push(letra)
        }
    }

    window.onkeypress = function adivinarletra(e){
        var letra = e.key
        letra = letra.toUpperCase()
        if(/[^A-ZÑ]/.test(letra)){
            return
        }
        adivinar(juego, letra)

        var estado = juego.estado
        if(estado == 8 && !finalizado){
            setTimeout(alertaGanado, 500)
            finalizado = true
        } else if(estado == 1 && !finalizado){
            let palabra = juego.palabra
            setTimeout(alertaPerdido, 500)
            finalizado = true
        }

        dibujar(juego)
    }

    window.nuevoJuego = function nuevoJuego(){
        var palabra = palabraAleatoria()
        juego = {}
        juego.palabra = palabra
        juego.estado = 7
        juego.adivinado = []
        juego.errado = []
        finalizado = false
        dibujar(juego)
        console.log(juego)
    }

    function palabraAleatoria(){
        var index = ~~(Math.random()*palabras.length)
        return palabras[index]
    }

    function alertaGanado(){
        alert("¡Felicidades Ganaste!")
    }
    function alertaPerdido(){
        alert("Perdiste vuelve a intentarlo..")
    }

    nuevoJuego()
}())

