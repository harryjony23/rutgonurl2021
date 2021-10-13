const MapsShort = new Vue({
  el: '#app',
  data: {
    api: 'https://script.google.com/macros/s/AKfycbxKpOO-RxHJvp7pZ6sF_EZbnOLqrfZ3O_NUt_cSH3Z7RBgarXqBD0phIz_Lr2_STwP7/exec',
    link: '',
    result: '',
    error: null
  },
  methods: {
    submit() {
      let beShortData = new FormData();
      beShortData.append("maps", this.link);
      fetch(this.api, {
        method: 'POST',
        body: beShortData
      }).then(res => res.json())
        .then(result => {
          this.result = result.shortLink;
          this.error = null;
          return this.result;
        })
        .then(result => {
          // 存一份資料到 Google Sheet
          let saveData = new FormData();
          saveData.append('entry.1028341378', result);
          saveData.append('entry.369879275', this.link);
          fetch('https://docs.google.com/forms/u/0/d/e/1R48vq7uryMyfnRL0-ZfgUkVBfhemqhI7sd01Ukf2YpQ/formResponse', {
            method: 'POST',
            body: saveData
          })
        })
        .catch(err => {
          this.error = err.message
        });
    }
  },
})
