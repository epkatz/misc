const list = [
{name: 'Brett', p: 1}, 
{name: 'Dani', p: 2},
{name: 'Sami', p: 3},
{name: 'Mikey', p: 4},
{name: 'Ethan', p: 5},
{name: 'Chester', p: 6},
{name: 'Jon', p: 5},
{name: 'Eli', p: 4},
{name: 'Alex', p: 3},
{name: 'Daniel', p: 2}
]
.map(({ name, p }) => {
  return Array(p).fill(name).join(',')
})
.join(',')
.split(',')
.reduce((acc, val, index, a) => {
  const i = a.length - index;
  let j = Math.floor(Math.random() * i);
  [a[i - 1], a[j]] = [a[j], a[i - 1]];
  return a;
}).reduce((acc, val) => {
  if (acc.indexOf(val) === -1) {
    acc.push(val)
  }
  return acc;
}, []);

console.log(list);