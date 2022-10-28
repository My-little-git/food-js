document.addEventListener('DOMContentLoaded', () => {

  // Tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent(){
    tabsContent.forEach(elem => {
      elem.classList.add('hide')
      elem.classList.remove('show')
    })

    tabs.forEach(elem => {
      elem.classList.remove('tabheader__item_active')
    })
  }

  function showTabContent(i = 0){
    tabsContent[i].classList.remove('hide')
    tabsContent[i].classList.add('show', 'fade')
    tabs[i].classList.add('tabheader__item_active')
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    console.log('fdslkf')
    if (target && target.classList.contains('tabheader__item')){
      tabs.forEach((item, i) => {
        if (target === item){
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  })

  // Timer

  const deadline = '2022-10-30';

  function getTimeRemainging(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60)

    return {
      t,
      days,
      hours,
      minutes,
      seconds
    }
  }


  function setClock(selector, endtime, block){
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000),
          stock = document.querySelector(block)

    updateClock()

    function getZero(int){
      return (int > 0 && int > 10) ? int : `0${int}`
    }

    function updateClock(){
      const t = getTimeRemainging(endtime)

      if (t.t < 0) {
        stock.innerHTML = ''
        clearInterval(timeInterval)
      }

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)
    }
  }

  // Promotion

  setClock('.timer', deadline, '.promotion')


  // Modal

  const modalButtons = document.querySelectorAll("[data-modal]"),
        modalClose = document.querySelector("[data-close]"),
        modal = document.querySelector('.modal')

  modalButtons.forEach(e => {
    e.addEventListener('click', openModal)
  })

  function openModal(){
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId)
    window.removeEventListener('scroll', showModalByScroll)
  }

  function closeModal(){
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener('click', closeModal)

  modal.addEventListener('click', (e)=>{
    if (e.target === modal) closeModal()
  })

  document.addEventListener('keydown', (e)=>{
    if (e.code === 'Escape' && modal.classList.contains('show')) closeModal()
  })

  // const modalTimerId = setTimeout(openModal, 10000)

  function showModalByScroll(){
    if (window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll)

  class MenuCard{
    constructor(src, alt, title, descr, price, parentSelector, ...classes){
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.classes = classes
      this.parent = document.querySelector(parentSelector)
      this.transfer = 27
      this.changeToUAH()
    }

    changeToUAH(){
      this.price = this.price * this.transfer
    }

    render(){
      const element = document.createElement('div')

      if (this.classes.length === 0) {
        this.element = 'menu__item'
        element.classList.add(this.element)
      } else {
        this.classes.forEach(className => element.classList.add(className))
      }
      element.innerHTML = `
        <img src="${this.src}" alt="${this.alt}">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `
      this.parent.append(element)
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container", 
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    20,
    ".menu .container",
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    16,
    ".menu .container",
    'menu__item'
  ).render();

})