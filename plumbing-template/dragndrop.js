const items = document.querySelectorAll("div.item");
[...items].forEach((item) => {
  console.log(item);
  item.addEventListener('pointerdown', (event) => {
    const dimensions = item.getBoundingClientRect();
    item.style.top = `${dimensions.y + window.scrollY}px`;
    item.style.left = `${dimensions.x}px`;
    item.style.width = `${dimensions.width}px`;
    item.style.height = `${dimensions.height}px`;
    const clone = item.cloneNode();
    clone.classList.add("clone");
    item.before(clone);
    item.style.pointerEvents = 'none';

    document.body.append(item)
    item.classList.add('dragging');
    item.setPointerCapture(event.pointerId);

    const up = (event) => {
      console.log("up");
      clone.after(item);
      clone.remove();
      item.style.left = '';
      item.style.top = '';
      item.classList.remove('dragging');
      item.removeEventListener('pointerup', up);
      item.removeEventListener('pointermove', move);
      item.style.pointerEvents = '';
      item.releasePointerCapture(event.pointerId);
    }
    const move = async (event) => {
      item.style.left = `${parseFloat(item.style.left) + event.movementX}px`;
      item.style.top = `${parseFloat(item.style.top) + event.movementY}px`;
      const x = parseInt(item.style.left, 10);
      const y = parseInt(item.style.top, 10);
      console.log(x);
      console.log(y);

      const hitTest = document.elementFromPoint(x - window.pageXOffset, y - window.pageYOffset);

      const dropzone = hitTest.closest('[data-dropzone]');
      /*
        if(!dropzone) {
          return;
        }
        */
        if(clone.closest('[data-dropzone]') !== dropzone){
          dropzone.append(clone);
          return;
        }
        const dropzoneChildren = [...dropzone.children];
        const cloneIndex = dropzoneChildren.findIndex(c => c === clone);
        dropzoneChildren.forEach((child) => {
          if (hitTest === clone) {
            return;
          }
          if (hitTest === child) {
            const currentElementIndex = dropzoneChildren.findIndex(c => 
              c === child);
            if (cloneIndex < currentElementIndex) {
              child.after(clone);
            } else {
              child.before(clone);
            }
          }
        });
      
    }
    item.addEventListener('pointerup', up);
    item.addEventListener('pointermove', move);
  });
});
