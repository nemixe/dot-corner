function image(src, description, mainColor = '#fff') {
  return {
    type: 'image',
    payload: src,
    description: description,
    mainColor: mainColor
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
    currentEvent: image('./assets/images/IG-DOT-TECHTALK 2.png', `Hello DOT-ers, hari jumat besok tanggal 30 Agustus 2019 akan ada TechTALK Internal dengan tema "Internship Journey Recap DOT Indonesia" yang dibawakan teman-teman kita Almas Amalia Azhar, Dias Tanansha Putri dan Mochamad Indra Wahyudi. Acara
    akan dimulai pukul 15.20. Jangan lewatkan acara ini ya sobat DOT Indonesia`, '#28aa02'),
    event: [
      image('./assets/images/ngedabrus.png'),
      quote('Tentang kamu')
    ],
    now: null
  },
  mounted: function() {
    this.date()
  },
  methods: {
    date: function() {
      let self = this
      this.now = moment().format('YYYY-MM-DD : hh-mm-ss')
      setInterval(() => {
        self.date()
      }, 1000)
    }
  }
})