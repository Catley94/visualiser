window.onload = function() {
    const audioFile = document.querySelector('.audioFile');
    const audio = document.querySelector('audio');
    
    audioFile.onchange = function() {

      var files = this.files;
      var audio = new Audio();
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      var context = new AudioContext();
      var src = context.createMediaElementSource(audio);
      var analyser = context.createAnalyser();
  
      var canvas = document.querySelector(".canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext("2d");
  
      src.connect(analyser);
      analyser.connect(context.destination);
  
      analyser.fftSize = 256;
  
      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
  
      var dataArray = new Uint8Array(bufferLength);
  
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
  
  
      function draw() {
          requestAnimationFrame(draw);
          
          analyser.getByteFrequencyData(dataArray);
          ctx.fillStyle = 'rgb(0, 0, 0)';
          ctx.fillRect(0, 0, WIDTH, HEIGHT);

            var barWidth = (WIDTH / bufferLength) * 2.5;
            var barHeight;
            var x = 0;

            for (var i = 0; i < bufferLength; i++ ) {
                barHeight = dataArray[i];

                ctx.fillStyle = 'rgb(' + (barHeight) + ',150,150)';
                ctx.fillRect(x, barHeight, barWidth, barHeight);
                console.log(barWidth)
                x += barWidth + 1;
            }

      }
      draw();
      audio.play();
      renderFrame();
    };
  };