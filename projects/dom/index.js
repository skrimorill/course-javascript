/* ДЗ 4 - работа с DOM */

/*
 Задание 1:

 1.1: Функция должна создать элемент с тегом DIV

 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text

 Пример:
   createDivWithText('loftschool') // создаст элемент div, поместит в него 'loftschool' и вернет созданный элемент
 */
function createDivWithText(text) {
  const div = document.createElement('div');
  div.innerHTML = text;
  return div;
}

/*
 Задание 2:

 Функция должна вставлять элемент, переданный в параметре what в начало элемента, переданного в параметре where

 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
  return where.prepend(what);
}

/*
 Задание 3:

 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where

 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов следующим соседом которых является элемент с тегом P

 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </body>

   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
  const w = where.children;
  const arr = [];
  for (let i = 0; i < w.length - 1; i++) {
    if (w[i].nextElementSibling.nodeName === 'P') {
      arr.push(w[i]);
    }
  }
  return arr;
}

/*
 Задание 4:

 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.

 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.

 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>loftschool</div>
   </body>

   findError(document.body) // функция должна вернуть массив с элементами 'привет' и 'loftschool'
 */
function findError(where) {
  const result = [];

  for (const child of where.childNodes) {
    if (child.nodeType === 1) {
      result.push(child.textContent);
    }
  }
  return result;
}

/*
 Задание 5:

 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы

 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
  for (const el of where.childNodes)
    if (el.nodeType === 3) {
      el.remove();
    }
  return where;
}

/*
 Задание 6:

 Выполнить предыдущее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)

 Будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов

 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
  for (let i = 0; i < where.childNodes.length; i++) {
    const el = where.childNodes[i];
    if (el.nodeType === 3) {
      where.removeChild(el);
      i--;
    } else if (el.nodeType === 1) {
      deleteTextNodesRecursive(el);
    }
  }
  // for (let el of where.childNodes) {
  //   if (el.nodeType === 3) {
  //     el.remove();
  //   } else if (el.nodeType === 1) {
  //     deleteTextNodes(el)
  //   }
  // }
  // return where
}

/*
 Задание 7 *:

 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных

 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
function collectDOMStat(root) {
  const total = {
    tags: {},
    classes: {},
    texts: 0,
  };

  function monitor(root) {
    for (const el of root.childNodes) {
      if (el.nodeType === 3) {
        total.texts++;
      } else if (el.nodeType === 1) {
        if (el.tagName in total.tags) {
          total.tags[el.tagName]++;
        } else {
          total.tags[el.tagName] = 1;
        }

        for (const className of el.classList) {
          if (className in total.classes) {
            total.classes[className]++;
          } else {
            total.classes[className] = 1;
          }
        }
        monitor(el);
      }
    }
  }
  monitor(root);
  return total;
}
// let els = []
// let els2 = []
// let obj = {}
// let tags = {}
// let classes = {}
// let texts = 0

// for (let el of root.childNodes) {
//   } if (el.nodeType === 3) {
//   ++texts
//   }
//   if (el.classList) {
//   els.push(el.className)
//   els2.push(el.tagName)

//   for (let item of el.childNodes) {
//     if (item.classList) {
//       els.push(item.className)
//     } if (item.tagName !== undefined) {
//       els2.push(item.tagName)
//   } if (item.nodeType === 3) {
//     ++texts
//   }
//   }
// }

// let class1 = els.filter(e => e != '').join(' ').split(' ')
// class1.forEach(a => {
//   classes[a] = classes[a] + 1 || 1
// })

// let tag1 = els2.filter(e => {
//   tags[e] = tags[e] + 1 || 1
// })

// obj.classes = classes
// obj.tags = tags
// obj.texts = texts

// return obj

/*
 Задание 8 *:

 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn

 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)

 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов

 Рекомендуется использовать MutationObserver

 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }

   ------

   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {
  const observ = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        fn({
          type: mutation.addedNodes.length ? 'insert' : 'remove',
          nodes: [
            ...(mutation.addedNodes.length ? mutation.addedNodes : mutation.removedNodes),
          ],
        });
      }
    });
  });

  observ.observe(where, { childList: true, subtree: true });
}

export {
  createDivWithText,
  prepend,
  findAllPSiblings,
  findError,
  deleteTextNodes,
  deleteTextNodesRecursive,
  collectDOMStat,
  observeChildNodes,
};
