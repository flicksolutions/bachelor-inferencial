// Import stylesheets
import './style.css';

//InferenceObject:
const inf = {
  s3: ['s1'],
  s4: ['s1'],
  s5: ['s1', 's2'],
  s6: ['s2'],
  s7: ['s2'],
};

const incompatible = [
  ['s1', 's6'],
  ['s1', 's2'],
  ['s2', 's4'],
];

let commitments = ['s3', 's4', 's5'];
let sets = [];

const compCheck = (arr) => {
  incompatible.forEach((inc) => {
    if (arr.includes(inc[0]) && arr.includes(inc[1])) {
      arr.pop();
    }
  });
  return arr;
};

for (let o = 0; o < commitments.length; o++) {
  console.log('entering for loop');
  sets[o] = [];
  commitments.forEach((c) => {
    if (inf[c]) {
      if (sets[o].length === 0) {
        inf[c].forEach((l) => {
          if (!sets[o].includes(l)) {
            sets[o].push([l]);
            sets[o] = compCheck(sets[o]);
          }
        });
      } else {
        sets[o].forEach((s, i) => {
          inf[c].forEach((l) => {
            if (!s.includes(l)) {
              s.push(l);
              s = compCheck(s);
            }
          });
        });
      }
    }
  });
  commitments = [commitments.pop(), ...commitments]; //weil der Anfangswert eine Rolle spielt, setze das letzte Element an die erste Stelle
  console.log(commitments);
}
console.log(sets);

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
