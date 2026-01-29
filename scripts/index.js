let pageNumber_ = 1;

const select_ = document.getElementById('ilosc');

select_.addEventListener('change', function () {
    if (document.querySelectorAll('.product_item')) {
        document.querySelectorAll('.product_item').forEach(item => {
            item.remove();
        });
        pageNumber_ = 1;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetch("https://brandstestowy.smallhost.pl/api/random?pageNumber=1&pageSize=" + select_.value)
        .then(response => response.json())
        .then(data => {
            createProduct(data, select_.value)
        });
})

// For mobile menu
const menu_button = document.getElementById('header__menu-button-action');
menu_button.addEventListener('click', () => {
    try {
        const exit = document.querySelector('.background_menu')

        if(exit) {
            exit.remove();
            return;
        }
        const menu_list = document.createElement('div')
            menu_list.className = "background_menu"
            menu_list.id = 'background_menu'
            menu_list.innerHTML = `
                <div class="menu">
                    <a href="#dzialanie">DZIAŁANIE PREPARATU</a>
                    <a href="#zalecenia">ZALECENIA</a>
                    <a href="#sklad">SKŁAD</a>
                    <a href="#dawkowanie">DAWKOWANIE</a>
                    <a href="#opinie">OPINIE</a>
                </div>
            `;
        document.body.appendChild(menu_list);
        menu_list.addEventListener('click', () => {
            menu_list.remove();
        })

        menu_list.querySelector('.menu').addEventListener('click', (e) => {
            e.stopPropagation();
        })

    } catch (e) {
        console.log(e);
    }
})

const loader = document.getElementById('end');

const observer = new IntersectionObserver(entiries => {
    if (entiries[0].isIntersecting) {
        fetch(`https://brandstestowy.smallhost.pl/api/random?pageNumber=${pageNumber_}&pageSize=${select_.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(`Load ${select_.value} with page ${pageNumber_}`);
                createProduct(data)
                ++pageNumber_;
            });
    }
}, { rootMargin: '100px' })

observer.observe(loader);





function createProduct(data) {
    for (let i = 0; i < data.data.length; i++) {
        const div = document.createElement('div');
        div.className = 'product_item';
        div.innerHTML = `
        <img loading="lazy" src="${data.data[i].image}" alt="${data.data[i].text}" width="200">
    `;

        div.addEventListener('click', function () {
            showDetails(data.data[i]);
        });
        document.getElementById('list_products').appendChild(div);
    }
}

function showDetails(data) {
    try {
        if (document.getElementById('close_button')) {
            document.body.removeChild(document.getElementsByClassName('popup')[0]);
        } else {
            const x = `
                <div class="popup">
                    <div class="popup__content">
                        <div id="two_ele">
                            <p><strong>ID:</strong> ${data.id}</p>
                            <button class="popup__button-exit" id="close_button">&times;</button>
                        </div>
                        <div>
                            <p><strong>Nazwa:</strong> ${data.text}</p>
                            <p><strong>Wartosc:</strong> ${data.id}</p>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML("beforeend", x)


            const popup = document.querySelector(".popup");
            if(popup) {
                popup.addEventListener('click', () => {
                    popup.remove();
                })

                popup.querySelector('.popup__content').addEventListener('click', (e) => {
                    e.stopPropagation();
                })
            }

            const button = document.getElementById('close_button')
            button.addEventListener('click', function () {
                document.querySelector(".popup")?.remove();
            });
        }
    } catch (e) {
        console.log(e);
    }
}