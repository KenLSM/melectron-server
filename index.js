const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const keyStore = {};

function getResyncedTime(data) {
  const { ctime, stime } = data;
  const stimeNow = new Date() - 0;
  return ctime + stimeNow - stime;
}
app.get("/:key/", (req, res) => {
  console.log(keyStore);
  const entry = keyStore[req.params.key];
  if (!entry) {
    res.status(404);
    res.send("unknown key");
    return;
  }
  if (entry.paused) {
    res.json({ time: entry.ctime, paused: entry.paused });
    return;
  }

  const syncedTime = getResyncedTime(entry);
  console.log(syncedTime);
  res.json({ time: syncedTime, paused: entry.paused });
});
app.get("/:key/:duration", (req, res) => {
  keyStore[req.params.key] = {
    ctime: Number(req.params.duration),
    stime: new Date() - 0,
  };
  console.log(keyStore);
  res.send("OK");
});

app.post("/:key/:duration", (req, res) => {
  console.log(req.body);
  keyStore[req.params.key] = {
    ctime: Number(req.params.duration),
    stime: new Date() - 0,
    paused: req.body.paused,
  };
  console.log(keyStore);
  res.send("OK");
});

app.listen(port, () =>
  console.log(`Setup successful http://localhost:${port}`)
);
