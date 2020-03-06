Array.prototype.shuffle = function() {
  for (var i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
  }
  return this;
};
Array.prototype.clone = Array.prototype.slice;

// 生成数
const TIMES = 1000;

// 解析用
var _8bagList;
var _unusedHistgram;

function new7bag() {
  return [0, 1, 2, 3, 4, 5, 6];
}
function new8bag(unused) {
  const arr = new7bag();
  arr.push(unused);
  const _8bag = arr.shuffle();
  // 解析用
  _unusedHistgram[unused]++;
  _8bagList.push(_8bag.clone());
  return _8bag;
}

function run() {
  const generatedList = generate(TIMES);
  output(generatedList);
}
function generate(count) {
  const initialArray = new7bag().shuffle();
  const generatedList = [];
  _8bagList = [];
  _unusedHistgram = new Array(7).fill(0);
  for (var i = 0; i < 6; ++i) {
    generatedList.push(initialArray.shift());
  }
  //console.log(initialArray);
  var _8bag = new8bag(initialArray.shift());
  for (var j = 0; j < count; ++j) {
    //console.log(_8bag);
    for (var i = 0; i < 7; ++i) {
      generatedList.push(_8bag.shift());
    }
    //console.log(_8bag);
    _8bag = new8bag(_8bag.shift());
  }
  return generatedList;
}

function histgramToPercentText(histgram, total) {
  return histgram
    .map(count => ((100.0 * count) / total).toFixed(2) + "%")
    .join(", ");
}

function output(generatedList) {
  const histgram = new Array(7).fill(0);
  for (var mino of generatedList) {
    histgram[mino]++;
  }
  document.getElementById("list").innerHTML = generatedList.toString();
  document.getElementById("8bags").innerHTML = _8bagList
    .map(l => l.join(", "))
    .join("<br/>");
  document.getElementById("stats").innerHTML =
    "generated: " +
    generatedList.length +
    " minos <br/>" +
    "histgram: " +
    histgramToPercentText(histgram, generatedList.length) +
    "<br/>" +
    "unused histgram: " +
    histgramToPercentText(_unusedHistgram, TIMES + 1);
}

function main() {
  document.getElementById("run").addEventListener("click", run);
  run();
}

window.onload = () => main();
