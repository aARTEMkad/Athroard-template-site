const select_ = document.getElementById('ilosc');
select_.addEventListener('change', function() {
    const count = this.value;

    if(document.querySelectorAll('.product_item')) {
        document.querySelectorAll('.product_item').forEach(item => {
            item.remove();
        });
    }

    fetch("https://brandstestowy.smallhost.pl/api/random?pageNumber=1&pageSize=" + count)
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        for(let i = 0; i < count; i++) {
            const div = document.createElement('div');
            div.className = 'product_item';
            div.innerHTML = `
                <img src="${data.data[i].image}" alt="${data.data[i].text}" width="200">
            `;

            div.addEventListener('click', function() {
                showDetails(data.data[i]);
            });
            document.getElementById('list_products').appendChild(div);
        }
    });
});



document.addEventListener('DOMContentLoaded',() => {
     fetch("https://brandstestowy.smallhost.pl/api/random?pageNumber=1&pageSize=" + 20)
    .then(response => response.json())
    .then(data => {
        console.log(data.data);
        for(let i = 0; i < 20; i++) {
            const div = document.createElement('div');
            div.className = 'product_item';
            div.innerHTML = `
                <img loading="lazy" src="${data.data[i].image}" alt="${data.data[i].text}" width="200">
            `;

            div.addEventListener('click', function() {
                showDetails(data.data[i]);
            });
            document.getElementById('list_products').appendChild(div);
        }
    });
})


function showDetails(data) {
    try {
        document.getElementById('close_button');
        document.body.removeChild(document.getElementsByClassName('popup')[0]);
    } catch (e) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <div class="popup">
                <div class="popup_content">
                    <div id="two_ele">
                        <p><strong>ID:</strong> ${data.id}</p>
                        <div id="close_button">&times;</div>
                    </div>
                    <p><strong>Nazwa:</strong> ${data.text}</p>
                    <p><strong>Wartosc:</strong> ${data.id}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        const button = document.getElementById('close_button')
        button.addEventListener('click', function() {
            document.body.removeChild(popup);
        });
    }
}


// For mobile menu

const menu_button = document.getElementById('select_menu_but');
menu_button.addEventListener('click', () => {
    try {
        document.getElementById('menu');
        document.body.removeChild(document.getElementsByClassName('background_menu')[0]);
    } catch (e) {
        const menu_list = document.createElement('div')
        menu_list.className = "background_menu"
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
    }
})

