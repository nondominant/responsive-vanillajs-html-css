document.addEventListener("DOMContentLoaded", function(){

const afterLoading = (x) => {
  x.classList.remove('loading');
}

document.getElementById('myframe').onload = function() {
  const child = document.getElementById('myframe');
  const parentNode = child.closest('.loading');
  afterLoading(parentNode);
};

});

