const express = require("express");
const app = express();
const port = 3000;

const keyStore = {};

function getResyncedTime(data) {
  const { ctime, stime } = data;
  const stimeNow = new Date() - 0;
  return ctime + stimeNow - stime;
}
app.get("/:key/", (req, res) => {
  console.log(keyStore);
  const syncedTime = getResyncedTime(keyStore[req.params.key]);
  console.log(syncedTime);
  res.json({ time: syncedTime });
});
app.get("/:key/:duration", (req, res) => {
  keyStore[req.params.key] = {
    ctime: Number(req.params.duration),
    stime: new Date() - 0,
  };
  console.log(keyStore);
  res.send("OK");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
