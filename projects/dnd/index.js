/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

export function createDiv() {
  const divNew = document.createElement('div');
  divNew.style.backgroundColor = `rgb(${getRandom(0, 255)}, ${getRandom(
    0,
    255
  )}, ${getRandom(0, 255)})`;
  divNew.style.height = `${getRandom(1, 200)}px`;
  divNew.style.width = `${getRandom(1, 200)}px`;
  divNew.style.top = `${getRandom(1, 300)}px`;
  divNew.style.left = `${getRandom(1, 300)}px`;
  divNew.draggable = true;

  function getRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  return divNew;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  div.className = 'draggable-div';
  homeworkContainer.appendChild(div);
});
