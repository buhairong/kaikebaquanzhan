module.exports = function (source) {
  const str = ` const el = document.createElement('style');
                el.innerHTML = ${source};
                document.head.appendChild(el);
              `
  return str
}
