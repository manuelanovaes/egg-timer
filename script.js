const btnMole = document.getElementById('btn-mole');
const btnMedia = document.getElementById('btn-media');
const btnDura = document.getElementById('btn-dura');
const btnPausar = document.getElementById('btn-pausar');
const btnCancelar = document.getElementById('btn-cancelar');
const confirmarCancelar = document.getElementById('alert-cancelar')
const btnSim = document.getElementById('btn-sim');
const btnNao = document.getElementById('btn-nao');

const botoes =  [btnMole, btnMedia, btnDura];
let interval;
let estaPausado = false;
let tempoRestante = 0;

btnCancelar.addEventListener('click', () => {
    confirmarCancelar.style.display = 'flex';
});
btnNao.addEventListener('click', () => {
    confirmarCancelar.style.display = 'none';
})
btnSim.addEventListener('click', () => {
    clearInterval(interval);
    const display = document.getElementById('timer');
    display.innerHTML = '00:00';

    for (let i = 0; i < botoes.length; i++) {
            botoes[i].disabled = false;
            botoes[i].style.opacity = '1';
        }

    btnPausar.style.display = 'none';
    btnCancelar.style.display = 'none';
    estaPausado = false;
    btnPausar.innerText = 'Pausar';

    confirmarCancelar.style.display = 'none';
    });

const atualizarDisplay = (display) => {
    let minute = Math.floor(tempoRestante / 60);
    let second = Math.floor(tempoRestante % 60);
    
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    display.innerHTML = `${minute}:${second}`;
}

btnMole.addEventListener('click', () => {
    const display = document.getElementById('timer');
    timer(4 * 60, display);
});
btnMedia.addEventListener('click', () => {
    const display = document.getElementById('timer');
    timer(6 * 60, display);
});
btnDura.addEventListener('click', () => {
    const display = document.getElementById('timer');
    timer(8 * 60, display);
});

btnPausar.addEventListener('click', () => {
    const display = document.getElementById('timer');

    if (!estaPausado) {
        clearInterval(interval);
        estaPausado = true;
        btnPausar.innerText = 'Despausar';
    } else {
        estaPausado = false;
        btnPausar.innerText = 'Pausar';

        interval = setInterval(() => {
            tempoRestante -= 1;
            atualizarDisplay(display);

            if (tempoRestante < 0) {
                display.innerHTML = 'Ovo pronto!';
                clearInterval(interval);
                
                for (let i = 0; i < botoes.length; i++) {
                    botoes[i].disabled = false;
                    botoes[i].style.opacity = '1';
                }
                btnPausar.style.display = 'none';
                btnCancelar.style.display = 'none';
                btnPausar.innerText = 'Pausar';
            };

            function contagem() {
                let minute, second;
                minute = Math.floor (tempoRestante / 60);
                second = Math.floor (tempoRestante % 60);
                minute = minute < 10 ? '0' + minute : minute;
                second = second < 10 ? '0' + second : second;
                
                display.innerHTML = `${minute}:${second}`;
            };
        }, 1000);
    }
});

const timer = (duration, display) => {
    if (interval) {
        clearInterval(interval);
    }

    tempoRestante = duration;
    estaPausado = false;
    btnPausar.innerText = 'Pausar';
    
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].disabled = true;
        botoes[i].style.opacity = '0.5';
    }
    btnPausar.style.display = 'inline-block';
    btnCancelar.style.display = 'inline-block';

    atualizarDisplay(display);

    interval = setInterval(() => {
        tempoRestante -= 1;
        atualizarDisplay(display);

        if (tempoRestante < 0) {
            display.innerHTML = 'Ovo pronto!';
            clearInterval(interval);

            for (let i = 0; i < botoes.length; i++) {
                botoes[i].disabled = false;
                botoes[i].style.opacity = '1'; 
            }
            btnPausar.style.display = 'none';
            btnCancelar.style.display  = 'none';
        }
        
    }, 1000);
};










// CÓDIGO PRA SE EU QUISER IMPLEMENTAR A POSSIBILIDADE DO USUARIO QUERER ESCOLHER UM TEMPO ESPECIFICO PRO TIMER
/* const btnStart = document.getElementById('btn-start'); */
/* btnStart.addEventListener('click', () => {
    const minuteInput = document.getElementById('minute');
    const secondInput = document.getElementById('second');
    
    let rawMinute = parseInt(minuteInput.value) || 0;
    let rawSecond = parseInt(secondInput.value) || 0;

    let totalSecond = (rawMinute * 60) + rawSecond;

    let calculatedMinute = Math.floor(totalSecond / 60);
    let calculatedSecond = totalSecond % 60;

    if (calculatedMinute > 60) {
        calculatedMinute = 60;
        calculatedSecond = 0;
        totalSecond = 60 * 60;
    }

    else if (calculatedMinute === 60) {
        calculatedSecond = 0;
        totalSecond = 60 * 60;
    }

    minuteInput.value = calculatedMinute;
    secondInput.value = calculatedSecond;

    const display = document.getElementById('timer');
    timer(totalSecond, display);
}) */