class MyDBMem {
    constructor(uniqueId, year) {
      this.uniqueId = uniqueId;
      this.latestcount = asd;
      this.total = asd;
    }
  }


  var feed = {created_at: "2017-03-14T01:00:32Z", entry_id: 33358, field1: "4", field2: "4", field3: "0"};

  var data = [];
  data.push(feed);
  data.ite
  
  console.log(data);

let db;
function fetchDB() {
    if (db) return Promise.resolve(db);
    return fetch("./store.json")
        .then(response => {
            db = response.json();
            return db;
        }).catch(err => console.log(err));
}

fetchDB().then(d => {
    console.log(d);
});