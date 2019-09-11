function image(src, description, mainColor = '#fff', limit) {
  return {
    type: 'image',
    imageSrc: src,
    description: description,
    mainColor: mainColor,
    limit: limit
  }
}

function quote(text, description) {
  return {
    type: 'quote',
    payload: text,
    description: description
  }
}

let app = new Vue({
  el: '#app',
  data: {
    currentEvent: image(
      `./assets/images/IG-DOT-TECHTALK 2.png`,
      `Hello DOT-ers, hari jumat besok tanggal 30 Agustus 2019 akan ada TechTALK Internal dengan tema 
      "Internship Journey Recap DOT Indonesia" yang dibawakan teman-teman kita Tifo Audi Alif Putra & 
      Arif Eka Brilian. Acara akan dimulai pukul 15.20 pada tanggal 13 September 2019. Jangan lewatkan acara ini ya sobat DOT Indonesia`,
      '#28aa02',
      '2019-09-13 15:20'
    ),
    event: [
      image('./assets/images/ngedabrus.png'),
      quote('Tentang kamu')
    ],
    now: null
  },
  mounted: function() {
    this.date()
    let self = this
    this.setTime(false);
    setInterval(function() {
      self.setTime(true);
    }, 1000)
  },
  methods: {
    date: function() {
      let self = this
      this.now = moment().format('YYYY-MM-DD : hh-mm-ss')
      setTimeout(() => {
        self.date()
      }, 1000)
    },
    setTime: function(flip) {
      var n = new Date();
      var l = new Date(this.currentEvent.limit)

      var diff = l.getTime() - n.getTime();

      if (diff <= 0) {
        this.updateGroup('hour', '--', flip);
        this.updateGroup('min', '--', flip);
        this.updateGroup('sec', '--', flip);
        return
      }

      var msec = diff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      var ss = Math.floor(msec / 1000);

      this.updateGroup('hour', hh, flip);
      this.updateGroup('min', mm, flip);
      this.updateGroup('sec', ss, flip);
    },
    updateGroup: function(group, n, flip) {
      var digit1 = document.querySelector('.ten' + group);
      var digit2 = document.querySelector('.' + group);
      n = String(n); // convert int to string, ex: 1 => "1"
      if (n.length == 1) n = '0' + n; // if string length is less than 2 then add 0 before, ex: "1" =>  "01"
      var num0 = n[0]; //get string index 0, ex: "01" => "0"
      var num1 = n[1]; //get string index 1, ex: "01" => "1"

      if (digit1.getAttribute('data-num') != num0) { // check if current data-num is not equal string index 0, if true then continue
        if (flip) this.flipTo(digit1, num0); // check if flip equal true if true
        else this.jumpTo(digit1, num0); // jump
      }
      if (digit2.getAttribute('data-num') != num1) {
        if (flip) this.flipTo(digit2, num1);
        else this.jumpTo(digit2, num1);
      }
    },
    jumpTo: function(digit, n) {
      digit.setAttribute('data-num', n);
      digit.querySelectorAll('.base').forEach(element => {
        element.innerHTML = n
        console.log(element.text)
      });
    },
    flipTo: function(digit, n) {
      console.count('digit')
      var current = digit.getAttribute('data-num');

      digit.setAttribute('data-num', n);
      digit.querySelectorAll('.front').forEach(element => {
        element.setAttribute('data-content', current)
      });
      digit.querySelectorAll('.back, .under').forEach(element => {
        element.setAttribute('data-content', n)
      });
      digit.querySelectorAll('.flap').forEach(element => {
        element.style = 'display: block'
      });
      setTimeout(function() {
        digit.querySelectorAll('.base').forEach(element => {
          element.innerHTML = n
        });
        digit.querySelectorAll('.flap').forEach(element => {
          element.style = 'display: none'
        });
      }, 350);
    }
  }
})