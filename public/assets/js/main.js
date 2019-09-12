function image(title, src, description, mainColor = 'green', limit) {
  return {
    title: title,
    type: 'image',
    imageSrc: src,
    description: description,
    mainColor: mainColor,
    limit: limit
  }
}

function quote(title, src, description, mainColor = 'green') {
  return {
    title: title,
    type: 'quote',
    imageSrc: src,
    description: description,
    mainColor: mainColor,
  }
}

let app = new Vue({
  el: '#app',
  data: {
    currentEvent: {},
    indexEvent: -1,
    events: [],
    now: null
  },
  mounted: function() {
    this.loadEvents()
    this.date()
    let self = this
    this.setTime(false);
    setInterval(function() {
        self.setTime(true);
      }, 1000)
      // setInterval(function() {
      //   self.indexEvent += 1
      //   self.indexEvent > self.events.length ? self.indexEvent = 0 : null
      //   self.currentEvent = self.events[self.indexEvent]
      // }, 10000)
  },
  methods: {
    loadEvents: function() {
      let self = this
      axios.get('/events').then(res => {
        self.events = res.data.map(resp => {
          let limit = new Date(resp.limit)
          let month = Math.floor((limit.getMonth() + 1) / 10) ? limit.getMonth() + 1 : '0' + (limit.getMonth() + 1)
          let formatedDate = `${limit.getFullYear()}-${month}-${limit.getDate()} ${limit.getUTCHours()}:${limit.getMinutes()}`

          return resp.
          type == 'image' ? image(
            resp.title,
            resp.imageSrc.url,
            resp.description,
            resp.mainColor,
            formatedDate
          ) : quote(
            resp.title,
            resp.imageSrc.url,
            resp.description,
            resp.mainColor
          )
        })
        self.currentEvent = self.events[0]
      })
    },
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
      });
    },
    flipTo: function(digit, n) {
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
